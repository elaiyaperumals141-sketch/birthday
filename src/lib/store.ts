const K = {
  main: "sb_main_photo",
  mem: (i: number) => `sb_mem_photo_${i}`,
  cap: (i: number) => `sb_mem_cap_${i}`,
  audio: "sb_audio",
};

export const MEM_COUNT = 4;

export const DEFAULT_CAPS = [
  "the day everything began ☁️",
  "us. always us. 🎞️",
  "golden hour, golden girl ☀️",
  "and so many more to come… 🤍",
];

function lsGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function lsSet(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/* ---------- photos ---------- */

export const loadMainPhoto = () => lsGet(K.main) ?? null;
export const saveMainPhoto = (v: string) => lsSet(K.main, v);

export type Mem = { src: string | null; cap: string };

export function loadMems(): Mem[] {
  return Array.from({ length: MEM_COUNT }, (_, i) => ({
    src: lsGet(K.mem(i)),
    cap: lsGet(K.cap(i)) ?? DEFAULT_CAPS[i],
  }));
}

export const saveMemPhoto = (i: number, v: string) => lsSet(K.mem(i), v);
export const saveMemCap = (i: number, v: string) => lsSet(K.cap(i), v);

/* ---------- audio ---------- */

export const loadCustomAudio = () => lsGet(K.audio);
export const saveCustomAudio = (v: string) => lsSet(K.audio, v);

/* ---------- file helpers ---------- */

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error("read failed"));
    r.readAsDataURL(file);
  });
}

/** Downscale + re-encode an image so it fits comfortably in localStorage. */
export function compressImage(
  file: File,
  maxDim = 1200,
  quality = 0.8,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      try {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        const ctx = c.getContext("2d");
        if (!ctx) throw new Error("no ctx");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL("image/jpeg", quality));
      } catch {
        fileToDataUrl(file).then(resolve, reject);
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image failed"));
    };
    img.src = url;
  });
}
