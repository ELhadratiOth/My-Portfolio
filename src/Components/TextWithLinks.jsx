import React from 'react';

// eslint-disable-next-line react/prop-types
const TextWithLinks = ({ text }) => {
  // Function to process the input text
  const processText = inputText => {
    if (!inputText) return null;

    let processedText = inputText.replace(/`/g, ''); // Remove backticks for URL processing
    const formattedSegments = [];
    let placeholderIndex = 0;

    // Detect and replace bold text (Markdown **bold**)
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

    // Detect plain URLs (https://, www)
    const urlRegex = /\b(https?:\/\/[^\s]+|www\.[^\s]+)\b/g;

    processedText = processedText.replace(urlRegex, match => {
      const placeholder = `__URL_${placeholderIndex}__`;
      formattedSegments[placeholderIndex] = {
        type: 'url',
        url: match.startsWith('www.') ? `https://${match}` : match,
        text: match,
      };
      placeholderIndex++;
      return placeholder;
    });

    const result = [];
    let lastIndex = 0;
    let currentKey = 0;

    const placeholderRegex = /__(?:BOLD|URL)_(\d+)__/g;
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
      } else if (segment.type === 'url') {
        result.push(
          <a
            key={currentKey++}
            href={segment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center cursor-pointer text-blue-400 hover:text-blue-500 underline transition-colors duration-200"
          >
            {segment.text}
          </a>,
        );
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

  return <div>{processText(text)}</div>;
};

export default TextWithLinks;
