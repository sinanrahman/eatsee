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
                        className="px-4 py-1.5 border border-primary/20 bg-primary/5 rounded-md text-primary font-mono text-[10px] tracking-widest uppercase hero-reveal"
                    >
                        Nadhira's Authentic Recipes // 2026 Edition
                    </motion.div>

                    <h1 className="text-7xl md:text-[16rem] lg:text-[20rem] font-playfair font-black text-white leading-[0.75] tracking-tighter">
                        <span className="hero-reveal block">Eatsee.</span>
                        <div className="flex items-center justify-center gap-6 hero-reveal">
                            <span className="text-primary italic font-serif">Foods</span>
                        </div>
                    </h1>
                </div>

                <div className="max-w-2xl mx-auto hero-reveal">
                    <p className="text-xl md:text-2xl text-gray-500 dark:text-zinc-400 font-light leading-relaxed">
                        Continuing the legacy of homemade taste. Authentic traditional flavors, crafted with hygiene and love in Omassery.
                    </p>
                </div>

                <div className="hero-reveal flex flex-col md:flex-row items-center justify-center gap-4 pt-10">
                    <Link to="/products" className="group px-12 py-5 bg-white text-black font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3">
                        Shop Collection <span className="font-mono text-xs opacity-50">[01-07]</span>
                    </Link>

                    <Link to="/order" className="px-12 py-5 border border-zinc-800 text-white font-mono text-xs tracking-widest rounded-full hover:bg-zinc-900 transition-all flex items-center gap-3">
                        Express Delivery <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Floating Badges Visualization */}
                <div className="hero-img-box absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
                    <img src="/image/logo.png" alt="Background decoration" className="w-full h-full object-contain blur-md" />
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hero-reveal">
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em]">
                    Scroll to Taste
                </div>
                <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent opacity-20"></div>
            </div>

            {/* Side info labels */}
            <div className="absolute top-1/2 left-10 -translate-y-1/2 -rotate-90 origin-left hidden lg:block text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600">
                01. Authentic — Homemade — Organic
            </div>
            <div className="absolute top-1/2 right-10 -translate-y-1/2 rotate-90 origin-right hidden lg:block text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600">
                02. Omassery — Kozhikode — Kerala
            </div>
        </section>
    );
};

export default Hero;
