import Paragraphe from './Paragraphe';
import SecName from './SecName';
import { motion } from 'framer-motion';
import { SiHyperskill } from 'react-icons/si';

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
  hidden: { x: 100, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 1, ease: 'easeInOut' } },
};

export default function Skills() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="cursor-custom relative flex flex-col space-y-16 items-center md:w-3/5 pl-10 md:pl-0 w-full h-full md:h-screen md:pt-32"
    >
      <SecName secName="Skills">
        <SiHyperskill />
      </SecName>

      <motion.div
        variants={staggerItem}
        className="space-y-5 self-start flex justify-center flex-col items-start"
      >
        <div className="lg:text-5xl xl:text-6xl text-me uppercase font-semibold tracking-wide mt-2 text-purple-100 transition-all duration-500">
          A little <span className="text-primary3">about me</span>
        </div>
        <Paragraphe partie="1" />
      </motion.div>
    </motion.div>
  );
}
