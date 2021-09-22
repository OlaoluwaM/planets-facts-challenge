import { PLANET_NAMES } from '../utils/constants';

import type { MotionProps } from 'framer-motion';
import type { ElementType, ComponentPropsWithoutRef } from 'react';

type BaseColors = 'black' | 'white' | 'gray';
type PlanetAccentColors =
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune';

type Shades =
  | 100
  | 200
  | 300
  | 400
  | 500
  | 'DEFAULT'
  | 'mobileNav'
  | 600
  | 700
  | 800
  | 900;

// If these aren't being used you can delete them
type ShadesNumericKeys = Extract<Shades, number>;
type ShadesStringKeys = Extract<Shades, string>;

type ShadesWithoutMobileNavKey = Exclude<Shades, 'mobileNav'>;

export type ShadeInterface = Partial<Record<ShadesNumericKeys, string>>;

export type ThemeInterface = Record<
  BaseColors,
  Partial<Record<ShadesWithoutMobileNavKey, string>>
> & {
  planet: Partial<Record<PlanetAccentColors, Partial<Record<Shades, string>>>>;
};

export enum DeviceDimensions {
  Mobile = '400px',
  Tablet = '768px',
  Desktop = '1440px',
}

export enum DeviceTypes {
  '400px' = 'Mobile',
  '768px' = 'Tablet',
  '1440px' = 'Desktop',
}

export type Devices = keyof typeof DeviceDimensions;
export type Dimensions = keyof typeof DeviceTypes;
export type Planets = typeof PLANET_NAMES[number];

export type MotionComponentProps<Element extends ElementType<any> = 'div'> = Omit<
  ComponentPropsWithoutRef<Element>,
  keyof MotionProps
>;
