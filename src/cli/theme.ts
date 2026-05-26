import gradient from 'gradient-string';

export interface ThemeColors {
  accent: string;
  border: string;
  text: string;
  muted: string;
  info: string;
  warn: string;
  error: string;
  long: string;
  short: string;
  neutral: string;
}

export interface CliTheme {
  name: string;
  label: string;
  brandColors: string[];
  colors: ThemeColors;
}

const THEMES = {
  violet: {
    name: 'violet',
    label: 'Violet',
    brandColors: ['#4f46e5', '#7c3aed', '#9333ea', '#db2777'],
    colors: {
      accent: '#9333ea',
      border: '#a855f7',
      text: '#f5f3ff',
      muted: 'gray',
      info: 'cyan',
      warn: 'yellow',
      error: 'red',
      long: 'green',
      short: 'red',
      neutral: 'gray',
    },
  },
  ocean: {
    name: 'ocean',
    label: 'Ocean',
    brandColors: ['#0891b2', '#0ea5e9', '#22c55e'],
    colors: {
      accent: '#0ea5e9',
      border: '#06b6d4',
      text: '#e0f2fe',
      muted: '#94a3b8',
      info: '#22d3ee',
      warn: '#facc15',
      error: '#fb7185',
      long: '#22c55e',
      short: '#fb7185',
      neutral: '#94a3b8',
    },
  },
  ember: {
    name: 'ember',
    label: 'Ember',
    brandColors: ['#dc2626', '#f97316', '#facc15'],
    colors: {
      accent: '#f97316',
      border: '#fb923c',
      text: '#fff7ed',
      muted: '#a1a1aa',
      info: '#facc15',
      warn: '#fde047',
      error: '#ef4444',
      long: '#84cc16',
      short: '#ef4444',
      neutral: '#a1a1aa',
    },
  },
  forest: {
    name: 'forest',
    label: 'Forest',
    brandColors: ['#16a34a', '#14b8a6', '#84cc16'],
    colors: {
      accent: '#22c55e',
      border: '#10b981',
      text: '#ecfdf5',
      muted: '#9ca3af',
      info: '#2dd4bf',
      warn: '#fbbf24',
      error: '#f87171',
      long: '#86efac',
      short: '#f87171',
      neutral: '#9ca3af',
    },
  },
  mono: {
    name: 'mono',
    label: 'Mono',
    brandColors: ['#e5e7eb', '#9ca3af', '#f9fafb'],
    colors: {
      accent: '#e5e7eb',
      border: '#9ca3af',
      text: '#f9fafb',
      muted: '#9ca3af',
      info: '#d1d5db',
      warn: '#facc15',
      error: '#f87171',
      long: '#86efac',
      short: '#f87171',
      neutral: '#9ca3af',
    },
  },
  midnight: {
    name: 'midnight',
    label: 'Midnight',
    brandColors: ['#1e1b4b', '#312e81', '#4338ca', '#6366f1'],
    colors: {
      accent: '#818cf8',
      border: '#4f46e5',
      text: '#e0e7ff',
      muted: '#6b7280',
      info: '#67e8f9',
      warn: '#fbbf24',
      error: '#f87171',
      long: '#34d399',
      short: '#fb7185',
      neutral: '#6b7280',
    },
  },
  sunset: {
    name: 'sunset',
    label: 'Sunset',
    brandColors: ['#f43f5e', '#fb923c', '#fbbf24', '#f97316'],
    colors: {
      accent: '#fb923c',
      border: '#f87171',
      text: '#fff1f2',
      muted: '#a1a1aa',
      info: '#fbbf24',
      warn: '#fde047',
      error: '#e11d48',
      long: '#4ade80',
      short: '#e11d48',
      neutral: '#a1a1aa',
    },
  },
  lime: {
    name: 'lime',
    label: 'Lime',
    brandColors: ['#65a30d', '#84cc16', '#a3e635', '#bef264'],
    colors: {
      accent: '#a3e635',
      border: '#84cc16',
      text: '#f7fee7',
      muted: '#9ca3af',
      info: '#22d3ee',
      warn: '#facc15',
      error: '#fb7185',
      long: '#86efac',
      short: '#fb7185',
      neutral: '#9ca3af',
    },
  },
  cyberpunk: {
    name: 'cyberpunk',
    label: 'Cyberpunk',
    brandColors: ['#ff006e', '#00f5d4', '#8338ec', '#ffbe0b'],
    colors: {
      accent: '#ff006e',
      border: '#00f5d4',
      text: '#e0e7ff',
      muted: '#8b8b8b',
      info: '#00f5d4',
      warn: '#ffbe0b',
      error: '#ff006e',
      long: '#00f5d4',
      short: '#ff006e',
      neutral: '#8b8b8b',
    },
  },
  nord: {
    name: 'nord',
    label: 'Nord',
    brandColors: ['#5e81ac', '#81a1c1', '#88c0d0', '#8fbcbb'],
    colors: {
      accent: '#88c0d0',
      border: '#5e81ac',
      text: '#eceff4',
      muted: '#616e88',
      info: '#81a1c1',
      warn: '#ebcb8b',
      error: '#bf616a',
      long: '#a3be8c',
      short: '#bf616a',
      neutral: '#616e88',
    },
  },
  royal: {
    name: 'royal',
    label: 'Royal',
    brandColors: ['#7c3aed', '#f59e0b', '#d97706', '#a855f7'],
    colors: {
      accent: '#f59e0b',
      border: '#a855f7',
      text: '#faf5ff',
      muted: '#78716c',
      info: '#a78bfa',
      warn: '#fbbf24',
      error: '#ef4444',
      long: '#34d399',
      short: '#ef4444',
      neutral: '#78716c',
    },
  },
  candy: {
    name: 'candy',
    label: 'Candy',
    brandColors: ['#ec4899', '#f472b6', '#fbcfe8', '#fce7f3'],
    colors: {
      accent: '#ec4899',
      border: '#f472b6',
      text: '#fce7f3',
      muted: '#a1a1aa',
      info: '#f0abfc',
      warn: '#fde047',
      error: '#e11d48',
      long: '#86efac',
      short: '#e11d48',
      neutral: '#a1a1aa',
    },
  },
  dracula: {
    name: 'dracula',
    label: 'Dracula',
    brandColors: ['#bd93f9', '#ff79c6', '#50fa7b', '#f1fa8c'],
    colors: {
      accent: '#bd93f9',
      border: '#6272a4',
      text: '#f8f8f2',
      muted: '#6272a4',
      info: '#8be9fd',
      warn: '#f1fa8c',
      error: '#ff5555',
      long: '#50fa7b',
      short: '#ff5555',
      neutral: '#6272a4',
    },
  },
  sakura: {
    name: 'sakura',
    label: 'Sakura',
    brandColors: ['#fda4af', '#fb7185', '#f43f5e', '#e11d48'],
    colors: {
      accent: '#fb7185',
      border: '#fda4af',
      text: '#fff1f2',
      muted: '#9ca3af',
      info: '#f0abfc',
      warn: '#fde68a',
      error: '#e11d48',
      long: '#86efac',
      short: '#e11d48',
      neutral: '#9ca3af',
    },
  },
  matrix: {
    name: 'matrix',
    label: 'Matrix',
    brandColors: ['#00ff41', '#00cc33', '#009900', '#003300'],
    colors: {
      accent: '#00ff41',
      border: '#00cc33',
      text: '#e0ffe0',
      muted: '#006600',
      info: '#00ff41',
      warn: '#ffff00',
      error: '#ff3333',
      long: '#00ff41',
      short: '#ff3333',
      neutral: '#006600',
    },
  },
} satisfies Record<string, CliTheme>;

export type ThemeName = keyof typeof THEMES;

export const DEFAULT_THEME = THEMES.violet;

export const COLORS = DEFAULT_THEME.colors;

export const brandGradient = gradient(DEFAULT_THEME.brandColors);

export const themeNames = (): ThemeName[] => Object.keys(THEMES) as ThemeName[];

export function getTheme(name?: string): CliTheme {
  const normalized = (name ?? DEFAULT_THEME.name).toLowerCase();
  return THEMES[normalized as ThemeName] ?? DEFAULT_THEME;
}

export function themeGradient(theme: CliTheme = DEFAULT_THEME): (text: string) => string {
  return gradient(theme.brandColors);
}

/** Colour for a directional bias. */
export const directionColor = (direction: string, theme: CliTheme = DEFAULT_THEME): string =>
  direction === 'long' ? theme.colors.long : direction === 'short' ? theme.colors.short : theme.colors.neutral;
