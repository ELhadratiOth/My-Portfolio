import { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiRobot3Fill } from 'react-icons/ri';
import { LuSendHorizontal } from 'react-icons/lu';
import { LuMessageCircle } from 'react-icons/lu';
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
  const reduceTextSize = () => {
    setIsOpening(false);
  };

  const chatRequest = async () => {
    if (!input.trim()) return;
    setInput('');

    setMessages(prev => [...prev, { text: input, isBot: false }]);

    try {
      const response = await API.post(
        `/chat`,
        {
          question: input,
        },
        { withCredentials: true },
      );
      setMessages(prev => [
        ...prev,
        { text: response.data.response, isBot: true },
      ]);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      reduceTextSize();
    }, 3000);
  }, []);

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      chatRequest();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 cursor-pointer rounded-full bg-primary1  shadow-shad  ">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`bg-transparent flex   justify-center items-center  group hover:bg-[#3a3a6a] text-white p-4 rounded-full shadow-lg transition-all duration-300 `}
        >
          <LuMessageCircle className="w-6 h-6 transition-all duration-500 " />
          <p
            className={`${
              isOpening ? 'text-base ml-4' : 'text-[0rem] ml-0'
            }  transition-all duration-500 group-hover:text-base group-hover:ml-4 font-semibold`}
          >
            Chat With Me
          </p>
        </button>
      ) : (
        <div className="bg-[#0a0a1f] border border-[#2a2a4a] rounded-2xl shadow-2xl w-[350px] h-[500px] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-[#2a2a4a]">
            <div className="flex items-center space-x-3">
              <RiRobot3Fill className="w-6 h-6 text-[#8080ff]" />
              <span className="text-[#8080ff] font-mono">AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <IoMdClose className="w-6 h-6 hover:rotate-90 duration-200 transition-all" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4  scrollbar">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isBot ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-[#2a2a4a] text-white'
                      : 'bg-[#8080ff] text-white'
                  }`}
                >
                  <TextWithLinks text={message.text} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[#2a2a4a]">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-[#1a1a3a] text-white placeholder-gray-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8080ff]"
              />
              <button
                onClick={chatRequest}
                disabled={!input.trim()}
                className="bg-[#8080ff] text-white p-2 rounded-full hover:bg-[#6060ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LuSendHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
