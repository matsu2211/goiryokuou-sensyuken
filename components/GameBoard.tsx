
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ThemeCard, LetterCard, GameSettings } from '../types';
import Card from './Card';
import ShuffleIcon from './icons/ShuffleIcon';
import Timer from './Timer';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import ResetIcon from './icons/ResetIcon';

interface GameBoardProps {
  themeCard: ThemeCard | null;
  letterCard: LetterCard | null;
  onDraw: () => void;
  onReset: () => void;
  timerDuration: number; // in minutes
  themeType: GameSettings['themeType'];
  activeRuleTitle: string | null;
}

const GameBoard: React.FC<GameBoardProps> = ({ themeCard, letterCard, onDraw, onReset, timerDuration, themeType, activeRuleTitle }) => {
  const [remainingTime, setRemainingTime] = useState(timerDuration * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [count, setCount] = useState(0);

  const stopTimer = useCallback(() => {
    setIsTimerActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopTimer();
    };
  }, [stopTimer]);
  
  const startTimer = useCallback(() => {
    if (isTimerActive || remainingTime <= 0) return;

    setIsTimerActive(true);
    timerRef.current = window.setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 1) {
          stopTimer();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, [isTimerActive, remainingTime, stopTimer]);

  const resetTimer = useCallback(() => {
    stopTimer();
    setRemainingTime(timerDuration * 60);
  }, [stopTimer, timerDuration]);
  
  const handleDraw = () => {
    onDraw();
  };

  const handleReset = () => {
    stopTimer();
    onReset();
  };

  const timerButtonClasses = "flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-stone-900 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105";
  const startButtonClasses = `${timerButtonClasses} bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 hover:bg-green-300 dark:hover:bg-green-700`;
  const stopButtonClasses = `${timerButtonClasses} bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 hover:bg-amber-300 dark:hover:bg-amber-700`;
  const resetButtonClasses = `${timerButtonClasses} bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-600`;

  const counterButtonClasses = "w-14 h-14 flex items-center justify-center text-3xl font-bold rounded-full bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-200 shadow-md hover:bg-stone-200 dark:hover:bg-stone-600 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-stone-900 focus:ring-amber-500";
  const clearButtonClasses = "flex items-center justify-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full shadow-sm transition-all duration-200 bg-stone-200 dark:bg-stone-700/80 text-stone-600 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-600 transform hover:scale-105";

  const shouldShowCounter = themeType === 'genre' ||
                            themeType === 'character' ||
                            themeType === 'character_count' ||
                            themeType === 'random';

  return (
    <div className="flex flex-col items-center gap-4 animate-fade-in w-full">
      <div className="flex flex-col items-center gap-2">
        <Timer remainingTime={remainingTime} />
        <div className="flex items-center gap-3">
          {!isTimerActive ? (
            <button onClick={startTimer} disabled={remainingTime <= 0} className={startButtonClasses}>
              <PlayIcon className="w-5 h-5" />
              <span>スタート</span>
            </button>
          ) : (
            <button onClick={stopTimer} className={stopButtonClasses}>
              <PauseIcon className="w-5 h-5" />
              <span>ストップ</span>
            </button>
          )}
          <button onClick={resetTimer} className={resetButtonClasses}>
            <ResetIcon className="w-5 h-5" />
            <span>リセット</span>
          </button>
        </div>
      </div>

      {themeType === 'random' && activeRuleTitle && (
        <div className="my-2 text-center p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg shadow-md animate-fade-in w-full max-w-sm">
            <h3 className="font-bold text-amber-700 dark:text-amber-300 text-xl tracking-wide">
                {activeRuleTitle}
            </h3>
        </div>
      )}

      <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-6 mt-2">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2 text-stone-600 dark:text-stone-300">
              {themeCard?.constraintType === 'character' ? <>おわりの<ruby>文字<rt>もじ</rt></ruby></> : 
               <>お<ruby>題<rt>だい</rt></ruby></>}
            </h2>
            <Card card={themeCard} placeholderText={
                themeCard?.constraintType === 'character' ? 'おわりのもじ' : 'テーマ'
              } />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2 text-stone-600 dark:text-stone-300">
              {themeCard?.constraintType === 'character' ? <>はじめの<ruby>文字<rt>もじ</rt></ruby></> : 
               themeCard?.constraintType === 'character_count' ? <><ruby>文字数<rt>もじすう</rt></ruby></> : 
               <><ruby>文字<rt>もじ</rt></ruby></>}
            </h2>
            <Card card={letterCard} placeholderText={
                themeCard?.constraintType === 'character_count' ? 'もじすう' : 'もじ'
              } />
          </div>
        </div>
      </div>
      
      {shouldShowCounter && (
        <div className="my-6 w-full max-w-sm flex flex-col items-center gap-3 p-4 bg-amber-100/50 dark:bg-stone-800/50 rounded-xl shadow-inner animate-fade-in">
          <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-300 tracking-wide">
            <ruby>獲得数<rt>かくとくすう</rt></ruby>
          </h3>
          <div className="flex items-center gap-4">
            <button onClick={() => setCount(prev => Math.max(0, prev - 1))} className={counterButtonClasses} aria-label="数を減らす">
              -
            </button>
            <span className="text-6xl font-bold font-mono w-28 text-center text-stone-800 dark:text-stone-100 select-none">
              {count}
            </span>
            <button onClick={() => setCount(prev => prev + 1)} className={counterButtonClasses} aria-label="数を増やす">
              +
            </button>
          </div>
          <button onClick={() => setCount(0)} className={clearButtonClasses}>
            <ResetIcon className="w-4 h-4" />
            <span>クリア</span>
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <button
          onClick={handleDraw}
          className="w-64 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-800"
        >
          カードを<ruby>引<rt>ひ</rt></ruby>く
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 font-semibold rounded-full shadow-md hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors duration-300"
        >
          <ShuffleIcon className="w-5 h-5" />
          <ruby>設定<rt>せってい</rt></ruby>にもどる
        </button>
      </div>
    </div>
  );
};

export default GameBoard;