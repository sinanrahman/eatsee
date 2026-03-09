import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, MousePointer2 } from 'lucide-react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".hero-reveal", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out"
            })
                .from(".hero-sep", {
                    width: 0,
                    duration: 1,
                    ease: "power2.inOut"
                }, "-=0.8")
                .from(".hero-img-box", {
                    scale: 0.9,
                    opacity: 0,
                    duration: 1.5,
                    ease: "expo.out"
                }, "-=1");
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center bg-white dark:bg-black pt-20 overflow-hidden px-6">
            {/* Decorative center light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px] -z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto w-full text-center relative z-10 space-y-10">
                <div className="flex flex-col items-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-6 py-2 border border-primary/20 bg-primary/5 rounded-full text-primary font-bold uppercase tracking-[0.2em] text-xs hero-reveal"
                    >
                        Nadhira's Authentic Recipes
                    </motion.div>

                    <h1 className="text-6xl md:text-[140px] font-playfair font-black text-gray-900 dark:text-white leading-[0.85] tracking-tighter">
                        <span className="hero-reveal block">Eatsee</span>
                        <div className="flex items-center justify-center gap-4 hero-reveal">
                            <span className="hero-sep h-[3px] w-20 md:w-64 bg-primary hidden md:block"></span>
                            <span className="text-primary italic font-serif">Foods</span>
                            <span className="hero-sep h-[3px] w-20 md:w-64 bg-primary hidden md:block"></span>
                        </div>
                    </h1>
                </div>

                <div className="max-w-2xl mx-auto hero-reveal">
                    <p className="text-xl md:text-2xl text-gray-500 dark:text-zinc-400 font-light leading-relaxed">
                        Continuing the legacy of homemade taste. Authentic traditional flavors, crafted with hygiene and love in Omassery.
                    </p>
                </div>

                <div className="hero-reveal flex flex-col md:flex-row items-center justify-center gap-6 pt-6">
                    <Link to="/products" className="group relative px-12 py-5 bg-primary text-white font-bold rounded-2xl overflow-hidden transition-all shadow-2xl hover:shadow-primary/40">
                        <span className="relative z-10 flex items-center gap-3">
                            Explore Our Menu <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </Link>

                    <Link to="/order" className="px-12 py-5 border-2 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all">
                        Order Express Delivery
                    </Link>
                </div>

                {/* Floating Badges Visualization */}
                <div className="hero-img-box absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
                    <img src="/image/logo.png" alt="Background decoration" className="w-full h-full object-contain blur-md" />
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hero-reveal">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    <MousePointer2 size={14} className="animate-pulse" /> Scroll to Taste
                </div>
                <div className="w-[2px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
            </div>

            {/* Side info labels */}
            <div className="absolute top-1/2 left-10 -translate-y-1/2 -rotate-90 origin-left hidden lg:block text-[10px] font-black uppercase tracking-[1em] text-gray-300">
                Authentic • Homemade • Organic
            </div>
            <div className="absolute top-1/2 right-10 -translate-y-1/2 rotate-90 origin-right hidden lg:block text-[10px] font-black uppercase tracking-[1em] text-gray-300">
                Omassery • Kozhikode • Kerala
            </div>
        </section>
    );
};

export default Hero;
