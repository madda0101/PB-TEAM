
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { MOCK_BOOKS } from '../constants';

interface LibraryPageProps {
  user: User;
}

const LibraryPage: React.FC<LibraryPageProps> = ({ user }) => {
  const libraryBooks = MOCK_BOOKS.filter(book => 
    user.subscriptions.some(s => s.bookId === book.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-brand mb-2 tracking-tighter">My Library</h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Active Educational Content</p>
        </div>
        <Link to="/catalog" className="flex items-center space-x-2 text-brand font-bold hover:text-brand-gold transition-colors text-sm uppercase tracking-widest">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Get More Books</span>
        </Link>
      </div>

      {libraryBooks.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {libraryBooks.map(book => {
            const sub = user.subscriptions.find(s => s.bookId === book.id);
            const expiry = sub ? new Date(sub.expiryDate) : null;
            const isExpired = expiry && expiry < new Date();

            return (
              <div key={book.id} className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-brand/5 transition-all">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={book.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={book.title} />
                  <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link to={`/reader/${book.id}`} className="px-8 py-3 bg-white text-brand rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all">Open Reader</Link>
                  </div>
                  {isExpired && (
                    <div className="absolute inset-0 bg-red-900/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                      <p className="text-white font-bold text-lg mb-4">Subscription Expired</p>
                      <Link to="/catalog" className="px-6 py-2 bg-white text-red-600 rounded-lg text-[10px] font-bold uppercase tracking-widest">Renew Now</Link>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-brand mb-1 truncate">{book.title}</h3>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Expires On</p>
                      <p className="text-xs font-bold text-brand">{expiry?.toLocaleDateString()}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-40 bg-white rounded-[4rem] border-4 border-dashed border-gray-50">
          <div className="w-24 h-24 bg-brand/5 text-brand/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-brand mb-4 poppins tracking-tight">Your library is empty</h2>
          <p className="text-gray-400 mb-12 max-w-sm mx-auto font-medium">Subscribe to educational ebooks and start your learning journey with PB TEAM today.</p>
          <Link to="/catalog" className="px-12 py-5 bg-brand text-white rounded-2xl font-bold text-sm hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 uppercase tracking-widest">Explore Catalog</Link>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
