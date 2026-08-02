export interface ThemeColor {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  hoverHex: string;
}

export const THEME_COLORS: ThemeColor[] = [
  {
    id: 'emerald',
    name: 'Emerald Mint',
    hex: '#34d399',
    rgb: '52, 211, 153',
    hoverHex: '#10b981',
  },
  {
    id: 'cyan',
    name: 'Cyber Cyan',
    hex: '#38bdf8',
    rgb: '56, 189, 248',
    hoverHex: '#0284c7',
  },
  {
    id: 'violet',
    name: 'Electric Violet',
    hex: '#c084fc',
    rgb: '192, 132, 252',
    hoverHex: '#9333ea',
  },
  {
    id: 'amber',
    name: 'Sunset Amber',
    hex: '#fbbf24',
    rgb: '251, 191, 36',
    hoverHex: '#d97706',
  },
  {
    id: 'rose',
    name: 'Neon Rose',
    hex: '#fb7185',
    rgb: '251, 113, 133',
    hoverHex: '#e11d48',
  },
  {
    id: 'orange',
    name: 'Vibrant Orange',
    hex: '#ff7043',
    rgb: '255, 112, 67',
    hoverHex: '#ea580c',
  },
];

export const DEFAULT_THEME = THEME_COLORS[0];

export function applyTheme(theme: ThemeColor) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--accent-color', theme.hex);
  root.style.setProperty('--accent-rgb', theme.rgb);
  root.style.setProperty('--accent-hover', theme.hoverHex);
}
