import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const KNOWN_PATHS = {
  contactme: '/contactme',
  about: '/about',
  projects: '/projects',
  services: '/services',
  home: '/',
};

// Function to detect Arabic characters
const containsArabic = text => {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
};

const TextWithLinks = ({ text }) => {
  if (!text) return null;

  const processText = inputText => {
    let processedText = inputText.replace(/`/g, '');
    const formattedSegments = [];
    let placeholderIndex = 0;

    const boldRegex = /(\*\*\*\*([^*]+)\*\*\*\*|\*\*([^*]+)\*\*)/g;
    processedText = processedText.replace(
      boldRegex,
      (match, _, group1, group2) => {
        const content = group1 || group2;
        const placeholder = `__BOLD_${placeholderIndex}__`;
        formattedSegments[placeholderIndex] = {
          type: 'bold',
          content,
        };
        placeholderIndex++;
        return placeholder;
      },
    );

    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    processedText = processedText.replace(linkRegex, (match, text, url) => {
      const placeholder = `__LINK_${placeholderIndex}__`;
      formattedSegments[placeholderIndex] = {
        type: 'link',
        text,
        url,
      };
      placeholderIndex++;
      return placeholder;
    });

    const result = [];
    let lastIndex = 0;
    let currentKey = 0;

    const placeholderRegex = /__(?:BOLD|LINK)_(\d+)__/g;
    let match;

    while ((match = placeholderRegex.exec(processedText)) !== null) {
      if (match.index > lastIndex) {
        result.push(
          <React.Fragment key={currentKey++}>
            {processedText.substring(lastIndex, match.index)}
          </React.Fragment>,
        );
      }

      const placeholderId = parseInt(match[1], 10);
      const segment = formattedSegments[placeholderId];

      if (segment.type === 'bold') {
        result.push(
          <strong key={currentKey++} className="font-bold">
            {segment.content}
          </strong>,
        );
      } else if (segment.type === 'link') {
        if (
          segment.url.startsWith('http') ||
          segment.url.match(/^[^\s]+(?:\.[^\s]+)+$/)
        ) {
          result.push(
            <a
              key={currentKey++}
              href={segment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center cursor-pointer text-primary5 hover:text-blue-300 underline transition-colors duration-200"
            >
              {segment.text.trim()}
            </a>,
          );
        } else {
          const pathKey = segment.url.startsWith('/')
            ? segment.url.substring(1)
            : segment.url;
          const actualPath = KNOWN_PATHS[pathKey] || segment.url;

          result.push(
            <Link
              key={currentKey++}
              to={actualPath}
              className="inline-flex items-center cursor-pointer text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
            >
              {segment.text.trim()}
            </Link>,
          );
        }
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < processedText.length) {
      result.push(
        <React.Fragment key={currentKey++}>
          {processedText.substring(lastIndex)}
        </React.Fragment>,
      );
    }

    return result;
  };

  const parseStandaloneUrlsAndEmails = elements => {
    return elements.map((element, index) => {
      if (typeof element.props?.children !== 'string') {
        return element;
      }

      const content = element.props.children;
      const urlAndEmailRegex =
        /\b(https?:\/\/[^\s]+)|\b([a-zA-Z0-9][-a-zA-Z0-9]*(\.[a-zA-Z0-9][-a-zA-Z0-9]*)+)\b|\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/g;

      const parts = [];
      let lastIndex = 0;
      let currentKey = 0;
      let match;

      while ((match = urlAndEmailRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push(content.substring(lastIndex, match.index));
        }

        const [matchedText] = match;

        // Check if it's an email
        if (matchedText.includes('@')) {
          parts.push(
            <a
              key={`email-${currentKey++}`}
              href={`mailto:${matchedText}`}
              className="inline-flex items-center cursor-pointer text-blue-400 hover:text-blue-500 underline transition-all  duration-200"
            >
              {matchedText}
            </a>,
          );
        }
        // Handle URLs
        else {
          const formattedUrl =
            matchedText.startsWith('http') || matchedText.startsWith('www')
              ? `https://${matchedText.replace(/^www\./, '')}`
              : matchedText;

          parts.push(
            <a
              key={`url-${currentKey++}`}
              href={formattedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center cursor-pointer text-blue-400 hover:text-blue-500 underline transition-all duration-200 hover:scale-105"
            >
              {matchedText}
            </a>,
          );
        }

        lastIndex = match.index + matchedText.length;
      }

      if (lastIndex < content.length) {
        parts.push(content.substring(lastIndex));
      }

      if (parts.length === 1 && lastIndex === 0) {
        return element;
      }

      return (
        <React.Fragment key={`fragment-${index}`}>
          {parts.map((part, partIndex) =>
            typeof part === 'string' ? (
              <React.Fragment key={`part-${partIndex}`}>{part}</React.Fragment>
            ) : (
              part
            ),
          )}
        </React.Fragment>
      );
    });
  };

  const processedElements = processText(text);
  const finalElements = parseStandaloneUrlsAndEmails(processedElements);

  // Determine if text should be RTL based on Arabic content
  const isArabic = containsArabic(text);
  const textDirection = isArabic ? 'rtl' : 'ltr';

  return (
    <span
      className="inline"
      dir={textDirection}
      style={{
        display: 'inline-block',
        textAlign: isArabic ? 'right' : 'left',
      }}
    >
      {finalElements}
    </span>
  );
};

TextWithLinks.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextWithLinks;
