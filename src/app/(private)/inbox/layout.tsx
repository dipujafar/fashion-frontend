import Container from '@/components/shared/Container'
import React from 'react'
import ChatList from './_components/ChatList'

function InboxLayout({ children, params, }: { children: React.ReactNode, params: { chatId?: string } }) {

    

    return (
        <Container>
            <div className='pt-3'>
                <div className='relative z-10 flex flex-col lg:flex-row border border-gray-200'>
                    <div className='lg:w-[40%] xl:w-[30%] lg:border-r border-gray-200'>
                        <ChatList />
                    </div>
                    <div className='lg:grow'>
                        {children} {/* //Chat page */}
                    </div>
                </div>

            </div>
        </Container>
    )
}

export default InboxLayout