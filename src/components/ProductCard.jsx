
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = React.useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            whileHover={{ y: -5 }}
        >
            <Link to={`/product/${product.id}`} className="block h-full flex flex-col">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                        loading="lazy"
                    />

                    {/* Badge */}
                    {product.category === "Ethnic" && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-md">
                            Hot
                        </span>
                    )}

                    {/* Quick Add Button on Image Hover */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button
                            onClick={handleAddToCart}
                            className={`w-full py-3 text-sm font-bold uppercase rounded-lg shadow-lg ${isAdded ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-gray-800'
                                }`}
                        >
                            {isAdded ? 'Added' : 'Quick Add'}
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{product.category}</p>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors line-clamp-1 mb-2 leading-tight">{product.name}</h3>

                    <div className="mt-auto pt-2 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-lg font-black text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                        <ShoppingBag size={18} className="text-gray-400 group-hover:text-black transition-colors" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
