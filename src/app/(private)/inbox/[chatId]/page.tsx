import React from 'react'
import ChatHeader from '../_components/ChatHeader';
import MessageBox from '../_components/MessageBox';
import SendMessage from '../_components/SendMessage';

async function ChatPage({ params }: { params: Promise<{ chatId: string }> }) {
    const { chatId } = await params;

    return (
        <div className="flex flex-col w-full h-[calc(100vh-185px)]">
            <ChatHeader chatId={chatId} />
            <MessageBox chatId={chatId} />
            <SendMessage chatId={chatId} />
        </div>
    )
}

export default ChatPage