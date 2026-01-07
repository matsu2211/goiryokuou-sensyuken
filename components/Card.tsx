import React from 'react';
import { CardData } from '../types';

interface CardProps {
  card: CardData | null;
  placeholderText: string;
}

const Card: React.FC<CardProps> = ({ card, placeholderText }) => {
  const baseClasses = "aspect-video md:aspect-[4/3] w-full rounded-2xl shadow-lg flex flex-col items-center justify-center p-4 transition-all duration-300 transform-gpu";
  const placeholderClasses = "bg-white dark:bg-stone-700 border-4 border-dashed border-stone-300 dark:border-stone-600";
  
  if (!card) {
    return (
      <div className={`${baseClasses} ${placeholderClasses}`}>
        <span className="text-2xl font-bold text-stone-400 dark:text-stone-500">{placeholderText}</span>
      </div>
    );
  }

  const renderContent = () => {
    switch (card.type) {
      case 'text':
        return <span className="text-5xl md:text-7xl font-extrabold select-none" dangerouslySetInnerHTML={{ __html: card.content }} />;
      case 'image':
        return (
          <div className="w-full h-full flex flex-col justify-center items-center text-center">
            <img 
              src={`https://picsum.photos/seed/${card.imageSeed}/400/300`} 
              alt={card.content}
              className="w-full h-4/5 object-cover rounded-lg mb-2"
            />
            <p className="text-xl font-bold">{card.content}</p>
          </div>
        );
      case 'color':
        return <span className="text-4xl md:text-5xl font-extrabold select-none">{card.content}</span>;
      default:
        return null;
    }
  };

  const cardClasses = card.colorClass 
    ? card.colorClass
    : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100';

  return (
    <div className={`${baseClasses} ${cardClasses}`}>
      {renderContent()}
    </div>
  );
};

export default Card;
