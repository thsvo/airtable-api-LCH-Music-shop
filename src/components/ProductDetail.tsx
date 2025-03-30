import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ProductDetailProps {
    product: any;
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const fields = product.fields;

    // Function to render YouTube video if available
    const renderVideo = () => {
        if (!fields.Video) return null;

        let videoId = '';
        const videoLink = fields.Video;

        if (videoLink.includes('youtube.com/watch?v=')) {
            const url = new URL(videoLink);
            const vParam = url.searchParams.get('v');
            videoId = vParam || '';
        } else if (videoLink.includes('youtu.be/')) {
            videoId = videoLink.split('youtu.be/')[1]?.split('?')[0] || '';
        } else if (videoLink.includes('youtube.com/embed/')) {
            videoId = videoLink.split('youtube.com/embed/')[1]?.split('?')[0] || '';
        }

        if (!videoId) return null;

        return (
            <div className="aspect-video w-full">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            </div>
        );
    };

    // Function to render audio player if available
    const renderAudio = () => {
        if (!fields['Audio Sample']) return null;

        // Check if it's a URL or an array of attachments
        if (typeof fields['Audio Sample'] === 'string') {
            return (
                <audio controls className="w-full">
                    <source src={fields['Audio Sample']} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            );
        } else if (Array.isArray(fields['Audio Sample']) && fields['Audio Sample'][0]?.url) {
            return (
                <audio controls className="w-full">
                    <source src={fields['Audio Sample'][0].url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            );
        }

        return <p>Audio format not supported</p>;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left column - Cover image and buy button */}
                <div>
                    <div className="aspect-square relative mb-4">
                        {fields['Cover Scan'] && fields['Cover Scan'][0] ? (
                            <Image
                                src={fields['Cover Scan'][0].url}
                                alt={fields['Product Name'] || 'Product cover'}
                                fill
                                className="object-contain"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">No cover image</span>
                            </div>
                        )}
                    </div>

                    {/* {fields['SMP Item Link'] && (
                        <Button className="w-full" size="lg" asChild>
                            <a href={fields['SMP Item Link']} target="_blank" rel="noopener noreferrer">
                                BUY NOW
                            </a>
                        </Button>
                    )} */}
                </div>

                {/* Right column - Product details */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">{fields['Product Name']}</h1>
                    {fields['Ensesmble'] && (
                        <p className="text-xl mb-4 text-gray-600">{fields['Ensesmble']}</p>
                    )}

                    <div className="mb-4">
                        <p className="text-lg">
                            {fields['Composer'] && <span>Composer: {fields['Composer']}</span>}
                            {fields['Arranger'] && <span> • Arranger: {fields['Arranger']}</span>}
                        </p>
                        <p>Score and Parts</p>
                        {fields['Grade Level'] && <p>Grade Level: {fields['Grade Level']}</p>}
                    </div>

                    {fields['LCH Item #'] && (
                        <p className="mb-4">Item: {fields['LCH Item #']}</p>
                    )}

                    {fields['Price'] && (
                        <p className="text-2xl font-bold mb-4">${fields['Price']}</p>
                    )}

                    {fields['SMP Item Link'] && (
                        <Button className="mb-8" variant="outline" asChild>
                            <a href={fields['SMP Item Link']} target="_blank" rel="noopener noreferrer">
                                Buy Now
                            </a>
                        </Button>
                    )}

                    <h2 className="text-2xl font-bold mb-4">Product Details</h2>

                    {fields['Description (Long)'] && (
                        <div className="mb-6">
                            <p>{fields['Description (Long)']}</p>
                        </div>
                    )}

{fields['Duration'] && (() => {
    const totalSeconds = parseInt(fields['Duration'], 10);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return (
        <p className="mb-4">
            <strong>Duration:</strong> {hours > 0 ? `${hours}:` : ""}{minutes.toString().padStart(2, '0')}
        </p>
    );
})()}


                </div>
            </div>

            {/* Audio Sample */}
            {fields['Audio Sample'] && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Audio Sample</h2>
                    {renderAudio()}
                </div>
            )}

            {/* Video */}
            {fields.Video && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Video</h2>
                    {renderVideo()}
                </div>
            )}

            {/* Additional Details */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Instrumentation */}
                {fields['Instrumentation'] && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Instrumentation</h2>
                        <p>{fields['Instrumentation']}</p>
                    </div>
                )}

                {/* Additional Info */}
                <div>
                    {fields['SMP Genres'] && (
                        <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">Genres</h3>
                            <p>{fields['SMP Genres']}</p>
                        </div>
                    )}

                    {fields['# of Pgs'] && (
                        <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">No. of Pages</h3>
                            <p>{fields['# of Pgs']}</p>
                        </div>
                    )}

                    {fields['Publisher'] && (
                        <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">Publisher</h3>
                            <p>{fields['Publisher']}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}