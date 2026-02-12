
import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-300 py-20 px-4 md:px-8 border-t border-gray-900 mt-20">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">

                {/* Brand */}
                <div className="space-y-6">
                    <h3 className="text-4xl font-black text-white tracking-tighter uppercase mb-4">
                        Meteor<span className="text-gold-500">.</span>
                    </h3>
                    <p className="max-w-sm text-gray-500 leading-relaxed mx-auto md:mx-0 text-sm">
                        Crafting the future of footwear. Bold designs, premium materials, and unparalleled comfort for the modern explorer.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-6">
                        <Facebook className="hover:text-gold-500 cursor-pointer transition-colors" size={20} />
                        <Twitter className="hover:text-gold-500 cursor-pointer transition-colors" size={20} />
                        <Instagram className="hover:text-gold-500 cursor-pointer transition-colors" size={20} />
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-sm font-bold text-white mb-8 uppercase tracking-widest text-gold-600">Explore</h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><a href="/" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all hover:after:w-full inline-block pb-1">Home</a></li>
                        <li><a href="/products" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all hover:after:w-full inline-block pb-1">Collection</a></li>
                        <li><a href="/cart" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all hover:after:w-full inline-block pb-1">Shopping Bag</a></li>
                        <li><a href="/auth" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all hover:after:w-full inline-block pb-1">Account</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-sm font-bold text-white mb-8 uppercase tracking-widest text-gold-600">Get in Touch</h4>
                    <ul className="space-y-5 text-sm">
                        <li className="flex items-start justify-center md:justify-start gap-4 text-gray-400">
                            <MapPin className="shrink-0 text-gold-500 mt-0.5" size={18} />
                            <span>Meteor HQ, MG Road, Bangalore</span>
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-4 text-gray-400">
                            <Phone className="shrink-0 text-gold-500" size={18} />
                            <span>+91 99999 88888</span>
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-4 text-gray-400">
                            <Mail className="shrink-0 text-gold-500" size={18} />
                            <span>hello@meteor.com</span>
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="text-sm font-bold text-white mb-8 uppercase tracking-widest text-gold-600">Join the Movement</h4>
                    <div className="flex flex-col space-y-4">
                        <input type="email" placeholder="Your email address" className="bg-gray-900 border border-gray-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-sm" />
                        <button className="bg-white text-gray-900 font-bold px-6 py-4 rounded-xl hover:bg-gold-500 hover:text-white transition-all uppercase tracking-wider text-xs shadow-lg transform hover:-translate-y-1">Subscribe</button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-900 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-medium tracking-wide container mx-auto">
                <p>&copy; {new Date().getFullYear()} METEOR. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
