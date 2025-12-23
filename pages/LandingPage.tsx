
import React from 'react';
import { Link } from 'react-router-dom';
// Removed TESTIMONIALS as it is not exported from constants.tsx and not used in the component
import { MOCK_BOOKS } from '../constants';

const LandingPage: React.FC = () => {
  const featured = MOCK_BOOKS.slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-gold/10 rounded-full border border-brand-gold/20">
                <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-brand uppercase tracking-[0.2em]">New 2024 Syllabuses Available</span>
              </div>
              <h1 className="text-6xl sm:text-7xl font-bold text-brand leading-[1.1] tracking-tight">
                Empowering <br/>
                <span className="text-brand-gold">Your Education</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
                Unlock expert-curated educational ebooks from PB TEAM. Affordable monthly access to Sri Lanka's best learning materials.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link to="/catalog" className="px-10 py-5 bg-brand text-white rounded-2xl font-bold text-sm hover:bg-brand-dark transition-all shadow-2xl shadow-brand/30 uppercase tracking-widest text-center">
                  Start Learning
                </Link>
                <Link to="/auth" className="px-10 py-5 bg-white text-brand border-2 border-brand rounded-2xl font-bold text-sm hover:bg-brand/5 transition-all uppercase tracking-widest text-center">
                  Join PB TEAM
                </Link>
              </div>
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-12 h-12 rounded-full border-4 border-white" alt="Student" />)}
                </div>
                <p className="text-xs text-gray-400 font-medium">Join <span className="text-brand font-bold">5,000+</span> Sri Lankan students succeeding today</p>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="relative z-10 w-[420px] h-[580px] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(99,57,43,0.3)] border-[12px] border-white">
                <img src={MOCK_BOOKS[0].coverImage} className="w-full h-full object-cover" alt="Hero Book" />
                <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-brand/90 to-transparent">
                  <h3 className="text-white text-2xl font-bold mb-2">Advanced Biology 2024</h3>
                  <p className="text-brand-gold font-semibold uppercase tracking-widest text-xs">Now with 1 Year Access Plans</p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-gold rounded-[3rem] -z-10 rotate-12 blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-brand/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-brand uppercase tracking-widest">Our Specialties</h2>
            <div className="w-20 h-1.5 bg-brand-gold mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Mathematics', 'Science', 'ICT', 'Business'].map(cat => (
              <div key={cat} className="group p-10 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand/5 transition-all text-center cursor-pointer">
                <div className="w-16 h-16 bg-brand/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand group-hover:text-white transition-all text-brand">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <h4 className="font-bold text-brand text-lg">{cat}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-brand tracking-tighter">New Arrivals</h2>
              <p className="text-gray-400 text-sm">Most purchased books this week</p>
            </div>
            <Link to="/catalog" className="px-6 py-3 border border-brand/20 rounded-xl text-brand font-bold text-xs uppercase tracking-widest hover:bg-brand hover:text-white transition-all">
              View Catalog
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {featured.map(book => (
              <div key={book.id} className="group bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-brand/10 transition-all duration-500">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={book.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={book.title} />
                  <div className="absolute top-6 left-6 bg-brand-gold text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    {book.category}
                  </div>
                </div>
                <div className="p-10 space-y-4">
                  <h3 className="text-xl font-bold text-brand leading-tight group-hover:text-brand-gold transition-colors">{book.title}</h3>
                  <p className="text-gray-400 text-sm italic">by {book.author}</p>
                  <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Starts from</p>
                      <p className="text-2xl font-bold text-brand">LKR {book.pricing.oneMonth}</p>
                    </div>
                    <Link to="/catalog" className="w-12 h-12 bg-brand/5 rounded-full flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
