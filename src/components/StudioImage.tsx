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
    const urls = [src];
    if (src.includes('+')) {
      urls.push(src.replace(/\+/g, ' '));
      urls.push(src.replace(/\+/g, '%20'));
    }
    if (src.includes('%20')) {
      urls.push(src.replace(/%20/g, ' '));
      urls.push(src.replace(/%20/g, '+'));
    }
    if (src.includes(' ')) {
      urls.push(src.replace(/ /g, '%20'));
      urls.push(src.replace(/ /g, '+'));
    }
    return Array.from(new Set(urls));
  }, [src, storedDataUrl]);

  const currentSrc = storedDataUrl || candidateUrls[candidateIndex] || src;

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 1) {
        setLoaded(true);
        setHasError(false);
      }
    }
  }, [currentSrc]);

  const handleImgError = () => {
    if (!storedDataUrl && candidateIndex < candidateUrls.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const handleImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth > 1) {
      setLoaded(true);
      setHasError(false);
    } else {
      handleImgError();
    }
  };

  // Reset state when src changes
  useEffect(() => {
    setCandidateIndex(0);
    setLoaded(false);
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
        loading="eager"
        onLoad={handleImgLoad}
        onError={handleImgError}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded && !hasError ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
