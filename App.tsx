
'use client';

import React, { useState } from 'react';
import { UserDashboard } from './components/UserDashboard';
import { RecipeDetail } from './components/RecipeDetail';
import { SAMPLE_LESSON, INITIAL_STATS, LESSON_DATA, LEVEL_THRESHOLDS } from './constants';
import { UserStats, DashboardItem } from './types';

type View = 'dashboard' | 'recipe-detail';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // Gamification: Handle earning stars and updating level title
  const handleEarnStar = (amount: number = 1) => {
    setStats(prev => {
      const newStars = prev.stars + amount;
      
      // Calculate new title based on thresholds
      // Find the highest threshold the user has met
      const newLevel = [...LEVEL_THRESHOLDS].reverse().find(l => newStars >= l.minStars) || LEVEL_THRESHOLDS[0];
      
      return {
        ...prev,
        stars: newStars,
        title: newLevel.title
      };
    });
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
