import React, { useState, useRef } from 'react';
import { Howl } from 'howler';
import { Play, Pause, SkipBack, SkipForward, Music2 } from 'lucide-react';

const playlist = [
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    url: "https://example.com/perfect.mp3"
  },
  {
    title: "Can't Help Falling in Love",
    artist: "Elvis Presley",
    url: "https://example.com/cant-help-falling-in-love.mp3"
  },
  {
    title: "All of Me",
    artist: "John Legend",
    url: "https://example.com/all-of-me.mp3"
  }
];

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const soundRef = useRef<Howl | null>(null);

  const togglePlay = () => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: [playlist[currentTrack].url],
        html5: true,
        onend: () => {
          nextTrack();
        }
      });
    }

    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setIsPlaying(false);
    soundRef.current = null;
  };

  const prevTrack = () => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(false);
    soundRef.current = null;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-lg p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Music2 className={`w-6 h-6 text-pink-600 ${isPlaying ? 'animate-spin-slow' : ''}`} />
          <div>
            <p className="font-medium text-gray-800">{playlist[currentTrack].title}</p>
            <p className="text-sm text-gray-600">{playlist[currentTrack].artist}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={prevTrack}
            className="p-2 hover:bg-pink-100 rounded-full transition-colors"
          >
            <SkipBack className="w-6 h-6 text-pink-600" />
          </button>
          
          <button
            onClick={togglePlay}
            className="p-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          
          <button
            onClick={nextTrack}
            className="p-2 hover:bg-pink-100 rounded-full transition-colors"
          >
            <SkipForward className="w-6 h-6 text-pink-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;