"use client"
import PreMessage from './PreMessage';
import NewMessages from './NewMessages';
import { useRef } from 'react';

function MessageBox({ userName }: { userName: string }) {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior, block: "end" });
        }
    };

    return (
        <div ref={chatContainerRef} className="overflow-y-auto h-auto space-y-6 px-5 pt-5 bg-zinc-50">
            {userName && (
                <PreMessage
                    friendUserName={userName}
                    scrollToBottom={scrollToBottom}
                    containerRef={chatContainerRef}
                />
            )}
            <NewMessages userName={userName}  scrollToBottom={scrollToBottom}/>
            <div ref={bottomRef}></div>
        </div>
    )
}

export default MessageBox