import React, { useState, useEffect, useRef } from 'react';
import {
  getCachedImage,
  getImageDataUrl,
  subscribeToImageStore,
  normalizeFilename,
} from '../utils/imageStore';

interface StudioImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackType?: 'hero' | 'cut' | 'colour' | 'style' | 'salon' | 'community' | 'macro' | 'polaroid';
  aspectRatio?: string;
  priority?: boolean;
}

export const StudioImage: React.FC<StudioImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio,
  priority = false,
}) => {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [storedDataUrl, setStoredDataUrl] = useState<string | null>(() => getCachedImage(src));
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Subscribe to image store updates
  useEffect(() => {
    let isMounted = true;
    const updateFromStore = async () => {
      const data = await getImageDataUrl(src);
      if (isMounted && data) {
        setStoredDataUrl(data);
        setHasError(false);
        setLoaded(true);
      }
    };
    updateFromStore();
    return subscribeToImageStore(() => {
      updateFromStore();
    });
  }, [src]);

  // Generate URL variations
  const candidateUrls = React.useMemo(() => {
    if (storedDataUrl) return [storedDataUrl];
    const base = src.replace(/^\/+/, '');
    const variants = [
      `/${base}`,
      base,
      `/${base.replace(/\+/g, ' ')}`,
      base.replace(/\+/g, ' '),
      `/${base.replace(/\+/g, '%20')}`,
      base.replace(/\+/g, '%20'),
      `/${base.replace(/%20/g, '+')}`,
      base.replace(/%20/g, '+'),
    ];
    return Array.from(new Set(variants));
  }, [src, storedDataUrl]);

  const currentSrc = storedDataUrl || candidateUrls[candidateIndex] || src;

  const handleImgError = () => {
    if (!storedDataUrl && candidateIndex < candidateUrls.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const handleImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth > 0) {
      setLoaded(true);
      setHasError(false);
    }
  };

  // Reset state when src changes
  useEffect(() => {
    setCandidateIndex(0);
    setHasError(false);
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden bg-[#1E1917] ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Primary <img> tag rendering the real Studio Daisie photograph */}
      <img
        ref={imgRef}
        key={currentSrc}
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleImgLoad}
        onError={handleImgError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          hasError ? 'opacity-20' : 'opacity-100'
        }`}
      />
    </div>
  );
};
