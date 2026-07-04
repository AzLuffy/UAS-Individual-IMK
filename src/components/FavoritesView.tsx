import React from 'react';
import { Heart, BookOpen, Sparkles } from 'lucide-react';
import { Book } from '../types';
import BookCard from './BookCard';

interface FavoritesViewProps {
  books: Book[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectBook: (id: string) => void;
  onBorrowBook: (id: string) => void;
}

export default function FavoritesView({
  books,
  favorites,
  onToggleFavorite,
  onSelectBook,
  onBorrowBook
}: FavoritesViewProps) {
  
  // Filter favorite books
  const favoriteBooks = books.filter(b => favorites.includes(b.id));

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div>
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-[#112d62] tracking-tight">
            Your Favorites
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Manage and quickly access your saved reading materials.
          </p>
        </div>
        <div className="p-3 bg-rose-50 border border-rose-100 text-rose-500 rounded-full shadow-xs">
          <Heart size={20} className="fill-rose-500" />
        </div>
      </div>

      {/* Grid of favorited books */}
      {favoriteBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {favoriteBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectBook}
              onBorrow={onBorrowBook}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-16 text-center shadow-xs">
          <Heart size={48} className="mx-auto text-slate-200 stroke-[1.5]" />
          <h3 className="font-display font-extrabold text-slate-800 text-lg mt-4">
            No Saved Favorites
          </h3>
          <p className="text-sm text-slate-500 mt-1.5 max-w-sm mx-auto">
            Click on the heart icon of any book card in the catalog to add it here for quick reference later.
          </p>
        </div>
      )}

    </div>
  );
}
