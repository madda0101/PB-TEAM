
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
          <div className="col-span-1 md:col-span-1 space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
                <span className="text-white font-bold text-xl">PB</span>
              </div>
              <span className="text-xl font-bold text-brand tracking-tighter">TEAM</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Sri Lanka's premier digital gateway to expert educational ebooks. We simplify complex learning through accessible technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-brand mb-8 uppercase tracking-widest text-xs">Syllabuses</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><a href="#" className="hover:text-brand transition-colors">A/L Science</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">A/L Commerce</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">ICT & Digital Arts</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">General English</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand mb-8 uppercase tracking-widest text-xs">Account</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><a href="#" className="hover:text-brand transition-colors">Subscriptions</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Library</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">My Profile</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Gift Access</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand mb-8 uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><a href="#" className="hover:text-brand transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Privacy Shield</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Copyright Info</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.3em]">© 2024 PB TEAM PB (PVT) LTD. COLOMBO, SL.</p>
          <div className="flex space-x-10">
            <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Digital Learning Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
