import { useState, useEffect, useRef, useMemo } from 'react';
import type { Person, PersonTags } from './types/compatibility';
import { calculateOverlap } from './utils/compatibilityCalculations';
import { OverallPage } from './components/pages/OverallPage';
import { SleepPage } from './components/pages/SleepPage';
import { SuggestionPage } from './components/pages/SuggestionPage';
import { FoodPage } from './components/pages/FoodPage';
import { ActivityPage } from './components/pages/ActivityPage';
import { LifestylePage } from './components/pages/LifestylePage';
import { Navigation } from './components/Navigation';
import { TagSelectionPage } from './components/pages/TagSelectionPage';
import { CompatibilityReportPage } from './components/pages/CompatibilityReportPage';
import { ModeSelectionPage } from './components/pages/ModeSelectionPage';
// Solo mode pages
import { SoloOverallPage } from './components/pages/SoloOverallPage';
import { SoloSleepPage } from './components/pages/SoloSleepPage';
import { SoloActivityPage } from './components/pages/SoloActivityPage';
import { SoloFoodPage } from './components/pages/SoloFoodPage';
import { SoloLifestylePage } from './components/pages/SoloLifestylePage';
import { SoloSuggestionPage } from './components/pages/SoloSuggestionPage';
import { SoloReportPage } from './components/pages/SoloReportPage';

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

const RthmsCompatibilityGenerator = () => {
  const [showModeSelection, setShowModeSelection] = useState(true);
  const [showTagSelection, setShowTagSelection] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'solo' | 'dating' | 'friendship'>(() => {
    const saved = localStorage.getItem('rthms_selected_mode');
    return (saved as 'solo' | 'dating' | 'friendship') || 'dating';
  });
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [person1, setPerson1] = useState<Person>(() => {
    const saved = localStorage.getItem('rthms_person1_tags');
    return {
      name: 'Person 1',
      tags: saved ? cleanStorageData(JSON.parse(saved)) : { sleep: [], activity: [], food: [], wellness: [], lifestyle: [], entertainment: [] }
    };
  });
  const [person2, setPerson2] = useState<Person>(() => {
    const saved = localStorage.getItem('rthms_person2_tags');
    return {
      name: 'Person 2',
      tags: saved ? cleanStorageData(JSON.parse(saved)) : { sleep: [], activity: [], food: [], wellness: [], lifestyle: [], entertainment: [] }
    };
  });

  // Check if we have saved tags AND mode to skip mode/tag selection on initial load
  useEffect(() => {
    const saved1 = localStorage.getItem('rthms_person1_tags');
    const saved2 = localStorage.getItem('rthms_person2_tags');
    const savedMode = localStorage.getItem('rthms_selected_mode');
    
    if (saved1 && saved2 && savedMode) {
      const tags1 = cleanStorageData(JSON.parse(saved1));
      const tags2 = cleanStorageData(JSON.parse(saved2));
      const hasTags = Object.values(tags1).some((arr: string[]) => arr.length > 0) || 
                      Object.values(tags2).some((arr: string[]) => arr.length > 0);
    if (hasTags) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowModeSelection(false);
      setShowTagSelection(false);
    }
    }
  }, []);

  const handleModeSelection = (mode: 'solo' | 'dating' | 'friendship') => {
    // Mode selected, save and proceed to tag selection
    console.log('Mode selected:', mode);
    setSelectedMode(mode);
    localStorage.setItem('rthms_selected_mode', mode);
    setShowModeSelection(false);
    setShowTagSelection(true);
  };

  const handleBackToModeSelection = () => {
    setShowTagSelection(false);
    setShowModeSelection(true);
  };

  const handleTagSelectionComplete = (person1Tags: PersonTags, person2Tags: PersonTags) => {
    setPerson1({ name: 'Person 1', tags: person1Tags });
    setPerson2({ name: 'Person 2', tags: person2Tags });
    setShowTagSelection(false);
    setCurrentPage(0);
  };

  // Calculate all overlaps
  const allTags1 = Object.values(person1.tags).flat();
  const allTags2 = Object.values(person2.tags).flat();
  const overallOverlap = calculateOverlap(allTags1, allTags2);
  
  const sleepData = calculateOverlap(person1.tags.sleep, person2.tags.sleep);
  const activityData = calculateOverlap(person1.tags.activity, person2.tags.activity);
  const foodData = calculateOverlap(person1.tags.food, person2.tags.food);
  const lifestyleData = calculateOverlap(person1.tags.lifestyle, person2.tags.lifestyle);

  console.log('Current selectedMode for AI:', selectedMode);

  // Solo mode pages
  const soloPages = useMemo(() => [
    {
      type: 'solo-overall',
      title: 'Your Profile',
      render: () => <SoloOverallPage person={person1} />
    },
    {
      type: 'solo-sleep',
      title: 'Sleep Analysis',
      render: () => <SoloSleepPage person={person1} />
    },
    {
      type: 'solo-sleep-suggestions',
      title: 'Sleep Tips',
      render: () => (
        <SoloSuggestionPage
          category="sleep"
          title="Sleep Optimization"
          description="Personalized tips for better rest"
          gradientFrom="from-slate-900"
          gradientVia="via-indigo-950"
          accentColor="from-purple-500 to-pink-600"
          iconBgColor="bg-purple-500/20"
          iconTextColor="text-purple-400"
          hoverBorderColor="hover:border-purple-500/50"
          person={person1}
        />
      )
    },
    {
      type: 'solo-activity',
      title: 'Activity Level',
      render: () => <SoloActivityPage person={person1} />
    },
    {
      type: 'solo-activity-suggestions',
      title: 'Activity Tips',
      render: () => (
        <SoloSuggestionPage
          category="activity"
          title="Fitness Goals"
          description="Level up your movement"
          gradientFrom="from-slate-900"
          gradientVia="via-orange-950"
          accentColor="from-orange-500 to-red-600"
          iconBgColor="bg-orange-500/20"
          iconTextColor="text-orange-400"
          hoverBorderColor="hover:border-orange-500/50"
          person={person1}
        />
      )
    },
    {
      type: 'solo-food',
      title: 'Nutrition',
      render: () => <SoloFoodPage person={person1} />
    },
    {
      type: 'solo-food-suggestions',
      title: 'Nutrition Tips',
      render: () => (
        <SoloSuggestionPage
          category="food"
          title="Healthy Eating"
          description="Optimize your nutrition"
          gradientFrom="from-slate-900"
          gradientVia="via-emerald-950"
          accentColor="from-emerald-500 to-teal-600"
          iconBgColor="bg-emerald-500/20"
          iconTextColor="text-emerald-400"
          hoverBorderColor="hover:border-emerald-500/50"
          person={person1}
        />
      )
    },
    {
      type: 'solo-lifestyle',
      title: 'Lifestyle',
      render: () => <SoloLifestylePage person={person1} />
    },
    {
      type: 'solo-lifestyle-suggestions',
      title: 'Lifestyle Tips',
      render: () => (
        <SoloSuggestionPage
          category="lifestyle"
          title="Life Balance"
          description="Optimize your daily rhythm"
          gradientFrom="from-slate-900"
          gradientVia="via-cyan-950"
          accentColor="from-cyan-500 to-blue-600"
          iconBgColor="bg-cyan-500/20"
          iconTextColor="text-cyan-400"
          hoverBorderColor="hover:border-cyan-500/50"
          person={person1}
        />
      )
    },
    {
      type: 'solo-final-report',
      title: 'Your Report',
      render: () => <SoloReportPage person={person1} />
    }
  ], [person1]);

  // Compatibility mode pages (dating/friendship)
  const compatibilityPages = useMemo(() => [
    {
      type: 'overall',
      title: 'Overall Match',
      render: () => <OverallPage overallOverlap={overallOverlap} />
    },
    {
      type: 'sleep',
      title: 'Sleep Patterns',
      render: () => <SleepPage person1={person1} person2={person2} sleepData={sleepData} />
    },
    {
      type: 'sleep-suggestions',
      title: 'Sleep Ideas',
      render: () => (
        <SuggestionPage
          category="sleep"
          title="Try These"
          description="Sleep schedule suggestions"
          gradientFrom="from-slate-900"
          gradientVia="via-indigo-950"
          accentColor="from-purple-500 to-pink-600"
          iconBgColor="bg-purple-500/20"
          iconTextColor="text-purple-400"
          timeTextColor="text-purple-400"
          hoverBorderColor="hover:border-purple-500/50"
          person1={person1}
          person2={person2}
          mode={selectedMode}
        />
      )
    },
    {
      type: 'food',
      title: 'Food & Dining',
      render: () => <FoodPage person1={person1} person2={person2} foodData={foodData} />
    },
    {
      type: 'food-suggestions',
      title: 'Food Ideas',
      render: () => (
        <SuggestionPage
          category="food"
          title="Try These"
          description="Date night food ideas"
          gradientFrom="from-slate-900"
          gradientVia="via-emerald-950"
          accentColor="from-emerald-500 to-teal-600"
          iconBgColor="bg-emerald-500/20"
          iconTextColor="text-emerald-400"
          timeTextColor="text-emerald-400"
          hoverBorderColor="hover:border-emerald-500/50"
          person1={person1}
          person2={person2}
          mode={selectedMode}
        />
      )
    },
    {
      type: 'activity',
      title: 'Activity & Fitness',
      render: () => <ActivityPage person1={person1} person2={person2} activityData={activityData} />
    },
    {
      type: 'activity-suggestions',
      title: 'Activity Ideas',
      render: () => (
        <SuggestionPage
          category="activity"
          title="Try These"
          description="Active date ideas"
          gradientFrom="from-slate-900"
          gradientVia="via-orange-950"
          accentColor="from-orange-500 to-red-600"
          iconBgColor="bg-orange-500/20"
          iconTextColor="text-orange-400"
          timeTextColor="text-orange-400"
          hoverBorderColor="hover:border-orange-500/50"
          person1={person1}
          person2={person2}
          mode={selectedMode}
        />
      )
    },
    {
      type: 'lifestyle',
      title: 'Lifestyle & Interests',
      render: () => <LifestylePage person1={person1} person2={person2} lifestyleData={lifestyleData} />
    },
    {
      type: 'lifestyle-suggestions',
      title: 'Lifestyle Ideas',
      render: () => (
        <SuggestionPage
          category="lifestyle"
          title="Try These"
          description="Lifestyle activity ideas"
          gradientFrom="from-slate-900"
          gradientVia="via-cyan-950"
          accentColor="from-cyan-500 to-blue-600"
          iconBgColor="bg-cyan-500/20"
          iconTextColor="text-cyan-400"
          timeTextColor="text-cyan-400"
          hoverBorderColor="hover:border-cyan-500/50"
          person1={person1}
          person2={person2}
          mode={selectedMode}
        />
      )
    },
    {
      type: 'final-report',
      title: 'Compatibility Reading',
      render: () => (
        <CompatibilityReportPage person1={person1} person2={person2} mode={selectedMode} />
      )
    }
  ], [selectedMode, person1, person2, overallOverlap, sleepData, activityData, foodData, lifestyleData]);

  // Choose pages based on mode
  const pages = selectedMode === 'solo' ? soloPages : compatibilityPages;

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      scrollToPage(newPage);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      scrollToPage(newPage);
    }
  };

  const scrollToPage = (pageIndex: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const pageHeight = container.clientHeight;
      container.scrollTo({
        top: pageHeight * pageIndex,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll events to update current page
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }
    
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      
      // Immediate update for responsiveness
      const scrollTop = container.scrollTop;
      const pageHeight = container.clientHeight;
      const newPage = Math.round(scrollTop / pageHeight);
      if (newPage !== currentPage && newPage >= 0 && newPage < pages.length) {
        setCurrentPage(newPage);
      }
      
      // Also set with timeout for snap completion
      scrollTimeout = setTimeout(() => {
        const scrollTop = container.scrollTop;
        const pageHeight = container.clientHeight;
        const newPage = Math.round(scrollTop / pageHeight);
        if (newPage !== currentPage && newPage >= 0 && newPage < pages.length) {
          setCurrentPage(newPage);
        }
      }, 50);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentPage, pages.length, showTagSelection, showModeSelection]);

  return (
    <>
      <style>{`
        body {
          overflow: hidden;
          position: fixed;
          width: 100%;
          height: 100%;
          font-size: 95%;
        }
      `}</style>
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        {showModeSelection ? (
          <div className="relative w-full" style={{ maxWidth: '460px' }}>
            <div 
              className="bg-black rounded-[3rem] shadow-2xl overflow-hidden border border-gray-800 mx-auto" 
              style={{ maxWidth: '340px', height: '90vh', maxHeight: '90vh' }}
            >
              <ModeSelectionPage onSelectMode={handleModeSelection} />
            </div>
          </div>
        ) : showTagSelection ? (
          <div className="relative w-full" style={{ maxWidth: '460px' }}>
            <div 
              className="bg-black rounded-[3rem] shadow-2xl overflow-y-auto border border-gray-800 no-scrollbar mx-auto" 
              style={{ maxWidth: '340px',height: '90vh', maxHeight: '90vh' }}
            >
              <TagSelectionPage 
                onComplete={handleTagSelectionComplete}
                initialPerson1Tags={person1.tags}
                initialPerson2Tags={person2.tags}
                mode={selectedMode}
                onBack={handleBackToModeSelection}
              />
            </div>
          </div>
        ) : (
          <>
          <style>{`
            @keyframes scroll-right {
              from { transform: translateX(-100%); }
              to { transform: translateX(100%); }
            }
            @keyframes scroll-left {
              from { transform: translateX(100%); }
              to { transform: translateX(-100%); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-15px); }
            }
            @keyframes slide-in-left {
              from {
                opacity: 0;
                transform: translateX(-30px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            @keyframes slide-in-right {
              from {
                opacity: 0;
                transform: translateX(30px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            @keyframes slide-in-down {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-scroll-right {
              animation: scroll-right 20s linear infinite;
            }
            .animate-scroll-left {
              animation: scroll-left 20s linear infinite;
            }
            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
            .animate-slide-in-left {
              animation: slide-in-left 0.5s ease-out forwards;
              opacity: 0;
            }
            .animate-slide-in-right {
              animation: slide-in-right 0.5s ease-out forwards;
              opacity: 0;
            }
            .animate-slide-in-down {
              animation: slide-in-down 0.5s ease-out forwards;
              opacity: 0;
            }
            .snap-container {
              scroll-snap-type: y mandatory;
              overflow-y: scroll;
              scrollbar-width: none;
              -ms-overflow-style: none;
            }
            .snap-container::-webkit-scrollbar {
              display: none;
            }
            .snap-page {
              scroll-snap-align: start;
              scroll-snap-stop: always;
            }
          `}</style>
          
          <div className="relative w-full" style={{ maxWidth: '460px' }}>
            <div 
              className="relative bg-black rounded-[3rem] shadow-2xl overflow-hidden border border-gray-800 mx-auto" 
              style={{ width: '340px', height: '90vh', maxHeight: '90vh' }}
            >
              <Navigation
                currentPage={currentPage}
                totalPages={pages.length}
                onNext={nextPage}
                onPrev={prevPage}
                onReset={() => {
                  setShowTagSelection(true);
                  setCurrentPage(0);
                }}
              />

              <div 
                ref={scrollContainerRef}
                className="snap-container h-full w-full"
              >
                {pages.map((page, index) => (
                  <div 
                    key={index}
                    className="snap-page h-full w-full"
                  >
                    {page.render()}
                  </div>
                ))}
              </div>
            </div>
          </div>
          </>
        )}
      </div>
    </>
  );
};

export default RthmsCompatibilityGenerator;
