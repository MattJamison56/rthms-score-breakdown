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
  person2
}: SuggestionPageProps) => {
  const [suggestion, setSuggestion] = useState<string>("");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [ideasLoading, setIdeasLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSuggestion = async () => {
      setLoading(true);
      const text = await generateCompatibilitySuggestion(category, person1, person2);
      setSuggestion(text);
      setLoading(false);
    };

    const fetchIdeas = async () => {
      setIdeasLoading(true);
      const list = await generateShortIdeas(category, person1, person2);
      setIdeas(list);
      setIdeasLoading(false);
    };

    fetchSuggestion();
    fetchIdeas();
  }, [category, person1, person2]);

  return (
    <div className={`h-full bg-linear-to-br ${gradientFrom} ${gradientVia} to-slate-900 flex flex-col p-8 relative`}>
      <div className="text-center mb-8 mt-8">
        <div className={`w-16 h-16 rounded-full bg-linear-to-br ${accentColor} flex items-center justify-center mx-auto mb-4 shadow-lg ${accentColor.replace('from-', 'shadow-')}/50`}>
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-sm text-gray-400">{description}</p>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-6">
        <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 ${hoverBorderColor} transition-all min-h-[200px] flex items-center justify-center`}>
          {loading ? (
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-sm">Consulting the AI matchmaker...</span>
            </div>
          ) : (
            <p className="text-lg text-gray-200 leading-relaxed text-center">
              {suggestion}
            </p>
          )}
        </div>

        <div className={`bg-slate-900/40 rounded-xl p-4 border border-slate-800/60 ${hoverBorderColor} transition-all`}>
          <div className="text-sm font-semibold text-gray-200 mb-3 text-center">Quick ideas for you two</div>
          {ideasLoading ? (
            <div className="flex items-center justify-center gap-3 text-gray-400 text-sm">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Gathering ideas...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {ideas.map((idea, idx) => (
                <div
                  key={idx}
                  className="w-full text-center text-sm text-gray-100 bg-slate-800/70 border border-slate-700/70 rounded-lg px-3 py-2 truncate"
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
  );
};
