import { ReportDialog } from '@/components/shared/Message/ReportDialog'
import Image from 'next/image'
import React from 'react'
import userImg from "@/assets/images/message/user2.png";
import user2Img from "@/assets/images/message/user1.png";
import user3Img from "@/assets/images/message/user1.png";

function ChatHeader() {
    return (
        <div>
            <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-center">
                <h4 className="text-lg font-semibold text-center">salos32</h4>
            </div>

            <div className="border-b border-gray-200 flex items-center justify-between pb-1 px-4 py-1">
                <div className="flex items-center gap-x-5">
                    <div className="w-[22%]">
                        <Image
                            src={userImg}
                            alt="user image"
                            className="aspect-square w-full rounded-full"
                        />
                    </div>

                    <div className="lg:flex-grow">
                        <h3 className="text-xl font-semibold">Elmer Laverty</h3>

                        <div className="mt-1 flex items-center gap-x-2">
                            {/* Active/Online Indicator */}
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <p className="">Online</p>
                        </div>
                    </div>
                </div>
                <div>
                    <ReportDialog />
                </div>
            </div>
        </div>
    )
}

export default ChatHeader