import SecName from './SecName';
import { motion } from 'framer-motion';
import { GrProjects } from 'react-icons/gr';
import GridB from './GridB'
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
    },
  },
};

export default function Projects() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="border cursor-custom relative flex flex-col  mt-14 space-y-12 items-center md:w-3/5 px-10 pt-24  md:pl-0 w-full h-full md:h-full md:pt-32 md:pb-16 "
    >
      <div className="self-start -mt-9 flex justify-center ">
        <SecName secName="Projects" >
          <GrProjects />
        </SecName>
      </div>
        {' '}
        <GridB data={data} />
    </motion.div>
  );
}


