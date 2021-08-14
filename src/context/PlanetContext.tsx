import planetChoiceMachine from '../.machines/globalPlanetChoice.machine';

import { useMachine } from '@xstate/react';
import { createContext, useContext, useMemo } from 'react';

import type { ReactElement } from 'react';
import type { StateFrom, EventFrom, EventData } from 'xstate';
import { count } from 'console';

interface ContextInterface {
  state: StateFrom<typeof planetChoiceMachine>;
  sendEvent: (event: EventFrom<typeof planetChoiceMachine>, payload?: EventData) => void;
}

const PlanetContext = createContext<ContextInterface | undefined>(undefined);
PlanetContext.displayName = 'PlanetContext';

export function usePlanet(): ContextInterface {
  const contextInterfaceObject = useContext(PlanetContext);

  if (!contextInterfaceObject) {
    throw new Error(
      `Something weird happened in context value is ${contextInterfaceObject}`
    );
  }

  return contextInterfaceObject;
}

export function PlanetProvider({
  children,
}: {
  children: ReactElement[] | ReactElement;
}): ReactElement {
  const [state, send] = useMachine(planetChoiceMachine);

  const memoizedContextValue = useMemo<ContextInterface>(
    () => ({
      state,
      sendEvent: send,
    }),
    [state]
  );

  return (
    <PlanetContext.Provider value={memoizedContextValue}>
      {children}
    </PlanetContext.Provider>
  );
}
