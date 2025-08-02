import { useState, useEffect, useRef } from 'react';
import { IoMdClose, IoMdInformationCircle } from 'react-icons/io';
import { LuSendHorizontal } from 'react-icons/lu';
import { HiMicrophone, HiStop } from 'react-icons/hi2';
import { BsWaveform } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { VscDebugBreakpointConditionalUnverified } from 'react-icons/vsc';

import API from '../API';
import TextWithLinks from './TextWithLinks';
import OrbChatButton from './OrbChatButton';
import OrbHeader from './OrbHeader';

export default function ChatBot() {
  const [isOpening, setIsOpening] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hey 🤖, I'm Othman's AI ChatBot assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef(null);
  const [showCapabilities, setShowCapabilities] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const mediaRecorderRef = useRef(null);

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

  const sendVoiceMessage = async audioBlob => {
    const formData = new FormData();
    formData.append('audio_file', audioBlob, 'audio.wav');

    try {
      setIsSending(true);
      setMessages(prev => [
        ...prev,
        {
          text: 'Voice Message',
          isBot: false,
          isVoice: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 120000),
      );

      const response = await Promise.race([
        API.post(`/voice-chat`, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
        timeoutPromise,
      ]);

      setMessages(prev => [
        ...prev,
        { text: response.data.response, isBot: true },
      ]);
    } catch (error) {
      console.error('Error sending voice message:', error);
      if (error.message === 'Request timed out') {
        setMessages(prev => [
          ...prev,
          {
            text: 'Sorry, the voice request timed out. Please try again!',
            isBot: true,
          },
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            text: 'Sorry, there was an error processing your voice message.',
            isBot: true,
          },
        ]);
      }
    } finally {
      setIsSending(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks = [];

      recorder.ondataavailable = event => {
        audioChunks.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        sendVoiceMessage(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = recorder;
      setMediaRecorder(recorder);
      setIsRecording(true);
      recorder.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setMediaRecorder(null);
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
          }bg-primary3 flex justify-center items-center group hover:bg-primary5 text-white p-2 rounded-full shadow-lg transition-all duration-300`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-10 h-10 md:w-14 md:h-14  transition-all duration-500">
            <OrbChatButton
              size={24}
              hoverIntensity={0.5}
              rotateOnHover={true}
              forceHoverState={false}
            />
          </div>
          <p
            className={`${
              isOpening
                ? 'text-sm md:text-base ml-3 md:ml-4'
                : 'text-[0rem] ml-0'
            } transition-all duration-500 md:group-hover:text-lg md:group-hover:ml-2 group-hover:ml-2 group-hover:text-sm hover:md:text-base font-semibold`}
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
              <div className="flex items-center space-x-1.5">
                <div className="w-11 h-11">
                  <OrbHeader
                    size={10}
                    hoverIntensity={0.3}
                    rotateOnHover={true}
                    forceHoverState={false}
                  />
                </div>
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
                      className={` text-wrap p-3 rounded-2xl text-[0.8rem] ring-2 shadow-md ${
                        message.isBot
                          ? 'bg-[#222248] w-[90%] text-white ring-primary5 '
                          : message.isVoice
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 w-[75%] text-white ring-purple-400 ring-2'
                          : 'bg-[#8080ff] w-[75%] text-white ring-primary3 '
                      }`}
                    >
                      {message.isVoice ? (
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <BsWaveform className="w-5 h-5 text-white animate-pulse" />
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="w-1 bg-white rounded-full"
                                  animate={{
                                    height: [8, 16, 12, 20, 8],
                                  }}
                                  transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {message.text}
                            </span>
                            <span className="text-xs opacity-75">
                              {message.timestamp}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm ">
                          <TextWithLinks text={message.text} />
                        </p>
                      )}
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
                <motion.button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isSending}
                  className={`relative p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isRecording
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30 hover:from-purple-700 hover:to-blue-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    isRecording
                      ? {
                          boxShadow: [
                            '0 0 0 0 rgba(239, 68, 68, 0.4)',
                            '0 0 0 10px rgba(239, 68, 68, 0)',
                            '0 0 0 0 rgba(239, 68, 68, 0.4)',
                          ],
                        }
                      : {}
                  }
                  transition={{
                    boxShadow: { duration: 1.5, repeat: Infinity },
                    scale: { duration: 0.2 },
                  }}
                >
                  {isRecording ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center justify-center"
                    >
                      <HiStop className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center justify-center"
                    >
                      <HiMicrophone className="w-6 h-6" />
                    </motion.div>
                  )}

                  {isRecording && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-red-300"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </motion.button>
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
