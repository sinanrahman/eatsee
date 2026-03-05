import React from 'react';
import Hero from '../components/Hero';
import FoodScrollShowcase from '../components/FoodScrollShowcase';
import ProductCard from '../components/ProductCard';
import Testimonials from '../components/Testimonials';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

const homeProducts = [
    { id: 1, name: "Pathiri", image: "/image/pathiri.jpeg", description: "Soft and thin rice pancakes." },
    { id: 2, name: "Idiyappam", image: "/image/idiyappam.jpeg", description: "Classic steamed rice string hoppers." },
    { id: 3, name: "Vellappam", image: "/image/vellappam.jpeg", description: "Lacy coconut rice pancakes." },
    { id: 4, name: "Chappathi", image: "/image/chappathy.jpeg", description: "Healthy whole wheat flatbread." },
];

const Home = () => {
    return (
        <div className="overflow-hidden">
            <Hero />

            <FoodScrollShowcase />

            {/* About Preview Section */}
            <section className="section-padding bg-zinc-50 dark:bg-black">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="rounded-[3rem] overflow-hidden shadow-2xl">
                            <img src="/image/logo.jpeg" alt="Eatsee Heritage" className="w-full aspect-square object-cover" />
                        </div>
                        <div className="absolute -bottom-10 -right-10 bg-primary p-8 rounded-3xl shadow-xl hidden md:block">
                            <p className="text-4xl font-black text-white">30+</p>
                            <p className="text-white/80 font-medium">Years of Legacy</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">A Taste of Tradition</span>
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold dark:text-white leading-tight">
                            Continuing the Legacy of <br /> Our Parents
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                            At Eatsee Foods, we don't just manufacture food; we preserve memories. What started in our home kitchen decades ago has now become a mission to share authentic, hygienic, and traditional Kerala flavors with every household.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                            {[
                                { icon: ShieldCheck, title: "Pure Quality", desc: "No preservatives added" },
                                { icon: Heart, title: "Homemade", desc: "Crafted with love" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-zinc-800">
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold dark:text-white">{item.title}</h4>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-8">
                            <Link to="/about" className="btn-outline">Our Full Story</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Products Preview */}
            <section className="section-padding bg-white dark:bg-dark-bg">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <span className="text-primary font-bold uppercase tracking-widest text-sm">Customer Favorites</span>
                            <h2 className="text-4xl md:text-5xl font-playfair font-bold dark:text-white">Our Popular Items</h2>
                        </div>
                        <Link to="/products" className="text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
                            Explore All Products <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {homeProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            <Testimonials />

            {/* Delivery Coverage Info */}
            <section className="section-padding bg-primary/10 dark:bg-zinc-950">
                <div className="max-w-7xl mx-auto bg-primary text-white rounded-[4rem] p-12 md:p-20 overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/4"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="space-y-8">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center">
                                <Truck size={40} />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-playfair font-black">
                                Freshly Delivered <br />to Your Door.
                            </h2>
                            <p className="text-white/80 text-lg md:text-xl max-w-md">
                                Supplying fresh traditional food to houses, local shops, and retailers in and around Omassery, Kozhikode.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/order" className="px-10 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-gray-100 transition-colors shadow-xl">
                                    Order Now
                                </Link>
                                <Link to="/contact" className="px-10 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors">
                                    Contact Support
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { title: "Quick Delivery", body: "Same day supply" },
                                { title: "Bulk Orders", body: "For events & shops" },
                                { title: "Free Shipping", body: "On limited areas" },
                                { title: "Pure Freshness", body: "Daily production" },
                            ].map((item, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/10">
                                    <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                                    <p className="text-white/60 text-sm">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
