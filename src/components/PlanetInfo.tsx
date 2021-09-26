import Color from 'color';
import styled from 'styled-components';
import DataPickerButtons from './DataPickerButtons';
import DynamicSVGComponent from './DyamicSvg';

import { useParams } from 'react-router';
import { usePlanet } from '../context/PlanetContext';
import { extractResourceNameOnly } from 'utils/helpers';
import { ReactComponent as LinkIcon } from '../assets/icon-source.svg';
import { AnimatePresence, m as motion } from 'framer-motion';

import { DeviceDimensions, infoPages, mediaQueries } from '../utils/constants';
import type { ReactElement } from 'react';

type InfoPageTypes = typeof infoPages[number];
type PlanetInfoTopLevelProperties = 'overview' | 'structure' | 'geology';

const PlanetInfoWrapper = styled(motion.div)`
  font-family: var(--secondaryFont);

  p {
    min-height: 10.125rem;
    display: flex;
    flex-direction: column;
    line-height: 22px;
    letter-spacing: 0px;
    font-weight: 400;
  }

  div[class*='internal'],
  img[class*='geology'] {
    display: none;
  }

  & > div:first-of-type {
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

  aside div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${mediaQueries.tablet} {
    & article {
      flex-basis: 50%;
      text-align: left;
    }

    & .info-buttons-wrapper {
      flex-basis: 45%;
    }
  }

  ${mediaQueries.desktop} {
    div[class*='internal'],
    img[class*='geology'] {
      display: flex;
      line-height: 0px;
    }

    & > div {
      flex-basis: 30%;
    }

    img[class*='geology'] {
      max-width: 20%;
      height: auto;
    }
  }
`;

const PlanetHeader = styled(motion.h2)`
  letter-spacing: 0px;
  line-height: 100%;
  font-family: var(--primaryFont);

  ${mediaQueries.desktop} {
    font-size: 5rem;
  }
`;

interface PlanetSVGProps {
  infoType: string;
  planetImages: {
    internal: string;
    planet: string;
    geology: string;
  };
  planetName: string;
}

function PlanetSvgs({
  infoType,
  planetImages,
  planetName,
}: PlanetSVGProps): ReactElement {
  const planetImage = extractResourceNameOnly(planetImages.planet);
  const internalImage = extractResourceNameOnly(planetImages.internal);
  const geologyResourceName = extractResourceNameOnly(planetImages.geology);

  const geologyImagePath = require(`../assets/${geologyResourceName}.png`).default;

  const wrapperClasses =
    'relative my-6 md:mt-14 md:mb-4 lg:flex-grow flex items-center justify-center';
  const commonClassesForSvgs = 'w-full h-full lg:absolute overflow-hidden';

  const isDesktop = window.matchMedia(`(min-width: ${DeviceDimensions.Desktop})`).matches;

  if (!isDesktop) {
    return (
      <aside className={wrapperClasses}>
        <DynamicSVGComponent
          className={`${planetName}-svg ${commonClassesForSvgs}`}
          name={planetImage}
        />
      </aside>
    );
  }

  return (
    <aside className={wrapperClasses}>
      <AnimatePresence exitBeforeEnter>
        {(infoType === 'overview' || infoType === 'surface') && (
          <DynamicSVGComponent
            key='item1'
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className={`${planetName}-svg ${commonClassesForSvgs}`}
            name={planetImage}
          />
        )}

        {infoType === 'structure' && (
          <DynamicSVGComponent
            key='item2'
            // layoutId='dynamic-svg'
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className={`${planetName}-internal-svg ${commonClassesForSvgs}`}
            name={internalImage}
          />
        )}

        {infoType === 'surface' && (
          <motion.img
            key='item3'
            className={`${planetName}-geology-image bottom-8 ${commonClassesForSvgs}`}
            src={geologyImagePath}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4 }}
            alt={`${planetName} geology`}
          />
        )}
      </AnimatePresence>
    </aside>
  );
}

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

  return (
    <PlanetInfoWrapper
      layout
      className='px-3 w-full text-center text-2xs text-white mb-6 lg:flex'>
      <PlanetSvgs
        infoType={infoType}
        planetImages={planetImages}
        planetName={planetName}
      />

      <div className='md:flex md:justify-between md:px-6 md:mt-32 md:mb-14 lg:flex-col lg:mt-8'>
        <article className='flex flex-col md:pr-6'>
          <PlanetHeader className='text-custom4xl my-4 lg:mt-0 lg:'>
            {planetName.toLocaleUpperCase()}
          </PlanetHeader>

          <motion.p
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            key={planetInfo}
            className='my-6'>
            {planetInfo}

            <span className='mt-6 md:mt-12 lg:my-6'>
              Source:
              <a className='text-white' href={sourceLink}>
                Wikipedia
                <LinkIcon className='inline ml-1' />
              </a>
            </span>
          </motion.p>
        </article>

        <DataPickerButtons />
      </div>
    </PlanetInfoWrapper>
  );
}
