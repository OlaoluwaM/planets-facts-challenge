import styled from 'styled-components';

import { m as motion, MotionProps } from 'framer-motion';
import { ReactComponent as NavRightChevron } from '../assets/icon-chevron.svg';

import type { CSSProperties, ReactElement, ComponentPropsWithoutRef } from 'react';

type TypeSynthesis = Omit<ComponentPropsWithoutRef<'div'>, keyof MotionProps>;

interface IconBurgerProps extends TypeSynthesis, MotionProps {
  style?: CSSProperties;
}

const ChevronIconWrapper = styled(motion.div)``;

export default function NavChevron(props: IconBurgerProps): ReactElement {
  return (
    <ChevronIconWrapper {...props}>
      <NavRightChevron className='fill-current' />
    </ChevronIconWrapper>
  );
}
