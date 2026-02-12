
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    // Cart quantity count
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    return (
        <nav className="fixed top-0 w-full z-50 glass transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <span className="text-2xl font-black font-sans text-royalBlue-900 tracking-tighter uppercase group-hover:text-gold-600 transition-colors">
                            Meteor<span className="text-gold-500">.</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-royalBlue-900 font-medium transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-500 after:transition-all hover:after:w-full">
                            Home
                        </Link>
                        <Link to="/products" className="text-gray-700 hover:text-royalBlue-900 font-medium transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-500 after:transition-all hover:after:w-full">
                            Collection
                        </Link>
                        {isAdmin && (
                            <Link to="/admin" className="text-gold-600 font-medium hover:text-gold-700">
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/products" className="text-gray-600 hover:text-royalBlue-900 transition-colors">
                            <Search size={22} strokeWidth={2} />
                        </Link>

                        <Link to="/cart" className="relative text-gray-600 hover:text-royalBlue-900 transition-colors">
                            <ShoppingCart size={22} strokeWidth={2} />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-gold-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center space-x-4 border-l pl-4 border-gray-300">
                                <div className="flex flex-col text-right">
                                    <span className="text-sm font-bold text-gray-900">{user.name}</span>
                                </div>
                                <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-colors" title="Logout">
                                    <LogOut size={20} strokeWidth={2} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/auth" className="px-6 py-2 bg-royalBlue-900 text-white rounded-full font-bold text-sm hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <Link to="/cart" className="mr-4 relative text-gray-700">
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-royalBlue-900">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/20 overflow-hidden absolute w-full"
                    >
                        <div className="px-4 py-6 space-y-4 bg-white/95 backdrop-blur-md">
                            <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-gray-900 hover:text-gold-600">Home</Link>
                            <Link to="/products" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-gray-900 hover:text-gold-600">Collection</Link>
                            {isAdmin && (
                                <Link to="/admin" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-gold-600">Dashboard</Link>
                            )}
                            <div className="pt-4 border-t border-gray-200">
                                {user ? (
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                        <button onClick={() => { handleLogout(); setIsOpen(false) }} className="text-red-500 font-medium">Logout</button>
                                    </div>
                                ) : (
                                    <Link to="/auth" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 bg-royalBlue-900 text-white rounded-lg font-bold">
                                        Sign In
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
