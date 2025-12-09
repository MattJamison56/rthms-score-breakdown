import type { OverlapResult, Insights } from '../types/compatibility';

export const getInsight = (category: string, data: OverlapResult): string => {
  const hasOverlap = data.overlapping.length > 0;
  const highOverlap = data.percentage >= 50;
  
  const insights: Insights = {
    overall: {
      high: "You're vibing on the same wavelength! Shared interests across sleep, lifestyle, and adventures—this match has serious potential.",
      medium: "Different styles, shared passions. Your unique approaches could make for an exciting dynamic—balance meets adventure!",
      low: "Opposites can attract! Your different lifestyles might bring fresh perspectives and new experiences to explore together."
    },
    sleep: {
      overlap: "Sleep sync! You both value quality rest and have compatible bedtime vibes. Late-night talks won't mess with your rhythms.",
      early_vs_night: "Classic early bird meets night owl! Your peak energy times differ, but that just means more solo time and sweet reunions.",
      different: "Different sleep styles could work—one winds down while the other gets things done. Just means respecting each other's zones!"
    },
    food: {
      high: `Date night gold! You both love ${data.overlapping.slice(0, 2).join(' and ')}. Exploring new spots together will be a breeze.`,
      medium: `Some shared favorites like ${data.overlapping[0] || 'similar tastes'}, but you'll each expand the other's palate. Adventure awaits!`,
      low: "Totally different food vibes! Could be fun—you'll discover each other's favorite spots and try new cuisines together."
    },
    activity: {
      high: "Fitness power couple alert! You're both active with overlapping workout styles. Gym dates and active adventures are in your future.",
      medium: "Active lifestyles with different approaches—you'll motivate each other while keeping your own routines. Perfect balance!",
      low: "One's more active than the other, but that's cool! You can join sometimes or enjoy your own thing. Respect the hustle!"
    },
    wellness: {
      overlap: "Wellness twins! You both prioritize mental health and mindfulness. Supporting each other's self-care will come naturally.",
      different: "Different wellness approaches—one might meditate while the other recharges differently. Both valid, both supportive!"
    },
    lifestyle: {
      high: `Major lifestyle sync! ${data.overlapping.length} shared interests including ${data.overlapping.slice(0, 2).join(' and ')}. You'll never run out of things to do together!`,
      medium: "Some shared hobbies, some solo interests. The perfect mix of together time and personal space for growth.",
      low: "Very different lifestyles—means you'll introduce each other to new worlds. Growth through exploration!"
    }
  };

  if (category === 'overall') {
    if (data.percentage >= 50) return insights.overall.high;
    if (data.percentage >= 30) return insights.overall.medium;
    return insights.overall.low;
  }

  if (category === 'sleep') {
    if (hasOverlap) return insights.sleep.overlap;
    const hasEarlyBird = data.user1Only.includes('Early Bird') || data.user2Only.includes('Early Bird');
    const hasNightOwl = data.user1Only.includes('Night Owl') || data.user2Only.includes('Night Owl');
    if (hasEarlyBird && hasNightOwl) return insights.sleep.early_vs_night;
    return insights.sleep.different;
  }

  if (category === 'food') {
    if (highOverlap) return insights.food.high;
    if (hasOverlap) return insights.food.medium;
    return insights.food.low;
  }

  if (category === 'activity') {
    if (highOverlap) return insights.activity.high;
    if (hasOverlap) return insights.activity.medium;
    return insights.activity.low;
  }

  if (category === 'wellness') {
    if (hasOverlap) return insights.wellness.overlap;
    return insights.wellness.different;
  }

  if (category === 'lifestyle') {
    if (highOverlap) return insights.lifestyle.high;
    if (hasOverlap) return insights.lifestyle.medium;
    return insights.lifestyle.low;
  }

  return '';
};
