import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Maximize2 } from 'lucide-react';

const galleryItems = [
    { id: 1, type: "Production", image: "/image/logo.png", title: "Traditional Kitchen" },
    { id: 2, type: "Food", image: "/image/pathiri.jpeg", title: "Freshly Made Pathiri" },
    { id: 3, type: "Food", image: "/image/idiyappam.jpeg", title: "Steaming Idiyappam" },
    { id: 4, type: "Food", image: "/image/vellappam.jpeg", title: "Crispy Vellappam" },
    { id: 5, type: "Food", image: "/image/chappathy.jpeg", title: "Soft Chappathi" },
    { id: 6, type: "Production", image: "/image/logo.png", title: "Quality Check" },
    { id: 7, type: "Delivery", image: "/image/logo.png", title: "Daily Dispatch" },
    { id: 8, type: "Food", image: "/image/logo.png", title: "Traditional Snacks" },
];

const categories = ["All", "Food", "Production", "Delivery"];

const Gallery = () => {
    const [filter, setFilter] = useState("All");
    const [selectedImage, setSelectedImage] = useState(null);

    const filteredItems = filter === "All"
        ? galleryItems
        : galleryItems.filter(item => item.type === filter);

    return (
        <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-dark-bg">
            <section className="section-padding">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">Visual Journey</span>
                        <h1 className="text-5xl md:text-7xl font-playfair font-black dark:text-white">Our Gallery</h1>
                    </div>

                    <div className="flex justify-center flex-wrap gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-8 py-2 rounded-full font-bold transition-all ${filter === cat
                                    ? 'bg-primary text-white scale-105'
                                    : 'bg-zinc-100 dark:bg-zinc-900 text-gray-500 hover:text-primary'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        <AnimatePresence>
                            {filteredItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4 }}
                                    className="group relative cursor-pointer aspect-square rounded-[2rem] overflow-hidden"
                                    onClick={() => setSelectedImage(item)}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-3">
                                        <Maximize2 size={32} />
                                        <p className="font-bold tracking-wide">{item.title}</p>
                                        <span className="text-xs uppercase bg-primary px-2 py-1 rounded">{item.type}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-6"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-10 right-10 text-white hover:text-primary transition-colors">
                            <X size={48} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="max-w-5xl w-full aspect-video md:aspect-auto max-h-[80vh] bg-zinc-900 rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex-1 overflow-hidden">
                                <img src={selectedImage.image} alt={selectedImage.title} className="w-full h-full object-contain md:object-cover" />
                            </div>
                            <div className="w-full md:w-80 p-12 flex flex-col justify-center gap-6 bg-zinc-900 text-white">
                                <span className="text-primary font-bold uppercase tracking-widest text-xs">{selectedImage.type}</span>
                                <h3 className="text-3xl font-playfair font-bold">{selectedImage.title}</h3>
                                <p className="text-gray-400 text-sm italic">
                                    Photographed at our Omassery production facility.
                                </p>
                                <div className="pt-6 border-t border-zinc-800">
                                    <button onClick={() => setSelectedImage(null)} className="w-full py-4 bg-white text-black font-bold rounded-xl active:scale-95 transition-all">
                                        Close View
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
