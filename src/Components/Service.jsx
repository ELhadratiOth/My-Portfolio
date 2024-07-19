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
    <div className="cursor-custom relative flex flex-col space-y-12 items-center md:w-3/5 px-11  md:pl-0 w-full h-full md:h-full md:pt-32 md:pb-16 ">
      <div className="self-start -mt-9 flex justify-start ">
        <SecName secName="service" service="true">
          <SiHyperskill />
        </SecName>
      </div>

      <motion.div
        className="text-white self-start text-4xl uppercase "
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        My <span className="inline-block text-primary1">Specialities</span>
      </motion.div>
      <ServiceCompo />
    </div>
  );
}
