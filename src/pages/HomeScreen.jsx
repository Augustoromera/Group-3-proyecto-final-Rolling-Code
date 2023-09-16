import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import BodyHome from '../components/BodyHome';
import { Footer } from '../components/Footer';

export const HomeScreen = () => {
    const [navBarClass, setNavBarClass] = useState('');
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const scrollThreshold = 0.3;

            if (scrollY > windowHeight * scrollThreshold) {
                setNavBarClass("none-class");
            } else {
                setNavBarClass("inline-block-class");
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div>
            <Header navBarClass={navBarClass} />
            <BodyHome />
            <Footer />
        </div>
    );

}
