import React, { useState, useEffect } from 'react';

const Bubble = ({ size, position, speed }) => (
  <div 
    className="absolute rounded-full bg-white/20 animate-float"
    style={{
      width: size,
      height: size,
      left: position.x,
      top: position.y,
      animation: `float ${speed}s infinite linear`,
    }}
  />
);

const ProfileCard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Generate random bubbles
  const bubbles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    position: {
      x: Math.random() * 100 + '%',
      y: Math.random() * 100 + '%'
    },
    speed: Math.random() * 10 + 10
  }));

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-300 via-purple-500 to-pink-500 p-6 flex items-center justify-center">
      {/* Animated Background Bubbles */}
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} {...bubble} />
      ))}
      
      {/* Card Container with Animation */}
      <div className={`
        relative z-10 
        bg-white/30 backdrop-blur-md 
        rounded-3xl p-8 max-w-sm w-full 
        shadow-xl transition-all duration-700
        hover:bg-white/40 hover:shadow-2xl
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        {/* Decorative Elements */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-400/30 rounded-full blur-xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-400/30 rounded-full blur-xl" />
        
        <div className="relative">
          {/* Profile Content */}
          <div className="flex flex-col items-center">
            {/* Profile Image with Glow Effect */}
            <div className="relative mb-6 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000" />
              <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-white/50">
                <img
                  src="/api/placeholder/96/96"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Name and Title with Hover Effects */}
            <h2 className="text-2xl font-bold text-gray-800 mb-1 hover:text-purple-700 transition-colors">
              Akod
            </h2>
            <div className="flex items-center space-x-2 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-gray-600">Product Design</p>
            </div>
            
            {/* Description with Custom Background */}
            <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 mb-8">
              <p className="text-center text-gray-700">
                I chose this track because it will help me come up with suitable
                solutions to problems people around me are facing
              </p>
            </div>
            
            {/* Social Links with Enhanced Hover Effects */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'instagram', icon: '📷' },
                { name: 'behance', icon: 'Bē' },
                { name: 'google', icon: '🔍' },
                { name: 'github', icon: '🐱' },
                { name: 'facebook', icon: '📘' }
              ].map((platform) => (
                <button
                  key={platform.name}
                  className="group relative w-10 h-10 rounded-full bg-white/50 hover:bg-white/70 
                           transition-all duration-300 hover:scale-110"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 
                                group-hover:opacity-20 transition-opacity" />
                  <span className="relative flex items-center justify-center w-full h-full text-gray-600">
                    {platform.icon}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add floating animation
const styles = `
  @keyframes float {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(30px, -50px) rotate(120deg);
    }
    66% {
      transform: translate(-20px, 20px) rotate(240deg);
    }
    100% {
      transform: translate(0, 0) rotate(360deg);
    }
  }
  
  .animate-float {
    animation: float 20s infinite linear;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ProfileCard;