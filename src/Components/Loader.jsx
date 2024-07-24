import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <motion.div
        className="flex justify-center items-center"
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 1.1, 1.2, 1.1, 1],
          transition: {
            duration: 3,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          },
        }}
      >
        <l-helix size="97" color="#5854ca"></l-helix>
      </motion.div>
    </div>
  );
};

export default Loader;
