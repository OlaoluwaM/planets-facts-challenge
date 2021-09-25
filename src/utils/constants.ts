export const PLANET_NAMES = [
  'Mercury',
  'Venus',
  'Earth',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
] as const;

export const STARTING_PLANET = PLANET_NAMES[0].toLocaleLowerCase() as Lowercase<
  typeof PLANET_NAMES[0]
>;

export const lowercasePlanetNamesPartialRegex = PLANET_NAMES.map(planet =>
  planet.toLocaleLowerCase()
).join('|');

export const infoPages = ['overview', 'structure', 'surface'] as const;

export const PLANET_STATE_SESSION_STORAGE_KEY = 'currentPlanetState';

export enum DeviceDimensions {
  Mobile = '400px',
  Tablet = '768px',
  Desktop = '1440px',
}

export const mediaQueries = {
  tablet: `@media only screen and (min-width: ${DeviceDimensions.Tablet}) `,
};
