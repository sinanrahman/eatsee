import React from 'react';
import TestimonialsSection from '../components/Testimonials';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Users, ThumbsUp } from 'lucide-react';

const extraTestimonials = [
    {
        id: 4,
        name: "Dennis Varghese",
        role: "Retail Partner",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dennis",
        content: "The hygiene standards at Eatsee Foods are top-notch. I visited their kitchen and was impressed by the automated processes combined with traditional care.",
        rating: 5
    },
    {
        id: 5,
        name: "Fathima Suhara",
        role: "Homemaker",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fathima",
        content: "My kids love the Chappathi from Eatsee. It's so soft and tastes exactly like what I make at home. Saves me so much time every morning!",
        rating: 5
    },
    {
        id: 6,
        name: "Kiran Kumar",
        role: "Event Planner",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kiran",
        content: "When it comes to bulk orders for traditional Kerala food, Eatsee is our first choice. Their packaging is clean and delivery is always sharp.",
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <div className="pt-24 pb-20">
            {/* Header */}
            <section className="section-padding overflow-hidden">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary font-bold uppercase tracking-widest"
                    >
                        Voice of Customers
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-playfair font-black dark:text-white"
                    >
                        Trusted by <span className="text-primary italic">Thousands.</span>
                    </motion.h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                        From individual households to large retailers, we have built a legacy based on trust and the authentic taste of tradition.
                    </p>
                </div>
            </section>

            {/* Main Grid */}
            <TestimonialsSection />

            {/* More Reviews */}
            <section className="section-padding pt-0">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {extraTestimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-zinc-100 dark:bg-zinc-900/50 p-8 rounded-[2.5rem] border border-transparent dark:border-zinc-800"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-primary text-primary" />
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                "{t.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full overflow-hidden grayscale opacity-70">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold dark:text-white text-sm">{t.name}</h4>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="section-padding bg-primary text-white">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {[
                        { icon: Users, val: "10,000+", label: "Happy Families" },
                        { icon: ThumbsUp, val: "99%", label: "Satisfaction Rate" },
                        { icon: MessageSquare, val: "500+", label: "Shop Partners" },
                        { icon: Star, val: "4.9/5", label: "Average Rating" },
                    ].map((stat, i) => (
                        <div key={i} className="space-y-4">
                            <stat.icon size={40} className="mx-auto opacity-30" />
                            <h3 className="text-4xl font-black">{stat.val}</h3>
                            <p className="font-bold text-white/70 uppercase text-xs tracking-[0.2em]">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Review CTA */}
            <section className="section-padding">
                <div className="max-w-5xl mx-auto bg-zinc-900 text-white p-12 md:p-20 rounded-[4rem] text-center space-y-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-0"></div>
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold relative z-10">Have feedback for us?</h2>
                    <p className="text-gray-400 text-lg relative z-10">We would love to hear about your experience with Eatsee Foods. Your feedback helps us improve.</p>
                    <div className="relative z-10">
                        <button className="btn-primary">Write a Review</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonials;
