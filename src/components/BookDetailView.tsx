import React from 'react';
import { ArrowLeft, Star, Heart, Bookmark, Layers, Calendar, Landmark, BookMarked } from 'lucide-react';
import { Book } from '../types';
import BookCoverComponent from './BookCoverComponent';

interface BookDetailViewProps {
  book: Book;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onBorrow: (id: string) => void;
  allBooks: Book[];
  onSelectBook: (id: string) => void;
}

export default function BookDetailView({
  book,
  favorites,
  onToggleFavorite,
  onBack,
  onBorrow,
  allBooks,
  onSelectBook
}: BookDetailViewProps) {
  
  const isFavorite = favorites.includes(book.id);

  // Filter related books: same category, excluding the current book itself
  const relatedBooks = allBooks
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  // If no related books, select some others
  const displayRelated = relatedBooks.length > 0 
    ? relatedBooks 
    : allBooks.filter(b => b.id !== book.id).slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-[#112d62] text-xs font-bold transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>Back to Catalog</span>
      </button>

      {/* Main details split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: Full Cover & quick buttons */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
            <BookCoverComponent
              title={book.title}
              author={book.author}
              category={book.category}
              coverStyle={book.cover}
              className="w-full h-72 sm:h-80 rounded-xl shadow-lg"
            />

            {/* Quick borrow stats block */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
                <span className={`block text-xs font-extrabold mt-1 uppercase ${book.status === 'Available' ? 'text-emerald-600' : 'text-amber-500'}`}>
                  {book.status}
                </span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rating</span>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold mt-1 text-slate-800">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span>{book.rating.toFixed(1)}</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              {book.status === 'Available' ? (
                <button
                  onClick={() => onBorrow(book.id)}
                  className="w-full py-3 bg-[#f2be22] hover:bg-[#ddaa1a] text-[#112d62] font-extrabold text-xs rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookMarked size={16} className="stroke-[2.5px]" />
                  <span>BORROW BOOK</span>
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-3 bg-slate-100 border border-slate-200 text-slate-400 font-bold text-xs rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>NOT AVAILABLE</span>
                </button>
              )}

              <button
                onClick={() => onToggleFavorite(book.id)}
                className={`w-full py-2.5 px-4 border text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isFavorite 
                    ? 'border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100' 
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Heart size={15} className={isFavorite ? 'fill-rose-500 text-rose-500' : ''} />
                <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Right column: Synopsis & copies list */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Book Meta */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
            <div>
              {/* Category tag & ISBN */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded">
                  {book.category}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-[11px] text-slate-400 font-medium">
                  ISBN: 978-0262033848
                </span>
              </div>

              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-800 tracking-tight leading-tight">
                {book.title}
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-2">
                by <span className="font-semibold text-slate-800">{book.author}</span>
              </p>
            </div>

            {/* Fast Specifications */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-b border-slate-100 py-4 text-slate-600">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-primary/75" />
                <div className="text-xs">
                  <span className="block text-slate-400 text-[10px] font-bold uppercase">Publisher</span>
                  <span className="font-bold text-slate-800">{book.publisher}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary/75" />
                <div className="text-xs">
                  <span className="block text-slate-400 text-[10px] font-bold uppercase">Year</span>
                  <span className="font-bold text-slate-800">{book.year}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-primary/75" />
                <div className="text-xs">
                  <span className="block text-slate-400 text-[10px] font-bold uppercase">Pages</span>
                  <span className="font-bold text-slate-800">{book.pages}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Landmark size={16} className="text-primary/75" />
                <div className="text-xs">
                  <span className="block text-slate-400 text-[10px] font-bold uppercase">Location</span>
                  <span className="font-bold text-slate-800">{book.location}</span>
                </div>
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h3 className="font-display font-bold text-sm text-slate-800 mb-2">
                Synopsis
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                {book.synopsis}
              </p>
            </div>
          </div>

          {/* Library Copies List */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
            <h3 className="font-display font-extrabold text-slate-800 text-sm sm:text-base border-b border-slate-100 pb-3">
              Library Copies
            </h3>

            <div className="overflow-x-auto mt-3">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase">
                    <th className="py-2.5">Barcode</th>
                    <th className="py-2.5">Location</th>
                    <th className="py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                  <tr>
                    <td className="py-3.5 font-mono text-[11px] text-[#112d62]">{book.barcode}</td>
                    <td className="py-3.5">{book.location}</td>
                    <td className="py-3.5 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${book.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                        {book.status === 'Available' ? 'Available' : 'Borrowed'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-mono text-[11px] text-[#112d62]">{book.barcode.replace('A', 'B')}</td>
                    <td className="py-3.5">{book.location.replace('Floor 2', 'Reference Section')}</td>
                    <td className="py-3.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        Borrowed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* Related Books Section */}
      <div className="space-y-4">
        <h3 className="font-display font-extrabold text-lg text-slate-800 tracking-tight">
          Related Books
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {displayRelated.map((b) => (
            <div 
              key={b.id}
              onClick={() => onSelectBook(b.id)}
              className="bg-white border border-slate-100 rounded-xl p-3 shadow-xs hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="w-full h-36 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0">
                <BookCoverComponent
                  title=""
                  author=""
                  category={b.category}
                  coverStyle={b.cover}
                  className="w-full h-full"
                />
              </div>
              <div className="mt-3">
                <h4 className="font-display font-bold text-xs sm:text-sm text-slate-800 line-clamp-1 group-hover:text-primary transition-colors">
                  {b.title}
                </h4>
                <p className="text-[10px] text-slate-400 font-medium truncate">
                  by {b.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
