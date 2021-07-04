import { Suspense, ReactElement } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation, AnimateSharedLayout } from 'framer-motion';

// Use domMax instead of domAnimation if you plan on having layout animations

export default function App(): ReactElement {
  const location = useLocation();

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimateSharedLayout>
        <Suspense fallback={<p>Loading</p>}>
          <Switch location={location} key={location.pathname}>
            <Route exact path='/'>
              <div>Hello World</div>
            </Route>
          </Switch>
        </Suspense>
      </AnimateSharedLayout>
    </LazyMotion>
  );
}
