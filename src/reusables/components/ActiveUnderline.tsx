import { m as motion } from 'framer-motion';

import type { ReactElement } from 'react';

interface PropsInterface {
  planetName: string;
  className?: string;
}

export function ActiveUnderline({
  planetName,
  className: otherClassNames = '',
}: PropsInterface): ReactElement {
  return (
    <motion.span
      layoutId='nav-underline'
      initial={false}
      animate={{ y: 0 }}
      transition={{ type: 'spring', bounce: 0.3, delay: 0.3 }}
      className={`h-2 min-w-20 block mt-4 inset-x-0 bg-${planetName} absolute ${otherClassNames}`}
    />
  );
}
