import IconBurger from './NavBurgerIcon';
import useDeviceType from '../reusables/hooks/useDeviceType';

import type { ReactElement, FC } from 'react';

function MobileNav(): ReactElement {
  return (
    <nav className='w-full max-h-40 flex p-6 flex items-center justify-between'>
      <h5 className='uppercase font-primary text-3xl'>the Planets</h5>
      <IconBurger className='cursor-pointer' />
    </nav>
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
