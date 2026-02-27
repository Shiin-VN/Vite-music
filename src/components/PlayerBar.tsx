import React from 'react';
import { useMusicStore } from '../store/useMusicStore';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { 
  Play, Pause, SkipBack, SkipForward, 
  Volume2, VolumeX, Shuffle, Repeat, Repeat1 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PlayerBar = () => {
  const { 
    currentSong, isPlaying, setIsPlaying, 
    volume, setVolume, shuffle, toggleShuffle, 
    repeat, setRepeat, nextSong, prevSong 
  } = useMusicStore();

  const { currentTime, duration, seek, formatTime } = useAudioPlayer();

  if (!currentSong) return null;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="h-24 md:h-24 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800 px-4 md:px-6 flex items-center justify-between fixed bottom-0 left-0 right-0 z-50">
      {/* Song Info */}
      <div className="flex items-center gap-3 md:gap-4 w-[40%] md:w-[30%]">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-800 rounded-lg flex items-center justify-center text-emerald-500 shadow-lg border border-zinc-700 flex-shrink-0">
          <div className="relative">
            <div className={cn(
              "absolute -inset-1 bg-emerald-500/20 blur-md rounded-full",
              isPlaying ? "animate-pulse" : "hidden"
            )} />
            <Play size={22} fill="currentColor" className="relative" />
          </div>
        </div>
        <div className="overflow-hidden">
          <h4 className="text-xs md:text-sm font-bold text-white truncate">{currentSong.title}</h4>
          <p className="text-[10px] md:text-xs text-zinc-400 truncate">{currentSong.category}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-1 md:gap-2 flex-1 md:max-w-[40%]">
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={toggleShuffle}
            className={cn("transition-colors hidden sm:block", shuffle ? "text-emerald-400" : "text-zinc-500 hover:text-white")}
          >
            <Shuffle size={18} />
          </button>
          
          <button onClick={prevSong} className="text-zinc-300 hover:text-white transition-colors">
            <SkipBack size={22} fill="currentColor" />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform active:scale-95"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>
          
          <button onClick={nextSong} className="text-zinc-300 hover:text-white transition-colors">
            <SkipForward size={22} fill="currentColor" />
          </button>
          
          <button 
            onClick={() => {
              if (repeat === 'none') setRepeat('all');
              else if (repeat === 'all') setRepeat('one');
              else setRepeat('none');
            }}
            className={cn("transition-colors hidden sm:block", repeat !== 'none' ? "text-emerald-400" : "text-zinc-500 hover:text-white")}
          >
            {repeat === 'one' ? <Repeat1 size={18} /> : <Repeat size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-3 w-full max-w-md">
          <span className="text-[9px] md:text-[10px] font-mono text-zinc-500 w-8 md:w-10 text-right">{formatTime(currentTime)}</span>
          <div className="relative flex-1 group h-4 flex items-center">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="absolute w-full h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-emerald-500 group-hover:h-1.5 transition-all"
            />
            <div 
              className="absolute h-1 bg-emerald-500 rounded-full pointer-events-none group-hover:h-1.5 transition-all" 
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            />
          </div>
          <span className="text-[9px] md:text-[10px] font-mono text-zinc-500 w-8 md:w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume - Hidden on mobile */}
      <div className="hidden md:flex items-center justify-end gap-3 w-[30%]">
        <button onClick={() => setVolume(volume === 0 ? 0.7 : 0)} className="text-zinc-400 hover:text-white">
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <div className="w-24 relative h-4 flex items-center group">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-emerald-500 group-hover:h-1.5 transition-all"
          />
          <div 
            className="absolute h-1 bg-emerald-500 rounded-full pointer-events-none group-hover:h-1.5 transition-all" 
            style={{ width: `${volume * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
