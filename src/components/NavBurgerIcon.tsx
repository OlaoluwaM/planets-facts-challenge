import { m as motion, MotionProps } from 'framer-motion';
import { ReactComponent as NavBurger } from '../assets/icon-hamburger.svg';

import type { CSSProperties, ReactElement, ComponentPropsWithoutRef } from 'react';

type TypeSynthesis = Omit<ComponentPropsWithoutRef<'div'>, keyof MotionProps>;

interface IconBurgerProps extends TypeSynthesis, MotionProps {
  style?: CSSProperties;
}

export default function IconBurger(props: IconBurgerProps): ReactElement {
  return (
    <motion.div {...props}>
      <NavBurger className='fill-current' />
    </motion.div>
  );
}
