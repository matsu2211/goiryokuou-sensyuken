
export interface CardData {
  type: 'text' | 'image' | 'color';
  content: string; 
  colorClass?: string;
  imageSeed?: number;
}

export interface ThemeCard extends CardData {
  type: 'text' | 'image';
  constraintType?: 'character' | 'character_count' | 'nth_letter';
}

export interface LetterCard extends CardData {
  type: 'text' | 'color'; // 'text' for hiragana
}

export interface GameSettings {
  themeType: 'genre' | 'character' | 'character_count' | 'nth_letter' | 'random';
  timerDuration: number; // in minutes
  customThemes?: string[];
}