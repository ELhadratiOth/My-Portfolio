import SecName from './SecName';
import { motion } from 'framer-motion';
import { SiHyperskill } from 'react-icons/si';
import SkillsPart from './SkillsPart';
import Certificats from './Certificats';
import { useState } from 'react';

const Categories = ['Skills', 'Certificates'];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const staggerItem = {
  hidden: { x: 200, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 1.5, ease: 'easeInOut' } },
};

export default function Skills() {
  const [active, setActive] = useState('Skills');

  const Compo = () => {
    if (active === 'Skills') {
      return (
        <motion.div variants={staggerItem} initial="hidden" animate="show">
          <SkillsPart />
        </motion.div>
      );
    } else if (active === 'Certificates') {
      return (
        <motion.div variants={staggerItem} initial="hidden" animate="show">
          <Certificats />
        </motion.div>
      );
    } else {
      return <h1>Unknown Category</h1>;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="cursor-custom pt-8 self-start flex flex-col space-y-8 items-center md:w-3/5 pl-10 md:pl-0 w-full h-full md:h-screen"
    >
      {/* Section Name with Icon */}
      <SecName secName="Skills & Certificates">
        <div className="flex items-center">
          <SiHyperskill />
        </div>
      </SecName>

      {/* Category Selection */}
      <motion.div
        variants={staggerItem}
        className="text-white space-y-4 self-start flex justify-center flex-col items-start ml-6"
      >
        <div className="flex justify-start space-x-16">
          {Categories.map(category => (
            <motion.div
              key={category}
              className={`relative text-2xl transition-colors duration-300 ${
                active === category ? 'font-bold text-red-700' : 'text-white'
              }`}
              onClick={() => setActive(category)}
            >
              {category}
              <span
                className={`absolute bottom-0 left-0 h-0 border-b-2 transition-all duration-500 ${
                  active === category
                    ? 'w-full border-red-600'
                    : 'w-1/2 border-white'
                }`}
              ></span>
            </motion.div>
          ))}
        </div>
        <Compo />
      </motion.div>
    </motion.div>
  );
}
