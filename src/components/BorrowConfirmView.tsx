import React, { useState } from 'react';
import { BookOpen, Calendar, HelpCircle, Check, ShieldAlert, ArrowLeft, BookmarkCheck } from 'lucide-react';
import { Book } from '../types';
import BookCoverComponent from './BookCoverComponent';

interface BorrowConfirmViewProps {
  book: Book;
  onConfirm: (bookId: string, borrowDate: string, returnDate: string) => void;
  onCancel: () => void;
}

export default function BorrowConfirmView({
  book,
  onConfirm,
  onCancel
}: BorrowConfirmViewProps) {
  
  const today = '2026-07-03';
  const fourteenDaysLater = '2026-07-17'; // calculated 14 days standard limit

  const [borrowDate, setBorrowDate] = useState(today);
  const [returnDate, setReturnDate] = useState(fourteenDaysLater);
  const [agreed, setAgreed] = useState(false);

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('Silakan setujui Aturan Perpustakaan sebelum meminjam buku.');
      return;
    }
    onConfirm(book.id, borrowDate, returnDate);
  };

  const terms = [
    { text: 'Books must be returned in their original condition.', icon: Check },
    { text: 'Late returns incur a fee of IDR 5,000 per day.', icon: ShieldAlert, isWarning: true },
    { text: 'Lost or damaged items require full replacement cost.', icon: HelpCircle },
    { text: 'Renewals must be done 24 hours before the due date.', icon: Check }
  ];

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Back to detail button */}
      <button 
        onClick={onCancel}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-xs font-bold transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>Cancel</span>
      </button>

      {/* Header */}
      <div>
        <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-[#112d62] tracking-tight">
          Confirm Borrowing
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Review the details below to finalize your book loan.
        </p>
      </div>

      <form onSubmit={handleConfirmSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Book details + period inputs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Book Details Summary Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-display font-extrabold text-[#112d62] text-sm sm:text-base border-b border-slate-100 pb-2 flex items-center gap-2">
              <BookOpen size={16} />
              <span>Book Details</span>
            </h3>

            <div className="flex gap-4">
              <div className="w-16 h-24 sm:w-20 sm:h-28 flex-shrink-0">
                <BookCoverComponent
                  title=""
                  author=""
                  category={book.category}
                  coverStyle={book.cover}
                  className="w-full h-full rounded-lg"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {book.category}
                </span>
                <h4 className="font-display font-extrabold text-slate-800 text-sm sm:text-base mt-2 line-clamp-1">
                  {book.title}
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  by {book.author}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1.5 text-[11px] font-medium text-slate-600">
                  <p>Edition: <span className="font-bold text-slate-800">3rd Edition</span></p>
                  <p>ISBN: <span className="font-bold text-slate-800">978-0321573513</span></p>
                  <p className="col-span-2">Location: <span className="font-bold text-slate-800">{book.location}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Loan Period Dates Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-display font-extrabold text-[#112d62] text-sm sm:text-base border-b border-slate-100 pb-2 flex items-center gap-2">
              <Calendar size={16} />
              <span>Loan Period</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                  Borrow Date
                </label>
                <input
                  type="date"
                  required
                  value={borrowDate}
                  onChange={(e) => setBorrowDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-hidden transition-all bg-slate-50 text-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                  Return Date
                </label>
                <input
                  type="date"
                  required
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-hidden transition-all bg-slate-50 text-slate-700 font-bold"
                />
                <span className="text-[10px] text-slate-400 italic mt-1 block">
                  Maximum loan period is 14 days.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Terms + Action Confirm (exactly matches mock image 6) */}
        <div className="space-y-6">
          
          {/* Borrowing Terms Container */}
          <div className="bg-[#112d62] text-white rounded-2xl overflow-hidden shadow-md">
            <div className="p-4 border-b border-white/10 flex items-center gap-2 bg-black/10">
              <ShieldAlert size={16} className="text-amber-400" />
              <h3 className="font-display font-bold text-xs sm:text-sm uppercase tracking-wider">
                Borrowing Terms
              </h3>
            </div>

            <div className="p-5 space-y-4 text-xs font-medium text-slate-200">
              {terms.map((term, index) => {
                const Icon = term.icon;
                return (
                  <div key={index} className="flex gap-3 items-start">
                    <div className={`p-1 rounded-sm flex-shrink-0 ${term.isWarning ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-white'}`}>
                      <Icon size={12} />
                    </div>
                    <p className="leading-tight">{term.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Policy Acceptance & Submit */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <label className="flex items-start gap-3 text-xs font-medium text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded-sm text-[#112d62] focus:ring-[#112d62] border-slate-300"
              />
              <span className="leading-tight">
                I agree to the <span className="text-primary font-bold hover:underline">University Library Policy</span> and accept responsibility for this loan.
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-[#f2be22] hover:bg-[#ddaa1a] text-[#112d62] font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
            >
              <BookmarkCheck size={16} />
              <span>Confirm Borrowing</span>
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-bold rounded-xl transition-all cursor-pointer uppercase text-center"
            >
              Cancel
            </button>
          </div>

        </div>

      </form>

    </div>
  );
}
