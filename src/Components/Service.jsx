import SecName from './SecName';
import { motion } from 'framer-motion';
import { SiHyperskill } from 'react-icons/si';
import ServiceCompo from './ServiceCompo';

const staggerContainer = {
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
    },
  },
};


export default function Service() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="cursor-custom relative flex flex-col space-y-12 items-center md:w-3/5 px-10  md:pl-0 w-full h-full md:h-full md:pt-32 md:pb-16 "
    >
      <SecName secName="service" service="true">
        <SiHyperskill />
      </SecName>
      <motion.div
        className="text-white self-start text-4xl uppercase "
        variants={staggerContainer}
      >
        My <span className="inline-block text-primary1">Specialities</span>
      </motion.div>
      <ServiceCompo />
    </motion.div>
  );
}
