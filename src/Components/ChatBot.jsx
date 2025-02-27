import { useState, useEffect, useRef } from 'react';
import { IoMdClose, IoMdInformationCircle } from 'react-icons/io';
import { RiRobot3Fill } from 'react-icons/ri';
import { LuSendHorizontal } from 'react-icons/lu';
import { LuMessageCircle } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import { VscDebugBreakpointConditionalUnverified } from 'react-icons/vsc';

import API from '../API';
import TextWithLinks from './TextWithLinks';

export default function ChatBot() {
  const [isOpening, setIsOpening] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm Othman's AI assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef(null);
  const [showCapabilities, setShowCapabilities] = useState(false);

  const reduceTextSize = () => {
    setIsOpening(false);
  };

  const chatRequest = async () => {
    if (!input.trim() || isSending) return;
    setInput('');
    setIsSending(true);
    setMessages(prev => [...prev, { text: input, isBot: false }]);

    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 120000),
      );

      const response = await Promise.race([
        API.post(
          `/chat`,
          {
            question: input,
          },
          { withCredentials: true },
        ),
        timeoutPromise,
      ]);

      setMessages(prev => [
        ...prev,
        { text: response.data.response, isBot: true },
      ]);
    } catch (error) {
      console.error('Error fetching ', error);
      if (error.message === 'Request timed out') {
        setMessages(prev => [
          ...prev,
          {
            text: 'Sorry, the request timed out. Please try again!',
            isBot: true,
          },
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            text: 'Oops! Something went wrong. Please try again later.',
            isBot: true,
          },
        ]);
      }
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isSending]);

  useEffect(() => {
    setTimeout(() => {
      reduceTextSize();
    }, 2000);
  }, []);

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey && !isSending) {
      e.preventDefault();
      chatRequest();
    }
  };

  const dotVariants = {
    animate: custom => ({
      y: [5, 0, -6, 0, 5],
      transition: {
        duration: 1.4,
        repeat: Infinity,
        delay: custom * 0.4,
        ease: 'linear',
      },
    }),
  };
  const capabilities = [
    "Provide details about Othman's background, experience, and more",
    'Share real-time updates on his projects and portfolio',
    'Give access to his resume, certifications, and achievements',
    'Provide professional contact info and social links',
    'Assist in sending emails to contact Othman by providing a subject, body, and email address',
  ];

  return (
    <div className="fixed bottom-4 md:bottom-9 right-3 md:right-4 z-30 cursor-default rounded-full bg-transparent">
      {showCapabilities && isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-16 left-4 right-4 bg-[#1a1a3a] border border-[#3a3a93] rounded-lg p-4 shadow-lg z-50"
        >
          <h3 className="text-[#8080ff] font-semibold mb-2">
            My Capabilities:
          </h3>
          <ul className="space-y-2 text-white text-sm">
            {capabilities.map((capability, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <VscDebugBreakpointConditionalUnverified className="w-5= h-5 text-[#8080ff]" />
                {capability}
              </motion.li>
            ))}
          </ul>
          <motion.p
            className="text-sm text-primary2 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Check the repo for more details about it{' '}
            <a
              href="https://github.com/ELhadratiOth/Portfolio-AI-Chat-Agent.git"
              target="_blank"
              className="text-primary2 hover:text-primary4 underline duration-150 transition-all"
            >
              Click me
            </a>
          </motion.p>
        </motion.div>
      )}
      {!isOpen ? (
        <motion.button
          onClick={() => {
            setShowCapabilities(false), setIsOpen(true);
          }}
          className={`${
            isOpening ? ' ' : ''
          }bg-primary3 flex justify-center items-center group hover:bg-primary5 text-white p-4 rounded-full shadow-lg transition-all duration-300`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LuMessageCircle className="w-6 h-6 md:w-9 md:h-9 transition-all duration-500" />
          <p
            className={`${
              isOpening
                ? 'text-sm md:text-base ml-3 md:ml-4'
                : 'text-[0rem] ml-0'
            } transition-all duration-500 md:group-hover:text-base md:group-hover:ml-4 group-hover:ml-2 group-hover:text-sm hover:md:text-base font-semibold`}
          >
            Chat With Me
          </p>
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="backdrop-blur-[15px] bg-black/70 border border-[#2a2a4a] rounded-2xl shadow-shad2 w-[320px] h-[550px] md:w-[430px] md:h-[500px] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-[#3a3a93]">
              <div className="flex items-center space-x-3">
                <RiRobot3Fill className="w-6 h-6 text-[#8080ff]" />
                <span className="text-primary1 text-lg font-semibold font-mono">
                  AI Assistant
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowCapabilities(!showCapabilities)}
                  className="text-[#8080ff] hover:text-[#6060ff] transition-colors"
                >
                  <IoMdInformationCircle className="w-7 h-7" />
                </button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoMdClose className="w-7 h-7" />
                </motion.button>
              </div>
            </div>

            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar"
            >
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: message.isBot ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: message.isBot ? -20 : 20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className={`flex ${
                      message.isBot ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={` text-wrap p-3 break-words rounded-2xl text-[0.8rem] ring-2 ring-primary5 shadow-md ${
                        message.isBot
                          ? 'bg-[#222248] w-[85%] text-white ring-primary5 whitespace-pre-wrap break-all'
                          : 'bg-[#8080ff] w-[75%] text-white ring-primary3 '
                      }`}
                    >
                      <p className="text-sm ">
                        <TextWithLinks text={message.text} />
                      </p>
                    </div>
                  </motion.div>
                ))}
                {isSending && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-start px-0.5"
                  >
                    <div className="max-w-[80%] p-3 rounded-2xl bg-[#222248] text-white ring-2 ring-primary5 shadow-md flex items-center space-x-2">
                      <motion.span
                        custom={0}
                        variants={dotVariants}
                        animate="animate"
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.span
                        custom={1}
                        variants={dotVariants}
                        animate="animate"
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.span
                        custom={2}
                        variants={dotVariants}
                        animate="animate"
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-4 border-t border-[#3a3a93]">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#1a1a3a] w-14 text-white placeholder-gray-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8080ff]"
                />
                <button
                  onClick={chatRequest}
                  disabled={!input.trim() || isSending}
                  className="bg-primary3 text-white hover:text-primary4 p-2 rounded-full hover:bg-primary3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LuSendHorizontal className="w-7 h-7" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
