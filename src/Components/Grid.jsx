/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa6';

const BouncyCardsFeatures = ({ data }) => {
  return (
    <section className="w-full  text-slate-800 ">
      <div className="grid grid-cols-12 gap-5">
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
      initial={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
      whileInView={{
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, delay: 0.2 },
      }}
      whileHover={{
        scale: 0.95,
        transition: { duration: 0.4 },
      }}
      className={`group hover:shadow-shad2  relative space-y-4 text-white h-48 cursor-pointer overflow-hidden rounded-2xl backdrop-blur-[2px] bg-primary3/35  md:py-8 px-5 ${className}`}
    >
      <div className="mx-auto  group-hover:md:text-2xl  group-hover:text-xl  text-xl text-center   md:text-2xl font-semibold">
        <h1 className="group-hover:md:-translate-y-3 pt-4  md:pt-0  transition-all duration-500 ">
          {data.serviceName}
        </h1>
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
              className="flex gap-3 cursor-pointer text-white text-sm md:text-base font-semibold bg-gradient-to-r from-primary5 to-primary3 px-5 py-1.5 mt-4 rounded-full border border-white hover:scale-105 hover:border-gray-800 hover:from-primary3 hover:to-primary5 transition-all duration-500"
            >
              <FaGithub className="font-bold  text-base md:text-xl" />
              Check it
            </a>
          </div>
        )}
      </div>
      <div
        style={{
          backgroundImage: `url(${data.imgUrl})`,
          backgroundSize: '99% 99%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="absolute bottom-0 z-10 left-4 right-4 top-16  md:top-24 translate-y-8 rounded-xl h-full p-4 transition-transform duration-[500ms] group-hover:md:-translate-y-14 group-hover:-translate-y-6 group-hover:rotate-[3deg] rotate-[-3deg]"
      ></div>
    </motion.div>
  );
};

export default BouncyCardsFeatures;
