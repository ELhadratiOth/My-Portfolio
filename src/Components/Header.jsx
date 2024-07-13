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
    <div className="container flex flex-col justify-between space-y-5 pt-1 items-center w-screen m-auto md:flex-row  ">
      <div className="z-50 md:ml-2 mt-4 2xl:ml-60">
        <img src={myLogo} width={140} alt="erreur" />
      </div>
      <div className="relative flex items-start space-x-5 text-2xl">
        {SocialMedias.map(socialMedia => (
          <motion.div
            key={socialMedia.id}
            className="text-secondary2 hover:text-primary1 bg-secondary1 p-2 rounded-md hover:scale-110 relative overflow-hidden ring-2 ring-offset-0  ring-current hover:ring-primary1"
            whileHover="visible"
          >
            <a href={socialMedia.url}>{socialMedia.icon}</a>
            <motion.div
              className="absolute -z-10 w-7 h-16 bg-secondary2 -rotate-45"
              style={{
                top: '1em',
                right: '1.9em',
              }}
              variants={beforeAnimation}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
