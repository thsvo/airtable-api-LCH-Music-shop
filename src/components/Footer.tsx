"use client";
import React from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Footer() {
    useGSAP(() => {
        gsap.from('.footer-content', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.footer-link', {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out'
        });
    }, []);

    return (
        <footer className="bg-gray-900 text-white py-12 ">
            <div className="container mx-auto px-4 footer-content">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    <Link href="/about" className="footer-link hover:text-blue-400 transition-colors">
                        About
                    </Link>
                    <Link href="/contact" className="footer-link hover:text-blue-400 transition-colors">
                        Contact Us
                    </Link>
                    <Link href="/news" className="footer-link hover:text-blue-400 transition-colors">
                        News
                    </Link>
                    <Link href="/faqs" className="footer-link hover:text-blue-400 transition-colors">
                        FAQs
                    </Link>
                    <Link href="/submissions" className="footer-link hover:text-blue-400 transition-colors">
                        Music Submissions
                    </Link>
                    <Link href="/dealers" className="footer-link hover:text-blue-400 transition-colors">
                        Dealers
                    </Link>
                </div>
                <div className="mt-8 text-center text-gray-400 footer-link">
                    © {new Date().getFullYear()} Your Company Name. All rights reserved.
                </div>
            </div>
        </footer>
    );
}