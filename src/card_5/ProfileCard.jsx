import React, { useState, useEffect, useCallback } from 'react';
import { Heart, MessageCircle, Share2, Github, Twitter, Linkedin, Mail, Globe, Coffee } from 'lucide-react';

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;
const SCALE_RANGE = 1.05;

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-emerald-500/10 rounded-full blur-3xl animate-blob"
          style={{
            width: Math.random() * 300 + 100 + 'px',
            height: Math.random() * 300 + 100 + 'px',
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
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const skills = [
    { name: 'React', level: 90, color: 'from-blue-400 to-blue-600' },
    { name: 'TypeScript', level: 85, color: 'from-blue-500 to-indigo-600' },
    { name: 'Node.js', level: 75, color: 'from-green-400 to-green-600' },
    { name: 'UI/UX', level: 88, color: 'from-purple-400 to-purple-600' }
  ];

  const calculateCardTransform = useCallback((e) => {
    if (!isHovered) return { x: 0, y: 0 };

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const x = (mouseX - width / 2) / width;
    const y = (mouseY - height / 2) / height;
    
    const tiltX = y * ROTATION_RANGE - HALF_ROTATION_RANGE;
    const tiltY = -(x * ROTATION_RANGE - HALF_ROTATION_RANGE);
    
    return { x: tiltX, y: tiltY };
  }, [isHovered]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setGlarePosition({ x, y });
    setCardPosition(calculateCardTransform(e));
  }, [calculateCardTransform]);

  const cardStyle = {
    transform: `
      perspective(1000px)
      rotateX(${cardPosition.x}deg)
      rotateY(${cardPosition.y}deg)
      scale(${isHovered ? SCALE_RANGE : 1})
    `,
    transition: isHovered ? 'none' : 'all 0.5s ease'
  };

  const glareStyle = {
    background: `radial-gradient(
      circle at ${glarePosition.x * 100}% ${glarePosition.y * 100}%,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 20%,
      rgba(255, 255, 255, 0) 50%
    )`
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4 relative">
      <AnimatedBackground />
      
      <div
        className="w-full max-w-md backdrop-blur-xl bg-gray-800/70 rounded-2xl p-8 shadow-2xl transition-all duration-300 relative group"
        style={cardStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCardPosition({ x: 0, y: 0 });
        }}
      >
        {/* Glare effect */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={glareStyle}
        />
        
        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 animate-gradient-xy opacity-50"></div>
        
        {/* Profile Header */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto relative group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 animate-pulse opacity-50"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full blur animate-pulse opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <img
              src="/api/placeholder/128/128"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 relative z-10 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 text-center mt-4">
            Sarah Anderson
          </h2>
          <p className="text-blue-400 text-center font-medium animate-pulse">Senior Developer</p>
          
          <div className="flex justify-center gap-2 mt-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">sarah@example.com</span>
          </div>
        </div>

        {/* Bio Section */}
        <div className="relative mt-6 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
          <Globe className="w-4 h-4 absolute top-2 right-2 text-gray-400" />
          <p className="text-gray-300 text-center hover:text-white transition-colors">
            Passionate about creating beautiful user experiences and scalable applications. 
            Always learning, always coding.
          </p>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Followers', value: likes, icon: Heart },
            { label: 'Projects', value: 89, icon: Coffee },
            { label: 'Following', value: 432, icon: MessageCircle }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-3 rounded-lg bg-gray-700/30 border border-gray-600 hover:border-emerald-500/50 group/stat transition-all duration-300 hover:scale-105"
            >
              <stat.icon className="w-5 h-5 mx-auto mb-2 text-gray-400 group-hover/stat:text-emerald-400 transition-colors" />
              <p className="text-xl font-bold text-white group-hover/stat:text-emerald-400 transition-colors">{stat.value}</p>
              <p className="text-xs text-gray-400 group-hover/stat:text-emerald-300 transition-colors">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Animated Skills */}
        <div className="mt-6 space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-1 group/skill">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300 group-hover/skill:text-emerald-400 transition-colors">{skill.name}</span>
                <span className="text-emerald-400">{skill.level}%</span>
              </div>
              <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out group-hover/skill:animate-pulse`}
                  style={{ 
                    width: `${skill.level}%`,
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-6">
          {[
            { Icon: Github, color: 'hover:bg-gray-600' },
            { Icon: Twitter, color: 'hover:bg-blue-500' },
            { Icon: Linkedin, color: 'hover:bg-blue-600' }
          ].map(({ Icon, color }, index) => (
            <button 
              key={index}
              className={`p-3 rounded-full bg-gray-700/50 ${color} transition-all duration-300 hover:scale-110 hover:rotate-6`}
            >
              <Icon className="w-5 h-5 text-gray-300 hover:text-white transition-colors duration-300" />
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button 
            onClick={handleLike}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-emerald-500 hover:to-blue-600 text-white py-3 rounded-lg transition-all duration-300 hover:scale-105 group/btn"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current animate-bounce' : 'animate-pulse'}`} />
            <span className="group-hover/btn:font-bold">Follow</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-600 text-white py-3 rounded-lg transition-all duration-300 hover:scale-105 group/btn">
            <MessageCircle className="w-5 h-5 group-hover/btn:animate-bounce" />
            <span className="group-hover/btn:font-bold">Message</span>
          </button>
          <button className="flex items-center justify-center p-3 bg-gray-700/50 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:rotate-12">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;