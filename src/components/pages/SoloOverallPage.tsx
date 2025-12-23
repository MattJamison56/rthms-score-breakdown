import { User, TrendingUp, Activity, Moon, Utensils, Heart } from 'lucide-react';
import type { Person } from '../../types/compatibility';

interface SoloOverallPageProps {
  person: Person;
}

// Calculate a wellness score based on tags
const calculateWellnessScore = (person: Person): number => {
  const tags = person.tags;
  let score = 50; // Base score
  
  // Sleep scoring
  if (tags.sleep.includes('Sleep Achiever')) score += 8;
  if (tags.sleep.includes('Early Bird')) score += 5;
  if (tags.sleep.includes('Restless Sleeper')) score -= 5;
  if (tags.sleep.includes('All-Nighter Pro')) score -= 8;
  
  // Activity scoring
  if (tags.activity.includes('Marathon Walker')) score += 10;
  if (tags.activity.includes('Runner Pro')) score += 10;
  if (tags.activity.includes('Yogi')) score += 8;
  if (tags.activity.includes('Weight Lifter')) score += 8;
  if (tags.activity.includes('Off Beat Mover')) score -= 10;
  if (tags.activity.includes('Step Starter')) score -= 5;
  
  // Wellness scoring
  if (tags.wellness.includes('Calm App User')) score += 5;
  if (tags.wellness.includes('Spa Day Lover')) score += 4;
  if (tags.wellness.includes('Supplement User')) score += 3;
  
  // Food scoring
  if (tags.food.includes('Home Chef')) score += 5;
  if (tags.food.includes('Fast Food Fan')) score -= 3;
  if (tags.food.includes('Vegetarian Fun')) score += 4;
  
  return Math.max(0, Math.min(100, score));
};

const getCategoryScore = (tags: string[], category: 'sleep' | 'activity' | 'food' | 'lifestyle'): number => {
  const weights = {
    sleep: {
      'Sleep Achiever': 95,
      'Early Bird': 85,
      'Lights-Out Sleeper': 80,
      'Night Owl': 70,
      'Nap Taker': 75,
      'Weekend Snoozer': 65,
      'Restless Sleeper': 40,
      'All-Nighter Pro': 35,
    },
    activity: {
      'Marathon Walker': 95,
      'Runner Pro': 95,
      'Yogi': 90,
      'Weight Lifter': 90,
      'Cyclist': 85,
      'Swimmer': 85,
      'Step Master': 80,
      'Active Hiker': 85,
      'Sunrise Sweater': 88,
      'Step Explorer': 70,
      'Run Regular': 82,
      'Step Starter': 55,
      'Off Beat Mover': 30,
    },
    food: {
      'Home Chef': 90,
      'Vegetarian Fun': 85,
      'Mediterranean Food Seeker': 88,
      'Sushi Lover': 80,
      'Italian Eats': 75,
      'Thai Bites': 78,
      'Breakfast Spot Finder': 72,
      'Mexican Food Finder': 70,
      'Chinese Foodie': 70,
      'Pizza Fan': 60,
      'Fast Food Fan': 40,
      'Snack Fan': 50,
    },
    lifestyle: {
      'Coffee Shop Regular': 75,
      'Pet Parent': 85,
      'The Networker': 80,
      'Homebody': 70,
      'Big Crowd Energy': 78,
      'Retail Fashion Shopper': 65,
      'Online Shopper': 60,
      'Sporting Goods Shopper': 75,
      'Casino Explorer': 55,
    }
  };
  
  if (tags.length === 0) return 50;
  
  const categoryWeights = weights[category] as Record<string, number>;
  const scores = tags.map(tag => categoryWeights[tag] || 60);
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
};

export const SoloOverallPage = ({ person }: SoloOverallPageProps) => {
  const wellnessScore = calculateWellnessScore(person);
  const sleepScore = getCategoryScore(person.tags.sleep, 'sleep');
  const activityScore = getCategoryScore(person.tags.activity, 'activity');
  const foodScore = getCategoryScore(person.tags.food, 'food');
  const lifestyleScore = getCategoryScore(person.tags.lifestyle, 'lifestyle');
  
  const allTags = Object.values(person.tags).flat();
  const totalTags = allTags.length;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-teal-600';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-orange-500 to-red-500';
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex flex-col p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute animate-scroll-right whitespace-nowrap text-white text-6xl font-bold" style={{ top: '15%' }}>
          Your Journey • Your Stats • Your Growth •
        </div>
        <div className="absolute animate-scroll-left whitespace-nowrap text-white text-6xl font-bold" style={{ top: '55%' }}>
          Health • Fitness • Balance • Wellness •
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-2 shadow-lg shadow-purple-500/50">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-1 text-center">Your Wellness Profile</h2>
        
        {/* Main Wellness Score */}
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-1">
          {wellnessScore}
        </div>
        <div className="text-sm font-semibold text-purple-400 mb-3">Overall Wellness Score</div>
        
        {/* Tag count */}
        <div className="flex items-center gap-1.5 mb-4">
          <Activity className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300 text-xs">{totalTags} Active Lifestyle Tags</span>
        </div>

        {/* Category Scores Grid */}
        <div className="w-full max-w-md grid grid-cols-2 gap-2 mb-6">
          {/* Sleep Score */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-2.5 border border-slate-700/50">
            <div className="flex items-center gap-1.5 mb-1">
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-semibold text-gray-300">Sleep</span>
            </div>
            <div className={`text-xl font-bold ${getScoreColor(sleepScore)}`}>
              {sleepScore}
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-1 mt-1.5">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(sleepScore)}`}
                style={{ width: `${sleepScore}%` }}
              />
            </div>
          </div>

          {/* Activity Score */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-2.5 border border-slate-700/50">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[10px] font-semibold text-gray-300">Activity</span>
            </div>
            <div className={`text-xl font-bold ${getScoreColor(activityScore)}`}>
              {activityScore}
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-1 mt-1.5">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(activityScore)}`}
                style={{ width: `${activityScore}%` }}
              />
            </div>
          </div>

          {/* Food Score */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-2.5 border border-slate-700/50">
            <div className="flex items-center gap-1.5 mb-1">
              <Utensils className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-semibold text-gray-300">Nutrition</span>
            </div>
            <div className={`text-xl font-bold ${getScoreColor(foodScore)}`}>
              {foodScore}
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-1 mt-1.5">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(foodScore)}`}
                style={{ width: `${foodScore}%` }}
              />
            </div>
          </div>

          {/* Lifestyle Score */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-2.5 border border-slate-700/50">
            <div className="flex items-center gap-1.5 mb-1">
              <Heart className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-semibold text-gray-300">Lifestyle</span>
            </div>
            <div className={`text-xl font-bold ${getScoreColor(lifestyleScore)}`}>
              {lifestyleScore}
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-1 mt-1.5">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(lifestyleScore)}`}
                style={{ width: `${lifestyleScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Insight message */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50 max-w-md">
          <p className="text-sm text-gray-300 text-center leading-relaxed">
            {wellnessScore >= 80 && "You're crushing it! Your lifestyle shows strong health patterns across the board. Keep up the great work!"}
            {wellnessScore >= 60 && wellnessScore < 80 && "You're doing great! There's room to optimize some areas, but you've got solid habits in place. Small tweaks can take you to the next level."}
            {wellnessScore < 60 && "Your lifestyle has potential for growth! Focus on the categories that need attention, and you'll see improvements in your overall wellness."}
          </p>
        </div>
      </div>
    </div>
  );
};
