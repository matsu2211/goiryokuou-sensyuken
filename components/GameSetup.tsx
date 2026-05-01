
import React, { useState } from 'react';
import { GameSettings } from '../types';
import RuleModal from './RuleModal';
import CloseIcon from './icons/CloseIcon';

interface GameSetupProps {
  onStartGame: (settings: GameSettings) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  const [settings, setSettings] = useState<GameSettings>({
    themeType: 'genre',
    timerDuration: 3,
    showRuby: true,
    customThemes: [],
  });
  const [customThemeInput, setCustomThemeInput] = useState('');
  
  const [ruleModalMode, setRuleModalMode] = useState<GameSettings['themeType'] | null>(null);

  const handleThemeTypeChange = (themeType: GameSettings['themeType']) => {
    setSettings(prev => ({ ...prev, themeType }));
  };

  const handleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setSettings(prev => ({...prev, timerDuration: Math.max(1, value || 1)}));
  }

  const handleRubyToggle = () => {
    setSettings(prev => ({ ...prev, showRuby: !prev.showRuby }));
  };
  
  const handleAddCustomTheme = () => {
    const newTheme = customThemeInput.trim();
    if (newTheme && !settings.customThemes?.includes(newTheme)) {
      setSettings(prev => ({
        ...prev,
        customThemes: [...(prev.customThemes || []), newTheme],
      }));
      setCustomThemeInput('');
    }
  };

  const handleRemoveCustomTheme = (themeToRemove: string) => {
    setSettings(prev => ({
      ...prev,
      customThemes: (prev.customThemes || []).filter(theme => theme !== themeToRemove),
    }));
  };
  
  const handleStartGame = () => {
    onStartGame(settings);
  };

  const themeOptions: { type: GameSettings['themeType']; label: React.ReactNode }[] = [
    { type: 'genre', label: <>ジャンル<ruby>縛<rt>しば</rt></ruby>り</> },
    { type: 'character', label: <><ruby>文字<rt>もじ</rt></ruby><ruby>縛<rt>しば</rt></ruby>り</> },
    { type: 'character_count', label: <><ruby>文字数<rt>もじすう</rt></ruby><ruby>縛<rt>しば</rt></ruby>り</> },
    { type: 'random', label: <>おまかせ</> },
  ];

  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-2xl animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center mb-6">ゲーム<ruby>設定<rt>せってい</rt></ruby></h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 border-b-2 border-stone-200 dark:border-stone-700 pb-2">お<ruby>題<rt>だい</rt></ruby>カードの<ruby>種類<rt>しゅるい</rt></ruby></h3>
          <div className="space-y-2">
            {themeOptions.map(({ type, label }) => (
              <div key={type}>
                <div className="flex items-center justify-between">
                  <Radio 
                    label={label}
                    checked={settings.themeType === type} 
                    onChange={() => handleThemeTypeChange(type)}
                    name="theme-type"
                  />
                  <RuleButton onClick={() => setRuleModalMode(type)} />
                </div>
                {type === 'genre' && settings.themeType === 'genre' && (
                  <div className="pl-8 pt-2 space-y-3 animate-fade-in">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customThemeInput}
                        onChange={(e) => setCustomThemeInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomTheme(); } }}
                        placeholder="自由にお題を追加 (例: 文房具)"
                        className="flex-grow p-2 rounded-md bg-stone-100 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                        aria-label="カスタムお題の入力"
                      />
                      <button
                        onClick={handleAddCustomTheme}
                        className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors text-sm"
                      >
                        追加
                      </button>
                    </div>
                    {settings.customThemes && settings.customThemes.length > 0 ? (
                      <div className="flex flex-wrap gap-2 p-2 bg-stone-50 dark:bg-stone-900/50 rounded-md">
                        {settings.customThemes.map(theme => (
                          <div key={theme} className="flex items-center gap-1.5 bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-sm font-medium px-2.5 py-1 rounded-full">
                            <span>{theme}</span>
                            <button onClick={() => handleRemoveCustomTheme(theme)} className="text-amber-600 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-100" aria-label={`${theme}を削除`}>
                              <CloseIcon className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-stone-500 dark:text-stone-400 px-2">お<ruby>題<rt>だい</rt></ruby>を<ruby>追加<rt>ついか</rt></ruby>しない<ruby>場合<rt>ばあい</rt></ruby>は、<ruby>既存<rt>きそん</rt></ruby>のジャンルから<ruby>出題<rt>しゅつだい</rt></ruby>されます。</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 border-b-2 border-stone-200 dark:border-stone-700 pb-2">タイマー<ruby>設定<rt>せってい</rt></ruby></h3>
           <div className="flex items-center gap-4 p-3">
            <label htmlFor="timer-duration" className="text-stone-700 dark:text-stone-300 font-medium"><ruby>時間<rt>じかん</rt></ruby>（<ruby>分<rt>ふん</rt></ruby>）:</label>
            <input
              id="timer-duration"
              type="number"
              min="1"
              value={settings.timerDuration}
              onChange={handleTimerChange}
              className="w-24 p-2 rounded-md bg-stone-100 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 border-b-2 border-stone-200 dark:border-stone-700 pb-2">ルビ（ふりがな）</h3>
          <div className="flex items-center justify-between p-3">
            <span className="text-stone-700 dark:text-stone-300 font-medium">ルビを<ruby>表示<rt>ひょうじ</rt></ruby>する</span>
            <button
              onClick={handleRubyToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-stone-800 ${
                settings.showRuby ? 'bg-orange-500' : 'bg-stone-300 dark:bg-stone-600'
              }`}
              role="switch"
              aria-checked={settings.showRuby}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showRuby ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleStartGame}
        className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        ゲーム<ruby>開始<rt>かいし</rt></ruby>
      </button>

      <RuleModal mode={ruleModalMode} onClose={() => setRuleModalMode(null)} />
    </div>
  );
};

const RuleButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="px-3 py-1 text-sm font-semibold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/50 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors"
    aria-label="ルールを表示"
  >
    ルール
  </button>
);


interface RadioProps {
    label: React.ReactNode;
    checked: boolean;
    onChange: () => void;
    name: string;
}

const Radio: React.FC<RadioProps> = ({ label, checked, onChange, name }) => (
    <label className="flex flex-grow items-center p-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 cursor-pointer transition-colors">
      <div className="relative flex items-center">
        <input 
          type="radio" 
          name={name}
          checked={checked}
          onChange={onChange}
          className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-stone-300 dark:border-stone-600 transition-all checked:border-orange-500 checked:bg-orange-500"
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <div className="h-2.5 w-2.5 bg-white rounded-full"></div>
        </div>
      </div>
      <span className="ml-3 text-stone-700 dark:text-stone-300">{label}</span>
    </label>
);

export default GameSetup;