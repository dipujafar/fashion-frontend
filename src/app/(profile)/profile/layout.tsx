import Container from '@/components/shared/Container';
import ProfileSMSideBar from '@/components/shared/UserProfile/ProfileSMSideBar';
import { profileRouts } from '@/lib/profileRoutes';
import Link from 'next/link';
import React from 'react'

function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <div className='relative h-full'>
            <ProfileSMSideBar />

            <Container>

                <div className='grid grid-cols-4 gap-5 pt-5 bg-white'>

                    <div className='hidden lg:block lg:col-span-1 rounded-md p-8 pt-4 self-start'>
                        {profileRouts.map((route) => (
                            <div key={route.id} className='mb-6'>
                                <h6 className='font-medium text-gray-900'>{route.title}</h6>
                                <ul className='mt-1.5'>
                                    {route.routs.map((subRoute) => (
                                        <li key={subRoute.id} className='mb-1.5'>
                                            <Link href={subRoute.rout} className='text-gray-500 hover:underline'>
                                                {subRoute.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                            </div>

                        ))}
                    </div>

                    <div className='col-span-4 lg:col-span-3'>
                        {children}
                    </div>

                </div>

            </Container>
        </div>
    )
}

export default ProfileLayout