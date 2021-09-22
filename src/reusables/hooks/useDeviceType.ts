import deviceTypeMachine from '../../.machines/deviceType.machine';

import { useMachine } from '@xstate/react';

export default function useDeviceType(): typeof deviceTypeMachine.context {
  const [machineState] = useMachine(() => deviceTypeMachine);
  const { deviceType, dimension } = machineState.context;
  console.log(deviceType, machineState);

  return { deviceType, dimension };
}
