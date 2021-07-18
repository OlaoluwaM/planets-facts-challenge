import Color from 'color';
import styled from 'styled-components';
import NavChevron from './NavRightChevron';

import { PLANET_NAMES } from '../utils/constants';
import { m as motion, Variants } from 'framer-motion';

import type { Planets } from '../types/custom';
import type { ReactElement } from 'react';

const navMenuVariants: Variants = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },

  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const navMenuListItemTextVariants: Variants = {
  visible: {
    y: 0,
    opacity: 1,
  },

  hidden: {
    y: 40,
    opacity: 0,
  },
};

const NavMenu = styled(motion.ul).attrs({
  variants: navMenuVariants,
  animate: 'visible',
  initial: 'hidden',
  exit: 'hidden',
  className: 'absolute w-full',
})`
  top: 103%;
  background: ${({ theme }) => theme.black['DEFAULT']};
`;

const NavMenuItem = styled(motion.li).attrs({
  className: 'flex uppercase items-center py-4 mb-4 relative',
})`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  border-bottom: ${({ theme }) =>
    `.5px solid ${Color(theme.gray.DEFAULT).hsl().alpha(0.2)}`};

  :first-of-type {
    margin-top: 2rem;
  }

  :last-of-type {
    margin-bottom: 1rem;
    border-bottom: none;
  }
  overflow: hidden;

  p {
    font-family: var(--secondaryFont);
    font-weight: bold;
    letter-spacing: 1.35px;
    font-size: 0.938rem;
    line-height: 100%;
  }

  & > svg {
    stroke: ${({ theme }) => theme.black['DEFAULT']};
  }

  div {
    position: absolute;
    right: 0;

    svg {
      fill: ${({ theme }) => Color(theme.gray.DEFAULT).hsl().alpha(0.3).toString()};
    }
  }
`;

interface MobileNavProps {
  setPlanet: (planetName: Planets) => void;
}

export default function MobileNavMenu({ setPlanet }: MobileNavProps): ReactElement {
  return (
    <NavMenu>
      {PLANET_NAMES.map(planet => (
        <NavMenuItem onClick={() => setPlanet(planet)} key={planet}>
          <motion.svg
            variants={navMenuListItemTextVariants}
            className={`mr-10 fill-current text-${planet.toLocaleLowerCase()}-mobileNav`}
            width='20'
            height='20'
            viewBox='0 0 20 20'>
            <motion.circle cx='50%' cy='50%' r='10'></motion.circle>
          </motion.svg>
          <motion.p whileTap={{ opacity: 0.2 }} variants={navMenuListItemTextVariants}>
            {planet}
          </motion.p>
          <NavChevron variants={navMenuListItemTextVariants} className='mr-3' />
        </NavMenuItem>
      ))}
    </NavMenu>
  );
}
