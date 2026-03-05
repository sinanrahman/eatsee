import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-zinc-50 dark:bg-black pt-20 pb-10 border-t border-gray-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                                <img src="/image/logo.jpeg" alt="Eatsee Foods Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-2xl font-bold dark:text-white">EATSEE <span className="text-primary">FOODS</span></span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Continuing the legacy of homemade taste. We specialize in traditional Kerala food products made with love and hygiene.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 shadow-sm hover:bg-primary hover:text-white transition-all text-gray-600 dark:text-gray-400"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 dark:text-white">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Home', 'About Us', 'Products', 'Services', 'Gallery', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
                                        className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 dark:text-white">Our Specialties</h4>
                        <ul className="space-y-4">
                            {['Pathiri', 'Idiyappam', 'Vellappam', 'Chappathi', 'Traditional Snacks'].map((item) => (
                                <li key={item} className="text-gray-600 dark:text-gray-400">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 dark:text-white">Get in Touch</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                                <MapPin className="text-primary shrink-0" size={20} />
                                <span>Omassery, Kozhikode,<br />Kerala, India</span>
                            </li>
                            <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                                <Phone className="text-primary shrink-0" size={20} />
                                <span>+91 9567496164</span>
                            </li>
                            <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                                <Mail className="text-primary shrink-0" size={20} />
                                <span>info@eatsee.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Eatsee Foods. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-primary">Privacy Policy</a>
                        <a href="#" className="hover:text-primary">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
