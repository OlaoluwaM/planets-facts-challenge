import styled from 'styled-components';
import PlanetInfo from '../components/PlanetInfo';
import DataPicker from '../components/DataPicker';
import PlanetStatistics from '../components/PlanetStatistics';

import { Route, useRouteMatch } from 'react-router-dom';

import type { ReactElement } from 'react';
import { infoPages, mediaQueries } from '../utils/constants';

const ContentWrapper = styled.main`
  min-height: calc(calc(100% - 10rem) / 2);

  ${mediaQueries.tablet} {
    & > .data-picker {
      display: none;
    }
  }
`;

export default function GenericPlanetPage(): ReactElement {
  const { path } = useRouteMatch();

  return (
    <ContentWrapper className='lg:px-40'>
      <DataPicker />
      <Route exact path={`${path}/:infoType(${infoPages.join('|')})`}>
        <PlanetInfo />
      </Route>
      <PlanetStatistics />
    </ContentWrapper>
  );
}
