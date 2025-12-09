import { Heart } from 'lucide-react';
import type { OverlapResult } from '../../types/compatibility';
import { getInsight } from '../../utils/insights';

interface OverallPageProps {
  overallOverlap: OverlapResult;
}

export const OverallPage = ({ overallOverlap }: OverallPageProps) => {
  return (
    <div className="h-full bg-linear-to-br from-gray-900 via-slate-900 to-gray-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background categories */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute animate-scroll-right whitespace-nowrap text-white text-6xl font-bold" style={{ top: '15%' }}>
          Sleep • Food • Activity • Lifestyle • Wellness •
        </div>
        <div className="absolute animate-scroll-left whitespace-nowrap text-white text-6xl font-bold" style={{ top: '35%' }}>
          Travel • Music • Coffee • Fitness • Adventure •
        </div>
        <div className="absolute animate-scroll-right whitespace-nowrap text-white text-6xl font-bold" style={{ top: '55%' }}>
          Late Nights • Early Mornings • Date Nights •
        </div>
        <div className="absolute animate-scroll-left whitespace-nowrap text-white text-6xl font-bold" style={{ top: '75%' }}>
          Sushi • Yoga • Running • Gaming • Reading •
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/50">
          <Heart className="w-12 h-12 text-white" fill="currentColor" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Your Match</h2>
        <div className="text-8xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 mb-6">
          {overallOverlap.percentage}%
        </div>
        <div className="text-xl font-semibold text-cyan-400 mb-6">
          {overallOverlap.overlapping.length} Shared Vibes
        </div>
        <p className="text-base text-gray-300 text-center leading-relaxed px-4 max-w-sm">
          {getInsight('overall', overallOverlap)}
        </p>
      </div>
    </div>
  );
};
