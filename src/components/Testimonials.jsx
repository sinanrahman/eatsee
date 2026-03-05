import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Regular Customer",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        content: "The Pathiri is incredibly soft, just like how my grandmother used to make. Finding authentic taste like this in a store is rare.",
        rating: 5
    },
    {
        id: 2,
        name: "Mohammed Rafi",
        role: "Grocery Shop Owner",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rafi",
        content: "Eatsee Foods products are the fastest-selling items in my shop. Their supply is always on time and the quality is consistent.",
        rating: 5
    },
    {
        id: 3,
        name: "Anjali Menon",
        role: "Catering Head",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
        content: "We've been using Eatsee for our wedding orders. Their Idiyappam remains soft even hours after delivery. Highly recommended!",
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section className="section-padding bg-zinc-50 dark:bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <span className="text-primary font-bold uppercase tracking-widest text-sm">Real Stories</span>
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold dark:text-white">What Our Community Says</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm relative group"
                        >
                            <Quote className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors" size={60} />

                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={18} className="fill-primary text-primary" />
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed italic">
                                "{t.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold dark:text-white">{t.name}</h4>
                                    <p className="text-xs text-gray-500">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
