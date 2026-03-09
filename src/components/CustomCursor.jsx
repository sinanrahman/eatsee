import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const moveMouse = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power3.out"
            });
        };

        const handleHover = (e) => {
            if (e.target.closest('a') || e.target.closest('button')) {
                gsap.to(follower, {
                    scale: 3,
                    backgroundColor: "rgba(21, 128, 61, 0.2)",
                    duration: 0.3
                });
            } else {
                gsap.to(follower, {
                    scale: 1,
                    backgroundColor: "transparent",
                    duration: 0.3
                });
            }
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleHover);
        };
    }, []);

    return (
        <div className="hidden lg:block">
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border border-primary rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out backdrop-blur-[1px]"
            />
        </div>
    );
};

export default CustomCursor;
