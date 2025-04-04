"use client"

import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Header from '@/components/Header';
export default function ContactPage() {

    return (
        <div>
            <Header records={[]} />
            <div className="relative isolate bg-gray-900">
                <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                    <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
                        <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2">
                                <svg
                                    aria-hidden="true"
                                    className="absolute inset-0 h-full w-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                                >
                                    <defs>
                                        <pattern
                                            x="100%"
                                            y={-1}
                                            id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                                            width={200}
                                            height={200}
                                            patternUnits="userSpaceOnUse"
                                        >
                                            <path d="M130 200V.5M.5 .5H200" fill="none" />
                                        </pattern>
                                    </defs>
                                    <svg x="100%" y={-1} className="overflow-visible fill-gray-800/20">
                                        <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                                    </svg>
                                    <rect fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)" width="100%" height="100%" strokeWidth={0} />
                                </svg>
                                <div
                                    aria-hidden="true"
                                    className="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
                                >
                                    <div
                                        style={{
                                            clipPath:
                                                'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                                        }}
                                        className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#80caff] to-[#4f46e5] opacity-20"
                                    />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-white">Get in touch</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Proin volutpat consequat porttitor cras nullam gravida at. Orci molestie a eu arcu. Sed ut tincidunt
                                integer elementum id sem. Arcu sed malesuada et magna.
                            </p>
                            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-300">
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Address</span>
                                        <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                                    </dt>
                                    <dd>
                                        545 Mavis Island
                                        <br />
                                        Chicago, IL 99191
                                    </dd>
                                </div>
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Telephone</span>
                                        <PhoneIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                                    </dt>
                                    <dd>
                                        <a href="tel:+1 (555) 234-5678" className="hover:text-white">
                                            +1 (555) 234-5678
                                        </a>
                                    </dd>
                                </div>
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Email</span>
                                        <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                                    </dt>
                                    <dd>
                                        <a href="mailto:hello@example.com" className="hover:text-white">
                                            hello@example.com
                                        </a>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <form action="#" method="POST" className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
                        <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-white">
                                        First name
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="first-name"
                                            name="first-name"
                                            type="text"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-white">
                                        Last name
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="last-name"
                                            name="last-name"
                                            type="text"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-white">
                                        Email
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-white">
                                        Phone number
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="phone-number"
                                            name="phone-number"
                                            type="tel"
                                            autoComplete="tel"
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-white">
                                        Message
                                    </label>
                                    <div className="mt-2.5">
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Send message
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        // <div>
        //     <Header records={[]}></Header>
        //     <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        //         <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Contact Us</h1>

        //         <div className="grid gap-6 md:grid-cols-3 mb-8 md:mb-12">
        //             {/* Mailing Address */}
        //             <Card className="p-4 md:p-6">
        //                 <h2 className="text-lg font-semibold mb-2">Mailing Address</h2>
        //                 <p>lch Music</p>
        //                 <p>PO Box 10003</p>
        //                 <p>Van Nuys, CA 91410</p>
        //             </Card>

        //             {/* Office Hours */}
        //             <Card className="p-4 md:p-6">
        //                 <h2 className="text-lg font-semibold mb-2">Office Hours</h2>
        //                 <p>Monday through Friday:</p>
        //                 <p>8:00 AM - 4:00 PM</p>
        //                 <p>Mountain Time</p>
        //             </Card>

        //             {/* International Offices */}
        //             <Card className="p-4 md:p-6">
        //                 <h2 className="text-lg font-semibold mb-2">International Offices</h2>
        //                 <p>
        //                     <a href="#international" className="text-blue-600 hover:underline">
        //                         Click here
        //                     </a>{" "}
        //                     to see a listing of our international offices.
        //                 </p>
        //             </Card>
        //         </div>

        //         {/* Contact Form */}
        //         <Card className="p-4 md:p-6 mb-8 md:mb-16">
        //             <h2 className="text-xl font-semibold mb-3">Submit your inquiry below or email:</h2>
        //             <a href="mailto:customerservice@lch.com" className="text-blue-600 block mb-4 break-words">
        //                 customerservice@lch.com
        //             </a>
        //             <p className="text-sm italic mb-6">
        //                 *Please note that while we are eager to assist you, response times may be longer than usual due to a high
        //                 volume of inquiries.
        //             </p>

        //             <form className="space-y-5">
        //                 <div className="grid gap-5 md:grid-cols-2">
        //                     <div className="space-y-2">
        //                         <Label htmlFor="firstName" className="text-base">
        //                             First Name <span className="text-red-500">*</span>
        //                         </Label>
        //                         <Input id="firstName" required className="h-12 text-base" />
        //                     </div>

        //                     <div className="space-y-2">
        //                         <Label htmlFor="lastName" className="text-base">
        //                             Last Name <span className="text-red-500">*</span>
        //                         </Label>
        //                         <Input id="lastName" required className="h-12 text-base" />
        //                     </div>

        //                     <div className="space-y-2">
        //                         <Label htmlFor="email" className="text-base">
        //                             Email <span className="text-red-500">*</span>
        //                         </Label>
        //                         <Input id="email" type="email" required className="h-12 text-base" />
        //                     </div>

        //                     <div className="space-y-2">
        //                         <Label htmlFor="phone" className="text-base">
        //                             Phone (optional)
        //                         </Label>
        //                         <Input id="phone" type="tel" className="h-12 text-base" />
        //                     </div>
        //                 </div>

        //                 <div className="space-y-2">
        //                     <Label htmlFor="inquiryType" className="text-base">
        //                         Select the type of inquiry: <span className="text-red-500">*</span>
        //                     </Label>
        //                     <Select>
        //                         <SelectTrigger className="h-12 text-base">
        //                             <SelectValue placeholder="Please select..." />
        //                         </SelectTrigger>
        //                         <SelectContent>
        //                             <SelectItem value="general">General Inquiry</SelectItem>
        //                             <SelectItem value="support">Technical Support</SelectItem>
        //                             <SelectItem value="sales">Sales</SelectItem>
        //                             <SelectItem value="billing">Billing</SelectItem>
        //                             <SelectItem value="other">Other</SelectItem>
        //                         </SelectContent>
        //                     </Select>
        //                 </div>

        //                 <div className="space-y-2">
        //                     <Label htmlFor="message" className="text-base">
        //                         Please describe your inquiry: <span className="text-red-500">*</span>
        //                     </Label>
        //                     <Textarea id="message" rows={6} required className="text-base min-h-[120px]" />
        //                 </div>



        //                 <Button type="submit" className="w-full h-12 text-base bg-orange-500 hover:bg-orange-600">
        //                     Submit
        //                 </Button>
        //             </form>
        //         </Card>

        //         {/* International Offices */}
        //         <div id="international" className="mb-8 md:mb-16">
        //             <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">International Offices</h2>

        //             <div className="grid gap-6 md:grid-cols-3">
        //                 <Card className="p-4 md:p-6">
        //                     <h3 className="text-lg md:text-xl font-semibold mb-3">lchmusic</h3>
        //                     <p className="mb-2">Phone: +65000000</p>
        //                     <p>
        //                         Email:{" "}
        //                         <a href="mailto:ssssssss@lch.com" className="text-blue-600 break-words">
        //                         lchmusic@lchmusic.com
        //                         </a>
        //                     </p>
        //                 </Card>

        //                 <Card className="p-4 md:p-6">
        //                     <h3 className="text-lg md:text-xl font-semibold mb-3">lch UK</h3>
        //                     <p>Burnt Mill, Elizabeth Way</p>
        //                     <p>Harlow, Essex CM20 2HX</p>
        //                     <p className="mb-2">England</p>
        //                     <p className="mb-2">Phone: +44 00000000</p>
        //                     <p>
        //                         Email:{" "}
        //                         <a href="mailto:music@lch.com" className="text-blue-600">
        //                             music@lch.com
        //                         </a>
        //                     </p>
        //                 </Card>

        //                 <Card className="p-4 md:p-6">
        //                     <h3 className="text-lg md:text-xl font-semibold mb-3">lch Germany</h3>
        //                     <p>Luetzowstrasse 127</p>
        //                     <p>D-51107 Cologne</p>
        //                     <p className="mb-2">Germany</p>
        //                     <p className="mb-2">Phone: +49 (0)000000</p>
        //                     <p>
        //                         Email:{" "}
        //                         <a href="mailto:info@lchverlag.de" className="text-blue-600 break-words">
        //                             info@lchmusic.de
        //                         </a>
        //                     </p>
        //                 </Card>
        //             </div>
        //         </div>

        //         {/* Community and Updates */}
        //         <div className="grid gap-8 md:grid-cols-2">
        //             <Card className="p-4 md:p-6 text-center">
        //                 <h2 className="text-xl md:text-2xl font-bold mb-3">Join Our Community</h2>
        //                 <p className="mb-5">Join a community of music enthusiasts with a passion for music education.</p>
        //                 <div className="flex justify-center space-x-6">
        //                     <a href="#" className="text-blue-600 hover:text-blue-800">
        //                         <Facebook className="w-7 h-7" />
        //                     </a>
        //                     <a href="#" className="text-blue-400 hover:text-blue-600">
        //                         <Twitter className="w-7 h-7" />
        //                     </a>
        //                     <a href="#" className="text-pink-600 hover:text-pink-800">
        //                         <Instagram className="w-7 h-7" />
        //                     </a>
        //                     <a href="#" className="text-red-600 hover:text-red-800">
        //                         <Youtube className="w-7 h-7" />
        //                     </a>
        //                     <a href="#" className="text-red-500 hover:text-red-700">
        //                         <Pinterest className="w-7 h-7" />
        //                     </a>
        //                 </div>
        //             </Card>

        //             <Card className="p-4 md:p-6 text-center">
        //                 <h2 className="text-xl md:text-2xl font-bold mb-3">Stay Updated</h2>
        //                 <p className="mb-5">Want to get the latest updates and special offers from lch Music?</p>
        //                 <Button className="h-12 px-6 text-base bg-teal-600 hover:bg-teal-700">Join Our Email List</Button>
        //             </Card>
        //         </div>
        //     </div>
        // </div>
    )
}

