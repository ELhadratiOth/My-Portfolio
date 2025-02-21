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

  // Split by Markdown-style links, standalone paths, or URLs, with better tolerance for malformed input
  const segments = text.split(
    /(\[.*?\]\(\/[^)]*\)?|\s*\/\w+\s*|\s*https?:\/\/[^\s]+)/g,
  );

  return (
    <span className="inline">
      {segments.map((segment, index) => {
        // Match Markdown-style link: [text](/path) or malformed variants like [/ ](/))
        const markdownLinkMatch = segment.match(/^\[(.*?)\]\((\/[^)]*)\)?$/);
        // Match standalone internal path: /word (with optional surrounding spaces or parentheses)
        const standalonePathMatch = segment.match(
          /^\s*(?:[(/])?\s*\/\w+\s*(?:[)/])?\s*$/,
        );
        // Match external URL: http://... or https://...
        const externalUrlMatch = /^\s*https?:\/\/[^\s]+$/.test(segment);

        // Case 1: Not a link, path, or URL, render as plain text
        if (!markdownLinkMatch && !standalonePathMatch && !externalUrlMatch) {
          return <React.Fragment key={index}>{segment}</React.Fragment>;
        }

        // Case 2: Markdown-style link (e.g., [/](/) or [/ ](/))
        if (markdownLinkMatch) {
          let [, linkText, linkPath] = markdownLinkMatch; // e.g., "/ ", "/"
          linkText = linkText.trim(); // Clean up extra spaces
          const cleanPath = linkPath.trim(); // e.g., "/"
          const pathKey = cleanPath.substring(1); // e.g., ""
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
              {displayText || '/'} {/* Fallback to '/' if text is empty */}
            </Link>
          );
        }

        // Case 3: External URL (http/https)
        if (externalUrlMatch) {
          const url = segment.trim();
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center cursor-pointer mx-1 text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
            >
              {url}
            </a>
          );
        }

        // Case 4: Standalone internal path (e.g., /contactme or (/contactme))
        const cleanSegment = segment.replace(/[()]/g, '').trim(); // Remove parentheses
        const pathMatch = cleanSegment.match(/^\/?(\w+)$/);
        if (pathMatch) {
          const pathKey = pathMatch[1]; // e.g., "contactme"
          const actualPath = KNOWN_PATHS[pathKey] || `/${pathKey}`;

          return (
            <Link
              key={index}
              to={actualPath}
              className="inline-flex items-center mx-1 text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
            >
              {`/${pathKey}`} {/* Always show the path with leading "/" */}
            </Link>
          );
        }

        // Fallback: Render as plain text if nothing matches
        return <React.Fragment key={index}>{segment}</React.Fragment>;
      })}
    </span>
  );
};

TextWithLinks.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextWithLinks;
