import styled from 'styled-components';
import IconBurger from './NavBurgerIcon';
import MobileNavMenu from './MobileNavMenu';
import mobileNavToggleMachine from '../.machines/mobleNav.machine';

import { usePlanet } from '../context/PlanetContext';
import { useMachine } from '@xstate/react';
import { AnimatePresence } from 'framer-motion';

import type { Planets } from '../types/custom';
import type { ReactElement } from 'react';

const NavBarWrapper = styled.nav`
  &.open + main {
    display: none;
  }
`;

export default function Nav(): ReactElement {
  const [state, send] = useMachine(mobileNavToggleMachine);
  const showMenu = state.matches('open');

  const { sendEvent } = usePlanet();

  const handleClick = () => {
    const eventToSend: typeof mobileNavToggleMachine.events[number] = showMenu
      ? 'CLOSE_MENU'
      : 'OPEN_MENU';

    send({ type: eventToSend });
  };

  const selectPlanetToDisplay = (planetName: Planets) => {
    console.log({ planetName });
    sendEvent({ type: planetName.toLocaleUpperCase() as Uppercase<Planets> });
    send({ type: 'CLOSE_MENU' });
  };

  const navClassNames = `w-full max-h-40 flex px-5 py-6 flex flex-col items-center relative generic-border-bottom ${
    showMenu ? 'open' : 'closed'
  }`;

  return (
    <NavBarWrapper className={navClassNames}>
      <div className='flex justify-between items-center w-full'>
        <h5 className='uppercase font-primary text-3xl'>the Planets</h5>
        <IconBurger
          menuOpen={showMenu}
          className='cursor-pointer'
          onClick={handleClick}
        />
      </div>
      <AnimatePresence>
        {showMenu && <MobileNavMenu setPlanet={selectPlanetToDisplay} />}
      </AnimatePresence>
    </NavBarWrapper>
  );
}

// interface GenericComponentProps {
//   name?: 'Tablet' | 'Desktop';
// }

// const GenericComponent: FC<GenericComponentProps> = ({ name }): ReactElement => {
//   return <h1>{name}</h1>;
// };

// GenericComponent.displayName = 'Generic Component';

// const NavDeviceTypeResolver: {
//   Mobile: FC;
//   Tablet: FC<GenericComponentProps>;
//   Desktop: FC<GenericComponentProps>;
// } = {
//   Mobile: MobileNav,
//   Tablet: GenericComponent.bind(null, { name: 'Tablet' }),
//   Desktop: GenericComponent.bind(null, { name: 'Desktop' }),
// };

// export default function Nav(): ReactElement {
//   const { deviceType } = useDeviceType();

//   const ComponentToRender = NavDeviceTypeResolver[deviceType!];

//   if (!deviceType) return <h1>Hello World</h1>;
//   return <ComponentToRender />;
// }
