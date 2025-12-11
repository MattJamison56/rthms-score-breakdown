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

// Tag descriptions for info screen
export const TAG_DESCRIPTIONS: { [key: string]: string } = {
  // Sleep tags
  'Sleep Achiever': '>=7hs, >=5 days in the last 7 days',
  'Lights-Out Sleeper': '>=5 days in the last 7 days, sleep data start time between 10pm-12am',
  'Early Bird': '>=3 days in the last 7 days, sleep data end time between 5am-7am',
  'All-Nighter Pro': '<=4hs, >=5 days in the last 7 days',
  'Night Owl': 'sleep start time > 12.00 am, >=3 days in the last 7 days',
  'Nap Taker': 'Multiple records a day, >=5 days in the last 7 days',
  'Weekend Snoozer': 'EMPTY - No specific criteria',
  'Restless Sleeper': 'Avg. sleep < 6h/day, in the last 7 days',
  
  // Activity tags
  'Off Beat Mover': 'Less than 1000 steps per day, at least 5 days in the last 7 days',
  'Run Regular': '>=15 min/day, >=2 days in the last 7 days',
  'Runner Pro': '>=30 min/day, >=3 days in the last 7 days',
  'Yogi': '>=30 min/day, >=2 days in the last 7 days',
  'Weight Lifter': '>=30 min/day, >=2 day in the last 7 days',
  'Cyclist': '>=20 min/day, >=1 day in the last 7 days',
  'Swimmer': '>=20 min/day, >=1 day in the last 7 days',
  'Active Hiker': '>=30 min/day, On Saturdays and Sundays in the last 7 days',
  'Sunrise Sweater': 'Morning workouts before 9AM, >=2 days in the last 7 days',
  'Stretch Mode': '>=30 min/day, >=3 days in the last 7 days',
  'Meditator': 'EMPTY - No specific criteria',
  'Step Starter': 'Between 1000 and 4999 steps per day, at least 3 days in the last 7 days',
  'Step Explorer': 'Between 5000 and 7499 steps per day, at least 3 days in the last 7 days',
  'Step Master': 'Between 7500 and 9999 steps per day, at least 3 days in the last 7 days',
  'Marathon Walker': '10000+ per day, at least 3 days per week',
  
  // Food tags
  'Sushi Lover': '>=2 restaurant transactions (Sushi) in last 7 days',
  'Pizza Fan': '>=2 restaurant transactions (Pizza) in last 7 days',
  'Thai Bites': '>=2 restaurant transactions (Thai) in last 3 days',
  'Mexican Food Finder': '>=2 restaurant transactions (Mexican) in last 7 days',
  'Steakhouse Lover': '>=2 restaurant transactions (Steakhouse) in last 7 days',
  'Chinese Foodie': '>=2 restaurant transactions (Chinese) in last 7 days',
  'All-American Bites': '>=2 restaurant transactions (American) in last 7 days',
  'Vegetarian Fun': '>=2 restaurant transactions (Vegetarian) in last 7 days',
  'Mediterranean Food Seaker': '>=2 restaurant transactions (Mediterranean) in last 7 days',
  'Italian Eats': '>=2 restaurant transactions (Italian) in last 7 days',
  'Breakfast Spot Finder': '>=2 restaurant transactions (Breakfast) in last 7 days',
  
  // Lifestyle tags
  'Spa Day Lover': 'Hair and beauty expenses',
  'Big Crowd Energy': 'Sporting events and entertainment',
  'Globetrotter': 'Frequent travel expenses',
  'Online Shopper': 'Online marketplace purchases',
  'The Networker': 'NULL - No specific criteria',
  'Home Chef': 'Smart grocery shopping',
  'Snack Fan': 'Regular vending machine purchases',
  'Traveler Vibes': 'Regular lodging stays',
  'Coffee Shop Regular': 'Regular coffee purchases',
  'Fast Food Fan': 'Frequent fast food purchases',
  'Sky High Explorer': 'Infrequent flyer',
  'Sporting Goods Shopper': 'Sporting goods purchases',
  'Knowledge Seeker': 'Book purchases',
  'Quickstop Shopper': 'Other food and drink purchases',
  'Fast food Lover': '>=2 restaurant transactions (American) in last 7 days',
  'Music Lover': 'Regular music and audio purchases',
  'Weight Room Warrior': 'Regular gym and fitness expenses',
  'Frequent Flyer': 'Regular air travel',
  'Console Gamer': 'Gamer who spends on video games',
  'Retail Fashion Shopper': 'Clothing and accessories',
  'Casino Explorer': 'Casino and gambling expenses',
  'Calm App User': 'Other personal care expenses',
  'Supplement User': 'Pharmacy and supplement purchases',
  'Homebody': 'NULL - No specific criteria',
  'Pet Parent': 'Pet supplies purchases'
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
