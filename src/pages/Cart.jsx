
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, total } = useCart();

    if (cart.length === 0) {
        return (
            <motion.div
                className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-gray-50 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <ShoppingBag size={80} strokeWidth={1} className="text-gray-300 mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">Your shopping bag is empty</h2>
                <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't made any choices yet. Explore our handcrafted collection.</p>
                <Link to="/products" className="px-8 py-3 bg-royalBlue-900 text-gold-500 font-medium rounded-full shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 flex items-center gap-2">
                    Start Shopping <ArrowRight size={18} />
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="container mx-auto px-4 py-12 mb-10 min-h-screen bg-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-serif">Shopping Bag <span className="text-lg font-normal text-gray-500 ml-2">({cart.length} items)</span></h1>

            <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
                {/* Cart Items List */}
                <div className="flex-1 space-y-6">
                    <AnimatePresence>
                        {cart.map(item => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6"
                            >
                                <div className="w-full sm:w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                                    <p className="text-gold-600 text-sm font-medium uppercase tracking-wide mb-2">{item.category}</p>
                                    <p className="text-xl font-bold text-royalBlue-900">₹{item.price.toLocaleString('en-IN')}</p>
                                </div>

                                <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-1">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-royalBlue-900 disabled:opacity-30 transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-royalBlue-900 transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <div className="text-right min-w-[100px] hidden sm:block">
                                    <p className="text-sm text-gray-500">Subtotal</p>
                                    <p className="text-lg font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                    aria-label="Remove"
                                >
                                    <Trash size={20} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Order Summary */}
                <div className="lg:w-96 shrink-0">
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{total.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax (GST included)</span>
                                <span>₹{(total * 0.18).toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-royalBlue-900">₹{total.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <Link to="/checkout" className="w-full py-4 bg-royalBlue-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-900 hover:scale-[1.02] transition-all duration-300 block text-center">
                            Proceed to Checkout
                        </Link>

                        <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Secure Checkout
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Cart;
