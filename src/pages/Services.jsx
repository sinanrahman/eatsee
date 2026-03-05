import React from 'react';
import { motion } from 'framer-motion';
import { Home, Store, Package, ChefHat, MapPin, Truck, Clock, ShieldCheck } from 'lucide-react';

const services = [
    {
        icon: Home,
        title: "Home Delivery",
        desc: "Fresh traditional food products delivered directly to your doorstep. Perfect for busy households craving authentic taste.",
        color: "bg-blue-500",
    },
    {
        icon: Store,
        title: "Local Shop Supply",
        desc: "We supply our premium products to local grocery stores and supermarkets with reliable daily refills.",
        color: "bg-green-500",
    },
    {
        icon: Package,
        title: "Bulk & Office Orders",
        desc: "Catering to office lunches, group gatherings, and bulk distribution with customized packaging.",
        color: "bg-orange-500",
    },
    {
        icon: ChefHat,
        title: "Catering Supply",
        desc: "Supplying high-quality Pathiri, Idiyappam and more for events, weddings, and catering services.",
        color: "bg-purple-500",
    }
];

const Services = () => {
    return (
        <div className="pt-24 pb-20">
            {/* Header */}
            <section className="section-padding overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className="text-primary font-bold uppercase tracking-widest">Our Solutions</span>
                        <h1 className="text-5xl md:text-7xl font-playfair font-black dark:text-white leading-tight">
                            Beyond Just <br /> <span className="text-primary italic">Production.</span>
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400">
                            Eatsee Foods provides a comprehensive supply chain for traditional delicacies, ensuring freshness and quality from our kitchen to your table.
                        </p>
                        <div className="flex gap-4">
                            <button className="btn-primary">Get Service Quote</button>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="rounded-[4rem] overflow-hidden shadow-2xl scale-95 group-hover:scale-100 transition-transform duration-700">
                            <img src="/image/logo.jpeg" alt="Services" className="w-full aspect-square object-cover" />
                        </div>
                        {/* Overlay badge */}
                        <div className="absolute -bottom-6 left-6 bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-xl flex items-center gap-4 border border-gray-100 dark:border-zinc-800">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <Truck size={24} />
                            </div>
                            <div>
                                <p className="font-bold dark:text-white">Daily Supply</p>
                                <p className="text-xs text-gray-400">Trusted by 50+ retailers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding bg-zinc-50 dark:bg-black">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-zinc-900 p-12 rounded-[3rem] border border-gray-100 dark:border-zinc-800 shadow-sm"
                        >
                            <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl`}>
                                <service.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold dark:text-white mb-4">{service.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Map/Location Section */}
            <section className="section-padding">
                <div className="max-w-7xl mx-auto bg-primary text-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        {/* Abstract Map Background Simulation */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-playfair font-bold">Delivery Coverage</h2>
                            <p className="text-white/80 text-lg">
                                We are based in Omassery, Kerala, and provide reliable delivery services within a 50km radius, covering Kozhikode and surrounding areas.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: MapPin, text: "Omassery, Kozhikode, Kerala" },
                                    { icon: Clock, text: "Mon - Sat: 6:00 AM - 8:00 PM" },
                                    { icon: ShieldCheck, text: "Hygienic Temperature Controlled Supply" },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-center">
                                        <item.icon className="shrink-0 text-white/70" size={24} />
                                        <span className="font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-[3rem] border border-white/20 h-[400px] flex items-center justify-center">
                            <div className="text-center space-y-4 px-8">
                                <MapPin size={64} className="mx-auto text-white/50 animate-bounce" />
                                <p className="text-xl font-bold">Map Visualization Coming Soon</p>
                                <p className="text-sm text-white/60">Serving Omassery & Kozhikode with pride</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
