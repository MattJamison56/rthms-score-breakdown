// All available tags organized by category
export const ALL_TAGS = {
  lifestyle: [
    'Spa Day Lover',
    'Big Crowd Energy',
    'Globetrotter',
    'Online Shopper',
    'The Networker',
    'Home Chef',
    'Snack Fan',
    'Traveler Vibes',
    'Coffee Shop Regular',
    'Fast Food Fan',
    'Sky High Explorer',
    'Sporting Goods Shopper',
    'Knowledge Seeker',
    'Quickstop Shopper',
    'Fast food Lover',
    'Music Lover',
    'Weight Room Warrior',
    'Frequent Flyer',
    'Console Gamer',
    'Retail Fashion Shopper',
    'Casino Explorer',
    'Calm App User',
    'Supplement User',
    'Homebody',
    'Pet Parent'
  ],
  food: [
    'Sushi Lover',
    'Pizza Fan',
    'Thai Bites',
    'Mexican Food Finder',
    'Steakhouse Lover',
    'Chinese Foodie',
    'All-American Bites',
    'Vegetarian Fun',
    'Mediterranean Food Seaker',
    'Italian Eats',
    'Breakfast Spot Finder'
  ],
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
    'Step Starter',
    'Step Explorer',
    'Step Master',
    'Marathon Walker'
  ]
};

// Tags that cannot be selected by both people simultaneously
export const MUTUALLY_EXCLUSIVE_GROUPS = [
  ['Sleep Achiever', 'All-Nighter Pro', 'Restless Sleeper'],
  ['Lights-Out Sleeper', 'Night Owl'],
  ['Early Bird', 'Night Owl'],
  ['Off Beat Mover', 'Step Starter', 'Step Explorer', 'Step Master', 'Marathon Walker'],
  ['Run Regular', 'Runner Pro']
];

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
