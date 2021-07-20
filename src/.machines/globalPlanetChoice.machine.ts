import { PLANET_NAMES } from '../utils/constants';
import { createMachine } from 'xstate';

import type { Planets } from '../types/custom';

type PlanetStateEvents<PTE extends Planets | 'none' = 'none'> = {
  [P in Uppercase<Exclude<Planets, PTE>>]: {
    target: Lowercase<Exclude<Planets, PTE>>;
  };
};

type PlanetMachineStates = {
  [P in Lowercase<Planets>]: {
    on: PlanetStateEvents<Capitalize<P>>;
  };
};

function createPlanetStateEvents<PlanetToExclude extends Planets>(
  planetToExclude: Extract<Planets, PlanetToExclude>
): PlanetStateEvents<PlanetToExclude> {
  type ModifiedPlanetsType = Exclude<Planets, PlanetToExclude>;

  const excludedPlanetsArr = PLANET_NAMES.filter(
    name => name.toLocaleLowerCase() !== planetToExclude.toLocaleLowerCase()
  ) as ModifiedPlanetsType[];

  return excludedPlanetsArr.reduce((eventsObj, planetName) => {
    type CurrentPlanets = keyof PlanetStateEvents<PlanetToExclude>;

    const eventName = planetName.toLocaleUpperCase() as CurrentPlanets;

    eventsObj[eventName] = {
      target: planetName.toLocaleLowerCase() as Lowercase<
        Exclude<Planets, PlanetToExclude>
      >,
    };

    return eventsObj;
  }, {} as PlanetStateEvents<PlanetToExclude>);
}

const machineStates = PLANET_NAMES.reduce((stateObj, planetName) => {
  stateObj[planetName.toLocaleLowerCase() as keyof PlanetMachineStates] = {
    on: createPlanetStateEvents(planetName) as Extract<
      PlanetStateEvents,
      typeof planetName
    >,
  };
  return stateObj;
}, {} as PlanetMachineStates);

type ConvertToTypeState<T extends string> = T extends Planets
  ? { value: Lowercase<T>; context: unknown }
  : never;

type CreateMachineEventsType<T extends string> = T extends Planets
  ? { type: Uppercase<T> }
  : never;

const planetChoiceMachine = createMachine<
  unknown,
  CreateMachineEventsType<Planets>,
  ConvertToTypeState<Planets>
>({
  initial: PLANET_NAMES[0].toLocaleLowerCase(),
  states: machineStates,
});

export default planetChoiceMachine;
