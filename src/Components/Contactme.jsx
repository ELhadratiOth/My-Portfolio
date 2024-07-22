import SecName from './SecName';
import { motion } from 'framer-motion';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import Form from './Form'

const staggerContainer = {
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
    },
  },
};
export default function Contact() {

  return (
    <div className="cursor-custom relative flex flex-col space-y-14 mt-16 items-center md:w-3/5  pl-10 pr-5 md:pl-0 w-full h-full md:h-screen md:pt-32 md:pb-0 pb-12 ">
      <div className="self-start -mt-9 flex justify-start ">
        <SecName secName="Contact Me" service="false">
          <MdOutlineAlternateEmail />
        </SecName>
      </div>

      <motion.div
        className="text-white self-start text-4xl uppercase "
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        Let&apos;s Work{' '}
        <span className="inline-block text-primary1">Together</span>
      </motion.div>
      <div className=" flex flex-col self-start w-full md:w-5/6  justify-start">
        <Form />
      </div>
    </div>
  );
}
