/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from 'framer-motion';

export default function SecName({ secName, children, service = false }) {
  return (
    <AnimatePresence>
      <motion.div
        className="self-start hover:text-primary1  transition-colors ease-in-out font-semibold  border border-white px-7 py-1 rounded-full flex justify-around items-center  space-x-2 text-white "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        {children}{' '}
        <motion.div
          whileHover={{ textShadow: '1px 2px 9px rgba(111, 105, 253, 1)' }}
        >
          <span className={`inline-flex   ${service && ' inline-flex  mb-1'}`}>
            {secName}
          </span>
        </motion.div>{' '}
      </motion.div>
    </AnimatePresence>
  );
}
