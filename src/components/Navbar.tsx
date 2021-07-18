import Color from 'color';
import styled from 'styled-components';
import IconBurger from './NavBurgerIcon';
import useDeviceType from '../reusables/hooks/useDeviceType';
import MobileNavMenu from './MobileNavMenu';
import mobileNavToggleMachine from '../.machines/mobleNav.machine';

import { useMachine } from '@xstate/react';
import { AnimatePresence } from 'framer-motion';

import type { Planets } from '../types/custom';
import type { ReactElement, FC } from 'react';

const NavBarWrapper = styled.nav.attrs({
  className: 'w-full max-h-40 flex px-5 py-6 flex flex-col items-center relative',
})`
  border-bottom: ${({ theme }) =>
    `2px solid ${Color(theme.gray.DEFAULT).hsl().alpha(0.3)}`};
`;

function MobileNav(): ReactElement {
  const [state, send] = useMachine(mobileNavToggleMachine);
  const showMenu = state.matches('openMenu');

  const handleClick = () => {
    const eventToSend: typeof mobileNavToggleMachine.events[number] = showMenu
      ? 'CLOSE_MENU'
      : 'OPEN_MENU';

    send({ type: eventToSend });
  };

  const selectPlanetToDisplay = (planetName: Planets) => {
    send({ type: 'SET_ACTIVE_PLANET_AND_CLOSE_MENU', planetName });
  };

  return (
    <NavBarWrapper>
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

interface GenericComponentProps {
  name?: 'Tablet' | 'Desktop';
}

const GenericComponent: FC<GenericComponentProps> = ({ name }): ReactElement => {
  return <h1>{name}</h1>;
};
GenericComponent.displayName = 'Generic Component';

const NavDeviceTypeResolver: {
  Mobile: FC;
  Tablet: FC<GenericComponentProps>;
  Desktop: FC<GenericComponentProps>;
} = {
  Mobile: MobileNav,
  Tablet: GenericComponent.bind(null, { name: 'Tablet' }),
  Desktop: GenericComponent.bind(null, { name: 'Desktop' }),
};

export default function Nav(): ReactElement {
  const { deviceType } = useDeviceType();

  console.log({ deviceType });
  const ComponentToRender = NavDeviceTypeResolver[deviceType!];

  if (!deviceType) return <h1>Hello World</h1>;
  return <ComponentToRender />;
}
