import myLogo from '../assets/avatar.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from './Footer'
import SocialMediaIcon from './SocialMediaIcon';
import ScrollerVaul from './ScrollerVaul';

const Header = () => {
  return (
    <>
      <motion.div
        className="hidden  backdrop-blur-sm md:flex cursor-custom ring-1 ring-primary3 border-slate-300  flex-col justify-between space-y-5 items-center rounded-3xl shadow-shad md:fixed  px-9 py-4 mt-24 mb-8 md:top-20 md:left-5 md:px-3 md:w-2/6 lg:w-1/3  lg:px-2 lg:left-7  xl:w-1/4 xl:left-28 xl:py-6"
        initial={{ x: -400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          type: 'spring',
          stiffness: 40,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img src={myLogo} className="w-80" alt="Logo" />
        </motion.div>

        <motion.div
          className="text-white text-center text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Email : <span className="md:text-lg">OthmanElhadrati@gmail.com</span>{' '}
          <br />
          Based in Kenitra, Morocco
        </motion.div>

        <motion.div
          className="text-slate-300 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          &copy; 2024 Othman El Hadrati All&nbsp;Rights&nbsp;Reserved
        </motion.div>

        <SocialMediaIcon />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <Link
            className={`group font-semibold uppercase shadow-md shadow-primary4 relative inline-block overflow-hidden rounded bg-primary1 ring-2 ring-white hover:ring-0 px-6 py-2 text-lg text-slate-800 hover:text-white focus:outline-none focus:ring active:bg-indigo-600 active:text-white hover:scale-105 transition-all duration-500 hover:shadow-shad hover:shadow-primary1`}
            to={'/contactme'}
          >
            {' '}
            <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-white transition-all duration-500 group-hover:w-full"></span>
            <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-white transition-all duration-500 group-hover:h-full"></span>
            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all duration-500 group-hover:w-full"></span>
            <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-white transition-all duration-500 group-hover:h-full"></span>
            Contact Me!
          </Link>
        </motion.div>
        <div className="bg-red-200">
          <ScrollerVaul className="text-white " />
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Header;
