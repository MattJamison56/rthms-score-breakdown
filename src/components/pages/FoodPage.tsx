import { Utensils } from 'lucide-react';
import type { Person, OverlapResult } from '../../types/compatibility';
import { getInsight } from '../../utils/insights';
import { getCuisineIcon } from '../../utils/iconHelpers';

interface FoodPageProps {
  person1: Person;
  person2: Person;
  foodData: OverlapResult;
}

export const FoodPage = ({ person1, person2, foodData }: FoodPageProps) => {
  return (
    <div className="h-full bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 flex flex-col p-8 relative">
      <div className="text-center mb-6 mt-8">
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/50">
          <Utensils className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Food & Dining</h2>
        <div className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-500">
          {foodData.percentage}%
        </div>
      </div>
      
      {/* Top overlapping cuisines */}
      <div className="flex-1 flex flex-col justify-center">
        {foodData.overlapping.length > 0 ? (
          <div className="mb-8">
            <div className="text-emerald-400 font-bold text-sm mb-4 text-center">You Both Love</div>
            <div className="flex gap-4 justify-center items-start">
              {foodData.overlapping.slice(0, 3).map(cuisine => (
                <div key={cuisine} className="text-center flex flex-col items-center">
                  <div className="w-18 h-18 bg-emerald-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl mb-2 border-2 border-emerald-500/30">
                    {getCuisineIcon(cuisine)}
                  </div>
                  <div className="text-gray-300 text-xs max-w-20">{cuisine.replace(' Lover', '').replace(' Fan', '')}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Unique cuisines */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50">
            <div className="text-gray-400 font-bold text-xs mb-3">Person 1</div>
            <div className="flex flex-wrap gap-2">
              {person1.tags.food.slice(0, 3).map(food => (
                <span key={food} className="text-xl">{getCuisineIcon(food)}</span>
              ))}
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50">
            <div className="text-gray-400 font-bold text-xs mb-3">Person 2</div>
            <div className="flex flex-wrap gap-2">
              {person2.tags.food.slice(0, 3).map(food => (
                <span key={food} className="text-xl">{getCuisineIcon(food)}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 mt-6">
        <p className="text-sm text-gray-300 text-center leading-relaxed">
          {getInsight('food', foodData)}
        </p>
      </div>
    </div>
  );
};
