import { Utensils, Leaf, Pizza, Heart, ChefHat } from 'lucide-react';
import type { Person } from '../../types/compatibility';

interface SoloFoodPageProps {
  person: Person;
}

const getDietaryProfile = (tags: string[]): { profile: string; color: string; description: string } => {
  if (tags.includes('Home Chef') && tags.includes('Vegetarian Fun')) {
    return {
      profile: 'Health-Conscious Chef',
      color: 'text-emerald-400',
      description: 'You prioritize nutrition and cook at home'
    };
  }
  
  if (tags.includes('Home Chef')) {
    return {
      profile: 'Home Kitchen Master',
      color: 'text-teal-400',
      description: 'You love creating meals in your own kitchen'
    };
  }
  
  if (tags.includes('Vegetarian Fun') || tags.includes('Mediterranean Food Seeker')) {
    return {
      profile: 'Mindful Eater',
      color: 'text-green-400',
      description: 'You make conscious, healthy food choices'
    };
  }
  
  if (tags.some(t => ['Sushi Lover', 'Thai Bites', 'Italian Eats', 'Mexican Food Finder'].includes(t))) {
    return {
      profile: 'Global Explorer',
      color: 'text-yellow-400',
      description: 'You enjoy diverse international cuisines'
    };
  }
  
  if (tags.includes('Fast Food Fan') || tags.includes('Snack Fan')) {
    return {
      profile: 'Convenience Seeker',
      color: 'text-orange-400',
      description: 'You value quick and easy meal options'
    };
  }
  
  return {
    profile: 'Balanced Eater',
    color: 'text-gray-400',
    description: 'You enjoy a mix of different foods'
  };
};

const getFoodScore = (tags: string[]): number => {
  const weights = {
    'Home Chef': 90,
    'Vegetarian Fun': 85,
    'Mediterranean Food Seeker': 88,
    'Sushi Lover': 80,
    'Italian Eats': 75,
    'Thai Bites': 78,
    'Breakfast Spot Finder': 72,
    'Mexican Food Finder': 70,
    'Chinese Foodie': 70,
    'All-American Bites': 65,
    'Steakhouse Lover': 68,
    'Pizza Fan': 60,
    'Quickstop Shopper': 50,
    'Fast Food Fan': 40,
    'Snack Fan': 50,
  };
  
  if (tags.length === 0) return 50;
  
  const scores = tags.map(tag => weights[tag as keyof typeof weights] || 60);
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
};

const getNutritionBreakdown = (tags: string[]) => {
  const breakdown = {
    healthy: 0,
    balanced: 0,
    indulgent: 0
  };
  
  const healthyTags = ['Home Chef', 'Vegetarian Fun', 'Mediterranean Food Seeker', 'Sushi Lover'];
  const balancedTags = ['Thai Bites', 'Italian Eats', 'Chinese Foodie', 'Mexican Food Finder', 'Breakfast Spot Finder'];
  const indulgentTags = ['Pizza Fan', 'Fast Food Fan', 'Snack Fan', 'Steakhouse Lover', 'All-American Bites'];
  
  tags.forEach(tag => {
    if (healthyTags.includes(tag)) breakdown.healthy++;
    else if (balancedTags.includes(tag)) breakdown.balanced++;
    else if (indulgentTags.includes(tag)) breakdown.indulgent++;
  });
  
  return breakdown;
};

const getCuisineVariety = (tags: string[]): number => {
  const internationalCuisines = ['Sushi Lover', 'Thai Bites', 'Italian Eats', 'Mexican Food Finder', 'Chinese Foodie', 'Mediterranean Food Seeker'];
  const count = tags.filter(tag => internationalCuisines.includes(tag)).length;
  return Math.min(100, count * 20);
};

export const SoloFoodPage = ({ person }: SoloFoodPageProps) => {
  const foodTags = person.tags.food;
  const foodScore = getFoodScore(foodTags);
  const dietaryProfile = getDietaryProfile(foodTags);
  const breakdown = getNutritionBreakdown(foodTags);
  const cuisineVariety = getCuisineVariety(foodTags);
  
  const hasHomeCooking = foodTags.includes('Home Chef');
  const isVegetarian = foodTags.includes('Vegetarian Fun');

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 flex flex-col p-8 relative overflow-y-auto">
      <style>{`
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Header */}
      <div className="text-center mb-6 mt-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/50">
          <Utensils className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Food & Nutrition</h2>
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 mb-2">
          {foodScore}
        </div>
        <div className="text-sm text-emerald-400 font-semibold">Nutrition Score</div>
      </div>

      {/* Dietary Profile Badge */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 mb-6">
        <div className="text-center">
          <div className={`text-2xl font-bold ${dietaryProfile.color} mb-2`}>
            {dietaryProfile.profile}
          </div>
          <div className="text-xs text-gray-400">{dietaryProfile.description}</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="text-xs text-gray-400 mb-1">Cuisine Variety</div>
          <div className="text-2xl font-bold text-white">{cuisineVariety}%</div>
          <div className="text-xs text-gray-500 mt-1">diversity</div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="text-xs text-gray-400 mb-1">Food Tags</div>
          <div className="text-2xl font-bold text-white">{foodTags.length}</div>
          <div className="text-xs text-gray-500 mt-1">preferences</div>
        </div>
      </div>

      {/* Nutrition Breakdown */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 mb-6">
        <div className="text-sm font-semibold text-white mb-4 text-center">Nutrition Balance</div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-300">Healthy</span>
                <span className="text-xs text-emerald-400 font-semibold">{breakdown.healthy}</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-600"
                  style={{ width: `${Math.min(100, breakdown.healthy * 33)}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Heart className="w-4 h-4 text-yellow-400" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-300">Balanced</span>
                <span className="text-xs text-yellow-400 font-semibold">{breakdown.balanced}</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                  style={{ width: `${Math.min(100, breakdown.balanced * 33)}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Pizza className="w-4 h-4 text-orange-400" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-300">Indulgent</span>
                <span className="text-xs text-orange-400 font-semibold">{breakdown.indulgent}</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-600"
                  style={{ width: `${Math.min(100, breakdown.indulgent * 33)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Food Highlights */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {hasHomeCooking && (
          <div className="bg-emerald-500/10 backdrop-blur-sm rounded-lg p-3 border border-emerald-500/30 flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-300">Home Chef</span>
          </div>
        )}
        
        {isVegetarian && (
          <div className="bg-green-500/10 backdrop-blur-sm rounded-lg p-3 border border-green-500/30 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-400" />
            <span className="text-xs font-semibold text-green-300">Vegetarian</span>
          </div>
        )}
      </div>

      {/* Active Tags */}
      {foodTags.length > 0 && (
        <div className="mb-6">
          <div className="text-xs font-semibold text-gray-400 mb-3 text-center">Your Food Preferences</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {foodTags.map((tag, idx) => (
              <div 
                key={idx}
                className="bg-emerald-500/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-emerald-500/30"
              >
                <span className="text-xs text-emerald-200 font-medium">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
        <div className="text-sm font-semibold text-white mb-3 text-center">Nutrition Tips</div>
        <div className="space-y-2">
          {foodScore >= 80 && (
            <p className="text-xs text-gray-300 leading-relaxed">
              Excellent food choices! You're balancing nutrition with enjoyment. Keep exploring new cuisines and recipes.
            </p>
          )}
          {foodScore >= 60 && foodScore < 80 && (
            <p className="text-xs text-gray-300 leading-relaxed">
              Good food habits! Consider meal prepping or trying one new healthy recipe per week to boost your score.
            </p>
          )}
          {foodScore < 60 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-300 leading-relaxed">
                Let's level up your nutrition game! Try these changes:
              </p>
              <ul className="text-xs text-gray-400 space-y-1 ml-4">
                <li>• Cook at home 3-4 times per week</li>
                <li>• Add more vegetables to meals</li>
                <li>• Try Mediterranean or Asian cuisine</li>
                <li>• Reduce fast food to once per week</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
