import { Moon, Sun } from 'lucide-react';
import type { Person, OverlapResult } from '../../types/compatibility';
import { getInsight } from '../../utils/insights';

interface SleepPageProps {
  person1: Person;
  person2: Person;
  sleepData: OverlapResult;
}

export const SleepPage = ({ person1, person2, sleepData }: SleepPageProps) => {
  const p1IsEarly = person1.tags.sleep.includes('Early Bird');
  const p2IsNight = person2.tags.sleep.includes('Night Owl');
  
  return (
    <div className="h-full bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col p-8 relative">
      {/* Header */}
      <div className="text-center mb-8 mt-8">
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/50">
          <Moon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Sleep Patterns</h2>
        <div className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">
          {sleepData.percentage}%
        </div>
      </div>
      
      {/* Visual comparison */}
      <div className="flex-1 flex items-center justify-center mb-8">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-linear-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 border-2 border-yellow-500/30">
              {p1IsEarly ? <Sun className="w-14 h-14 text-yellow-400" /> : <Moon className="w-14 h-14 text-indigo-300" />}
            </div>
            <div className="text-white font-bold text-sm">Person 1</div>
            <div className="text-gray-400 text-xs mt-1 whitespace-nowrap">{person1.tags.sleep[0]}</div>
          </div>
          
          <div className="text-3xl text-gray-600">vs</div>
          
          <div className="text-center">
            <div className="w-24 h-24 bg-linear-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 border-2 border-indigo-500/30">
              {p2IsNight ? <Moon className="w-14 h-14 text-indigo-300" /> : <Sun className="w-14 h-14 text-yellow-400" />}
            </div>
            <div className="text-white font-bold text-sm">Person 2</div>
            <div className="text-gray-400 text-xs mt-1 whitespace-nowrap">{person2.tags.sleep[0]}</div>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <p className="text-sm text-gray-300 text-center leading-relaxed">
          {getInsight('sleep', sleepData)}
        </p>
      </div>
    </div>
  );
};
