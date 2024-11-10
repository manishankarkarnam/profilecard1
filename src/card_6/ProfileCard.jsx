import React, { useState, useEffect, useCallback } from 'react';
import { Heart, MessageCircle, Share2, Github, Twitter, Linkedin, Mail, Globe, Coffee } from 'lucide-react';
import profile_photo from './profile_photo.jpg';

// Tilt configuration
const ROTATION_RANGE = 15; 
const PERSPECTIVE = 1500; 
const SCALE_RANGE = 1.02; 

const FloatingBubbles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full mix-blend-overlay animate-float"
          style={{
            width: Math.random() * 60 + 20 + 'px',
            height: Math.random() * 60 + 20 + 'px',
            background: `radial-gradient(circle at center, 
              rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 0.15),
              rgba(${Math.random() * 50 + 205}, ${Math.random() * 50 + 205}, ${Math.random() * 50 + 205}, 0.05))`,
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 5 + 's',
            animationDuration: Math.random() * 10 + 15 + 's',
          }}
        />
      ))}
    </div>
  );
};

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

const LiveBubble = ({ delay = 0 }) => {
  return (
    <div className="absolute -top-1 -right-1 flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" 
            style={{ animationDelay: `${delay}ms` }}></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
    </div>
  );
};

const ProfileCard = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(1234);
  const [cardTransform, setCardTransform] = useState({ 
    rotateX: 0, 
    rotateY: 0, 
    scale: 1,
    transitionDuration: '400ms' 
  });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleMouseMove = useCallback((e) => {
    if (!isHovered) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position relative to card center
    const rotateX = (-mouseY / (rect.height / 2)) * ROTATION_RANGE;
    const rotateY = (mouseX / (rect.width / 2)) * ROTATION_RANGE;
    
    // Calculate glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    
    setGlarePosition({ x: glareX, y: glareY });
    setCardTransform({
      rotateX,
      rotateY,
      scale: SCALE_RANGE,
      transitionDuration: '0ms'
    });
  }, [isHovered]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCardTransform({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transitionDuration: '400ms'
    });
  };

  const skills = [
    { name: 'HTML', level: 90, color: 'from-red-400 to-red-600' },
    { name: 'CSS', level: 90, color: 'from-blue-400 to-blue-600' },
    { name: 'JavaScript', level: 75, color: 'from-yellow-400 to-yellow-600' },
    { name: 'React', level: 80, color: 'from-blue-400 to-blue-600' },
    { name: 'Node.js', level: 75, color: 'from-green-400 to-green-600' },
    { name: 'UI/UX', level: 70, color: 'from-purple-400 to-purple-600' }
  ];

  const cardStyle = {
    transform: `
      perspective(${PERSPECTIVE}px)
      rotateX(${cardTransform.rotateX}deg)
      rotateY(${cardTransform.rotateY}deg)
      scale(${cardTransform.scale})
    `,
    transition: `transform ${cardTransform.transitionDuration} ease-out`
  };

  const glareStyle = {
    background: `
      radial-gradient(
        circle at ${glarePosition.x}% ${glarePosition.y}%, 
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.05) 25%,
        rgba(255, 255, 255, 0) 50%
      )
    `
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4 relative">
      <AnimatedBackground />
      <FloatingBubbles />
      
      <div
        className="w-full max-w-md backdrop-blur-xl bg-gray-800/70 rounded-2xl p-8 shadow-2xl relative group isolate"
        style={cardStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
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
              src={profile_photo}
              // https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 relative z-10 group-hover:scale-105 transition-transform duration-300"
            />
            {/* Live indicator */}
            <LiveBubble delay={0} />
          </div>
          
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 text-center mt-4">
            KARNAM MANISHANKAR
          </h2>
          <p className="text-blue-400 text-center font-medium animate-pulse">Junior Developer</p>
          
          <div className="flex justify-center gap-2 mt-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">manishankarkarnam.com</span>
          </div>
        </div>

        {/* Bio Section */}
        <div className="relative mt-6 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
          <Globe className="w-4 h-4 absolute top-2 right-2 text-gray-400" />
          <p className="text-gray-300 text-center hover:text-white transition-colors">
            Passionate about creating beautiful user experiences and scalable applications. 
            Always learning...
          </p>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Followers', value: likes, icon: Heart },
            { label: 'Projects', value: 12, icon: Coffee },
            { label: 'Following', value: 432, icon: MessageCircle }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-3 rounded-lg bg-gray-700/30 border border-gray-600 hover:border-emerald-500/50 group/stat transition-all duration-300 hover:scale-105 relative"
            >
              {index === 0 && <LiveBubble delay={500} />}
              <stat.icon className="w-5 h-5 mx-auto mb-2 text-gray-400 group-hover/stat:text-emerald-400 transition-colors" />
              <p className="text-xl font-bold text-white group-hover/stat:text-emerald-400 transition-colors">{stat.value}</p>
              <p className="text-xs text-gray-400 group-hover/stat:text-emerald-300 transition-colors">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Animated Skills with floating bubbles */}
        <div className="mt-6 space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-1 group/skill relative">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300 group-hover/skill:text-emerald-400 transition-colors">{skill.name}</span>
                <span className="text-emerald-400">{skill.level}%</span>
              </div>
              <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden relative">
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
        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-6">
          {[
            { Icon: Github, color: 'hover:bg-gray-600', url: 'https://github.com/manishankarkarnam' },
            { Icon: Twitter, color: 'hover:bg-blue-500', url: 'https://x.com/manishankar_7' },
            { Icon: Linkedin, color: 'hover:bg-blue-600', url: 'https://www.linkedin.com/in/karnam-manishankar-17b91126b' }
          ].map(({ Icon, color, url }, index) => (
            <a 
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full bg-gray-700/50 ${color} transition-all duration-300 hover:scale-110 hover:rotate-6 relative`}
            >
              {index === 1 && <LiveBubble delay={1000} />}
              <Icon className="w-5 h-5 text-gray-300 hover:text-white transition-colors duration-300" />
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button 
            onClick={handleLike}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-emerald-500 hover:to-blue-600 text-white py-3 rounded-lg transition-all duration-300 hover:scale-105 group/btn relative"
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