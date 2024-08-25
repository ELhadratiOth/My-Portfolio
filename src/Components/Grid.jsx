/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa6';

const BouncyCardsFeatures = ({ data }) => {
  return (
    <section className="w-full  text-slate-800">
      <div className="mb-4 grid grid-cols-12 gap-4">
        {data.map((item, index) => (
          <BounceCard
            key={item.id}
            className={`col-span-10 md:col-span-12 bg-black/20 ${
              (index + Math.floor(index / 2)) % 2 === 0
                ? 'xl:col-span-7'
                : 'xl:col-span-5'
            }`}
            data={item}
          />
        ))}
      </div>
    </section>
  );
};

const BounceCard = ({ className, data }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: '-2deg' }}
      transition={{ duration: 0.3 }}
      className={`group relative space-y-4 text-white h-48 cursor-pointer overflow-hidden rounded-2xl backdrop-blur-[2px] bg-primary3/35 py-8 px-5 ${className}`}
    >
      <div className="mx-auto text-center text-3xl md:text-2xl font-semibold">
        <h1>{data.serviceName}</h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex w-fit self-center space-x-3">
          {data.tools.map((Tool, i) => (
            <Tool
              key={`${data.serviceName}-${i}`}
              className="text-2xl  md:text-3xl"
            />
          ))}
        </div>
        {data.link && (
          <div className="self-start absolute bottom-2 left-6 opacity-0 group-hover:opacity-100   duration-700 transition-all w-max z-20 rotate-[1deg]">
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-primary5 to-primary3 px-5 py-2 mt-4 rounded-full border border-white hover:scale-105 hover:border-gray-800 hover:from-primary3 hover:to-primary5 transition-all duration-500"
            >
              <FaGithub className="font-bold text-xl" />
              Check it
            </a>
          </div>
        )}
      </div>
      <div
        style={{
          backgroundImage: `url(${data.imgUrl})`,
          backgroundSize: '99.5% 99.5%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="absolute bottom-0 z-10 left-4 right-4 top-24 translate-y-8 rounded-xl h-full p-4 transition-transform duration-[500ms] group-hover:-translate-y-5 group-hover:rotate-[3deg] rotate-[-3deg]"
      ></div>
    </motion.div>
  );
};

export default BouncyCardsFeatures;
