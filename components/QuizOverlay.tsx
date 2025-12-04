import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuizOverlayProps {
  quiz: QuizQuestion;
  onComplete: () => void;
  onRetry: () => void;
}

export const QuizOverlay: React.FC<QuizOverlayProps> = ({ quiz, onComplete, onRetry }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isCorrect = selectedOption === quiz.correctAnswerIndex;

  const handleSubmit = () => {
    setHasSubmitted(true);
    if (selectedOption === quiz.correctAnswerIndex) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-center gap-2 mb-6 text-orange-600 font-semibold tracking-wide uppercase text-sm">
            <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
            Knowledge Check
          </div>
          
          <h3 className="text-2xl font-bold text-slate-800 mb-6 leading-snug">
            {quiz.question}
          </h3>

          <div className="space-y-3">
            {quiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !hasSubmitted && setSelectedOption(index)}
                disabled={hasSubmitted}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
                  ${hasSubmitted && index === quiz.correctAnswerIndex 
                    ? 'border-green-500 bg-green-50 text-green-900' 
                    : hasSubmitted && index === selectedOption && !isCorrect
                    ? 'border-red-500 bg-red-50 text-red-900'
                    : selectedOption === index 
                    ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md scale-[1.02]' 
                    : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50 text-slate-700'
                  }`}
              >
                <span className="font-medium">{option}</span>
                {hasSubmitted && index === quiz.correctAnswerIndex && (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                )}
                {hasSubmitted && index === selectedOption && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </button>
            ))}
          </div>

          {hasSubmitted && !isCorrect && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100 flex gap-4 items-start"
            >
              <RefreshCcw className="w-5 h-5 text-red-600 mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-red-900 mb-1">Not quite right.</p>
                <p className="text-red-700 text-sm mb-3">Let's review the concept quickly.</p>
                <button 
                  onClick={onRetry}
                  className="text-xs font-bold bg-white text-red-600 px-3 py-1.5 rounded border border-red-200 hover:bg-red-50 transition-colors uppercase tracking-wide"
                >
                  Rewatch Segment
                </button>
              </div>
            </motion.div>
          )}

          {hasSubmitted && isCorrect && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100"
            >
              <div className="flex gap-3">
                 <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                 <div>
                    <p className="font-bold text-green-800">Correct!</p>
                    <p className="text-green-700 text-sm mt-1">{quiz.explanation}</p>
                 </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null || hasSubmitted}
            className={`px-8 py-3 rounded-xl font-bold transition-all
              ${selectedOption !== null && !hasSubmitted
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-200 hover:translate-y-[-1px]' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
          >
            Check Answer
          </button>
        </div>
      </motion.div>
    </div>
  );
};