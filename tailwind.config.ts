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
      spacing: spacingTailwind,
      fontFamily: fontsTailwind,
      colors: colorsTailwind,
      backgroundImage: backgroundImageExtensionTailwind,
    },
  },
  plugins: [],
};
export default config;
