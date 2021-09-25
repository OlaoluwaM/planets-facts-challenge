import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import { usePlanet } from 'context/PlanetContext';
import { m as motion } from 'framer-motion';
import { useRouteMatch, useLocation } from 'react-router';

import type { ReactElement } from 'react';

const MenuButtonWrapper = styled(motion.ul)`
  list-style: none;

  & li {
    :first-of-type {
      margin-top: 0;
    }

    :last-of-type {
      margin-bottom: 0;
    }

    font-family: var(--secondaryFont);
    font-weight: 700;
    color: ${({ theme }) => theme.white};
    border: 2px solid var(--borderColor);
    border-radius: 3px;
    transition: background 0.3s ease;

    a {
      width: 100%;
      display: inline-block;
      height: 100%;

      &::before {
        content: attr(data-position) ${' '.repeat(10)};
        opacity: 0.4;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        margin-right: 0.875rem;
      }
    }
  }
`;

export default function DataPickerButtons({
  otherClassNames = '',
}: {
  otherClassNames?: string;
}): ReactElement {
  const { url } = useRouteMatch();
  const { pathname } = useLocation();

  const { state: planetStateNode } = usePlanet();
  const planetName = planetStateNode.value as string;

  const addActiveStyleWhenNeeded = (
    buttonType: 'overview' | 'structure' | 'surface' | string
  ): string | undefined => {
    if (pathname.includes(buttonType)) return `bg-${planetName}`;

    return;
  };

  const navItemResolver = {
    overview: 'Overview',
    structure: 'Internal Structure',
    surface: 'Surface Geology',
  };

  type ButtonTypes = keyof typeof navItemResolver;

  return (
    <MenuButtonWrapper
      className={`hidden m-0 p-0 md:flex flex-col items-center justify-center info-buttons-wrapper ${otherClassNames}`}>
      {Object.keys(navItemResolver).map((key: ButtonTypes | string, ind) => (
        <motion.li
          key={key}
          className={`w-full my-2.5 p-3 text-left pl-4 ${addActiveStyleWhenNeeded(key)}`}>
          <NavLink data-position={'0' + (ind + 1)} to={`${url}/${key}`}>
            {navItemResolver[key as keyof typeof navItemResolver]}
          </NavLink>
        </motion.li>
      ))}
    </MenuButtonWrapper>
  );
}
