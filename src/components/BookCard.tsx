import React from 'react';
import { Star, Bookmark, BookmarkCheck, Heart } from 'lucide-react';
import { Book } from '../types';
import BookCoverComponent from './BookCoverComponent';

interface BookCardProps {
  key?: string | number;
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (id: string) => void;
  onBorrow: (id: string) => void;
}

export default function BookCard({
  book,
  isFavorite,
  onToggleFavorite,
  onSelect,
  onBorrow
}: BookCardProps) {
  
  // Custom badges based on status
  const getStatusBadge = () => {
    switch (book.status) {
      case 'Available':
        return (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Available
          </span>
        );
      case 'Borrowed':
        return (
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            Borrowed
          </span>
        );
      case 'Hold':
        return (
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            On Hold
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
            Waitlist
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group h-full">
      {/* Book Cover Container */}
      <div className="relative p-3 bg-slate-50 flex-shrink-0">
        <div onClick={() => onSelect(book.id)} className="cursor-pointer">
          <BookCoverComponent
            title={book.title}
            author={book.author}
            category={book.category}
            coverStyle={book.cover}
            className="w-full h-44 sm:h-48"
          />
        </div>

        {/* Rating overlay */}
        <div className="absolute top-5 right-5 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-md text-white text-[10px] font-bold">
          <Star size={11} className="fill-amber-400 text-amber-400" />
          <span>{book.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Book details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Status */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-semibold tracking-wider text-primary uppercase">
              {book.category}
            </span>
            {getStatusBadge()}
          </div>

          {/* Title & Author */}
          <h3 
            onClick={() => onSelect(book.id)}
            className="font-display font-bold text-slate-800 text-sm sm:text-base line-clamp-2 leading-snug hover:text-primary cursor-pointer mb-1"
          >
            {book.title}
          </h3>
          <p className="text-xs text-slate-500 font-medium truncate mb-4">
            by {book.author}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-auto">
          {book.status === 'Available' ? (
            <button
              onClick={() => onBorrow(book.id)}
              className="flex-1 bg-[#112d62] hover:bg-[#0d234d] text-white text-xs font-semibold py-2 px-3 rounded-lg transition-all shadow-xs hover:shadow-md cursor-pointer text-center"
            >
              Borrow
            </button>
          ) : (
            <button
              onClick={() => onSelect(book.id)}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-lg transition-all cursor-pointer text-center"
            >
              Details
            </button>
          )}

          {/* Favorite button */}
          <button
            onClick={() => onToggleFavorite(book.id)}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              isFavorite 
                ? 'border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100' 
                : 'border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            }`}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            <Heart size={16} className={isFavorite ? "fill-rose-500" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}
