
import React, { useState } from 'react';
import { UserStats, DashboardItem } from '../types';
import { DASHBOARD_DATA, LEVEL_THRESHOLDS } from '../constants';
import { Play, Star, ChefHat, Search, Clock, Flame, ShieldCheck, Utensils, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserDashboardProps {
  stats: UserStats;
  onLessonSelect: (item: DashboardItem) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ 
  stats, 
  onLessonSelect 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate Progress to Next Level
  const currentLevelIndex = LEVEL_THRESHOLDS.findIndex(l => l.title === stats.title);
  const currentLevel = LEVEL_THRESHOLDS[currentLevelIndex] || LEVEL_THRESHOLDS[0];
  const nextLevel = LEVEL_THRESHOLDS[currentLevelIndex + 1];
  
  let progressPercent = 100;
  let starsToNext = 0;
  
  if (nextLevel) {
    const range = nextLevel.minStars - currentLevel.minStars;
    const progress = stats.stars - currentLevel.minStars;
    progressPercent = Math.min(100, Math.max(0, (progress / range) * 100));
    starsToNext = nextLevel.minStars - stats.stars;
  }

  // Helper to render a horizontal scroll section
  const Section = ({ title, subtitle, items, color, icon: Icon }: { title: string, subtitle?: string, items: DashboardItem[], color: string, icon: any }) => (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-4 px-6 md:px-0">
        <div className={`p-2 rounded-lg ${color} text-white`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
           <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">{title}</h2>
           {subtitle && <p className="text-slate-400 text-sm font-medium">{subtitle}</p>}
        </div>
        <button className="ml-auto text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
            See All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 px-6 md:px-0 snap-x hide-scrollbar">
        {items.map((item) => (
          <motion.div 
            key={item.id}
            whileHover={{ y: -5 }}
            onClick={() => onLessonSelect(item)}
            className="min-w-[280px] md:min-w-[320px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-slate-100 snap-center group"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
               <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
               <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-slate-700 flex items-center gap-1 shadow-sm">
                  <Clock className="w-3 h-3" />
                  {item.duration}
               </div>
               {item.type === 'recipe' && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100">
                      <Play className="w-6 h-6 fill-current" />
                  </div>
               )}
            </div>
            
            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-2">
                 {item.tags.map(tag => (
                   <span key={tag} className="text-[10px] uppercase font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">{tag}</span>
                 ))}
              </div>
              <h3 className="font-bold text-lg text-slate-900 leading-snug mb-1 group-hover:text-orange-600 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                 <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                   item.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                   item.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                   'bg-red-100 text-red-700'
                 }`}>
                   {item.level}
                 </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      {/* Header - Delish Kitchen Style (Yellow Background) */}
      <header className="sticky top-0 z-30 bg-yellow-400 shadow-sm">
         <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
            {/* Logo Area */}
            <div className="flex items-center gap-2 shrink-0 cursor-pointer">
              <div className="bg-white p-1 rounded-full border-2 border-slate-900">
                <ChefHat className="w-6 h-6 text-slate-900" />
              </div>
              <div className="hidden md:block">
                <h1 className="font-extrabold text-xl tracking-tight text-slate-900">
                  Cognitive<span className="font-normal">Cook</span>
                </h1>
              </div>
            </div>

            {/* Search Bar - White background for contrast on yellow */}
            <div className="flex-1 max-w-2xl relative">
               <input 
                 type="text" 
                 placeholder="Search by ingredients or recipe name..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full h-10 md:h-12 pl-12 pr-4 bg-white rounded-full border-none focus:ring-2 focus:ring-slate-900 transition-all outline-none font-medium placeholder:text-slate-400 text-sm md:text-base shadow-sm"
               />
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>

            {/* User Stats - Minimal with Level Progress */}
            <div className="flex items-center gap-4 shrink-0">
               <div className="hidden md:flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{stats.title}</span>
                  <div className="flex items-center gap-1 text-slate-900 font-bold">
                     <Star className="w-4 h-4 fill-current text-white drop-shadow-sm" />
                     <span>{stats.stars}</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-24 h-1.5 bg-white/50 rounded-full mt-1 overflow-hidden relative group cursor-help">
                     <div 
                       className="absolute top-0 left-0 h-full bg-slate-900 rounded-full transition-all duration-500"
                       style={{ width: `${progressPercent}%` }}
                     />
                     {/* Tooltip */}
                     {nextLevel && (
                       <div className="absolute top-4 right-0 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                         {starsToNext} stars to {nextLevel.title}
                       </div>
                     )}
                  </div>
               </div>
               <img 
                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                 alt="User" 
                 className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm" 
               />
            </div>
         </div>

         {/* Tag Navigation (Quick Filters) - Background white to separate from header */}
         <div className="bg-white border-b border-slate-100">
           <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex gap-2 overflow-x-auto hide-scrollbar">
              {['All', 'Breakfast', 'Dinner', 'Under 10 min', 'Vegetarian', 'Meat', 'Dessert'].map((tag, i) => (
                 <button 
                   key={tag}
                   className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-all border
                     ${i === 0 
                       ? 'bg-yellow-400 border-yellow-400 text-slate-900' 
                       : 'bg-white border-slate-200 text-slate-600 hover:border-yellow-400 hover:bg-yellow-50'}`}
                 >
                   {tag}
                 </button>
              ))}
           </div>
         </div>
      </header>

      <main className="max-w-6xl mx-auto md:px-6 py-8">
        
        {/* Lesson 1: Foundations */}
        <Section 
          title="Lesson 1: Foundations" 
          subtitle="Pre-training: Safety, Equipment & Ingredients"
          items={DASHBOARD_DATA.lesson1}
          color="bg-blue-500"
          icon={ShieldCheck}
        />

        {/* Lesson 2: Technique */}
        <Section 
          title="Lesson 2: Technique" 
          subtitle="Mastering the basics: Cutting, Heat & More"
          items={DASHBOARD_DATA.lesson2}
          color="bg-purple-500"
          icon={Utensils}
        />

        {/* Lesson 3: Recipes */}
        <Section 
          title="Lesson 3: Recipes" 
          subtitle="Put your skills to the test"
          items={DASHBOARD_DATA.lesson3}
          color="bg-orange-500"
          icon={Flame}
        />

        {/* Gallery Section */}
        <div className="px-6 md:px-0 mt-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Culinary Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
             {stats.uploadedPhotos.map((photo, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all relative group cursor-pointer"
                >
                   <img src={photo} alt="My Dish" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Star className="w-6 h-6 text-white fill-white" />
                   </div>
                </motion.div>
             ))}
             <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer">
                <span className="text-2xl font-thin mb-1">+</span>
                <span className="text-xs font-bold">Add Photo</span>
             </div>
          </div>
        </div>

      </main>
    </div>
  );
};
