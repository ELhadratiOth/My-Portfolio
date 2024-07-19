import SecName from './SecName';
import { motion } from 'framer-motion';
import { GrProjects } from 'react-icons/gr';
import { BentoGrid } from './BentoGrid';
// import ServiceCompo from './ServiceCompo';

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

export default function Projects() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="border cursor-custom relative flex flex-col space-y-12 items-center md:w-3/5 px-10  md:pl-0 w-full h-full md:h-full md:pt-32 md:pb-16 "
    >
      <div className="self-start -mt-9 flex justify-start ">
        <SecName secName="Introduce">
          <GrProjects />
        </SecName>
      </div>
      
      <BentoGrid/>
    </motion.div>
  );
}


