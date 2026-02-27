import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Song, buildMusicLibrary } from '../utils/buildMusicLibrary';

interface MusicState {
  // Data
  songs: Song[];
  categories: string[];
  
  // UI State
  selectedCategory: string;
  searchQuery: string;
  
  // Player State
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  shuffle: boolean;
  repeat: 'none' | 'one' | 'all';
  
  // Actions
  setSongs: (songs: Song[]) => void;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  setRepeat: (repeat: 'none' | 'one' | 'all') => void;
  nextSong: () => void;
  prevSong: () => void;
}

const library = buildMusicLibrary();

export const useMusicStore = create<MusicState>()(
  persist(
    (set, get) => ({
      songs: library.songs,
      categories: library.categories,
      selectedCategory: 'All',
      searchQuery: '',
      currentSong: null,
      isPlaying: false,
      volume: 0.7,
      shuffle: false,
      repeat: 'all',

      setSongs: (songs) => set({ songs }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setCurrentSong: (currentSong) => set({ currentSong }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setVolume: (volume) => set({ volume }),
      toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
      setRepeat: (repeat) => set({ repeat }),

      nextSong: () => {
        const { songs, currentSong, shuffle, selectedCategory } = get();
        if (!currentSong) return;

        const filteredSongs = selectedCategory === 'All' 
          ? songs 
          : songs.filter(s => s.category === selectedCategory);
        
        if (filteredSongs.length === 0) return;

        let nextIndex: number;
        if (shuffle) {
          nextIndex = Math.floor(Math.random() * filteredSongs.length);
        } else {
          const currentIndex = filteredSongs.findIndex(s => s.id === currentSong.id);
          nextIndex = (currentIndex + 1) % filteredSongs.length;
        }

        set({ currentSong: filteredSongs[nextIndex], isPlaying: true });
      },

      prevSong: () => {
        const { songs, currentSong, shuffle, selectedCategory } = get();
        if (!currentSong) return;

        const filteredSongs = selectedCategory === 'All' 
          ? songs 
          : songs.filter(s => s.category === selectedCategory);
        
        if (filteredSongs.length === 0) return;

        let prevIndex: number;
        if (shuffle) {
          prevIndex = Math.floor(Math.random() * filteredSongs.length);
        } else {
          const currentIndex = filteredSongs.findIndex(s => s.id === currentSong.id);
          prevIndex = (currentIndex - 1 + filteredSongs.length) % filteredSongs.length;
        }

        set({ currentSong: filteredSongs[prevIndex], isPlaying: true });
      },
    }),
    {
      name: 'music-player-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields
      partialize: (state) => ({
        currentSong: state.currentSong,
        volume: state.volume,
        shuffle: state.shuffle,
        repeat: state.repeat,
        selectedCategory: state.selectedCategory,
      }),
    }
  )
);
