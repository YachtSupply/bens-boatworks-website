import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy:    { DEFAULT: '#0c1b2a', light: '#1a3a5c', 800: '#112240' },
        gold:    { DEFAULT: '#c9a96e', dark: '#b08d4f', light: '#d4bc8a' },
        surface: { DEFAULT: '#f7f5f2', alt: '#eae6e1' },
        txt:     { DEFAULT: '#1a1a1a', muted: '#6b7280' },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        full: '9999px',
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
