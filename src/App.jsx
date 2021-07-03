import themeObj from '../context/theme';

import { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Route, Switch, useLocation } from 'react-router-dom';

// Use domMax instead of domAnimation if you plan on having layout animations

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider theme={themeObj}>
      <LazyMotion features={domAnimation} strict>

        <>
          <Suspense fallback={<p>Loading</p>}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/">
                <div>Hello World</div>
              </Route>
            </Switch>
          </Suspense>
        </>

      </LazyMotion>
    </ThemeProvider>
  );
}
