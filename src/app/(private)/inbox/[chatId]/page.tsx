import React from 'react'
import ChatHeader from '../_components/ChatHeader'
import MessageBox from '../_components/MessageBox'
import SendMessage from '../_components/SendMessage'

function ChatPage() {
    return (
        <div className="flex flex-col w-full h-[calc(100vh-185px)] ">
            <ChatHeader />
            <MessageBox />
            <SendMessage />
        </div>
    )
}

export default ChatPage