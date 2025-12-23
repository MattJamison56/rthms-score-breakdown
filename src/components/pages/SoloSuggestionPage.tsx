import { useState, useEffect } from 'react';
import { Sparkles, Loader2, Lightbulb, Target, Calendar } from 'lucide-react';
import type { Person } from '../../types/compatibility';
import { generateSoloInsights, generateSoloActionItems } from '../../utils/geminiApi';

interface SoloSuggestionPageProps {
  category: 'sleep' | 'activity' | 'food' | 'lifestyle';
  title: string;
  description: string;
  gradientFrom: string;
  gradientVia: string;
  accentColor: string;
  iconBgColor: string;
  iconTextColor: string;
  hoverBorderColor: string;
  person: Person;
}

export const SoloSuggestionPage = ({ 
  category, 
  title, 
  description, 
  gradientFrom, 
  gradientVia, 
  accentColor,
  hoverBorderColor,
  person
}: SoloSuggestionPageProps) => {
  const [insight, setInsight] = useState<string>("");
  const [actionItems, setActionItems] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionsLoading, setActionsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      const text = await generateSoloInsights(category, person);
      setInsight(text);
      setLoading(false);
    };

    const fetchActions = async () => {
      setActionsLoading(true);
      const items = await generateSoloActionItems(category, person);
      setActionItems(items);
      setActionsLoading(false);
    };

    fetchInsight();
    fetchActions();
  }, [category, person]);

  return (
    <div className={`h-full bg-gradient-to-br ${gradientFrom} ${gradientVia} to-slate-900 overflow-y-auto relative`}>
      <style>{`
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="p-6 pb-20 no-scrollbar">
        <div className="text-center mb-6 mt-12">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${accentColor} flex items-center justify-center mx-auto mb-3 shadow-lg ${accentColor.replace('from-', 'shadow-')}/50`}>
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
          <p className="text-xs text-gray-400">{description}</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* AI Insight */}
          <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 ${hoverBorderColor} transition-all`}>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-semibold text-gray-200">Personalized Insight</span>
            </div>
            {loading ? (
              <div className="flex flex-col items-center gap-2 text-gray-400 py-4">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-xs">Analyzing your profile...</span>
              </div>
            ) : (
              <p className="text-sm text-gray-200 leading-relaxed">
                {insight}
              </p>
            )}
          </div>

          {/* Action Items */}
          <div className={`bg-slate-900/40 rounded-xl p-4 border border-slate-800/60 ${hoverBorderColor} transition-all`}>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-gray-200">Action Steps for You</span>
            </div>
            {actionsLoading ? (
              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs py-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating your action plan...</span>
              </div>
            ) : (
              <div className="space-y-2">
                {actionItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-xs text-gray-100 bg-slate-800/70 border border-slate-700/70 rounded-lg px-3 py-2.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="flex-1">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Encouragement Card */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
            <p className="text-xs text-center text-purple-200 leading-relaxed font-medium">
              Small changes lead to big results. Focus on one action at a time! 🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
