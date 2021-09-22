import Color from 'color';
import styled from 'styled-components';

import { useParams } from 'react-router';
import { usePlanet } from '../context/PlanetContext';
import { ReactComponent as LinkIcon } from '../assets/icon-source.svg';
import { m as motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import type { infoPages } from '../utils/constants';
import type { ReactElement } from 'react';
import DynamicSVGComponent from './DyamicSvg';
import { extractResourceNameOnly } from 'utils/helpers';

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

  div[class*='internal'],
  img[class*='geology'] {
    @media only screen and (max-width: 768px), (max-height: 768px) {
      display: none;
    }
  }

  & > div {
    display: flex;
    justify-content: center;
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

  const planetContent = planetInfoObj[resolvedPlanetInfoProperty];
  const planetInfo = planetContent.content;
  const sourceLink = planetContent.source;
  const planetImages = planetInfoObj.images;

  const internalImage = extractResourceNameOnly(planetImages.internal);
  const planetImage = extractResourceNameOnly(planetImages.planet);
  const geologyResourceName = extractResourceNameOnly(planetImages.geology);

  const geologyImagePath = require(`../assets/${geologyResourceName}.png`).default;

  return (
    <PlanetInfoWrapper layout>
      <DynamicSVGComponent
        // layoutId='dynamic-svg'
        className={`${planetName}-svg`}
        name={planetImage}
      />

      {/* <AnimateSharedLayout> */}
      {/* <AnimatePresence>
          {infoType === 'structure' && (
            <DynamicSVGComponent
              layoutId='dynamic-svg'
              className={`${planetName}-internal-svg`}
              name={internalImage}
            />
          )}

          {infoType === 'surface' && (
            <motion.img
              layoutId='dynamic-svg'
              className={`${planetName}-geology-image`}
              src={geologyImagePath}
              alt={`${planetName} geology`}
            />
          )}
        </AnimatePresence> */}
      {/* </AnimateSharedLayout> */}

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
