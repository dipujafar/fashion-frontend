import React from 'react'
import ChatHeader from '../_components/ChatHeader';
import MessageBox from '../_components/MessageBox';
import SendMessage from '../_components/SendMessage';

async function ChatPage({ params }: { params: Promise<{ userName: string }> }) {
    const { userName } = await params;

    return (
        <div className="flex flex-col w-full h-[calc(100vh-185px)]">
            <ChatHeader userName={userName} />
            <MessageBox userName={userName} />
            <SendMessage username={userName} />
        </div>
    )
}

export default ChatPage