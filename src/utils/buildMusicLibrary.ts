export interface Song {
  id: string;
  title: string;
  category: string;
  url: string;
}

export interface MusicLibrary {
  songs: Song[];
  categories: string[];
}

/**
 * Automatically builds a music library from local files using Vite's glob import.
 * Vite handles .mp3 files as assets and returns their public URLs.
 */
export const buildMusicLibrary = (): MusicLibrary => {
  // Use Vite's glob import to find all mp3 files in the music directory
  // eager: true means we get the values immediately instead of promises
  const modules = import.meta.glob('/src/data/music/**/*.mp3', { eager: true }) as Record<string, { default: string }>;

  const songs: Song[] = Object.entries(modules).map(([path, module]) => {
    // Path format: /src/data/music/Pop/song1.mp3
    const parts = path.split('/');
    const fileName = parts[parts.length - 1];
    const category = parts[parts.length - 2] || 'Uncategorized';
    const title = fileName.replace(/\.[^/.]+$/, "").replace(/_/g, " "); // Remove extension and replace underscores

    return {
      id: path, // Use path as unique ID
      title,
      category,
      url: module.default,
    };
  });

  const categories = Array.from(new Set(songs.map((s) => s.category))).sort();

  return {
    songs,
    categories: ['All', ...categories],
  };
};
