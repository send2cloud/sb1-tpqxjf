import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import CreateStorefront from './pages/CreateStorefront';
import Storefront from './pages/Storefront';
import Settings from './pages/Settings';
import ManageStores from './pages/ManageStores';
import { StripeProvider } from './contexts/StripeContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import AdminLogin from './pages/AdminLogin';

export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  locked: boolean;
}

function App() {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    return isAdmin ? <>{children}</> : <Navigate to="/admin-login" />;
  };

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <StripeProvider>
          <Router>
            {isAdmin ? (
              <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                      <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-light dark:focus:ring-primary-dark"
                      >
                        <span className="sr-only">Open sidebar</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                  </header>
                  <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-100 dark:bg-gray-900">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/create" element={<CreateStorefront setProductData={setProductData} />} />
                      <Route path="/edit/:id" element={<CreateStorefront setProductData={setProductData} />} />
                      <Route path="/storefront/:id" element={<Storefront productData={productData} />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/manage" element={<ManageStores />} />
                    </Routes>
                  </main>
                </div>
              </div>
            ) : (
              <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store/:id" element={<Storefront productData={productData} />} />
                    <Route path="/admin-login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
                    <Route path="*" element={<AdminRoute><Navigate to="/" /></AdminRoute>} />
                  </Routes>
                </main>
              </div>
            )}
          </Router>
        </StripeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;