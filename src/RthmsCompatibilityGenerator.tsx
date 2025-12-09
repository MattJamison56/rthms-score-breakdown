import { useState, useEffect } from 'react';
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

const RthmsCompatibilityGenerator = () => {
  const [showTagSelection, setShowTagSelection] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [person1, setPerson1] = useState<Person>(() => {
    const saved = localStorage.getItem('rthms_person1_tags');
    return {
      name: 'Person 1',
      tags: saved ? JSON.parse(saved) : { sleep: [], activity: [], food: [], wellness: [], lifestyle: [] }
    };
  });
  const [person2, setPerson2] = useState<Person>(() => {
    const saved = localStorage.getItem('rthms_person2_tags');
    return {
      name: 'Person 2',
      tags: saved ? JSON.parse(saved) : { sleep: [], activity: [], food: [], wellness: [], lifestyle: [] }
    };
  });

  // Check if we have saved tags to skip tag selection on initial load
  useEffect(() => {
    const saved1 = localStorage.getItem('rthms_person1_tags');
    const saved2 = localStorage.getItem('rthms_person2_tags');
    if (saved1 && saved2) {
      const tags1 = JSON.parse(saved1) as PersonTags;
      const tags2 = JSON.parse(saved2) as PersonTags;
      const hasTags = Object.values(tags1).some((arr: string[]) => arr.length > 0) || 
                      Object.values(tags2).some((arr: string[]) => arr.length > 0);
    if (hasTags) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowTagSelection(false);
    }
    }
  }, []);

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

  const pages = [
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
        />
      )
    },
    {
      type: 'final-report',
      title: 'Compatibility Reading',
      render: () => (
        <CompatibilityReportPage person1={person1} person2={person2} />
      )
    }
  ];

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const halfWidth = rect.width / 2;
    
    if (clickX < halfWidth) {
      prevPage();
    } else {
      nextPage();
    }
  };

  return (
    <>
      {showTagSelection ? (
        <TagSelectionPage 
          onComplete={handleTagSelectionComplete}
          initialPerson1Tags={person1.tags}
          initialPerson2Tags={person2.tags}
        />
      ) : (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
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
          `}</style>
          
          <div className="relative w-full max-w-md">
            <div 
              className="bg-black rounded-[3rem] shadow-2xl overflow-hidden border border-gray-800 cursor-pointer" 
              style={{ aspectRatio: '9/19.5' }}
              onClick={handleScreenClick}
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

              {pages[currentPage].render()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RthmsCompatibilityGenerator;
