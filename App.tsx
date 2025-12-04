
import React, { useState } from 'react';
import { UserDashboard } from './components/UserDashboard';
import { RecipeDetail } from './components/RecipeDetail';
import { SAMPLE_LESSON, INITIAL_STATS, LESSON_DATA } from './constants';
import { UserStats, DashboardItem } from './types';

type View = 'dashboard' | 'recipe-detail';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // Gamification: Handle earning stars
  const handleEarnStar = (amount: number = 1) => {
    setStats(prev => ({
      ...prev,
      stars: prev.stars + amount
    }));
  };

  // When a user selects an item from the dashboard
  const handleLessonSelect = (item: DashboardItem) => {
    setActiveLessonId(item.id);
    setCurrentView('recipe-detail');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setActiveLessonId(null);
  };

  // Determine which lesson data to show
  const activeLesson = activeLessonId && LESSON_DATA[activeLessonId] 
    ? LESSON_DATA[activeLessonId] 
    : SAMPLE_LESSON;

  return (
    <div className="antialiased text-slate-900 bg-white min-h-screen">
      {currentView === 'dashboard' && (
        <UserDashboard 
          stats={stats} 
          onLessonSelect={handleLessonSelect}
        />
      )}

      {currentView === 'recipe-detail' && (
        <RecipeDetail 
           lesson={activeLesson}
           onBack={handleBackToDashboard}
           onEarnStar={handleEarnStar}
        />
      )}
    </div>
  );
}
