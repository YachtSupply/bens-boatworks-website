import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand:   { DEFAULT: '#1b2d3a', light: '#2a4a5e', dark: '#0f1c26' },
        accent:  { DEFAULT: '#d4654a', dark: '#b8503a', light: '#e88a74' },
        sand:    { DEFAULT: '#f5f0eb', dark: '#e8dfd6' },
        ink:     { DEFAULT: '#1a1a1a', muted: '#7a7a7a', light: '#a3a3a3' },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
