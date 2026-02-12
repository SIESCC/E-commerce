
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productService } from '../services/api';
import { Save, Image } from 'lucide-react';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        image: '',
        description: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await productService.getById(id);
                if (product) {
                    setFormData({
                        ...product,
                        price: product.price.toString()
                    });
                }
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await productService.update(id, {
                ...formData,
                price: parseFloat(formData.price)
            });
            navigate('/admin');
        } catch (error) {
            console.error("Failed to update product", error);
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <motion.div
            className="container mx-auto px-4 py-8 max-w-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-royalBlue-900 px-8 py-6 text-white flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold font-serif">Edit Product</h2>
                        <p className="opacity-80 text-sm mt-1">Update product details below.</p>
                    </div>
                    <div className="bg-white/10 p-2 rounded-lg">
                        <Save size={24} />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none transition-all focus:border-transparent"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input
                                type="text"
                                name="category"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="url"
                                    name="image"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none"
                                    value={formData.image}
                                    onChange={handleChange}
                                    required
                                />
                                <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>
                        {formData.image && (
                            <div className="mt-3 relative h-40 w-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                                <img src={formData.image} alt="Preview" className="h-full object-contain" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            rows="5"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none resize-none"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin')}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] bg-royalBlue-900 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-gray-900 hover:shadow-xl transition-all disabled:opacity-70"
                            disabled={loading}
                        >
                            {loading ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default EditProduct;
