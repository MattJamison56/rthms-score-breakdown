import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Target, Heart, Loader2 } from 'lucide-react';
import type { Person } from '../../types/compatibility';
import { generateCompatibilityReport, type CompatibilitySection } from '../../utils/geminiApi';

interface SoloReportPageProps {
  person: Person;
}

export const SoloReportPage = ({ person }: SoloReportPageProps) => {
  const [sections, setSections] = useState<CompatibilitySection[]>([]);
  const [headline, setHeadline] = useState<string>("");
  const [subheadline, setSubheadline] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      // Create a dummy person2 for the API call since it expects two people
      const dummyPerson = { name: '', tags: { sleep: [], activity: [], food: [], wellness: [], lifestyle: [], entertainment: [] } };
      const report = await generateCompatibilityReport(person, dummyPerson, 'solo');
      setHeadline(report.headline);
      setSubheadline(report.subheadline);
      setSections(report.sections);
      setLoading(false);
    };

    fetchReport();
  }, [person]);

  if (loading) {
    return (
      <div className="h-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex flex-col items-center justify-center p-8">
        <Loader2 className="w-12 h-12 text-purple-400 animate-spin mb-4" />
        <p className="text-gray-300 text-sm">Crafting your personal report...</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-y-auto">
      <style>{`
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      <div className="p-6 pb-24 no-scrollbar">
        {/* Header */}
        <div className="text-center mb-8 mt-12">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{headline}</h1>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">{subheadline}</p>
        </div>

        {/* Decorative Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8 max-w-md mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50 text-center">
            <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <div className="text-xs text-gray-400">Growth</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50 text-center">
            <Target className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
            <div className="text-xs text-gray-400">Focus</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50 text-center">
            <Heart className="w-5 h-5 text-pink-400 mx-auto mb-1" />
            <div className="text-xs text-gray-400">Balance</div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4 max-w-lg mx-auto">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50 hover:border-purple-500/50 transition-all animate-slide-in-down"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl">{section.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white">{section.title}</h3>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed pl-12">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Encouragement */}
        <div className="mt-8 max-w-lg mx-auto">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 text-center">
            <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-sm text-purple-200 leading-relaxed font-medium">
              Your journey is uniquely yours. Keep growing, stay curious, and celebrate every small win along the way! 🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
