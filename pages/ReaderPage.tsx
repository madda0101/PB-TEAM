
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { MOCK_BOOKS } from '../constants';

interface ReaderPageProps {
  user: User;
}

const ReaderPage: React.FC<ReaderPageProps> = ({ user }) => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const readerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light');

  const book = MOCK_BOOKS.find(b => b.id === bookId);

  useEffect(() => {
    const sub = user.subscriptions.find(s => s.bookId === bookId);
    if (!book || !sub || new Date(sub.expiryDate) < new Date()) {
      navigate('/library');
      return;
    }

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'u')) || e.key === 'F12') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [book, user, bookId, navigate]);

  if (!book) return null;

  const themes = {
    light: 'bg-white text-brand-dark',
    sepia: 'bg-[#f4ecd8] text-[#5b4636]',
    dark: 'bg-[#1a1311] text-gray-200',
  };

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col ${themes[theme]} transition-colors duration-500`}>
      <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-inherit">
        <div className="flex items-center space-x-6">
          <button onClick={() => navigate('/library')} className="p-3 hover:bg-black/5 rounded-2xl transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div>
            <h1 className="font-bold poppins text-sm tracking-tight">{book.title}</h1>
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">{book.author}</p>
          </div>
        </div>

        <div className="flex items-center space-x-10">
          <div className="flex items-center space-x-3 bg-black/5 p-1 rounded-xl">
             <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="p-2 hover:bg-white/10 rounded-lg text-xs font-bold">A-</button>
             <span className="text-xs font-bold px-2">{fontSize}</span>
             <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="p-2 hover:bg-white/10 rounded-lg text-xs font-bold">A+</button>
          </div>
          
          <div className="flex space-x-3">
            <button onClick={() => setTheme('light')} className={`w-8 h-8 rounded-full border-2 ${theme === 'light' ? 'border-brand-gold' : 'border-transparent'} bg-white shadow-sm`} title="Light"></button>
            <button onClick={() => setTheme('sepia')} className={`w-8 h-8 rounded-full border-2 ${theme === 'sepia' ? 'border-brand-gold' : 'border-transparent'} bg-[#f4ecd8] shadow-sm`} title="Sepia"></button>
            <button onClick={() => setTheme('dark')} className={`w-8 h-8 rounded-full border-2 ${theme === 'dark' ? 'border-brand-gold' : 'border-transparent'} bg-[#1a1311] shadow-sm`} title="Dark"></button>
          </div>
        </div>
      </header>

      <div className="flex-grow overflow-y-auto px-6 py-20">
        <div 
          ref={readerRef}
          className="max-w-3xl mx-auto leading-relaxed select-none"
          style={{ fontSize: `${fontSize}px` }}
        >
          <div className="mb-24 text-center">
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px]">PB TEAM Educators</span>
            <h2 className="text-4xl font-bold mt-4 mb-2 poppins tracking-tighter">{book.title}</h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full mt-6"></div>
          </div>
          
          <p className="mb-10 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-brand-gold">
            In the study of {book.category.toLowerCase()}, one must first understand the foundational principles that govern the natural world. Our research at PB TEAM indicates that most students struggle with complex integration not because of the calculus itself, but because of a lack of intuition regarding spatial relationships.
          </p>
          
          <p className="mb-10">
            {book.description}. This comprehensive ebook aims to bridge that gap by providing intuitive visualizations and real-world examples specifically tailored for the Sri Lankan syllabus. Whether you are preparing for local A/Ls or looking to expand your professional knowledge base, consistency is key.
          </p>

          <div className="bg-brand/5 p-12 rounded-[3rem] border border-brand/10 my-16">
            <h4 className="font-bold text-brand uppercase tracking-widest text-sm mb-6">Key Lesson: Chapter 1.2</h4>
            <p className="italic text-brand-light">"Education is not the learning of facts, but the training of the mind to think." — Often attributed to Einstein, this serves as our guiding philosophy here at the PB TEAM education portal.</p>
          </div>

          <p className="text-center py-40 opacity-30 italic font-bold uppercase tracking-[0.5em] text-xs border-t border-brand/5 mt-20">
            END OF AUTHENTICATED CHAPTER
          </p>
        </div>
      </div>

      <footer className="h-20 border-t border-white/10 flex items-center justify-center px-8 bg-inherit">
        <div className="flex items-center space-x-16">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="p-4 hover:bg-black/5 rounded-full disabled:opacity-20 transition-all group"
          >
            <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-1">Position</span>
            <span className="text-xs font-bold tracking-widest">{currentPage} OF {book.pages}</span>
          </div>

          <button 
            disabled={currentPage === book.pages}
            onClick={() => setCurrentPage(p => Math.min(book.pages, p + 1))}
            className="p-4 hover:bg-black/5 rounded-full disabled:opacity-20 transition-all group"
          >
            <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ReaderPage;
