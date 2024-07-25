/* eslint-disable react/prop-types */
// import { useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';

const BurgerIcon = ({ active }) => {
  return (
    <div className="fixed top-24 bg-primary4 ring ring-primary5 z-50  px-1 pt-1 transition-colors   rounded-full right-7 ">
      <MotionConfig
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
      >
        <motion.button
          initial={false}
          animate={active ? 'open' : 'closed'}
          className="relative h-12 w-12 rounded-full bg-white/0 transition-colors hover:bg-white/20"
        >
          <motion.span
            variants={VARIANTS.top}
            className="absolute h-1 w-8 bg-white"
            style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
          />
          <motion.span
            variants={VARIANTS.middle}
            className="absolute h-1 w-8 bg-white"
            style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
          />
          <motion.span
            variants={VARIANTS.bottom}
            className="absolute h-1 w-4 bg-white"
            style={{
              x: '-78%',
              y: '50%',
              bottom: '35%',
              left: 'calc(50% + 10px)',
            }}
          />
        </motion.button>
      </MotionConfig>
    </div>
  );
};

export default BurgerIcon;

const VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['30%', '50%', '50%'],
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '30%'],
    },
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
    },
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['37%', '50%', '50%'],
      opacity: [1, 1, 0],

      left: '50%',
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '55%', '30%'],
      opacity: [1, 1, 1],

      left: 'calc(50% + 12px)',
    },
  },
};
