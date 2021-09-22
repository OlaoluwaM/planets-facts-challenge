import { createMachine, assign } from 'xstate';

interface MachineContextInterface {
  data?: unknown;
  error?: null | Error | string;
}

type MachineEventNames = 'START_PROCESS' | 'DONE' | 'RETRY' | 'FAILURE';

type MachineEvents<EN> = EN extends MachineEventNames
  ? EN extends 'FAILURE'
    ? {
        type: 'FAILURE';
        data: null;
        error: NonNullable<MachineContextInterface['error']>;
      }
    : { type: EN; data?: unknown; error?: null }
  : never;

type MachineTypeStates =
  | {
      value: 'idle';
      context: Record<keyof MachineContextInterface, undefined>;
    }
  | {
      value: 'loading';
      context: Record<keyof MachineContextInterface, undefined>;
    }
  | {
      value: 'success';
      context: { data: unknown; error: null };
    }
  | {
      value: 'failure';
      context: { data: null; error: NonNullable<MachineContextInterface['error']> };
    };

const genericAsyncProcessMachine = createMachine<
  MachineContextInterface,
  MachineEvents<MachineEventNames>,
  MachineTypeStates
>(
  {
    context: {
      data: undefined,
      error: null,
    },
    initial: 'idle',

    states: {
      idle: {
        on: {
          START_PROCESS: { target: 'loading' },
        },
      },

      loading: {
        on: {
          DONE: {
            target: 'success',
            actions: [
              assign({
                data: (_, event) => event?.data,
                error: _ => null,
              }),
              'onComplete',
            ],
          },

          FAILURE: {
            target: 'failure',
            actions: [
              assign({
                data: _ => null,
                error: (_, event) => event?.error,
              }),
              'onError',
            ],
          },
        },
      },

      success: {
        type: 'final',
      },

      failure: {
        on: {
          RETRY: { target: 'loading' },
        },
      },
    },
  },
  {
    actions: {
      onComplete: () => {},
      onError: () => {},
    },
  }
);

export default genericAsyncProcessMachine;
