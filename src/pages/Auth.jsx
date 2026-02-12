
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, CheckCircle, ArrowRight } from 'lucide-react';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                const user = await authService.login(formData.email, formData.password);
                login(user);
                navigate(user.role === 'admin' ? '/admin' : '/');
            } else {
                if (formData.password !== formData.confirmPassword) {
                    throw new Error("Passwords do not match");
                }
                const user = await authService.register(formData.email, formData.password, formData.name);
                login(user);
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 mb-20">

            {/* Left Column (Brand) */}
            <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-royalBlue-900 text-white p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                <h1 className="text-5xl font-black mb-6 z-10 font-serif tracking-tight">Meteor<span className="text-gold-500">.</span></h1>
                <p className="text-lg text-gray-300 max-w-sm text-center z-10 leading-relaxed">
                    Step into a world of elegance and heritage. Sign in to access an exclusive collection of premium Indian footwear.
                </p>
            </div>

            {/* Right Column (Form) */}
            <div className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-white md:w-1/2">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            {isLogin ? 'Welcome back' : 'Create an account'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {isLogin ? 'Please enter your details to sign in.' : 'Join us and start your journey with luxury.'}
                        </p>
                    </div>

                    {error && <div className="p-4 rounded-lg bg-red-50 text-red-500 text-sm border border-red-100">{error}</div>}

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <div className="relative rounded-lg shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            required={!isLogin}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-royalBlue-900 focus:border-royalBlue-900 sm:text-sm transition-colors"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                <div className="relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-royalBlue-900 focus:border-royalBlue-900 sm:text-sm transition-colors"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        minLength={6}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-royalBlue-900 focus:border-royalBlue-900 sm:text-sm transition-colors"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                    <div className="relative rounded-lg shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <CheckCircle className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            required={!isLogin}
                                            minLength={6}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-royalBlue-900 focus:border-royalBlue-900 sm:text-sm transition-colors"
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-royalBlue-900 focus:ring-royalBlue-900 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-royalBlue-900 hover:text-royalBlue-800">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-royalBlue-900 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royalBlue-900 transition-colors shadow-lg hover:shadow-xl"
                        >
                            {loading ? 'Processing...' : (
                                <span className="flex items-center">
                                    {isLogin ? 'Sign in' : 'Create account'} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-gold-600 hover:text-gold-500 transition-colors">
                                {isLogin ? 'Sign up for free' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
