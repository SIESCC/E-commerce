
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HeroCarousel from '../components/HeroCarousel';
import { productService } from '../services/api';
import { pageVariants, pageTransition } from '../animations/pageTransition';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await productService.getAll();
            setFeaturedProducts(data.slice(0, 4));
        };
        fetchProducts();
    }, []);

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="pb-20 bg-gray-50"
        >
            <HeroCarousel />

            <section className="container mx-auto px-4 py-24 text-center">
                <div className="relative mb-16 inline-block">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase mb-4 relative z-10">
                        Meteor Editions
                    </h2>
                    <div className="h-4 bg-gold-200/50 w-full absolute bottom-2 -skew-x-12 -z-0" />
                    <p className="text-gray-500 max-w-lg mx-auto font-medium tracking-wide uppercase text-sm">Design • Innovation • Performance</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-20">
                    <Link to="/products" className="inline-flex items-center px-12 py-5 bg-gray-900 text-white hover:bg-gold-500 hover:text-gray-900 transition-all duration-300 font-bold tracking-widest uppercase text-sm shadow-xl rounded-full transform hover:-translate-y-1">
                        View All Products
                    </Link>
                </div>
            </section>

            <section className="bg-gray-900 text-white py-32 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center">
                    <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">THE METEOR WAY</h2>
                    <p className="max-w-2xl mx-auto text-gray-400 mb-12 text-xl leading-relaxed font-light">
                        We don't just make shoes. We craft experiences. Every stitch, every curve, and every material is chosen with obsession.
                    </p>
                    <div className="w-32 h-1 bg-gold-500 rounded-full" />
                </div>

                {/* Background Texture */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-royalBlue-900/30 rounded-full blur-[100px]" />
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gold-600/20 rounded-full blur-[100px]" />
            </section>
        </motion.div>
    );
};

export default Home;
