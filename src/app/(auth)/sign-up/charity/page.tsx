import SignUpForm from '@/app/(users)/users/sign-up/_components/SignUpForm'
import React from 'react'

function SingUpDefaultUser() {
    return (
        <div>
            <SignUpForm isCharity={true} />
        </div>
    )
}

export default SingUpDefaultUser