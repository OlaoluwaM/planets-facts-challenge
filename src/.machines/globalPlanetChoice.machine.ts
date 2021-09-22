import planetData from '../assets/data.json';

import { AssignAction, createMachine, assign } from 'xstate';
import {
  PLANET_NAMES,
  STARTING_PLANET,
  PLANET_STATE_SESSION_STORAGE_KEY,
} from '../utils/constants';

import type { Planets } from '../types/custom';

type PlanetStateEvents<PTE extends Planets | 'none' = 'none'> = {
  [P in Uppercase<Exclude<Planets, PTE>>]: {
    target: Lowercase<Exclude<Planets, PTE>>;
  };
};

type PlanetMachineStates = {
  [P in Lowercase<Planets>]: {
    entry: AssignAction<MachineContext, CreateMachineEventsType<Planets>>;
    on: PlanetStateEvents<Capitalize<P>> & { always: { target: string } };
  };
};

type MachineContext = {
  planetFacts: typeof planetData[number];
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
  const stateName = planetName.toLocaleLowerCase() as keyof PlanetMachineStates;
  stateObj[stateName] = {
    entry: assign<MachineContext, CreateMachineEventsType<Planets>>({
      planetFacts: () => {
        return planetData.find(({ name }) => name === planetName) ?? planetData[0];
      },
    }),

    on: createPlanetStateEvents(planetName) as Extract<
      PlanetStateEvents,
      typeof planetName
    >,
  };

  return stateObj;
}, {} as PlanetMachineStates);

function getInitialStateFromSessionStorage(): string | null {
  return sessionStorage.getItem(PLANET_STATE_SESSION_STORAGE_KEY);
}

type ConvertToTypeState<T extends string> = T extends Planets
  ? { value: Lowercase<T>; context: MachineContext }
  : never;

type CreateMachineEventsType<T extends string> = T extends Planets
  ? { type: Uppercase<T> }
  : never;

const planetChoiceMachine = createMachine<
  MachineContext,
  CreateMachineEventsType<Planets>,
  ConvertToTypeState<Planets>
>({
  context: {
    planetFacts: planetData[0],
  },
  initial: getInitialStateFromSessionStorage() ?? STARTING_PLANET,

  states: machineStates,
});

export default planetChoiceMachine;
