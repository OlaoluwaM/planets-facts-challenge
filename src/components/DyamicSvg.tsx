import genericAsyncProcessMachine from '../.machines/genericAsyncProcess.machine';

import { useMachine } from '@xstate/react';
import { m as motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import type { MotionProps } from 'framer-motion';
import type { MotionComponentProps } from 'types/custom';
import type { FC, SVGProps, ReactElement } from 'react';

interface DynamicSvgComponentProps extends MotionComponentProps, MotionProps {
  name: string;
}

export default function DynamicSVGComponent({
  name,
  ...rest
}: DynamicSvgComponentProps): ReactElement | null {
  type RefProps = FC<SVGProps<SVGSVGElement>>;
  const ImportedIconRef = useRef<RefProps | null>(null);

  const { className = '', ...restOfRest } = rest;

  const [_, sendEvent] = useMachine(genericAsyncProcessMachine, {
    actions: {
      onCompleted: () => console.log('Success!'),
      onError: (_, event) => console.log('Error', event.error),
    },
  });

  useEffect(() => {
    sendEvent({ type: 'START_PROCESS' });

    (async function (): Promise<void> {
      try {
        ImportedIconRef.current = (
          await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!assets/${name}.svg`)
        ).default;

        sendEvent({ type: 'DONE', data: null });
      } catch (err) {
        sendEvent({ type: 'FAILURE', error: err as Error, data: null });
      }
    })();
  }, [name]);

  const SvgIcon = ImportedIconRef.current;

  return (
    <motion.div className={'planet-svg-wrapper '.concat(className)} {...restOfRest}>
      {SvgIcon ? <SvgIcon /> : <svg></svg>}
    </motion.div>
  );
}
