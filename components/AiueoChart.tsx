import React from 'react';

const hiraganaRows = [
  ['あ', 'い', 'う', 'え', 'お'],
  ['か', 'き', 'く', 'け', 'こ'],
  ['さ', 'し', 'す', 'せ', 'そ'],
  ['た', 'ち', 'つ', 'て', 'と'],
  ['な', 'に', 'ぬ', 'ね', 'の'],
  ['は', 'ひ', 'ふ', 'へ', 'ほ'],
  ['ま', 'み', 'む', 'め', 'も'],
  ['や', ' ', 'ゆ', ' ', 'よ'],
  ['ら', 'り', 'る', 'れ', 'ろ'],
  ['わ', 'を', 'ん', ' ', ' '],
];

const AiueoChart: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col gap-3 p-3 bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 flex-shrink-0 animate-fade-in">
      <h3 className="text-base font-bold text-center border-b border-stone-200 dark:border-stone-700 pb-1 mb-2">
        あいうえお<ruby>表<rt>ひょう</rt></ruby>
      </h3>
      <div className="grid grid-cols-5 gap-1">
        {hiraganaRows.flat().map((char, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-7 h-7 text-base rounded ${
              char.trim() === ''
              ? 'bg-transparent'
              : 'bg-stone-100 dark:bg-stone-700 font-medium text-stone-800 dark:text-stone-200'
            }`}
          >
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiueoChart;
