import styled from 'styled-components';

import { usePlanet } from '../context/PlanetContext';
import { AnimateSharedLayout, m as motion } from 'framer-motion';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';

import { ReactElement, useEffect } from 'react';
import { Planets } from '../types/custom';

const DataPickerWrapper = styled.ul.attrs({
  className:
    'w-full h-auto py-5 px-2.5 list-none m-0 uppercase flex items-center justify-around text-3xs generic-border-bottom',
})`
  font-family: var(--secondaryFont);
  font-weight: bold;
  overflow: hidden;
`;

const DataItem = styled.li.attrs({
  className: 'inactive-link relative',
})`
  height: 100%;

  a {
    height: 100%;
    display: inline-block;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  span {
    top: 223%;
    width: 107%;
  }
`;

export default function DataPicker(): ReactElement {
  const { url } = useRouteMatch();
  const { pathname } = useLocation();

  const { state: planetStateNode } = usePlanet();
  const planetName = planetStateNode.value as string;

  const isOverview = pathname.includes('overview');
  const isStructure = pathname.includes('structure');
  const isSurface = pathname.includes('surface');

  return (
    <DataPickerWrapper>
      <DataItem>
        <NavLink to={`${url}/overview`} activeClassName='active-link'>
          Overview
        </NavLink>

        {isOverview && <ActiveUnderline planetName={planetName} />}
      </DataItem>

      <DataItem>
        <NavLink to={`${url}/structure`} activeClassName='active-link'>
          Structure
        </NavLink>

        {isStructure && <ActiveUnderline planetName={planetName} />}
      </DataItem>

      <DataItem>
        <NavLink to={`${url}/surface`} activeClassName='active-link'>
          Surface
        </NavLink>

        {isSurface && <ActiveUnderline planetName={planetName} />}
      </DataItem>
    </DataPickerWrapper>
  );
}

function ActiveUnderline({ planetName }: { planetName: string }): ReactElement {
  return (
    <motion.span
      layoutId='nav-underline'
      initial={false}
      animate={{ y: 0 }}
      transition={{ type: 'spring', bounce: 0.5 }}
      className={`h-2 inset-x-0 bg-${planetName} absolute`}
    />
  );
}
