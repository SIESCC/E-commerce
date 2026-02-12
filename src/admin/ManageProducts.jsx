
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash, Plus } from 'lucide-react';
import { productService } from '../services/api';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        const data = await productService.getAll();
        setProducts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await productService.delete(id);
            setProducts(products.filter(p => p.id !== id));
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading products...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold text-gray-900">Product Inventory</h2>
                <Link to="/admin/add" className="inline-flex items-center gap-2 px-4 py-2 bg-royalBlue-900 text-white rounded-lg hover:bg-gray-900 transition-colors shadow-sm">
                    <Plus size={18} /> Add New Product
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 font-semibold text-gray-600 text-sm">ID</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm">Image</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm">Name</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm">Price</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm">Category</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 text-sm text-gray-500">#{product.id}</td>
                                <td className="p-4">
                                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg border border-gray-100 bg-gray-50" />
                                </td>
                                <td className="p-4 text-sm font-medium text-gray-900">{product.name}</td>
                                <td className="p-4 text-sm text-gray-600">₹{product.price.toLocaleString('en-IN')}</td>
                                <td className="p-4 text-sm text-gold-600 font-medium bg-gold-50 inline-block px-2 py-1 rounded mt-2 uppercase text-xs tracking-wider">{product.category}</td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link to={`/admin/edit/${product.id}`} className="p-2 text-gray-400 hover:text-royalBlue-900 hover:bg-blue-50 rounded-full transition-all">
                                            <Edit size={18} />
                                        </Link>
                                        <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;
