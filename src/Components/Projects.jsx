import SecName from './SecName';
import { motion } from 'framer-motion';
import { GrProjects } from 'react-icons/gr';
import { AnimatePresence } from 'framer-motion';
import Transition from './Transition';
const data = [
  {
    id: 1,
    serviceName: 'Web Development',
    description:
      'Transforming ideas into engaging digital experiences. From intuitive interfaces to robust functionalities, each project is designed to captivate and align with your business goals.',
  },
  {
    id: 2,
    serviceName: 'Hosting',
    description:
      'Specializing in reliable hosting solutions for static websites and dynamic web applications. Ensure your online presence is secure, scalable, and always accessible with tailored hosting expertise.',
  },
  {
    id: 3,
    serviceName: 'Problem Solving ',
    description:
      'Proficient in tackling algorithmic challenges with a strategic approach. Leveraging in-depth knowledge to analyze, design, and implement effective solutions that optimize efficiency and performance in software development.',
  },
  {
    id: 4,
    serviceName: 'Database Management',
    description:
      'I specialize in managing databases and designing scalable systems that prioritize security and performance. My focus is on handling complex data setups to ensure businesses operate efficiently and effectively.',
  },
];
const staggerContainer = {
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      deley:0.4
    },
  },
};

export default function Projects() {
  return (
    <AnimatePresence mode="wait">
      <Transition key={1} />
      <motion.div
        key={2}
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="cursor-custom relative flex flex-col space-y-4 items-center md:w-3/5 w-full h-full md:h-screen mt-16 md:mt-0 pt-12 md:pt-24 ml-20"
      >
        <SecName secName="Projects">
          <GrProjects />
        </SecName>
        <motion.div
          variants={staggerContainer}
          className="space-y-3 self-start flex justify-center flex-col items-start "
        >
          <div className="text-white self-start text-4xl uppercase backdrop-blur-[3px] ">
            Take a look at
            <span className="text-primary3"> My Work</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


