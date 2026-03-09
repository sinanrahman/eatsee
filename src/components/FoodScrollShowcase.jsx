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
        themeColor: "#15803D",
        glow: "rgba(21, 128, 61, 0.15)"
    },
    {
        id: 2,
        name: "Idiyappam",
        tagline: "Delicate String Hoppers",
        description: "Delicate strands of rice dough, perfectly steamed to create a light and airy texture. A healthy breakfast staple that pairs beautifully with spicy curries or coconut milk.",
        image: "/image/idiyappam.jpeg",
        details: ["Traditional Steam", "Easy to Digest", "Pure Ingredients"],
        themeColor: "#15803D",
        glow: "rgba(34, 197, 94, 0.15)"
    },
    {
        id: 3,
        name: "Vellappam",
        tagline: "Lacy & Fermented",
        description: "The classic Kerala Appam with a thick, fluffy center and crispy, lacy edges. Fermented traditionally for that subtle tangy flavor that melts in your mouth.",
        image: "/image/vellappam.jpeg",
        details: ["Natural Fermentation", "Crispy Edges", "Fluffy Center"],
        themeColor: "#15803D",
        glow: "rgba(22, 101, 52, 0.15)"
    },
    {
        id: 4,
        name: "Chappathi",
        tagline: "Whole Wheat Goodness",
        description: "Soft, puffed Chappathis made from premium whole wheat. We ensure they stay fresh and soft for hours, providing a nutritious and homemade dining experience.",
        image: "/image/chappathy.jpg",
        details: ["Premium Wheat", "Zero Oil Option", "Long-lasting Softness"],
        themeColor: "#15803D",
        glow: "rgba(21, 128, 61, 0.15)"
    }
];

const FoodScrollShowcase = () => {
    const containerRef = useRef(null);
    const triggerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const images = gsap.utils.toArray('.food-img-container');

            // Fix the images in the center with 3D perspective
            images.forEach((img, i) => {
                if (i > 0) gsap.set(img, {
                    opacity: 0,
                    scale: 0.8,
                    rotateY: -45,
                    rotateX: 10,
                    z: -500,
                    force3D: true
                });
                else gsap.set(img, {
                    rotateY: 0,
                    rotateX: 0,
                    z: 0,
                    force3D: true
                });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: `+=${foods.length * 80}%`, // Reduced scroll length for less intensity
                    pin: true,
                    scrub: 0.8, // Faster, more responsive follow
                    anticipatePin: 1,
                    fastScrollEnd: true,
                    preventOverlays: true
                }
            });

            foods.forEach((_, i) => {
                if (i < foods.length - 1) {
                    // Transition Out with 3D rotate
                    tl.to(`.panel-left-${i}`, { x: -100, opacity: 0, duration: 1, force3D: true }, `step-${i}`)
                        .to(`.panel-right-${i}`, { x: 100, opacity: 0, duration: 1, force3D: true }, `step-${i}`)
                        .to(images[i], {
                            opacity: 0,
                            scale: 1.2,
                            rotateY: 45,
                            rotateX: -10,
                            z: 200,
                            duration: 1,
                            force3D: true
                        }, `step-${i}`)

                    // Transition In with 3D rotate
                    tl.fromTo(`.panel-left-${i + 1}`, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, force3D: true }, `step-${i}+=0.1`)
                        .fromTo(`.panel-right-${i + 1}`, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, force3D: true }, `step-${i}+=0.1`)
                        .fromTo(images[i + 1],
                            { opacity: 0, scale: 0.8, rotateY: -45, rotateX: 10, z: -200 },
                            { opacity: 1, scale: 1, rotateY: 0, rotateX: 0, z: 0, duration: 1, force3D: true },
                            `step-${i}+=0.1`
                        );
                }
            });

        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={triggerRef} className="relative min-h-screen bg-white dark:bg-black overflow-hidden select-none" style={{ perspective: "2000px" }}>
            {/* Background Decorative Element */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <h2 className="text-[30vw] font-black uppercase tracking-tighter">EATSEE</h2>
            </div>

            <div className="max-w-[1600px] mx-auto h-screen flex flex-col md:flex-row items-center relative px-6 md:px-20">

                {/* CENTER IMAGE STAGE */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] z-20">
                    {foods.map((food, i) => (
                        <div key={food.id} className="food-img-container absolute inset-0 will-change-transform will-change-opacity">
                            <div className="relative w-full h-full p-4 md:p-8">
                                {/* Glow Effect */}
                                <div
                                    className="absolute inset-0 rounded-full blur-[100px] transform scale-150 transition-colors duration-1000"
                                    style={{ backgroundColor: food.glow }}
                                ></div>
                                <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-full object-cover rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] border-[12px] border-zinc-900/50 relative z-10"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* CONTENT LAYERS */}
                <div className="flex flex-col md:grid md:grid-cols-2 w-full h-full z-10 relative">

                    {/* TOP/LEFT SIDE: Name & Tagline */}
                    <div className="relative h-1/2 md:h-full">
                        {foods.map((food, i) => (
                            <div
                                key={food.id}
                                className={`panel-left-${i} absolute inset-0 flex flex-col justify-end md:justify-center items-center md:items-start text-center md:text-left pb-32 md:pb-0 will-change-transform will-change-opacity ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <span className="text-primary font-mono font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 md:mb-6">
                                    Product 0{i + 1} // Signature
                                </span>
                                <h3 className="text-6xl md:text-[10rem] lg:text-[14rem] font-playfair font-black text-gray-900 dark:text-white leading-[0.8] tracking-tighter">
                                    {food.name}
                                </h3>
                                <p className="text-sm md:text-3xl italic text-gray-400 dark:text-zinc-500 font-playfair mt-4 md:mt-6">
                                    {food.tagline}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* BOTTOM/RIGHT SIDE: Description & Details */}
                    <div className="relative h-1/2 md:h-full flex justify-center md:justify-end">
                        {foods.map((food, i) => (
                            <div
                                key={food.id}
                                className={`panel-right-${i} absolute inset-0 md:w-3/4 flex flex-col justify-start md:justify-center items-center md:items-end text-center md:text-right pt-32 md:pt-0 will-change-transform will-change-opacity ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <div className="space-y-6 md:space-y-10 px-4 md:px-0">
                                    <p className="text-sm md:text-xl lg:text-2xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs md:max-w-md ml-auto font-light">
                                        {food.description}
                                    </p>

                                    <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-4">
                                        {food.details.map((detail, idx) => (
                                            <span key={idx} className="px-4 py-1.5 bg-zinc-900 text-[10px] md:text-xs text-gray-400 font-mono rounded-full border border-zinc-800">
                                                {detail}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-8 md:pt-12 flex justify-center md:justify-end">
                                        <button className="group relative px-12 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
                                            <span className="relative z-10 flex items-center gap-3">
                                                Add to Bag <span className="text-primary">/ Explore</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* PROGRESS INDICATOR */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8 z-30">
                {foods.map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-300">0{i + 1}</span>
                        <div className="w-1 h-12 bg-gray-100 dark:bg-zinc-800 rounded-full relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-primary transform origin-top scale-y-0 transition-transform duration-300"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FoodScrollShowcase;
