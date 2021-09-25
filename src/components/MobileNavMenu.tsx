import Color from 'color';
import styled from 'styled-components';
import NavChevron from './NavRightChevron';

import { m as motion } from 'framer-motion';
import { PLANET_NAMES } from '../utils/constants';
import { Link, useLocation } from 'react-router-dom';
import { getLastPathSegment } from '../utils/helpers';
import { generalWrapperVariants } from '../reusables/others/variants';

import type { Planets } from '../types/custom';
import type { Variants } from 'framer-motion';
import type { ReactElement } from 'react';

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

const navMenuVariants: Variants = {
  visible: {
    ...generalWrapperVariants.visible,
    transition: {
      when: 'beforeChildren',
    },
  },

  hidden: {
    ...generalWrapperVariants.hidden,
    transition: {
      when: 'afterChildren',
    },
  },
};

const NavMenu = styled(motion.ul).attrs({
  variants: navMenuVariants,
  animate: 'visible',
  initial: 'hidden',
  exit: 'hidden',
  className: 'absolute w-full flex flex-col items-center',
})`
  top: 110%;
  background: ${({ theme }) => theme.black['DEFAULT']};
  z-index: 1;
  left: 0;
`;

const NavMenuItem = styled(motion.li).attrs({
  className: 'py-4 mb-4 relative generic-border-bottom flex-grow',
})`
  width: 90%;
  margin-right: auto;
  margin-left: auto;

  :first-of-type {
    margin-top: 1rem;
  }

  :last-of-type {
    margin-bottom: 2rem;
    border-bottom: none;
  }
  overflow: hidden;

  a {
    display: flex;
    width: 100%;
    height: 100%;
    text-transform: uppercase;
    align-items: center;

    & > svg {
      stroke: ${({ theme }) => theme.black['DEFAULT']};
    }
  }

  div {
    position: absolute;
    right: 0;

    svg {
      fill: ${({ theme }) => Color(theme.gray.DEFAULT).hsl().alpha(0.3).toString()};
    }
  }
`;

interface MobileNavMenuProps {
  setPlanet: (planetName: Planets) => void;
}

export default function MobileNavMenu({ setPlanet }: MobileNavMenuProps): ReactElement {
  const { pathname } = useLocation();

  return (
    <NavMenu>
      {PLANET_NAMES.map(planet => (
        <NavMenuItem onClick={() => setPlanet(planet)} key={planet}>
          <Link to={`/${planet.toLocaleLowerCase()}/${getLastPathSegment(pathname)}`}>
            <motion.svg
              variants={navMenuListItemTextVariants}
              className={`mr-10 fill-current text-${planet.toLocaleLowerCase()}-mobileNav`}
              width='20'
              height='20'
              viewBox='0 0 20 20'>
              <motion.circle cx='50%' cy='50%' r='10'></motion.circle>
            </motion.svg>

            <motion.p
              whileTap={{ opacity: 0.2 }}
              variants={navMenuListItemTextVariants}
              className='text-navBase nav-text'>
              {planet}
            </motion.p>

            <NavChevron variants={navMenuListItemTextVariants} className='mr-3' />
          </Link>
        </NavMenuItem>
      ))}
    </NavMenu>
  );
}
