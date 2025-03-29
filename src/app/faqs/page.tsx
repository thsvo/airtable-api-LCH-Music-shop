'use client';

import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function FAQs() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useGSAP(() => {
        gsap.from('.faq-title', {
            y: -50,
            opacity: 0,
            duration: 1,
        });

        gsap.from('.faq-item', {
            x: -100,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
        });
    }, []);

    const faqs = [
        {
            question: "What types of music do you publish?",
            answer: "We publish a wide range of musical genres including classical, contemporary, jazz, and educational music."
        },
        {
            question: "How can I order sheet music?",
            answer: "You can order sheet music directly through our website or contact our sales team for bulk orders."
        },
        {
            question: "Do you offer digital downloads?",
            answer: "Yes, many of our publications are available as digital downloads in PDF format."
        },
        {
            question: "What is your return policy?",
            answer: "We accept returns within 30 days of purchase for items in original condition."
        }
    ];

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className="faq-title text-4xl font-bold mb-8">Frequently Asked Questions</h1>
            
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className="faq-item border rounded-lg overflow-hidden"
                    >
                        <button
                            className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100"
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                        >
                            <h3 className="text-xl font-semibold">{faq.question}</h3>
                        </button>
                        <div 
                            className={`p-4 bg-white transition-all duration-300 ${
                                activeIndex === index ? 'block' : 'hidden'
                            }`}
                        >
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}