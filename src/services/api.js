
import { supabase, isSupabaseConfigured } from './supabaseClient';

const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "Classic Jodhpur Boots",
        price: 4500.00,
        category: "Boots",
        image: "https://images.unsplash.com/photo-1628253747716-0c4f5c90fdda?q=80&w=2000&auto=format&fit=crop",
        description: "Handcrafted Jodhpur boots made from premium leather, perfect for formal and casual wear.",
    },
    {
        id: 2,
        name: "Royal Ethnic Mojaris",
        price: 3200.00,
        category: "Ethnic",
        image: "https://images.unsplash.com/photo-1603487742131-41f3dd70b935?q=80&w=2000&auto=format&fit=crop",
        description: "Traditional Mojaris with intricate embroidery for that royal Indian touch.",
    },
    {
        id: 3,
        name: "Urban Street Sneakers",
        price: 2800.00,
        category: "Sneakers",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000&auto=format&fit=crop",
        description: "Stylish everyday sneakers designed for comfort and durability in the city.",
    },
    {
        id: 4,
        name: "Oxford Business Derby",
        price: 5500.00,
        category: "Formal",
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=2000&auto=format&fit=crop",
        description: "Elegant Derby shoes crafted for the professional who values style and comfort.",
    },
    {
        id: 5,
        name: "Pro Performance Runners",
        price: 3999.00,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2000&auto=format&fit=crop",
        description: "High-performance running shoes with advanced cushioning technology.",
    },
    {
        id: 6,
        name: "Suede Casual Loafers",
        price: 2200.00,
        category: "Casual",
        image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=2000&auto=format&fit=crop",
        description: "Relaxed fit loafers, ideal for weekends and casual outings.",
    },
    {
        id: 7,
        name: "Wedding Sherwani Shoes",
        price: 6500.00,
        category: "Ethnic",
        image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=2000&auto=format&fit=crop",
        description: "Exquisite shoes to complete your wedding ensemble, featuring traditional designs.",
    },
    {
        id: 8,
        name: "Court High-Tops",
        price: 4200.00,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1579338559194-a162d841790d?q=80&w=2000&auto=format&fit=crop",
        description: "Professional grade basketball shoes providing ankle support and traction.",
    }
];

const MOCK_SLIDES = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1556906781-9a412961d289?q=80&w=2000&auto=format&fit=crop",
        title: "DROP 01: GENESIS",
        description: "The future of streetwear is here. Limited edition sneakers."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=2000&auto=format&fit=crop",
        title: "RUN THE NIGHT",
        description: "Reflective gear for the nocturnal explorer."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1607522370275-f14bc3a5d288?q=80&w=2000&auto=format&fit=crop",
        title: "METEOR CLASSICS",
        description: "Timeless designs re-engineered for comfort."
    }
];

const STORAGE_KEYS = {
    PRODUCTS: 'meteor_products_v3',
    SLIDES: 'meteor_slides_v1',
    users: 'meteor_users_v3',
};

// Initialize data if not present (only relevant for localStorage fallback)
const initializeData = () => {
    if (!isSupabaseConfigured) {
        if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(MOCK_PRODUCTS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.SLIDES)) {
            localStorage.setItem(STORAGE_KEYS.SLIDES, JSON.stringify(MOCK_SLIDES));
        }
    }
};

initializeData();

export const productService = {
    getAll: async () => {
        if (isSupabaseConfigured) {
            const { data, error } = await supabase.from('products').select('*').order('id');
            if (error) {
                console.error('Error fetching products:', error);
                throw error;
            }
            return data;
        }

        // Fallback
        await new Promise(resolve => setTimeout(resolve, 500));
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
    },

    getById: async (id) => {
        if (isSupabaseConfigured) {
            const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
            if (error) throw error;
            return data;
        }

        // Fallback
        await new Promise(resolve => setTimeout(resolve, 300));
        const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
        return products.find(p => p.id === Number(id));
    },

    create: async (product) => {
        if (isSupabaseConfigured) {
            // Remove ID if present to let DB generate it, or handle correctly
            const { id, ...productData } = product;
            const { data, error } = await supabase.from('products').insert([productData]).select().single();
            if (error) throw error;
            return data;
        }

        // Fallback
        await new Promise(resolve => setTimeout(resolve, 500));
        const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
        const newProduct = { ...product, id: Date.now() };
        products.push(newProduct);
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        return newProduct;
    },

    update: async (id, updates) => {
        if (isSupabaseConfigured) {
            const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single();
            if (error) throw error;
            return data;
        }

        // Fallback
        await new Promise(resolve => setTimeout(resolve, 500));
        const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
        const index = products.findIndex(p => p.id === Number(id));
        if (index !== -1) {
            products[index] = { ...products[index], ...updates };
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
            return products[index];
        }
        throw new Error('Product not found');
    },

    delete: async (id) => {
        if (isSupabaseConfigured) {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            return true;
        }

        // Fallback
        await new Promise(resolve => setTimeout(resolve, 500));
        const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
        const filtered = products.filter(p => p.id !== Number(id));
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
        return true;
    }
};

export const carouselService = {
    getAll: async () => {
        if (isSupabaseConfigured) {
            const { data, error } = await supabase.from('slides').select('*').order('id');
            if (error) {
                console.error('Error fetching slides:', error);
                throw error;
            }
            return data;
        }

        // Fallback
        await new Promise(resolve => setTimeout(resolve, 500));
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.SLIDES) || '[]');
    },

    create: async (slide) => {
        if (isSupabaseConfigured) {
            const { id, ...slideData } = slide;
            const { data, error } = await supabase.from('slides').insert([slideData]).select().single();
            if (error) throw error;
            return data;
        }

        // Fallback
        await new Promise(resolve => setTimeout(resolve, 500));
        const slides = JSON.parse(localStorage.getItem(STORAGE_KEYS.SLIDES) || '[]');
        const newSlide = { ...slide, id: Date.now() };
        slides.push(newSlide);
        localStorage.setItem(STORAGE_KEYS.SLIDES, JSON.stringify(slides));
        return newSlide;
    },

    delete: async (id) => {
        if (isSupabaseConfigured) {
            const { error } = await supabase.from('slides').delete().eq('id', id);
            if (error) throw error;
            return true;
        }

        // Fallback
        await new Promise(resolve => setTimeout(resolve, 500));
        const slides = JSON.parse(localStorage.getItem(STORAGE_KEYS.SLIDES) || '[]');
        const filtered = slides.filter(s => s.id !== Number(id));
        localStorage.setItem(STORAGE_KEYS.SLIDES, JSON.stringify(filtered));
        return true;
    }
};

// Auth Simulation (remains local for simplicity unless requested otherwise)
export const authService = {
    login: async (email, password) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        // Hardcoded admin
        if (email === 'admin@store.com' && password === 'admin123') {
            return { id: 1, email, name: 'Admin User', role: 'admin' };
        }
        // Demo user
        if (email === 'user@store.com' && password === 'user123') {
            return { id: 2, email, name: 'Demo User', role: 'user' };
        }
        // Check registered users (in a real app, strict hash checks)
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        if (user) return { ...user, role: 'user' }; // Default role

        throw new Error('Invalid credentials');
    },

    register: async (email, password, name) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
        if (users.find(u => u.email === email)) throw new Error('User already exists');

        const newUser = { id: Date.now(), email, password, name, role: 'user' };
        users.push(newUser);
        localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
        return newUser;
    }
};
