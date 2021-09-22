import styled from 'styled-components';
import IconBurger from './NavBurgerIcon';
import MobileNavMenu from './MobileNavMenu';
import mobileNavToggleMachine from '../.machines/mobleNav.machine';

import { useRef } from 'react';
import { usePlanet } from '../context/PlanetContext';
import { useMachine } from '@xstate/react';
import { AnimatePresence, m as motion } from 'framer-motion';
import { DeviceDimensions, PLANET_NAMES } from '../utils/constants';

import type { Planets } from '../types/custom';
import type { MutableRefObject, ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getLastPathSegment } from 'utils/helpers';

const NavBarWrapper = styled.nav`
  &.open + main {
    display: none;
  }

  .normal-nav {
    display: none;
  }

  @media only screen and (min-width: ${DeviceDimensions.Tablet}),
    (max-height: ${DeviceDimensions.Tablet}) {
    & > h5 {
      margin-top: 0.875rem;
      font-size: 1.75rem;
    }

    & {
      flex-direction: column;
      padding-bottom: 0.75rem;
    }

    & .mobile-nav-burger {
      display: none;
    }

    .normal-nav {
      display: flex;
      padding-bottom: 0px;

      li {
        display: inline-block;
        opacity: 0.5;
      }
    }
  }
`;

function selectPlanetToDisplay(
  planetName: Planets,
  sendEvent: ReturnType<typeof usePlanet>['sendEvent'],
  callback?: () => void
): void {
  sendEvent({ type: planetName.toLocaleUpperCase() as Uppercase<Planets> });
  callback?.();
}

function TabletNav() {
  const { pathname } = useLocation();
  const { sendEvent } = usePlanet();

  const handlePlanetChange = (planetName: Planets) => {
    selectPlanetToDisplay(planetName, sendEvent);
  };

  return (
    <ul className='m-0 mt-6 mb-3 p-4 w-full px-5 flex justify-around items-center normal-nav'>
      {PLANET_NAMES.map(planetName => (
        <motion.li
          key={planetName}
          className='text-2xs nav-text'
          onClick={() => handlePlanetChange(planetName)}>
          <Link to={`/${planetName.toLocaleLowerCase()}/${getLastPathSegment(pathname)}`}>
            {planetName}
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
interface MobileNavPropInterface {
  toggleNavStateClass: () => void;
}

function MobileNav({ toggleNavStateClass }: MobileNavPropInterface): ReactElement {
  // Subscribe to the service so when the `CLOSE_MENU` event is emitted we toggle the `open` class
  const [state, send, service] = useMachine(mobileNavToggleMachine);
  const showMenu = state.matches('open');

  const { sendEvent } = usePlanet();

  const handleClick = () => {
    const eventToSend: typeof mobileNavToggleMachine.events[number] = showMenu
      ? 'CLOSE_MENU'
      : 'OPEN_MENU';

    toggleNavStateClass();
    send({ type: eventToSend });
  };

  const handlePlanetChange = (planet: Planets) => {
    selectPlanetToDisplay(planet, sendEvent, () => send({ type: 'CLOSE_MENU' }));
    toggleNavStateClass();
  };

  return (
    <>
      <IconBurger
        menuOpen={showMenu}
        className='cursor-pointer mobile-nav-burger'
        onClick={handleClick}
      />
      <AnimatePresence>
        {showMenu && <MobileNavMenu setPlanet={handlePlanetChange} />}
      </AnimatePresence>
    </>
  );
}

function handleMobileNavStateClass({ current }: MutableRefObject<HTMLElement | null>) {
  const navElement = current;
  if (!navElement) return;
  navElement.classList.toggle('open');
}

const navWrapperClassNames = `w-full min-h-40 flex px-5 py-6 flex items-center justify-between relative generic-border-bottom`;

export default function Nav(): ReactElement {
  const wrapperRef = useRef<HTMLElement>(null);

  return (
    <NavBarWrapper ref={wrapperRef} className={navWrapperClassNames}>
      <h5 className='uppercase font-primary text-3xl'>the Planets</h5>

      <MobileNav toggleNavStateClass={handleMobileNavStateClass.bind(null, wrapperRef)} />
      <TabletNav />
    </NavBarWrapper>
  );
}
