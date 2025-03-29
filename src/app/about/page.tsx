'use client';

import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function About() {
    useGSAP(() => {
        const tl = gsap.timeline();
        
        tl.from('.page-title', {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.content-section', {
            y: 50,
            opacity: 0,
            stagger: 0.3,
            duration: 0.8,
            ease: 'power2.out'
        });
    }, []);

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="page-title text-4xl font-bold mb-8">About Us</h1>
            
            <div className="content-section mb-8">
                <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                <p className="text-gray-600">
                    Founded in [year], we have been at the forefront of musical excellence, 
                    providing quality sheet music and educational resources to musicians worldwide.
                </p>
            </div>

            <div className="content-section mb-8">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-600">
                    We are dedicated to enriching the musical community by providing access to 
                    high-quality sheet music and fostering creativity through music education.
                </p>
            </div>

            <div className="content-section">
                <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                <ul className="list-disc list-inside text-gray-600">
                    <li>Excellence in Music Education</li>
                    <li>Supporting Artists and Composers</li>
                    <li>Innovation in Music Publishing</li>
                    <li>Community Engagement</li>
                </ul>
            </div>
        </div>
    );
}