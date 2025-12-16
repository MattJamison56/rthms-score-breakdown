import { useState, useEffect } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import type { Suggestions, Person } from '../../types/compatibility';
import { generateCompatibilitySuggestion, generateShortIdeas } from '../../utils/geminiApi';

interface SuggestionPageProps {
  category: keyof Suggestions;
  title: string;
  description: string;
  gradientFrom: string;
  gradientVia: string;
  accentColor: string;
  iconBgColor: string;
  iconTextColor: string;
  timeTextColor: string;
  hoverBorderColor: string;
  person1: Person;
  person2: Person;
  mode: 'solo' | 'dating' | 'friendship';
}

export const SuggestionPage = ({ 
  category, 
  title, 
  description, 
  gradientFrom, 
  gradientVia, 
  accentColor,
  hoverBorderColor,
  person1,
  person2,
  mode
}: SuggestionPageProps) => {
  const [suggestion, setSuggestion] = useState<string>("");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [ideasLoading, setIdeasLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(`SuggestionPage (${category}) calling API with mode:`, mode);
    const fetchSuggestion = async () => {
      setLoading(true);
      const text = await generateCompatibilitySuggestion(category, person1, person2, mode);
      setSuggestion(text);
      setLoading(false);
    };

    const fetchIdeas = async () => {
      setIdeasLoading(true);
      const list = await generateShortIdeas(category, person1, person2, mode);
      setIdeas(list);
      setIdeasLoading(false);
    };

    fetchSuggestion();
    fetchIdeas();
  }, [category, person1, person2, mode]);

  return (
    <div className={`h-full bg-linear-to-br ${gradientFrom} ${gradientVia} to-slate-900 overflow-y-auto relative`}>
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
          <div className={`w-12 h-12 rounded-full bg-linear-to-br ${accentColor} flex items-center justify-center mx-auto mb-3 shadow-lg ${accentColor.replace('from-', 'shadow-')}/50`}>
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
          <p className="text-xs text-gray-400">{description}</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 ${hoverBorderColor} transition-all`}>
            {loading ? (
              <div className="flex flex-col items-center gap-2 text-gray-400 py-4">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-xs">Consulting the AI matchmaker...</span>
              </div>
            ) : (
              <p className="text-sm text-gray-200 leading-relaxed text-center">
                {suggestion}
              </p>
            )}
          </div>

          <div className={`bg-slate-900/40 rounded-xl p-4 border border-slate-800/60 ${hoverBorderColor} transition-all`}>
            <div className="text-xs font-semibold text-gray-200 mb-3 text-center">Quick ideas for you two</div>
            {ideasLoading ? (
              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs py-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gathering ideas...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {ideas.map((idea, idx) => (
                  <div
                    key={idx}
                    className="w-full text-center text-xs text-gray-100 bg-slate-800/70 border border-slate-700/70 rounded-lg px-3 py-2 truncate"
                    title={idea}
                  >
                    {idea}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
