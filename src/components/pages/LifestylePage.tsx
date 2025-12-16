import { Coffee } from 'lucide-react';
import type { Person, OverlapResult } from '../../types/compatibility';
import { getInsight } from '../../utils/insights';
import { getLifestyleIcon } from '../../utils/iconHelpers';

interface LifestylePageProps {
  person1: Person;
  person2: Person;
  lifestyleData: OverlapResult;
}

export const LifestylePage = ({ person1, person2, lifestyleData }: LifestylePageProps) => {
  return (
    <div className="h-full bg-linear-to-br from-slate-900 via-cyan-950 to-slate-900 flex flex-col p-8 relative">
      <div className="text-center mb-6 mt-8">
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/50">
          <Coffee className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Lifestyle Vibe</h2>
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
          {lifestyleData.percentage}%
        </div>
      </div>
      
      {/* Timeline/spectrum visualization */}
      <div className="w-full mb-4 flex-1 flex items-center">
        <div className="relative h-32 w-full">
          {/* Connection lines - rendered first so they're behind */}
          {lifestyleData.overlapping.length > 0 && (
            <>
              <div className="absolute left-[30%] top-1/2 w-[12%] h-0.5 bg-cyan-500/30 z-0"></div>
              <div className="absolute right-[30%] top-1/2 w-[12%] h-0.5 bg-cyan-500/30 z-0"></div>
            </>
          )}
          
          {/* Center shared zone */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-20 h-20 rounded-full bg-cyan-500/20 backdrop-blur-sm border-3 border-cyan-400/50 flex flex-col items-center justify-center shadow-lg shadow-cyan-500/30">
              <div className="text-white text-2xl font-bold">{lifestyleData.overlapping.length}</div>
              <div className="text-cyan-400 text-[10px] font-semibold">Shared</div>
            </div>
          </div>
          
          {/* Person 1 zone - left side */}
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
            <div className="flex flex-col items-start gap-2">
              {person1.tags.lifestyle.slice(0, 3).map((item, idx) => (
                <div 
                  key={item} 
                  className="bg-slate-800/50 backdrop-blur-sm rounded-lg px-2 py-1.5 flex items-center gap-1.5 text-white text-[10px] border border-slate-700/50 animate-slide-in-left"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <span className="text-xs">{getLifestyleIcon(item)}</span>
                  <span className="whitespace-nowrap">{item.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Person 2 zone - right side */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
            <div className="flex flex-col items-end gap-2">
              {person2.tags.lifestyle.slice(0, 3).map((item, idx) => (
                <div 
                  key={item} 
                  className="bg-slate-800/50 backdrop-blur-sm rounded-lg px-2 py-1.5 flex items-center gap-1.5 text-white text-[10px] border border-slate-700/50 animate-slide-in-right"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <span className="whitespace-nowrap">{item.split(' ')[0]}</span>
                  <span className="text-xs">{getLifestyleIcon(item)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shared interests tags */}
      {lifestyleData.overlapping.length > 0 && (
        <div className="mb-4">
          <div className="text-cyan-400 font-bold text-xs mb-2 text-center">You Both Vibe With</div>
          <div className="flex gap-1.5 justify-center flex-wrap px-1">
            {lifestyleData.overlapping.map(item => (
              <div key={item} className="bg-cyan-500/20 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 border-2 border-cyan-500/30 whitespace-nowrap">
                <div className="text-cyan-400 text-xs">{getLifestyleIcon(item)}</div>
                <div className="text-white text-[10px] font-semibold">{item}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insight */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-3 border border-slate-700/50">
        <p className="text-sm text-gray-300 text-center leading-relaxed">
          {getInsight('lifestyle', lifestyleData)}
        </p>
      </div>
    </div>
  );
};
