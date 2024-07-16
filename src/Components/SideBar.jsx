import myLogo from '../assets/MyLogo.png';
import SocialMedias from './SocialMedias';
import { motion } from 'framer-motion';

const beforeAnimation = {
  hidden: {
    top: '1em',
    right: '1.9em',
  },
  visible: {
    top: ['1em', '-1em', '-0.6em'],
    right: ['1.9em', '-0.5em', '0.3em'],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      times: [0.1, 0.5, 1],
     
    },
  },
};

const Header = () => {
  return (
    <motion.div
      className="cursor-custom border mt-28 border-slate-300 md:w-1/3 xl:w-1/5 flex flex-col justify-between space-y-5 items-center md:m-auto pb-3 rounded-3xl py-5 shadow-shad p-10 md:px-3 mb-16"
      initial={{ x: '-100vw', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 1,
        ease: 'easeInOut',
        type: 'spring',
        stiffness: 40,
      }}
    >
      <motion.div
        className="z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <img src={myLogo} width={200} alt="Logo" />
      </motion.div>

      <motion.div
        className="text-white text-center text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Email: <span>OthmanEelhadrati@gmail.com</span> <br />
        Based in Kenitra, Morocco
      </motion.div>

      <motion.div
        className="text-slate-300 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        &copy; 2023 Othman El Hadrati All&nbsp;Rights&nbsp;Reserved
      </motion.div>

      <div className="relative flex items-start space-x-5 text-2xl">
        {SocialMedias.map(socialMedia => (
          <motion.div
            key={socialMedia.id}
            className="text-primary2 hover:shadow-shad hover:shadow-primary1 hover:text-white p-2 rounded-md hover:scale-110 relative overflow-hidden ring-2 ring-offset-0 ring-primary3 hover:ring-primary3 transition-all duration-500 cursor-pointer "
            whileHover="visible"
          >
            <a href={socialMedia.url}>{socialMedia.icon}</a>
            <motion.div
              className="absolute -z-10 w-7 h-16 bg-primary5 -rotate-45"
              style={{ top: '1em', right: '1.9em' }}
              variants={beforeAnimation}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <a
          target="_blank"
          href="https://rb.gy/t6rsmy"
          className="group font-semibold uppercase shadow-md shadow-primary4 relative inline-block overflow-hidden rounded bg-primary1 ring-2 ring-white hover:ring-0 px-6 py-2 text-lg text-slate-800 hover:text-white focus:outline-none focus:ring active:bg-indigo-600 active:text-white hover:scale-105 transition-all duration-500 hover:shadow-shad hover:shadow-primary1"
        >
          <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-white transition-all duration-500 group-hover:w-full"></span>
          <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-white transition-all duration-500 group-hover:h-full"></span>
          <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all duration-500 group-hover:w-full"></span>
          <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-white transition-all duration-500 group-hover:h-full"></span>
          Contact Me
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Header;
