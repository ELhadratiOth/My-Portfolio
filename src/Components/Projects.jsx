import SecName from './SecName';
import { motion } from 'framer-motion';
import { GrProjects } from 'react-icons/gr';
import { AnimatePresence } from 'framer-motion';
import Transition from './Transition';
import Grid from './Grid'
import { FaHtml5, FaReact, FaPython } from 'react-icons/fa';
import { IoLogoCss3 } from 'react-icons/io';
import { IoLogoJavascript } from 'react-icons/io5';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { RiTailwindCssFill } from 'react-icons/ri';
import { SiFlask } from 'react-icons/si';
import { SiFastapi } from 'react-icons/si';
import { SiShadcnui } from 'react-icons/si';
import { SiStreamlit } from 'react-icons/si';

import Ccompo from './Ccompo';
import GitHubAnalyserImg from '../assets/GitHubAnalyser.png';
import PortFolioImg from '../assets/PortFolio.png';
import PurchasingManagementImg from '../assets/PurshasingManagement.png';
import YoutubeVideoDownloaderImg from '../assets/YoutubeVideoDownloader.png';
import WeatherAppImg from '../assets/WeatherApp.png';
import HotelLandingPageImg from '../assets/HotelLandingPage.png';
import PurshaseApp from '../assets/PurshaseApp.jfif';

const data = [
  {
    id: 1,
    serviceName: 'PortFolio',
    tools: [FaReact, TbBrandFramerMotion, RiTailwindCssFill],
    link: 'https://github.com/ELhadratiOth/My-PortFolio',
    imgUrl: PortFolioImg,
  },
  {
    id: 2,
    serviceName: 'GitHub Analyser',
    tools: [FaPython, SiStreamlit],
    link: 'https://github.com/ELhadratiOth/GitTrendAnalyz',
    imgUrl: GitHubAnalyserImg,
  },

  {
    id: 5,
    serviceName: 'Purchasing Management',
    tools: [Ccompo],
    link: 'https://github.com/ELhadratiOth/C-Project',
    imgUrl: PurshaseApp,
  },
  {
    id: 4,
    serviceName: 'Youtube Video Downloader',
    tools: [FaHtml5, IoLogoCss3, IoLogoJavascript, SiFlask],
    link: 'https://github.com/ELhadratiOth/Youtube-video-Downloader',
    imgUrl: YoutubeVideoDownloaderImg,
  },
  {
    id: 6,
    serviceName: 'Hotel Landing Page',
    tools: [FaHtml5, IoLogoCss3],
    link: 'https://github.com/ELhadratiOth/CR7-Hotel-Project',
    imgUrl: HotelLandingPageImg,
  },
  {
    id: 3,
    serviceName: 'Weather APP',
    tools: [FaPython],
    link: 'https://github.com/ELhadratiOth/WeatherApp',
    imgUrl: WeatherAppImg,
  },

  {
    id: 7,
    serviceName: 'Medical Office ',
    tools: [FaReact, RiTailwindCssFill, SiFastapi, SiShadcnui],
    link: '',
    imgUrl: PurchasingManagementImg,
  },
];

const staggerContainer = {
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      delay: 0.5,
    },
  },
};

export default function Projects() {
  return (
    <AnimatePresence mode="wait">
      <Transition key={1} />
      <div
        key={2}
        className="cursor-custom relative flex flex-col mb-20 space-y-12 items-center md:w-3/5 md:pr-28 w-full h-full md:h-full mt-16 md:mt-0 pt-12 md:pt-24 ml-20"
      >
        <SecName secName="Projects">
          <GrProjects />
        </SecName>
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="space-y-3  self-start flex justify-center flex-col items-start"
        >
          <div className="text-white self-start text-4xl uppercase backdrop-blur-[3px]">
            Take a look at
            <span className="text-primary3"> My Work</span>
          </div>
        </motion.div>
        <Grid data={data} />
      </div>
    </AnimatePresence>
  );
}
