"use client"
import UserCard from '@/components/shared/Message/UserCard'
import React, { useEffect, useState } from 'react'
import user3Img from "@/assets/images/message/user1.png";
import { useSocket } from '@/Context/SocketProvider';
import { IChatUser } from '@/types';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

function ChatList({ userName }: { userName?: string }) {

    const { socket } = useSocket();
    const [chatList, setChatList] = useState<IChatUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const pathName = usePathname();

    useEffect(() => {

        if (!socket) return;

        socket?.on(`chat-list`, (res) => {
            setChatList(res);
            setIsLoading(false);
        });

        socket?.on(`io-error`, (res) => {
            console.log("---------------error res---------------", res)
            setIsLoading(false);
            // setIsError(true);
        });


        // socket?.emit("my-chat-list", {}, (response: { chats: IChatUser[] }) => {
        //     setChatList(response?.chats || []);
        //     setIsLoading(false);
        // });


        return () => {

            if (socket) {
                socket.off(`chat-list`);
                socket.off(`io-error`);
                socket.off("connect");
            }
        };
    }, [socket]);


    return (
        <div className={cn(pathName !== "/inbox" && "hidden lg:block", "h-[calc(100vh-190px)]")}>

            <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <h4 className="text-lg font-semibold">Messages</h4>
            </div>

            <div className="mx-auto">

                {/* users list - TODO: Use dynamic data */}
                <div className="scroll-hide h-[calc(100vh-250px)] overflow-auto">

                    {
                        isLoading && <div className='min-h-40 flex items-center justify-center'>
                            <div className="w-8 aspect-square rounded-full border-[3px] border-white border-r-primary-black animate-spin"></div>
                        </div>
                    }

                    {chatList.map((chat, idx) => (
                        <UserCard
                            key={chat?.id}
                            chat={chat}
                            userName={userName}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChatList