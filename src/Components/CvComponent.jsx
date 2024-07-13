import { motion } from 'framer-motion';
import CVframe1 from '../assets/CVframe1.png';
import CVframe2 from '../assets/CVframe2.png';
import CVframe3 from '../assets/CVframe3.png';
import LestConn from './LetsConnect';

export default function CvComponent() {
  return (
    <div className="absolute  bg-amber-100  bottom-36 left-32  ">
      <LestConn />

      <div className="absolute -left-5 -bottom-20 w-52">
        <motion.img
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            ease: 'linear',
            repeat: Infinity,
          }}
          src={CVframe1}
          width={190}
        />
      </div>
      <div className="absolute -left-10 -bottom-20 w-56 ">
        <motion.img
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            ease: 'linear',
            repeat: Infinity,
          }}
          src={CVframe2}
          width={190}
        />
      </div>
      <div className="absolute -left-5 -bottom-20 w-52 ">
        <motion.img
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            ease: 'linear',
            repeat: Infinity,
          }}
          src={CVframe3}
          width={190}
        />
      </div>
    </div>
  );
}
