import { Sparkles } from 'lucide-react';
import type { Suggestions } from '../../types/compatibility';
import { getSuggestions } from '../../utils/suggestions';

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
}

export const SuggestionPage = ({ 
  category, 
  title, 
  description, 
  gradientFrom, 
  gradientVia, 
  accentColor,
  iconBgColor,
  iconTextColor,
  timeTextColor,
  hoverBorderColor
}: SuggestionPageProps) => {
  return (
    <div className={`h-full bg-linear-to-br ${gradientFrom} ${gradientVia} to-slate-900 flex flex-col p-8 relative`}>
      <div className="text-center mb-8 mt-8">
        <div className={`w-16 h-16 rounded-full bg-linear-to-br ${accentColor} flex items-center justify-center mx-auto mb-4 shadow-lg ${accentColor.replace('from-', 'shadow-')}/50`}>
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-sm text-gray-400">{description}</p>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-4">
        {getSuggestions(category).map((suggestion, idx) => (
          <div key={idx} className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 ${hoverBorderColor} transition-all`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center ${iconTextColor} shrink-0`}>
                {suggestion.icon}
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold mb-1">{suggestion.text}</div>
                <div className={`${timeTextColor} text-xs font-medium`}>{suggestion.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
