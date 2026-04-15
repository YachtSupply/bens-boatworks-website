import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy:         'rgb(var(--color-primary-rgb) / <alpha-value>)',
        'navy-light': 'rgb(var(--color-primary-light-rgb) / <alpha-value>)',
        blue:         'rgb(var(--color-primary-light-rgb) / <alpha-value>)',
        gold:         'rgb(var(--color-accent-rgb) / <alpha-value>)',
        'gold-dark':  'rgb(var(--color-accent-dark-rgb) / <alpha-value>)',
        'gold-light': 'rgb(var(--color-accent-light-rgb) / <alpha-value>)',
        cream:        'rgb(var(--color-bg-rgb) / <alpha-value>)',
        'cream-dark': 'rgb(var(--color-bg-dark-rgb) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['var(--font-heading)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
};

export default config;
