import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'pink-1': '#CB00FA',
        'pink-2': '#d754fb',
        'pink-3': '#B300EA',
        'yellow-1': '#FFE43C',
        'yellow-2': '#fff29c',
        'gray-1': '#f8f8ff',
      },
    },

    container: {
      center: true,
      padding: '16px',
    },
  },
  plugins: [],
};
export default config;
