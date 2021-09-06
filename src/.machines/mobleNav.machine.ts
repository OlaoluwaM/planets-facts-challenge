import { createMachine } from 'xstate';

type MachineEvents = { type: 'OPEN_MENU' } | { type: 'CLOSE_MENU' };
type MachineTypeStates =
  | { value: 'closed'; context: null }
  | { value: 'open'; context: null };

const mobileNavToggleMachine = createMachine<null, MachineEvents, MachineTypeStates>({
  initial: 'closed',
  states: {
    closed: {
      on: {
        OPEN_MENU: { target: 'open' },
      },
    },

    open: {
      on: {
        CLOSE_MENU: { target: 'closed' },
      },
    },
  },
});

export default mobileNavToggleMachine;
