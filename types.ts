
export interface Pricing {
  oneMonth: number;
  twoMonths: number;
  threeMonths: number;
  oneYear: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  pricing: Pricing;
  coverImage: string;
  category: string;
  description: string;
  rating: number;
  pages: number;
  publishedYear: number;
}

export interface PurchaseRequest {
  id: string;
  userEmail: string;
  userName: string;
  bookId: string;
  bookTitle: string;
  plan: string;
  price: number;
  receiptUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  subscriptions: {
    bookId: string;
    expiryDate: string;
    plan: string;
  }[];
}

export type PaymentMethod = 'bank_transfer';
