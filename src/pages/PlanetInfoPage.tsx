import styled from 'styled-components';
import DataPicker from '../components/DataPicker';
import PlanetStatistics from '../components/PlanetStatistics';

import { Route, useRouteMatch } from 'react-router-dom';

import type { ReactElement } from 'react';

const ContentWrapper = styled.main`
  min-height: calc(calc(100% - 10rem) / 2);
`;

export default function GenericPlanetPage(): ReactElement {
  const { path } = useRouteMatch();

  return (
    <ContentWrapper>
      <DataPicker />
      <Route exact path={`${path}/overview`}>
        <div className='p-5'>Overview</div>
      </Route>
      <Route path={`${path}/structure`}>
        <div className='p-5'>Structure</div>
      </Route>
      <Route path={`${path}/surface`}>
        <div className='p-5'>Surface</div>
      </Route>
      <PlanetStatistics />
    </ContentWrapper>
  );
}
