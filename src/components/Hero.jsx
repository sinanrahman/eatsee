import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MoveUpRight } from 'lucide-react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

const floatingImages = [
    { url: "/image/pathiri.jpeg", x: -25, y: -20, z: 100, rotate: -15, size: 300 },
    { url: "/image/idiyappam.jpeg", x: 25, y: 15, z: 150, rotate: 10, size: 250 },
    { url: "/image/vellappam.jpeg", x: -20, y: 25, z: 80, rotate: 5, size: 280 },
    { url: "/image/chappathy.jpg", x: 30, y: -25, z: 120, rotate: -10, size: 220 },
];

const Hero = () => {
    const containerRef = useRef(null);
    const stageRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Initial Entrance
            gsap.from(".hero-reveal", {
                y: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: "power4.out"
            });

            gsap.from(".floating-item", {
                scale: 0,
                opacity: 0,
                duration: 2,
                stagger: 0.2,
                ease: "expo.out",
                delay: 0.5
            });

            // Mouse Move Parallax
            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5) * 2;
                const yPos = (clientY / window.innerHeight - 0.5) * 2;

                gsap.to(stageRef.current, {
                    rotateY: xPos * 15,
                    rotateX: -yPos * 15,
                    duration: 1.2,
                    ease: "power2.out"
                });

                gsap.to(".floating-item", {
                    x: (i) => xPos * (50 + i * 20),
                    y: (i) => yPos * (50 + i * 20),
                    duration: 1.5,
                    ease: "power3.out",
                    stagger: 0.02
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[110vh] flex flex-col justify-center items-center bg-black pt-20 overflow-hidden px-6 select-none">
            {/* 3D STAGE */}
            <div
                ref={stageRef}
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
            >
                {floatingImages.map((img, i) => (
                    <div
                        key={i}
                        className="floating-item absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                            left: `${50 + img.x}%`,
                            top: `${50 + img.y}%`,
                            transform: `translateZ(${img.z}px) rotate(${img.rotate}deg)`,
                            width: `${img.size}px`,
                            height: `${img.size}px`
                        }}
                    >
                        <div className="relative w-full h-full group">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] group-hover:bg-primary/40 transition-colors duration-700"></div>
                            <img
                                src={img.url}
                                alt="Food Item"
                                className="w-full h-full object-cover rounded-full border-[8px] border-zinc-900 shadow-2xl transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* CONTENT LAYER */}
            <div className="max-w-7xl mx-auto w-full text-center relative z-10 space-y-12">
                <div className="flex flex-col items-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-5 py-2 border border-zinc-800 bg-zinc-900/50 backdrop-blur-md rounded-full text-primary font-mono text-[10px] tracking-[0.4em] uppercase hero-reveal"
                    >
                        Authentic Malabar Heritage // Est. 1994
                    </motion.div>

                    <h1 className="text-8xl md:text-[18rem] lg:text-[24rem] font-playfair font-black text-white leading-[0.7] tracking-tighter relative">
                        <span className="hero-reveal block mix-blend-difference">EATSEE.</span>
                        <div className="flex items-center justify-center gap-8 hero-reveal mt-4 md:-mt-8">
                            <span className="text-primary italic font-serif text-5xl md:text-9xl drop-shadow-[0_0_30px_rgba(21,128,61,0.5)]">Foods</span>
                        </div>
                    </h1>
                </div>

                <div className="max-w-xl mx-auto hero-reveal">
                    <p className="text-lg md:text-xl text-zinc-400 font-mono tracking-tight leading-relaxed uppercase opacity-60">
                        Crafting the future of traditional taste through immersive culinary excellence.
                    </p>
                </div>

                <div className="hero-reveal flex flex-col md:flex-row items-center justify-center gap-6 pt-10">
                    <Link
                        to="/products"
                        className="group px-14 py-6 bg-white text-black font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)] flex items-center gap-4"
                    >
                        EXPLORE_COLLECTION <MoveUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>

                    <Link
                        to="/order"
                        className="px-14 py-6 border border-zinc-800 text-zinc-400 font-mono text-xs tracking-[0.3em] rounded-full hover:bg-zinc-900 hover:text-white transition-all"
                    >
                        [ VIEW_SERVICES ]
                    </Link>
                </div>
            </div>

            {/* BOTTOM DECORATION */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 hero-reveal">
                <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.5em] animate-pulse">
                    Initiating Sensory Experience
                </div>
                <div className="w-[1px] h-32 bg-gradient-to-b from-primary via-zinc-800 to-transparent"></div>
            </div>

            {/* SIDE METADATA */}
            <div className="absolute top-1/2 left-12 -translate-y-1/2 -rotate-90 origin-left hidden xl:flex items-center gap-8 text-[9px] font-mono uppercase tracking-[0.4em] text-zinc-700">
                <span className="text-primary">01.</span> PRESERVING_TRADITION
                <div className="w-12 h-[1px] bg-zinc-800"></div>
                HOMEMADE_QUALITY
            </div>

            <div className="absolute top-1/2 right-12 -translate-y-1/2 rotate-90 origin-right hidden xl:flex items-center gap-8 text-[9px] font-mono uppercase tracking-[0.4em] text-zinc-700">
                <span className="text-primary">02.</span> OMASSARY_FACILITY
                <div className="w-12 h-[1px] bg-zinc-800"></div>
                READY_FOR_DISPATCH
            </div>
        </section>
    );
};

export default Hero;
