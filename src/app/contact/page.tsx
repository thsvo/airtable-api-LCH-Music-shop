"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Instagram, PinIcon as Pinterest, Twitter, Youtube } from "lucide-react"
import { useMobile } from "@/app/contact/use-mobile"
import Header from "@/components/Header"

export default function ContactPage() {
    const isMobile = useMobile()

    return (
        <div>
            <Header records={[]}></Header>
            <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Contact Us</h1>

                <div className="grid gap-6 md:grid-cols-3 mb-8 md:mb-12">
                    {/* Mailing Address */}
                    <Card className="p-4 md:p-6">
                        <h2 className="text-lg font-semibold mb-2">Mailing Address</h2>
                        <p>lch Music</p>
                        <p>PO Box 10003</p>
                        <p>Van Nuys, CA 91410</p>
                    </Card>

                    {/* Office Hours */}
                    <Card className="p-4 md:p-6">
                        <h2 className="text-lg font-semibold mb-2">Office Hours</h2>
                        <p>Monday through Friday:</p>
                        <p>8:00 AM - 4:00 PM</p>
                        <p>Mountain Time</p>
                    </Card>

                    {/* International Offices */}
                    <Card className="p-4 md:p-6">
                        <h2 className="text-lg font-semibold mb-2">International Offices</h2>
                        <p>
                            <a href="#international" className="text-blue-600 hover:underline">
                                Click here
                            </a>{" "}
                            to see a listing of our international offices.
                        </p>
                    </Card>
                </div>

                {/* Contact Form */}
                <Card className="p-4 md:p-6 mb-8 md:mb-16">
                    <h2 className="text-xl font-semibold mb-3">Submit your inquiry below or email:</h2>
                    <a href="mailto:customerservice@lch.com" className="text-blue-600 block mb-4 break-words">
                        customerservice@lch.com
                    </a>
                    <p className="text-sm italic mb-6">
                        *Please note that while we are eager to assist you, response times may be longer than usual due to a high
                        volume of inquiries.
                    </p>

                    <form className="space-y-5">
                        <div className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-base">
                                    First Name <span className="text-red-500">*</span>
                                </Label>
                                <Input id="firstName" required className="h-12 text-base" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-base">
                                    Last Name <span className="text-red-500">*</span>
                                </Label>
                                <Input id="lastName" required className="h-12 text-base" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-base">
                                    Email <span className="text-red-500">*</span>
                                </Label>
                                <Input id="email" type="email" required className="h-12 text-base" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-base">
                                    Phone (optional)
                                </Label>
                                <Input id="phone" type="tel" className="h-12 text-base" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="inquiryType" className="text-base">
                                Select the type of inquiry: <span className="text-red-500">*</span>
                            </Label>
                            <Select>
                                <SelectTrigger className="h-12 text-base">
                                    <SelectValue placeholder="Please select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="general">General Inquiry</SelectItem>
                                    <SelectItem value="support">Technical Support</SelectItem>
                                    <SelectItem value="sales">Sales</SelectItem>
                                    <SelectItem value="billing">Billing</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-base">
                                Please describe your inquiry: <span className="text-red-500">*</span>
                            </Label>
                            <Textarea id="message" rows={6} required className="text-base min-h-[120px]" />
                        </div>

                   

                        <Button type="submit" className="w-full h-12 text-base bg-orange-500 hover:bg-orange-600">
                            Submit
                        </Button>
                    </form>
                </Card>

                {/* International Offices */}
                <div id="international" className="mb-8 md:mb-16">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">International Offices</h2>

                    <div className="grid gap-6 md:grid-cols-3">
                        <Card className="p-4 md:p-6">
                            <h3 className="text-lg md:text-xl font-semibold mb-3">lchmusic</h3>
                            <p className="mb-2">Phone: +65000000</p>
                            <p>
                                Email:{" "}
                                <a href="mailto:ssssssss@lch.com" className="text-blue-600 break-words">
                                lchmusic@lchmusic.com
                                </a>
                            </p>
                        </Card>

                        <Card className="p-4 md:p-6">
                            <h3 className="text-lg md:text-xl font-semibold mb-3">lch UK</h3>
                            <p>Burnt Mill, Elizabeth Way</p>
                            <p>Harlow, Essex CM20 2HX</p>
                            <p className="mb-2">England</p>
                            <p className="mb-2">Phone: +44 00000000</p>
                            <p>
                                Email:{" "}
                                <a href="mailto:music@lch.com" className="text-blue-600">
                                    music@lch.com
                                </a>
                            </p>
                        </Card>

                        <Card className="p-4 md:p-6">
                            <h3 className="text-lg md:text-xl font-semibold mb-3">lch Germany</h3>
                            <p>Luetzowstrasse 127</p>
                            <p>D-51107 Cologne</p>
                            <p className="mb-2">Germany</p>
                            <p className="mb-2">Phone: +49 (0)000000</p>
                            <p>
                                Email:{" "}
                                <a href="mailto:info@lchverlag.de" className="text-blue-600 break-words">
                                    info@lchmusic.de
                                </a>
                            </p>
                        </Card>
                    </div>
                </div>

                {/* Community and Updates */}
                <div className="grid gap-8 md:grid-cols-2">
                    <Card className="p-4 md:p-6 text-center">
                        <h2 className="text-xl md:text-2xl font-bold mb-3">Join Our Community</h2>
                        <p className="mb-5">Join a community of music enthusiasts with a passion for music education.</p>
                        <div className="flex justify-center space-x-6">
                            <a href="#" className="text-blue-600 hover:text-blue-800">
                                <Facebook className="w-7 h-7" />
                            </a>
                            <a href="#" className="text-blue-400 hover:text-blue-600">
                                <Twitter className="w-7 h-7" />
                            </a>
                            <a href="#" className="text-pink-600 hover:text-pink-800">
                                <Instagram className="w-7 h-7" />
                            </a>
                            <a href="#" className="text-red-600 hover:text-red-800">
                                <Youtube className="w-7 h-7" />
                            </a>
                            <a href="#" className="text-red-500 hover:text-red-700">
                                <Pinterest className="w-7 h-7" />
                            </a>
                        </div>
                    </Card>

                    <Card className="p-4 md:p-6 text-center">
                        <h2 className="text-xl md:text-2xl font-bold mb-3">Stay Updated</h2>
                        <p className="mb-5">Want to get the latest updates and special offers from lch Music?</p>
                        <Button className="h-12 px-6 text-base bg-teal-600 hover:bg-teal-700">Join Our Email List</Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}

