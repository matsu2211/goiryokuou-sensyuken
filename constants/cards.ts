import { ThemeCard, LetterCard } from '../types';

export const TEXT_THEMES: ThemeCard[] = [
  { type: 'text', content: '家の中にあるもの' },
  { type: 'text', content: '電気を使うもの' },
  { type: 'text', content: 'ごはん・おかず' },
  { type: 'text', content: 'おかし・スイーツ' },
  { type: 'text', content: 'のみもの' },
  { type: 'text', content: '食べもの（素材）' },
  { type: 'text', content: '手に持てるもの' },
  { type: 'text', content: '音が出るもの' },
  { type: 'text', content: '動物（生き物なんでも）' },
  { type: 'text', content: '植物' },
  { type: 'text', content: '国の名前' },
  { type: 'text', content: 'スポーツ' },
  { type: 'text', content: 'のりもの' },
  { type: 'text', content: '色指定' },
  { type: 'text', content: 'キャラクター（漫画やアニメなどの登場人物）' },
  { type: 'text', content: '季節に関係するもの' },
];

const HIRAGANA_CHARS_FOR_CONSTRAINT = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわ'.split('');
export const HIRAGANA_FOR_CONSTRAINT: string[] = HIRAGANA_CHARS_FOR_CONSTRAINT;

export const CHARACTER_THEMES: ThemeCard[] = Array(5).fill({
  type: 'text',
  content: '文字縛り',
  constraintType: 'character'
});

export const CHARACTER_COUNT_THEMES: ThemeCard[] = Array(5).fill({
  type: 'text',
  content: '文字数縛り',
  constraintType: 'character_count'
});

export const NTH_LETTER_THEMES: ThemeCard[] = Array(5).fill({
  type: 'text',
  content: '◯番目をねらえ！',
  constraintType: 'nth_letter'
});

export const HIRAGANA_LETTERS: LetterCard[] = HIRAGANA_CHARS_FOR_CONSTRAINT.map(char => ({
  type: 'text',
  content: char
}));