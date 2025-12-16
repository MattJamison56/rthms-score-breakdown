import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { Person } from '../../types/compatibility';
import { generateCompatibilityReport, type CompatibilityReport } from '../../utils/geminiApi';

interface CompatibilityReportPageProps {
  person1: Person;
  person2: Person;
}

export const CompatibilityReportPage = ({ person1, person2 }: CompatibilityReportPageProps) => {
  const [report, setReport] = useState<CompatibilityReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      const data = await generateCompatibilityReport(person1, person2);
      setReport(data);
      setLoading(false);
    };

    fetchReport();
  }, [person1, person2]);

  return (
    <div className="h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 flex flex-col">
      <style>{`
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-white text-center">⚡️ Compatibility Reading</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-8 no-scrollbar">
        {loading || !report ? (
          <div className="flex flex-col items-center justify-center gap-3 text-gray-400 h-full">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm">Asking the cosmos...</span>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-lg">
              <div className="text-lg font-semibold text-white mb-1">{report.headline}</div>
              <div className="text-sm text-gray-300">{report.subheadline}</div>
            </div>

            {report.sections.map((section, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold text-base">
                  <span className="text-xl" aria-hidden>{section.emoji}</span>
                  <span>{section.title}</span>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">{section.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};