import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Facebook, Clock, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you! Your inquiry has been sent. We will contact you soon.");
    };

    return (
        <div className="pt-24 pb-20 bg-zinc-50 dark:bg-dark-bg">
            <section className="section-padding">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Info Side */}
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <span className="text-primary font-bold uppercase tracking-widest text-sm">Reach Out</span>
                                <h1 className="text-5xl md:text-7xl font-playfair font-black dark:text-white leading-tight">
                                    Let's Talk <br /> <span className="text-primary italic">Food & Business.</span>
                                </h1>
                                <p className="text-lg text-gray-500 dark:text-gray-400">
                                    Have questions about our products, delivery areas, or interested in a wholesale partnership? We're here to help.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    { icon: Phone, title: "Call Us", value: "+91 9562496164", sub: "Mon-Sat 6am-8pm" },
                                    { icon: MessageCircle, title: "WhatsApp", value: "+91 9562496164", sub: "Fast response" },
                                    { icon: Mail, title: "Email Us", value: "eatseefoods@gmail.com", sub: "General inquiries" },
                                    { icon: MapPin, title: "Location", value: "Omassery, Kerala", sub: "Kozhikode district" },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                                            <item.icon size={24} />
                                        </div>
                                        <h4 className="font-bold text-gray-400 text-sm uppercase mb-1">{item.title}</h4>
                                        <p className="font-bold text-lg dark:text-white mb-1">{item.value}</p>
                                        <p className="text-xs text-gray-400">{item.sub}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-gray-200 dark:border-zinc-800">
                                <p className="font-bold mb-4 dark:text-white">Follow Our Process</p>
                                <div className="flex gap-4">
                                    {[Instagram, Facebook].map((Icon, i) => (
                                        <a key={i} href="#" className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-all">
                                            <Icon size={20} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-10 md:p-16 rounded-[4rem] shadow-2xl"
                        >
                            <h2 className="text-3xl font-playfair font-bold dark:text-white mb-8">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 ml-2">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-6 py-4 bg-zinc-50 dark:bg-black border border-gray-100 dark:border-zinc-800 rounded-2xl outline-none focus:border-primary transition-colors dark:text-white"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 ml-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full px-6 py-4 bg-zinc-50 dark:bg-black border border-gray-100 dark:border-zinc-800 rounded-2xl outline-none focus:border-primary transition-colors dark:text-white"
                                            placeholder="+91 0000 0000"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-2">Subject</label>
                                    <select className="w-full px-6 py-4 bg-zinc-50 dark:bg-black border border-gray-100 dark:border-zinc-800 rounded-2xl outline-none focus:border-primary transition-colors dark:text-white appearance-none">
                                        <option>Product Inquiry</option>
                                        <option>Wholesale/Retail Supply</option>
                                        <option>Bulk Order for Event</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-2">Your Message</label>
                                    <textarea
                                        rows="5"
                                        required
                                        className="w-full px-6 py-4 bg-zinc-50 dark:bg-black border border-gray-100 dark:border-zinc-800 rounded-2xl outline-none focus:border-primary transition-colors dark:text-white resize-none"
                                        placeholder="Tell us how we can help you..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="w-full py-5 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 group">
                                    Send Inquiry <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Simulation */}
            <section className="h-[500px] w-full bg-zinc-200 dark:bg-zinc-800 mt-20 grayscale brightness-90 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center z-10 bg-white/90 dark:bg-black/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20">
                        <MapPin size={48} className="text-primary mx-auto mb-4 animate-pulse" />
                        <h3 className="text-2xl font-bold dark:text-white mb-2">Our Headquarters</h3>
                        <p className="text-gray-500">Omassery, Kozhikode, Kerala 673582</p>
                        <a
                            href="https://www.google.com/maps/search/Omassery,+Kerala"
                            target="_blank"
                            className="inline-block mt-4 text-primary font-bold hover:underline"
                        >
                            Get Directions
                        </a>
                    </div>
                </div>
                {/* Abstract background for map */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg width="100%" height="100%">
                        <pattern id="pattern-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#pattern-grid)" />
                    </svg>
                </div>
            </section>
        </div>
    );
};

export default Contact;
