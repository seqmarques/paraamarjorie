import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Heart, Stars } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

function Proposal() {
  const [showSuccess, setShowSuccess] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const controls = useAnimation();

  const moveNoButton = () => {
    if (noButtonRef.current) {
      const x = Math.random() * (window.innerWidth - 100);
      const y = Math.random() * (window.innerHeight - 100);
      noButtonRef.current.style.position = 'fixed';
      noButtonRef.current.style.left = `${x}px`;
      noButtonRef.current.style.top = `${y}px`;
    }
  };

  const handleYesClick = async () => {
    setShowSuccess(true);
    await controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 }
    });
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center p-4">
        <ParticlesBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-8 md:p-12 text-center max-w-2xl"
        >
          <Heart className="w-20 h-20 text-pink-600 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Sabia que você ia dizer SIM! ❤️
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Agora é oficial! Você fez de mim a pessoa mais feliz do mundo!
          </p>
          <div className="flex justify-center space-x-2">
            <Stars className="w-8 h-8 text-yellow-500 animate-spin" />
            <Heart className="w-8 h-8 text-pink-600 animate-pulse" />
            <Stars className="w-8 h-8 text-yellow-500 animate-spin" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex items-center justify-center p-4">
      <ParticlesBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-8 md:p-12 text-center max-w-2xl"
      >
        <Heart className="w-16 h-16 text-pink-600 mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Você aceita ser minha namorada oficialmente? 💝
        </h1>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYesClick}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg transform transition-all duration-300"
          >
            SIM! 💖
          </motion.button>
          <motion.button
            ref={noButtonRef}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-12 rounded-full text-xl shadow-lg transform transition-all duration-300"
          >
            Não 😢
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default Proposal;