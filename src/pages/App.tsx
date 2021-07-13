import Nav from '../components/Navbar';
import backgroundImageSvg from '../assets/background-stars.svg';

import { themeObj } from '../context/theme';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Suspense, ReactElement } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation, AnimateSharedLayout } from 'framer-motion';

// Use domMax instead of domAnimation if you plan on having layout animations
const GlobalStyle = createGlobalStyle`
  body {
    background: fixed url(${backgroundImageSvg}) no-repeat center;
    background-color: ${({ theme }) => theme.black};
    color: ${({ theme }) => theme.white}
  }
`;

export default function App(): ReactElement {
  const location = useLocation();

  return (
    <ThemeProvider theme={themeObj}>
      <LazyMotion features={domAnimation} strict>
        <GlobalStyle />
        <Nav />
        <AnimateSharedLayout>
          {/* TODO would like to have a galaxy animation for loading */}
          <Suspense fallback={<p>Loading</p>}>
            <Switch location={location} key={location.pathname}>
              <Route exact path='/:planetName'>
                <div>Hello World</div>
              </Route>
            </Switch>
          </Suspense>
        </AnimateSharedLayout>
      </LazyMotion>
    </ThemeProvider>
  );
}
