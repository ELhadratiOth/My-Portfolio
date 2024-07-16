import { motion } from 'framer-motion';
import { VscDebugBreakpointLog } from 'react-icons/vsc';
import styles from '../static/bubble.module.css';

const Header = () => {
  const Me = () => 'El Hadrati Othman'.split('');

  return (
    <div className="fixed md:absolute top-0 left-0 h-14 md:h-20 w-full flex justify-center items-center md:justify-start z-20 border-b-2 border-primary3 backdrop-blur-lg shadow-shad shadow-primary3 md:border-0 md:shadow-none">
      <div className="flex justify-center items-center">
        <motion.h2
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: 'spring',
            stiffness: 100,
          }}
          className="text-center text-3xl md:text-5xl text-indigo-300 md:ml-32 font-medium md:font-thin"
        >
          {Me().map((child, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.15 }}
              className={`${styles.hoverText}`}
            >
              {child}
            </motion.span>
          ))}
        </motion.h2>
        <h2 className="text-red-700 self-end rotate-45 text-sm">
          <VscDebugBreakpointLog />
        </h2>
      </div>
    </div>
  );
};

export default Header;
