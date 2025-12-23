import { Moon, Sun, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import type { Person } from '../../types/compatibility';

interface SoloSleepPageProps {
  person: Person;
}

const getSleepInsights = (tags: string[]) => {
  const insights = [];
  
  if (tags.includes('Sleep Achiever')) {
    insights.push({
      icon: TrendingUp,
      text: 'Excellent sleep consistency',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      detail: 'You consistently get 7+ hours of sleep'
    });
  }
  
  if (tags.includes('Early Bird')) {
    insights.push({
      icon: Sun,
      text: 'Morning person advantage',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      detail: 'Waking before 7 AM boosts productivity'
    });
  }
  
  if (tags.includes('Night Owl')) {
    insights.push({
      icon: Moon,
      text: 'Late-night rhythm',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      detail: 'You thrive after midnight'
    });
  }
  
  if (tags.includes('Restless Sleeper') || tags.includes('All-Nighter Pro')) {
    insights.push({
      icon: AlertCircle,
      text: 'Sleep needs attention',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      detail: 'Consider improving sleep duration'
    });
  }
  
  if (tags.includes('Nap Taker')) {
    insights.push({
      icon: Clock,
      text: 'Polyphasic sleeper',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      detail: 'Multiple sleep sessions per day'
    });
  }
  
  return insights;
};

const getSleepScore = (tags: string[]): number => {
  const weights = {
    'Sleep Achiever': 95,
    'Early Bird': 85,
    'Lights-Out Sleeper': 80,
    'Night Owl': 70,
    'Nap Taker': 75,
    'Weekend Snoozer': 65,
    'Restless Sleeper': 40,
    'All-Nighter Pro': 35,
  };
  
  if (tags.length === 0) return 50;
  
  const scores = tags.map(tag => weights[tag as keyof typeof weights] || 60);
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
};

const getAverageSleepHours = (tags: string[]): string => {
  if (tags.includes('Sleep Achiever')) return '7-8';
  if (tags.includes('All-Nighter Pro')) return '4-5';
  if (tags.includes('Restless Sleeper')) return '5-6';
  if (tags.includes('Weekend Snoozer')) return '6-7';
  return '6-7';
};

const getSleepTiming = (tags: string[]): string => {
  if (tags.includes('Early Bird')) return 'Early (Before 7 AM)';
  if (tags.includes('Night Owl')) return 'Late (After Midnight)';
  if (tags.includes('Lights-Out Sleeper')) return 'Consistent (Before 10 PM)';
  return 'Flexible';
};

export const SoloSleepPage = ({ person }: SoloSleepPageProps) => {
  const sleepTags = person.tags.sleep;
  const sleepScore = getSleepScore(sleepTags);
  const insights = getSleepInsights(sleepTags);
  const avgHours = getAverageSleepHours(sleepTags);
  const timing = getSleepTiming(sleepTags);
  
  const isEarly = sleepTags.includes('Early Bird');
  const isNight = sleepTags.includes('Night Owl');

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col p-8 relative overflow-y-auto">
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
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/50">
          <Moon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Sleep Analysis</h2>
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2">
          {sleepScore}
        </div>
        <div className="text-sm text-indigo-400 font-semibold">Sleep Quality Score</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="text-xs text-gray-400 mb-1">Avg. Sleep</div>
          <div className="text-2xl font-bold text-white">{avgHours}h</div>
          <div className="text-xs text-gray-500 mt-1">per night</div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="text-xs text-gray-400 mb-1">Schedule</div>
          <div className="text-lg font-bold text-white">{timing}</div>
          <div className="text-xs text-gray-500 mt-1">rhythm</div>
        </div>
      </div>

      {/* Visual sleep pattern indicator */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-6">
        <div className="text-sm font-semibold text-white mb-4 text-center">Your Sleep Pattern</div>
        <div className="flex items-center justify-center">
          <div className={`w-28 h-28 bg-gradient-to-br ${isEarly ? 'from-yellow-500/20 to-orange-500/20' : 'from-indigo-500/20 to-purple-500/20'} backdrop-blur-sm rounded-full flex items-center justify-center border-2 ${isEarly ? 'border-yellow-500/30' : 'border-indigo-500/30'}`}>
            {isEarly ? (
              <Sun className="w-14 h-14 text-yellow-400" />
            ) : (
              <Moon className="w-14 h-14 text-indigo-300" />
            )}
          </div>
        </div>
        <div className="text-center mt-4">
          <div className="text-white font-bold text-base">
            {isEarly && 'Early Bird'}
            {isNight && 'Night Owl'}
            {!isEarly && !isNight && 'Flexible Sleeper'}
          </div>
          <div className="text-gray-400 text-xs mt-1">
            {isEarly && 'You wake up before most people start their day'}
            {isNight && 'You come alive when the sun goes down'}
            {!isEarly && !isNight && 'Your schedule adapts to your needs'}
          </div>
        </div>
      </div>

      {/* Active Tags */}
      {sleepTags.length > 0 && (
        <div className="mb-6">
          <div className="text-xs font-semibold text-gray-400 mb-3 text-center">Your Sleep Tags</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {sleepTags.map((tag, idx) => (
              <div 
                key={idx}
                className="bg-indigo-500/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-indigo-500/30"
              >
                <span className="text-xs text-indigo-200 font-medium">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insights */}
      {insights.length > 0 && (
        <div className="space-y-3 mb-6">
          <div className="text-xs font-semibold text-gray-400 mb-3 text-center">Sleep Insights</div>
          {insights.map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <div 
                key={idx}
                className={`${insight.bgColor} backdrop-blur-sm rounded-xl p-4 border border-slate-700/50`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${insight.color} mt-0.5`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold text-sm ${insight.color}`}>{insight.text}</div>
                    <div className="text-xs text-gray-400 mt-1">{insight.detail}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
        <div className="text-sm font-semibold text-white mb-3 text-center">Recommendations</div>
        <div className="space-y-2">
          {sleepScore >= 80 && (
            <p className="text-xs text-gray-300 leading-relaxed">
              Your sleep habits are excellent! Maintain this consistency and consider tracking your sleep quality metrics.
            </p>
          )}
          {sleepScore >= 60 && sleepScore < 80 && (
            <p className="text-xs text-gray-300 leading-relaxed">
              Good sleep foundation! Try optimizing your bedtime routine and aim for more consistent wake times.
            </p>
          )}
          {sleepScore < 60 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-300 leading-relaxed">
                Your sleep could use some attention. Try these improvements:
              </p>
              <ul className="text-xs text-gray-400 space-y-1 ml-4">
                <li>• Aim for 7-8 hours per night</li>
                <li>• Set a consistent bedtime</li>
                <li>• Create a relaxing pre-sleep routine</li>
                <li>• Limit screen time before bed</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
