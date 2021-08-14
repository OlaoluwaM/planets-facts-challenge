import { AnimateSharedLayout } from 'framer-motion';
import { Route, Switch, useLocation } from 'react-router';

import type { ReactElement } from 'react';

export function AnimatedRoutes({ children }: { children: ReactElement[] }): ReactElement {
  const location = useLocation();

  return (
    <AnimateSharedLayout>
      <Switch location={location} key={location.pathname}>
        {children}
      </Switch>
    </AnimateSharedLayout>
  );
}
