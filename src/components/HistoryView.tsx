import React, { useState } from 'react';
import { History, Calendar, CheckCircle2, ShieldAlert, BookOpen, Receipt, Sparkles } from 'lucide-react';
import { Loan, Book } from '../types';
import BookCoverComponent from './BookCoverComponent';

interface HistoryViewProps {
  loans: Loan[];
  onReturnBook: (loanId: string) => void;
  onPayFines: () => void;
  fineBalance: number;
}

export default function HistoryView({
  loans,
  onReturnBook,
  onPayFines,
  fineBalance
}: HistoryViewProps) {
  
  const [activeTab, setActiveTab] = useState<'active' | 'returned' | 'overdue'>('active');

  // Filter lists
  const activeLoansList = loans.filter(l => l.status === 'Active');
  const overdueLoansList = loans.filter(l => l.status === 'Overdue');
  const returnedLoansList = loans.filter(l => l.status === 'Returned');

  const getFilteredLoans = () => {
    switch (activeTab) {
      case 'active': return activeLoansList;
      case 'overdue': return overdueLoansList;
      case 'returned': return returnedLoansList;
    }
  };

  const handleReturn = (loanId: string) => {
    if (confirm("Apakah Anda yakin ingin mengembalikan buku ini ke Perpustakaan?")) {
      onReturnBook(loanId);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-[#112d62] tracking-tight">
          Borrowing History
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Track your active loans, past returns, and any outstanding items.
        </p>
      </div>

      {/* Split layout (exactly matches mock image 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Tabs & Loans List */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Custom Tab Switcher */}
          <div className="flex border-b border-slate-200 gap-6 text-xs sm:text-sm font-bold bg-white p-3 rounded-xl border border-slate-200/50 shadow-xs">
            <button
              onClick={() => setActiveTab('active')}
              className={`pb-2.5 px-2 transition-all relative ${activeTab === 'active' ? 'text-[#112d62]' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <span className="flex items-center gap-2">
                <span>Active Loans</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'active' ? 'bg-[#112d62]/10 text-[#112d62]' : 'bg-slate-100 text-slate-500'}`}>
                  {activeLoansList.length}
                </span>
              </span>
              {activeTab === 'active' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#112d62] rounded-full" />}
            </button>

            <button
              onClick={() => setActiveTab('returned')}
              className={`pb-2.5 px-2 transition-all relative ${activeTab === 'returned' ? 'text-[#112d62]' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <span>Returned</span>
              {activeTab === 'returned' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#112d62] rounded-full" />}
            </button>

            <button
              onClick={() => setActiveTab('overdue')}
              className={`pb-2.5 px-2 transition-all relative ${activeTab === 'overdue' ? 'text-rose-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <span className="flex items-center gap-1.5">
                <span>Overdue</span>
                {overdueLoansList.length > 0 && (
                  <ShieldAlert size={14} className="text-rose-600 animate-pulse" />
                )}
              </span>
              {activeTab === 'overdue' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-600 rounded-full" />}
            </button>
          </div>

          {/* Loans Grid / list of items */}
          <div className="space-y-4">
            {getFilteredLoans().length > 0 ? (
              getFilteredLoans().map((loan) => (
                <div 
                  key={loan.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 shadow-xs hover:shadow-md transition-shadow group"
                >
                  {/* Book Spine Cover */}
                  <div className="w-16 h-24 flex-shrink-0">
                    <BookCoverComponent
                      title=""
                      author=""
                      category=""
                      coverStyle={loan.bookCover}
                      className="w-full h-full rounded-lg"
                    />
                  </div>

                  {/* Book and Date information */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${loan.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : loan.status === 'Overdue' ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-slate-100 text-slate-500'}`}>
                        {loan.status}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-slate-800 text-sm sm:text-base mt-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {loan.bookTitle}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium truncate">
                      by {loan.bookAuthor}
                    </p>

                    {/* Date rows */}
                    <div className="mt-4 grid grid-cols-2 gap-4 text-[11px] text-slate-500 font-medium border-t border-slate-50 pt-3">
                      <div>
                        <span className="block text-slate-400 font-bold text-[9px] uppercase">Borrowed</span>
                        <span className="font-bold text-slate-700">{loan.borrowDate}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 font-bold text-[9px] uppercase">Due Date</span>
                        <span className={`font-bold ${loan.status === 'Overdue' ? 'text-rose-600 font-extrabold' : 'text-slate-700'}`}>{loan.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons on the far right */}
                  {loan.status !== 'Returned' && (
                    <div className="w-full sm:w-auto flex justify-center flex-shrink-0">
                      <button
                        onClick={() => handleReturn(loan.id)}
                        className="w-full sm:w-auto py-2 px-5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                      >
                        Return Now
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-xs">
                <BookOpen size={48} className="mx-auto text-slate-300 stroke-[1.5]" />
                <h3 className="font-display font-bold text-slate-800 text-base mt-4">
                  No Loans Found
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  You do not have any borrowed items matching this selection. Check other tabs.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Right Sidebar Column: Summary & Fines (exactly matches mock image 7) */}
        <div className="space-y-6">
          
          {/* Loan Summary Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-display font-extrabold text-slate-800 text-sm sm:text-base border-b border-slate-100 pb-2 flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              <span>Loan Summary</span>
            </h3>

            <div className="space-y-3 font-medium text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Active Loans</span>
                <span className="font-bold text-slate-800">{activeLoansList.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Overdue Items</span>
                <span className={`font-bold ${overdueLoansList.length > 0 ? 'text-rose-600 font-extrabold' : 'text-slate-800'}`}>
                  {overdueLoansList.length}
                </span>
              </div>

              {/* Gauge Gauge Allowed Items indicator */}
              <div className="pt-4">
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase mb-1">
                  <span>Quota Limit</span>
                  <span>{loans.length} of 4 items</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500" 
                    style={{ width: `${(loans.length / 4) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Outstanding Fines block */}
          {fineBalance > 0 && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-rose-700">
                <Receipt size={18} />
                <h3 className="font-display font-bold text-sm sm:text-base">
                  Outstanding Fines
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                You have an accumulated fine of <span className="font-extrabold text-rose-600">IDR {fineBalance.toLocaleString('id-ID')}</span> due to overdue books. Please settle this fine immediately.
              </p>
              <button
                onClick={onPayFines}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer text-center"
              >
                Pay Now
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
