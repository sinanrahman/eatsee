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
        themeColor: "#15803D"
    },
    {
        id: 2,
        name: "Idiyappam",
        tagline: "Delicate String Hoppers",
        description: "Delicate strands of rice dough, perfectly steamed to create a light and airy texture. A healthy breakfast staple that pairs beautifully with spicy curries or coconut milk.",
        image: "/image/idiyappam.jpeg",
        details: ["Traditional Steam", "Easy to Digest", "Pure Ingredients"],
        themeColor: "#15803D"
    },
    {
        id: 3,
        name: "Vellappam",
        tagline: "Lacy & Fermented",
        description: "The classic Kerala Appam with a thick, fluffy center and crispy, lacy edges. Fermented traditionally for that subtle tangy flavor that melts in your mouth.",
        image: "/image/vellappam.jpeg",
        details: ["Natural Fermentation", "Crispy Edges", "Fluffy Center"],
        themeColor: "#15803D"
    },
    {
        id: 4,
        name: "Chappathi",
        tagline: "Whole Wheat Goodness",
        description: "Soft, puffed Chappathis made from premium whole wheat. We ensure they stay fresh and soft for hours, providing a nutritious and homemade dining experience.",
        image: "/image/chappathy.jpg",
        details: ["Premium Wheat", "Zero Oil Option", "Long-lasting Softness"],
        themeColor: "#15803D"
    }
];

const FoodScrollShowcase = () => {
    const containerRef = useRef(null);
    const triggerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const panels = gsap.utils.toArray('.food-panel');
            const images = gsap.utils.toArray('.food-img-container');

            // Fix the images in the center
            images.forEach((img, i) => {
                if (i > 0) gsap.set(img, { opacity: 0, scale: 0.8, rotate: -10, force3D: true });
                else gsap.set(img, { force3D: true });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: `+=${foods.length * 100}%`,
                    pin: true,
                    scrub: 1, // Slightly less aggressive scrub for smoothness
                    anticipatePin: 1,
                    fastScrollEnd: true,
                    preventOverlays: true
                }
            });

            foods.forEach((_, i) => {
                if (i < foods.length - 1) {
                    // Transition Out
                    tl.to(`.panel-left-${i}`, { y: -50, opacity: 0, duration: 1, force3D: true }, `step-${i}`)
                        .to(`.panel-right-${i}`, { y: 50, opacity: 0, duration: 1, force3D: true }, `step-${i}`)
                        .to(images[i], { opacity: 0, scale: 1.1, rotate: 5, duration: 1, force3D: true }, `step-${i}`)

                    // Transition In
                    tl.fromTo(`.panel-left-${i + 1}`, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, force3D: true }, `step-${i}+=0.1`)
                        .fromTo(`.panel-right-${i + 1}`, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, force3D: true }, `step-${i}+=0.1`)
                        .fromTo(images[i + 1], { opacity: 0, scale: 0.9, rotate: -5 }, { opacity: 1, scale: 1, rotate: 0, duration: 1, force3D: true }, `step-${i}+=0.1`);
                }
            });

        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={triggerRef} className="relative min-h-screen bg-white dark:bg-black overflow-hidden select-none">
            {/* Background Decorative Element */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <h2 className="text-[30vw] font-black uppercase tracking-tighter">EATSEE</h2>
            </div>

            <div className="max-w-[1600px] mx-auto h-screen flex flex-col md:flex-row items-center relative px-6 md:px-20">

                {/* CENTER IMAGE STAGE */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[450px] md:h-[450px] z-20">
                    {foods.map((food, i) => (
                        <div key={food.id} className="food-img-container absolute inset-0 will-change-transform opacity-100">
                            <div className="relative w-full h-full p-2 md:p-4">
                                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl transform scale-110"></div>
                                <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-full object-cover rounded-full shadow-2xl border-4 md:border-8 border-white dark:border-zinc-900 relative z-10"
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
                                <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] md:text-sm mb-2 md:mb-4">
                                    Signature Item 0{i + 1}
                                </span>
                                <h3 className="text-4xl md:text-8xl lg:text-9xl font-playfair font-black text-gray-900 dark:text-white leading-tight">
                                    {food.name}
                                </h3>
                                <p className="text-sm md:text-2xl italic text-gray-400 dark:text-zinc-600 font-playfair mt-1 md:mt-2">
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
                                <div className="space-y-4 md:space-y-6 px-4 md:px-0">
                                    <p className="text-xs md:text-lg lg:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs md:max-w-md ml-auto font-light">
                                        {food.description}
                                    </p>

                                    <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-3">
                                        {food.details.map((detail, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-zinc-50 dark:bg-zinc-900/50 text-[8px] md:text-xs text-gray-400 rounded-full border border-gray-100 dark:border-zinc-800">
                                                {detail}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-4 md:pt-8 flex justify-center md:justify-end">
                                        <button className="px-6 py-3 md:px-10 md:py-4 bg-primary text-white text-xs md:text-base font-bold rounded-xl md:rounded-2xl transition-all active:scale-95 shadow-lg">
                                            Explore {food.name}
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
