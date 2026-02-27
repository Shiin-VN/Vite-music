import React from 'react';
import { useMusicStore } from '../store/useMusicStore';
import { Music, ListMusic, LayoutGrid, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const { categories, selectedCategory, setSelectedCategory } = useMusicStore();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (onClose) onClose();
  };

  return (
    <div className="w-72 bg-zinc-950 border-r border-zinc-800 flex flex-col h-full overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 text-emerald-500">
            <Music size={32} strokeWidth={2.5} />
            <h1 className="text-xl font-bold tracking-tight text-white">VibeStream</h1>
          </div>
          <button onClick={onClose} className="md:hidden text-zinc-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-1">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-3">
            Library
          </p>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                selectedCategory === category
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              )}
            >
              {category === 'All' ? <LayoutGrid size={18} /> : <ListMusic size={18} />}
              {category}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6">
        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
          <p className="text-xs text-zinc-500 leading-relaxed">
            Automatic indexing enabled. Add .mp3 files to <code className="text-emerald-500/80">src/data/music/</code> to see them here.
          </p>
        </div>
      </div>
    </div>
  );
};
