import { Home, Users, Coffee, ShoppingBag, MapPin, Sparkles } from 'lucide-react';
import type { Person } from '../../types/compatibility';

interface SoloLifestylePageProps {
  person: Person;
}

const getLifestyleProfile = (tags: string[]): { profile: string; color: string; description: string } => {
  const social = tags.filter(t => ['Big Crowd Energy', 'The Networker', 'Coffee Shop Regular'].includes(t)).length;
  const homebody = tags.includes('Homebody');
  const adventurous = tags.filter(t => ['Casino Explorer', 'Retail Fashion Shopper'].includes(t)).length;
  
  if (social >= 2) {
    return {
      profile: 'Social Butterfly',
      color: 'text-cyan-400',
      description: 'You thrive in social settings and meeting people'
    };
  }
  
  if (homebody) {
    return {
      profile: 'Cozy Comfort Seeker',
      color: 'text-purple-400',
      description: 'You cherish your personal space and quiet time'
    };
  }
  
  if (adventurous >= 2) {
    return {
      profile: 'Experience Collector',
      color: 'text-pink-400',
      description: 'You love exploring and trying new things'
    };
  }
  
  if (tags.includes('Pet Parent')) {
    return {
      profile: 'Nurturing Soul',
      color: 'text-green-400',
      description: 'You find joy in caring for others'
    };
  }
  
  return {
    profile: 'Balanced Lifestyle',
    color: 'text-blue-400',
    description: 'You balance different aspects of life well'
  };
};

const getLifestyleScore = (tags: string[]): number => {
  const weights = {
    'Coffee Shop Regular': 75,
    'Pet Parent': 85,
    'The Networker': 80,
    'Homebody': 70,
    'Big Crowd Energy': 78,
    'Retail Fashion Shopper': 65,
    'Online Shopper': 60,
    'Sporting Goods Shopper': 75,
    'Casino Explorer': 55,
  };
  
  if (tags.length === 0) return 50;
  
  const scores = tags.map(tag => weights[tag as keyof typeof weights] || 60);
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
};

const getSocialBalance = (tags: string[]): { social: number; independent: number } => {
  const socialTags = ['Big Crowd Energy', 'The Networker', 'Coffee Shop Regular', 'Casino Explorer'];
  const independentTags = ['Homebody', 'Online Shopper'];
  
  const social = tags.filter(t => socialTags.includes(t)).length;
  const independent = tags.filter(t => independentTags.includes(t)).length;
  
  const total = social + independent || 1;
  
  return {
    social: Math.round((social / total) * 100),
    independent: Math.round((independent / total) * 100)
  };
};

const getLifestyleInsights = (tags: string[]) => {
  const insights = [];
  
  if (tags.includes('Coffee Shop Regular')) {
    insights.push({
      icon: Coffee,
      text: 'Coffee Culture Fan',
      detail: 'You appreciate quality coffee and café vibes',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10'
    });
  }
  
  if (tags.includes('Pet Parent')) {
    insights.push({
      icon: Sparkles,
      text: 'Animal Lover',
      detail: 'Pets are an important part of your life',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10'
    });
  }
  
  if (tags.includes('The Networker')) {
    insights.push({
      icon: Users,
      text: 'Social Connector',
      detail: 'You enjoy building meaningful connections',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10'
    });
  }
  
  if (tags.includes('Homebody')) {
    insights.push({
      icon: Home,
      text: 'Comfort Zone Champion',
      detail: 'Home is your sanctuary for recharging',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    });
  }
  
  if (tags.some(t => ['Retail Fashion Shopper', 'Online Shopper'].includes(t))) {
    insights.push({
      icon: ShoppingBag,
      text: 'Style Conscious',
      detail: 'You care about personal style and expression',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    });
  }
  
  return insights;
};

export const SoloLifestylePage = ({ person }: SoloLifestylePageProps) => {
  const lifestyleTags = person.tags.lifestyle;
  const entertainmentTags = person.tags.entertainment;
  const allTags = [...lifestyleTags, ...entertainmentTags];
  
  const lifestyleScore = getLifestyleScore(allTags);
  const profile = getLifestyleProfile(allTags);
  const socialBalance = getSocialBalance(allTags);
  const insights = getLifestyleInsights(allTags);

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 flex flex-col p-8 relative overflow-y-auto">
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
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/50">
          <MapPin className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Lifestyle Profile</h2>
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          {lifestyleScore}
        </div>
        <div className="text-sm text-cyan-400 font-semibold">Lifestyle Score</div>
      </div>

      {/* Lifestyle Profile Badge */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 mb-6">
        <div className="text-center">
          <div className={`text-2xl font-bold ${profile.color} mb-2`}>
            {profile.profile}
          </div>
          <div className="text-xs text-gray-400">{profile.description}</div>
        </div>
      </div>

      {/* Social Balance */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 mb-6">
        <div className="text-sm font-semibold text-white mb-4 text-center">Social Energy Balance</div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-cyan-400" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-300">Social</span>
                <span className="text-xs text-cyan-400 font-semibold">{socialBalance.social}%</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                  style={{ width: `${socialBalance.social}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Home className="w-4 h-4 text-purple-400" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-300">Independent</span>
                <span className="text-xs text-purple-400 font-semibold">{socialBalance.independent}%</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-600"
                  style={{ width: `${socialBalance.independent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="text-xs text-gray-400 mb-1">Lifestyle Tags</div>
          <div className="text-2xl font-bold text-white">{lifestyleTags.length}</div>
          <div className="text-xs text-gray-500 mt-1">tracked</div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="text-xs text-gray-400 mb-1">Interests</div>
          <div className="text-2xl font-bold text-white">{entertainmentTags.length}</div>
          <div className="text-xs text-gray-500 mt-1">hobbies</div>
        </div>
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <div className="space-y-3 mb-6">
          <div className="text-xs font-semibold text-gray-400 mb-3 text-center">Lifestyle Insights</div>
          {insights.map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <div 
                key={idx}
                className={`${insight.bgColor} backdrop-blur-sm rounded-xl p-4 border border-slate-700/50`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${insight.color} mt-0.5`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold text-sm ${insight.color}`}>{insight.text}</div>
                    <div className="text-xs text-gray-400 mt-1">{insight.detail}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Active Tags */}
      {allTags.length > 0 && (
        <div className="mb-6">
          <div className="text-xs font-semibold text-gray-400 mb-3 text-center">Your Lifestyle Tags</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {allTags.map((tag, idx) => (
              <div 
                key={idx}
                className="bg-cyan-500/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-cyan-500/30"
              >
                <span className="text-xs text-cyan-200 font-medium">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
        <div className="text-sm font-semibold text-white mb-3 text-center">Lifestyle Tips</div>
        <div className="space-y-2">
          {socialBalance.social > 70 && (
            <p className="text-xs text-gray-300 leading-relaxed">
              You're a social powerhouse! Remember to schedule downtime to recharge and maintain balance.
            </p>
          )}
          {socialBalance.independent > 70 && (
            <p className="text-xs text-gray-300 leading-relaxed">
              You value your independence! Consider gradually adding social activities to expand your network.
            </p>
          )}
          {socialBalance.social >= 40 && socialBalance.social <= 60 && (
            <p className="text-xs text-gray-300 leading-relaxed">
              Great balance! You know when to be social and when to enjoy solo time. This flexibility serves you well.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
