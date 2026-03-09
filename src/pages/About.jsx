import React from 'react';
import { motion } from 'framer-motion';
import { History, Target, CheckCircle2, Award, Users, Shield } from 'lucide-react';

const About = () => {
    return (
        <div className="pt-24 pb-20">
            {/* Header Section */}
            <section className="section-padding overflow-hidden">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold uppercase tracking-widest"
                    >
                        Since 1994
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-playfair font-black dark:text-white"
                    >
                        Authenticity <span className="text-primary italic">Redefined.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400"
                    >
                        Eatsee Foods is more than just a brand; it's a journey of taste, a commitment to quality, and a tribute to the culinary arts of Kerala.
                    </motion.p>
                </div>
            </section>

            {/* Story Section */}
            <section className="section-padding bg-zinc-50 dark:bg-black overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <img src="/image/logo.png" alt="Our Story" className="rounded-[4rem] shadow-2xl relative z-10 w-full" />
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
                            <History size={32} />
                        </div>
                        <h2 className="text-4xl font-playfair font-bold dark:text-white">Continuing the Legacy of My Parents</h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                            <p>
                                The foundations of Eatsee Foods were laid in a small home kitchen, where my parents combined their passion for traditional recipes with an unyielding commitment to quality. They believed that food is the most powerful way to connect people and preserve culture.
                            </p>
                            <p>
                                Today, I am proud to carry that torch forward. We've scaled our production, but we haven't changed our recipes or our philosophy. Every Pathiri and Idiyappam we produce is made as if it were for our own family table.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision Cards */}
            <section className="section-padding">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-12 bg-primary text-white rounded-[3rem] shadow-2xl">
                        <Target size={48} className="mb-8 opacity-50" />
                        <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                        <p className="text-white/80 text-lg leading-relaxed">
                            To provide every household and retail partner with authentic, healthy, and hygienic traditional Kerala food products that taste exactly like home.
                        </p>
                    </div>
                    <div className="p-12 bg-zinc-900 border border-zinc-800 text-white rounded-[3rem] shadow-2xl">
                        <Target size={48} className="mb-8 opacity-50 text-primary" />
                        <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            To be the most trusted name in traditional food manufacturing in South India, known for our integrity, hygiene standards, and the preservation of heritage flavors.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quality Promise */}
            <section className="section-padding bg-zinc-50 dark:bg-zinc-950">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold dark:text-white">Hygiene & Quality Assurance</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">We follow rigorous standards to ensure that every product leaving our facility is safe and superior.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Safe Ingredients", desc: "Sourced from trusted local farmers", icon: Shield },
                            { title: "Zero Additives", desc: "No artificial colors or preservatives", icon: CheckCircle2 },
                            { title: "Hygienic Kitchen", desc: "State of the art sterile environment", icon: Award },
                            { title: "Daily Checks", desc: "Rigorous quality testing per batch", icon: Users },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-white dark:bg-black p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm transition-all"
                            >
                                <item.icon className="text-primary mb-6" size={32} />
                                <h4 className="text-xl font-bold mb-3 dark:text-white">{item.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
