import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_URL = `https://wa.me/919562496164?text=${encodeURIComponent("Hi Eatsee Foods, I would like to place a bulk/custom order.")}`;

const allProducts = [
    { id: 1, name: "Pathiri", category: "Traditional", image: "/image/pathiri.jpeg", description: "Paper-thin rice pancakes, perfect with chicken or mutton curry." },
    { id: 2, name: "Idiyappam", category: "Traditional", image: "/image/idiyappam.jpeg", description: "Steamed rice noodles, light and digestible for a healthy breakfast." },
    { id: 3, name: "Vellappam", category: "Traditional", image: "/image/vellappam.jpeg", description: "Fluffy fermented rice pancakes with a slightly sweet and tangy taste." },
    { id: 4, name: "Chappathi", category: "Daily Bread", image: "/image/chappathy.jpg", description: "Handmade whole wheat chappathi, soft and stays fresh for hours." },
    { id: 5, name: "Idli", category: "Traditional", image: "/image/idli.jpg", description: "Fluffy steamed rice cakes, perfectly paired with sambar and coconut chutney." },
    { id: 6, name: "Porotta", category: "Daily Bread", image: "/image/porotta.jpg", description: "Layered flaky flatbread made with refined wheat, best served with beef or chicken curry." },
];

const categories = ["All", "Traditional", "Daily Bread"];

const Products = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProducts = activeCategory === "All"
        ? allProducts
        : allProducts.filter(p => p.category === activeCategory);

    return (
        <div className="pt-24 pb-20 min-h-screen bg-zinc-50 dark:bg-dark-bg">
            {/* Header */}
            <section className="section-padding pb-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">Full Menu</span>
                        <h1 className="text-5xl md:text-7xl font-playfair font-black dark:text-white">Our Creations</h1>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeCategory === cat
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-zinc-800'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* CTA Box */}
            <section className="section-padding pt-32">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-primary/5 dark:bg-zinc-900 border border-primary/20 p-12 rounded-[3rem] text-center space-y-8">
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold dark:text-white">Want to Place an Order?</h2>
                        <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
                            We cater to large events, weddings, and shop supplies. Contact us on WhatsApp for bulk pricing and specialized menu items.
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <a href="tel:9562496164" className="btn-primary">Call Us</a>
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline"
                            >
                                Order on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
