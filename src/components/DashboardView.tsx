import React from 'react';
import { 
  BookOpen, 
  Heart, 
  AlertTriangle, 
  TrendingUp, 
  Plus, 
  Clock, 
  BookMarked,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Book, Loan, UserProfile } from '../types';
import BookCard from './BookCard';
import BookCoverComponent from './BookCoverComponent';

interface DashboardViewProps {
  user: UserProfile;
  books: Book[];
  loans: Loan[];
  favoritesCount: number;
  onSelectBook: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onBorrowBook: (id: string) => void;
  onNavigateToCatalog: () => void;
  onNavigateToHistory: () => void;
}

export default function DashboardView({
  user,
  books,
  loans,
  favoritesCount,
  onSelectBook,
  onToggleFavorite,
  onBorrowBook,
  onNavigateToCatalog,
  onNavigateToHistory
}: DashboardViewProps) {
  
  // Calculate overdue loans
  const overdueLoans = loans.filter(l => l.status === 'Overdue');
  const activeLoans = loans.filter(l => l.status === 'Active');

  // Featured reads: first 2 available books
  const featuredBooks = books.filter(b => b.id === '1' || b.id === '2');

  // New arrivals: books 3, 4, 5
  const newArrivals = books.filter(b => b.id === '3' || b.id === '4' || b.id === '5');

  // Popular in Information Systems: books 6, 7
  const popularInIS = books.filter(b => b.id === '6' || b.id === '7');

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* 1. Welcoming Hero Banner */}
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#112d62] tracking-tight">
          Welcome back, {user.name.split(' ')[0]}!
        </h1>
        <p className="text-sm text-slate-500 mt-1.5 font-medium">
          Here is your reading overview for today.
        </p>
      </div>

      {/* 2. Three Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Borrowed */}
        <div 
          onClick={onNavigateToHistory}
          className="bg-white border-l-4 border-[#112d62] rounded-xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex justify-between items-center group border border-slate-200"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Total Borrowed
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-[#112d62]/10 text-[#112d62]">
                Active
              </span>
            </div>
            <p className="text-3xl font-extrabold font-display text-slate-800 mt-2">
              {loans.length}
            </p>
          </div>
          <div className="p-3 bg-[#112d62]/5 text-[#112d62] rounded-xl group-hover:scale-110 transition-transform">
            <BookMarked size={22} className="stroke-[2px]" />
          </div>
        </div>

        {/* Favorites */}
        <div 
          onClick={() => onNavigateToCatalog()} // will filter later or just show catalog
          className="bg-white border-l-4 border-amber-400 rounded-xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex justify-between items-center group border border-slate-200"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Favorites
              </span>
            </div>
            <p className="text-3xl font-extrabold font-display text-slate-800 mt-2">
              {favoritesCount}
            </p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl group-hover:scale-110 transition-transform">
            <Heart size={22} className="fill-amber-500 text-amber-500" />
          </div>
        </div>

        {/* Overdue */}
        <div 
          onClick={onNavigateToHistory}
          className="bg-white border-l-4 border-rose-500 rounded-xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex justify-between items-center group border border-slate-200"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Overdue
              </span>
              <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${overdueLoans.length > 0 ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-500'}`}>
                {overdueLoans.length > 0 ? 'Action Needed' : 'All Clear'}
              </span>
            </div>
            <p className="text-3xl font-extrabold font-display text-slate-800 mt-2">
              {overdueLoans.length}
            </p>
          </div>
          <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform ${overdueLoans.length > 0 ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400'}`}>
            <AlertTriangle size={22} />
          </div>
        </div>
      </div>

      {/* 3. Grid: Featured Reads (Left) & New Arrivals (Right Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: Featured Reads */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles size={18} className="text-[#112d62]" />
              <h2 className="font-display font-extrabold text-lg sm:text-xl text-slate-800 tracking-tight">
                Featured Reads
              </h2>
            </div>
            <button 
              onClick={onNavigateToCatalog}
              className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {featuredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={true} // initial favorite mock sets true for id 1
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelectBook}
                onBorrow={onBorrowBook}
              />
            ))}
          </div>
        </div>

        {/* Right column: New Arrivals Block (styled exactly like the layout in mock image 3) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-amber-500" />
              <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-800 tracking-tight">
                New Arrivals
              </h3>
            </div>

            {/* List of 3 small arrival records */}
            <div className="space-y-4">
              {newArrivals.map((book) => (
                <div 
                  key={book.id}
                  onClick={() => onSelectBook(book.id)}
                  className="flex items-center gap-4 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-16 flex-shrink-0">
                    <BookCoverComponent
                      title="" // blank title on tiny cover as in screenshot
                      author=""
                      category={book.category}
                      coverStyle={book.cover}
                      className="w-full h-full rounded-md shadow-xs"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-xs sm:text-sm text-slate-800 line-clamp-1 group-hover:text-[#112d62] transition-colors">
                      {book.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium truncate">
                      by {book.author}
                    </p>
                    <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider text-primary">
                      {book.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Browse Catalog Full Button */}
          <button
            onClick={onNavigateToCatalog}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-[#112d62] text-[#112d62] text-xs font-bold rounded-lg transition-all text-center cursor-pointer shadow-xs"
          >
            Browse Catalog
          </button>
        </div>

      </div>

      {/* 4. Popular in Information Systems Section */}
      <div className="space-y-4">
        <h2 className="font-display font-extrabold text-lg sm:text-xl text-slate-800 tracking-tight flex items-center gap-2">
          <span>Popular in Information Systems</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {popularInIS.map((book) => (
            <div 
              key={book.id}
              onClick={() => onSelectBook(book.id)}
              className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-20 flex-shrink-0">
                  <BookCoverComponent
                    title=""
                    author=""
                    category=""
                    coverStyle={book.cover}
                    className="w-full h-full rounded-md shadow-sm"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-sm sm:text-base text-slate-800 truncate group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                    by {book.author}
                  </p>
                  
                  {/* Custom availability indicator */}
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${book.status === 'Available' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                    <span className="text-[10px] font-bold text-slate-500">
                      {book.status === 'Available' ? 'Available' : 'Due in 2 days'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrow right link */}
              <div className="p-2 text-slate-400 group-hover:text-[#112d62] group-hover:translate-x-1 transition-all">
                <ArrowRight size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
