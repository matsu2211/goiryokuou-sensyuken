import React from 'react';

interface TimerProps {
  remainingTime: number; // in seconds
}

const Timer: React.FC<TimerProps> = ({ remainingTime }) => {
  const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
  const seconds = (remainingTime % 60).toString().padStart(2, '0');

  const isUrgent = remainingTime > 0 && remainingTime <= 10;
  const isFinished = remainingTime === 0;

  const colorClasses = [
    'text-6xl',
    'md:text-7xl',
    'font-bold',
    'font-mono',
    'transition-colors',
    'duration-500',
    'p-4',
    'rounded-lg',
    'bg-white/50',
    'dark:bg-stone-800/50',
    'shadow-inner',
  ];

  if (isFinished) {
    colorClasses.push('text-red-500 animate-pulse');
  } else if (isUrgent) {
    colorClasses.push('text-orange-500');
  } else {
    colorClasses.push('text-stone-800 dark:text-stone-200');
  }
  
  return (
    <div className="mb-6">
      <div className={colorClasses.join(' ')}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
};

export default Timer;
