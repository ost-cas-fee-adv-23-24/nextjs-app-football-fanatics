import type { Config } from 'tailwindcss';
import {
  backgroundImageExtensionTailwind,
  colorsTailwind,
  fontsTailwind,
  spacingTailwind,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: spacingTailwind,
      fontFamily: fontsTailwind,
      colors: colorsTailwind,
    },
  },
  plugins: [],
};
export default config;
