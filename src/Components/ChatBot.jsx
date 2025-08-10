import { useState, useEffect, useRef } from 'react';
import { IoMdClose, IoMdInformationCircle } from 'react-icons/io';
import { LuSendHorizontal } from 'react-icons/lu';
import { HiMicrophone, HiStop, HiPaperClip } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import { VscDebugBreakpointConditionalUnverified } from 'react-icons/vsc';
import { RiVoiceprintFill } from 'react-icons/ri';
import {
  BsCardText,
  BsThreeDotsVertical,
  BsDownload,
  BsPerson,
  BsBell,
  BsFullscreen,
  BsFullscreenExit,
  BsPaperclip,
} from 'react-icons/bs';
import { MdLogin, MdLogout } from 'react-icons/md';

import API from '../API';
import TextWithLinks from './TextWithLinks';
import OrbChatButton from './OrbChatButton';
import OrbHeader from './OrbHeader';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef(null);
  const [showCapabilities, setShowCapabilities] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const mediaRecorderRef = useRef(null);

  const chatRequest = async () => {
    if (!input.trim() || isSending) return;

    const currentInput = input;
    setInput('');
    setIsSending(true);

    if (!hasStartedChat) {
      setHasStartedChat(true);
      setMessages([
        {
          text: "Hey 👋, I'm Othman's AI ChatBot assistant. How can I help you today?",
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    }

    setMessages(prev => [
      ...prev,
      {
        text: currentInput,
        isBot: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isSending: true, 
      },
    ]);

    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 120000),
      );

      const response = await Promise.race([
        API.post(
          `/chat`,
          {
            question: currentInput,
          },
          { withCredentials: true },
        ),
        timeoutPromise,
      ]);

      setMessages(prev => {
        const updatedMessages = [...prev];
        const lastMessageIndex = updatedMessages.length - 1;
        if (updatedMessages[lastMessageIndex].isSending) {
          updatedMessages[lastMessageIndex] = {
            ...updatedMessages[lastMessageIndex],
            isSending: false,
          };
        }
        return [
          ...updatedMessages,
          {
            text: response.data.response,
            isBot: true,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ];
      });
    } catch (error) {
      console.error('Error fetching ', error);

      setMessages(prev => {
        const updatedMessages = [...prev];
        const lastMessageIndex = updatedMessages.length - 1;
        if (updatedMessages[lastMessageIndex].isSending) {
          updatedMessages[lastMessageIndex] = {
            ...updatedMessages[lastMessageIndex],
            isSending: false,
          };
        }

        const errorMessage =
          error.message === 'Request timed out'
            ? 'Sorry, the request timed out. Please try again!'
            : 'Oops! Something went wrong. Please try again later.';

        return [
          ...updatedMessages,
          {
            text: errorMessage,
            isBot: true,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ];
      });
    } finally {
      setIsSending(false);
    }
  };

  const sendVoiceMessage = async audioBlob => {
    const formData = new FormData();
    formData.append('audio_file', audioBlob, 'audio.wav');

    try {
      setIsSending(true);

      // If this is the first message, initialize the chat
      if (!hasStartedChat) {
        setHasStartedChat(true);
        // Add welcome message first
        setMessages([
          {
            text: "Hey 👋, I'm Othman's AI ChatBot assistant. How can I help you today?",
            isBot: true,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]);
      }

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
        {
          text: response.data.response,
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
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

  // Close settings dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (showSettings && !event.target.closest('.settings-dropdown')) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow new line with Shift+Enter
        return;
      } else if (!isSending) {
        // Send message with Enter
        e.preventDefault();
        chatRequest();
      }
    }
  };

  // New utility functions for advanced features
  const downloadTranscript = () => {
    const transcript = messages
      .map(msg => {
        const sender = msg.isBot ? 'ChatBot Assistant' : 'You';
        const timestamp = msg.timestamp || new Date().toLocaleTimeString();
        return `[${timestamp}] ${sender}: ${msg.text}`;
      })
      .join('\n');

    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-transcript-${
      new Date().toISOString().split('T')[0]
    }.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleLogin = () => {
    // Simple mock login - in real app this would integrate with auth system
    const email = prompt('Enter your email to login:');
    if (email && email.includes('@')) {
      setUserEmail(email);
      setIsLoggedIn(true);
      setMessages(prev => [
        ...prev,
        {
          text: `Welcome back ${
            email.split('@')[0]
          }! You're now logged in for a personalized experience.`,
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setMessages(prev => [
      ...prev,
      {
        text: "You've been logged out. Feel free to continue our conversation!",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
  };

  const provideContactDetails = () => {
    const details = prompt('Enter your contact details (name, email, phone):');
    if (details && details.trim()) {
      setMessages(prev => [
        ...prev,
        {
          text: `Contact details received: ${details}`,
          isBot: false,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
        {
          text: 'Thank you for providing your contact details! This will help me assist you more effectively.',
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    }
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    const status = !notifications ? 'enabled' : 'disabled';
    setMessages(prev => [
      ...prev,
      {
        text: `Notifications have been ${status}.`,
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
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
    <div className="fixed bottom-4 md:bottom-9 right-3 md:right-4 z-30 cursor-default">
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

      {/* Help text that appears above the button */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-20 -left-40 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg shadow-lg mb-2 whitespace-nowrap"
        >
          <div className="text-sm font-medium">Need help?</div>
          <div className="text-xs opacity-90">Chat with our AI assistant</div>
          <div className="absolute -bottom-1 right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-600"></div>
        </motion.div>
      )}

      {!isOpen ? (
        <motion.button
          onClick={() => {
            setShowCapabilities(false), setIsOpen(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center justify-center p-3">
            <div className="relative">
              <div className="absolute inset-0 w-12 h-12 rounded-full">
                <OrbChatButton
                  size={12}
                  hoverIntensity={0.3}
                  rotateOnHover={true}
                  forceHoverState={false}
                />
              </div>
              <div className="relative z-10 flex items-center justify-center w-12 h-12">
                <div className="flex space-x-1">
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0,
                    }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.3,
                    }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.6,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Expanding text on hover like original design */}
          <motion.div
            className="absolute left-0 top-0 h-full flex items-center overflow-hidden"
            initial={{ width: 0, opacity: 0 }}
            whileHover={{ width: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pl-4 pr-16 whitespace-nowrap">
              <p className="text-sm font-semibold">Chat With Me</p>
            </div>
          </motion.div>

          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-purple-300 opacity-50"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`backdrop-blur-[15px] bg-black/70 border border-primary4/60 rounded-2xl shadow-shad2 flex flex-col overflow-hidden transition-all duration-500 ease-in-out transform ${
              isMaximized
                ? 'fixed inset-4 w-auto h-auto z-50 scale-100'
                : hasStartedChat
                ? 'w-[350px] h-[580px] md:w-[450px] md:h-[520px] scale-100'
                : 'w-[350px] h-auto md:w-[450px] scale-95 hover:scale-100' // Smaller initial size with hover effect
            }`}
          >
            {/* Enhanced header with your brand gradient */}
            <div className="bg-gradient-to-r from-primary1 via-primary2 to-primary3 p-4 relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary1/95 via-primary2/95 to-primary3/95">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-1000"></div>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full p-1 backdrop-blur-sm border border-white/30 shadow-lg">
                    <OrbHeader
                      size={8}
                      hoverIntensity={0.3}
                      rotateOnHover={true}
                      forceHoverState={false}
                    />
                  </div>
                  <div>
                    <div className="text-white text-lg font-semibold font-customFont drop-shadow-sm">
                      AI Assistant 🤖
                    </div>
                    <div className="text-white/90 text-sm font-myFont">
                      {hasStartedChat
                        ? 'Online • Ready to help'
                        : 'What can I help you with?'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {hasStartedChat && (
                    /* Settings button with dropdown */
                    <div className="relative settings-dropdown">
                      <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="text-white/80 hover:text-white transition-all duration-200 p-2 rounded-full hover:bg-white/20 hover:scale-105"
                        title="Chat settings"
                      >
                        <BsThreeDotsVertical className="w-5 h-5" />
                      </button>

                      {/* Settings dropdown menu */}
                      <AnimatePresence>
                        {showSettings && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="absolute right-0 top-12 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-primary4/50 py-2 min-w-[240px] z-50 overflow-hidden"
                          >
                            {/* Chat capabilities */}
                            <button
                              onClick={() => {
                                setShowCapabilities(!showCapabilities);
                                setShowSettings(false);
                              }}
                              className="w-full px-4 py-3 text-left text-gray-200 hover:bg-primary1/20 hover:text-white flex items-center space-x-3 transition-all duration-200"
                            >
                              <IoMdInformationCircle className="w-4 h-4 text-primary1" />
                              <span className="text-sm font-medium font-myFont">
                                Chat capabilities
                              </span>
                            </button>

                            <div className="border-t border-primary4/30 my-1"></div>

                            {/* Provide contact details */}
                            <button
                              onClick={() => {
                                provideContactDetails();
                                setShowSettings(false);
                              }}
                              className="w-full px-4 py-3 text-left text-gray-200 hover:bg-primary1/20 hover:text-white flex items-center space-x-3 transition-all duration-200"
                            >
                              <BsPerson className="w-4 h-4 text-primary1" />
                              <span className="text-sm font-medium font-myFont">
                                Provide contact details
                              </span>
                            </button>

                            {/* Login/Logout */}
                            {!isLoggedIn ? (
                              <button
                                onClick={() => {
                                  handleLogin();
                                  setShowSettings(false);
                                }}
                                className="w-full px-4 py-3 text-left text-gray-200 hover:bg-primary1/20 hover:text-white flex items-center space-x-3 transition-all duration-200"
                              >
                                <MdLogin className="w-4 h-4 text-primary2" />
                                <span className="text-sm font-medium font-myFont">
                                  Log in
                                </span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  handleLogout();
                                  setShowSettings(false);
                                }}
                                className="w-full px-4 py-3 text-left text-gray-200 hover:bg-primary1/20 hover:text-white flex items-center space-x-3 transition-all duration-200"
                              >
                                <MdLogout className="w-4 h-4 text-primary2" />
                                <span className="text-sm font-medium font-myFont">
                                  Log out ({userEmail.split('@')[0]})
                                </span>
                              </button>
                            )}

                            <div className="border-t border-primary4/30 my-1"></div>

                            {/* Download transcript */}
                            <button
                              onClick={() => {
                                downloadTranscript();
                                setShowSettings(false);
                              }}
                              className="w-full px-4 py-3 text-left text-gray-200 hover:bg-primary1/20 hover:text-white flex items-center space-x-3 transition-all duration-200"
                            >
                              <BsDownload className="w-4 h-4 text-primary3" />
                              <span className="text-sm font-medium font-myFont">
                                Download chat transcript
                              </span>
                            </button>

                            {/* Maximize window */}
                            <button
                              onClick={() => {
                                toggleMaximize();
                                setShowSettings(false);
                              }}
                              className="w-full px-4 py-3 text-left text-gray-200 hover:bg-primary1/20 hover:text-white flex items-center space-x-3 transition-all duration-200"
                            >
                              {isMaximized ? (
                                <BsFullscreenExit className="w-4 h-4 text-primary3" />
                              ) : (
                                <BsFullscreen className="w-4 h-4 text-primary3" />
                              )}
                              <span className="text-sm font-medium font-myFont">
                                {isMaximized
                                  ? 'Exit fullscreen'
                                  : 'Maximize window'}
                              </span>
                            </button>

                            <div className="border-t border-primary4/30 my-1"></div>

                            {/* Notifications toggle */}
                            <button
                              onClick={() => {
                                toggleNotifications();
                                setShowSettings(false);
                              }}
                              className="w-full px-4 py-3 text-left text-gray-200 hover:bg-primary1/20 hover:text-white flex items-center space-x-3 transition-all duration-200"
                            >
                              <BsBell
                                className={`w-4 h-4 ${
                                  notifications
                                    ? 'text-primary1'
                                    : 'text-gray-500'
                                }`}
                              />
                              <span className="text-sm font-medium font-myFont">
                                Notifications {notifications ? 'on' : 'off'}
                              </span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    title="Close chat"
                  >
                    <IoMdClose className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Quick topic pills - only show if chat hasn't started */}
              {!hasStartedChat && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="relative z-10 mt-4 flex flex-wrap gap-2"
                >
                  {['portfolio', 'projects', 'skills', 'contact', 'resume'].map(
                    (topic, index) => (
                      <motion.button
                        key={topic}
                        onClick={() => setInput(`Tell me about your ${topic}`)}
                        className="px-3 py-1.5 bg-white/20 hover:bg-primary1/30 text-white text-xs rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-primary1/50 font-myFont"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                      >
                        {topic}
                      </motion.button>
                    ),
                  )}
                </motion.div>
              )}
            </div>

            {/* Messages area - only show if chat has started */}
            {hasStartedChat && (
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
                        className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-lg transition-all duration-300 ${
                          message.isBot
                            ? 'bg-gray-900/90 backdrop-blur-sm border border-primary4/40 text-gray-100'
                            : 'bg-gradient-to-r from-primary1 via-primary2 to-primary3 text-white shadow-shad'
                        }`}
                      >
                        {message.isVoice ? (
                          <div className="flex items-center space-x-3">
                            <RiVoiceprintFill className="w-5 h-5 flex-shrink-0 animate-pulse" />
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {message.text}
                              </span>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs opacity-75">
                                  {message.timestamp}
                                </span>
                                {message.isSending && (
                                  <span className="text-xs animate-pulse">
                                    Sending...
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : message.isBot ? (
                          <div>
                            <TextWithLinks text={message.text} />
                            {message.timestamp && (
                              <div className="text-xs text-gray-500 mt-2">
                                {message.timestamp}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-start space-x-3">
                            <BsCardText className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div className="flex flex-col">
                              <div>
                                <TextWithLinks text={message.text} />
                              </div>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="text-xs opacity-90">
                                  {message.timestamp}
                                </span>
                                {message.isSending && (
                                  <span className="text-xs animate-pulse">
                                    Sending...
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
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
                      className="flex justify-start"
                    >
                      <div className="max-w-[60%] p-4 rounded-2xl bg-gray-900/90 backdrop-blur-sm border border-primary4/40 text-gray-100 shadow-lg flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary1/20 rounded-full flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            className="w-4 h-4 border-2 border-primary1 border-t-transparent rounded-full"
                          />
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-gray-300 font-myFont">
                            AI is typing
                          </span>
                          <motion.span
                            custom={0}
                            variants={dotVariants}
                            animate="animate"
                            className="w-1 h-1 bg-primary1 rounded-full"
                          />
                          <motion.span
                            custom={1}
                            variants={dotVariants}
                            animate="animate"
                            className="w-1 h-1 bg-primary2 rounded-full"
                          />
                          <motion.span
                            custom={2}
                            variants={dotVariants}
                            animate="animate"
                            className="w-1 h-1 bg-primary3 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Input area - always show */}
            <div className="bg-gradient-to-r from-gray-800/95 to-gray-900/95 backdrop-blur-md p-4 border-t border-primary4/30">
              {/* Quick capabilities pills - only show if chat hasn't started */}
              {!hasStartedChat && showCapabilities && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4 p-3 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-primary4/40 overflow-hidden"
                >
                  <div className="text-sm text-gray-200 font-medium mb-2 font-customFont">
                    What I can help with:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 font-myFont">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary1 rounded-full"></span>
                      <span>Portfolio overview</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary2 rounded-full"></span>
                      <span>Project details</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary3 rounded-full"></span>
                      <span>Skills & experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary1 rounded-full"></span>
                      <span>Contact information</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Capabilities panel for existing chats */}
              {hasStartedChat && showCapabilities && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4 p-3 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-primary4/40 overflow-hidden"
                >
                  <div className="text-sm text-gray-200 font-medium mb-2 font-customFont">
                    💬 Chat capabilities:
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs text-gray-300 font-myFont">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary1 rounded-full"></span>
                      <span>Voice messages & text responses</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary2 rounded-full"></span>
                      <span>Download chat transcripts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary3 rounded-full"></span>
                      <span>File attachments & contact sharing</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex items-end space-x-3">
                {/* File attachment button */}
                <motion.label
                  className="text-gray-400 hover:text-primary1 transition-all duration-300 p-2 rounded-full hover:bg-primary1/10 cursor-pointer group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Attach file"
                >
                  <HiPaperClip className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </motion.label>

                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={
                      hasStartedChat
                        ? 'Type your message...'
                        : "Ask me anything about Othman's work..."
                    }
                    disabled={isSending}
                    rows={1}
                    className="w-full bg-gray-800/60 text-gray-100 placeholder-gray-400 rounded-2xl px-4 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-primary1 focus:border-transparent disabled:opacity-50 resize-none overflow-hidden border border-primary4/50 backdrop-blur-sm font-myFont transition-all duration-300 hover:border-primary1/60"
                    style={{
                      minHeight: '48px',
                      maxHeight: '120px',
                    }}
                    onInput={e => {
                      e.target.style.height = 'auto';
                      e.target.style.height =
                        Math.min(e.target.scrollHeight, 120) + 'px';
                    }}
                  />

                  {/* Send button inside input */}
                  <motion.button
                    onClick={chatRequest}
                    disabled={!input.trim() || isSending}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary1 via-primary2 to-primary3 text-white p-2 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-shad shadow-lg group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSending ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <LuSendHorizontal className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                    )}
                  </motion.button>
                </div>

                {/* Voice recording button */}
                <motion.button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isSending}
                  className={`relative p-2 rounded-full transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isRecording
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600'
                      : 'bg-gradient-to-r from-primary1 via-primary2 to-primary3 text-white shadow-lg shadow-primary1/30 hover:shadow-shad'
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
                  }}
                >
                  {isRecording ? (
                    <HiStop className="w-5 h-5" />
                  ) : (
                    <HiMicrophone className="w-5 h-5" />
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
              </div>

              {/* Professional footer */}
              <div className="mt-3 text-xs text-gray-400 text-center font-myFont">
                Press Enter to send • Shift + Enter for new line
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
