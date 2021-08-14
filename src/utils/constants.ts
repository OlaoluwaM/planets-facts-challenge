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
