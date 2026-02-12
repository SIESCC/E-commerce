
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Loader2, Truck, ShieldCheck, ShoppingBag } from 'lucide-react';

const Checkout = () => {
    const { cart, total, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 3000));

        setLoading(false);
        setSuccess(true);
        clearCart();

        // Redirect after a few seconds
        // setTimeout(() => navigate('/'), 5000);
    };

    if (success) {
        return (
            <motion.div
                className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle size={40} className="text-green-600" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">Order Confirmed!</h2>
                    <p className="text-gray-500 mb-6">Thank you for your purchase. Your order ID is <span className="font-mono font-bold text-gray-900">#ORD-{Math.floor(Math.random() * 10000)}</span></p>

                    <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left">
                        <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                        <p className="font-medium text-gray-900">3-5 Business Days</p>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-3 bg-royalBlue-900 text-white font-bold rounded-xl hover:bg-gray-900 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </motion.div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <ShoppingBag size={60} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-xl text-gray-500 mb-4">Your cart is empty.</p>
                    <button onClick={() => navigate('/products')} className="text-royalBlue-900 font-bold hover:underline">
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 font-serif text-center md:text-left">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

                    {/* Left Column: Form */}
                    <div className="flex-1 space-y-8">

                        {/* Shipping Info */}
                        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Truck className="text-royalBlue-900" size={24} /> Shipping Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all"
                                        placeholder="John"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all"
                                        placeholder="123 Street Name"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all"
                                        placeholder="10001"
                                        value={formData.zip}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Payment Info */}
                        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <CreditCard className="text-royalBlue-900" size={24} /> Payment Details
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all"
                                        placeholder="John Doe"
                                        value={formData.cardName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            required
                                            maxLength="19"
                                            className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all font-mono"
                                            placeholder="0000 0000 0000 0000"
                                            value={formData.cardNumber}
                                            onChange={(e) => {
                                                let val = e.target.value.replace(/\D/g, '').substring(0, 16);
                                                val = val != '' ? val.match(/.{1,4}/g).join(' ') : '';
                                                setFormData({ ...formData, cardNumber: val });
                                            }}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50">
                                            <CreditCard size={20} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                        <input
                                            type="text"
                                            name="expiry"
                                            required
                                            maxLength="5"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all font-mono"
                                            placeholder="MM/YY"
                                            value={formData.expiry}
                                            onChange={(e) => {
                                                let val = e.target.value.replace(/\D/g, '').substring(0, 4);
                                                if (val.length >= 3) {
                                                    val = val.substring(0, 2) + '/' + val.substring(2, 4);
                                                }
                                                setFormData({ ...formData, expiry: val });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                        <input
                                            type="text"
                                            name="cvc"
                                            required
                                            maxLength="3"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all font-mono"
                                            placeholder="123"
                                            value={formData.cvc}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '').substring(0, 3);
                                                setFormData({ ...formData, cvc: val });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:w-96 shrink-0">
                        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">Order Summary</h3>

                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-4 items-start">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Subtotal</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-dashed border-gray-200">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full py-4 bg-royalBlue-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-900 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" /> Processing...
                                    </>
                                ) : (
                                    <>
                                        Pay ₹{total.toLocaleString()}
                                    </>
                                )}
                            </button>

                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                                <ShieldCheck size={14} /> 256-bit SSL Secure Payment
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Checkout;
