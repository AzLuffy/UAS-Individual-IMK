import React from 'react';
import { BookOpen, Star, Binary, ShieldAlert, Cpu, Award } from 'lucide-react';

interface BookCoverComponentProps {
  title: string;
  author: string;
  category: string;
  coverStyle?: string;
  className?: string;
}

export default function BookCoverComponent({
  title,
  author,
  category,
  coverStyle = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  className = 'w-full h-48'
}: BookCoverComponentProps) {
  
  // Choose an icon based on category
  const getCategoryIcon = () => {
    const cat = category.toLowerCase();
    if (cat.includes('computer') || cat.includes('informatics') || cat.includes('software')) {
      return <Binary size={28} className="text-white/20" />;
    }
    if (cat.includes('artificial') || cat.includes('ai')) {
      return <Cpu size={28} className="text-white/20" />;
    }
    if (cat.includes('physics') || cat.includes('chemistry')) {
      return <Award size={28} className="text-white/20" />;
    }
    return <BookOpen size={28} className="text-white/20" />;
  };

  return (
    <div 
      className={`relative ${className} rounded-lg overflow-hidden flex flex-col justify-between p-4 shadow-md transition-transform duration-300 group-hover:scale-[1.02]`}
      style={{ background: coverStyle }}
    >
      {/* Texture / Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:12px_12px] opacity-40"></div>
      <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-black/15 shadow-[inset_-1px_0_0_rgba(255,255,255,0.08)]"></div>
      
      {/* Category Tag */}
      <div className="z-10 flex justify-between items-start">
        <span className="text-[9px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md px-2 py-0.5 rounded text-white/90">
          {category}
        </span>
        <div className="z-10 text-white/40">
          {getCategoryIcon()}
        </div>
      </div>

      {/* Main Title Area */}
      <div className="z-10 mt-auto flex flex-col gap-1.5 pl-2.5">
        <h4 className="font-display font-bold text-white text-sm sm:text-base leading-tight tracking-tight line-clamp-3 group-hover:text-amber-300 transition-colors">
          {title}
        </h4>
        <div className="w-8 h-[2px] bg-amber-400"></div>
        <p className="text-[10px] text-slate-300 font-medium truncate">
          {author}
        </p>
      </div>

      {/* Decorative library marking */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-20">
        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
      </div>
    </div>
  );
}
