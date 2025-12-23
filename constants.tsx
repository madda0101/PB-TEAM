
import { Book } from './types';

export const TRADING_PRICING = {
  oneMonth: 450,
  twoMonths: 500,
  threeMonths: 550,
  oneYear: 570
};

export const BANK_DETAILS = [
  {
    bank: "Bank of Ceylon (BOC BANK)",
    accountNumber: "0094742117",
    accountHolder: "S C T FERNANDO",
    branch: "Moratuwa Branch (61)"
  },
  {
    bank: "Commercial Bank",
    accountNumber: "8014799361",
    accountHolder: "S C T FERNANDO",
    branch: "Katubadda Minicom Branch"
  },
  {
    bank: "Dialog Finance PLC",
    accountNumber: "001021146562",
    accountHolder: "S C T FERNANDO",
    branch: "Head office"
  }
];

export const MOCK_BOOKS: Book[] = [
  {
    id: 'patterns-killer',
    title: 'Patterns Killer - Special Edition',
    author: 'Patterns World',
    pricing: TRADING_PRICING,
    coverImage: 'https://images.unsplash.com/photo-1611974714851-eb605161ca50?q=80&w=400&h=600&auto=format&fit=crop',
    category: 'Chart Patterns',
    description: 'Master high-probability trading setups. English Edition for advanced traders.',
    rating: 4.9,
    pages: 120,
    publishedYear: 2024
  },
  {
    id: 'binance-master',
    title: 'Binance Master Guide',
    author: 'PB TEAM',
    pricing: TRADING_PRICING,
    coverImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=400&h=600&auto=format&fit=crop',
    category: 'Crypto',
    description: 'The ultimate guide to Binance and cryptocurrency trading.',
    rating: 4.8,
    pages: 85,
    publishedYear: 2024
  },
  {
    id: 'smc-master',
    title: '(SMC) Master Smart Money Concepts',
    author: 'PB TEAM',
    pricing: TRADING_PRICING,
    coverImage: 'https://images.unsplash.com/photo-1642104704074-907c0698bcd9?q=80&w=400&h=600&auto=format&fit=crop',
    category: 'Strategy',
    description: 'Learn how institutional traders move the market with SMC.',
    rating: 5.0,
    pages: 150,
    publishedYear: 2024
  },
  {
    id: 'simple-trading',
    title: 'Simple Trading Book',
    author: 'PB TEAM',
    pricing: TRADING_PRICING,
    coverImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=400&h=600&auto=format&fit=crop',
    category: 'Basics',
    description: 'The simplest guide to starting your trading journey.',
    rating: 4.7,
    pages: 60,
    publishedYear: 2024
  },
  {
    id: 'sinhala-candlestick',
    title: 'Candlestick Pattern (Sinhala)',
    author: 'Chamidu Thilakshana',
    pricing: TRADING_PRICING,
    coverImage: 'https://images.unsplash.com/photo-1611974714851-eb605161ca50?q=80&w=400&h=600&auto=format&fit=crop',
    category: 'Sinhala Edition',
    description: 'Sri Lanka\'s comprehensive candlestick guide in Sinhala language.',
    rating: 4.9,
    pages: 200,
    publishedYear: 2023
  },
  {
    id: 'sinhala-chart-patterns',
    title: 'Chart Patterns Book (Sinhala)',
    author: 'Chamidu Thilakshana',
    pricing: TRADING_PRICING,
    coverImage: 'https://images.unsplash.com/photo-1611974714851-eb605161ca50?q=80&w=400&h=600&auto=format&fit=crop',
    category: 'Sinhala Edition',
    description: 'Learn complex chart patterns in the most readable Sinhala format.',
    rating: 4.8,
    pages: 180,
    publishedYear: 2023
  },
  {
    id: 'fiverr-master',
    title: 'Fiverr Master Guide (Sinhala)',
    author: 'PB TEAM',
    pricing: TRADING_PRICING,
    coverImage: 'https://images.unsplash.com/photo-1586281380349-631533a3c947?q=80&w=400&h=600&auto=format&fit=crop',
    category: 'Freelancing',
    description: 'Start earning in dollars with this master Fiverr guide.',
    rating: 4.6,
    pages: 95,
    publishedYear: 2024
  },
  {
    id: 'trading-mind',
    title: 'Trading Mind',
    author: 'PB TEAM',
    pricing: TRADING_PRICING,
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&h=600&auto=format&fit=crop',
    category: 'Psychology',
    description: 'Master your emotions to become a consistently profitable trader.',
    rating: 4.8,
    pages: 110,
    publishedYear: 2024
  }
];
