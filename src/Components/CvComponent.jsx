import { motion } from 'framer-motion';
import ProjectsImg from '../assets/projects.png';
import LestConn from './LetsConnect';

export default function CvComponent() {
  return (
    <div className="relative group border-2 border-dashed w-40 h-40  md:self-center p-3 rounded-full flex justify-center items-center  cursor-pointer ">
      <LestConn />

      <div className="">
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
    </div>
  );
}
