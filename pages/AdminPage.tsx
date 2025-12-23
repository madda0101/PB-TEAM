
import React, { useState } from 'react';
import { PurchaseRequest } from '../types';

interface AdminPageProps {
  pendingRequests: PurchaseRequest[];
  onApprove: (id: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ pendingRequests, onApprove }) => {
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-4xl font-bold text-brand mb-2 tracking-tighter poppins">PB Approval Center</h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Verify Payment Proofs & Grant Access</p>
        </div>
        <div className="flex items-center space-x-4">
           <div className="bg-brand text-white px-6 py-3 rounded-2xl flex items-center space-x-3 shadow-lg shadow-brand/20">
             <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
             <span className="font-bold text-xs uppercase tracking-widest">{pendingRequests.length} Pending Payments</span>
           </div>
        </div>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="text-center py-40 bg-white rounded-[4rem] border border-gray-100 shadow-sm">
           <div className="w-24 h-24 bg-brand/5 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg className="w-10 h-10 text-brand/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
           <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-xs">Queue is empty</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {pendingRequests.map(req => (
            <div key={req.id} className="bg-white p-10 rounded-[3rem] border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-10 hover:shadow-2xl hover:shadow-brand/5 transition-all duration-300">
              <div className="flex items-center space-x-8">
                <div 
                  className="w-36 h-36 bg-gray-50 rounded-[2.5rem] overflow-hidden border-4 border-brand/5 cursor-zoom-in group relative"
                  onClick={() => setSelectedReceipt(req.receiptUrl)}
                >
                  <img src={req.receiptUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Receipt" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-brand mb-2">{req.bookTitle}</h3>
                  <div className="space-y-1 text-sm font-medium">
                    <p className="text-gray-400">Customer: <span className="text-brand font-bold">{req.userName}</span></p>
                    <p className="text-gray-400">Target Email: <span className="text-brand-gold font-bold">{req.userEmail}</span></p>
                    <p className="text-gray-400">Access Level: <span className="text-brand uppercase tracking-widest text-[10px] bg-brand/5 px-3 py-1 rounded-full">{req.plan}</span></p>
                  </div>
                  {(req as any).message && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-2xl border-l-4 border-brand-gold italic text-gray-500 text-xs">
                       "{ (req as any).message }"
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right px-8 border-r border-gray-100 min-w-[150px]">
                  <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mb-1">Receipt Amount</p>
                  <p className="text-3xl font-bold text-brand tracking-tighter">LKR {req.price}</p>
                </div>
                <div className="flex flex-col space-y-3">
                  <button 
                    onClick={() => onApprove(req.id)}
                    className="px-10 py-5 bg-brand text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-brand/10"
                  >
                    Grant Access
                  </button>
                  <button className="px-10 py-3 bg-red-50 text-red-400 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-12">
          <div className="absolute inset-0 bg-brand/90 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedReceipt(null)}></div>
          <img src={selectedReceipt} className="relative max-h-full max-w-full rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-8 border-white animate-in zoom-in-95 duration-300" alt="Full Receipt" />
          <button onClick={() => setSelectedReceipt(null)} className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors bg-white/10 p-4 rounded-full">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
