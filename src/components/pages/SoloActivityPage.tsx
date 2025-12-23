import { Dumbbell, TrendingUp, Zap, Target, Award } from 'lucide-react';
import type { Person } from '../../types/compatibility';

interface SoloActivityPageProps {
  person: Person;
}

const getActivityLevel = (tags: string[]): { level: string; color: string; description: string } => {
  const highIntensity = ['Marathon Walker', 'Runner Pro', 'Weight Lifter', 'Cyclist', 'Swimmer', 'Active Hiker'];
  const mediumIntensity = ['Step Master', 'Run Regular', 'Yogi', 'Step Explorer'];
  const lowIntensity = ['Step Starter', 'Off Beat Mover'];
  
  const hasHigh = tags.some(tag => highIntensity.includes(tag));
  const hasMedium = tags.some(tag => mediumIntensity.includes(tag));
  const hasLow = tags.some(tag => lowIntensity.includes(tag));
  
  if (hasHigh) {
    return {
      level: 'High Performer',
      color: 'text-emerald-400',
      description: 'You maintain an intense, consistent fitness routine'
    };
  } else if (hasMedium) {
    return {
      level: 'Active Mover',
      color: 'text-yellow-400',
      description: 'You stay active with regular movement'
    };
  } else if (hasLow) {
    return {
      level: 'Building Momentum',
      color: 'text-orange-400',
      description: 'You\'re starting your fitness journey'
    };
  }
  
  return {
    level: 'Getting Started',
    color: 'text-gray-400',
    description: 'Time to add some movement to your day'
  };
};

const getActivityScore = (tags: string[]): number => {
  const weights = {
    'Marathon Walker': 95,
    'Runner Pro': 95,
    'Yogi': 90,
    'Weight Lifter': 90,
    'Cyclist': 85,
    'Swimmer': 85,
    'Step Master': 80,
    'Active Hiker': 85,
    'Sunrise Sweater': 88,
    'Weight Room Warrior': 90,
    'Step Explorer': 70,
    'Run Regular': 82,
    'Stretch Mode': 75,
    'Meditator': 70,
    'Step Starter': 55,
    'Off Beat Mover': 30,
  };
  
  if (tags.length === 0) return 30;
  
  const scores = tags.map(tag => weights[tag as keyof typeof weights] || 60);
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
};

const getWeeklyCalories = (tags: string[]): number => {
  const calorieMap: Record<string, number> = {
    'Marathon Walker': 2800,
    'Runner Pro': 3200,
    'Weight Lifter': 2400,
    'Cyclist': 2600,
    'Swimmer': 2800,
    'Yogi': 1200,
    'Active Hiker': 1800,
    'Step Master': 1600,
    'Run Regular': 2000,
    'Weight Room Warrior': 2200,
    'Step Explorer': 1000,
    'Stretch Mode': 600,
    'Meditator': 400,
    'Step Starter': 500,
    'Off Beat Mover': 200,
  };
  
  if (tags.length === 0) return 0;
  
  return tags.reduce((sum, tag) => sum + (calorieMap[tag] || 800), 0);
};

const getActivityStrengths = (tags: string[]) => {
  const strengths = [];
  
  if (tags.some(t => ['Runner Pro', 'Run Regular', 'Marathon Walker'].includes(t))) {
    strengths.push({ icon: Zap, text: 'Cardio Champion', color: 'text-red-400' });
  }
  
  if (tags.some(t => ['Weight Lifter', 'Weight Room Warrior'].includes(t))) {
    strengths.push({ icon: Dumbbell, text: 'Strength Builder', color: 'text-orange-400' });
  }
  
  if (tags.some(t => ['Yogi', 'Stretch Mode', 'Meditator'].includes(t))) {
    strengths.push({ icon: Target, text: 'Mind-Body Balance', color: 'text-purple-400' });
  }
  
  if (tags.includes('Sunrise Sweater')) {
    strengths.push({ icon: Award, text: 'Morning Warrior', color: 'text-yellow-400' });
  }
  
  if (tags.some(t => ['Cyclist', 'Swimmer', 'Active Hiker'].includes(t))) {
    strengths.push({ icon: TrendingUp, text: 'Endurance Expert', color: 'text-cyan-400' });
  }
  
  return strengths;
};

export const SoloActivityPage = ({ person }: SoloActivityPageProps) => {
  const activityTags = person.tags.activity;
  const activityScore = getActivityScore(activityTags);
  const activityLevel = getActivityLevel(activityTags);
  const weeklyCalories = getWeeklyCalories(activityTags);
  const strengths = getActivityStrengths(activityTags);

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 flex flex-col p-8 relative overflow-y-auto">
      <style>{`
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Header */}
      <div className="text-center mb-6 mt-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/50">
          <Dumbbell className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Activity Analysis</h2>
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-2">
          {activityScore}
        </div>
        <div className="text-sm text-orange-400 font-semibold">Fitness Score</div>
      </div>

      {/* Activity Level Badge */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 mb-6">
        <div className="text-center">
          <div className={`text-2xl font-bold ${activityLevel.color} mb-2`}>
            {activityLevel.level}
          </div>
          <div className="text-xs text-gray-400">{activityLevel.description}</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="text-xs text-gray-400 mb-1">Weekly Burn</div>
          <div className="text-2xl font-bold text-white">{weeklyCalories.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">calories</div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="text-xs text-gray-400 mb-1">Activities</div>
          <div className="text-2xl font-bold text-white">{activityTags.length}</div>
          <div className="text-xs text-gray-500 mt-1">tracked</div>
        </div>
      </div>

      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="mb-6">
          <div className="text-xs font-semibold text-gray-400 mb-3 text-center">Your Strengths</div>
          <div className="grid grid-cols-2 gap-2">
            {strengths.map((strength, idx) => {
              const Icon = strength.icon;
              return (
                <div 
                  key={idx}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50 flex items-center gap-2"
                >
                  <Icon className={`w-4 h-4 ${strength.color}`} />
                  <span className={`text-xs font-semibold ${strength.color}`}>{strength.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Tags */}
      {activityTags.length > 0 && (
        <div className="mb-6">
          <div className="text-xs font-semibold text-gray-400 mb-3 text-center">Your Activity Tags</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {activityTags.map((tag, idx) => (
              <div 
                key={idx}
                className="bg-orange-500/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-orange-500/30"
              >
                <span className="text-xs text-orange-200 font-medium">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Breakdown Visual */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 mb-6">
        <div className="text-sm font-semibold text-white mb-4 text-center">Activity Distribution</div>
        <div className="space-y-2">
          {activityTags.length > 0 ? (
            activityTags.slice(0, 5).map((tag, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="text-xs text-gray-400 w-32 truncate">{tag}</div>
                <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-600"
                    style={{ width: `${85 - idx * 10}%` }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-xs text-gray-500 text-center py-4">No activities tracked yet</div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
        <div className="text-sm font-semibold text-white mb-3 text-center">Recommendations</div>
        <div className="space-y-2">
          {activityScore >= 85 && (
            <p className="text-xs text-gray-300 leading-relaxed">
              You're an activity powerhouse! Consider tracking recovery metrics and mixing in rest days to optimize performance.
            </p>
          )}
          {activityScore >= 70 && activityScore < 85 && (
            <p className="text-xs text-gray-300 leading-relaxed">
              Strong activity habits! Try adding variety with cross-training or a new sport to challenge different muscle groups.
            </p>
          )}
          {activityScore >= 50 && activityScore < 70 && (
            <p className="text-xs text-gray-300 leading-relaxed">
              You're building momentum! Aim to increase intensity or frequency gradually. Consider setting weekly step goals.
            </p>
          )}
          {activityScore < 50 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-300 leading-relaxed">
                Time to get moving! Start small with these achievable goals:
              </p>
              <ul className="text-xs text-gray-400 space-y-1 ml-4">
                <li>• Walk 5,000 steps daily</li>
                <li>• Try 10-minute morning stretches</li>
                <li>• Schedule 2-3 workouts per week</li>
                <li>• Find an activity you enjoy</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
