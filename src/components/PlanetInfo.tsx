import Color from 'color';
import styled from 'styled-components';

import { useParams } from 'react-router';
import { usePlanet } from '../context/PlanetContext';
import { ReactComponent as LinkIcon } from '../assets/icon-source.svg';
import { m as motion, AnimatePresence } from 'framer-motion';

import type { infoPages } from '../utils/constants';
import type { ReactElement } from 'react';

type InfoPageTypes = typeof infoPages[number];
type PlanetInfoTopLevelProperties = 'overview' | 'structure' | 'geology';

const PlanetInfoWrapper = styled(motion.div).attrs({
  className: 'px-3 w-full text-center text-2xs text-white mb-6',
})`
  font-family: var(--secondaryFont);

  p {
    min-height: 130px;
    line-height: 22px;
    letter-spacing: 0px;
    font-weight: 400;
  }

  span {
    color: ${({ theme }) => Color(theme.white.DEFAULT).hsl().lightness(50).toString()};

    a {
      color: ${({ theme }) => Color(theme.white.DEFAULT).hsl().lightness(68).toString()};
      font-weight: 500;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-decoration-color: ${({ theme }) =>
        Color(theme.white.DEFAULT).hsl().lightness(50).alpha(0.5).toString()};
    }
  }
`;

const PlanetHeader = styled(motion.h2).attrs({
  className: 'text-custom4xl my-4 mb-6',
})`
  letter-spacing: 0px;
  line-height: 100%;
  font-family: var(--primaryFont);
`;

export default function PlanetInfo(): ReactElement {
  const { state } = usePlanet();
  const { infoType }: { infoType: InfoPageTypes } = useParams();

  const planetName = state.value as string;
  const planetInfoObj = state.context.planetFacts;

  const infoPageToPlanetInfoPropertyMapper = {
    structure: 'structure',
    overview: 'overview',
    surface: 'geology',
  };

  const resolvedPlanetInfoProperty = infoPageToPlanetInfoPropertyMapper[
    infoType
  ] as PlanetInfoTopLevelProperties;

  const planetInfo = planetInfoObj?.[resolvedPlanetInfoProperty].content;
  const sourceLink = planetInfoObj?.[resolvedPlanetInfoProperty].source;

  return (
    <PlanetInfoWrapper layout>
      {/* For the planet images check out for dynamic SVG react components
      https://stackoverflow.com/questions/61339259/how-to-dynamically-import-svg-and-render-it-inline/61472427 */}
      <PlanetHeader>{planetName.toLocaleUpperCase()}</PlanetHeader>
      <motion.p
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        key={planetInfo}
        className='mb-5 px-2'>
        {planetInfo}
      </motion.p>
      <span>
        Source:{' '}
        <a className='text-white' href={sourceLink}>
          Wikipedia
          <LinkIcon className='inline ml-1' />
        </a>
      </span>
    </PlanetInfoWrapper>
  );
}
