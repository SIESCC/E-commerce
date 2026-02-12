
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [categories, setCategories] = useState(['All']);
    const [sortOrder, setSortOrder] = useState('default');

    useEffect(() => {
        const loadProducts = async () => {
            const data = await productService.getAll();
            setProducts(data);
            setFilteredProducts(data);
            const cats = ['All', ...new Set(data.map(p => p.category))];
            setCategories(cats);
        };
        loadProducts();
    }, []);

    useEffect(() => {
        let result = [...products];

        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (sortOrder === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(result);
    }, [searchQuery, activeCategory, sortOrder, products]);

    return (
        <motion.div
            className="container mx-auto px-4 py-12 min-h-screen bg-gray-50 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div className="text-center md:text-left mb-6 md:mb-0">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 tracking-tight mb-2">
                        The Collection
                    </h1>
                    <p className="text-gray-500 max-w-lg">
                        Immerse yourself in our meticulously curated selection of premium footwear.
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-96 shadow-sm group">
                    <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-royalBlue-900 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search footwear..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all duration-300"
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-6 mb-10 sticky top-24 z-30 bg-gray-50/95 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide flex-1">
                    <SlidersHorizontal size={20} className="text-royalBlue-900 shrink-0" />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat
                                    ? 'bg-royalBlue-900 text-white shadow-md transform scale-105'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <ArrowDownWideNarrow size={20} className="text-royalBlue-900" />
                    <select
                        className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-gold-500 focus:border-gold-500 block w-full p-2.5 outline-none cursor-pointer"
                        onChange={(e) => setSortOrder(e.target.value)}
                        value={sortOrder}
                    >
                        <option value="default">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full py-20 bg-white rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
                        <p className="text-xl text-gray-500 mb-4">No products found matching your search.</p>
                        <button
                            className="px-6 py-2 bg-royalBlue-900 text-gold-500 font-medium rounded-lg hover:bg-gray-900 transition-colors"
                            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Products;
