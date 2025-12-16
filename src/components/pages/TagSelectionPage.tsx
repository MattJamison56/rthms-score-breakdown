import { useState, useEffect } from 'react';
import { Info, ArrowLeft } from 'lucide-react';
import type { PersonTags } from '../../types/compatibility';
import { ALL_TAGS, hasConflict, MUTUALLY_EXCLUSIVE_GROUPS } from '../../data/allTags';
import { TagInfoPage } from './TagInfoPage';

// Helper to ensure all tag categories exist
const ensureFullTags = (tags: Partial<PersonTags>): PersonTags => {
  return {
    sleep: tags.sleep || [],
    activity: tags.activity || [],
    food: tags.food || [],
    wellness: tags.wellness || [],
    lifestyle: tags.lifestyle || [],
    entertainment: tags.entertainment || []
  };
};

// Helper to validate and clean corrupted localStorage data
const cleanStorageData = (data: PersonTags): PersonTags => {
  if (!data || typeof data !== 'object') {
    return ensureFullTags({});
  }
  
  const cleaned: PersonTags = {
    sleep: Array.isArray(data.sleep) ? data.sleep : [],
    activity: Array.isArray(data.activity) ? data.activity : [],
    food: Array.isArray(data.food) ? data.food : [],
    wellness: Array.isArray(data.wellness) ? data.wellness : [],
    lifestyle: Array.isArray(data.lifestyle) ? data.lifestyle : [],
    entertainment: Array.isArray(data.entertainment) ? data.entertainment : []
  };
  
  // Remove duplicates within each category
  Object.keys(cleaned).forEach(key => {
    const category = key as keyof PersonTags;
    cleaned[category] = Array.from(new Set(cleaned[category]));
  });
  
  return cleaned;
};

interface TagSelectionPageProps {
  onComplete: (person1Tags: PersonTags, person2Tags: PersonTags) => void;
  initialPerson1Tags?: PersonTags;
  initialPerson2Tags?: PersonTags;
  mode?: 'solo' | 'dating' | 'friendship';
  onBack?: () => void;
}

export const TagSelectionPage = ({ onComplete, initialPerson1Tags, initialPerson2Tags, mode = 'dating', onBack }: TagSelectionPageProps) => {
  const [selectedPerson, setSelectedPerson] = useState<1 | 2>(1);
  const [showInfo, setShowInfo] = useState(false);
  const [person1Tags, setPerson1Tags] = useState<PersonTags>(
    initialPerson1Tags ? cleanStorageData(initialPerson1Tags) : {
      sleep: [],
      activity: [],
      food: [],
      wellness: [],
      lifestyle: [],
      entertainment: []
    }
  );
  const [person2Tags, setPerson2Tags] = useState<PersonTags>(
    initialPerson2Tags ? cleanStorageData(initialPerson2Tags) : {
      sleep: [],
      activity: [],
      food: [],
      wellness: [],
      lifestyle: [],
      entertainment: []
    }
  );

  // Save to localStorage whenever tags change
  useEffect(() => {
    localStorage.setItem('rthms_person1_tags', JSON.stringify(person1Tags));
    localStorage.setItem('rthms_person2_tags', JSON.stringify(person2Tags));
  }, [person1Tags, person2Tags]);

  const currentTags = selectedPerson === 1 ? person1Tags : person2Tags;
  const setCurrentTags = selectedPerson === 1 ? setPerson1Tags : setPerson2Tags;

  const allCurrentTags = [...currentTags.sleep, ...currentTags.activity, ...currentTags.food, ...currentTags.wellness, ...currentTags.lifestyle, ...currentTags.entertainment];

  const toggleTag = (category: keyof PersonTags, tag: string) => {
    setCurrentTags(prev => {
      const categoryTags = prev[category];
      const isSelected = categoryTags.includes(tag);
      
      if (isSelected) {
        // Remove tag
        return {
          ...prev,
          [category]: categoryTags.filter(t => t !== tag)
        };
      } else {
        // Add tag
        return {
          ...prev,
          [category]: [...categoryTags, tag]
        };
      }
    });
  };

  const isTagDisabled = (tag: string): boolean => {
    // Only check if tag conflicts with already selected tags for current person
    // Don't restrict based on other person's selections
    if (hasConflict(tag, allCurrentTags)) {
      return true;
    }
    return false;
  };

  const isTagSelected = (category: keyof PersonTags, tag: string): boolean => {
    return currentTags[category].includes(tag);
  };

  const handleContinue = () => {
    onComplete(person1Tags, person2Tags);
  };

  const handleClearAll = () => {
    const emptyTags = {
      sleep: [],
      activity: [],
      food: [],
      wellness: [],
      lifestyle: [],
      entertainment: []
    };
    setPerson1Tags(emptyTags);
    setPerson2Tags(emptyTags);
  };

  const categoryColors = {
    sleep: 'from-purple-500 to-pink-600',
    activity: 'from-green-500 to-emerald-600',
    wellness: 'from-teal-500 to-cyan-600',
    food: 'from-orange-500 to-red-600',
    entertainment: 'from-purple-500 to-indigo-600',
    lifestyle: 'from-blue-500 to-cyan-600'
  };

  // Helper to get all tags in mutually exclusive groups for a category
  const getGroupedTags = (category: keyof typeof ALL_TAGS) => {
    const categoryTags = ALL_TAGS[category];
    const grouped: { group: string[] | null; tags: string[] }[] = [];
    const processedTags = new Set<string>();

    // First, add mutually exclusive groups (ensuring no duplicates)
    MUTUALLY_EXCLUSIVE_GROUPS.forEach(group => {
      const tagsInCategory = group.filter((tag: string) => categoryTags.includes(tag) && !processedTags.has(tag));
      if (tagsInCategory.length > 0) {
        grouped.push({ group, tags: tagsInCategory });
        tagsInCategory.forEach((tag: string) => processedTags.add(tag));
      }
    });

    // Then, add remaining tags that aren't in any group
    const remainingTags = categoryTags.filter((tag: string) => !processedTags.has(tag));
    if (remainingTags.length > 0) {
      grouped.push({ group: null, tags: remainingTags });
    }

    return grouped;
  };

  if (showInfo) {
    return <TagInfoPage onClose={() => setShowInfo(false)} />;
  }

  return (
    <div className="w-full h-full bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 p-6 overflow-y-auto no-scrollbar">
      <style>{`
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          {onBack && (
            <button
              onClick={onBack}
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-gray-300 transition-all hover:scale-105"
              title="Back to mode selection"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <div className="flex-1"></div>
          <button
            onClick={() => setShowInfo(true)}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-gray-300 transition-all hover:scale-105"
            title="View tag information"
          >
            <Info size={24} />
          </button>
        </div>
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Test Tag Selector
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Select tags for each person to test different compatibility combinations
        </p>

        {/* Person Toggle - Only show if not solo mode */}
        {mode !== 'solo' && (
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedPerson(1)}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              selectedPerson === 1
                ? 'bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
            }`}
          >
            Person 1
            {person1Tags.sleep.length + person1Tags.activity.length + person1Tags.food.length + person1Tags.wellness.length + person1Tags.lifestyle.length + person1Tags.entertainment.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {person1Tags.sleep.length + person1Tags.activity.length + person1Tags.food.length + person1Tags.wellness.length + person1Tags.lifestyle.length + person1Tags.entertainment.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setSelectedPerson(2)}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              selectedPerson === 2
                ? 'bg-linear-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/50'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
            }`}
          >
            Person 2
            {person2Tags.sleep.length + person2Tags.activity.length + person2Tags.food.length + person2Tags.wellness.length + person2Tags.lifestyle.length + person2Tags.entertainment.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {person2Tags.sleep.length + person2Tags.activity.length + person2Tags.food.length + person2Tags.wellness.length + person2Tags.lifestyle.length + person2Tags.entertainment.length}
              </span>
            )}
          </button>
        </div>
        )}

        {/* Tag Categories */}
        <div className="space-y-8">
          {(Object.keys(ALL_TAGS) as Array<keyof typeof ALL_TAGS>).map(category => {
            const groupedTags = getGroupedTags(category);
            
            return (
              <div key={category} className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
                <h2 className={`text-2xl font-bold mb-4 bg-linear-to-r ${categoryColors[category]} bg-clip-text text-transparent capitalize`}>
                  {category}
                </h2>
                <div className="space-y-4">
                  {groupedTags.map((section, idx) => {
                    // Check if this group is actually mutually exclusive
                    const isMutuallyExclusive = section.group && MUTUALLY_EXCLUSIVE_GROUPS.some(
                      group => group.some(tag => section.tags.includes(tag))
                    );
                    
                    return (
                      <div key={idx}>
                        <div className="text-xs text-gray-500 mb-2 ml-1">
                        {isMutuallyExclusive ? 'Choose one:' : 'Choose any:'}
                        </div>
                        <div className="flex flex-wrap gap-3">
                        {section.tags.map(tag => {
                          const selected = isTagSelected(category, tag);
                          const disabled = !selected && isTagDisabled(tag);
                          
                          return (
                            <button
                              key={tag}
                              onClick={() => !disabled && toggleTag(category, tag)}
                              disabled={disabled}
                              className={`px-4 py-2 rounded-full font-medium transition-all ${
                                selected
                                  ? `bg-linear-to-r ${categoryColors[category]} text-white shadow-lg`
                                  : disabled
                                  ? 'bg-slate-800/30 text-gray-600 cursor-not-allowed opacity-50'
                                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white'
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-12 mb-8">
          <button
            onClick={handleClearAll}
            className="px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-full text-gray-300 font-bold text-sm transition-all hover:scale-105"
          >
            CLEAR ALL
          </button>
          <button
            onClick={handleContinue}
            className="px-12 py-4 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-sm shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all hover:scale-105"
          >
            START COMPATIBILITY TEST
          </button>
        </div>
      </div>
    </div>
  );
};
