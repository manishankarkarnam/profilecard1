import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Github, Twitter, Linkedin } from 'lucide-react';

const ProfileCard = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(1234);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 75 }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-gray-800/70 rounded-2xl p-6 border border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* Profile Header */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse opacity-50"></div>
            <img
              src="/api/placeholder/96/96"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 relative z-10"
            />
          </div>
          
          <h2 className="text-2xl font-bold text-white text-center mt-4">Sarah Anderson</h2>
          <p className="text-emerald-400 text-center font-medium">Senior Developer</p>
        </div>

        {/* Bio Section */}
        <p className="text-gray-300 text-center mt-4">
          Passionate about creating beautiful user experiences and scalable applications. 
          Always learning, always coding.
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{likes}</p>
            <p className="text-sm text-gray-400">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">432</p>
            <p className="text-sm text-gray-400">Following</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">89</p>
            <p className="text-sm text-gray-400">Projects</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6 space-y-3">
          {skills.map(skill => (
            <div key={skill.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">{skill.name}</span>
                <span className="text-emerald-400">{skill.level}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-300">
            <Github className="w-5 h-5 text-gray-300 hover:text-emerald-400 transition-colors duration-300" />
          </button>
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-300">
            <Twitter className="w-5 h-5 text-gray-300 hover:text-emerald-400 transition-colors duration-300" />
          </button>
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-300">
            <Linkedin className="w-5 h-5 text-gray-300 hover:text-emerald-400 transition-colors duration-300" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button 
            onClick={handleLike}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white py-2 rounded-lg transition-all duration-300"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            Follow
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-all duration-300">
            <MessageCircle className="w-5 h-5" />
            Message
          </button>
          <button className="flex items-center justify-center p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;