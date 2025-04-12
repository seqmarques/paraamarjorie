import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit2, Check, Plus, Image as ImageIcon, Video } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';
import MediaCarousel from '../components/MediaCarousel';

interface Media {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

interface Section {
  id: string;
  title: string;
  media: Media[];
  text: string;
}

function Home() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    {
      id: "first-meeting",
      title: "Como Nos Conhecemos",
      media: [
        {
          type: 'image',
          url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800"
        }
      ],
      text: "Foi em uma tarde especial que nossos caminhos se cruzaram. Um encontro casual que mudou nossas vidas para sempre. Desde o primeiro olhar, soube que havia algo especial entre nós."
    },
    {
      id: "special-moments",
      title: "Momentos Marcantes",
      media: [
        {
          type: 'image',
          url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800"
        }
      ],
      text: "Cada momento ao seu lado é uma nova aventura. Das risadas compartilhadas aos pequenos gestos de carinho, construímos memórias que vou guardar para sempre no coração."
    },
    {
      id: "our-dreams",
      title: "Nossos Sonhos",
      media: [
        {
          type: 'image',
          url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800"
        }
      ],
      text: "Juntos, sonhamos com um futuro cheio de amor e conquistas. Cada plano que fazemos, cada sonho que compartilhamos, me faz ter certeza de que quero construir essa história ao seu lado."
    }
  ]);

  const handleEdit = (sectionId: string, field: 'title' | 'text', value: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, [field]: value } : section
    ));
  };

  const handleMediaAdd = (sectionId: string, mediaType: 'image' | 'video') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = mediaType === 'image' ? 'image/*' : 'video/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Here you would typically upload to a storage service
        // For now, we'll use a local URL
        const url = URL.createObjectURL(file);
        setSections(sections.map(section => 
          section.id === sectionId
            ? {
                ...section,
                media: [...section.media, { type: mediaType, url }]
              }
            : section
        ));
      }
    };
    input.click();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-100 to-purple-100">
      <ParticlesBackground />
      
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`${
              isEditing ? 'bg-green-600' : 'bg-pink-600'
            } text-white px-4 py-2 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity`}
          >
            {isEditing ? (
              <>
                <Check className="w-4 h-4" /> Salvar
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" /> Editar
              </>
            )}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-4">
            Marjorie & Cauã
          </h1>
          <p className="text-lg text-gray-700">
            Nossa história de amor começou em 28 de janeiro...
          </p>
        </motion.div>

        <div className="space-y-32">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-xl"
            >
              {isEditing ? (
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => handleEdit(section.id, 'title', e.target.value)}
                  className="text-3xl font-semibold text-pink-600 mb-6 bg-transparent border-b-2 border-pink-300 focus:outline-none focus:border-pink-600 w-full"
                />
              ) : (
                <h2 className="text-3xl font-semibold text-pink-600 mb-6">
                  {section.title}
                </h2>
              )}
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className={index % 2 === 0 ? "" : "md:order-2"}>
                  <MediaCarousel
                    media={section.media}
                    isEditing={isEditing}
                  />
                  {isEditing && (
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleMediaAdd(section.id, 'image')}
                        className="flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full hover:bg-pink-200 transition-colors"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Adicionar Foto
                      </button>
                      <button
                        onClick={() => handleMediaAdd(section.id, 'video')}
                        className="flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full hover:bg-pink-200 transition-colors"
                      >
                        <Video className="w-4 h-4" />
                        Adicionar Vídeo
                      </button>
                    </div>
                  )}
                </div>
                <div className={`text-gray-700 ${index % 2 === 0 ? "" : "md:order-1"}`}>
                  {isEditing ? (
                    <textarea
                      value={section.text}
                      onChange={(e) => handleEdit(section.id, 'text', e.target.value)}
                      className="w-full h-32 text-lg leading-relaxed bg-transparent border-2 border-pink-300 rounded-lg p-2 focus:outline-none focus:border-pink-600"
                    />
                  ) : (
                    <p className="text-lg leading-relaxed">
                      {section.text}
                    </p>
                  )}
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-24 right-8"
          >
            <button
              onClick={() => setSections([...sections, {
                id: `section-${sections.length + 1}`,
                title: "Nova Seção",
                media: [],
                text: "Adicione seu texto aqui..."
              }])}
              className="bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-700 transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => navigate('/carta')}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Ler Minha Carta ❤️
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;