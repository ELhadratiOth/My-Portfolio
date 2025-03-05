/* eslint-disable react/prop-types */
import {
  FaHtml5,
  FaReact,
  FaJava,
  FaPython,
  FaWindows,
  FaDocker,
} from 'react-icons/fa';
import { IoLogoCss3 } from 'react-icons/io';
import { IoLogoJavascript } from 'react-icons/io5';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { RiTailwindCssFill } from 'react-icons/ri';
import { DiBootstrap } from 'react-icons/di';
import { DiLinux } from 'react-icons/di';
import { BiLogoPostgresql } from 'react-icons/bi';
import { DiGithubBadge } from 'react-icons/di';
import { DiGit } from 'react-icons/di';

import {
  SiFlask,
  SiOracle,
  SiMysql,
  SiFastapi,
  SiShadcnui,
  SiPostman,
  SiMongodb,
} from 'react-icons/si';

import { SiTensorflow } from 'react-icons/si';
import { SiScikitlearn } from 'react-icons/si';
import { SiOpenaigym } from 'react-icons/si';
import { SiApachekafka } from 'react-icons/si';
import { SiApachehive } from 'react-icons/si';
import { SiLangchain } from 'react-icons/si';

import Scoop from './SVGs/Sqoop';
import { FaAws } from 'react-icons/fa';
import HuggingFaceIcon from './SVGs/HuggingFaceIcon';
import PowerBIIcon from './SVGs/PowerAutomateIcon';
import { motion } from 'framer-motion';
import CIcon from './SVGs/Ccompo';
import CrewAI from './SVGs/CrewAI';

const SkillCategory = ({ category, skills }) => (
  <motion.div
    className="flex flex-col justify-center items-start space-y-2"
    initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.7, delay: 0.1 }}
  >
    <div className="flex flex-col justify-center md:w-3/3 md:w-full md:justify-start md:flex-row space-y-2 mb-3 md:mb-0 text-white font-semibold">
      <div className="md:text-lg md:pt-4 md:mr-2 md:w-auto text-nowrap ">
        {category} :
      </div>
      <div className="text-purple-100 flex flex-wrap items-center text-2xl w-full md:w-full pr-10 md:pr-0 ">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col mt-0.5 items-center mr-5 md:mr-3 xl:mr-5 hover:text-primary1 transition-colors duration-300"
            whileHover={{
              scale: 1.1,
              textShadow: '1px 2px 9px #000',
            }}
          >
            <skill.icon
              className={
                skill.name !== 'Postman' 
                  ? 'text-3xl md:text-3xl'
                  : 'text-2xl  md:text-2xl'
              }
            />
            <motion.div
              className="absolute group font-bold -top-1 w-7 h-9 flex justify-start flex-col items-center"
              initial={{ opacity: 1, y: 0 }}
              whileHover={{
                opacity: 1,
                y: -19,
                height: 53,
              }}
              transition={{
                duration: 0.35,
                ease: 'easeInOut',
                type: 'spring',
                stiffness: 60,
              }}
            >
              <div className="px-3 group-hover:block hidden w-max h-6 pt-0.5 rounded-md bg-white text-sm text-primary4 shadow-lg">
                {skill.name}
              </div>
              <div className="w-0 h-0 group-hover:block hidden border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function SkillsPart() {
  return (
    <div className="space-y-1">
      <SkillCategory
        category="Programming / Coding Languages"
        skills={[
          { icon: FaHtml5, name: 'HTML5' },
          { icon: IoLogoCss3, name: 'CSS3' },
          { icon: IoLogoJavascript, name: 'JavaScript' },
          { icon: FaJava, name: 'Java' },
          { icon: FaPython, name: 'Python' },
          { icon: CIcon, name: 'C' },
        ]}
      />
      <SkillCategory
        category="ML / DL / Gen AI / Agenti AI"
        skills={[
          { icon: SiScikitlearn, name: 'Scikit-learn' },
          { icon: SiTensorflow, name: 'Tensorflow' },
          { icon: SiOpenaigym, name: 'OpenAI Gym' },
          { icon: HuggingFaceIcon, name: 'Hugging Face' },
          { icon: SiLangchain, name: 'LangChain' },
          { icon: CrewAI, name: 'CrewAI' },
        ]}
      />
      <SkillCategory
        category="Big Data"
        skills={[
          { icon: SiApachekafka, name: 'Kafka' },
          { icon: Scoop, name: 'Sqoop' },
          { icon: SiApachehive, name: 'Hive' },
        ]}
      />
      <SkillCategory
        category="Frameworks and Libraries"
        skills={[
          { icon: FaReact, name: 'React' },
          { icon: TbBrandFramerMotion, name: 'Framer-Motion' },
          { icon: SiFastapi, name: 'FastAPI' },
          { icon: RiTailwindCssFill, name: 'Tailwind CSS' },
          { icon: SiFlask, name: 'Flask' },
          { icon: SiShadcnui, name: 'Shadcn UI' },
          { icon: DiBootstrap, name: 'Bootstrap' },
        ]}
      />
      <SkillCategory
        category="Databases ( SQL / PlSql / NoSql )"
        skills={[
          { icon: SiOracle, name: 'Oracle' },
          { icon: SiMysql, name: 'MySQL' },
          { icon: BiLogoPostgresql, name: 'PostgreSQL' },
          { icon: SiMongodb, name: 'MongoDB' },
        ]}
      />
      <SkillCategory
        category="Cloud Platforms"
        skills={[{ icon: FaAws, name: 'Aws' }]}
      />
      <SkillCategory
        category="Operating Systems"
        skills={[
          { icon: DiLinux, name: 'Linux' },
          { icon: FaWindows, name: 'Windows' },
        ]}
      />
      <SkillCategory
        category="Version Control & Tools"
        skills={[
          { icon: DiGit, name: 'Git' },
          { icon: DiGithubBadge, name: 'GitHub' },
          { icon: SiPostman, name: 'Postman' },
          { icon: FaDocker, name: 'Docker' },
          { icon: PowerBIIcon, name: 'Power Automate' },
        ]}
      />
    </div>
  );
}
