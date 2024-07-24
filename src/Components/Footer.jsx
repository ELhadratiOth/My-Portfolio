import { motion } from 'framer-motion';
import SocialMediaIcon from './SocialMediaIcon';
import myLogo from '../assets/MyLogo.png';
import ScrollerVaul from './ScrollerVaul';

const Footer = () => {
  return (
    <motion.div
      className="flex flex-col justify-center md:hidden w-full  mt-10"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="bg-red-200">
        <ScrollerVaul className="text-white " />
      </div>
      <hr className="w-full mb-3" />
      <div className="flex flex-col space-y-5 justify-center items-center pt-1">
        <div className="w-full flex justify-around items-center ">
          {' '}
          <div>
            {' '}
            <img src={myLogo} className="w-28" alt="Logo" />
          </div>
          <div className="flex flex-col justify-center self-center space-y-4">
            {' '}
            <SocialMediaIcon />
          </div>
        </div>
        <div className="text-purple-100 text-center">
          &copy; 2024 Othman El Hadrati . All&nbsp;Rights&nbsp;Reserved
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
