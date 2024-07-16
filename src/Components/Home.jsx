import ProjectBtn from './ProjectBtn';
import Title from './Title';
import Paragraphe from './Paragraphe';
import Resume from './Resume';
import SecName from './SecName';
import { FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

export default function Home() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="cursor-custom relative flex flex-col space-y-8 items-center md:w-3/5 pl-10 md:pl-0 w-full h-full md:h-screen md:pt-32"
    >
      <SecName secName="Introduce">
        <FaHome />
      </SecName>

      <motion.div
        variants={staggerItem}
        className="space-y-5 self-start flex justify-center flex-col items-start"
      >
        <Title />
        <Paragraphe partie="0" />
      </motion.div>

      <Resume />
      <ProjectBtn />
    </motion.div>
  );
}
