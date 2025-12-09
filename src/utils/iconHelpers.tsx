import { Plane, Music, BookOpen, ShoppingBag, Gamepad2, Home, Coffee } from 'lucide-react';

export const getCuisineIcon = (cuisine: string | string[]) => {
  if (cuisine.includes('Sushi')) return '🍣';
  if (cuisine.includes('Pizza')) return '🍕';
  if (cuisine.includes('Thai')) return '🍜';
  if (cuisine.includes('Mexican')) return '🌮';
  if (cuisine.includes('Steakhouse')) return '🥩';
  if (cuisine.includes('Coffee')) return '☕';
  if (cuisine.includes('Vegetarian')) return '🥗';
  if (cuisine.includes('Mediterranean')) return '🫒';
  if (cuisine.includes('Chinese')) return '🥡';
  if (cuisine.includes('Italian')) return '🍝';
  if (cuisine.includes('Fast Food')) return '🍔';
  if (cuisine.includes('Breakfast')) return '🥞';
  return '🍽️';
};

export const getLifestyleIcon = (item: string | string[]) => {
  if (item.includes('Travel') || item.includes('Globetrotter') || item.includes('Flyer')) return <Plane className="w-5 h-5" />;
  if (item.includes('Music')) return <Music className="w-5 h-5" />;
  if (item.includes('Knowledge') || item.includes('Book')) return <BookOpen className="w-5 h-5" />;
  if (item.includes('Shopping') || item.includes('Shopper')) return <ShoppingBag className="w-5 h-5" />;
  if (item.includes('Gamer') || item.includes('Console')) return <Gamepad2 className="w-5 h-5" />;
  if (item.includes('Homebody')) return <Home className="w-5 h-5" />;
  return <Coffee className="w-5 h-5" />;
};
