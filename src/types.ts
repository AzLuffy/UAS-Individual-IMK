export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  category: string;
  status: 'Available' | 'Borrowed' | 'Hold' | 'Waitlist';
  rating: number;
  synopsis: string;
  publisher: string;
  year: number;
  pages: number;
  barcode: string;
  location: string;
}

export interface Loan {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  borrowDate: string;
  dueDate: string;
  status: 'Active' | 'Returned' | 'Overdue';
  fineAmount?: number;
}

export interface LibraryNotification {
  id: string;
  type: 'Reminder' | 'Success' | 'System';
  title: string;
  message: string;
  date: string;
  unread: boolean;
}

export interface UserProfile {
  name: string;
  idNumber: string;
  email: string;
  phone: string;
  avatar: string;
  faculty: string;
  program: string;
  booksBorrowedCount: number;
  activeLoansCount: number;
  notificationPreferences: {
    dueDateReminders: boolean;
    holdAvailability: boolean;
    libraryAnnouncements: boolean;
  };
}

export interface ActiveTab {
  id: 'dashboard' | 'catalog' | 'history' | 'favorites' | 'notifications' | 'profile' | 'detail' | 'confirm' | 'login' | 'register';
  bookId?: string; // used for navigating to detail page
}
