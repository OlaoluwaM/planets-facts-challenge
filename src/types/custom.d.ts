type BaseColors = 'black' | 'white' | 'lightGray' | 'darkGray';
type PlanetAccentColors =
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune';

type Shades = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type ThemeInterface = Record<BaseColors, string> & {
  planet: Partial<Record<PlanetAccentColors, Record<Shades, string>>>;
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
