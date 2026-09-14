import React from 'react'

async function MemberLayout({
    children
}: {
    children: React.ReactNode;
}) {

    return (
        <>
           {children}
        </>
    )
}

export default MemberLayout