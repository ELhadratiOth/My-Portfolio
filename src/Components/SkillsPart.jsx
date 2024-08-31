/* eslint-disable react/prop-types */
import { FaHtml5, FaReact, FaJava, FaPython, FaWindows } from 'react-icons/fa';
import { IoLogoCss3 } from 'react-icons/io';
import { IoLogoJavascript } from 'react-icons/io5';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { RiTailwindCssFill } from 'react-icons/ri';
import { SiFlask, SiOracle, SiMysql } from 'react-icons/si';
import { DiGit, DiGithubBadge, DiLinux, DiBootstrap } from 'react-icons/di';
import { BiLogoPostgresql } from 'react-icons/bi';
import { SiFastapi } from 'react-icons/si';
import { SiShadcnui } from 'react-icons/si';
import { SiPostman } from 'react-icons/si';

import { motion } from 'framer-motion';
import CIcon from './Ccompo';

const SkillCategory = ({ category, skills }) => (
  <motion.div
    className="flex flex-col justify-center items-start space-y-2"
    initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.7, delay: 0.2 }}
  >
    <div className="flex flex-col justify-center md:w-3/3 md:w-max md:flex-row space-y-2 mb-3 md:mb-0 text-white font-semibold">
      <div className="md:text-lg md:pt-2 md:mr-2">{category} :</div>
      <div className="text-purple-100 space-x-5 md:space-y-0 md:space-x-3 xl:space-x-5 flex items-center text-2xl w-max">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center hover:text-primary1 transition-colors duration-300"
            whileHover={{
              scale: 1.1,
              textShadow: '1px 2px 9px #000',
            }}
          >
            <skill.icon />

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
    <div className="space-y-2">
      <SkillCategory
        category="Programming Languages"
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
        category="Databases ( SQL / PlSql )"
        skills={[
          { icon: SiOracle, name: 'Oracle' },
          { icon: SiMysql, name: 'MySQL' },
          { icon: BiLogoPostgresql, name: 'PostgreSQL' },
        ]}
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
        ]}
      />
    </div>
  );
}
