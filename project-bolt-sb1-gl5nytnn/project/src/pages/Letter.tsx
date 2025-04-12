import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

function Letter() {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 30000); // Mostra o botão após 30 segundos (ajuste conforme necessário)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-16 px-4">
      <ParticlesBackground />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-8 md:p-12"
      >
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Minha Carta Para Você
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 mb-8">
          <Typewriter
            options={{
              delay: 50,
              cursor: '❤️'
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString('Querida Marjorie,')
                .pauseFor(1000)
                .typeString('<br><br>')
                .typeString('Desde aquele dia especial em 28 de janeiro, minha vida mudou completamente. Cada momento ao seu lado tem sido uma descoberta incrível de como o amor pode ser tão bonito e verdadeiro.')
                .pauseFor(700)
                .typeString('<br><br>')
                .typeString('Seu sorriso ilumina meus dias, sua presença torna tudo mais especial, e seu jeito único de ser me faz ter certeza de que encontrei alguém realmente especial.')
                .pauseFor(700)
                .typeString('<br><br>')
                .typeString('A cada dia que passa, meu amor por você só aumenta, e hoje quero dar mais um passo importante em nossa história...')
                .start();
            }}
          />
        </div>

        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              onClick={() => navigate('/pedido')}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Continuar... 💝
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Letter;