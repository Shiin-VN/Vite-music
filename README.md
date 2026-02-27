# VibeStream - Modern Local Music Player

VibeStream is a high-performance React music player that automatically indexes local MP3 files using Vite's static asset bundling.

## 🚀 Key Features

- **Automatic Indexing**: Uses `import.meta.glob` to scan `src/data/music` and build a library based on folder structure.
- **Persistent State**: Powered by Zustand with `persist` middleware to remember your volume, current song, and playback settings.
- **Modern UI**: Built with Tailwind CSS, featuring a responsive layout, glassmorphism, and smooth animations via Motion.
- **Smart Playback**: Supports Shuffle, Repeat (One/All), and auto-play next.

## 📂 Project Structure

- `src/data/music/`: Place your `.mp3` files here. Subfolders become categories.
- `src/store/`: Zustand state management.
- `src/hooks/`: Custom `useAudioPlayer` hook for HTML5 Audio logic.
- `src/utils/`: Library building logic.

## 🛠️ Technical Details

### `import.meta.glob`
Vite's `import.meta.glob` allows us to import multiple modules from the file system. By using `{ eager: true }`, we get a static mapping of file paths to their resolved asset URLs at build time. This means the app doesn't need a backend to "know" which files exist.

### Deployment
When you run `npm run build`, Vite processes the `.mp3` files as static assets. They are given unique hashes and moved to the `dist/assets` folder. The generated library mapping points to these production URLs, ensuring the player works perfectly on any static hosting provider.

### Persistence
The `persist` middleware in Zustand automatically syncs the store state with `localStorage`. On page reload, the player restores your last session seamlessly.
