import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Zap, MoveDiagonal } from 'lucide-react';

interface KnifePart {
  id: string;
  name: string;
  description: string;
  physicsLabel?: string;
  cx: number;
  cy: number;
}

const KNIFE_PARTS: KnifePart[] = [
  {
    id: 'tip',
    name: 'The Tip',
    description: 'The Precision Zone. Use for delicate work like mincing garlic, slicing shallots, or cutting small garnishes. Low force, high control.',
    cx: 550,
    cy: 85
  },
  {
    id: 'spine',
    name: 'The Spine',
    description: 'The Support Structure. Thick and blunt. You can place your non-cutting hand here to apply extra downward pressure on tough ingredients.',
    cx: 300,
    cy: 35
  },
  {
    id: 'heel',
    name: 'The Heel',
    description: 'The Power Zone. This is the closest point to your hand (the fulcrum), offering maximum leverage. Use this section for chopping hard vegetables like carrots, pumpkins, or winter squash.',
    physicsLabel: 'Max Leverage',
    cx: 160,
    cy: 110
  }
];

export const KnifeAnatomy: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const activePart = KNIFE_PARTS.find(p => p.id === selectedPart);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row h-[80vh] md:h-auto"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left: Interactive Visual */}
        <div className="flex-1 bg-slate-50 relative p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
          <div className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 text-sm font-medium">
             <MoveDiagonal className="w-4 h-4" />
             <span>Interactive Model: Click hotspots</span>
          </div>

          <div className="relative w-full aspect-[2/1] max-w-lg select-none">
            <svg viewBox="0 0 600 200" className="w-full h-full drop-shadow-xl">
              {/* Knife Handle */}
              <path d="M 20 80 Q 20 60 40 60 L 120 60 Q 140 60 140 80 L 140 110 Q 140 130 120 130 L 40 130 Q 20 130 20 110 Z" fill="#2d3748" />
              
              {/* Knife Blade */}
              <path 
                d="M 140 60 L 580 80 Q 600 85 580 90 L 140 140 Z" 
                fill="#e2e8f0" 
                stroke="#cbd5e0" 
                strokeWidth="2"
              />
              {/* Blade Shine/Detail */}
              <path d="M 140 60 L 580 80 L 140 100 Z" fill="#f7fafc" opacity="0.5" />

              {/* Bolster Area */}
              <rect x="135" y="60" width="10" height="80" rx="2" fill="#cbd5e0" />

              {/* Hotspots */}
              {KNIFE_PARTS.map((part) => (
                <g 
                  key={part.id} 
                  onClick={() => setSelectedPart(part.id)}
                  onMouseEnter={() => setSelectedPart(part.id)}
                  className="cursor-pointer group"
                >
                  {/* Pulse Effect */}
                  {selectedPart === part.id && (
                    <circle cx={part.cx} cy={part.cy} r="25" className="animate-ping fill-orange-400 opacity-30" />
                  )}
                  {/* Visible Dot */}
                  <circle 
                    cx={part.cx} 
                    cy={part.cy} 
                    r="8" 
                    className={`transition-all duration-300 ${selectedPart === part.id ? 'fill-orange-500 stroke-white stroke-2' : 'fill-slate-400 group-hover:fill-orange-300'}`} 
                  />
                  {/* Label Line (Hidden unless selected) */}
                  {selectedPart === part.id && (
                     <line x1={part.cx} y1={part.cy} x2={part.cx} y2={part.cy + 40} stroke="#f97316" strokeWidth="2" />
                  )}
                </g>
              ))}

              {/* Physics Visualization (Force Vector) - Only for Heel */}
              <AnimatePresence>
                {selectedPart === 'heel' && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Downward Force Arrow */}
                    <path d="M 160 20 L 160 90" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrowhead)" />
                    <text x="170" y="60" className="fill-red-600 font-bold text-sm">FORCE (Input)</text>
                    
                    {/* Resistance Arrow (Cutting) */}
                    <path d="M 160 180 L 160 130" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrowhead)" />
                    
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                      </marker>
                    </defs>
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
          </div>
        </div>

        {/* Right: Info Card */}
        <div className="md:w-96 bg-white p-8 flex flex-col justify-center">
          <AnimatePresence mode="wait">
             {activePart ? (
               <motion.div
                 key={activePart.id}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
               >
                 <div className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-2">
                   Anatomy Focus
                 </div>
                 <h2 className="text-3xl font-bold text-slate-900 mb-4">{activePart.name}</h2>
                 <p className="text-slate-600 leading-relaxed mb-6">
                   {activePart.description}
                 </p>
                 
                 {activePart.physicsLabel && (
                   <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
                      <Zap className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-red-900 text-sm">Physics Principle</h4>
                        <p className="text-red-700 text-xs mt-1">
                          Leverage increases closer to the fulcrum (handle). Using the heel requires less force to cut through dense items.
                        </p>
                      </div>
                   </div>
                 )}
               </motion.div>
             ) : (
               <div className="text-center text-slate-400">
                  <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Hover over the knife parts to reveal their function and physics.</p>
               </div>
             )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
