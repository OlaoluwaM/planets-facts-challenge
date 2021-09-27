import styled from 'styled-components';
import IconBurger from './NavBurgerIcon';
import MobileNavMenu from './MobileNavMenu';
import mobileNavToggleMachine from '../.machines/mobleNav.machine';

import { usePlanet } from '../context/PlanetContext';
import { useMachine } from '@xstate/react';
import { ActiveUnderline } from 'reusables/components/ActiveUnderline';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getLastPathSegment } from 'utils/helpers';
import { mediaQueries, PLANET_NAMES } from '../utils/constants';
import { AnimatePresence, AnimateSharedLayout, m as motion } from 'framer-motion';

import type { Planets } from '../types/custom';
import type { Variants } from 'framer-motion';
import type { MutableRefObject, ReactElement } from 'react';

const NavBarWrapper = styled.nav`
  &.open + main {
    display: none;
  }

  .normal-nav {
    display: none;
  }

  ${mediaQueries.tablet} {
    flex-direction: column;
    padding-bottom: 0.75rem;

    & > h5 {
      margin-top: 0.875rem;
      font-size: 1.75rem;
    }

    & .mobile-nav-burger {
      display: none;
    }

    .normal-nav {
      display: flex;
      padding-bottom: 0px;

      li {
        display: inline-block;
        text-align: left;
        transition: 'text-decoration' 0.3s ease;
      }

      .active-underline {
        display: none;
      }
    }
  }

  ${mediaQueries.desktop} {
    flex-direction: row;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;

    h5,
    .normal-nav {
      margin-top: 0.875rem;
      margin-bottom: 0.875rem;
    }

    h5 {
      flex-basis: 10%;
    }

    .normal-nav {
      overflow: initial;
      flex-basis: 45%;
      padding-left: 0;
      padding-right: 0;

      .active-underline {
        display: block;
        margin-top: -4.8rem;
      }
    }
  }
`;

const navItemVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: ([index, isActive]) => ({
    opacity: isActive ? 1 : 0.7,

    transition: {
      default: { delay: index * 0.2 },
      opacity: {
        delay: 0.3,
      },
    },
  }),

  active: {
    opacity: 1,
  },
};

function selectPlanetToDisplay(
  planetName: Planets,
  sendEvent: ReturnType<typeof usePlanet>['sendEvent'],
  callback?: () => void
): void {
  sendEvent({ type: planetName.toLocaleUpperCase() as Uppercase<Planets> });
  callback?.();
}

function OtherDimensionsNav() {
  const { pathname } = useLocation();
  console.log(pathname);
  const { sendEvent } = usePlanet();

  const handlePlanetChange = (planetName: Planets) => {
    selectPlanetToDisplay(planetName, sendEvent);
  };

  const checkPlanetInPath = (planetName: Planets): boolean => {
    const regex = new RegExp(planetName, 'i');

    return pathname.search(regex) > -1;
  };

  return (
    <ul className='m-0 mt-6 mb-3 p-4 w-full px-20 flex justify-around items-center normal-nav'>
      <AnimateSharedLayout>
        {PLANET_NAMES.map((planetName, index) => {
          const isActive = checkPlanetInPath(planetName);

          return (
            <Link
              key={planetName}
              to={`/${planetName.toLocaleLowerCase()}/${getLastPathSegment(pathname)}`}>
              <motion.li
                variants={navItemVariants}
                initial='hidden'
                animate='visible'
                custom={[index, isActive]}
                whileHover='active'
                className='text-2xs nav-text relative'
                onClick={() => handlePlanetChange(planetName)}>
                {planetName}

                {isActive && (
                  <ActiveUnderline
                    planetName={planetName.toLocaleLowerCase()}
                    className='active-underline h-4'
                  />
                )}
              </motion.li>
            </Link>
          );
        })}
      </AnimateSharedLayout>
    </ul>
  );
}
interface MobileNavPropInterface {
  toggleNavStateClass: () => void;
}

function MobileNav({ toggleNavStateClass }: MobileNavPropInterface): ReactElement {
  const [state, send, service] = useMachine(mobileNavToggleMachine);
  const showMenu = state.matches('open');

  useEffect(() => {
    service.subscribe(state => {
      if (['OPEN_MENU', 'CLOSE_MENU'].includes(state.event.type)) toggleNavStateClass();
    });
  }, []);

  const { sendEvent } = usePlanet();

  const handleClick = () => {
    const eventToSend: typeof mobileNavToggleMachine.events[number] = showMenu
      ? 'CLOSE_MENU'
      : 'OPEN_MENU';

    send({ type: eventToSend });
  };

  const handlePlanetChange = (planet: Planets) => {
    selectPlanetToDisplay(planet, sendEvent, () => send({ type: 'CLOSE_MENU' }));
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

const navWrapperClassNames = `w-full min-h-40 flex px-5 py-6 items-center justify-between relative generic-border-bottom`;

export default function Nav(): ReactElement {
  const wrapperRef = useRef<HTMLElement>(null);

  return (
    <NavBarWrapper ref={wrapperRef} className={navWrapperClassNames}>
      <h5 className='uppercase font-primary text-3xl'>the Planets</h5>

      <MobileNav toggleNavStateClass={handleMobileNavStateClass.bind(null, wrapperRef)} />
      <OtherDimensionsNav />
    </NavBarWrapper>
  );
}
