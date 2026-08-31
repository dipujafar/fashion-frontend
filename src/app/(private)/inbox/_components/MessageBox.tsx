"use client"
import PreMessage from './PreMessage';
import NewMessages from './NewMessages';
import { useRef, useState } from 'react';
import { IMessage } from '@/types';

function MessageBox({ userName }: { userName: string }) {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [updatedMsgs, setUpdatedMsgs] = useState<IMessage[]>([]);

    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior, block: "end" });
        }
    };

    return (
        <div ref={chatContainerRef} className="overflow-y-auto h-full space-y-6 px-5 pt-5 bg-zinc-50">
            {userName && (
                <PreMessage
                    friendUserName={userName}
                    scrollToBottom={scrollToBottom}
                    containerRef={chatContainerRef}
                    updatedMsgs={updatedMsgs}
                />
            )}
            <NewMessages userName={userName} scrollToBottom={scrollToBottom} setUpdatedMsgs={setUpdatedMsgs} updatedMsgs={updatedMsgs} />
            <div ref={bottomRef}></div>
        </div>
    )
}

export default MessageBox