import Link from 'next/link'
import React from 'react'

export default function SignUpFormHeader() {
    return (
        <div className="flex justify-between">
            <div className="flex-1 flex justify-center items-center bg-primary-black text-primary-white px-2.5 py-3">
                Sign Up
            </div>
            <Link
                href={"/sign-in"}
                className="flex-1 flex justify-center items-center px-2.5 py-3"
            >
                Sign In
            </Link>
        </div>
    )
}
