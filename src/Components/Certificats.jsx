/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const dataCerifs = [
  {
    id: 3,

    nameCertif: 'Introduction to Databases',
    link: 'https://www.coursera.org/account/accomplishments/verify/JFVKGT43NWH3',
    date: '2023',
    provider: 'Meta - Coursera',
  },
  {
    id: 2,
    nameCertif: 'Java Programming: Solving Problems with Software',
    link: 'https://www.coursera.org/account/accomplishments/verify/THZP9WU2S58X',
    date: '2024',
    provider: 'Duke University - Coursera',
  },
  {
    id: 3,

    nameCertif: 'Database Structures and Management with MySQL',
    link: 'https://www.coursera.org/account/accomplishments/verify/RY2L6TDC8CPS',
    date: '2024',
    provider: 'Meta - Coursera',
  },
  {
    id: 4,

    nameCertif: 'Hands-on Introduction to Linux Commands and Shell Scripting',
    link: 'https://www.coursera.org/account/accomplishments/verify/SKDEERGMFMXA',
    date: '2024',
    provider: 'IBM - Coursera',
  },
  {
    id: 5,

    nameCertif: 'Getting Started with Git and GitHub',
    link: 'https://www.coursera.org/account/accomplishments/verify/C9GZALZCQ7XT',
    date: '2024',
    provider: 'IBM - Coursera',
  },
  {
    id: 6,

    nameCertif: 'Python for Beginners',
    link: 'https://simpli-web.app.link/e/6AcNpCdPhLb',
    date: '2024',
    provider: 'Simplilearn',
  },
];

const Certificate = ({ nameCertif, link, date, provider }) => (
  <motion.div className="flex flex-col space-y-2 w-max text-purple-100">
    <p className="flex  text-purple-100">
      <span className="font-bold">{nameCertif} </span>- {provider} - {date}
      <a
        title="Check it"
        className="text-primary3 ml-3 text-xl transition-colors duration-300 hover:text-primary5"
        href={link}
        target="_blank"
      >
        <FaExternalLinkAlt />{' '}
      </a>
    </p>
  </motion.div>
);

export default function SkillsPart() {
  return (
    <div className="space-y-2">
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
