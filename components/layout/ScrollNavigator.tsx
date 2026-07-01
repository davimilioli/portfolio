'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const ROUTES = ['/', '/about', '/skills', '/projects', '/contact'];

export default function ScrollNavigator() {
    const router = useRouter();
    const pathname = usePathname();
    const cooldownRef = useRef(false);

    useEffect(() => {
        let startY = 0;

        const triggerNavigation = (targetRoute: string) => {
            if (cooldownRef.current) return;
            cooldownRef.current = true;
            router.push(targetRoute);
            
            setTimeout(() => {
                cooldownRef.current = false;
            }, 1200);
        };

        const handleWheel = (e: WheelEvent) => {
            if (cooldownRef.current) return;

            const currentIndex = ROUTES.indexOf(pathname);
            if (currentIndex === -1) return;

            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 15;
            const isAtTop = window.scrollY <= 15;

            if (e.deltaY > 50 && isAtBottom && currentIndex < ROUTES.length - 1) {
                triggerNavigation(ROUTES[currentIndex + 1]);
            } else if (e.deltaY < -50 && isAtTop && currentIndex > 0) {
                triggerNavigation(ROUTES[currentIndex - 1]);
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            startY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (cooldownRef.current) return;

            const currentIndex = ROUTES.indexOf(pathname);
            if (currentIndex === -1) return;

            const endY = e.changedTouches[0].clientY;
            const diffY = startY - endY;

            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 15;
            const isAtTop = window.scrollY <= 15;

            if (diffY > 80 && isAtBottom && currentIndex < ROUTES.length - 1) {
                triggerNavigation(ROUTES[currentIndex + 1]);
            } else if (diffY < -80 && isAtTop && currentIndex > 0) {
                triggerNavigation(ROUTES[currentIndex - 1]);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [pathname, router]);

    return null;
}
