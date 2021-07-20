import styled from 'styled-components';

import { m as motion } from 'framer-motion';
import { generalWrapperVariants } from '../reusables/others/variants';

import type { Variants } from 'framer-motion';
import type { ReactElement } from 'react';

const subNavTextVariants: Variants = {
  visible: {
    y: 0,
    opacity: 1,
  },

  hidden: {
    y: 40,
    opacity: 0,
  },
};

const SubNavWrapper = styled.ul.attrs({
  variants: generalWrapperVariants,
  className: 'flex p-4 items-center justify-evenly w-full max-h-20',
})`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;

  li p {
    font-family: var(--secondaryFont);
    font-size: 9px;
    letter-spacing: 1.93px;
    font-weight: bold;
    height: 100%;
    text-align: center;
  }
`;

export default function SubNav(): ReactElement {
  return (
    <SubNavWrapper>
      <li>
        <motion.p variants={subNavTextVariants}>overview</motion.p>
        <motion.span layoutId='active-underline'></motion.span>
      </li>
      <li>
        <motion.p variants={subNavTextVariants}>structure</motion.p>
        <motion.span layoutId='active-underline'></motion.span>
      </li>
      <li>
        <motion.p variants={subNavTextVariants}>surface</motion.p>
        <motion.span layoutId='active-underline'></motion.span>
      </li>
    </SubNavWrapper>
  );
}
