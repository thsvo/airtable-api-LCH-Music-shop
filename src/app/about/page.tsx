'use client';

import Header from '@/components/Header';
import Image from 'next/image';

export default function About() {
    return (
        <div className="bg-white text-gray-800 min-h-screen">
            <Header records={[]} />

            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900"> LCH Music</h1>
                        <p className="text-gray-700 leading-relaxed italic">
                            founded in 2017 by award-winning composer and arranger L. C. Harnsberger, is a premier music company specializing in crafting high-quality arrangements and original compositions for band, orchestra, voice, and solo and ensemble performance music. With a distinct focus on expanding the repertoire for the French horn, LCH Music also offers a diverse range of compositions and arrangements tailored to various ensembles and musical contexts.
                        </p>
                        <div className="pt-4">
                            <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded">
                                Shop
                            </button>
                        </div>
                    </div>

                    <div className="relative h-[300px] md:h-[400px] shadow-lg rounded-md overflow-hidden ">
                        <Image
                            src="https://cdn.codeopx.com/music.jpg"
                            alt="Our Team"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Get In Touch Section */}
            <div className="container mx-auto px-4 py-12 md:py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-8 space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900"> L. C. Harnsberger</h2>
                            <p className="text-gray-700 leading-relaxed italic">
                            is a distinguished composer, author, and arranger. Graduating with a degree in Music Composition from the University of Southern California under the guidance of mentors such as Morten Lauridsen and William A. Schaefer, Harnsberger has continually pushed the boundaries of musical expression. With a passion for the French horn, Harnsberger has been dedicated to expanding its repertoire through original compositions and arrangements. His works, spanning across various musical genres and ensembles, have received international acclaim and have been selected for awards such as the 2024 Call for Scores for the Student Symphony Orchestra of USC, and the Editor's Choice award by J. W. Pepper. In addition to his compositional talents, Harnsberger has authored best-selling reference and method books, many of which have been translated into numerous languages.                             </p>

                           

                         
                        </div>

                        <div className="bg-blue-50 p-8 flex flex-col justify-center">
                            <div className="mb-6">
                            <div className="relative h-[300px] md:h-[400px] shadow-lg rounded-md overflow-hidden">
                        <Image
                            src="/1.jpg"
                            alt="Our Team"
                            fill
                            className="object-cover"
                        />
                    </div>
                            </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}