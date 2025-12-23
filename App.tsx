
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Book, User, PurchaseRequest } from './types';
import { MOCK_BOOKS } from './constants';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CatalogPage from './pages/CatalogPage';
import LibraryPage from './pages/LibraryPage';
import ReaderPage from './pages/ReaderPage';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('pb_team_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [pendingPurchases, setPendingPurchases] = useState<PurchaseRequest[]>(() => {
    const saved = localStorage.getItem('pb_team_pending');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<{book: Book, plan: string, price: number}[]>([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('pb_team_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pb_team_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pb_team_pending', JSON.stringify(pendingPurchases));
  }, [pendingPurchases]);

  const handleLogin = (userData: User) => {
    // Override admin status based on the specific email
    const updatedUser = {
      ...userData,
      role: (userData.email === 'podibusinessteam@gmail.com' ? 'admin' : 'user') as 'admin' | 'user'
    };
    setUser(updatedUser);
  };

  const handleLogout = () => setUser(null);

  const addToCart = (book: Book, plan: string, price: number) => {
    setCart([{ book, plan, price }]); // Single book purchase flow
  };

  const removeFromCart = (index: number) => {
    setCart([]);
  };

  const handlePurchaseRequest = (request: Omit<PurchaseRequest, 'id' | 'status' | 'timestamp'>) => {
    const newRequest: PurchaseRequest = {
      ...request,
      id: `req_${Date.now()}`,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    setPendingPurchases([...pendingPurchases, newRequest]);
    setCart([]);
  };

  const handleApprovePurchase = (requestId: string) => {
    const request = pendingPurchases.find(r => r.id === requestId);
    if (!request) return;

    // Grant access logic (simulation - in real app would update DB)
    setPendingPurchases(pendingPurchases.filter(r => r.id !== requestId));
    
    // In a real app, we'd update the specific user's object. 
    // Here we'll simulate it by checking if the currently logged in user is the one who was approved.
    if (user && user.email === request.userEmail) {
      const expiry = new Date();
      if (request.plan === 'oneMonth') expiry.setMonth(expiry.getMonth() + 1);
      if (request.plan === 'twoMonths') expiry.setMonth(expiry.getMonth() + 2);
      if (request.plan === 'threeMonths') expiry.setMonth(expiry.getMonth() + 3);
      if (request.plan === 'oneYear') expiry.setFullYear(expiry.getFullYear() + 1);

      setUser({
        ...user,
        subscriptions: [...user.subscriptions, {
          bookId: request.bookId,
          plan: request.plan,
          expiryDate: expiry.toISOString()
        }]
      });
    }
    alert(`Access granted to ${request.userEmail} for ${request.bookTitle}`);
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} cartCount={cart.length} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/catalog" 
              element={<CatalogPage addToCart={addToCart} user={user} />} 
            />
            <Route 
              path="/library" 
              element={user ? <LibraryPage user={user} /> : <AuthPage onLogin={handleLogin} />} 
            />
            <Route 
              path="/reader/:bookId" 
              element={user ? <ReaderPage user={user} /> : <AuthPage onLogin={handleLogin} />} 
            />
            <Route 
              path="/checkout" 
              element={user ? <CheckoutPage user={user} cart={cart} removeFromCart={removeFromCart} onCompleteRequest={handlePurchaseRequest} /> : <AuthPage onLogin={handleLogin} />} 
            />
            <Route 
              path="/auth" 
              element={<AuthPage onLogin={handleLogin} />} 
            />
            <Route 
              path="/admin" 
              element={user?.role === 'admin' ? <AdminPage pendingRequests={pendingPurchases} onApprove={handleApprovePurchase} /> : <div className="p-20 text-center">Unauthorized Access</div>} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
