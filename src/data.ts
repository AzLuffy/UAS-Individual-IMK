import { Book, Loan, LibraryNotification, UserProfile } from './types';

export const initialBooks: Book[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    cover: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    category: 'Computer Science',
    status: 'Available',
    rating: 4.8,
    synopsis: 'Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness. The book covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively self-contained and can be used as a unit of study.',
    publisher: 'MIT Press',
    year: 2009,
    pages: 1312,
    barcode: 'FST-CS-0012A',
    location: 'Main Stack - Floor 2'
  },
  {
    id: '2',
    title: 'AI: A Modern Approach',
    author: 'Stuart Russell',
    cover: 'linear-gradient(135deg, #0B2545 0%, #134074 100%)',
    category: 'Artificial Intelligence',
    status: 'Available',
    rating: 4.9,
    synopsis: 'The long-anticipated revision of Artificial Intelligence: A Modern Approach explores the full breadth and depth of the field of artificial intelligence (AI). The 4th Edition brings readers up to date on the latest technologies, presents concepts in a more unified manner, and offers new or expanded coverage of machine learning, deep learning, transfer learning, multiagent systems, robotics, natural language processing, causality, probabilistic programming, privacy, fairness, and safe AI.',
    publisher: 'Pearson',
    year: 2020,
    pages: 1152,
    barcode: 'FST-AI-0112',
    location: 'Main Stack - Floor 3'
  },
  {
    id: '3',
    title: 'Applied Cryptography',
    author: 'Bruce Schneier',
    cover: 'linear-gradient(135deg, #050b14 0%, #111a2e 100%)',
    category: 'Computer Science',
    status: 'Available',
    rating: 4.7,
    synopsis: 'Applied Cryptography: Protocols, Algorithms, and Source Code in C is a legendary cryptographic book. It describes how programmer and electronic communications professionals can use cryptography to maintain data security. It covers multiple protocols and major cryptographic algorithms.',
    publisher: 'John Wiley & Sons',
    year: 2015,
    pages: 784,
    barcode: 'FST-CS-4031',
    location: 'Reference Section'
  },
  {
    id: '4',
    title: 'Data Science for Business',
    author: 'Foster Provost',
    cover: 'linear-gradient(135deg, #102a43 0%, #243b53 100%)',
    category: 'Informatics & CS',
    status: 'Available',
    rating: 4.6,
    synopsis: 'Written by renowned data science experts Foster Provost and Tom Fawcett, Data Science for Business introduces the fundamental principles of data science, and walks you through the "data-analytic thinking" necessary for extracting useful knowledge and business value from the data you collect.',
    publisher: 'O\'Reilly Media',
    year: 2013,
    pages: 414,
    barcode: 'FST-DS-2092',
    location: 'Main Stack - Floor 2'
  },
  {
    id: '5',
    title: 'Machine Learning',
    author: 'Tom M. Mitchell',
    cover: 'linear-gradient(135deg, #162a45 0%, #1c3d5a 100%)',
    category: 'Artificial Intelligence',
    status: 'Available',
    rating: 4.5,
    synopsis: 'This book covers the field of Machine Learning, which is the study of computer algorithms that improve automatically through experience. It provides a single source introduction to the primary approaches to machine learning.',
    publisher: 'McGraw-Hill',
    year: 1997,
    pages: 414,
    barcode: 'FST-ML-9912',
    location: 'Main Stack - Floor 3'
  },
  {
    id: '6',
    title: 'Database System Concepts',
    author: 'Abraham Silberschatz',
    cover: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)',
    category: 'Informatics & CS',
    status: 'Available',
    rating: 4.7,
    synopsis: 'Database System Concepts by Silberschatz, Korth and Sudarshan is now in its 7th edition and is one of the cornerstone texts of database education. It presents the fundamental concepts of database management in an intuitive manner.',
    publisher: 'McGraw-Hill',
    year: 2019,
    pages: 1376,
    barcode: 'FST-DB-0071',
    location: 'Main Stack - Floor 2'
  },
  {
    id: '7',
    title: 'Software Engineering',
    author: 'Ian Sommerville',
    cover: 'linear-gradient(135deg, #065f46 0%, #0d9488 100%)',
    category: 'Informatics & CS',
    status: 'Available',
    rating: 4.6,
    synopsis: 'The tenth edition of Sommerville\'s Software Engineering introduces students to the overwhelmingly important subject of software programming and development. It guides readers through the production of highly complex software systems.',
    publisher: 'Pearson',
    year: 2015,
    pages: 816,
    barcode: 'FST-SE-1022',
    location: 'Main Stack - Floor 2'
  },
  {
    id: '8',
    title: 'Modern Quantum Mechanics',
    author: 'J. J. Sakurai',
    cover: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    category: 'Physics',
    status: 'Borrowed',
    rating: 4.8,
    synopsis: 'Modern Quantum Mechanics is a classic graduate-level textbook, covering the main quantum mechanics concepts in a clear, organized, and elegant fashion.',
    publisher: 'Cambridge University Press',
    year: 2017,
    pages: 520,
    barcode: 'FST-PH-4921',
    location: 'Main Stack - Floor 4'
  },
  {
    id: '9',
    title: 'Genetics: Analysis and Principles',
    author: 'Robert J. Brooker',
    cover: 'linear-gradient(135deg, #581c87 0%, #701a75 100%)',
    category: 'Biology',
    status: 'Available',
    rating: 4.5,
    synopsis: 'Genetics: Analysis and Principles is a one-semester, introductory genetics textbook that takes an experimental approach to understanding genetics.',
    publisher: 'McGraw-Hill Education',
    year: 2017,
    pages: 864,
    barcode: 'FST-BI-2093',
    location: 'Main Stack - Floor 1'
  },
  {
    id: '10',
    title: 'Introduction to Civil Engineering',
    author: 'Sheng-Taur Mau',
    cover: 'linear-gradient(135deg, #1c1917 0%, #44403c 100%)',
    category: 'Mathematics',
    status: 'Available',
    rating: 4.4,
    synopsis: 'An introductory textbook designed for undergraduate students majoring in Civil Engineering to understand structural elements and spatial designs.',
    publisher: 'CRC Press',
    year: 2014,
    pages: 234,
    barcode: 'FST-CE-0312',
    location: 'Main Stack - Floor 1'
  },
  {
    id: '11',
    title: 'Fundamentals of Physics Extended',
    author: 'David Halliday',
    cover: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 100%)',
    category: 'Physics',
    status: 'Available',
    rating: 4.7,
    synopsis: 'Halliday & Resnick Fundamentals of Physics Extended is a classic text that is renowned for its interactive and comprehensive coverage of modern physics concepts.',
    publisher: 'Wiley',
    year: 2018,
    pages: 1448,
    barcode: 'FST-PH-1102',
    location: 'Main Stack - Floor 4'
  },
  {
    id: '12',
    title: 'Organic Chemistry Principles',
    author: 'Paula Yurkanis Bruice',
    cover: 'linear-gradient(135deg, #4c1d95 0%, #2e1065 100%)',
    category: 'Chemistry',
    status: 'Available',
    rating: 4.6,
    synopsis: 'This text provides a modern, reasoned, and highly structured introduction to modern organic chemistry, focusing on chemical mechanisms and reaction groups.',
    publisher: 'Pearson',
    year: 2016,
    pages: 1344,
    barcode: 'FST-CH-1209',
    location: 'Main Stack - Floor 4'
  },
  {
    id: '13',
    title: 'Clean Code: Handbook of Agile Software',
    author: 'Robert C. Martin',
    cover: 'linear-gradient(135deg, #0f172a 0%, #0369a1 100%)',
    category: 'Informatics & CS',
    status: 'Available',
    rating: 4.9,
    synopsis: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn\'t have to be that way. Noted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code.',
    publisher: 'Prentice Hall',
    year: 2008,
    pages: 464,
    barcode: 'FST-CS-7832',
    location: 'Main Stack - Floor 2'
  },
  {
    id: '14',
    title: 'Design Patterns',
    author: 'Erich Gamma',
    cover: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
    category: 'Informatics & CS',
    status: 'Available',
    rating: 4.8,
    synopsis: 'This classic book is the definitive guide to object-oriented software design patterns, providing reusable solutions to common software development problems.',
    publisher: 'Addison-Wesley',
    year: 1994,
    pages: 395,
    barcode: 'FST-CS-9941',
    location: 'Main Stack - Floor 2'
  },
  {
    id: '15',
    title: 'Advanced Algorithms and Data Structures',
    author: 'Robert Sedgewick & Kevin Wayne',
    cover: 'linear-gradient(135deg, #111827 0%, #112d62 100%)',
    category: 'Computer Science',
    status: 'Available',
    rating: 4.9,
    synopsis: 'An in-depth guide on advanced structures and algorithm engineering, compiled from lectures at Princeton University. Suitable for researchers and computer engineering professionals.',
    publisher: 'Princeton Press',
    year: 2011,
    pages: 988,
    barcode: 'FST-CS-9812',
    location: 'Main Stack - Floor 2'
  }
];

export const initialLoans: Loan[] = [
  {
    id: 'l1',
    bookId: '15', // Advanced Algorithms
    bookTitle: 'Advanced Algorithms and Data Structures',
    bookAuthor: 'Robert Sedgewick & Kevin Wayne',
    bookCover: 'linear-gradient(135deg, #111827 0%, #112d62 100%)',
    borrowDate: '2026-06-25',
    dueDate: '2026-07-09',
    status: 'Active'
  },
  {
    id: 'l2',
    bookId: '8', // Modern Quantum Mechanics
    bookTitle: 'Modern Quantum Mechanics',
    bookAuthor: 'J. J. Sakurai',
    bookCover: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    borrowDate: '2026-06-12',
    dueDate: '2026-06-26',
    status: 'Overdue',
    fineAmount: 15000
  },
  {
    id: 'l3',
    bookId: '5', // Machine Learning Fundamentals
    bookTitle: 'Machine Learning Fundamentals',
    bookAuthor: 'Prof. Alan Turing',
    bookCover: 'linear-gradient(135deg, #162a45 0%, #1c3d5a 100%)',
    borrowDate: '2026-07-01',
    dueDate: '2026-07-15',
    status: 'Active'
  }
];

export const initialNotifications: LibraryNotification[] = [
  {
    id: 'n1',
    type: 'Reminder',
    title: 'Book Return Reminder',
    message: 'Your borrowed copy of "Artificial Intelligence: A Modern Approach" is due in 2 days. Please return it to avoid late fees.',
    date: '2 hours ago',
    unread: true
  },
  {
    id: 'n2',
    type: 'Success',
    title: 'Book Borrowed Successfully',
    message: 'You have successfully checked out "Data Structures and Algorithms in Java". It has been added to your active catalog.',
    date: 'Yesterday, 14:30',
    unread: false
  },
  {
    id: 'n3',
    type: 'System',
    title: 'System Maintenance Scheduled',
    message: 'The digital library catalog will undergo scheduled maintenance on Saturday, Oct 28 from 02:00 AM to 04:00 AM. Search functionalities may be temporarily degraded.',
    date: 'Oct 24',
    unread: true
  }
];

export const initialUserProfile: UserProfile = {
  name: 'Ahmad Rizan',
  idNumber: '1120091000123',
  email: 'ahmad.rizan@mhs.uinjkt.ac.id',
  phone: '+62 812 3456 7890',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  faculty: 'Faculty of Science and Technology',
  program: 'Information Systems',
  booksBorrowedCount: 12,
  activeLoansCount: 3,
  notificationPreferences: {
    dueDateReminders: true,
    holdAvailability: true,
    libraryAnnouncements: false
  }
};

export const initialFavorites: string[] = ['1', '4', '11', '12', '13']; // bookIds
