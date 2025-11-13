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
import { RiTailwindCssFill } from 'react-icons/ri';
import { DiLinux } from 'react-icons/di';
import { BiLogoPostgresql } from 'react-icons/bi';
import { DiGithubBadge } from 'react-icons/di';
import { DiGit } from 'react-icons/di';

import {
  SiFlask,
  SiOracle,
  SiMysql,
  SiFastapi,
  SiPostman,
  SiMongodb,
} from 'react-icons/si';

import { SiTensorflow } from 'react-icons/si';
import { SiScikitlearn } from 'react-icons/si';
import { SiOpenaigym } from 'react-icons/si';
import { SiApachekafka } from 'react-icons/si';
import { SiApachehive } from 'react-icons/si';
import { SiLangchain } from 'react-icons/si';
import { SiSpring } from 'react-icons/si';
import { SiSpringboot } from 'react-icons/si';
import { DiSpark } from 'react-icons/di';
import { SiGooglecloud } from 'react-icons/si';
import { SiGithubactions } from 'react-icons/si';
import { DiJenkins } from 'react-icons/di';
import { SiAnsible } from 'react-icons/si';
import { SiTerraform } from 'react-icons/si';
import { SiJest } from 'react-icons/si';
import { SiPytest } from 'react-icons/si';
import { FaDigitalOcean } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';
import { SiDatabricks } from 'react-icons/si';
import { FaRegSnowflake } from 'react-icons/fa';

import Scoop from './SVGs/Sqoop';
import { FaAws } from 'react-icons/fa';
import HuggingFaceIcon from './SVGs/HuggingFaceIcon';
import PowerBIIcon from './SVGs/PowerAutomateIcon';
import PowerBIDataIcon from './SVGs/PowerBIIcon';
import { motion } from 'framer-motion';
import CIcon from './SVGs/Ccompo';
import CrewAI from './SVGs/CrewAI';
import LlamaIndex from './SVGs/LlamaIndex.jsx';

const SkillCategory = ({ category, skills }) => (
  <motion.div
    className="flex flex-col items-start justify-center space-y-2"
    initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.7, delay: 0.1 }}
  >
    <div className="flex flex-col justify-center mb-3 space-y-2 font-semibold text-white md:w-3/3 md:w-full md:justify-start md:flex-row md:mb-0">
      <div className="md:text-lg md:pt-4 md:mr-2 md:w-auto text-nowrap ">
        {category} :
      </div>
      <div className="flex flex-wrap items-center w-full pr-10 text-2xl text-purple-100 md:w-full md:pr-0 ">
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
              className="absolute flex flex-col items-center justify-start font-bold group -top-1 w-7 h-9"
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
              <div className="hidden w-0 h-0 border-t-4 border-l-4 border-r-4 group-hover:block border-l-transparent border-r-transparent" />
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
          { icon: FaPython, name: 'Python' },
          { icon: FaJava, name: 'Java' },
          { icon: FaHtml5, name: 'HTML5' },
          { icon: IoLogoCss3, name: 'CSS3' },
          { icon: IoLogoJavascript, name: 'JavaScript' },
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
          { icon: LlamaIndex, name: 'LlamaIndex' },
        ]}
      />
      <SkillCategory
        category="Big Data & Data Engineering"
        skills={[
          { icon: DiSpark, name: 'Spark' },
          { icon: SiApachekafka, name: 'Kafka' },
          { icon: Scoop, name: 'Sqoop' },
          { icon: SiApachehive, name: 'Hive' },
          { icon: SiDatabricks, name: 'Databricks' },
          { icon: FaRegSnowflake, name: 'Snowflake' },
          { icon: PowerBIDataIcon, name: 'Power BI' },
        ]}
      />
      <SkillCategory
        category="Frameworks and Libraries"
        skills={[
          { icon: FaReact, name: 'React' },
          { icon: RiTailwindCssFill, name: 'Next.js' },
          { icon: SiFastapi, name: 'FastAPI' },
          { icon: SiFlask, name: 'Flask' },
          { icon: SiSpring, name: 'Spring' },
          { icon: SiSpringboot, name: 'Spring Boot' },
          { icon: RiTailwindCssFill, name: 'Tailwind CSS' },
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
        skills={[
          { icon: FaAws, name: 'AWS' },
          { icon: SiGooglecloud, name: 'GCP' },
          { icon: VscAzure, name: 'Azure' },
          { icon: FaDigitalOcean, name: 'DigitalOcean' },
        ]}
      />
      <SkillCategory
        category="CI/CD & DevOps"
        skills={[
          { icon: SiGithubactions, name: 'GitHub Actions' },
          { icon: DiJenkins, name: 'Jenkins' },
          { icon: SiAnsible, name: 'Ansible' },
          { icon: SiTerraform, name: 'Terraform' },
          { icon: FaDocker, name: 'Docker' },
        ]}
      />
      <SkillCategory
        category="Testing Libraries"
        skills={[
          { icon: SiJest, name: 'Jest' },
          { icon: SiPytest, name: 'Pytest' },
        ]}
      />
      <SkillCategory
        category="OS / Version Control and Tools"
        skills={[
          { icon: DiLinux, name: 'Linux' },
          { icon: FaWindows, name: 'Windows' },
          { icon: DiGit, name: 'Git' },
          { icon: DiGithubBadge, name: 'GitHub' },
          { icon: SiPostman, name: 'Postman' },
          { icon: PowerBIIcon, name: 'Power Automate' },
        ]}
      />
    </div>
  );
}
