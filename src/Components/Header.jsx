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

export default function Header() {
  return (
    <div className="border border-slate-300 md:w-1/4  flex flex-col justify-between space-y-5  items-center md:m-auto pb-3 rounded-3xl py-5  shadow-shad p-10 md:px-0 mb-16  ">

      <div className="z-50">
        <img src={myLogo} width={200} alt="erreur" />
      </div>
      <div className="text-white text-center">
        {' '}
        Email: <span>OthmanElhadrati@gmail.com</span> <br />
        Base in Kenitra, Morocco
      </div>
      <div className="text-white text-center">
        © 2023 Othman El Hadrati. All Rights Reserved
      </div>

      <div className="relative flex items-start space-x-5 text-2xl">
        {SocialMedias.map(socialMedia => (
          <motion.div
            key={socialMedia.id}
            className="text-primary1  hover:text-primary3 p-2 rounded-md hover:scale-110 relative overflow-hidden ring-2 ring-offset-0  ring-current hover:ring-primary3 transition-all duration-500 cursor-pointer"
            whileHover="visible"
          >
            <a href={socialMedia.url}>{socialMedia.icon}</a>
            <motion.div
              className="absolute -z-10 w-7 h-16 bg-primary5 -rotate-45"
              style={{
                top: '1em',
                right: '1.9em',
              }}
              variants={beforeAnimation}
            />
          </motion.div>
        ))}
      </div>
      <div>
        <a
          href="othmanelhadrati@gmail.com"
          className="group shadow-md  shadow-primary4 relative inline-block overflow-hidden rounded  bg-primary1 ring-2 ring-current  px-12 py-3 text-sm font-medium text-slate-800 hover:text-white focus:outline-none focus:ring active:bg-indigo-600 active:text-white hover:scale-105 transition-all duration-500"
        >
          <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-white transition-all duration-5 00 group-hover:w-full "></span>
          <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-white transition-all duration-500 group-hover:h-full"></span>
          <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all duration-500 group-hover:w-full"></span>
          <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-white transition-all duration-500 group-hover:h-full"></span>
          Contact Me
        </a>
      </div>
    </div>
  );
}
