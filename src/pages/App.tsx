import Nav from '../components/Navbar';
import GenericPlanetPage from './PlanetInfoPage';
import backgroundImageSvg from '../assets/background-stars.svg';

import { themeObj } from '../context/theme';
import { Suspense } from 'react';
import { PlanetProvider } from '../context/PlanetContext';
import { LazyMotion, domMax } from 'framer-motion';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import { STARTING_PLANET, lowercasePlanetNamesPartialRegex } from '../utils/constants';
import { AnimatedRoutes } from '../components/AnimatedRoutes';
// Use domMax instead of domAnimation if you plan on having layout animations

import type { ReactElement } from 'react';

const GlobalStyle = createGlobalStyle`
  body {
    background: fixed url(${backgroundImageSvg}) no-repeat center;
    background-color: ${({ theme }) => theme.black.DEFAULT};
    color: ${({ theme }) => theme.white.DEFAULT}
  }
`;

export default function App(): ReactElement {
  return (
    <ThemeProvider theme={themeObj}>
      <LazyMotion features={domMax} strict>
        <GlobalStyle />
        <PlanetProvider>
          <Router>
            <Nav />
            {/* TODO would like to have a galaxy animation for loading */}
            {/* <Suspense fallback={<p>Loading</p>}> */}
            <AnimatedRoutes>
              <Route exact path='/'>
                <Redirect to={`/${STARTING_PLANET}/overview`} />
              </Route>

              <Route path={`/:planetName(${lowercasePlanetNamesPartialRegex})`}>
                <GenericPlanetPage />
              </Route>

              <Route path='*'>
                <div>404</div>
              </Route>
            </AnimatedRoutes>
            {/* </Suspense> */}
          </Router>
        </PlanetProvider>
      </LazyMotion>
    </ThemeProvider>
  );
}
