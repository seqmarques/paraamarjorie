import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Play, Image as ImageIcon } from 'lucide-react';

interface Media {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

interface MediaCarouselProps {
  media: Media[];
  onMediaSelect?: (url: string) => void;
  isEditing?: boolean;
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({ media, onMediaSelect, isEditing }) => {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="rounded-lg"
      >
        {media.map((item, index) => (
          <SwiperSlide key={index}>
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt={`Slide ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
                onClick={() => onMediaSelect?.(item.url)}
              />
            ) : (
              <div className="relative w-full h-64">
                <video
                  src={item.url}
                  className="w-full h-full object-cover rounded-lg"
                  controls={!isEditing}
                  onClick={() => onMediaSelect?.(item.url)}
                >
                  Your browser does not support the video tag.
                </video>
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      
      {isEditing && (
        <button
          onClick={() => onMediaSelect?.('')}
          className="absolute bottom-4 right-4 bg-pink-600 text-white p-2 rounded-full shadow-lg hover:bg-pink-700 transition-colors"
        >
          <ImageIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default MediaCarousel;