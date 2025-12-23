
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Book, User } from '../types';
import { BANK_DETAILS } from '../constants';

interface CheckoutPageProps {
  user: User;
  cart: {book: Book, plan: string, price: number}[];
  removeFromCart: (index: number) => void;
  onCompleteRequest: (request: any) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ user, cart, removeFromCart, onCompleteRequest }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleRequestAccess = () => {
    if (!receipt) {
      alert("Please upload your payment receipt screenshot.");
      return;
    }
    
    setIsProcessing(true);
    // Simulate sending to admin
    setTimeout(() => {
      onCompleteRequest({
        userEmail: user.email,
        userName: user.name,
        bookId: cart[0].book.id,
        bookTitle: cart[0].book.title,
        plan: cart[0].plan,
        price: cart[0].price,
        receiptUrl: URL.createObjectURL(receipt),
        message: message // Include the user's message
      });
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-40 text-center bg-white rounded-[4rem] my-10 border border-gray-50 shadow-sm">
        <h2 className="text-4xl font-bold text-brand mb-6 tracking-tighter poppins">No book selected</h2>
        <Link to="/catalog" className="bg-brand text-white px-12 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-brand/20">Go to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      {/* Step Indicator */}
      <div className="flex items-center justify-between max-w-lg mx-auto mb-20">
        {[1, 2, 3].map(i => (
          <React.Fragment key={i}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg transition-all ${step >= i ? 'bg-brand text-white shadow-xl shadow-brand/30' : 'bg-gray-100 text-gray-400'}`}>
              {i}
            </div>
            {i < 3 && <div className={`flex-grow h-1 mx-4 rounded-full ${step > i ? 'bg-brand' : 'bg-gray-100'}`}></div>}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <div className="grid lg:grid-cols-3 gap-16 animate-in fade-in duration-500">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold text-brand tracking-tighter poppins">Purchase Details</h2>
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 flex items-center space-x-10 shadow-sm">
              <img src={cart[0].book.coverImage} className="w-24 h-32 object-cover rounded-xl shadow-md" alt="" />
              <div className="flex-grow">
                <h4 className="text-xl font-bold text-brand mb-2">{cart[0].book.title}</h4>
                <div className="flex items-center space-x-4">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] bg-brand-gold/5 px-4 py-1.5 rounded-full">{cart[0].plan.replace(/([A-Z])/g, ' $1').trim()} Access</span>
                  <span className="text-2xl font-bold text-brand">LKR {cart[0].price}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 h-fit shadow-2xl shadow-brand/5">
            <h3 className="font-bold text-brand uppercase tracking-widest text-xs mb-8">Summary</h3>
            <div className="flex justify-between items-end mb-10">
              <span className="text-gray-400 text-sm font-medium">Subscription</span>
              <span className="text-2xl font-bold text-brand">LKR {total}</span>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-brand text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-brand/20"
            >
              Continue to Bank Info
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-2xl mx-auto space-y-10 animate-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-brand poppins tracking-tight">Payment Instructions</h2>
            <p className="text-gray-400 font-medium">Deposit funds to any of the accounts below</p>
          </div>

          <div className="space-y-6">
            {BANK_DETAILS.map((bank, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:border-brand-gold/30 transition-colors">
                <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-3">{bank.bank}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Account Holder</p>
                    <p className="font-bold text-brand text-sm">{bank.accountHolder}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Account Number</p>
                    <p className="font-bold text-brand text-lg tracking-tight">{bank.accountNumber}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Branch</p>
                    <p className="font-bold text-brand text-sm">{bank.branch}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-brand/5 p-10 rounded-[2.5rem] border border-brand/10 space-y-8">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-brand uppercase tracking-widest block mb-4">Step 1: Upload Screenshot / Receipt</label>
                <div className="relative">
                   <input 
                     type="file" 
                     accept="image/*"
                     onChange={(e) => setReceipt(e.target.files?.[0] || null)}
                     className="w-full text-sm text-gray-500 file:mr-4 file:py-4 file:px-8 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-brand file:text-white hover:file:bg-brand-dark cursor-pointer shadow-md" 
                   />
                   {receipt && <p className="mt-2 text-xs text-green-600 font-bold">✓ Receipt selected</p>}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-brand uppercase tracking-widest block mb-4">Step 2: Message to Admin (Optional)</label>
                <textarea 
                  placeholder="Hi Admin, I have deposited the amount. Please approve my access."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-6 py-4 bg-white border border-brand/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 text-sm h-32 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 space-y-4">
             <div className="flex items-start space-x-4">
               <div className="w-8 h-8 bg-brand/5 rounded-full flex items-center justify-center text-brand shrink-0">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <p className="text-xs text-gray-400 font-medium leading-relaxed">
                 After submitting, the **PB TEAM Admin** will review your proof. 
                 Access will be granted to: <span className="text-brand font-bold">{user.email}</span>.
               </p>
             </div>
          </div>

          <button 
            onClick={handleRequestAccess}
            disabled={isProcessing}
            className="w-full bg-brand text-white py-6 rounded-3xl font-bold text-sm uppercase tracking-widest hover:bg-brand-dark transition-all flex items-center justify-center space-x-4 shadow-2xl shadow-brand/30"
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span>Submit for Verification</span>
            )}
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-md mx-auto text-center space-y-10 animate-in zoom-in-95 duration-700">
          <div className="w-32 h-32 bg-brand/5 text-brand rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner">
             <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-brand tracking-tighter poppins">Request Sent!</h2>
            <p className="text-gray-400 font-medium text-sm leading-relaxed">Admin has been notified. Verification usually takes 15-60 minutes. Your ebook will appear in your library soon.</p>
          </div>
          <div className="pt-6">
            <Link to="/library" className="inline-block w-full bg-brand text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-brand/20">Check Library Status</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
