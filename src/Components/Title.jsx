import { useState, useEffect } from 'react';

export default function Title() {
  const words = ['DATA ENGINEER', 'FRONT-END DEV', 'MACHINE LEARNING'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const [timeoutActive, setTimeoutActive] = useState(false);

  const typeSpeed = 500;
  const deleteSpeed = 100;
  const displayDelay = 2000;

  const getRandomChar = () => {
    const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return ALPHA[Math.floor(Math.random() * ALPHA.length)];
  };

  const getRandomChars = length => {
    return Array.from({ length }, () => getRandomChar()).join('');
  };

  useEffect(() => {
    const handleType = () => {
      const currentWord = words[currentWordIndex];
      const currentLength = typedText.length;

      if (isDeleting) {
        if (currentLength > 0) {
          setTypedText(currentWord.substring(0, currentLength - 1));
          setDisplayText(currentWord.substring(0, currentLength - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex(prevIndex => (prevIndex + 1) % words.length);
        }
      } else {
        if (currentLength < currentWord.length) {
          setTypedText(currentWord.substring(0, currentLength + 1));
          const randomChars = getRandomChars(
            currentWord.length - currentLength - 1,
          );
          setDisplayText(
            currentWord.substring(0, currentLength + 1) + randomChars,
          );
        } else {
          if (!timeoutActive) {
            setTimeoutActive(true);
            setTimeout(() => {
              setIsDeleting(true);
              setTimeoutActive(false);
            }, displayDelay);
          }
        }
      }
    };

    if (!timeoutActive) {
      const timeoutId = setTimeout(
        handleType,
        isDeleting ? deleteSpeed : typeSpeed,
      );
      return () => clearTimeout(timeoutId);
    }
  }, [typedText, isDeleting, currentWordIndex, timeoutActive]);

  useEffect(() => {
    const cursorBlink = setInterval(() => setBlink(prev => !prev), 500);
    return () => clearInterval(cursorBlink);
  }, []);

  return (
    <div className="text-center md:text-left  w-5/6 md:mr-72  md:w-1/2 lg:1/3 ">
      <h1>
        <span className="font-bold text-3xl md:text-4xl font-customFont text-white">
          {displayText}
          <span className="text-rose-500">{blink ? '|' : ' '}</span>
        </span>
      </h1>
      <h2 className="md:text-4xl text-xl uppercase font-semibold tracking-wide mt-2">
        hey ,it&apos;s
        <span className="font-semibold text-teal-300  tracking-normal ml-2">
          OTHMAN
        </span>
      </h2>
    </div>
  );
}
