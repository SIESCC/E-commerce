
import React, { useState } from 'react';
import ManageProducts from '../admin/ManageProducts';
import ManageCarousel from '../admin/ManageCarousel';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Image, LayoutDashboard } from 'lucide-react';

const AdminDashboard = () => {
    const { user, isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState('products');

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
        <motion.div
            className="container mx-auto px-4 py-8 min-h-screen bg-gray-50 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="mb-8 p-6 bg-gradient-to-r from-royalBlue-900 to-gray-900 rounded-2xl shadow-lg text-white">
                <h2 className="text-3xl font-bold mb-2">Welcome Back, {user?.name}</h2>
                <p className="opacity-80">Manage your store inventory and homepage aesthetics from one place.</p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-gray-100 mb-8 w-fit">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'products'
                            ? 'bg-royalBlue-900 text-white shadow-md'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                >
                    <Package size={20} /> Products
                </button>
                <button
                    onClick={() => setActiveTab('carousel')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'carousel'
                            ? 'bg-royalBlue-900 text-white shadow-md'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                >
                    <Image size={20} /> Carousel
                </button>
            </div>

            {/* Content */}
            <div className="transition-all duration-300">
                {activeTab === 'products' ? <ManageProducts /> : <ManageCarousel />}
            </div>
        </motion.div>
    );
};

export default AdminDashboard;
