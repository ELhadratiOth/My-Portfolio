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

const TextWithLinks = ({ text }) => {
  if (!text) return null;

  const processText = inputText => {
    // Stage 1: Process all formatting patterns with placeholders
    let processedText = inputText;
    const formattedSegments = [];
    let placeholderIndex = 0;

    // Process bold text (****text**** or **text**)
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

    // Process links
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

    // Stage 2: Build components from processed text
    const result = [];
    let lastIndex = 0;
    let currentKey = 0;

    // Regex to match all placeholder patterns
    const placeholderRegex = /__(?:BOLD|LINK)_(\d+)__/g;
    let match;

    while ((match = placeholderRegex.exec(processedText)) !== null) {
      // Add text before the placeholder
      if (match.index > lastIndex) {
        result.push(
          <React.Fragment key={currentKey++}>
            {processedText.substring(lastIndex, match.index)}
          </React.Fragment>,
        );
      }

      // Get the placeholder index and corresponding segment
      const placeholderId = parseInt(match[1], 10);
      const segment = formattedSegments[placeholderId];

      if (segment.type === 'bold') {
        result.push(
          <strong key={currentKey++} className="font-bold">
            {segment.content}
          </strong>,
        );
      } else if (segment.type === 'link') {
        // Handle external URLs
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
          // Handle internal links
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

    // Add any remaining text after the last placeholder
    if (lastIndex < processedText.length) {
      result.push(
        <React.Fragment key={currentKey++}>
          {processedText.substring(lastIndex)}
        </React.Fragment>,
      );
    }

    return result;
  };

  // Parse standalone URLs that aren't in Markdown format
  const parseStandaloneUrls = elements => {
    return elements.map((element, index) => {
      // Only process string content in Fragment elements
      if (typeof element.props?.children !== 'string') {
        return element;
      }

      const content = element.props.children;
      const urlRegex =
        /\b(https?:\/\/[^\s]+)|\b([a-zA-Z0-9][-a-zA-Z0-9]*(\.[a-zA-Z0-9][-a-zA-Z0-9]*)+)\b/g;

      const parts = [];
      let lastIndex = 0;
      let currentKey = 0;
      let urlMatch;

      while ((urlMatch = urlRegex.exec(content)) !== null) {
        // Add text before the URL
        if (urlMatch.index > lastIndex) {
          parts.push(content.substring(lastIndex, urlMatch.index));
        }

        // Get the matched URL
        const [matchedUrl] = urlMatch;
        const formattedUrl = matchedUrl.startsWith('http')
          ? matchedUrl
          : `https://${matchedUrl}`;

        // Add the URL as a link
        parts.push(
          <a
            key={`url-${currentKey++}`}
            href={formattedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center cursor-pointer text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
          >
            {matchedUrl}
          </a>,
        );

        lastIndex = urlMatch.index + matchedUrl.length;
      }

      // Add any remaining text
      if (lastIndex < content.length) {
        parts.push(content.substring(lastIndex));
      }

      // If we didn't find any URLs, return the original element
      if (parts.length === 1 && lastIndex === 0) {
        return element;
      }

      // Otherwise, return the mix of text and URL links
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

  // Process the text and then handle standalone URLs
  const processedElements = processText(text);
  const finalElements = parseStandaloneUrls(processedElements);

  return <span className="inline">{finalElements}</span>;
};

TextWithLinks.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextWithLinks;
