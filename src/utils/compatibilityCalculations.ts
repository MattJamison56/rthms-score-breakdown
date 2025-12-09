import type { OverlapResult } from '../types/compatibility';

export const calculateOverlap = (tags1: string[], tags2: string[]): OverlapResult => {
  const set1 = new Set(tags1);
  const set2 = new Set(tags2);
  const overlap = [...set1].filter(tag => set2.has(tag));
  return {
    overlapping: overlap,
    percentage: tags1.length + tags2.length > 0 ? Math.round((overlap.length / new Set([...tags1, ...tags2]).size) * 100) : 0,
    user1Only: [...set1].filter(tag => !set2.has(tag)),
    user2Only: [...set2].filter(tag => !set1.has(tag))
  };
};
