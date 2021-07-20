import planetChoiceMachine from '../.machines/globalPlanetChoice.machine';

import { useMachine } from '@xstate/react';
import { PLANET_NAMES } from '../utils/constants';
import { createContext, useContext } from 'react';

import type { Planets } from '../types/custom';
import type { ReactElement } from 'react';

const PlanetContext = createContext<Planets>(PLANET_NAMES[0]);

export function usePlanet() {
  const [currentPlanet, setCurrentPlanet] = useContext(PlanetContext);
  if (!currentPlanet) {
    throw new Error(
      `Something weird happened in context currentPlanet value is ${currentPlanet}`
    );
  }

  return {
    currentPlanet,
    setCurrentPlanet,
    lowerCaseCurrentPlanet: currentPlanet.toLocaleLowerCase(),
  };
}

export function PlanetProvider({ children }: { children: ReactElement }): ReactElement {
  const [state, send] = useMachine(planetChoiceMachine);
  
  return <PlanetContext.Provider value={}>{children}</PlanetContext.Provider>;
}
