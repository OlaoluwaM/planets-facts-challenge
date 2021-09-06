import PropTypes from 'prop-types';

import { animate } from 'framer-motion';
import { useRef, useEffect, PropsWithChildren, ComponentPropsWithoutRef } from 'react';

import type { Easing } from 'framer-motion/types/types';
import type { ReactElement, RefObject } from 'react';

interface CounterProps extends ComponentPropsWithoutRef<'span'> {
  from: number;
  to: number;
  duration?: number;
  decimalPlace?: number;
  ease?: Easing;
  suffix?: string;
}

export default function Counter(props: CounterProps): ReactElement {
  const {
    from,
    to,
    duration = 2,
    ease = 'easeOut',
    suffix = '',
    decimalPlace = 0,
    ...rest
  } = props;

  const nodeRef = useRef<HTMLSpanElement | null>(null) as RefObject<HTMLParagraphElement>;

  useEffect(() => {
    if (!nodeRef?.current) return;
    const node = nodeRef.current;

    const controls = animate(from, to, {
      type: 'tween',
      duration,
      ease,
      onUpdate(value) {
        node.textContent = `${value.toFixed(decimalPlace)} ${suffix}`;
      },
    });

    return () => controls.stop();
  }, [from, to, duration, ease, suffix, decimalPlace]);

  return <span ref={nodeRef} {...rest} />;
}

Counter.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  duration: PropTypes.number,
  ease: PropTypes.string,
  suffix: PropTypes.string,
  decimalPlace: PropTypes.number,
};
