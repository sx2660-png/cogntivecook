import React from 'react';
import { ComparisonData, ComparisonItem } from '../types';
import { Flame, Activity, CookingPot, ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConceptComparisonProps {
  data: ComparisonData;
}

const ComparisonCard: React.FC<{ item: ComparisonItem; color: string }> = ({ item, color }) => {
  const getFlameCount = (level: string) => {
    switch (level) {
      case 'Low': return 1;
      case 'Medium': return 2;
      case 'High': return 3;
      case 'Extreme': return 4;
      default: return 1;
    }
  };

  return (
    <div className={`flex-1 ${color} rounded-xl p-6 flex flex-col items-center text-center shadow-lg border-t-4 border-white/20`}>
      <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">{item.label}</h3>
      
      <div className="space-y-6 w-full">
        {/* Variable 1: Temperature */}
        <div className="bg-black/20 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-1 mb-1">
            {[...Array(getFlameCount(item.heatLevel))].map((_, i) => (
              <Flame key={i} className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-pulse" />
            ))}
          </div>
          <span className="text-white font-semibold text-sm">Temperature</span>
          <div className="text-white/80 text-xs uppercase font-bold mt-1">{item.heatLevel} Heat</div>
        </div>

        {/* Variable 2: Motion */}
        <div className="bg-black/20 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center justify-center mb-1">
            <Activity className={`w-6 h-6 text-blue-200 ${item.motion === 'Constant' ? 'animate-bounce' : ''}`} />
          </div>
          <span className="text-white font-semibold text-sm">Motion</span>
          <div className="text-white/80 text-xs uppercase font-bold mt-1">{item.motion}</div>
        </div>

        {/* Variable 3: Cookware */}
        <div className="bg-black/20 rounded-lg p-3 backdrop-blur-sm">
           <div className="flex items-center justify-center mb-1">
            <CookingPot className="w-6 h-6 text-slate-200" />
          </div>
          <span className="text-white font-semibold text-sm">Cookware</span>
          <div className="text-white/80 text-xs uppercase font-bold mt-1">{item.cookware}</div>
        </div>
      </div>
    </div>
  );
};

export const ConceptComparison: React.FC<ConceptComparisonProps> = ({ data }) => {
  return (
    <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-8">
      <div className="flex items-center gap-3 mb-8 bg-slate-800 px-6 py-3 rounded-full border border-slate-700">
         <ArrowRightLeft className="w-5 h-5 text-orange-400" />
         <h2 className="text-xl font-bold text-white">{data.title}</h2>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
        <motion.div 
          className="flex-1 flex"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ComparisonCard item={data.itemA} color="bg-gradient-to-br from-red-900 to-red-700" />
        </motion.div>

        <div className="flex items-center justify-center md:hidden">
           <span className="text-slate-500 font-bold">VS</span>
        </div>

        <motion.div 
          className="flex-1 flex"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <ComparisonCard item={data.itemB} color="bg-gradient-to-br from-orange-600 to-orange-500" />
        </motion.div>
      </div>
    </div>
  );
};
