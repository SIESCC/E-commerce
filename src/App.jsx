
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Context
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';

// Admin Components
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/EditProduct';
import ManageCarousel from './admin/ManageCarousel';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Animated Routes Wrapper
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<Auth />} />


        {/* Admin Routes */}
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AddProduct />} />
          <Route path="/admin/edit/:id" element={<EditProduct />} />
          <Route path="/admin/carousel" element={<ManageCarousel />} />
        </Route>

        <Route path="*" element={<div className="flex items-center justify-center min-h-[50vh] text-2xl font-bold text-gray-400">404 - Page Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <ScrollToTop />
            <Navbar />
            <main className="flex-grow pt-20"> {/* pt-20 to account for fixed navbar */}
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
