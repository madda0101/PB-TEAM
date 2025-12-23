
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  cartCount: number;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, cartCount, onLogout }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  // Strict admin check
  const isAdmin = user?.email === 'podibusinessteam@gmail.com';

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-10">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20 transition-transform group-hover:scale-105">
                <span className="text-white font-bold text-2xl">PB</span>
              </div>
              <span className="text-2xl font-bold text-brand tracking-tighter">TEAM</span>
            </Link>
            
            <div className="hidden md:flex space-x-8 text-sm font-semibold">
              <Link to="/" className={`${isActive('/') ? 'text-brand' : 'text-gray-400 hover:text-brand'} transition-colors uppercase tracking-widest`}>Home</Link>
              <Link to="/catalog" className={`${isActive('/catalog') ? 'text-brand' : 'text-gray-400 hover:text-brand'} transition-colors uppercase tracking-widest`}>Books</Link>
              {user && <Link to="/library" className={`${isActive('/library') ? 'text-brand' : 'text-gray-400 hover:text-brand'} transition-colors uppercase tracking-widest`}>My Library</Link>}
              {/* Only visible to the specific admin email */}
              {isAdmin && <Link to="/admin" className="text-brand-gold hover:text-brand transition-colors uppercase tracking-widest font-bold bg-brand-gold/10 px-3 py-1 rounded-lg">Admin Panel</Link>}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/checkout" className="relative p-2 text-gray-400 hover:text-brand transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && <span className="absolute top-0 right-0 bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-full ring-2 ring-white">{cartCount}</span>}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-gray-100">
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900 leading-none mb-1">{user.name}</p>
                  <button onClick={onLogout} className="text-[10px] text-red-500 font-bold hover:underline">LOGOUT</button>
                </div>
                <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner">
                  {user.name.charAt(0)}
                </div>
              </div>
            ) : (
              <Link to="/auth" className="bg-brand text-white px-8 py-3 rounded-xl text-xs font-bold hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 uppercase tracking-widest">Sign In</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
