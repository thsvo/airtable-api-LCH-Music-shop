import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export default function CardSection() {
    return (
        <Card className="bg-gradient-to-r from-blue-100 to-purple-50 p-4 sm:p-8 rounded-3xl relative overflow-hidden">
            <div className="max-w-4xl mx-auto">
                {/* Floating Avatars - Hide on mobile */}
                <div className="hidden sm:block absolute left-12 top-8">
                    <Avatar className="w-8 sm:w-12 h-8 sm:h-12">
                        <AvatarImage src="/avatar1.jpg" alt="User" />
                    </Avatar>
                </div>
                <div className="absolute left-24 top-20">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src="/avatar2.jpg" alt="User" />
                    </Avatar>
                </div>
                <div className="absolute right-16 top-12">
                    <Avatar className="w-14 h-14">
                        <AvatarImage src="/avatar3.jpg" alt="User" />
                    </Avatar>
                </div>
                <div className="absolute right-32 top-24">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src="/avatar4.jpg" alt="User" />
                    </Avatar>
                </div>

                {/* Main Content */}
                <div className="text-center py-6 sm:py-12">
                    <h2 className="text-[24px] sm:text-[32px] font-lexend font-semibold text-[#1B1C57] w-full sm:w-[422px] mx-auto px-4 sm:px-0 mb-8">
                        Subscribe For More Info
                        <br />
                        And Update From Hounter
                    </h2>
                    
                    {/* Email Input Section */}
                    <div className="flex items-center justify-center w-full px-4 sm:px-0">
                        <div className="relative flex w-full max-w-[320px] sm:max-w-lg bg-white rounded-full shadow-sm">
                            <div className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H19C19.7956 20 20.5587 19.6839 21.1213 19.1213C21.6839 18.5587 22 17.7956 22 17V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM19 6L12.5 10.47C12.348 10.5578 12.1755 10.604 12 10.604C11.8245 10.604 11.652 10.5578 11.5 10.47L5 6H19Z" fill="#3B82F6"/>
                                </svg>
                            </div>
                            <Input 
                                type="email" 
                                placeholder="Your email here" 
                                className="pl-12 sm:pl-16 pr-24 sm:pr-36 h-12 sm:h-14 border-0 rounded-full font-lexend text-[12px] sm:text-[14px] font-medium text-[#888B97] focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <Button 
                                className="absolute right-1 top-1 h-10 sm:h-12 px-3 sm:px-6 rounded-full bg-[#10B981] hover:bg-[#0EA472] text-white font-lexend text-[12px] sm:text-[14px] font-semibold transition-colors"
                            >
                                Subscribe Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}