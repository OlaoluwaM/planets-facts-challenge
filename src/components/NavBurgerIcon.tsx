import Color from 'color';
import styled from 'styled-components';

import { m as motion, MotionProps } from 'framer-motion';
import { ReactComponent as NavBurger } from '../assets/icon-hamburger.svg';

import type { MotionComponentProps } from 'types/custom';
import type { CSSProperties, ReactElement } from 'react';

interface IconBurgerProps extends MotionComponentProps, MotionProps {
  style?: CSSProperties;
  menuOpen: boolean;
}

const BurgerIconWrapper = styled(motion.div)<{ menuOpen: boolean }>`
  svg {
    fill: ${({ menuOpen, theme }) =>
      menuOpen
        ? Color(theme.gray.DEFAULT).hsl().alpha(0.3).toString()
        : theme.white.DEFAULT};
    transition: stroke 0.3s ease;
    transition: inherit;
  }
`;

export default function IconBurger(props: IconBurgerProps): ReactElement {
  return (
    <BurgerIconWrapper {...props}>
      <NavBurger className='fill-current' />
    </BurgerIconWrapper>
  );
}
