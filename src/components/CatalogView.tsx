import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, BookOpen, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Book } from '../types';
import BookCard from './BookCard';

interface CatalogViewProps {
  books: Book[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectBook: (id: string) => void;
  onBorrowBook: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function CatalogView({
  books,
  favorites,
  onToggleFavorite,
  onSelectBook,
  onBorrowBook,
  searchQuery,
  setSearchQuery
}: CatalogViewProps) {
  
  // Sidebar states
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Informatics & CS']);
  const [authorSearch, setAuthorSearch] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = [
    'Informatics & CS',
    'Computer Science',
    'Artificial Intelligence',
    'Physics',
    'Biology',
    'Chemistry',
    'Mathematics'
  ];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setAuthorSearch('');
    setYearFrom('');
    setYearTo('');
    setSearchQuery('');
  };

  // Filter books dynamically based on criteria
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      // 1. Category filter
      if (selectedCategories.length > 0) {
        // Let's do loose matching for general convenience
        const matchCat = selectedCategories.some(cat => 
          book.category.toLowerCase().includes(cat.toLowerCase())
        );
        if (!matchCat) return false;
      }

      // 2. Main Search Query (from Topbar)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = book.title.toLowerCase().includes(query);
        const matchesAuthor = book.author.toLowerCase().includes(query);
        const matchesCat = book.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAuthor && !matchesCat) return false;
      }

      // 3. Author Filter (from Sidebar)
      if (authorSearch.trim() !== '') {
        const authQuery = authorSearch.toLowerCase();
        if (!book.author.toLowerCase().includes(authQuery)) return false;
      }

      // 4. Year From
      if (yearFrom !== '') {
        const year = parseInt(yearFrom);
        if (!isNaN(year) && book.year < year) return false;
      }

      // 5. Year To
      if (yearTo !== '') {
        const year = parseInt(yearTo);
        if (!isNaN(year) && book.year > year) return false;
      }

      return true;
    });
  }, [books, selectedCategories, searchQuery, authorSearch, yearFrom, yearTo]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBooks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBooks, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-[#112d62] tracking-tight">
            Book Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Explore thousands of academic resources, journals, and textbooks.
          </p>
        </div>
        
        {/* Toggle Advanced Button */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
        >
          <SlidersHorizontal size={15} />
          <span>Advanced Search</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-5">
            {/* Category Filter */}
            <div>
              <h3 className="font-display font-bold text-sm text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
                <BookOpen size={15} className="text-primary" />
                <span>Category</span>
              </h3>
              
              <div className="mt-3 space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 text-xs text-slate-600 font-medium cursor-pointer hover:text-slate-900">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => {
                        handleCategoryToggle(cat);
                        setCurrentPage(1); // reset pagination
                      }}
                      className="rounded-sm text-[#112d62] focus:ring-[#112d62] border-slate-300"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Author Search Filter */}
            <div>
              <h3 className="font-display font-bold text-sm text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Search size={15} className="text-primary" />
                <span>Author</span>
              </h3>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Search author..."
                  value={authorSearch}
                  onChange={(e) => {
                    setAuthorSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-hidden transition-all bg-slate-50 placeholder-slate-400 font-medium"
                />
              </div>
            </div>

            {/* Publication Year Range Filter */}
            <div>
              <h3 className="font-display font-bold text-sm text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Calendar size={15} className="text-primary" />
                <span>Publication Year</span>
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2.5 items-center">
                <input
                  type="number"
                  placeholder="From"
                  value={yearFrom}
                  onChange={(e) => {
                    setYearFrom(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-center focus:ring-1 focus:ring-primary focus:border-primary outline-hidden transition-all bg-slate-50 placeholder-slate-400 font-medium"
                />
                <input
                  type="number"
                  placeholder="To"
                  value={yearTo}
                  onChange={(e) => {
                    setYearTo(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-center focus:ring-1 focus:ring-primary focus:border-primary outline-hidden transition-all bg-slate-50 placeholder-slate-400 font-medium"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Catalog List */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Active Filters Pill Bar */}
          <div className="flex flex-wrap items-center gap-2.5 bg-white border border-slate-200/80 rounded-xl p-3 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              Active Filters:
            </span>

            {selectedCategories.map((cat) => (
              <span key={cat} className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/20">
                <span>{cat}</span>
                <button onClick={() => handleCategoryToggle(cat)} className="hover:text-primary-dark transition-colors">
                  <X size={12} />
                </button>
              </span>
            ))}

            {searchQuery !== '' && (
              <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-500/20">
                <span>Search: {searchQuery}</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-amber-800 transition-colors">
                  <X size={12} />
                </button>
              </span>
            )}

            {authorSearch !== '' && (
              <span className="inline-flex items-center gap-1 bg-indigo-500/10 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-500/20">
                <span>Author: {authorSearch}</span>
                <button onClick={() => setAuthorSearch('')} className="hover:text-indigo-800 transition-colors">
                  <X size={12} />
                </button>
              </span>
            )}

            {(yearFrom !== '' || yearTo !== '') && (
              <span className="inline-flex items-center gap-1 bg-teal-500/10 text-teal-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-teal-500/20">
                <span>Years: {yearFrom || '*'} - {yearTo || '*'}</span>
                <button onClick={() => { setYearFrom(''); setYearTo(''); }} className="hover:text-teal-800 transition-colors">
                  <X size={12} />
                </button>
              </span>
            )}

            {/* Clear All Button */}
            {(selectedCategories.length > 0 || searchQuery !== '' || authorSearch !== '' || yearFrom !== '' || yearTo !== '') ? (
              <button
                onClick={handleClearFilters}
                className="text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors ml-auto hover:underline pr-2"
              >
                Clear all
              </button>
            ) : (
              <span className="text-xs text-slate-400 italic">None selected. Showing all books.</span>
            )}
          </div>

          {/* Book List Grid */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {paginatedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  isFavorite={favorites.includes(book.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelect={onSelectBook}
                  onBorrow={onBorrowBook}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-xs">
              <BookOpen size={48} className="mx-auto text-slate-300 stroke-[1.5]" />
              <h3 className="font-display font-extrabold text-slate-800 text-lg mt-4">
                No Books Found
              </h3>
              <p className="text-sm text-slate-500 mt-1.5 max-w-sm mx-auto">
                We couldn't find any book matches with your active filters. Try clearing some selections or searching differently.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination bar */}
          {filteredBooks.length > itemsPerPage && (
            <div className="flex justify-between items-center bg-white border border-slate-200/80 rounded-xl px-4 py-3 shadow-xs">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-600 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                      currentPage === page
                        ? 'bg-[#112d62] text-white'
                        : 'hover:bg-slate-100 text-slate-600 border border-transparent'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-600 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
