'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Quote, BookOpen, Award, GraduationCap } from "lucide-react";
import Header from '@/components/Header';

export default function About() {
    return (
        <div className="bg-white text-gray-800 min-h-screen">
            <Header records={[]} />
            
            <div className="bg-[#237cd3] text-white py-16">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                    <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white mb-6 md:mb-0 md:mr-8">
                        <Image 
                            src="/2.jpg" 
                            alt="Composer Portrait" 
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold mb-2">L. C. Harnsberger</h1>
                        <p className="text-xl text-blue-100 mb-4">Composer & Music Educator</p>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <GraduationCap className="h-5 w-5 mr-2" />
                                <span>B.M. Music Composition, USC Thornton School of Music</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Sidebar */}
                    <div className="md:col-span-1 space-y-6">
                        <Card className="overflow-hidden">
                            <div className="bg-[#237cd3] text-white py-3 px-4">
                                <h2 className="text-xl font-semibold flex items-center">
                                    <BookOpen className="h-5 w-5 mr-2" />
                                    Areas of Expertise
                                </h2>
                            </div>
                            <CardContent className="pt-4">
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                                        Film Composition
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                                        Opera Composition
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                                        Concert Music
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                                        Music Publishing
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                                        Instructional Method Books
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden">
                            <div className="bg-[#237cd3] text-white py-3 px-4">
                                <h2 className="text-xl font-semibold flex items-center">
                                    <Award className="h-5 w-5 mr-2" />
                                    Achievements
                                </h2>
                            </div>
                            <CardContent className="pt-4">
                                <ul className="space-y-3">
                                    <li className="border-b border-gray-100 pb-2">
                                        <p className="font-medium">Opera "Golondrina"</p>
                                        <p className="text-sm text-gray-600">Multiple performances in California</p>
                                    </li>
                                    <li className="border-b border-gray-100 pb-2">
                                        <p className="font-medium">Film Scores</p>
                                        <p className="text-sm text-gray-600">Three scores performed live with full orchestra</p>
                                    </li>
                                    <li>
                                        <p className="font-medium">Published Works</p>
                                        <p className="text-sm text-gray-600">Translated into multiple languages including German and Korean</p>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-2 space-y-8">
                        <Card>
                            <div className="bg-[#237cd3] text-white py-3 px-4">
                                <h2 className="text-xl font-semibold">Biography</h2>
                            </div>
                            <CardContent className="pt-6">
                                <p className="text-gray-700 mb-4">
                                    I started playing piano and double bass at an early age, and I was writing large-scale pieces in high school. After graduating from the USC Thornton School of Music, I wrote for films and commercials while also writing concert music.
                                </p>
                                <p className="text-gray-700 mb-4">
                                    I then wrote school performance music and instructional method books while working in music publishing for over 20 years. I've now returned to my roots of writing for film, commercials, concert music, and opera.
                                </p>
                                <p className="text-gray-700">
                                    L. C. Harnsberger is an accomplished composer, author, and arranger. He received his B.M. in Music Composition from the University of Southern California where he studied with internationally respected composers and arrangers including Morton Lauridsen, Stephen Hartke, and William A. Schaefer.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Testimonial */}
                        <div className="bg-gray-50 p-6 rounded-lg relative shadow-sm border border-gray-100">
                            <Quote className="absolute text-blue-100 h-12 w-12 -top-4 -left-4" />
                            <blockquote className="pl-4 italic text-gray-600">
                                "When I comissioned the opera [Golondrina], I had no idea L. C. would write an opera that would hold its own next to Puccini and Verdi. I've produced it twice in the last three years!"
                            </blockquote>
                            <div className="mt-4 text-right">
                                <p className="text-gray-700">Alan Medak,</p>
                                <p className="text-sm text-gray-500">Director of the Vineyard Touring Opera Company</p>
                            </div>
                        </div>

                        {/* Academic Tabs */}
                        <Tabs defaultValue="research" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-blue-50">
                                <TabsTrigger value="research">Research</TabsTrigger>
                                <TabsTrigger value="teaching">Teaching</TabsTrigger>
                                <TabsTrigger value="publications">Publications</TabsTrigger>
                            </TabsList>
                            <TabsContent value="research" className="bg-white p-6 rounded-lg mt-2 shadow-sm border border-gray-100">
                                <p className="text-gray-700">
                                    Mr. Harnsberger has written and arranged for wind ensembles, orchestras, chamber ensembles, solo instrumentalists, and singers. His orchestral and band works have been performed across the United States and abroad and his first opera "Golondrina" has been performed multiple times in California.
                                </p>
                            </TabsContent>
                            <TabsContent value="teaching" className="bg-white p-6 rounded-lg mt-2 shadow-sm border border-gray-100">
                                <p className="text-gray-700">
                                    With over two decades of experience in music education, Mr. Harnsberger has developed instructional method books that are used in educational institutions across the country. His teaching philosophy emphasizes both technical proficiency and creative expression.
                                </p>
                            </TabsContent>
                            <TabsContent value="publications" className="bg-white p-6 rounded-lg mt-2 shadow-sm border border-gray-100">
                                <p className="text-gray-700">
                                    His published works include best-selling music for band, full orchestra, solo piano, chorus, reference books, and method books, with some translated into multiple languages including German, and Korean. He is currently working on a new opera to be performed in 2023.
                                </p>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}