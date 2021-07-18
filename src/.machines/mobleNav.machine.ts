import { createModel } from 'xstate/lib/model';
import { PLANET_NAMES } from '../utils/constants';

import type { Planets } from '../types/custom';

const machineModel = createModel(
  {
    planetChoice: PLANET_NAMES[0] as Planets,
  },
  {
    events: {
      SET_ACTIVE_PLANET: (planetName: Planets) => ({ planetName }),
      SET_ACTIVE_PLANET_AND_CLOSE_MENU: (planetName: Planets) => ({ planetName }),
      IDLE: () => ({}),
      OPEN_MENU: () => ({}),
      CLOSE_MENU: () => ({}),
    },
  }
);

function setActivePlanet() {
  return machineModel.assign(
    {
      planetChoice: (_, event) => event.planetName,
    },
    'SET_ACTIVE_PLANET'
  );
}

const mobileNavToggleMachine = machineModel.createMachine(
  {
    context: machineModel.initialContext,
    initial: 'inactive',
    states: {
      inactive: {
        on: {
          OPEN_MENU: { target: 'openMenu' },
        },
      },

      openMenu: {
        on: {
          SET_ACTIVE_PLANET: { actions: 'setActivePlanet' },
          CLOSE_MENU: { target: 'inactive' },
          SET_ACTIVE_PLANET_AND_CLOSE_MENU: {target: 'inactive', actions: 'setActivePlanet'}
        },
      },
    },
  },
  {
    actions: {
      // TODO: Remove as `any` and open up issue in xstate repo
      setActivePlanet: setActivePlanet() as any,
    },
  }
);

export default mobileNavToggleMachine;
