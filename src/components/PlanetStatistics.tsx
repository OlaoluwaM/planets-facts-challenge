import { usePlanet } from '../context/PlanetContext';

import type { ReactElement } from 'react';

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
    <ul>
      {statistics.map(([metricName, metricKey]) => (
        <li key={metricName}>
          {metricName.toLocaleUpperCase()}: {planetInfo?.[metricKey]}
        </li>
      ))}
    </ul>
  );
}
