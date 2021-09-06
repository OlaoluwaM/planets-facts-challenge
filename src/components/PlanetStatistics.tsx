import styled from 'styled-components';

import { usePlanet } from '../context/PlanetContext';
import { m as motion } from 'framer-motion';

import type { ReactElement } from 'react';
import Counter from './Counter';

const PlanetStatisticsWrapper = styled(motion.ul).attrs({
  className: 'px-3 py-0 m-0 pb-3',
})``;

const PlanetStatistic = styled(motion.li).attrs({
  className:
    'p-6 px-8 w-full font-secondary text-4xs font-bold inactive-text mb-3 flex items-center justify-between',
})`
  min-height: 70px;
  border: 0.5px solid var(--borderColor);

  :last-of-type {
    margin-bottom: 0rem;
  }

  span {
    font-weight: 500;
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
    <PlanetStatisticsWrapper layout>
      {statistics.map(([metricName, metricKey]) => {
        const metric = planetInfo?.[metricKey];
        if (!metric) throw new Error(`Metric ${metricKey} was undefined`);

        const number = parseFloat(metric) || 0;
        const suffix = metric?.match(/[a-z]/gi)?.join('') ?? '';

        return (
          <PlanetStatistic key={metricName}>
            {metricName.toLocaleUpperCase()}
            <Counter
              from={number / 2}
              to={number}
              suffix={suffix}
              decimalPlace={Number.isInteger(number) ? 0 : 1}
              className='text-xl font-primary text-white'
            />
          </PlanetStatistic>
        );
      })}
    </PlanetStatisticsWrapper>
  );
}
