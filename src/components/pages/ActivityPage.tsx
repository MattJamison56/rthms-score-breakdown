import { Dumbbell } from 'lucide-react';
import type { Person, OverlapResult } from '../../types/compatibility';
import { getInsight } from '../../utils/insights';

interface ActivityPageProps {
  person1: Person;
  person2: Person;
  activityData: OverlapResult;
}

export const ActivityPage = ({ person1, person2, activityData }: ActivityPageProps) => {
  // Create matched pairs and unmatched items
  const person1Activities = person1.tags.activity;
  const person2Activities = person2.tags.activity;
  const maxLength = Math.max(person1Activities.length, person2Activities.length);
  
  return (
    <div className="h-full bg-linear-to-br from-slate-900 via-orange-950 to-slate-900 flex flex-col p-8 relative">
      <div className="text-center mb-4 mt-8">
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/50">
          <Dumbbell className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Activity Level</h2>
        <div className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-500">
          {activityData.percentage}%
        </div>
      </div>
      
      {/* Column headers */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="text-center text-[10px] font-semibold text-gray-500">
          You
        </div>
        <div className="text-center text-[10px] font-semibold text-gray-500">
          {person2.name}
        </div>
      </div>
      
      {/* Activity rows */}
      <div className="flex-1 flex flex-col gap-3 mb-6 overflow-y-auto no-scrollbar">
        <style>{`
          .no-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {Array.from({ length: maxLength }).map((_, idx) => {
          const person1Activity = person1Activities[idx];
          const person2Activity = person2Activities[idx];
          // Check if both have an activity AND if either one matches anything in overlapping
          const person1IsShared = person1Activity && activityData.overlapping.includes(person1Activity);
          const person2IsShared = person2Activity && activityData.overlapping.includes(person2Activity);
          
          return (
            <div 
              key={idx} 
              className="grid grid-cols-2 gap-2 animate-slide-in-down"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Person 1 - Left */}
              {person1Activity ? (
                <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl px-3 py-2 border transition-all ${
                  person1IsShared
                    ? 'border-orange-400/60 bg-orange-500/10' 
                    : 'border-slate-700/50'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <Dumbbell className={`w-3.5 h-3.5 shrink-0 ${person1IsShared ? 'text-orange-400' : 'text-gray-400'}`} />
                    <div className={`text-[10px] font-semibold ${person1IsShared ? 'text-orange-200' : 'text-white'}`}>
                      {person1Activity}
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              
              {/* Person 2 - Right */}
              {person2Activity ? (
                <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl px-3 py-2 border transition-all ${
                  person2IsShared
                    ? 'border-orange-400/60 bg-orange-500/10' 
                    : 'border-slate-700/50'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <Dumbbell className={`w-3.5 h-3.5 shrink-0 ${person2IsShared ? 'text-orange-400' : 'text-gray-400'}`} />
                    <div className={`text-[10px] font-semibold ${person2IsShared ? 'text-orange-200' : 'text-white'}`}>
                      {person2Activity}
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          );
        })}
      </div>

      {activityData.overlapping.length > 0 && (
        <div className="mb-6">
          <div className="text-orange-400 font-bold text-sm mb-2 text-center">
            {activityData.overlapping.length} Shared {activityData.overlapping.length === 1 ? 'Activity' : 'Activities'}
          </div>
        </div>
      )}

      {/* Insight */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <p className="text-sm text-gray-300 text-center leading-relaxed">
          {getInsight('activity', activityData)}
        </p>
      </div>
    </div>
  );
};
