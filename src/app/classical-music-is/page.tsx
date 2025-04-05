import Header from "@/components/Header";

export default function ClassicalMusicIs() {
    return (
        <div>
            <div className="bg-white text-gray-800 min-h-screen">
                <Header records={[]} />
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <h1 className="text-3xl font-bold mb-6">Classical Music Is…</h1>
                    {/* <p className="text-sm mb-6">[links over from classicalmusicis.net]</p> */}

                    {/* Updated to use grid layout */}
                    <div className="grid grid-cols-2 gap-4 items-center mb-8">
                        <span className="font-medium">YouTube Channel</span>
                        <a
                            href="https://www.youtube.com/channel/UCWentkhxxSnZS-Hk760_MoQ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-center"
                        >
                            Subscribe
                        </a>
                    </div>

                    <p className="mb-8">Subscribe now to keep up to date on future episodes of Classical Music Is...</p>

                    <div className="bg-gray-100 p-6 rounded-lg mb-8">
                        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-1">Name</label>
                                <input type="text" id="name" className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1">Email</label>
                                <input type="email" id="email" className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-1">Message</label>
                                <textarea id="message" rows={4} className="w-full p-2 border rounded"></textarea>
                            </div>
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                Send Message
                            </button>
                        </form>
                    </div>

                    <p className="mb-6">Every episode is premiered on Torrance, CA cable networks. Links to the videos on YouTube are below.</p>

                    <div className="mb-8">
                        <p className="mb-6 text-lg">
                            Classical music is... well, a bit of everything—beautiful, scary, and everything in between.
                            Step into a world where classical music meets fun, with performances that are as entertaining
                            as they are informative. We'll explore every era, instrument, holiday, and mood (you name it!)—and
                            trust us, it's anything but stuffy. Picture the creativity of Alton Brown's "Good Eats," combined
                            with the unconventional flair of the '80s cult favorite "New Wave Theater," and a dash of
                            "Bill Nye the Science Guy." This show is all about having a good time while giving local performers
                            a fresh stage to shine for an entirely new audience.
                        </p>
                    </div>

                    {/* Updated video section with grid layout and smaller embeds */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">Watch Season 1 Episode 1</h2>
                                <h3 className="text-lg mb-4">Classical Music Is..."Scary"</h3>
                                <div className="w-full h-48">
                                    <iframe
                                        src="https://www.youtube.com/embed/YjNONVOeKwU"
                                        title="Classical Music Is Scary"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full rounded"
                                    ></iframe>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">Watch Season 1 Episode 2</h2>
                                <h3 className="text-lg mb-4">Classical Music Is..."Christmas"</h3>
                                <div className="w-full h-48">
                                    <iframe
                                        src="https://www.youtube.com/embed/2FfK6VMm_pY"
                                        title="Classical Music Is Christmas"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full rounded"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}