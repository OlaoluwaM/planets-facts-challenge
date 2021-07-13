import debounce from '../utils/helpers';

import { createModel } from 'xstate/lib/model';
import { Devices, Dimensions, DeviceDimensions } from '../types/custom.d';

import type { Sender } from 'xstate';

function determineDeviceType(): Devices {
  const { innerWidth } = window;
  const mobileWidth = parseInt(DeviceDimensions.Mobile);
  const tabletWidth = parseInt(DeviceDimensions.Tablet);

  if (innerWidth <= mobileWidth) {
    return 'Mobile';
  } else if (innerWidth <= tabletWidth) {
    return 'Tablet';
  } else {
    return 'Desktop';
  }
}

const DeviceTypeMachineModel = createModel({
  deviceType: determineDeviceType() as Devices | undefined,
  dimension: DeviceDimensions[determineDeviceType()] as Dimensions | undefined,
});

type DeviceTypeEvents =
  | { type: 'IS_MOBILE' }
  | { type: 'IS_TABLET' }
  | { type: 'IS_DESKTOP' };

function checkDeviceDimension(callback: Sender<DeviceTypeEvents>) {
  const bareResizeHandler = () => {
    switch (determineDeviceType()) {
      case 'Mobile':
        callback({ type: 'IS_MOBILE' });
        break;

      case 'Tablet':
        callback({ type: 'IS_TABLET' });
        break;

      case 'Desktop':
        callback({ type: 'IS_DESKTOP' });
        break;
    }
  };

  // Just in case 😉
  const debouncedHandler = debounce(bareResizeHandler, 10);
  window.addEventListener('resize', bareResizeHandler);

  return () => {
    window.removeEventListener('resize', debouncedHandler);
  };
}

const deviceTypeMachine = DeviceTypeMachineModel.createMachine(
  {
    context: DeviceTypeMachineModel.initialContext,
    initial: 'idle',
    invoke: {
      id: 'deviceDimensionService',
      src: 'checkDeviceDimension',
    },
    states: {
      idle: {
        on: {
          IS_MOBILE: { target: 'mobile' },
          IS_TABLET: { target: 'tablet' },
          IS_DESKTOP: { target: 'desktop' },
        },
      },

      mobile: {
        entry: DeviceTypeMachineModel.assign({
          deviceType: 'Mobile',
          dimension: DeviceDimensions.Mobile,
        }),

        on: {
          IS_TABLET: { target: 'tablet' },
          IS_DESKTOP: { target: 'desktop' },
        },
      },

      tablet: {
        entry: DeviceTypeMachineModel.assign({
          deviceType: 'Tablet',
          dimension: DeviceDimensions.Tablet,
        }),

        on: {
          IS_MOBILE: { target: 'mobile' },
          IS_DESKTOP: { target: 'desktop' },
        },
      },

      desktop: {
        entry: DeviceTypeMachineModel.assign({
          deviceType: 'Desktop',
          dimension: DeviceDimensions.Desktop,
        }),

        on: {
          IS_MOBILE: { target: 'mobile' },
          IS_TABLET: { target: 'tablet' },
        },
      },
    },
  },
  {
    services: {
      checkDeviceDimension: (context, event) => checkDeviceDimension,
    },
  }
);

export default deviceTypeMachine;
