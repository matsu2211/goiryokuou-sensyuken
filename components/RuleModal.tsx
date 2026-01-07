
import React from 'react';
import { GameSettings } from '../types';
import CloseIcon from './icons/CloseIcon';

interface RuleModalProps {
  mode: GameSettings['themeType'] | null;
  onClose: () => void;
}

const RuleModal: React.FC<RuleModalProps> = ({ mode, onClose }) => {
  if (!mode) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rule-title"
    >
      <div 
        className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto relative text-center text-stone-800 dark:text-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
          aria-label="閉じる"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
        <RuleContent mode={mode} />
      </div>
    </div>
  );
};

const RuleContent: React.FC<{ mode: GameSettings['themeType'] }> = ({ mode }) => {
  switch (mode) {
    case 'genre':
      return <GenreRule />;
    case 'character':
      return <CharacterRule />;
    case 'character_count':
      return <CharacterCountRule />;
    case 'nth_letter':
      return <NthLetterRule />;
    case 'random':
      return <RandomRule />;
    default:
      return null;
  }
};

const RuleCard: React.FC<{ title: string, content: string, className?: string }> = ({ title, content, className = '' }) => (
  <div className={`p-4 bg-stone-100 dark:bg-stone-700 rounded-lg ${className}`}>
    <div className="text-sm text-stone-500 dark:text-stone-400">{title}</div>
    <div className="font-bold text-xl">{content}</div>
  </div>
);

const GenreRule = () => (
  <>
    <h3 id="rule-title" className="text-2xl font-bold mb-4">ジャンル<ruby>縛<rt>しば</rt></ruby>り ルール</h3>
    <div className="text-left space-y-4">
      <p>「お<ruby>題<rt>だい</rt></ruby>」と「<ruby>文字<rt>もじ</rt></ruby>」のカードが1<ruby>枚<rt>まい</rt></ruby>ずつ<ruby>配<rt>くば</rt></ruby>られます。<br /><ruby>お題<rt>だい</rt></ruby>に<ruby>合<rt>あ</rt></ruby>っていて、<ruby>指定<rt>してい</rt></ruby>された<ruby>文字<rt>もじ</rt></ruby>で<ruby>始<rt>はじ</rt></ruby>まる<ruby>言葉<rt>ことば</rt></ruby>を<ruby>答<rt>こた</rt></ruby>えましょう！</p>
      <div className="text-center font-bold my-4">〈 <ruby>例<rt>れい</rt></ruby> 〉</div>
      <div className="flex items-center justify-center gap-4">
        <RuleCard title="お題" content="どうぶつ" />
        <div className="text-2xl font-bold">+</div>
        <RuleCard title="文字" content="り" />
      </div>
      <div className="text-center text-4xl my-4">↓</div>
      <div className="text-center">
        <span className="text-2xl font-bold bg-amber-200 dark:bg-amber-800/50 px-3 py-1 rounded"><ruby>解答例<rt>かいとうれい</rt></ruby>: りす、りゅう</span>
      </div>
    </div>
  </>
);

const CharacterRule = () => (
  <>
    <h3 id="rule-title" className="text-2xl font-bold mb-4"><ruby>文字<rt>もじ</rt></ruby><ruby>縛<rt>しば</rt></ruby>り ルール</h3>
    <div className="text-left space-y-4">
      <p>「はじめの<ruby>文字<rt>もじ</rt></ruby>」と「おわりの<ruby>文字<rt>もじ</rt></ruby>」が<ruby>指定<rt>してい</rt></ruby>されます。<br /><ruby>指定<rt>してい</rt></ruby>された<ruby>文字<rt>もじ</rt></ruby>で<ruby>始<rt>はじ</rt></ruby>まり、<ruby>指定<rt>してい</rt></ruby>された<ruby>文字<rt>もじ</rt></ruby>で<ruby>終<rt>お</rt></ruby>わる<ruby>言葉<rt>ことば</rt></ruby>を<ruby>答<rt>こた</rt></ruby>えましょう！</p>
      <div className="text-center font-bold my-4">〈 <ruby>例<rt>れい</rt></ruby> 〉</div>
      <div className="flex items-center justify-center gap-4">
        <RuleCard title="はじめ" content="り" />
        <div className="text-2xl font-bold">&</div>
        <RuleCard title="おわり" content="す" />
      </div>
      <div className="text-center text-4xl my-4">↓</div>
      <div className="text-center">
        <span className="text-2xl font-bold bg-amber-200 dark:bg-amber-800/50 px-3 py-1 rounded"><ruby>解答例<rt>かいとうれい</rt></ruby>: りんごジュース</span>
      </div>
    </div>
  </>
);

const CharacterCountRule = () => (
  <>
    <h3 id="rule-title" className="text-2xl font-bold mb-4"><ruby>文字数<rt>もじすう</rt></ruby><ruby>縛<rt>しば</rt></ruby>り ルール</h3>
    <div className="text-left space-y-4">
      <p>「お<ruby>題<rt>だい</rt></ruby>」と「<ruby>文字数<rt>もじすう</rt></ruby>」が<ruby>指定<rt>してい</rt></ruby>されます。<br /><ruby>お題<rt>だい</rt></ruby>に<ruby>合<rt>あ</rt></ruby>っていて、<ruby>指定<rt>してい</rt></ruby>された<ruby>文字数以上<rt>もじすういじょう</rt></ruby>の<ruby>言葉<rt>ことば</rt></ruby>を<ruby>答<rt>こた</rt></ruby>えましょう！</p>
      <div className="text-center font-bold my-4">〈 <ruby>例<rt>れい</rt></ruby> 〉</div>
      <div className="flex items-center justify-center gap-4">
        <RuleCard title="お題" content="やさい" />
        <div className="text-2xl font-bold">&</div>
        <RuleCard title="文字数" content="4文字以上" />
      </div>
      <div className="text-center text-4xl my-4">↓</div>
      <div className="text-center">
        <span className="text-2xl font-bold bg-amber-200 dark:bg-amber-800/50 px-3 py-1 rounded"><ruby>解答例<rt>かいとうれい</rt></ruby>: ブロッコリー</span>
      </div>
    </div>
  </>
);

const NthLetterRule = () => (
  <>
    <h3 id="rule-title" className="text-2xl font-bold mb-4">◯<ruby>番目<rt>ばんめ</rt></ruby>をねらえ！ ルール</h3>
    <div className="text-left space-y-4">
      <p>「お<ruby>題<rt>だい</rt></ruby>」と「ねらう<ruby>順位<rt>じゅんい</rt></ruby>」が<ruby>指定<rt>してい</rt></ruby>されます。<br /><ruby>お題<rt>だい</rt></ruby>に<ruby>合<rt>あ</rt></ruby>う<ruby>言葉<rt>ことば</rt></ruby>の<ruby>中<rt>なか</rt></ruby>で、<ruby>辞書<rt>じしょ</rt></ruby>（あいうえお）の<ruby>順番<rt>じゅんばん</rt></ruby>で、<ruby>指定<rt>してい</rt></ruby>された<ruby>順位<rt>じゅんい</rt></ruby>にきそうな<ruby>言葉<rt>ことば</rt></ruby>を<ruby>答<rt>こた</rt></ruby>えましょう！</p>
      <div className="text-center font-bold my-4">〈 <ruby>例<rt>れい</rt></ruby> 〉</div>
      <div className="flex items-center justify-center gap-4">
        <RuleCard title="お題" content="たべもの" />
        <div className="text-2xl font-bold">&</div>
        <RuleCard title="順位" content="1番目" />
      </div>
      <div className="text-center text-4xl my-4">↓</div>
      <div className="text-center">
        <span className="text-2xl font-bold bg-amber-200 dark:bg-amber-800/50 px-3 py-1 rounded"><ruby>解答例<rt>かいとうれい</rt></ruby>: アイスクリーム</span>
      </div>
      <div className="mt-6 border-t border-stone-200 dark:border-stone-700 pt-4 text-sm text-stone-600 dark:text-stone-400">
        <p className="font-bold mb-2">
          <ruby>補足<rt>ほそく</rt></ruby>：<ruby>辞書<rt>じしょ</rt></ruby>の<ruby>順番<rt>じゅんばん</rt></ruby>について
        </p>
        <p>
          <ruby>判断<rt>はんだん</rt></ruby>が<ruby>難<rt>むずか</rt></ruby>しい<ruby>言葉<rt>ことば</rt></ruby>の<ruby>順番<rt>じゅんばん</rt></ruby>の<ruby>例<rt>れい</rt></ruby>です。
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
          <li>
            「<ruby>ビール<rt>びーる</rt></ruby>」と「<ruby>ビル<rt>びる</rt></ruby>」 → <span className="font-bold">「ビル」</span>が<ruby>先<rt>さき</rt></ruby>
          </li>
          <li>
            「<ruby>しゃけ<rt>しゃけ</rt></ruby>」と「<ruby>しらす<rt>しらす</rt></ruby>」 → <span className="font-bold">「しゃけ」</span>が<ruby>先<rt>さき</rt></ruby>
          </li>
          <li>
            「<ruby>きって<rt>きって</rt></ruby>」と「<ruby>きて<rt>きて</rt></ruby>」 → <span className="font-bold">「きて」</span>が<ruby>先<rt>さき</rt></ruby>（<ruby>小<rt>ちい</rt></ruby>さい「っ」は<ruby>後<rt>あと</rt></ruby>）
          </li>
          <li>
            「<ruby>バッグ<rt>ばっぐ</rt></ruby>」と「<ruby>パック<rt>ぱっく</rt></ruby>」 → <span className="font-bold">「バッグ」</span>が<ruby>先<rt>さき</rt></ruby>（<ruby>濁音<rt>だくおん</rt></ruby>→<ruby>半濁音<rt>はんだくおん</rt></ruby>の<ruby>順<rt>じゅん</rt></ruby>）
          </li>
        </ul>
      </div>
    </div>
  </>
);

const RandomRule = () => (
    <>
    <h3 id="rule-title" className="text-2xl font-bold mb-4">おまかせ ルール</h3>
    <div className="text-left space-y-4">
      <p>「ジャンル<ruby>縛<rt>しば</rt></ruby>り」「<ruby>文字<rt>もじ</rt></ruby><ruby>縛<rt>しば</rt></ruby>り」「<ruby>文字数<rt>もじすう</rt></ruby><ruby>縛<rt>しば</rt></ruby>り」「◯<ruby>番目<rt>ばんめ</rt></ruby>をねらえ！」の4<ruby>種類<rt>しゅるい</rt></ruby>のカードが<ruby>全部混<rt>ぜんぶま</rt></ruby>ざって、ランダムに<ruby>出題<rt>しゅつだい</rt></ruby>されるモードです。</p>
      <p className="text-center font-bold text-lg mt-6">
      <ruby>何<rt>なに</rt></ruby>が<ruby>出<rt>で</rt></ruby>るかはお<ruby>楽<rt>たの</rt></ruby>しみ！
      </p>
    </div>
  </>
);

export default RuleModal;