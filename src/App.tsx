import React, { useState, useMemo } from 'react';
import { 
  initialBooks, 
  initialLoans, 
  initialNotifications, 
  initialUserProfile, 
  initialFavorites 
} from './data';
import { ActiveTab, Book, Loan, LibraryNotification, UserProfile } from './types';

// Component imports
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardView from './components/DashboardView';
import CatalogView from './components/CatalogView';
import BookDetailView from './components/BookDetailView';
import BorrowConfirmView from './components/BorrowConfirmView';
import HistoryView from './components/HistoryView';
import FavoritesView from './components/FavoritesView';
import NotificationsView from './components/NotificationsView';
import ProfileView from './components/ProfileView';
import AuthView from './components/AuthView';

export default function App() {
  // Authentication status
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  
  // App primary states
  const [activeTab, setActiveTab] = useState<ActiveTab>({ id: 'dashboard' });
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [loans, setLoans] = useState<Loan[]>(initialLoans);
  const [notifications, setNotifications] = useState<LibraryNotification[]>(initialNotifications);
  const [favorites, setFavorites] = useState<string[]>(initialFavorites);
  const [fineBalance, setFineBalance] = useState<number>(15000);
  
  // UI Layout states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Selected item contexts for specific views
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [bookToBorrow, setBookToBorrow] = useState<Book | null>(null);

  // Computed values
  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => n.unread).length;
  }, [notifications]);

  // Auth Handlers
  const handleLoginSuccess = (name: string, role: string) => {
    setUser(prev => ({
      ...prev,
      name,
      program: role === 'Lecturer' ? 'FST Lecturer' : 'Information Systems'
    }));
    setUserLoggedIn(true);
    setActiveTab({ id: 'dashboard' });
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
    setActiveTab({ id: 'dashboard' });
    setSelectedBookId(null);
    setBookToBorrow(null);
  };

  // Favorite Handlers
  const handleToggleFavorite = (bookId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(bookId);
      if (exists) {
        return prev.filter(id => id !== bookId);
      } else {
        return [...prev, bookId];
      }
    });
  };

  // Nav Handlers
  const handleSelectBook = (bookId: string) => {
    setSelectedBookId(bookId);
    setActiveTab({ id: 'detail' });
  };

  // Loan Actions
  const handleStartBorrow = (bookId: string) => {
    const targetBook = books.find(b => b.id === bookId);
    if (targetBook && targetBook.status === 'Available') {
      setBookToBorrow(targetBook);
      setActiveTab({ id: 'confirm' });
    } else {
      alert('Maaf, buku ini sedang tidak tersedia untuk dipinjam.');
    }
  };

  const handleConfirmBorrow = (bookId: string, borrowDate: string, returnDate: string) => {
    const targetBook = books.find(b => b.id === bookId);
    if (!targetBook) return;

    // 1. Update book status to Borrowed
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, status: 'Borrowed' } : b));

    // 2. Add new loan entry
    const newLoan: Loan = {
      id: `l-new-${Date.now()}`,
      bookId: targetBook.id,
      bookTitle: targetBook.title,
      bookAuthor: targetBook.author,
      bookCover: targetBook.cover,
      borrowDate,
      dueDate: returnDate,
      status: 'Active'
    };
    setLoans(prev => [newLoan, ...prev]);

    // 3. Create success notification
    const newNotif: LibraryNotification = {
      id: `n-new-${Date.now()}`,
      type: 'Success',
      title: 'Book Borrowed Successfully',
      message: `You have successfully checked out "${targetBook.title}". Please return it by ${returnDate}.`,
      date: 'Just now',
      unread: true
    };
    setNotifications(prev => [newNotif, ...prev]);

    // 4. Update user active counts
    setUser(prev => ({
      ...prev,
      activeLoansCount: prev.activeLoansCount + 1,
      booksBorrowedCount: prev.booksBorrowedCount + 1
    }));

    // Reset borrow context and redirect to history tab
    setBookToBorrow(null);
    setActiveTab({ id: 'history' });
    alert(`Peminjaman Berhasil! Buku "${targetBook.title}" telah ditambahkan ke daftar peminjaman aktif Anda.`);
  };

  const handleReturnBook = (loanId: string) => {
    const targetLoan = loans.find(l => l.id === loanId);
    if (!targetLoan) return;

    // 1. Set loan status to Returned
    setLoans(prev => prev.map(l => l.id === loanId ? { ...l, status: 'Returned' } : l));

    // 2. Make book Available again
    setBooks(prev => prev.map(b => b.id === targetLoan.bookId ? { ...b, status: 'Available' } : b));

    // 3. Add success notification
    const newNotif: LibraryNotification = {
      id: `n-ret-${Date.now()}`,
      type: 'Success',
      title: 'Book Returned Successfully',
      message: `Thank you for returning "${targetLoan.bookTitle}" on time.`,
      date: 'Just now',
      unread: true
    };
    setNotifications(prev => [newNotif, ...prev]);

    // 4. Update user active loans count
    setUser(prev => ({
      ...prev,
      activeLoansCount: Math.max(0, prev.activeLoansCount - 1)
    }));

    alert(`Pengembalian Berhasil! Terima kasih telah mengembalikan buku "${targetLoan.bookTitle}".`);
  };

  // Fines Settlement
  const handlePayFines = () => {
    if (confirm(`Apakah Anda ingin melunasi denda Anda sebesar IDR ${fineBalance.toLocaleString('id-ID')}?`)) {
      setFineBalance(0);
      // Change overdue loan status to returned (or active if still within date, let's assume cleared/returned)
      setLoans(prev => prev.map(l => l.status === 'Overdue' ? { ...l, status: 'Returned' } : l));
      
      // Update books statuses
      const overdueLoanBookIds = loans.filter(l => l.status === 'Overdue').map(l => l.bookId);
      setBooks(prev => prev.map(b => overdueLoanBookIds.includes(b.id) ? { ...b, status: 'Available' } : b));

      // Notification
      const newNotif: LibraryNotification = {
        id: `n-fine-${Date.now()}`,
        type: 'Success',
        title: 'Fines Settle Completed',
        message: 'Your payment was processed successfully. Thank you for resolving your outstanding balance.',
        date: 'Just now',
        unread: true
      };
      setNotifications(prev => [newNotif, ...prev]);
      alert('Pembayaran denda berhasil diselesaikan! Status akun Anda sekarang bersih.');
    }
  };

  // Notification management
  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleClearOneNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleUpdateProfile = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  // Redirection helpers
  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Main navigation switcher content
  const renderTabContent = () => {
    switch (activeTab.id) {
      case 'dashboard':
        return (
          <DashboardView
            user={user}
            books={books}
            loans={loans}
            favoritesCount={favorites.length}
            onSelectBook={handleSelectBook}
            onToggleFavorite={handleToggleFavorite}
            onBorrowBook={handleStartBorrow}
            onNavigateToCatalog={() => handleSelectTab({ id: 'catalog' })}
            onNavigateToHistory={() => handleSelectTab({ id: 'history' })}
          />
        );
      case 'catalog':
        return (
          <CatalogView
            books={books}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectBook={handleSelectBook}
            onBorrowBook={handleStartBorrow}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );
      case 'history':
        return (
          <HistoryView
            loans={loans}
            onReturnBook={handleReturnBook}
            onPayFines={handlePayFines}
            fineBalance={fineBalance}
          />
        );
      case 'favorites':
        return (
          <FavoritesView
            books={books}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectBook={handleSelectBook}
            onBorrowBook={handleStartBorrow}
          />
        );
      case 'notifications':
        return (
          <NotificationsView
            notifications={notifications}
            onMarkAllRead={handleMarkAllNotificationsRead}
            onClearOne={handleClearOneNotification}
          />
        );
      case 'profile':
        return (
          <ProfileView
            user={user}
            onUpdateUser={handleUpdateProfile}
            onLogout={handleLogout}
          />
        );
      case 'detail':
        const detailedBook = books.find(b => b.id === selectedBookId) || books[0];
        return (
          <BookDetailView
            book={detailedBook}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onBack={() => handleSelectTab({ id: 'catalog' })}
            onBorrow={handleStartBorrow}
            allBooks={books}
            onSelectBook={handleSelectBook}
          />
        );
      case 'confirm':
        const bookBorrowTarget = bookToBorrow || books[0];
        return (
          <BorrowConfirmView
            book={bookBorrowTarget}
            onConfirm={handleConfirmBorrow}
            onCancel={() => handleSelectTab({ id: 'detail' })}
          />
        );
      default:
        return <div>Component Not Found</div>;
    }
  };

  // Display Login / Sign Up initially
  if (!userLoggedIn) {
    return <AuthView onLoginSuccess={handleLoginSuccess} />;
  }

  // Display the Main Application Layout
  return (
    <div className="flex h-screen bg-[#f4f6fa] text-slate-800 overflow-hidden font-sans">
      
      {/* 1. Static Sidebar Left */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        unreadCount={unreadNotificationsCount}
        onLogout={handleLogout}
      />

      {/* 2. Main content container Right */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top bar header */}
        <Topbar
          user={user}
          activeTab={activeTab}
          setActiveTab={handleSelectTab}
          setSidebarOpen={setSidebarOpen}
          unreadCount={unreadNotificationsCount}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Content canvas container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto pb-12">
            {renderTabContent()}
          </div>
        </main>

        {/* Global Footer (exactly matches mock image 3 footer) */}
        <footer className="bg-[#e2e8f0]/60 border-t border-slate-200 py-3.5 px-4 sm:px-8 text-center text-[10px] sm:text-xs text-slate-500 font-medium flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Faculty of Science and Technology - UIN Syarif Hidayatullah Jakarta</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span className="text-slate-300">|</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <span className="text-slate-300">|</span>
            <a href="#" className="hover:text-primary transition-colors">Library Rules</a>
          </div>
        </footer>

      </div>

    </div>
  );
}
