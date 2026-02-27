import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { SongList } from './components/SongList';
import { PlayerBar } from './components/PlayerBar';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black text-white font-sans selection:bg-emerald-500/30 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 pb-24 relative">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-zinc-950/50 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-emerald-500">
            <Menu size={24} onClick={() => setIsSidebarOpen(true)} className="text-white cursor-pointer" />
            <span className="font-bold tracking-tight text-white">VibeStream</span>
          </div>
        </header>

        <SongList />
      </main>

      {/* Player Bar */}
      <PlayerBar />
    </div>
  );
}
