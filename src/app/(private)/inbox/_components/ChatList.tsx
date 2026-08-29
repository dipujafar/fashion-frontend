import UserCard from '@/components/shared/Message/UserCard'
import React from 'react'
import user3Img from "@/assets/images/message/user1.png";

function ChatList() {
    return (
        <div>

            <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <h4 className="text-lg font-semibold">Messages</h4>
            </div>

            <div className="mx-auto">

                {/* users list - TODO: Use dynamic data */}
                <div className="scroll-hide max-h-[calc(100vh-250px)] overflow-auto">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <UserCard
                            key={idx}
                            user={{
                                img: user3Img,
                                name: "Elmer Laverty",
                                latestMsg: "Emily: Yes, You can make an offer of $35.00. I can consider it. Please make an offer.",
                            }}
                            active={idx === 1 ? true : false}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChatList