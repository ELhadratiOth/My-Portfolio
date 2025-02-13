/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

import CodSofPDF from '../assets/docs/CodSoft.pdf';
import GenAI from '../assets/docs/GenAi.pdf';
import Ai from '../assets/docs/Ai.pdf';
import AgenticAI from '../assets/docs/HuggingFace.pdf';

const dataCerifs = [
  {
    id: 8,
    nameCertif: 'OCI 2024 Generative AI Cerified Professional ',
    link: GenAI,
    date: '2025',
    provider: 'Oracle',
  },
  {
    id: 9,
    nameCertif: 'Hugging Face Agents Course ',
    link: AgenticAI,
    date: '2025',
    provider: 'Hugging Face',
  },
  {
    id: 9,
    nameCertif: 'OCI 2024 Cerified AI Foundations Associate',
    link: Ai,
    date: '2025',
    provider: 'Oracle',
  },
  {
    id: 0,
    nameCertif: 'Machine Learning Specialization',
    link: 'https://www.coursera.org/account/accomplishments/specialization/KIZAQJBAYH54',
    date: '2024',
    provider: 'Stanford University - Coursera',
  },
  {
    id: 6,
    nameCertif: 'Python for Beginners',
    link: 'https://simpli-web.app.link/e/6AcNpCdPhLb',
    date: '2024',
    provider: 'Simplilearn',
  },
  {
    id: 2,
    nameCertif: 'Java Programming: Solving Problems',
    link: 'https://www.coursera.org/account/accomplishments/verify/THZP9WU2S58X',
    date: '2024',
    provider: 'Duke University - Coursera',
  },
  {
    id: 5,
    nameCertif: 'Getting Started with Git and GitHub',
    link: 'https://www.coursera.org/account/accomplishments/verify/C9GZALZCQ7XT',
    date: '2024',
    provider: 'IBM - Coursera',
  },
  {
    id: 4,
    nameCertif: 'Introduction to Linux Commands and Shell Scripting',
    link: 'https://www.coursera.org/account/accomplishments/verify/SKDEERGMFMXA',
    date: '2024',
    provider: 'IBM - Coursera',
  },
  {
    id: 7,
    nameCertif: 'Python Certificate',
    link: CodSofPDF,
    date: '2024',
    provider: 'CodSoft',
  },
  {
    id: 3,
    nameCertif: 'Database Structures and Management with MySQL',
    link: 'https://www.coursera.org/account/accomplishments/verify/RY2L6TDC8CPS',
    date: '2024',
    provider: 'Meta - Coursera',
  },
  {
    id: 1,
    nameCertif: 'Introduction to Databases',
    link: 'https://www.coursera.org/account/accomplishments/verify/JFVKGT43NWH3',
    date: '2023',
    provider: 'Meta - Coursera',
  },
];

const Certificate = ({ nameCertif, link, date, provider }) => (
  <motion.div
    className="flex flex-col md:space-y-2 w-full text-purple-100"
    initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.7, delay: 0.2 }}
  >
    <div className="flex flex-col lg:flex-row lg:justify-start lg:items-center space-y-1 lg:space-x-1 mb-3 lg:mb-0 text-purple-100">
      <div className="font-semibold text-base md:text-lg mr-1 w-[87%] md:w-auto">
        {nameCertif}:
      </div>
      {provider.length < 25 ? (
        <div className="flex md:justify-center items-center font-normal text-sm md:text-base  ">
          <div className="mb-0.5 text-purple-50">
            {provider} - {date}
          </div>
          <a
            title="Check it"
            className="inline-block text-primary3 ml-3 mb-0.5 text-xl transition-colors duration-300 hover:text-primary5"
            href={link}
            target="_blank"
          >
            <FaExternalLinkAlt />
          </a>
        </div>
      ) : (
        <div className="flex md:justify-center items-center font-normal text-[0.82rem] md:text-base ">
          <div className="mb-0.5 text-purple-50">
            {provider} - {date}
          </div>
          <a
            title="Check it"
            className="inline-block text-primary3 ml-3 mb-0.5 text-xl transition-colors duration-300 hover:text-primary5"
            href={link}
            target="_blank"
          >
            <FaExternalLinkAlt />
          </a>
        </div>
      )}
    </div>
  </motion.div>
);

export default function SkillsPart() {
  return (
    <div className="space-y-3">
      {dataCerifs.map(elem => (
        <Certificate
          key={elem.id}
          nameCertif={elem.nameCertif}
          link={elem.link}
          date={elem.date}
          provider={elem.provider}
        />
      ))}
    </div>
  );
}
