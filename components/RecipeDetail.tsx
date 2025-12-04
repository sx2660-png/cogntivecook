
import React, { useState, useEffect } from 'react';
import { Lesson } from '../types';
import { 
  Play, Star, Clock, Heart, Share2, 
  ChefHat, Search, User, ArrowLeft,
  CheckCircle2, Circle, Camera, Upload, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RecipeDetailProps {
  lesson: Lesson;
  onBack: () => void;
  onEarnStar: (amount?: number) => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ lesson, onBack, onEarnStar }) => {
  // Step Tracking State
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Review & Upload State
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Handle Step Toggle
  const toggleStep = (stepId: number) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(prev => prev.filter(id => id !== stepId));
    } else {
      setCompletedSteps(prev => [...prev, stepId]);
    }
  };

  // Check for Lesson Completion
  useEffect(() => {
    if (!lessonCompleted && completedSteps.length === lesson.steps.length && lesson.steps.length > 0) {
      setLessonCompleted(true);
      setShowCompletionModal(true);
      onEarnStar(1); // Award star for completing all steps
      
      // Auto-hide modal after 3 seconds
      setTimeout(() => setShowCompletionModal(false), 3000);
    }
  }, [completedSteps, lesson.steps.length, lessonCompleted, onEarnStar]);

  // Handle Image Upload Mock
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Create a fake local URL for preview
      const url = URL.createObjectURL(e.target.files[0]);
      setSelectedImage(url);
    }
  };

  // Handle Review Submit
  const handleSubmitReview = () => {
    if (rating === 0) return;
    
    setReviewSubmitted(true);
    // If user uploaded a photo, award an extra star
    if (selectedImage) {
      onEarnStar(1);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans relative">
      
      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 border border-slate-700"
          >
            <div className="bg-yellow-400 p-2 rounded-full">
              <Star className="w-6 h-6 text-slate-900 fill-slate-900" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Lesson Completed!</h3>
              <p className="text-slate-300 text-sm">You earned 1 Star</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Global Header (Yellow Background) */}
      <header className="sticky top-0 z-40 bg-yellow-400 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="md:hidden p-2 hover:bg-yellow-500 rounded-full">
               <ArrowLeft className="w-6 h-6 text-slate-900" />
            </button>
            {/* Brand Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
              <div className="bg-white p-1 rounded-full border-2 border-slate-900">
                <ChefHat className="w-6 h-6 text-slate-900" />
              </div>
              <span className="font-extrabold text-xl tracking-tighter text-slate-900 hidden md:block">
                DELISH<span className="font-normal">KITCHEN</span>
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search recipes or ingredients..."
              className="w-full h-10 pl-10 pr-4 rounded-sm border-none focus:ring-2 focus:ring-slate-900 outline-none text-sm shadow-inner"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>

          {/* Login / User */}
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-1 text-sm font-bold text-slate-900 hover:opacity-70">
                <User className="w-5 h-5" />
                <span className="hidden md:inline">Log In</span>
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* 2. Hero Section (Above the Fold) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Left: Main Media */}
          <div className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-lg group cursor-pointer">
             <img 
               src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=1200" 
               alt={lesson.title} 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
             />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                   <Play className="w-8 h-8 text-slate-900 fill-slate-900 ml-1" />
                </div>
             </div>
             <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                1:30 Video
             </div>
          </div>

          {/* Right: Meta Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 leading-tight">
              {lesson.title}
            </h1>
            
            {/* Rating & Stats */}
            <div className="flex items-center gap-4 text-sm mb-4 border-b border-slate-100 pb-4">
               <div className="flex items-center text-yellow-500 font-bold">
                  <Star className="w-5 h-5 fill-current mr-1" />
                  <span className="text-lg">{lesson.metadata.rating}</span>
                  <span className="text-slate-400 ml-1 font-normal">({lesson.metadata.reviewCount})</span>
               </div>
               <div className="h-4 w-px bg-slate-300"></div>
               <div className="flex items-center gap-1 text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>~{lesson.steps.reduce((acc, s) => acc + s.duration, 0) / 60 + 10} min</span>
               </div>
               <div className="h-4 w-px bg-slate-300"></div>
               <div className="flex items-center gap-1 text-slate-600">
                  <span className="font-bold text-slate-800">{lesson.metadata.cost}</span>
               </div>
            </div>

            <p className="text-slate-600 mb-6 leading-relaxed">
               {lesson.description}
            </p>

            <div className="mb-8">
               <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 rounded shadow-sm border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Add to Favorites
               </button>
            </div>

            {/* Nutrition Box (Bottom Right) */}
            <div className="mt-auto bg-slate-50 border border-slate-200 rounded p-4">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nutrition per serving</h3>
               <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold text-slate-800">{lesson.metadata.calories}</div>
                    <div className="text-[10px] text-slate-500">kcal</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-800">{lesson.metadata.protein}g</div>
                    <div className="text-[10px] text-slate-500">Protein</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-800">{lesson.metadata.fat}g</div>
                    <div className="text-[10px] text-slate-500">Fat</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-800">{lesson.metadata.carbs}g</div>
                    <div className="text-[10px] text-slate-500">Carbs</div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* 3. Instruction Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
           
           {/* Left Column: Step-by-Step Grid (66%) */}
           <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-2xl font-bold text-slate-900">How to Make It</h2>
                 <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-500">
                      {completedSteps.length}/{lesson.steps.length} Completed
                    </span>
                    {lessonCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                 </div>
              </div>

              {/* Grid Layout for Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {lesson.steps.map((step, index) => {
                    const isCompleted = completedSteps.includes(step.id);
                    return (
                      <div 
                        key={step.id} 
                        onClick={() => toggleStep(step.id)}
                        className={`flex flex-col gap-3 group p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden
                          ${isCompleted 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-white border-transparent hover:border-yellow-200 hover:shadow-lg'}`
                        }
                      >
                        {/* Completion Background Decoration */}
                        {isCompleted && (
                           <div className="absolute -right-4 -top-4 text-green-100">
                              <CheckCircle2 className="w-24 h-24 opacity-20 rotate-12" />
                           </div>
                        )}

                        {/* Video/Image Thumbnail */}
                        <div className="aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden relative shadow-sm z-10">
                           <video src={step.videoUrl} className={`w-full h-full object-cover transition-all ${isCompleted ? 'grayscale-[50%] opacity-80' : ''}`} muted loop playsInline />
                           
                           {/* Center Checkmark Overlay */}
                           <div className={`absolute inset-0 flex items-center justify-center bg-green-900/20 backdrop-blur-[1px] transition-opacity duration-300 ${isCompleted ? 'opacity-100' : 'opacity-0'}`}>
                              <div className="bg-white rounded-full p-2 shadow-lg">
                                <CheckCircle2 className="w-8 h-8 text-green-600 fill-green-50" />
                              </div>
                           </div>

                           {/* Step Number Badge */}
                           <div className={`absolute top-2 left-2 font-bold w-8 h-8 flex items-center justify-center rounded-full text-sm shadow-md z-20 transition-all 
                             ${isCompleted ? 'bg-green-500 text-white scale-75 opacity-0' : 'bg-yellow-400 text-slate-900'}`}>
                             {index + 1}
                           </div>
                        </div>
                        
                        {/* Step Description */}
                        <div className="z-10">
                           <div className="flex items-center justify-between mb-2">
                              <h3 className={`font-bold text-lg leading-tight transition-colors ${isCompleted ? 'text-green-800' : 'text-slate-800 group-hover:text-orange-600'}`}>
                                 {step.title}
                              </h3>
                              
                              {/* Checkbox Visual */}
                              <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 
                                ${isCompleted 
                                  ? 'bg-green-500 border-green-500 scale-110' 
                                  : 'border-slate-300 bg-white group-hover:border-orange-400'}`}>
                                 {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
                              </div>
                           </div>
                           <p className={`text-sm leading-relaxed transition-colors ${isCompleted ? 'text-green-700/80' : 'text-slate-600'}`}>
                              {step.instruction.replace(/\*/g, '')}
                           </p>
                        </div>
                      </div>
                    );
                 })}
              </div>
           </div>

           {/* Right Column: Ingredients List (Sticky) (33%) */}
           <div className="relative">
              <div className="sticky top-24 bg-white border-2 border-slate-100 rounded-xl p-6 shadow-sm">
                 <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold text-slate-900">Ingredients</h2>
                    <div className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">
                       {lesson.metadata.servings} Servings
                    </div>
                 </div>

                 <div className="space-y-6">
                    {['Main', 'Seasoning', 'Garnish'].map(group => {
                       const groupItems = lesson.ingredientList.filter(i => i.group === group);
                       if (groupItems.length === 0) return null;
                       
                       return (
                          <div key={group}>
                             {group !== 'Main' && <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{group}</h3>}
                             <ul className="space-y-3">
                                {groupItems.map((ing, i) => (
                                   <li key={i} className="flex items-baseline justify-between text-sm">
                                      <span className="font-medium text-slate-700">{ing.name}</span>
                                      <span className="flex-1 border-b border-dotted border-slate-300 mx-2"></span>
                                      <span className="font-bold text-slate-900">{ing.amount}</span>
                                   </li>
                                ))}
                             </ul>
                          </div>
                       );
                    })}
                 </div>

                 <div className="mt-8 pt-6 border-t border-slate-100">
                    <button className="w-full bg-slate-900 text-white font-bold py-3 rounded hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                       <Share2 className="w-4 h-4" />
                       Share Recipe
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* 4. Review & Upload Section */}
        <div className="mt-16 border-t border-slate-200 pt-16">
           <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                 <h2 className="text-3xl font-bold text-slate-900 mb-2">Did you make this recipe?</h2>
                 <p className="text-slate-500">Share a picture of your dish to earn a <span className="text-orange-500 font-bold inline-flex items-center"><Star className="w-4 h-4 fill-current mr-1"/>Star</span>!</p>
              </div>

              {!reviewSubmitted ? (
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm">
                   
                   {/* Rating */}
                   <div className="mb-8 text-center">
                      <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Rate this dish</label>
                      <div className="flex justify-center gap-2">
                         {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                              key={star}
                              onMouseEnter={() => setRating(star)}
                              onClick={() => setRating(star)}
                              className="transition-transform hover:scale-110 focus:outline-none"
                            >
                               <Star 
                                 className={`w-10 h-10 ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} 
                               />
                            </button>
                         ))}
                      </div>
                   </div>

                   {/* Photo Upload */}
                   <div className="mb-6">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Upload Photo (Optional)</label>
                      <div className="flex items-center gap-4">
                         <label className="flex-1 cursor-pointer group">
                            <div className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-colors ${selectedImage ? 'border-green-500 bg-green-50' : 'border-slate-300 hover:border-orange-400 hover:bg-white bg-white'}`}>
                               {selectedImage ? (
                                  <div className="relative w-full h-32">
                                     <img src={selectedImage} alt="Preview" className="w-full h-full object-contain rounded" />
                                     <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold opacity-0 hover:opacity-100 transition-opacity rounded">
                                        Change Photo
                                     </div>
                                  </div>
                               ) : (
                                  <>
                                     <Camera className="w-8 h-8 text-slate-400 mb-2 group-hover:text-orange-500 transition-colors" />
                                     <span className="text-sm text-slate-500 group-hover:text-slate-700">Click to upload your masterpiece</span>
                                  </>
                               )}
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                         </label>
                      </div>
                   </div>

                   {/* Comment */}
                   <div className="mb-8">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Your Review</label>
                      <textarea 
                         value={comment}
                         onChange={(e) => setComment(e.target.value)}
                         placeholder="How was the cooking process? Any tips?"
                         className="w-full p-4 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none min-h-[120px]"
                      ></textarea>
                   </div>

                   {/* Submit */}
                   <button 
                      onClick={handleSubmitReview}
                      disabled={rating === 0}
                      className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-lg"
                   >
                      Submit Review
                      {selectedImage && <span className="bg-yellow-400 text-slate-900 text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">+1 <Star className="w-3 h-3 fill-current"/></span>}
                   </button>
                </div>
              ) : (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center"
                >
                   <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Award className="w-10 h-10" />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-2">Thanks for your review!</h3>
                   <p className="text-slate-600 mb-6">Your feedback helps the community cook better.</p>
                   {selectedImage && (
                      <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-green-200 shadow-sm text-green-700 font-bold">
                         <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                         <span>+1 Star Earned!</span>
                      </div>
                   )}
                </motion.div>
              )}
           </div>
        </div>

      </main>
    </div>
  );
};
