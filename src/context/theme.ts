import type { ThemeInterface } from '../types/custom';

export const themeObj: ThemeInterface = {
  black: { DEFAULT: '#070724' },
  white: { DEFAULT: '#fff' },

  gray: {
    200: '#38384F',
    DEFAULT: '#979797',
    700: '#838391',
  },

  // These are accent colors
  planet: {
    mercury: {
      mobileNav: '#DEF4FC',
      DEFAULT: '#419ebb',
    },

    venus: {
      mobileNav: '#F6D1A4',
      DEFAULT: '#EDA249',
    },

    earth: {
      mobileNav: '#545BFE',
      DEFAULT: '#6f2ed6',
    },

    mars: {
      mobileNav: '#FF6A45',
      DEFAULT: '#D14C32',
    },

    jupiter: {
      mobileNav: '#ECAD7A',
      DEFAULT: '#ECAD7A',
    },

    saturn: {
      mobileNav: '#FCCB6B',
      DEFAULT: '#FCCB6B',
    },

    uranus: {
      mobileNav: '#65F0D5',
      DEFAULT: '#1ec2a4',
    },

    neptune: {
      mobileNav: '#497EFA',
      DEFAULT: '#2d68f0',
    },
  },
};
