import React, { useState } from 'react';
import { Lesson } from '../types';
import { Check, ArrowRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface PreTrainingModuleProps {
  lesson: Lesson;
  onComplete: () => void;
}

export const PreTrainingModule: React.FC<PreTrainingModuleProps> = ({ lesson, onComplete }) => {
  const [activeTab, setActiveTab] = useState<'equipment' | 'ingredients'>('equipment');
  const [equipmentReviewed, setEquipmentReviewed] = useState(false);
  const [ingredientsReviewed, setIngredientsReviewed] = useState(false);

  const canProceed = equipmentReviewed && ingredientsReviewed;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Foundations: {lesson.title}</h1>
        <p className="text-slate-600 max-w-2xl">Before we start cooking, let's familiarize ourselves with the tools and ingredients. This reduces mental effort during the actual cooking process.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 min-h-[600px] flex flex-col">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('equipment')}
            className={`flex-1 py-4 text-sm font-semibold tracking-wide uppercase transition-colors flex items-center justify-center gap-2
              ${activeTab === 'equipment' ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-500' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            1. Equipment Lab
            {equipmentReviewed && <Check className="w-4 h-4 text-green-500" />}
          </button>
          <button 
            onClick={() => setActiveTab('ingredients')}
            className={`flex-1 py-4 text-sm font-semibold tracking-wide uppercase transition-colors flex items-center justify-center gap-2
              ${activeTab === 'ingredients' ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-500' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            2. Market Fresh
            {ingredientsReviewed && <Check className="w-4 h-4 text-green-500" />}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 bg-slate-50/50">
          {activeTab === 'equipment' && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="h-full flex flex-col items-center"
            >
              <div className="flex items-center gap-3 mb-6 bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <Info className="w-4 h-4" />
                <span>Spatial Contiguity: Labels are placed clearly near the tool parts.</span>
              </div>
              
              <div className="relative inline-block rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img 
                  src={lesson.tools[0].image} 
                  alt={lesson.tools[0].name}
                  className="w-full max-w-lg object-contain"
                />
                {/* Spatial Contiguity Labels */}
                {lesson.tools[0].labels.map((label, idx) => {
                  const isRightSide = parseFloat(label.position.left) > 50;
                  return (
                    <div key={idx}>
                      {/* The Target Dot on the object */}
                      <div 
                        style={{ top: label.position.top, left: label.position.left }} 
                        className="absolute w-3 h-3 md:w-4 md:h-4 bg-orange-500 rounded-full border-2 border-white shadow-sm -translate-x-1/2 -translate-y-1/2 z-10 animate-pulse" 
                      />
                      
                      {/* The Label Line and Text */}
                      <div
                        style={{ top: label.position.top, left: label.position.left }}
                        className={`absolute flex items-center pointer-events-none -translate-y-1/2 
                          ${isRightSide ? 'flex-row' : 'flex-row-reverse -translate-x-full'}
                        `}
                      >
                         {/* Connector Line */}
                         <div className="w-8 md:w-16 h-[2px] bg-slate-800 shadow-sm"></div>
                         
                         {/* Text Bubble */}
                         <div className={`bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg shadow-md border border-slate-200 text-xs md:text-sm font-bold text-slate-800 whitespace-nowrap mx-[-1px]`}>
                            {label.text}
                         </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <label className="flex items-center gap-3 cursor-pointer p-4 hover:bg-slate-100 rounded-lg transition-colors">
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${equipmentReviewed ? 'bg-green-500 border-green-500' : 'border-slate-300 bg-white'}`}>
                    {equipmentReviewed && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={equipmentReviewed}
                    onChange={(e) => setEquipmentReviewed(e.target.checked)}
                  />
                  <span className="font-medium text-slate-700">I have identified the correct equipment.</span>
                </label>
              </div>
            </motion.div>
          )}

          {activeTab === 'ingredients' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="h-full"
            >
              <h3 className="text-xl font-bold text-center mb-8">Ingredient Quality Matters</h3>
              
              <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg mb-4 border-4 border-green-100">
                    <img src={lesson.ingredients[0].goodImage} alt="Fresh" className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-4">
                      <span className="text-white font-bold text-lg flex items-center gap-2">
                        <Check className="w-5 h-5 bg-green-500 rounded-full p-0.5" /> Ideal
                      </span>
                    </div>
                  </div>
                  <p className="text-center text-slate-600 text-sm max-w-xs">{lesson.ingredients[0].tips}</p>
                </div>

                <div className="flex flex-col items-center opacity-70 grayscale-[50%]">
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg mb-4 border-4 border-red-50">
                    <img src={lesson.ingredients[0].badImage} alt="Bad" className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-4">
                      <span className="text-white font-bold text-lg flex items-center gap-2">
                         Avoid
                      </span>
                    </div>
                  </div>
                   <p className="text-center text-slate-500 text-sm max-w-xs">Old, watery, or low quality.</p>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                 <button 
                  onClick={() => setIngredientsReviewed(true)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2
                    ${ingredientsReviewed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-600'}`}
                 >
                   {ingredientsReviewed ? <Check className="w-5 h-5"/> : null}
                   {ingredientsReviewed ? 'Reviewed' : 'Confirm Ingredients'}
                 </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-white border-t border-slate-100 flex justify-between items-center">
           <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {canProceed ? 'Ready to cook' : 'Complete all sections'}
           </div>
           <button
             disabled={!canProceed}
             onClick={onComplete}
             className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all
               ${canProceed 
                 ? 'bg-orange-600 text-white shadow-xl shadow-orange-200 hover:scale-105 hover:bg-orange-700' 
                 : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
           >
             Start Cooking
             <ArrowRight className="w-5 h-5" />
           </button>
        </div>
      </div>
    </div>
  );
};