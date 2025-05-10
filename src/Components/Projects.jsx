import SecName from './SecName';
import { motion } from 'framer-motion';
import { GrProjects } from 'react-icons/gr';
import { AnimatePresence } from 'framer-motion';
import Transition from './Transition';
import Grid from './Grid';
import { FaHtml5, FaReact, FaPython } from 'react-icons/fa';
import { IoLogoCss3 } from 'react-icons/io';
import { IoLogoJavascript } from 'react-icons/io5';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { RiTailwindCssFill } from 'react-icons/ri';
import { SiFlask } from 'react-icons/si';
import { SiFastapi } from 'react-icons/si';
import { SiShadcnui } from 'react-icons/si';
import { SiStreamlit } from 'react-icons/si';
import { FaDocker } from 'react-icons/fa';
import { SiMysql } from 'react-icons/si';
import { BiLogoPostgresql } from 'react-icons/bi';
import { FaAws } from 'react-icons/fa6';
import { SiApachekafka } from 'react-icons/si';
import { SiApachehive } from 'react-icons/si';
import { SiApachehadoop } from 'react-icons/si';
import { DiRedis } from 'react-icons/di';
import { SiMongodb } from 'react-icons/si';
import { SiScikitlearn } from 'react-icons/si';
import { SiLangchain } from 'react-icons/si';

import Ccompo from './SVGs/Ccompo';
import Scoop from './SVGs/Sqoop';
import CrewAI2 from './SVGs/CrewAI2';
import MemoAI from './SVGs/Mem0ai';
import AgentOps from './SVGs/AgentOps';
import Qdrant from './SVGs/Qdrant.jsx';
import LlamaIndex from './SVGs/LlamaIndex2.jsx';

import GitHubAnalyserImg from '../assets/GitHubAnalyser.png';
import PortFolioImg from '../assets/PortFolio.png';
import MedicalOffice from '../assets/MedicalOffice.png';
import JumiaPipelineImg from '../assets/JumiaPipeline.png';
import SpotifyPipelineImg from '../assets/SpotifyPipeline.png';
import YoutubeVideoDownloaderImg from '../assets/YoutubeVideoDownloader.png';
import WeatherAppImg from '../assets/WeatherApp.png';
import HotelLandingPageImg from '../assets/HotelLandingPage.png';
import PurshaseApp from '../assets/PurshaseApp.jfif';
import CreditCardPipline from '../assets/CreditCardPipline.png';
import Sqooparchi from '../assets/sqooparchi.png';
import DarijaUI from '../assets/DarijaUI.png';
import ShardedDB from '../assets/ShardedDB.png';
import ChatBot from '../assets/ChatBotArchi.png';
import PortfolioChatBotArchi from '../assets/PortfolioChatBotArchi.png';
import Hociematy from '../assets/Hociematy.png';
const data = [
  {
    id: 13,
    serviceName: 'Portfolio Multi-Agentic ChatBot',
    tools: [CrewAI2, SiFastapi, MemoAI, AgentOps, Qdrant],
    link: 'https://github.com/ELhadratiOth/Portfolio-AI-Chat-Agent',
    imgUrl: PortfolioChatBotArchi,
  },
  {
    id: 13,
    serviceName: 'ENSAH conversational ChatBot',
    tools: [SiFastapi, SiLangchain, SiStreamlit, SiMongodb, FaDocker],
    link: 'https://github.com/ELhadratiOth/ENSAH-ChatBot-RAG-APP.git',
    imgUrl: ChatBot,
  },
  {
    id: 14,
    serviceName: 'Al Hoceima Guide AI Chatbot',
    tools: [LlamaIndex, SiFastapi, SiMysql, Qdrant],
    link: 'https://www.youtube.com/watch?v=B2g1hhIHui8',
    imgUrl: Hociematy,
  },
  {
    id: 12,
    serviceName: 'Darija Sentiment Analysis',
    tools: [SiFastapi, FaAws, FaReact, SiScikitlearn],
    link: 'https://github.com/ELhadratiOth/BlaBla-BDarija-Sentiment-Analysis.git',
    imgUrl: DarijaUI,
  },

  {
    id: 8,
    serviceName: 'Credit Card Fraud Detection Pipline',
    tools: [SiApachekafka, FaAws, FaReact],
    link: 'https://github.com/ELhadratiOth/Real-Time-CreditCard-fraudDetection.git',
    imgUrl: CreditCardPipline,
  },
  {
    id: 11,
    serviceName: 'MongoDB Shared Project',
    tools: [SiApachekafka, FaReact, SiFastapi, DiRedis, SiMongodb],
    link: 'https://github.com/ELhadratiOth/MongoDB_Sharded.git',
    imgUrl: ShardedDB,
  },
  {
    id: 10,
    serviceName: 'Movies Pipeline',
    tools: [FaAws, Scoop, SiApachehadoop, SiApachehive, SiMysql],
    link: 'https://github.com/ELhadratiOth/Movies-Pipeline.git',
    imgUrl: Sqooparchi,
  },
  {
    id: 7,
    serviceName: 'Medical Office',
    tools: [
      FaReact,
      RiTailwindCssFill,
      SiFastapi,
      SiShadcnui,
      SiMysql,
      FaDocker,
    ],
    link: 'https://github.com/ELhadratiOth/Cabinet-Medical.git',
    imgUrl: MedicalOffice,
  },

  {
    id: 2,
    serviceName: 'GitHub Analyser',
    tools: [FaPython, SiStreamlit],
    link: 'https://github.com/ELhadratiOth/GitTrendAnalyz',
    imgUrl: GitHubAnalyserImg,
  },

  {
    id: 8,
    serviceName: 'Jumia Pipline',
    tools: [BiLogoPostgresql, FaPython],
    link: 'https://github.com/ELhadratiOth/Jumia-Pipeline.git',
    imgUrl: JumiaPipelineImg,
  },
  {
    id: 4,
    serviceName: 'Youtube Video Downloader',
    tools: [FaHtml5, IoLogoCss3, IoLogoJavascript, SiFlask],
    link: 'https://github.com/ELhadratiOth/Youtube-video-Downloader',
    imgUrl: YoutubeVideoDownloaderImg,
  },
  {
    id: 9,
    serviceName: 'SpotiFy Pipeline',
    tools: [FaAws, FaPython],
    link: 'https://github.com/ELhadratiOth/Spotify-ETL-AWS-.git',
    imgUrl: SpotifyPipelineImg,
  },
  {
    id: 1,
    serviceName: 'PortFolio',
    tools: [FaReact, TbBrandFramerMotion, RiTailwindCssFill],
    link: 'https://github.com/ELhadratiOth/My-PortFolio',
    imgUrl: PortFolioImg,
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
    id: 5,
    serviceName: 'Purchasing Management',
    tools: [Ccompo],
    link: 'https://github.com/ELhadratiOth/C-Project',
    imgUrl: PurshaseApp,
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
        className="relative flex flex-col items-center w-full h-full pt-12 mt-16 mb-10 ml-20 cursor-custom md:mb-20 space-y-14 md:w-3/5 md:pr-28 md:h-full md:mt-0 md:pt-24"
      >
        <SecName secName="Projects">
          <GrProjects />
        </SecName>
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="flex flex-col items-start self-start justify-center space-y-3"
        >
          <div className="text-white self-start text-4xl w-80 md:w-full md:text-4xl uppercase backdrop-blur-[3px]">
            Take a look at
            <span className="text-primary3"> My Work</span>
          </div>
        </motion.div>
        <Grid data={data} />
      </div>
    </AnimatePresence>
  );
}
