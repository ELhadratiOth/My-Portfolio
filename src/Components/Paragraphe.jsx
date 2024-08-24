/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
export default function Paragraphe({ partie }) {
  if (partie == 0)
    return (
      <motion.div
        className="text-start self-start w-[75%] font-customFont text-1xl text-purple-100 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        I am dedicated to harnessing technology to enhance people&apos;s lives
        and make that vision a reality.
      </motion.div>
    );
  else if (partie == 1)
    return (
      <motion.div
        className="text-start w-5/6 font-customFont text-sm md:text-base text-purple-100  backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        I&apos;m a first-year engineering student at The National School of
        Applied Sciences in Al Hoceima (<strong>ENSAH</strong>) , specializing
        in Data Engineering. With a passion for both Data Engineering and Web
        Development, I focus on crafting polished, precise code. My main
        motivation as a programmer is to make a positive impact by helping
        people .
      </motion.div>
    );
  else
    return (
      <motion.div
        className="text-start md:text-left font-customFont text-1xl backdrop-blur-[3px] "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <p>
          I&apos;m currently a first-year engineering student specializing in
          Data Engineering at the National School of Applied Sciences in Al
          Hoceima (<strong>ENSAH</strong>).
        </p>
      </motion.div>
    );
}
