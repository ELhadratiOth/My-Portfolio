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

  // Split by Markdown-style links or standalone URLs, but not generic slashes
  const segments = text.split(
    /(\[.*?\]\([^)]*\)?|\s*(?:https?:\/\/)?[^\s]+(?:\.[^\s]+)+)/g,
  );

  return (
    <span className="inline">
      {segments.map((segment, index) => {
        // Match Markdown-style link: [text](/path) or [text](http...)
        const markdownLinkMatch = segment.match(/^\[(.*?)\]\(([^)]*)\)?$/);
        // Match external URL (e.g., www.example.com or http://example.com)
        const externalUrlMatch =
          /^\s*(?:https?:\/\/)?[^\s]+(?:\.[^\s]+)+$/.test(segment);

        // Case 1: Plain text (including slash-separated data like "ML/AI")
        if (!markdownLinkMatch && !externalUrlMatch) {
          return <React.Fragment key={index}>{segment}</React.Fragment>;
        }

        // Case 2: Markdown-style link
        if (markdownLinkMatch) {
          let [, linkText, linkPath] = markdownLinkMatch;
          linkText = linkText.trim();
          const cleanPath = linkPath.trim();

          // Check if the Markdown link is an external URL
          if (
            cleanPath.startsWith('http') ||
            cleanPath.match(/^[^\s]+(?:\.[^\s]+)+$/)
          ) {
            const url = cleanPath.startsWith('http')
              ? cleanPath
              : `https://${cleanPath}`; // Add https:// if protocol is missing
            return (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mx-1 cursor-pointer text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
              >
                {linkText || url}
              </a>
            );
          }

          // Internal Markdown link
          const pathKey = cleanPath.startsWith('/')
            ? cleanPath.substring(1)
            : cleanPath;
          const actualPath = KNOWN_PATHS[pathKey] || cleanPath;
          const displayText =
            linkText.startsWith('/') && linkText.length > 1
              ? linkText.substring(1)
              : linkText || cleanPath;

          return (
            <Link
              key={index}
              to={actualPath}
              className="inline-flex items-center mx-1 cursor-pointer text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
            >
              {displayText || '/'}
            </Link>
          );
        }

        // Case 3: External URL (e.g., www.0thman.tech or http://example.com)
        if (externalUrlMatch) {
          const urlText = segment.trim();
          const url = urlText.startsWith('http')
            ? urlText
            : `https://${urlText}`; // Add https:// if protocol is missing
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mx-1 cursor-pointer text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
            >
              {urlText}
            </a>
          );
        }

        // Fallback: Plain text
        return <React.Fragment key={index}>{segment}</React.Fragment>;
      })}
    </span>
  );
};

TextWithLinks.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextWithLinks;
