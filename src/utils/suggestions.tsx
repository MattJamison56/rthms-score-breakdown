import { Clock, Moon, Coffee, Utensils, Calendar, MapPin, Dumbbell, Plane, Music, Home } from 'lucide-react';
import type { Suggestions } from '../types/compatibility';

export const getSuggestions = (category: keyof Suggestions): Suggestions[keyof Suggestions] => {
  const suggestions: Suggestions = {
    sleep: [
      { icon: <Clock className="w-5 h-5" />, text: "Try a weekend morning routine together", time: "Sat 9AM" },
      { icon: <Moon className="w-5 h-5" />, text: "Respect each other's wind-down times", time: "Nightly" },
      { icon: <Coffee className="w-5 h-5" />, text: "Coffee date when you're both awake", time: "Flexible" }
    ],
    food: [
      { icon: <Utensils className="w-5 h-5" />, text: "Try the new sushi spot downtown", time: "This week" },
      { icon: <Calendar className="w-5 h-5" />, text: "Cooking night: teach each other recipes", time: "Friday" },
      { icon: <MapPin className="w-5 h-5" />, text: "Food tour of your favorite cuisines", time: "Weekend" }
    ],
    activity: [
      { icon: <Dumbbell className="w-5 h-5" />, text: "Morning yoga + weights combo session", time: "Weekday AM" },
      { icon: <MapPin className="w-5 h-5" />, text: "Hiking trail with scenic views", time: "Saturday" },
      { icon: <Calendar className="w-5 h-5" />, text: "Step challenge: compete for the week", time: "Mon-Sun" }
    ],
    lifestyle: [
      { icon: <Plane className="w-5 h-5" />, text: "Plan your next travel adventure", time: "This month" },
      { icon: <Music className="w-5 h-5" />, text: "Concert or live music night", time: "Check local" },
      { icon: <Home className="w-5 h-5" />, text: "Pet playdate + chill evening", time: "Anytime" }
    ]
  };
  return suggestions[category] || [];
};
