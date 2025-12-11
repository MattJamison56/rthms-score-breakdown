import { X } from 'lucide-react';
import { TAG_DESCRIPTIONS, ALL_TAGS } from '../../data/allTags';

interface TagInfoPageProps {
  onClose: () => void;
}

export const TagInfoPage = ({ onClose }: TagInfoPageProps) => {
  const categoryColors = {
    sleep: 'from-purple-500 to-pink-600',
    activity: 'from-green-500 to-emerald-600',
    food: 'from-orange-500 to-red-600',
    lifestyle: 'from-blue-500 to-cyan-600'
  };

  return (
    <div className="w-full h-full bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 overflow-y-auto no-scrollbar flex flex-col">
      {/* Sticky Exit Button */}
      <div className="sticky top-0 bg-gradient-to-b from-slate-950 via-purple-950 to-transparent pb-4 z-10 flex justify-end px-6 pt-6">
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-full transition-all text-gray-400 hover:text-white"
        >
          <X size={28} />
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-8 px-6 pb-6">
        {(Object.keys(ALL_TAGS) as Array<keyof typeof ALL_TAGS>).map(category => (
          <div key={category} className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800">
            <h2 className={`text-2xl font-bold mb-4 bg-linear-to-r ${categoryColors[category]} bg-clip-text text-transparent capitalize`}>
              {category}
            </h2>
            <div className="space-y-3">
              {ALL_TAGS[category].map(tag => (
                <div key={tag} className="border-l-2 border-slate-700 pl-4 py-2">
                  <p className="font-semibold text-white text-sm mb-1">{tag}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {TAG_DESCRIPTIONS[tag] || 'No description available'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
