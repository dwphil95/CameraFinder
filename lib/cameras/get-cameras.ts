import "server-only";

import catalog from "@/lib/data/cameras.json" with { type: 'json' };
import type { Camera } from "@/lib/types";

let cache: Camera[] | null = null;

export const getCameras = (): Camera[] => {
  if (!cache) cache = catalog as Camera[];
  return cache;
}