
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Truck, ShieldCheck, ArrowLeft, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productService } from '../services/api';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getById(id);
                setProduct(data);
                setActiveImage(0);
            } catch (err) {
                console.error("Product not found");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="flex items-center justify-center min-h-screen text-xl text-royalBlue-900">Loading...</div>;
    if (!product) return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">Product not found. <button className="mt-4 px-6 py-2 bg-royalBlue-900 text-white rounded-lg hover:bg-gray-900 transition-colors" onClick={() => navigate(-1)}>Go Back</button></div>;

    return (
        <motion.div
            className="container mx-auto px-4 py-12 md:py-20"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
        >
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-royalBlue-900 font-medium mb-8 transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Collection
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

                {/* Left Column: Images */}
                <motion.div
                    className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="relative aspect-square w-full max-w-[500px] mb-6">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-2xl shadow-lg transition-transform hover:scale-105 duration-500"
                        />
                        {product.category === "Ethnic" && (
                            <span className="absolute top-4 left-4 bg-gold-500 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded-md shadow-md">
                                Premium Range
                            </span>
                        )}
                        <button className="absolute top-4 right-4 bg-white/80 p-2.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-white shadow-sm transition-all">
                            <Heart size={20} />
                        </button>
                    </div>
                </motion.div>

                {/* Right Column: Info */}
                <div className="flex flex-col justify-center">
                    <span className="text-gold-600 font-semibold tracking-widest uppercase text-sm mb-2">{product.category}</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif leading-tight">{product.name}</h1>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} fill="currentColor" className="mr-0.5" />
                            ))}
                        </div>
                        <span className="text-gray-400 text-sm font-medium border-l pl-4 border-gray-200">124 Reviews</span>
                    </div>

                    <p className="text-3xl font-bold text-royalBlue-900 mb-8">₹{product.price.toLocaleString('en-IN')}</p>

                    <p className="text-gray-600 leading-relaxed text-lg mb-8 max-w-xl">{product.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <Truck size={24} className="text-gold-500" />
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">Free Delivery</p>
                                <p className="text-xs text-gray-500">On orders above ₹999</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <ShieldCheck size={24} className="text-gold-500" />
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">Secure Payment</p>
                                <p className="text-xs text-gray-500">100% Protected</p>
                            </div>
                        </div>
                    </div>

                    <motion.button
                        className="w-full md:w-auto bg-royalBlue-900 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-900 hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => addToCart(product)}
                    >
                        <ShoppingBag size={22} /> Add to Cart
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetails;
