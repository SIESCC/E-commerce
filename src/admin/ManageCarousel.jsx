
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { carouselService } from '../services/api';
import { Trash, Plus, Image } from 'lucide-react';

const ManageCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newSlide, setNewSlide] = useState({
        image: '',
        title: '',
        description: ''
    });

    const fetchSlides = async () => {
        const data = await carouselService.getAll();
        setSlides(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this slide?')) {
            await carouselService.delete(id);
            setSlides(slides.filter(s => s.id !== id));
        }
    };

    const handleAddSlide = async (e) => {
        e.preventDefault();
        setLoading(true);
        const added = await carouselService.create(newSlide);
        setSlides([...slides, added]);
        setNewSlide({ image: '', title: '', description: '' });
        setLoading(false);
    };

    return (
        <motion.div
            className="container mx-auto px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Manage Carousel</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus size={20} /> Add New Slide</h3>
                    <form onSubmit={handleAddSlide} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <div className="relative">
                                <input
                                    type="url"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none"
                                    placeholder="https://images.unsplash.com/..."
                                    value={newSlide.image}
                                    onChange={(e) => setNewSlide({ ...newSlide, image: e.target.value })}
                                />
                                <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none"
                                placeholder="Slide Heading"
                                value={newSlide.title}
                                onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royalBlue-900 outline-none resize-none"
                                rows="3"
                                placeholder="Subtitle text..."
                                value={newSlide.description}
                                onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-royalBlue-900 text-white font-bold py-3 rounded-lg hover:bg-gray-900 transition-colors shadow-md"
                        >
                            {loading ? 'Adding...' : 'Add Slide'}
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold mb-4">Current Slides</h3>
                    {slides.map(slide => (
                        <div key={slide.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
                            <img src={slide.image} alt="Slide" className="w-24 h-16 object-cover rounded-lg bg-gray-100" />
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 line-clamp-1">{slide.title}</h4>
                                <p className="text-sm text-gray-500 line-clamp-1">{slide.description}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(slide.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                            >
                                <Trash size={18} />
                            </button>
                        </div>
                    ))}
                    {slides.length === 0 && <p className="text-gray-500 italic">No slides found.</p>}
                </div>
            </div>
        </motion.div>
    );
};

export default ManageCarousel;
