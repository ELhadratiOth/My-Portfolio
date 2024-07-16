import { motion } from 'framer-motion';
import ProjectsImg from '../assets/projects.png';
import LestConn from './LetsConnect';

export default function ProjectBtn() {
  return (
    <motion.div
      className="w-4/5 flex justify-center md:justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <div className="relative group border-2 border-dashed w-40 h-40 md:mr-12  p-3 rounded-full flex justify-center items-center cursor-pointer">
        <LestConn />
        <motion.img
          className="w-96"
          animate={{ rotate: 360 }}
          transition={{
            duration: 10,
            ease: 'linear',
            repeat: Infinity,
          }}
          src={ProjectsImg}
        />
      </div>
    </motion.div>
  );
}
