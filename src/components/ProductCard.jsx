import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-zinc-800"
        >
            <div className="aspect-[4/5] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <button className="w-full py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <ShoppingBag size={18} /> Add to Order
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold dark:text-white group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-md uppercase">
                        {product.category || 'Traditional'}
                    </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                    {product.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-zinc-800">
                    <span className="text-gray-400 text-xs italic">Available in Omassery</span>
                    <button className="text-primary font-bold text-sm flex items-center gap-1 group/btn">
                        View Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
