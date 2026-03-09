import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Order from './pages/Order'
import Testimonials from './pages/Testimonials'
import WhatsAppButton from './components/WhatsAppButton'

gsap.registerPlugin(ScrollTrigger);

function App() {
    const location = useLocation();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);

        const updateLenis = (time) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(updateLenis);
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-white relative">
            <CustomCursor />
            {/* Universal 3D Decor */}
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, 0],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[15%] left-[5%] text-primary/20"
                >
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                    </svg>
                </motion.div>
                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        rotate: [0, -15, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[20%] right-[10%] text-primary/10"
                >
                    <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                    </svg>
                </motion.div>
            </div>

            <Navbar />
            <main className="relative z-10">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    )
}

export default App
