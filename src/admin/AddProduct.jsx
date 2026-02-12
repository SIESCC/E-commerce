
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productService } from '../services/api';
import { Image, UploadCloud } from 'lucide-react';

const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        image: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await productService.create({
                ...formData,
                price: parseFloat(formData.price)
            });
            navigate('/admin');
        } catch (error) {
            console.error("Failed to create product", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="container mx-auto px-4 py-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-royalBlue-900 px-8 py-6 text-white">
                    <h2 className="text-2xl font-bold font-serif">Add New Product</h2>
                    <p className="opacity-80 text-sm mt-1">Fill in the details to add a new item to your inventory.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all"
                                placeholder="Ex: Royal Jutti 2024"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all"
                                    placeholder="2499.00"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    name="category"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all bg-white"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select Category</option>
                                    <option value="Ethnic">Ethnic</option>
                                    <option value="Formal">Formal</option>
                                    <option value="Casual">Casual</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Sneakers">Sneakers</option>
                                    <option value="Boots">Boots</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <div className="relative">
                                <input
                                    type="url"
                                    name="image"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.image}
                                    onChange={handleChange}
                                    required
                                />
                                <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><UploadCloud size={12} /> Paste any valid image URL here.</p>
                        </div>

                        {formData.image && (
                            <div className="mt-2 p-2 border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center h-32 overflow-hidden relative">
                                <img src={formData.image} alt="Preview" className="h-full object-contain" onError={(e) => e.target.style.display = 'none'} />
                                <span className="absolute text-xs text-gray-400 bottom-1">Preview</span>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all resize-none"
                                placeholder="Describe the craftmanship and materials..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-royalBlue-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-900 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? 'Creating Product...' : 'Add To Inventory'}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default AddProduct;
