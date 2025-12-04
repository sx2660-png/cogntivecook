import React, { useState, useEffect, useRef } from 'react';
import { Lesson, Step } from '../types';
import { ChevronRight, ChevronLeft, Upload, Camera, Award, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { QuizOverlay } from './QuizOverlay';
import { motion, AnimatePresence } from 'framer-motion';

interface LessonPlayerProps {
  lesson: Lesson;
  onLessonComplete: () => void;
  onExit: () => void;
}

// Helper to parse highlighted text for Signaling principle
const HighlightedText = ({ text }: { text: string }) => {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <p className="text-xl md:text-2xl leading-relaxed text-slate-700">
      {parts.map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <span key={i} className="font-bold text-orange-600 bg-orange-50 px-1 rounded mx-0.5">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
};

export const LessonPlayer: React.FC<LessonPlayerProps> = ({ lesson, onLessonComplete, onExit }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  // Video State
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const isFinalSlide = currentStepIndex === lesson.steps.length;

  const currentStep = lesson.steps[currentStepIndex];

  // Auto-play video when step changes & reset state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setProgress(0);
      setIsPlaying(true);
      videoRef.current.play().catch(e => {
        console.log("Autoplay blocked", e);
        setIsPlaying(false);
      });
    }
  }, [currentStepIndex]);

  // Sync Video Events with UI
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updatePlayState = () => setIsPlaying(!video.paused);
    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('play', updatePlayState);
    video.addEventListener('pause', updatePlayState);
    video.addEventListener('timeupdate', updateProgress);

    return () => {
      video.removeEventListener('play', updatePlayState);
      video.removeEventListener('pause', updatePlayState);
      video.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (videoRef.current && videoRef.current.duration) {
      const newTime = (newValue / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(newValue);
    }
  };

  const handleNext = () => {
    // Checkpoint logic
    if (currentStep && currentStep.quiz && !showQuiz) {
      // If we haven't shown the quiz yet, show it now instead of moving forward (but we assume quiz completed lets us move forward)
      // Actually, let's track quiz completion status if we wanted to be strict.
      // For this demo, simply triggering it if present.
    }
    
    if (currentStepIndex < lesson.steps.length) {
       // If current step has a quiz, we show it. 
       if (currentStep.quiz) {
         setShowQuiz(true);
       } else {
         setCurrentStepIndex(prev => prev + 1);
       }
    } else {
        setIsCompleted(true);
    }
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    setCurrentStepIndex(prev => prev + 1);
  };

  const handleQuizRetry = () => {
      setShowQuiz(false);
      // Stay on current step to rewatch
      if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
      }
  };

  const handlePhotoUpload = () => {
    // Mock upload
    setTimeout(() => {
        setPhotoUploaded(true);
        setTimeout(() => {
            onLessonComplete();
        }, 3000);
    }, 1500);
  };

  // Final Slide View
  if (isFinalSlide) {
      return (
          <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white">
              <div className="max-w-md w-full text-center">
                  {!photoUploaded ? (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-slate-700">
                            <Camera className="w-10 h-10 text-slate-400" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Plate & Snap</h2>
                        <p className="text-slate-400 mb-8">Show off your masterpiece to unlock the "Sous Chef" badge.</p>
                        
                        <label className="block w-full cursor-pointer">
                            <div className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2"
                                 onClick={handlePhotoUpload}
                            >
                                <Upload className="w-5 h-5" />
                                Upload Dish Photo
                            </div>
                        </label>
                        <button onClick={onExit} className="mt-6 text-sm text-slate-500 hover:text-white underline">Skip for now</button>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
                        <div className="relative">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-50"
                            ></motion.div>
                            <Award className="w-32 h-32 text-yellow-400 relative z-10 drop-shadow-lg" />
                        </div>
                        <h2 className="text-4xl font-bold mt-8 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Badge Unlocked!</h2>
                        <p className="text-xl font-medium text-white">Sous Chef</p>
                        <p className="mt-8 text-slate-400 animate-pulse">Returning to Dashboard...</p>
                    </motion.div>
                  )}
              </div>
          </div>
      )
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Top Bar */}
      <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
        <button onClick={onExit} className="text-slate-500 hover:text-slate-800 font-medium text-sm">
           Exit Lesson
        </button>
        <div className="flex gap-1">
           {lesson.steps.map((_, idx) => (
               <div key={idx} className={`h-1.5 w-8 rounded-full transition-colors ${idx <= currentStepIndex ? 'bg-orange-500' : 'bg-slate-200'}`} />
           ))}
        </div>
      </div>

      {/* Main Split Content */}
      <div className="flex-1 overflow-hidden relative">
         <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* Left: Video (Multimedia Principle) */}
            <div className="bg-black relative flex items-center justify-center group overflow-hidden">
                {currentStep && (
                    <video 
                        ref={videoRef}
                        key={currentStep.videoUrl} // Force reload on step change
                        src={currentStep.videoUrl}
                        className="w-full h-full object-contain"
                        loop
                        muted={isMuted}
                        playsInline
                        autoPlay
                    />
                )}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white px-3 py-1 rounded font-mono text-xs uppercase tracking-widest pointer-events-none">
                    Step {currentStepIndex + 1}
                </div>

                {/* Custom Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-4">
                  {/* Play/Pause */}
                  <button 
                    onClick={handleTogglePlay}
                    className="text-white hover:text-orange-400 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
                  </button>

                  {/* Seek Bar */}
                  <div className="flex-1 relative h-1.5 bg-white/30 rounded-full overflow-hidden">
                     {/* Progress Fill */}
                     <div 
                       className="absolute top-0 left-0 h-full bg-orange-500 rounded-full"
                       style={{ width: `${progress}%` }}
                     />
                     {/* Interactive Input */}
                     <input 
                       type="range" 
                       min="0" 
                       max="100" 
                       value={progress} 
                       onChange={handleSeek}
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                     />
                  </div>

                  {/* Volume Toggle */}
                  <button 
                    onClick={handleToggleMute}
                    className="text-white hover:text-orange-400 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </button>
                </div>
            </div>

            {/* Right: Instruction (Coherence & Signaling) */}
            <div className="bg-white p-8 md:p-12 flex flex-col justify-center relative">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentStepIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">{currentStep.title}</h2>
                        <HighlightedText text={currentStep.instruction} />
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="mt-12 flex gap-4">
                   <button 
                     onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                     disabled={currentStepIndex === 0}
                     className="px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold disabled:opacity-30 hover:bg-slate-50 transition-colors"
                   >
                     <ChevronLeft className="w-6 h-6" />
                   </button>

                   <button 
                     onClick={handleNext}
                     className="flex-1 bg-slate-900 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                   >
                     {currentStepIndex === lesson.steps.length - 1 ? 'Finish Cooking' : 'Next Step'}
                     <ChevronRight className="w-6 h-6" />
                   </button>
                </div>
            </div>
         </div>
      </div>

      {/* Quiz Interruption */}
      {showQuiz && currentStep.quiz && (
          <QuizOverlay 
             quiz={currentStep.quiz} 
             onComplete={handleQuizComplete}
             onRetry={handleQuizRetry}
          />
      )}
    </div>
  );
};