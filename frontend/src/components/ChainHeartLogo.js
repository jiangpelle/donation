import React from 'react';

function ChainHeartLogo({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 400 400">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="50%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
        
        <pattern id="chainPattern" patternUnits="userSpaceOnUse" width="40" height="40">
          <path d="M20 5 L35 20 L20 35 L5 20 Z" 
                fill="none" 
                stroke="#00FFB2" 
                strokeWidth="3" 
                strokeDasharray="2,2"/>
        </pattern>
        
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>

        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FF4757" />
        </linearGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#bgGradient)"/>
      
      <g transform="translate(200, 200)">
        <path d="M0 -48 C 32 -80 64 -48 0 24 C -64 -48 -32 -80 0 -48 Z" 
              fill="url(#heartGradient)"
              stroke="#FFFFFF"
              strokeWidth="2"
              filter="url(#glow)"/>
        
        <g transform="scale(0.9)">
          <path d="M-35 -35 L35 -35 L35 35 L-35 35 Z" 
                fill="none" 
                stroke="url(#chainPattern)" 
                strokeWidth="2"/>
          <path d="M-25 -25 L25 -25 L25 25 L-25 25 Z" 
                fill="none" 
                stroke="url(#chainPattern)" 
                strokeWidth="2"/>
        </g>
        
        <g fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round">
          <path d="M-30 -20 L0 20 L30 -20 M0 20 L0 50"/>
          <circle cx="-20" cy="-30" r="6"/>
          <circle cx="20" cy="-30" r="6"/>
        </g>
      </g>

      <g transform="translate(100, 100)">
        <path d="M-10 -10 L10 -10 L10 10 L-10 10 Z" 
              fill="none" 
              stroke="url(#chainPattern)" 
              strokeWidth="2"/>
      </g>
      <g transform="translate(300, 300)">
        <path d="M-10 -10 L10 -10 L10 10 L-10 10 Z" 
              fill="none" 
              stroke="url(#chainPattern)" 
              strokeWidth="2"/>
      </g>
    </svg>
  );
}

export default ChainHeartLogo; 