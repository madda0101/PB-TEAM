
import React, { useState } from 'react';
import { MOCK_BOOKS } from '../constants';
import { Book, User } from '../types';

interface CatalogPageProps {
  addToCart: (book: Book, plan: string, price: number) => void;
  user: User | null;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ addToCart, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const filteredBooks = MOCK_BOOKS.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatus = (bookId: string) => {
    const sub = user?.subscriptions.find(s => s.bookId === bookId);
    if (!sub) return null;
    const expiry = new Date(sub.expiryDate);
    if (expiry < new Date()) return 'Expired';
    return 'Active';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <h1 className="text-4xl font-bold text-brand mb-2 tracking-tighter">Educational Library</h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Study anywhere with PB TEAM</p>
        </div>
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search for subjects, authors..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/5 shadow-sm"
          />
          <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredBooks.map(book => {
          const status = getStatus(book.id);
          return (
            <div key={book.id} className="group bg-white rounded-[2.5rem] p-4 border border-gray-100 hover:shadow-2xl hover:shadow-brand/5 transition-all">
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6">
                <img src={book.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={book.title} />
                {status === 'Active' && (
                  <div className="absolute inset-0 bg-brand/40 backdrop-blur-sm flex items-center justify-center">
                    <span className="bg-white text-brand px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl">In Library</span>
                  </div>
                )}
              </div>
              <div className="px-2 pb-4">
                <h3 className="font-bold text-brand leading-tight mb-1 truncate">{book.title}</h3>
                <p className="text-xs text-gray-400 mb-6 italic">by {book.author}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                   <div>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Pricing from</p>
                     <p className="font-bold text-brand">LKR {book.pricing.oneMonth}</p>
                   </div>
                   <button 
                     disabled={status === 'Active'}
                     onClick={() => setSelectedBook(book)}
                     className="bg-brand text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-dark disabled:bg-gray-100 disabled:text-gray-300 transition-all uppercase tracking-widest"
                   >
                     Subscribe
                   </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscription Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-brand/40 backdrop-blur-md" onClick={() => setSelectedBook(null)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-12">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-brand poppins">{selectedBook.title}</h2>
                  <p className="text-gray-400 font-medium">Choose your access plan</p>
                </div>
                <button onClick={() => setSelectedBook(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { label: '1 Month', plan: 'oneMonth', price: selectedBook.pricing.oneMonth },
                  { label: '2 Months', plan: 'twoMonths', price: selectedBook.pricing.twoMonths },
                  { label: '3 Months', plan: 'threeMonths', price: selectedBook.pricing.threeMonths },
                  { label: '1 Year', plan: 'oneYear', price: selectedBook.pricing.oneYear },
                ].map((item) => (
                  <button 
                    key={item.plan}
                    onClick={() => {
                      addToCart(selectedBook, item.plan, item.price);
                      setSelectedBook(null);
                    }}
                    className="p-8 border-2 border-gray-100 rounded-[2rem] text-left hover:border-brand-gold hover:bg-brand-gold/5 transition-all group"
                  >
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-brand-gold">{item.label}</p>
                    <p className="text-2xl font-bold text-brand">LKR {item.price}</p>
                    <div className="mt-4 flex items-center space-x-2 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold uppercase">Select Plan</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </button>
                ))}
              </div>
              
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">Secure digital delivery • Protected reading mode enabled</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
