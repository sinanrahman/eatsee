import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const foods = [
    {
        id: 1,
        name: "Pathiri",
        tagline: "Ultra Thin & Soft",
        description: "Our signature Pathiri is crafted from the finest rice flour, steam-cooked to perfection. It's paper-thin, incredibly soft, and captures the true essence of Malabar heritage.",
        image: "/image/pathiri.jpeg",
        details: ["100% Rice Flour", "No Preservatives", "Handmade Feel"],
        themeColor: "#000000",
        accentColor: "#15803D",
        glow: "rgba(21, 128, 61, 0.25)"
    },
    {
        id: 2,
        name: "Idiyappam",
        tagline: "Delicate String Hoppers",
        description: "Delicate strands of rice dough, perfectly steamed to create a light and airy texture. A healthy breakfast staple that pairs beautifully with spicy curries or coconut milk.",
        image: "/image/idiyappam.jpeg",
        details: ["Traditional Steam", "Easy to Digest", "Pure Ingredients"],
        themeColor: "#050505",
        accentColor: "#22C55E",
        glow: "rgba(34, 197, 94, 0.25)"
    },
    {
        id: 3,
        name: "Vellappam",
        tagline: "Lacy & Fermented",
        description: "The classic Kerala Appam with a thick, fluffy center and crispy, lacy edges. Fermented traditionally for that subtle tangy flavor that melts in your mouth.",
        image: "/image/vellappam.jpeg",
        details: ["Natural Fermentation", "Crispy Edges", "Fluffy Center"],
        themeColor: "#080808",
        accentColor: "#166534",
        glow: "rgba(22, 101, 52, 0.25)"
    },
    {
        id: 4,
        name: "Chappathi",
        tagline: "Whole Wheat Goodness",
        description: "Soft, puffed Chappathis made from premium whole wheat. We ensure they stay fresh and soft for hours, providing a nutritious and homemade dining experience.",
        image: "/image/chappathy.jpg",
        details: ["Premium Wheat", "Zero Oil Option", "Long-lasting Softness"],
        themeColor: "#030303",
        accentColor: "#15803D",
        glow: "rgba(21, 128, 61, 0.25)"
    }
];

const FoodScrollShowcase = () => {
    const triggerRef = useRef(null);
    const gridRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const images = gsap.utils.toArray('.food-img-container');

            // Initial State setup
            images.forEach((img, i) => {
                if (i > 0) gsap.set(img, { opacity: 0, scale: 0.5, rotateY: -90, z: -1000 });
                else gsap.set(img, { opacity: 1, scale: 1, rotateY: 0, z: 0 });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: `+=${foods.length * 100}%`, // Reduced from 150% to be snappier
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });

            // Grid Parallax
            tl.to(gridRef.current, {
                rotateX: 45,
                y: -100,
                duration: foods.length,
                ease: "none"
            }, 0);

            foods.forEach((food, i) => {
                const startTime = i;

                // Progress Bar animation
                tl.to(`.progress-fill-${i}`, {
                    scaleY: 1,
                    duration: 1,
                    ease: "none"
                }, startTime);

                if (i < foods.length - 1) {
                    // Transition Out
                    tl.to(`.panel-left-${i}`, { x: -200, opacity: 0, duration: 1 }, startTime)
                        .to(`.panel-right-${i}`, { x: 200, opacity: 0, duration: 1 }, startTime)
                        .to(images[i], {
                            opacity: 0,
                            scale: 2,
                            rotateY: 90,
                            z: 500,
                            filter: "blur(20px)",
                            duration: 1
                        }, startTime);

                    // Background Color Morph
                    tl.to(triggerRef.current, {
                        backgroundColor: foods[i + 1].themeColor,
                        duration: 1
                    }, startTime);

                    // Transition In
                    tl.fromTo(`.panel-left-${i + 1}`,
                        { x: 200, opacity: 0 },
                        { x: 0, opacity: 1, duration: 1 },
                        startTime + 0.5
                    )
                        .fromTo(`.panel-right-${i + 1}`,
                            { x: -200, opacity: 0 },
                            { x: 0, opacity: 1, duration: 1 },
                            startTime + 0.5
                        )
                        .fromTo(images[i + 1],
                            { opacity: 0, scale: 0.5, rotateY: -90, z: -1000, filter: "blur(20px)" },
                            { opacity: 1, scale: 1, rotateY: 0, z: 0, filter: "blur(0px)", duration: 1 },
                            startTime + 0.5
                        );
                }
            });

            // Refresh ScrollTrigger to ensure correct positions
            ScrollTrigger.refresh();
        }, triggerRef);

        return () => {
            ctx.revert();
            // Kill all triggers to avoid memory leaks or layout shifts
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <div ref={triggerRef} className="relative min-h-screen bg-black overflow-hidden select-none" style={{ perspective: "2000px" }}>

            {/* 3D BACKGROUND GRID */}
            <div
                ref={gridRef}
                className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #15803D 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                    transform: 'rotateX(20deg) translateY(0)',
                    transformOrigin: 'top center'
                }}
            ></div>

            {/* FLOATING DECOR */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                <h2 className="text-[40vw] font-black uppercase tracking-tighter text-white">CRAFTED</h2>
            </div>

            <div className="max-w-[1600px] mx-auto h-screen flex flex-col md:flex-row items-center relative px-6 md:px-20 z-10">

                {/* CENTER IMAGE STAGE */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[700px] md:h-[700px] z-20">
                    <div style={{ transformStyle: "preserve-3d" }} className="w-full h-full relative">
                        {foods.map((food, i) => (
                            <div key={food.id} className="food-img-container absolute inset-0 will-change-transform">
                                <div className="relative w-full h-full p-6 md:p-12">
                                    {/* Dynamic Glow */}
                                    <div
                                        className="absolute inset-0 rounded-full blur-[120px] transform scale-125 transition-all duration-1000"
                                        style={{ backgroundColor: food.glow }}
                                    ></div>
                                    <img
                                        src={food.image}
                                        alt={food.name}
                                        className="w-full h-full object-cover rounded-full shadow-[0_0_100px_rgba(0,0,0,0.8)] border-[20px] border-zinc-900/80 relative z-10"
                                    />
                                    <div className="absolute -inset-4 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite] opacity-30"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CONTENT LAYERS */}
                <div className="flex flex-col md:grid md:grid-cols-2 w-full h-full z-10 relative">

                    {/* TEXT CONTENT: TOP/LEFT */}
                    <div className="relative h-1/2 md:h-full">
                        {foods.map((food, i) => (
                            <div
                                key={food.id}
                                className={`panel-left-${i} absolute inset-0 flex flex-col justify-end md:justify-center items-center md:items-start text-center md:text-left pb-32 md:pb-0 ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <span className="text-primary font-mono font-bold uppercase tracking-[0.5em] text-[10px] md:text-xs mb-6 px-4 py-1 border border-primary/20 bg-primary/5 rounded-full">
                                    Product_ID: 0{i + 1}
                                </span>
                                <h3 className="text-7xl md:text-[12rem] lg:text-[16rem] font-playfair font-black text-white leading-[0.7] tracking-tighter drop-shadow-2xl">
                                    {food.name}
                                </h3>
                                <p className="text-lg md:text-4xl italic text-zinc-500 font-playfair mt-8 md:mt-12 opacity-80">
                                    {food.tagline}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* DESCRIPTION CONTENT: BOTTOM/RIGHT */}
                    <div className="relative h-1/2 md:h-full flex justify-center md:justify-end">
                        {foods.map((food, i) => (
                            <div
                                key={food.id}
                                className={`panel-right-${i} absolute inset-0 md:w-3/4 flex flex-col justify-start md:justify-center items-center md:items-end text-center md:text-right pt-32 md:pt-0 ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <div className="space-y-8 md:space-y-12 px-4 md:px-0">
                                    <p className="text-lg md:text-2xl lg:text-3xl text-zinc-400 leading-relaxed max-w-xs md:max-w-lg ml-auto font-light">
                                        {food.description}
                                    </p>

                                    <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-5">
                                        {food.details.map((detail, idx) => (
                                            <span key={idx} className="px-5 py-2 bg-zinc-900/80 backdrop-blur-md text-[10px] md:text-sm text-zinc-300 font-mono rounded-md border border-zinc-800 tracking-wider">
                                                {detail}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-10 md:pt-16 flex justify-center md:justify-end">
                                        <button className="group relative px-16 py-6 bg-primary text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(21,128,61,0.3)]">
                                            <span className="relative z-10 flex items-center gap-4 text-lg">
                                                REQUEST_ORDER <div className="w-8 h-[2px] bg-white group-hover:w-12 transition-all"></div>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* 3D PROGRESS INDICATOR */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-12 z-40">
                {foods.map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                        <span className="text-[10px] font-mono font-bold text-zinc-600">0{i + 1}</span>
                        <div className="w-[2px] h-16 bg-zinc-900 rounded-full relative overflow-hidden">
                            <div className={`progress-fill-${i} absolute top-0 left-0 w-full h-full bg-primary transform origin-top scale-y-0`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FoodScrollShowcase;
