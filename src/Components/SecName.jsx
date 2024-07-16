/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
export default function SecName({ secName, children }) {
  return (
    <div className="self-start hover:text-primary1  transition-colors ease-in-out font-semibold  border border-white px-7 py-1 rounded-full flex justify-around items-center  space-x-2 text-white  ">
      {children}{' '}
      <motion.div
        whileHover={{ textShadow: '1px 2px 9px rgba(111, 105, 253, 1)' }}
      >
        {secName}
      </motion.div>{' '}
    </div>
  );
}
