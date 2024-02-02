import type { Config } from 'tailwindcss';

import {
  colorsTailwind,
  fontsTailwind,
  backgroundImageExtensionTailwind,
  spacingTailwind,
  zIndexTailwind,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    zIndex: zIndexTailwind,
    extend: {
      backgroundImage: backgroundImageExtensionTailwind,
      fontFamily: fontsTailwind,
      colors: colorsTailwind,
      spacing: spacingTailwind,
    },
  },
  plugins: [],
};
export default config;
