// All available tags organized by category
export const ALL_TAGS = {
  sleep: [
    'Sleep Achiever',
    'Lights-Out Sleeper',
    'Early Bird',
    'All-Nighter Pro',
    'Night Owl',
    'Nap Taker',
    'Weekend Snoozer',
    'Restless Sleeper'
  ],
  activity: [
    'Off Beat Mover',
    'Step Starter',
    'Step Explorer',
    'Step Master',
    'Marathon Walker',
    'Run Regular',
    'Runner Pro',
    'Yogi',
    'Weight Lifter',
    'Cyclist',
    'Swimmer',
    'Active Hiker',
    'Sunrise Sweater',
    'Stretch Mode',
    'Meditator',
    'Weight Room Warrior'
  ],
  wellness: [
    'Calm App User',
    'Spa Day Lover',
    'Supplement User'
  ],
  food: [
    'Home Chef',
    'Fast Food Fan',
    'Snack Fan',
    'Quickstop Shopper',
    'Sushi Lover',
    'Thai Bites',
    'Pizza Fan',
    'Mexican Food Finder',
    'Italian Eats',
    'Chinese Foodie',
    'Steakhouse Lover',
    'Vegetarian Fun',
    'Mediterranean Food Seeker',
    'Breakfast Spot Finder',
    'All-American Bites'
  ],
  entertainment: [
    'Console Gamer',
    'Music Lover',
    'Knowledge Seeker',
    'Sky High Explorer',
    'Frequent Flyer',
    'Traveler Vibes',
    'Globetrotter'
  ],
  lifestyle: [
    'Coffee Shop Regular',
    'Big Crowd Energy',
    'The Networker',
    'Homebody',
    'Retail Fashion Shopper',
    'Casino Explorer',
    'Pet Parent',
    'Sporting Goods Shopper',
    'Online Shopper'
  ]
};

// Tag descriptions for info screen
export const TAG_DESCRIPTIONS: { [key: string]: string } = {
  // Sleep tags (Apple Health)
  'Sleep Achiever': 'At least 5 sleep sessions in the last 7 days with a duration of 7 hours or more',
  'Lights-Out Sleeper': 'At least 5 sleep sessions in the last 7 days that start before 10 PM',
  'Early Bird': 'At least 3 sleep sessions in the last 7 days that end before 7:00 AM',
  'All-Nighter Pro': 'At least 5 sleep sessions in the last 7 days with a duration of 4 hours or less',
  'Night Owl': 'At least 3 sleep sessions in the last 7 days that start after 12:00 AM',
  'Nap Taker': 'At least 5 days in the last 7 days with more than one sleep session per day',
  'Weekend Snoozer': 'At least 4 sleep sessions on Saturdays or Sundays in the last 30 days that end before 10:00 AM',
  'Restless Sleeper': 'An average sleep duration of less than 6 hours per day over the last 7 days',
  
  // Activity tags (Apple Health - Movement)
  'Off Beat Mover': 'At least 5 days in the last 7 days with fewer than 1000 steps per day',
  'Step Starter': 'At least 3 days in the last 7 days with between 1,000 and 4,999 steps per day',
  'Step Explorer': 'At least 3 days in the last 7 days with between 5,000 and 7,499 steps per day',
  'Step Master': 'At least 4 days in the last 7 days with between 7,500 and 9,999 steps per day',
  'Marathon Walker': 'At least 4 days in the last 7 days with 10,000 or more steps per day',
  'Run Regular': 'At least 2 days with running workouts in the last 7 days, each with a duration of more than 15 minutes',
  'Runner Pro': 'At least 3 days with running workouts in the last 7 days, each with a duration of more than 30 minutes',
  'Yogi': 'At least 2 days with yoga workouts in the last 7 days, each with a duration of 30 minutes or more',
  'Weight Lifter': 'At least 2 days with strength training workouts in the last 7 days, each with a duration of 30 minutes or more',
  'Cyclist': 'At least 1 day with cycling workouts in the last 7 days, with a duration of 20 minutes or more',
  'Swimmer': 'At least 1 day with swimming workouts in the last 7 days, with a duration of 20 minutes or more',
  'Active Hiker': 'At least 1 hiking session on Saturday or Sunday in the last 7 days, with a duration of 30 minutes or more',
  'Sunrise Sweater': 'At least 2 days with workouts in the last 7 days that start before 9:00 AM',
  'Stretch Mode': 'At least 3 days with flexibility workouts in the last 7 days, each with a duration of 30 minutes or more',
  'Meditator': 'At least 6 days in the last 7 days with one or more mindfulness records',
  'Weight Room Warrior': 'At least 1 gym/fitness center transaction in the last 30 days',
  
  // Wellness tags
  'Calm App User': 'At least 1 personal care transaction in the last 30 days',
  'Spa Day Lover': 'At least 1 hair and beauty transaction in the last 30 days',
  'Supplement User': 'At least 2 pharmacy/supplement transactions in the last 30 days',
  
  // Food tags
  'Home Chef': 'At least 5 grocery/superstore transactions in the last 30 days',
  'Fast Food Fan': 'At least 4 fast food transactions in the last 30 days',
  'Snack Fan': 'At least 2 vending machine transactions in the last 7 days',
  'Quickstop Shopper': 'At least 2 food and drink transactions in the last 7 days',
  'Sushi Lover': 'At least 2 sushi restaurant transactions in the last 7 days',
  'Thai Bites': 'At least 2 Thai restaurant transactions in the last 7 days',
  'Pizza Fan': 'At least 2 pizza restaurant transactions in the last 7 days',
  'Mexican Food Finder': 'At least 2 Mexican restaurant transactions in the last 7 days',
  'Italian Eats': 'At least 2 Italian restaurant transactions in the last 7 days',
  'Chinese Foodie': 'At least 2 Chinese restaurant transactions in the last 7 days',
  'Steakhouse Lover': 'At least 2 steakhouse transactions in the last 7 days',
  'Vegetarian Fun': 'At least 2 vegetarian restaurant transactions in the last 7 days',
  'Mediterranean Food Seeker': 'At least 2 Mediterranean restaurant transactions in the last 7 days',
  'Breakfast Spot Finder': 'At least 2 breakfast restaurant transactions in the last 7 days',
  'All-American Bites': 'At least 2 American restaurant transactions in the last 7 days',
  
  // Entertainment tags
  'Console Gamer': 'At least 2 video game transactions in the last 30 days',
  'Music Lover': 'At least 1 music and audio transaction in the last 30 days',
  'Knowledge Seeker': 'At least 1 bookstore transaction in the last 30 days',
  'Sky High Explorer': 'At least 2 flight transactions in the last 180 days',
  'Frequent Flyer': 'Exactly 1 flight transaction in the last 90 days',
  'Traveler Vibes': 'At least 1 lodging transaction in the last 90 days',
  'Globetrotter': 'At least 2 travel transactions in the last 90 days',
  
  // Lifestyle tags (Social)
  'Coffee Shop Regular': 'At least 2 coffee shop transactions in the last 7 days',
  'Big Crowd Energy': 'At least 1 sporting event/amusement park/museum transaction in the last 30 days',
  'The Networker': 'At least 3 restaurant transactions in the last 7 days',
  'Homebody': 'Exactly 1 restaurant transaction in the last 30 days',
  'Retail Fashion Shopper': 'At least 2 clothing and accessories transactions in the last 30 days',
  'Casino Explorer': 'At least 4 casino and gambling transactions in the last 30 days',
  'Pet Parent': 'At least 2 pet supplies transactions in the last 30 days',
  'Sporting Goods Shopper': 'At least 2 sporting goods transactions in the last 30 days',
  'Online Shopper': 'At least 4 online marketplace transactions in the last 30 days'
};

// Tags that cannot be selected by both people simultaneously (mutually exclusive within person)
export const MUTUALLY_EXCLUSIVE_GROUPS = [
  // Sleep conflicts - only one of these sleep patterns per person
  ['Sleep Achiever', 'All-Nighter Pro'],
  ['Lights-Out Sleeper', 'Night Owl'],
  
  // Step count hierarchy (only one per person)
  ['Off Beat Mover', 'Step Starter', 'Step Explorer', 'Step Master', 'Marathon Walker'],
  
  // Running intensity (only one per person)
  ['Run Regular', 'Runner Pro'],
  
  // Social dining habits (only one per person)
  ['The Networker', 'Homebody'],
  
  // Travel frequency (only one per person - mutually exclusive flight patterns)
  ['Sky High Explorer', 'Frequent Flyer']
];

// Hierarchical tag groups for partial overlap scoring
// Tags in same group get partial credit based on proximity
export const PARTIAL_OVERLAP_GROUPS: { [key: string]: { tags: string[]; scores: number[] } } = {
  'step_count': {
    tags: ['Off Beat Mover', 'Step Starter', 'Step Explorer', 'Step Master', 'Marathon Walker'],
    scores: [0, 2, 4, 6, 8] // Relative activity levels
  },
  'running': {
    tags: ['Run Regular', 'Runner Pro'],
    scores: [3, 5] // Both are runners, just different intensity
  },
  'social_dining': {
    tags: ['Homebody', 'The Networker'],
    scores: [1, 5] // Opposite ends of social spectrum
  },
  'travel': {
    tags: ['Sky High Explorer', 'Frequent Flyer'],
    scores: [2, 4] // Both travel, different frequency
  }
};

// Calculate partial overlap score between two tags
export const getPartialOverlapScore = (tag1: string, tag2: string): number => {
  if (tag1 === tag2) return 1.0; // Perfect match
  
  // Check each hierarchical group
  for (const group of Object.values(PARTIAL_OVERLAP_GROUPS)) {
    const index1 = group.tags.indexOf(tag1);
    const index2 = group.tags.indexOf(tag2);
    
    if (index1 !== -1 && index2 !== -1) {
      // Both tags in same hierarchical group
      const diff = Math.abs(index1 - index2);
      
      // Calculate partial score: closer tags get higher scores
      // Adjacent = 0.75, one apart = 0.5, two apart = 0.25, etc.
      return Math.max(0, 1 - (diff * 0.25));
    }
  }
  
  return 0; // No relationship
};

// Check if a tag conflicts with any selected tags
export const hasConflict = (tag: string, selectedTags: string[]): boolean => {
  return MUTUALLY_EXCLUSIVE_GROUPS.some(group => {
    if (group.includes(tag)) {
      return selectedTags.some(selectedTag => 
        group.includes(selectedTag) && selectedTag !== tag
      );
    }
    return false;
  });
};
