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

// const staggerItem = {
//   hidden: { x: 100, opacity: 0 },
//   show: { x: 0, opacity: 1, transition: { duration: 1, ease: 'easeInOut' } },
// };

export default function Specialities() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="border p-36 mt-72 cursor-custom relative flex flex-col space-y-8 items-center md:w-3/5 pl-10 md:pl-0 w-full h-full md:h-screen md:pt-32"
    >
      <SecName secName="service" service="true" >
        <SiHyperskill />
      </SecName>

    </motion.div>
  );
}
