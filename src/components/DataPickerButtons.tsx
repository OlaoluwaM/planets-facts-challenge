import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import { usePlanet } from 'context/PlanetContext';
import { m as motion } from 'framer-motion';
import { useRouteMatch, useLocation } from 'react-router';

import type { ReactElement } from 'react';
import { removeLastPartOfUrl } from 'utils/helpers';

const MenuButtonWrapper = styled(motion.ul)`
  list-style: none;

  & a {
    transition: border 0.4s ease;

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

    li {
      width: 100%;
      display: inline-block;
      height: 100%;
    }

    &::before {
      content: attr(data-position) ${' '.repeat(10)};
      opacity: 0.4;
      font-family: inherit;
      font-weight: inherit;
      color: inherit;
      margin-right: 0.875rem;
    }
  }
`;

export default function DataPickerButtons({
  otherClassNames = ' ',
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

  const wrapperClassNames =
    `hidden m-0 p-0 md:flex flex-col items-center justify-center info-buttons-wrapper ${otherClassNames}`
      .replace('undefined', ' ')
      .trimEnd();

  const linkClass =
    'w-full my-2.5 p-3 pl-4 text-left hover:bg-gray-900 hover:border-transparent flex';

  return (
    <MenuButtonWrapper className={wrapperClassNames}>
      {Object.keys(navItemResolver).map((key: ButtonTypes | string, ind) => (
        <NavLink
          key={key}
          data-position={'0' + (ind + 1)}
          className={linkClass}
          activeClassName={addActiveStyleWhenNeeded(key)}
          to={`${removeLastPartOfUrl(url)}/${key}`}>
          <motion.li>{navItemResolver[key as keyof typeof navItemResolver]}</motion.li>
        </NavLink>
      ))}
    </MenuButtonWrapper>
  );
}
