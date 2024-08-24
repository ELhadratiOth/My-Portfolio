/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa6';

const BouncyCardsFeatures = ({ data }) => {
  return (
    <section className="w-full py-12 text-slate-800">
      <div className="mb-4 grid grid-cols-12 gap-4">
        {data.map(item => (
          <BounceCard
            key={item.id}
            className={`col-span-12  bg-black/20 ${
              item.id % 2 == 1 ? 'md:col-span-7' : 'md:col-span-5'
            }  `}
            imgUrl={item.imgUrl}
            serviceName={item.serviceName}
            tools={item.tools}
            link={item.link}
          />
        ))}
      </div>
    </section>
  );
};

const BounceCard = ({ className, imgUrl, serviceName, tools, link }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: '-1deg' }}
      className={`group relative text-white h-48 cursor-pointer overflow-hidden rounded-2xl backdrop-blur-[2px] bg-primary3/40 p-8 ${className}`}
    >
      <div className="mx-auto text-center text-3xl font-semibold">
        <h1>{serviceName}</h1>
        <p className="text-base">Tools:</p>
      </div>
      <div
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: '99.5% 99.5%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="absolute bottom-0 left-4 right-4 top-24 translate-y-8 rounded-xl h-full p-4 transition-transform duration-[400ms] group-hover:-translate-y-5 group-hover:rotate-[2deg]"
      ></div>
      <div className="absolute z-10 bottom-4 left-4">
        <div className="flex space-x-3">
          {tools.map((Tool, i) => (
            <Tool
              key={`${serviceName}-${i}`}
              className="text-2xl hover:text-primary2"
            />
          ))}
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-primary5 to-primary3 px-5 py-2 mt-4 rounded-full border border-white hover:scale-105 hover:border-gray-800 hover:from-primary3 hover:to-primary5 transition-all duration-500"
          >
            <FaGithub className="font-bold text-xl" />
            Check it
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default BouncyCardsFeatures;
