import React, { useState, useEffect, useCallback } from 'react';
import { dutchNouns } from './words.js';

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function DutchVocabApp() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const handleCardClick = () => {
    if (showTranslation) return;
    setShowTranslation(true);
    setTimeout(() => {
      setShowTranslation(false);
    }, 500);
  };

  const startNewGame = () => {
    const shuffled = shuffle(dutchNouns);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setCorrectCount(0);
    setTotalAnswered(0);
    setStreak(0);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = useCallback((article) => {
    if (answered) return;
    
    setSelectedAnswer(article);
    setAnswered(true);
    setTotalAnswered(prev => prev + 1);
    
    const isCorrect = article === questions[currentIndex].article;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setStreak(prev => prev + 1);
      // Auto-advance after correct answer
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setAnswered(false);
        setSelectedAnswer(null);
        setShowTranslation(false);
      }, 300);
    } else {
      setStreak(0);
    }
  }, [answered, currentIndex, questions]);

  const nextQuestion = () => {
    setCurrentIndex(prev => prev + 1);
    setAnswered(false);
    setSelectedAnswer(null);
    setShowTranslation(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'd') {
        handleAnswer('de');
      } else if (e.key.toLowerCase() === 'h') {
        handleAnswer('het');
      } else if (e.key.toLowerCase() === 't') {
        handleCardClick();
      } else if ((e.key === 'Enter' || e.key === ' ') && answered && selectedAnswer !== questions[currentIndex]?.article) {
        nextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAnswer, answered, selectedAnswer, questions, currentIndex]);

  const currentWord = questions[currentIndex];
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
  const totalQuestions = questions.length;

  if (!currentWord) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentWord.article;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">
          <span className="text-sky-500">de</span>
          <span className="text-slate-300 mx-1">/</span>
          <span className="text-orange-500">het</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Master Dutch articles</p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-8 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-slate-400">Accuracy</div>
            <div className="text-lg font-bold text-slate-700">{accuracy}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 23c-3.866 0-7-2.239-7-5 0-1.5.5-3 2-4.5 1.5-1.5 2-3 2-4.5 0-1-1-3-1-3s3 1 3 4c0 1.5-1 3-1 4s1 2 2 2 2-1 2-2-1-2.5-1-4c0-3 3-4 3-4s-1 2-1 3c0 1.5.5 3 2 4.5s2 3 2 4.5c0 2.761-3.134 5-7 5z"/>
            </svg>
          </div>
          <div>
            <div className="text-xs text-slate-400">Streak</div>
            <div className="text-lg font-bold text-orange-500">{streak}</div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-2">
        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
          <div className="h-full flex">
            <div 
              className="bg-green-500 h-full transition-all duration-300"
              style={{ width: `${(correctCount / totalQuestions) * 100}%` }}
            />
            <div 
              className="bg-slate-400 h-full transition-all duration-300"
              style={{ width: `${((totalAnswered - correctCount) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-center text-slate-400 text-sm mt-2">
          {currentIndex + 1} of {totalQuestions}
        </div>
      </div>

      {/* Question card */}
      <div 
        onClick={handleCardClick}
        className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md mt-4 mb-6 cursor-pointer select-none transition-all hover:shadow-md"
      >
        <div className="text-center">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
            {showTranslation ? 'Translation' : 'What article?'}
          </p>
          <p className={`text-xs mb-3 ${showTranslation ? 'text-transparent' : 'text-slate-300'}`}>
            click to translate
          </p>
          <h2 className="text-5xl font-bold text-slate-800">
            {showTranslation ? currentWord.translation : currentWord.word}
          </h2>
        </div>
      </div>

      {/* Feedback for wrong answer */}
      {answered && !isCorrect && (
        <div className="text-center mb-4">
          <p className="text-red-500 font-medium">
            It's "{currentWord.article} {currentWord.word}"
          </p>
          <button
            onClick={nextQuestion}
            className="mt-2 text-slate-500 hover:text-slate-700 text-sm underline"
          >
            Continue →
          </button>
        </div>
      )}

      {/* Answer buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleAnswer('de')}
          disabled={answered}
          className={`w-36 h-24 text-3xl font-bold rounded-xl transition-all ${
            answered
              ? selectedAnswer === 'de'
                ? isCorrect
                  ? 'bg-green-500 text-white'
                  : 'bg-red-400 text-white'
                : currentWord.article === 'de'
                  ? 'bg-green-500 text-white'
                  : 'bg-sky-500 text-white opacity-50'
              : 'bg-sky-500 hover:bg-sky-600 text-white hover:scale-105 active:scale-95'
          }`}
        >
          de
        </button>
        <button
          onClick={() => handleAnswer('het')}
          disabled={answered}
          className={`w-36 h-24 text-3xl font-bold rounded-xl transition-all ${
            answered
              ? selectedAnswer === 'het'
                ? isCorrect
                  ? 'bg-green-500 text-white'
                  : 'bg-red-400 text-white'
                : currentWord.article === 'het'
                  ? 'bg-green-500 text-white'
                  : 'bg-orange-500 text-white opacity-50'
              : 'bg-orange-500 hover:bg-orange-600 text-white hover:scale-105 active:scale-95'
          }`}
        >
          het
        </button>
      </div>

      {/* Keyboard hint */}
      <p className="text-slate-400 text-sm mb-6">
        Press <kbd className="px-2 py-0.5 bg-white rounded border border-slate-200 text-slate-500 text-xs mx-1">D</kbd> for de, <kbd className="px-2 py-0.5 bg-white rounded border border-slate-200 text-slate-500 text-xs mx-1">H</kbd> for het, <kbd className="px-2 py-0.5 bg-white rounded border border-slate-200 text-slate-500 text-xs mx-1">T</kbd> for translation
      </p>

      {/* Start over button */}
      <button
        onClick={startNewGame}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        <span className="text-sm">Start over</span>
      </button>
    </div>
  );
}
