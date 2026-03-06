import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'py-3 glass-morphism shadow-lg'
                : 'py-5 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                        <img src="/image/logo.jpeg" alt="Eatsee Foods Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
                        EATSEE <span className="text-primary">FOODS</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path
                                    ? 'text-primary underline underline-offset-4 decoration-2'
                                    : 'text-gray-600 dark:text-gray-300'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="h-6 w-[1px] bg-gray-300 dark:bg-gray-700 mx-2"></div>
                    <div className="flex items-center gap-4">
                        <DarkModeToggle />
                        <Link
                            to="/order"
                            className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-all transform hover:scale-105 active:scale-95"
                        >
                            Order Now
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="flex md:hidden items-center gap-4">
                    <DarkModeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-gray-700 dark:text-gray-200"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 top-0 left-0 w-full h-screen bg-white dark:bg-dark-bg z-[60] flex flex-col p-8"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                                    <img src="/image/logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-xl font-bold dark:text-white">EATSEE <span className="text-primary">FOODS</span></span>
                            </Link>
                            <button onClick={() => setIsOpen(false)} className="p-2 dark:text-white">
                                <X size={28} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        className={`text-3xl font-bold flex items-center justify-between group ${location.pathname === link.path ? 'text-primary' : 'text-gray-900 dark:text-white'
                                            }`}
                                    >
                                        {link.name}
                                        <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.1 }}
                                className="mt-8"
                            >
                                <Link
                                    to="/order"
                                    className="w-full block text-center bg-primary text-white py-4 rounded-xl text-xl font-bold hover:bg-primary-dark transition-all"
                                >
                                    Order Now
                                </Link>
                            </motion.div>
                        </div>

                        <div className="mt-auto items-center justify-center flex gap-6 text-gray-500">
                            <span className="text-sm">9562496164</span>
                            <span className="text-sm">Omassery, Kerala</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
