import React from 'react';
import { useMusicStore } from '../store/useMusicStore';
import { Play, Pause, Music as MusicIcon, Clock } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'motion/react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SongList = () => {
  const { songs, selectedCategory, currentSong, isPlaying, setCurrentSong, setIsPlaying } = useMusicStore();

  const filteredSongs = selectedCategory === 'All' 
    ? songs 
    : songs.filter(s => s.category === selectedCategory);

  const handlePlaySong = (song: any) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-900/30">
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <header className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">{selectedCategory}</h2>
          <p className="text-sm md:text-base text-zinc-400">{filteredSongs.length} songs available</p>
        </header>

        {filteredSongs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500 border-2 border-dashed border-zinc-800 rounded-2xl">
            <MusicIcon size={48} className="mb-4 opacity-20" />
            <p>No songs found in this category.</p>
            <p className="text-sm">Add some MP3 files to your music folder!</p>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-800 mb-2">
              <span className="w-8 text-center">#</span>
              <span>Title</span>
              <span className="hidden md:block">Category</span>
              <span className="w-12 text-right"><Clock size={14} /></span>
            </div>

            {filteredSongs.map((song, index) => {
              const isActive = currentSong?.id === song.id;
              
              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  key={song.id}
                  onClick={() => handlePlaySong(song)}
                  className={cn(
                    "grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all group items-center",
                    isActive 
                      ? "bg-emerald-500/10 text-emerald-400" 
                      : "hover:bg-zinc-800/50 text-zinc-300 hover:text-white"
                  )}
                >
                  <div className="w-8 flex items-center justify-center">
                    {isActive && isPlaying ? (
                      <div className="flex gap-0.5 items-end h-3">
                        <motion.div animate={{ height: [4, 12, 6] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-emerald-400" />
                        <motion.div animate={{ height: [8, 4, 12] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-emerald-400" />
                        <motion.div animate={{ height: [12, 8, 4] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-0.5 bg-emerald-400" />
                      </div>
                    ) : (
                      <span className="group-hover:hidden">{index + 1}</span>
                    )}
                    <div className={cn("hidden group-hover:block", isActive ? "block" : "")}>
                      {isActive && isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                    </div>
                  </div>

                  <div className="font-medium truncate">{song.title}</div>
                  <div className="hidden md:block text-sm opacity-60 truncate">{song.category}</div>
                  <div className="text-sm opacity-60 text-right">--:--</div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
