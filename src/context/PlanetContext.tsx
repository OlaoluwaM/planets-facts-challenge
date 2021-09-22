import planetChoiceMachine from '../.machines/globalPlanetChoice.machine';

import { useMachine } from '@xstate/react';
import { PLANET_STATE_SESSION_STORAGE_KEY } from './build/utils/constants';
import { createContext, useContext, useEffect, useMemo } from 'react';

import type { ReactElement } from 'react';
import type { StateFrom, EventFrom, EventData } from 'xstate';

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
  const [state, send, service] = useMachine(planetChoiceMachine);

  useEffect(() => {
    const subscription = service.subscribe(state => {
      if (!state.changed) return;
      sessionStorage.setItem(PLANET_STATE_SESSION_STORAGE_KEY, state.value as string);
    });

    return subscription.unsubscribe;
  }, []);

  const memoizedContextValue = useMemo<ContextInterface>(
    () => ({
      state,
      sendEvent: send,
    }),
    [state.value]
  );

  return (
    <PlanetContext.Provider value={memoizedContextValue}>
      {children}
    </PlanetContext.Provider>
  );
}
