import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Github, Twitter, Linkedin } from 'lucide-react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-emerald-500/10 rounded-full blur-xl animate-blob"
          style={{
            width: Math.random() * 200 + 50 + 'px',
            height: Math.random() * 200 + 50 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 10 + 's',
            animationDuration: Math.random() * 20 + 10 + 's',
          }}
        />
      ))}
    </div>
  );
};

const ProfileCard = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(1234);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 75 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      skills.forEach((skill, index) => {
        const progressBar = document.querySelector(`#skill-${index}`);
        if (progressBar) {
          progressBar.style.width = '0%';
          setTimeout(() => {
            progressBar.style.width = `${skill.level}%`;
          }, 100);
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const cardStyle = {
    transform: isHovered
      ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * 5}deg) rotateY(${(mousePosition.x - 0.5) * 5}deg)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4 relative">
      <AnimatedBackground />
      
      <div
        className="w-full max-w-md backdrop-blur-xl bg-gray-800/70 rounded-2xl p-6 border border-gray-700 shadow-xl transition-all duration-300 relative"
        style={cardStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 animate-gradient-xy"></div>
        
        {/* Profile Header */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto relative group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse opacity-50"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full blur animate-pulse opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <img
              src="/api/placeholder/96/96"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 relative z-10 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <h2 className="text-2xl font-bold text-white text-center mt-4 hover:text-emerald-400 transition-colors">Sarah Anderson</h2>
          <p className="text-emerald-400 text-center font-medium animate-pulse">Senior Developer</p>
        </div>

        {/* Bio Section with typing effect */}
        <p className="text-gray-300 text-center mt-4 hover:text-white transition-colors">
          Passionate about creating beautiful user experiences and scalable applications. 
          Always learning, always coding.
        </p>

        {/* Animated Stats */}
        <div className="flex justify-center gap-6 mt-6">
          {[
            { label: 'Followers', value: likes },
            { label: 'Following', value: 432 },
            { label: 'Projects', value: 89 }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center group hover:transform hover:scale-110 transition-transform duration-300"
            >
              <p className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">{stat.value}</p>
              <p className="text-sm text-gray-400 group-hover:text-emerald-300 transition-colors">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Animated Skills */}
        <div className="mt-6 space-y-3">
          {skills.map((skill, index) => (
            <div key={skill.name} className="space-y-1 group">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300 group-hover:text-emerald-400 transition-colors">{skill.name}</span>
                <span className="text-emerald-400">{skill.level}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  id={`skill-${index}`}
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Social Links */}
        <div className="flex justify-center gap-4 mt-6">
          {[Github, Twitter, Linkedin].map((Icon, index) => (
            <button 
              key={index}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-300 hover:scale-110 hover:rotate-6"
            >
              <Icon className="w-5 h-5 text-gray-300 hover:text-emerald-400 transition-colors duration-300" />
            </button>
          ))}
        </div>

        {/* Animated Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button 
            onClick={handleLike}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white py-2 rounded-lg transition-all duration-300 hover:scale-105 group"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current animate-bounce' : 'animate-pulse'}`} />
            <span className="group-hover:font-bold">Follow</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-all duration-300 hover:scale-105 group">
            <MessageCircle className="w-5 h-5 group-hover:animate-bounce" />
            <span className="group-hover:font-bold">Message</span>
          </button>
          <button className="flex items-center justify-center p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:rotate-12">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;