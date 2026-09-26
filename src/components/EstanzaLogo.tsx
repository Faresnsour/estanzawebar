import React from 'react';

interface EstanzaLogoProps {
  className?: string;
  showBadge?: boolean;
}

export default function EstanzaLogo({ className = 'w-8 h-8', showBadge = true }: EstanzaLogoProps) {
  if (!showBadge) {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Estanza Logo"
      >
        {/* Main 'e' glyph in Forest Deep Onyx #05221C */}
        <path
          d="M74 52.5H37.5C38.2 61 44.5 67 53 67C59 67 63.8 64.2 66.8 59.5L73.2 63.5C68.8 70.8 61.5 75 53 75C39.5 75 29.5 64.2 29.5 50C29.5 36.2 39.5 25.5 53 25.5C66.5 25.5 74 36.2 74 50V52.5ZM66 45.2C65.2 38.5 60.5 33.2 53 33.2C45.2 33.2 39 38.5 37.8 45.2H66Z"
          fill="#05221C"
        />
        {/* Vibrant Accent Dot in Teal #008774 */}
        <circle cx="73.8" cy="28.2" r="4.6" fill="#008774" />
      </svg>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-[28%] bg-gradient-to-b from-[#fbfcfc] to-[#e7ecea] shadow-[0_3px_8px_rgba(5,34,28,0.12),inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(5,34,28,0.06)] border border-[#d6dedb] overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[72%] h-[72%]"
        aria-label="Estanza Icon"
      >
        {/* Main 'e' glyph in Forest Deep Onyx #05221C */}
        <path
          d="M74 52.5H37.5C38.2 61 44.5 67 53 67C59 67 63.8 64.2 66.8 59.5L73.2 63.5C68.8 70.8 61.5 75 53 75C39.5 75 29.5 64.2 29.5 50C29.5 36.2 39.5 25.5 53 25.5C66.5 25.5 74 36.2 74 50V52.5ZM66 45.2C65.2 38.5 60.5 33.2 53 33.2C45.2 33.2 39 38.5 37.8 45.2H66Z"
          fill="#05221C"
        />
        {/* Teal Accent Dot #008774 */}
        <circle cx="73.8" cy="28.2" r="4.6" fill="#008774" />
      </svg>
    </div>
  );
}
