import { X } from "lucide-react";

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
}

export const Navigation = ({ currentPage, totalPages, onNext, onReset }: NavigationProps) => {
  const isFirstPage = currentPage === 0;
  
  return (
    <>
      {/* Page Counter */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentPage ? 'w-8 bg-cyan-400' : 'w-1.5 bg-gray-700'
            }`}
          />
        ))}
      </div>

      {/* Let's Go Button - Only show on first page */}
      {isFirstPage && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={onNext}
            className="px-12 py-4 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-lg shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all hover:scale-105"
          >
            LET'S GO
          </button>
        </div>
      )}

      <button
        onClick={onReset}
        className="absolute top-6 right-6 text-gray-600 hover:text-cyan-400 text-sm z-20 transition-colors"
      >
        <X />
      </button>
    </>
  );
};
