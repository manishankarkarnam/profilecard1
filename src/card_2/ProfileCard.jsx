import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Calendar, Github, Twitter, Linkedin } from 'lucide-react';

const ProfileCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[500px] bg-gray-100 p-6">
      <div 
        className={`relative w-80 bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-700 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
          {/* Animated gradient overlay */}
          <div 
            className="absolute inset-0 opacity-30 animate-pulse"
            style={{
              background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradient 3s ease infinite'
            }}
          />
          
          {/* Floating bubbles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/30"
              style={{
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `
                  float ${Math.random() * 3 + 2}s ease-in-out infinite,
                  pulse 2s ease-in-out infinite
                `,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Animated Profile Image */}
        <div className={`relative mt-16 flex justify-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="absolute -top-16">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white">
                <img
                  src="/api/placeholder/128/128"
                  alt="Profile"
                  className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-400 rounded-full border-4 border-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Animated Content */}
        <div className={`pt-20 pb-8 px-6 transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 animate-fadeIn">Sarah Anderson</h2>
            <p className="text-blue-600 font-medium mb-4 animate-slideIn">Senior Product Designer</p>
            
            <div className="flex items-center justify-center space-x-1 text-gray-500 text-sm mb-4">
              <MapPin size={16} className="animate-bounce" />
              <span>San Francisco, CA</span>
            </div>

            <p className="text-gray-600 mb-6">
              Creating user-centered designs that bring joy and simplicity to complex problems.
            </p>

            {/* Animated Stats */}
            <div className="flex justify-center space-x-6 mb-6">
              {[
                { label: 'Projects', value: 152 },
                { label: 'Followers', value: '9.8k' },
                { label: 'Years', value: 15 }
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className={`text-center transition-all duration-700 delay-${index * 100}`}
                  style={{
                    animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="text-xl font-bold text-gray-800 animate-number">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Animated Social Icons */}
            <div className="flex justify-center space-x-4">
              {[Twitter, Github, Linkedin].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#"
                  className={`transform transition-all duration-500 hover:scale-110 delay-${index * 100}`}
                  style={{
                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300">
                    <Icon size={20} className="animate-wiggle" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Button */}
        <div className={`px-6 pb-6 transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg py-3 transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02] relative overflow-hidden group">
            <span className="relative z-10">Connect</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideIn {
          animation: slideUp 0.5s ease-out;
        }
        
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
        
        .animate-number {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfileCard;