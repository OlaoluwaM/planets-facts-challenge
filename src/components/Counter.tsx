import PropTypes from 'prop-types';

import { animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

import type { Easing } from 'framer-motion/types/types';
import type { ReactElement, RefObject } from 'react';

interface CounterProps {
  from: number;
  to: number;
  duration: number;
  ease: Easing;
  suffix: string;
}

export default function Counter(props: CounterProps): ReactElement {
  const { from, to, duration = 2, ease = 'easeOut', suffix = '', ...rest } = props;

  const nodeRef = useRef<HTMLParagraphElement | null>(
    null
  ) as RefObject<HTMLParagraphElement>;

  useEffect(() => {
    if (!nodeRef?.current) return;
    const node = nodeRef.current;

    const controls = animate(from, to, {
      type: 'tween',
      duration,
      ease,
      onUpdate(value) {
        node.textContent = `${value.toFixed(0)} ${suffix}`;
      },
    });

    return () => controls.stop();
  }, [from, to, duration, ease, suffix]);

  return <p ref={nodeRef} {...rest} />;
}

Counter.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  duration: PropTypes.number,
  ease: PropTypes.string,
  suffix: PropTypes.string,
};
