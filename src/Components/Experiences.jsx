import SecName from './SecName';
import { motion } from 'framer-motion';
import { SiPaloaltonetworks } from 'react-icons/si';
import { AnimatePresence } from 'framer-motion';
import Transition from './Transition';
import { useState } from 'react';
import experiencesData from '../data/experiences.json';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
  FaTools,
} from 'react-icons/fa';

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

const experienceCardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function Experiences() {
  const [expandedExperience, setExpandedExperience] = useState(null);

  const toggleExpanded = id => {
    setExpandedExperience(expandedExperience === id ? null : id);
  };

  return (
    <AnimatePresence mode="wait">
      <Transition key={1} />
      <div
        key={2}
        className="relative flex flex-col items-center w-full h-full pt-6 sm:pt-12 mt-8 sm:mt-16 mb-10 px-4 sm:ml-20 cursor-custom md:mb-20 space-y-8 sm:space-y-14 md:w-3/5 md:pr-28 md:h-full md:mt-0 md:pt-24"
      >
        <SecName secName="Experiences">
          <SiPaloaltonetworks />
        </SecName>

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="flex flex-col items-start self-start justify-center space-y-3 w-full"
        >
          <div className="text-white self-start text-3xl sm:text-4xl w-full md:text-5xl uppercase backdrop-blur-[3px] font-semibold">
            My Professional
            <span className="text-primary3"> Journey</span>
          </div>
        </motion.div>

        {/* Experiences Section */}
        <div className="w-full max-w-5xl mx-auto space-y-8 px-4 sm:px-0">
          {experiencesData.experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial="hidden"
              animate="show"
              variants={experienceCardVariants}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/30 backdrop-blur-xl border border-primary4/40 rounded-3xl overflow-hidden hover:border-primary2  transition-all duration-500 hover:shadow-2xl hover:shadow-primary3/20">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary5/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Card Content */}
                <div className="relative p-6 sm:p-8">
                  {/* Header Section */}
                  <div className="flex flex-col space-y-4 mb-6">
                    {/* Position, Company and Type aligned */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight group-hover:text-primary2 transition-colors duration-300">
                        {experience.position}
                      </h3>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {/* Organization Badge */}
                        <div className="relative group/badge">
                          <div className="flex items-center bg-gradient-to-r from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-primary4/40 shadow-lg hover:shadow-primary3/20 transition-all duration-300 hover:scale-105">
                            <span className="text-white font-bold text-sm sm:text-base tracking-wide">
                              {experience.company}
                            </span>
                          </div>
                          {/* Subtle glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-primary3/10 to-primary2/10 rounded-2xl opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        </div>

                        {/* Internship Badge */}
                        <div className="relative group/badge overflow-hidden">
                          <div className="bg-gradient-to-r from-primary1 via-primary2 to-primary3 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-lg hover:shadow-primary3/30 transition-all duration-300 hover:scale-105 border border-primary3/50">
                            <span className="tracking-wider uppercase">
                              {experience.companyType}
                            </span>
                          </div>
                          {/* Animated background gradient */}
                          <div className="absolute inset-0 bg-gradient-to-r from-primary3 via-primary2 to-primary1 opacity-0 group-hover/badge:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
                        </div>
                      </div>
                    </div>

                    {/* Duration and Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 bg-gray-800/30 px-4 py-2 rounded-xl">
                        <FaCalendarAlt className="text-primary3 text-sm flex-shrink-0" />
                        <span className="text-gray-300 text-sm font-medium">
                          {experience.duration} ({experience.durationShort})
                        </span>
                      </div>
                      <div className="flex items-start gap-3 bg-gray-800/30 px-4 py-2 rounded-xl">
                        <FaMapMarkerAlt className="text-primary3 text-sm flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm font-medium leading-relaxed">
                          {experience.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-gray-300 text-base leading-relaxed bg-gray-800/20 p-4 rounded-xl border border-gray-700/30">
                      {experience.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FaTools className="text-primary3 text-lg" />
                      <h4 className="text-white font-semibold text-lg">
                        Tech Stack
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {experience.tools.map((tool, toolIndex) => (
                        <span
                          key={toolIndex}
                          className="bg-gradient-to-r from-primary5/60 to-primary4/40 text-primary1 px-4 py-2 rounded-full text-sm font-medium border border-primary3/40 hover:border-primary2/60 hover:from-primary4/60 hover:to-primary3/40 transition-all duration-300 hover:scale-105 cursor-default"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
                  <div className="flex justify-center mb-4">
                    <button
                      onClick={() => toggleExpanded(experience.id)}
                      className="flex items-center gap-3 bg-gradient-to-r from-primary4 to-primary5 hover:from-primary3 hover:to-primary4 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary3/30 border border-primary3/40"
                    >
                      <span className="text-sm font-semibold">
                        {expandedExperience === experience.id
                          ? 'Hide Details'
                          : 'View Achievements'}
                      </span>
                      {expandedExperience === experience.id ? (
                        <FaChevronUp className="text-sm" />
                      ) : (
                        <FaChevronDown className="text-sm" />
                      )}
                    </button>
                  </div>

                  {/* Expandable Responsibilities Section */}
                  <AnimatePresence>
                    {expandedExperience === experience.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-primary4/40 pt-6 mt-4">
                          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-primary5/30">
                            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                              <div className="w-2 h-2 bg-primary3 rounded-full"></div>
                              Key Responsibilities & Achievements
                            </h4>
                            <div className="grid gap-4">
                              {experience.responsibilities.map(
                                (responsibility, respIndex) => (
                                  <motion.div
                                    key={respIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      delay: respIndex * 0.1,
                                      duration: 0.5,
                                    }}
                                    className="flex items-start gap-4 group/item"
                                  >
                                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary3 to-primary4 rounded-full flex items-center justify-center mt-1 group-hover/item:scale-110 transition-transform duration-300">
                                      <span className="text-white text-xs font-bold">
                                        {respIndex + 1}
                                      </span>
                                    </div>
                                    <div className="flex-1 bg-gray-800/30 p-4 rounded-xl border border-gray-700/30 group-hover/item:border-primary4/40 transition-colors duration-300">
                                      <p className="text-gray-300 text-sm leading-relaxed font-medium">
                                        {responsibility}
                                      </p>
                                    </div>
                                  </motion.div>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
}
