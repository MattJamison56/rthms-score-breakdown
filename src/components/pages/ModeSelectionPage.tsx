import { Heart, Users, User, Trash2 } from 'lucide-react';

interface ModeSelectionPageProps {
  onSelectMode: (mode: 'solo' | 'dating' | 'friendship') => void;
}

export const ModeSelectionPage = ({ onSelectMode }: ModeSelectionPageProps) => {
  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
      localStorage.removeItem('rthms_person1_tags');
      localStorage.removeItem('rthms_person2_tags');
      window.location.reload();
    }
  };

  return (
    <div className="w-full h-full bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 flex flex-col items-center justify-center p-8">
      <div className="space-y-4 w-full max-w-md">
        <button
          onClick={() => onSelectMode('solo')}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-4"
        >
          <User size={32} />
          <span className="text-2xl">Solo</span>
        </button>

        <button
          onClick={() => onSelectMode('dating')}
          className="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-4"
        >
          <Heart size={32} />
          <span className="text-2xl">Dating</span>
        </button>

        <button
          onClick={() => onSelectMode('friendship')}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-4"
        >
          <Users size={32} />
          <span className="text-2xl">Friendship</span>
        </button>

        <button
          onClick={handleClearData}
          className="w-3/4 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-gray-300 font-semibold py-2 px-4 rounded-lg shadow-lg transition-all flex items-center justify-center gap-1.5 mt-6 mx-auto text-sm"
        >
          <Trash2 size={14} />
          <span>Clear All Data</span>
        </button>
      </div>
    </div>
  );
};
