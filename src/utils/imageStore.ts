// Persistent client-side IndexedDB & asset cache for Studio Daisie genuine photographs

const DB_NAME = 'studio_daisie_assets';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

export const EXPECTED_IMAGES: Record<string, { label: string; section: string }> = {
  'IMG_6406.webp': { label: 'Signature Brunette Waves', section: 'Hero' },
  'IMG_2845.webp': { label: 'Tailored Lob Cut', section: 'Cut Service & Looks' },
  'Screenshot+2026-06-29+202215.webp': { label: 'Blonde Balayage Hand Dimension', section: 'Colour Service & Looks' },
  'Screenshot+2026-06-29+202905.webp': { label: 'Cascading Blonde Editorial', section: 'Style Service & Looks' },
  '0D8A1991.webp': { label: 'Studio Interior Arched Mirrors', section: 'About Salon' },
  'Screenshot+2026-06-29+200827.webp': { label: 'Candid Community Flash', section: 'More Than A Hair Appointment' },
  'IMG_4238.webp': { label: 'Macro Blonde Hair Wave Flow', section: 'Wet Glass Condensation' },
  'IMG_5974+(1).webp': { label: 'Framed Studio Wall Polaroid', section: 'Studio Detail & Looks' },
};

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// In-memory cache for synchronous access
const memoryCache: Record<string, string> = {};
const listeners: Set<() => void> = new Set();

export function subscribeToImageStore(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function notifyListeners() {
  listeners.forEach((cb) => cb());
}

export async function getImageDataUrl(filename: string): Promise<string | null> {
  // Normalize filename lookup (support both + and spaces)
  const normKey = normalizeFilename(filename);
  if (memoryCache[normKey]) {
    return memoryCache[normKey];
  }

  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(normKey);
      req.onsuccess = () => {
        if (req.result) {
          memoryCache[normKey] = req.result;
          resolve(req.result);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export function getCachedImage(filename: string): string | null {
  const normKey = normalizeFilename(filename);
  return memoryCache[normKey] || null;
}

export async function saveImageToStore(filename: string, dataUrl: string) {
  const normKey = normalizeFilename(filename);
  memoryCache[normKey] = dataUrl;

  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, normKey);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('Error saving to IndexedDB:', e);
  }

  // Also attempt to push to server filesystem via Vite middleware
  try {
    await fetch('/api/save-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename: normKey, dataUrl }),
    });
  } catch {
    // Server-side save is optional; in-memory/IndexedDB already serves the client
  }

  notifyListeners();
}

export function normalizeFilename(filename: string): string {
  // Strip leading slashes
  let clean = filename.replace(/^\/+/, '');
  // Extract base filename if it has query parameters
  clean = clean.split('?')[0];
  // Standardize spaces to '+' to match the user-provided naming
  clean = clean.replace(/%20/g, '+').replace(/ /g, '+');
  return clean;
}

export function matchUploadedFile(file: File): string | null {
  const cleanName = normalizeFilename(file.name);
  for (const expected of Object.keys(EXPECTED_IMAGES)) {
    if (normalizeFilename(expected) === cleanName) {
      return expected;
    }
    // Match base name without extension
    const baseExpected = expected.replace(/\.[^/.]+$/, '').toLowerCase();
    const baseUploaded = cleanName.replace(/\.[^/.]+$/, '').toLowerCase();
    if (baseExpected === baseUploaded || baseUploaded.includes(baseExpected) || baseExpected.includes(baseUploaded)) {
      return expected;
    }
  }
  return null;
}

// Preload all saved images on startup
export async function initImageStore() {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.openCursor();
    req.onsuccess = () => {
      const cursor = req.result;
      if (cursor) {
        memoryCache[cursor.key as string] = cursor.value as string;
        cursor.continue();
      } else {
        notifyListeners();
      }
    };
  } catch {
    // Ignore error
  }
}
