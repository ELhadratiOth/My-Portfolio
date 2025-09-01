import SecName from './SecName';
import { motion } from 'framer-motion';
import { SiPaloaltonetworks } from 'react-icons/si';
import { AnimatePresence } from 'framer-motion';
import Transition from './Transition';

const staggerContainer = {
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      delay: 0.5,
    },
  },
};

export default function Experiences() {
  return (
    <AnimatePresence mode="wait">
      <Transition key={1} />
      <div
        key={2}
        className="relative flex flex-col items-center w-full h-full pt-12 mt-16 mb-10 ml-20 cursor-custom md:mb-20 space-y-14 md:w-3/5 md:pr-28 md:h-full md:mt-0 md:pt-24"
      >
        <SecName secName="Experiences">
          <SiPaloaltonetworks />
        </SecName>

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="flex flex-col items-start self-start justify-center space-y-3"
        >
          <div className="text-white self-start text-4xl w-80 md:w-full md:text-5xl uppercase backdrop-blur-[3px] font-semibold">
            My Professional
            <span className="text-primary3"> Journey</span>
          </div>
        </motion.div>

        {/* Simple Coming Soon Section */}
        <div className="w-full flex flex-col items-center justify-center min-h-[300px] space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center space-y-6 text-center"
          >
            {/* Coming Soon Text */}
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Coming Soon
            </h2>

            {/* Simple Description */}
            <p className="text-gray-300 text-lg md:text-xl max-w-md">
              This section will showcase my professional experiences and career
              journey.
            </p>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
