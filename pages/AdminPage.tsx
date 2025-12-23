
import React, { useState } from 'react';
import { PurchaseRequest } from '../types';

interface AdminPageProps {
  pendingRequests: PurchaseRequest[];
  onApprove: (id: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ pendingRequests, onApprove }) => {
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [searchTerm, setSearchTerm] = useState('');

  // Simulation of approved history (in a real app this would come from a backend)
  const [history] = useState<PurchaseRequest[]>([]);

  const stats = {
    pending: pendingRequests.length,
    totalEarnings: pendingRequests.reduce((acc, curr) => acc + curr.price, 0), // Current pending value
    totalUsers: 154, // Simulated
    activeBooks: 8
  };

  const filteredRequests = pendingRequests.filter(req => 
    req.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) || 
    req.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700">
      {/* Header & Stats Dashboard */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-brand mb-2 tracking-tighter poppins">PB Team Executive Console</h1>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Administrator: podibusinessteam@gmail.com
            </p>
          </div>
          <div className="flex items-center space-x-3">
             <button className="bg-brand text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-dark transition-all flex items-center">
               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2-8H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2z" /></svg>
               Export Report
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Pending Verification</p>
            <p className="text-4xl font-bold text-brand">{stats.pending}</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Pending Revenue</p>
            <p className="text-4xl font-bold text-brand-gold">LKR {stats.totalEarnings}</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Platform Users</p>
            <p className="text-4xl font-bold text-brand">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Library Items</p>
            <p className="text-4xl font-bold text-brand">{stats.activeBooks}</p>
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-brand/5 overflow-hidden">
        {/* Toolbar */}
        <div className="px-10 py-8 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex bg-gray-50 p-1 rounded-2xl">
            <button 
              onClick={() => setActiveTab('pending')}
              className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'pending' ? 'bg-white text-brand shadow-sm' : 'text-gray-400 hover:text-brand'}`}
            >
              Pending Requests
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-white text-brand shadow-sm' : 'text-gray-400 hover:text-brand'}`}
            >
              Approval History
            </button>
          </div>

          <div className="relative w-full lg:w-96">
            <input 
              type="text" 
              placeholder="Search email, book or user..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/5 text-sm"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-10 min-h-[400px]">
          {activeTab === 'pending' ? (
            filteredRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-brand/5 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-brand/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">All caught up. No pending requests.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredRequests.map(req => (
                  <div key={req.id} className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:bg-brand/[0.01] transition-all">
                    <div className="flex items-center space-x-8">
                      <div 
                        className="w-32 h-32 bg-gray-100 rounded-[2rem] overflow-hidden border-2 border-brand/5 cursor-zoom-in relative"
                        onClick={() => setSelectedReceipt(req.receiptUrl)}
                      >
                        <img src={req.receiptUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Receipt" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 opacity-0 group-hover:opacity-100 transition-all">
                           <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-brand">{req.bookTitle}</h3>
                          <span className="text-[10px] font-bold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full uppercase tracking-widest">{req.plan}</span>
                        </div>
                        <div className="space-y-1 text-xs">
                          <p className="text-gray-400 font-medium">Customer: <span className="text-brand font-bold">{req.userName}</span></p>
                          <p className="text-gray-400 font-medium">Email: <span className="text-brand-gold font-bold">{req.userEmail}</span></p>
                          <p className="text-gray-300 font-bold uppercase tracking-widest mt-2">ID: {req.id}</p>
                        </div>
                        {(req as any).message && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-xl border-l-2 border-brand-gold text-[10px] italic text-gray-400">
                             "{ (req as any).message }"
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-8">
                      <div className="text-right px-8 border-r border-gray-100">
                        <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mb-1">Payment</p>
                        <p className="text-2xl font-bold text-brand">LKR {req.price}</p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button 
                          onClick={() => onApprove(req.id)}
                          className="px-10 py-4 bg-brand text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg shadow-brand/10"
                        >
                          Approve
                        </button>
                        <button className="px-10 py-3 bg-red-50 text-red-400 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                 <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <p className="text-gray-300 font-bold uppercase tracking-[0.3em] text-[10px]">No historical data found in this session.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox for receipts */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-10">
          <div className="absolute inset-0 bg-brand/95 backdrop-blur-lg animate-in fade-in duration-300" onClick={() => setSelectedReceipt(null)}></div>
          <div className="relative max-h-full max-w-full group">
            <img src={selectedReceipt} className="rounded-[3rem] shadow-2xl border-4 border-white animate-in zoom-in-95 duration-300" alt="Full Receipt" />
            <button 
              onClick={() => setSelectedReceipt(null)} 
              className="absolute -top-6 -right-6 bg-white text-brand w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
