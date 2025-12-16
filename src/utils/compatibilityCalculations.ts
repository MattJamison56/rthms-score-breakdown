import type { OverlapResult } from '../types/compatibility';
import { getPartialOverlapScore } from '../data/allTags';

export const calculateOverlap = (tags1: string[], tags2: string[]): OverlapResult => {
  const set1 = new Set(tags1);
  const set2 = new Set(tags2);
  
  // Exact matches
  const overlap = [...set1].filter(tag => set2.has(tag));
  
  // Calculate partial overlaps for non-matching tags
  const partialScore = calculatePartialOverlaps(tags1, tags2);
  
  // Combine exact matches with partial overlaps
  const totalPossible = new Set([...tags1, ...tags2]).size;
  const exactMatchScore = overlap.length;
  const combinedScore = exactMatchScore + partialScore;
  
  return {
    overlapping: overlap,
    percentage: totalPossible > 0 ? Math.round((combinedScore / totalPossible) * 100) : 0,
    user1Only: [...set1].filter(tag => !set2.has(tag)),
    user2Only: [...set2].filter(tag => !set1.has(tag))
  };
};

// Calculate partial overlap scores for hierarchical tags
const calculatePartialOverlaps = (tags1: string[], tags2: string[]): number => {
  let partialScore = 0;
  const exactMatches = new Set(tags1.filter(tag => tags2.includes(tag)));
  
  // For each tag in person 1 that's not an exact match
  for (const tag1 of tags1) {
    if (exactMatches.has(tag1)) continue;
    
    // Find best partial match in person 2's tags
    let bestScore = 0;
    for (const tag2 of tags2) {
      if (exactMatches.has(tag2)) continue;
      const score = getPartialOverlapScore(tag1, tag2);
      bestScore = Math.max(bestScore, score);
    }
    
    partialScore += bestScore;
  }
  
  return partialScore;
};
