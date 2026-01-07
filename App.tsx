
import React, { useState, useCallback, useMemo } from 'react';
import { GameSettings, ThemeCard, LetterCard } from './types';
import GameSetup from './components/GameSetup';
import GameBoard from './components/GameBoard';
import { TEXT_THEMES, CHARACTER_THEMES, CHARACTER_COUNT_THEMES, NTH_LETTER_THEMES, HIRAGANA_LETTERS, HIRAGANA_FOR_CONSTRAINT } from './constants/cards';

// Fisher-Yates shuffle algorithm
const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const getRandomChar = (chars: string[]): string => {
  const randomIndex = Math.floor(Math.random() * chars.length);
  return chars[randomIndex];
};

const App: React.FC = () => {
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  
  const [themeDeck, setThemeDeck] = useState<ThemeCard[]>([]);
  const [letterDeck, setLetterDeck] = useState<LetterCard[]>([]);

  const [currentTheme, setCurrentTheme] = useState<ThemeCard | null>(null);
  const [currentLetter, setCurrentLetter] = useState<LetterCard | null>(null);
  const [activeRuleTitle, setActiveRuleTitle] = useState<string | null>(null);

  const isGameStarted = useMemo(() => gameSettings !== null, [gameSettings]);

  const isNthLetterMode = useMemo(() => {
    if (!gameSettings) return false;
    return gameSettings.themeType === 'nth_letter' ||
           (gameSettings.themeType === 'random' && currentTheme?.constraintType === 'nth_letter');
  }, [gameSettings, currentTheme]);

  const startGame = useCallback((settings: GameSettings) => {
    setGameSettings(settings);

    let themes: ThemeCard[];
    if (settings.themeType === 'genre' && settings.customThemes && settings.customThemes.length > 0) {
      themes = settings.customThemes.map(theme => ({ type: 'text', content: theme }));
    } else {
      switch (settings.themeType) {
        case 'genre':
          themes = TEXT_THEMES;
          break;
        case 'character':
          themes = CHARACTER_THEMES;
          break;
        case 'character_count':
          themes = CHARACTER_COUNT_THEMES;
          break;
        case 'nth_letter':
          themes = NTH_LETTER_THEMES;
          break;
        case 'random':
          themes = [...TEXT_THEMES, ...CHARACTER_THEMES, ...CHARACTER_COUNT_THEMES, ...NTH_LETTER_THEMES];
          break;
        default:
          themes = [];
      }
    }
    
    setThemeDeck(shuffle(themes));
    setLetterDeck(shuffle(HIRAGANA_LETTERS));
    setCurrentTheme(null);
    setCurrentLetter(null);
    setActiveRuleTitle(null);
  }, []);

  const drawCards = useCallback(() => {
    let newThemeDeck = [...themeDeck];
    let newLetterDeck = [...letterDeck];

    if (newThemeDeck.length === 0) {
      // Reshuffle if deck is empty
      if(gameSettings){
        let themes: ThemeCard[];
        if (gameSettings.themeType === 'genre' && gameSettings.customThemes && gameSettings.customThemes.length > 0) {
          themes = gameSettings.customThemes.map(theme => ({ type: 'text', content: theme }));
        } else {
          switch (gameSettings.themeType) {
            case 'genre':
              themes = TEXT_THEMES;
              break;
            case 'character':
              themes = CHARACTER_THEMES;
              break;
            case 'character_count':
              themes = CHARACTER_COUNT_THEMES;
              break;
            case 'nth_letter':
              themes = NTH_LETTER_THEMES;
              break;
            case 'random':
              themes = [...TEXT_THEMES, ...CHARACTER_THEMES, ...CHARACTER_COUNT_THEMES, ...NTH_LETTER_THEMES];
              break;
            default:
              themes = [];
          }
        }
        newThemeDeck = shuffle(themes);
      }
    }
    
    if (newLetterDeck.length === 0) {
      // Reshuffle if deck is empty
      if(gameSettings){
        newLetterDeck = shuffle(HIRAGANA_LETTERS);
      }
    }

    const nextTheme = newThemeDeck.pop() ?? null;

    if (gameSettings?.themeType === 'random') {
      let ruleTitle: string;
      switch(nextTheme?.constraintType) {
        case 'character':
          ruleTitle = '文字縛り';
          break;
        case 'character_count':
          ruleTitle = '文字数縛り';
          break;
        case 'nth_letter':
          ruleTitle = '◯番目をねらえ！';
          break;
        default:
          ruleTitle = 'ジャンル縛り';
          break;
      }
      setActiveRuleTitle(ruleTitle);
    }


    if (nextTheme?.constraintType === 'character') {
      const startChar = getRandomChar(HIRAGANA_FOR_CONSTRAINT);
      const endChar = getRandomChar(HIRAGANA_FOR_CONSTRAINT);

      const constraintTheme: ThemeCard = {
        type: 'text',
        content: endChar,
        constraintType: nextTheme.constraintType
      };
      const startLetter: LetterCard = {
        type: 'text',
        content: startChar
      };
      
      setCurrentTheme(constraintTheme);
      setCurrentLetter(startLetter);
      // 文字カードの山札は消費しない
      setLetterDeck(newLetterDeck);
    } else if (nextTheme?.constraintType === 'character_count') {
      // Pick a random genre from the standard text themes
      const randomGenreTheme = TEXT_THEMES[Math.floor(Math.random() * TEXT_THEMES.length)];
      // Random number between 3 and 6
      const charCount = Math.floor(Math.random() * 4) + 3;

      const genreTheme: ThemeCard = {
        type: 'text',
        content: randomGenreTheme.content,
        constraintType: nextTheme.constraintType
      };

      const charCountCard: LetterCard = {
        type: 'text',
        content: `${charCount}<ruby>文字<rt>もじ</rt></ruby><ruby>以上<rt>いじょう</rt></ruby>`
      };
      
      setCurrentTheme(genreTheme);
      setCurrentLetter(charCountCard);
      // 文字カードの山札は消費しない
      setLetterDeck(newLetterDeck);
    } else if (nextTheme?.constraintType === 'nth_letter') {
      // Pick a random genre from the standard text themes
      const randomGenreTheme = TEXT_THEMES[Math.floor(Math.random() * TEXT_THEMES.length)];
      
      // Determine a random rank (e.g., 1st to 3rd)
      const rank = Math.floor(Math.random() * 3) + 1;

      const genreCard: ThemeCard = {
        type: 'text',
        content: randomGenreTheme.content,
        constraintType: 'nth_letter'
      };
      
      const rankCard: LetterCard = {
        type: 'text',
        content: `${rank}<ruby>番目<rt>ばんめ</rt></ruby>`
      };
      
      setCurrentTheme(genreCard);
      setCurrentLetter(rankCard);
      
      // Do not consume from the letter deck
      setLetterDeck(newLetterDeck);
    } else {
      const nextLetter = newLetterDeck.pop() ?? null;
      setCurrentTheme(nextTheme);
      setCurrentLetter(nextLetter);
      setLetterDeck(newLetterDeck);
    }

    setThemeDeck(newThemeDeck);

  }, [themeDeck, letterDeck, gameSettings]);

  const resetToSetup = useCallback(() => {
    setGameSettings(null);
    setCurrentTheme(null);
    setCurrentLetter(null);
    setThemeDeck([]);
    setLetterDeck([]);
    setActiveRuleTitle(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
          <ruby>語彙力<rt>ごいりょく</rt></ruby><ruby>王<rt>おう</rt></ruby><ruby>選手権<rt>せんしゅけん</rt></ruby>
        </h1>
        <p className="mt-2 text-lg text-stone-600 dark:text-stone-400 font-medium">
          「お<ruby>題<rt>だい</rt></ruby>の<ruby>言葉<rt>ことば</rt></ruby>」いくつ<ruby>思<rt>おも</rt></ruby>いつくかチャレンジ！
        </p>
      </header>

      <main className={`w-full transition-all duration-500 ${isNthLetterMode ? 'max-w-6xl' : 'max-w-4xl'}`}>
        {!isGameStarted ? (
          <GameSetup onStartGame={startGame} />
        ) : (
          <GameBoard
            themeCard={currentTheme}
            letterCard={currentLetter}
            onDraw={drawCards}
            onReset={resetToSetup}
            timerDuration={gameSettings.timerDuration}
            themeType={gameSettings.themeType}
            activeRuleTitle={activeRuleTitle}
          />
        )}
      </main>
      <footer className="mt-8 text-center text-sm text-stone-400">
        <p>&copy; 2024 - A fun word game for everyone.</p>
      </footer>
    </div>
  );
};

export default App;