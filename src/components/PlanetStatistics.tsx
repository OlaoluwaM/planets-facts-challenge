import styled from 'styled-components';
import Counter from './Counter';

import { usePlanet } from '../context/PlanetContext';
import { m as motion } from 'framer-motion';
import { mediaQueries } from 'context/build/utils/constants';

import type { ReactElement } from 'react';

const PlanetStatistic = styled(motion.li)`
  min-height: 4.375rem;
  border: 0.5px solid var(--borderColor);

  :last-of-type {
    margin-bottom: 0rem;
  }

  span {
    font-weight: 500;
  }
`;

const PlanetStatisticsWrapper = styled(motion.ul)`
  ${mediaQueries.tablet} {
    display: flex;
    justify-content: space-around;
    align-items: center;

    ${PlanetStatistic} {
      display: flex;
      flex-direction: column;
      text-align: left;
      align-items: flex-start;
      width: 23.5%;
      flex-basis: 23.5%;
      padding: 1rem;

      :last-of-type {
        margin-bottom: auto;
      }

      & span {
        margin-top: 0.6rem;
      }
    }
  }

  ${mediaQueries.desktop} {
    ${PlanetStatistic} {
      span {
        letter-spacing: -0.9px;
      }
    }
  }
`;

const statistics = [
  ['Rotation time', 'rotation'],
  ['Revolution time', 'revolution'],
  ['radius', 'radius'],
  ['Average temp', 'temperature'],
] as const;

export default function PlanetStatistics(): ReactElement {
  const {
    state: {
      context: { planetFacts: planetInfo },
    },
  } = usePlanet();

  return (
    <PlanetStatisticsWrapper layout className='px-3 py-0 m-0 pb-3'>
      {statistics.map(([metricName, metricKey]) => {
        const metric = planetInfo?.[metricKey];
        if (!metric) throw new Error(`Metric ${metricKey} was undefined`);

        const number = parseFloat(metric) || 0;
        const suffix = metric?.match(/[a-z]/gi)?.join('') ?? '';

        return (
          <PlanetStatistic
            key={metricName}
            className='p-6 px-8 w-full font-secondary text-4xs font-bold inactive-text mb-3 flex items-center justify-between lg:p-10'>
            {metricName.toLocaleUpperCase()}
            <Counter
              from={number / 2}
              to={number}
              suffix={number === 1 ? suffix : suffix.replace(/s$/, '')}
              decimalPlace={Number.isInteger(number) ? 0 : 1}
              className='text-xl font-primary text-white lg:text-3xl'
            />
          </PlanetStatistic>
        );
      })}
    </PlanetStatisticsWrapper>
  );
}
