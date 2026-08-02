import React from 'react';

/**
 * Multi-Layered Luxury Ambient Aura Component
 * Engineered for 60fps GPU performance, zero layout shifts,
 * and dynamic hardware-accelerated studio lighting depth.
 */
export const AmbientAura: React.FC = () => {
  return (
    <div 
      className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Layer 0: Slow Rotating Conic Studio Ray Sweep */}
      <div 
        className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] sm:w-[80rem] md:w-[100rem] h-[60rem] sm:h-[80rem] md:h-[100rem] rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(var(--accent-rgb),0.14)_0deg,transparent_60deg,rgba(var(--accent-rgb),0.08)_180deg,transparent_240deg,rgba(var(--accent-rgb),0.14)_360deg)] blur-[100px] opacity-75 transform-gpu animate-aura-spin mix-blend-screen"
      />

      {/* Layer 1: Ultra-Wide Atmospheric Canvas Backdrop Glow */}
      <div
        className="absolute top-[18%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] sm:w-[64rem] md:w-[80rem] h-[42rem] sm:h-[64rem] md:h-[80rem] rounded-full bg-[radial-gradient(ellipse_60%_50%_at_50%_35%,rgba(var(--accent-rgb),0.20)_0%,rgba(var(--accent-rgb),0.07)_45%,rgba(11,11,12,0)_75%)] blur-[120px] transition-all duration-1000 ease-out transform-gpu animate-aura-breath"
      />

      {/* Layer 2: Hero Portrait Specular Backlight Core */}
      <div 
        className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[28rem] sm:w-[38rem] md:w-[48rem] h-[28rem] sm:h-[38rem] md:h-[48rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.22)_0%,rgba(var(--accent-rgb),0.09)_35%,rgba(var(--accent-rgb),0.02)_65%,transparent_80%)] blur-[60px] transition-all duration-1000 ease-out transform-gpu animate-aura-pulse"
      />

      {/* Layer 3: Concentrated High-Intensity Specular Core Ring */}
      <div 
        className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-64 sm:w-80 md:w-[28rem] h-64 sm:h-80 md:h-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.28)_0%,rgba(var(--accent-rgb),0.12)_40%,transparent_75%)] blur-[32px] transition-all duration-1000 ease-out transform-gpu"
      />

      {/* Layer 4: Hotspot Inner Glow Pinpoint */}
      <div 
        className="absolute bottom-[16%] left-1/2 -translate-x-1/2 w-40 sm:w-52 md:w-64 h-40 sm:h-52 md:h-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.35)_0%,rgba(var(--accent-rgb),0.10)_50%,transparent_80%)] blur-[18px] transform-gpu"
      />

      {/* Layer 5: Reorganized & Balanced Floating Glow Nodes around Floating Head */}
      {/* Left-Wing Soft Ambient Node: Repositioned away from far left towards floating head */}
      <div 
        className="absolute top-[22%] left-1/2 -translate-x-[50%] sm:-translate-x-[40%] w-72 sm:w-80 md:w-[26rem] h-72 sm:h-80 md:h-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.12)_0%,transparent_70%)] blur-[70px] transform-gpu animate-float-slow transition-colors duration-1000 mix-blend-screen"
      />
      
      {/* Primary Right-Floating Ambient Glow: Floats gracefully across the head towards the right side */}
      <div 
        className="absolute top-[18%] left-1/2 translate-x-[15%] sm:translate-x-[25%] md:translate-x-[35%] w-80 sm:w-[28rem] md:w-[34rem] h-80 sm:h-[28rem] md:h-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.18)_0%,rgba(255,255,255,0.06)_30%,rgba(var(--accent-rgb),0.07)_60%,transparent_80%)] blur-[75px] transform-gpu animate-float-right transition-colors duration-1000 mix-blend-screen"
      />

      {/* Secondary Right-Wing Glow Accent: Fills the right side of the floating head bio section */}
      <div 
        className="absolute top-[32%] left-1/2 translate-x-[40%] sm:translate-x-[55%] md:translate-x-[65%] w-64 sm:w-80 md:w-[28rem] h-64 sm:h-80 md:h-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.12)_0%,transparent_75%)] blur-[80px] transform-gpu animate-float-delayed transition-colors duration-1000 mix-blend-screen"
      />

      {/* Layer 6: Architectural Cinematic Vignette & Edge Shadow */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_30%,rgba(11,11,12,0.45)_70%,rgba(11,11,12,0.92)_100%)] pointer-events-none"
      />
    </div>
  );
};
