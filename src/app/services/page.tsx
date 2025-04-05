import Header from "@/components/Header";
import Link from "next/link";

export default function Services() {
    return (
        <div>
            <div className="bg-white text-gray-800 min-h-screen">
                <Header records={[]} />
                
                {/* Services Hero Section */}
                <div className="bg-gray-100 py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">My Services</h1>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-4xl mx-auto">
                            {["Composing", "Arranging", "Orchestration", "Film Scoring", 
                              "Commercial Scores", "Book Publishing Services", "Video Production", "Minus-One Tracks"].map((service, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <p className="font-medium">{service}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
                                Contact us for rates and availability
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Versatility Section */}
                <div className="py-16 container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-600 pb-2 inline-block">Versatility</h2>
                        <p className="text-lg mb-12">
                            Whether a producer wants a certain style, or an artist needs a bold song cycle, I listen to their needs and create music in line with their vision.
                        </p>
                    </div>
                </div>

                {/* Film Scores Section */}
                <div className="bg-gray-50 py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-600 pb-2 inline-block">Film Scores</h2>
                            <p className="text-lg mb-12">
                                Over 20 years of experience writing, arranging, and orchestrating music for films, stage, and commercials.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Services Details */}
                <div className="py-16 container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold mb-4 text-blue-700">Composer</h3>
                                <p className="text-gray-700">
                                    Having composed large- and small-scale works in virtually every genre, I can comfortably create scores for films, and commercials in every style. From opera to punk, and solo guitar to massive orchestra with chorus and huge percussion section, I can make any ensemble work with every mood you need.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold mb-4 text-blue-700">Arranger</h3>
                                <p className="text-gray-700">
                                    Whether arranging popular songs for orchestra, creating sing-along tracks, or making Tchaikovsky's violin concerto sound great on calliope, I can make it work. Large or small ensembles, computer MIDI arrangements, or fully produced recordings.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold mb-4 text-blue-700">Orchestrator</h3>
                                <p className="text-gray-700">
                                    Send me your MIDI files and I can create fully orchestrated versions of your music. I can also work from printed scores and audio recordings.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold mb-4 text-blue-700">Copyist</h3>
                                <p className="text-gray-700">
                                    Scores, parts and lead sheets. I will transform your printed, MIDI, or handwritten scores into high-quality engravings in Finale notation program.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Opera Section */}
                <div className="bg-gray-50 py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-600 pb-2 inline-block">Opera</h2>
                            
                            <div className="bg-white p-8 rounded-lg shadow-md mb-12">
                                <h3 className="text-2xl font-bold mb-4 text-blue-700">"Golondrina"</h3>
                                <p className="text-gray-600 italic mb-4">(Previously titled "Olvera Street")</p>
                                <p className="text-gray-700 mb-6">
                                    L. C. Harnsberger's new opera "Golondrina" takes you back to the historic downtown Los Angeles of the 1920s. In 1926, demolition notices were being posted around the historic Olvera Street Plaza to make way for the new Union Station. The story, based on actual events, follows a determined single mother, Christine Sterling, who teams up with a young restaurant owner, her widowed friend, and eventually LA Times publisher Harry Chandler, to face unfathomable odds while convincing the skeptical community and jaded politicians to adapt her plan to save the street.
                                </p>
                                <p className="text-gray-700 mb-6">
                                    Her vision is centered around an ingenious transformation of the dilapidated street into a charming taste of old Mexico. Romance and tragedy interrupt the noble cause but perseverance outweighs the challenges. Christine's efforts end up preventing the planned demolition and instead create one of the most beloved tourist destinations in Los Angeles.
                                </p>
                                
                                <div className="mt-6">
                                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                        <iframe 
                                            src="https://www.youtube.com/embed/videoseries?list=PLjPRq8cmxTh6uz_waBmN1eUgZnhSSEwKC" 
                                            title="Golondrina Video Playlist" 
                                            frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    </div>
                                    <a 
                                        href="https://youtube.com/playlist?list=PLjPRq8cmxTh6uz_waBmN1eUgZnhSSEwKC&si=WZO5TZBH-7MF-KUY" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-block mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                                    >
                                        Open Playlist on YouTube
                                    </a>
                                </div>
                            </div>
                            
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold mb-4 text-blue-700">Teach Los Angeles History With Opera</h3>
                                <p className="text-gray-700 mb-6">
                                    A 50-minute scholastic edition of "Golondrina" is available for performances at schools and institutions. Give students the story of Olvera Street told through the magic of opera. Contact the Vineyard Touring Opera Company here for more information.
                                </p>
                                
                                <div className="mt-6">
                                    <Link href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                                        Contact VTO
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Contact CTA */}
                <div className="bg-blue-700 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">Ready to bring your vision to life?</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Contact us today to discuss your project and how we can help you create the perfect musical experience.
                        </p>
                        <Link href="/contact" className="inline-block bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300 text-lg">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}