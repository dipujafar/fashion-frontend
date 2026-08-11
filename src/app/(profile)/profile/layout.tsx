import Container from '@/components/shared/Container';
import Link from 'next/link';
import React from 'react'

const routs = [
    {
        id: 1,
        title: "Purchase",
        rout: "/profile",
        routs: [
            {
                id: 1,
                title: "Orders",
                rout: "/profile/purchase/orders"
            },
            {
                id: 2,
                title: "Returns",
                rout: "/profile/purchase/returns"
            }
        ],
    },
    {
        id: 4,
        title: "Selling",
        rout: "/profile/sell",
        routs: [
            {
                id: 1,
                title: "Products",
                rout: "/profile/sell/products"
            },
            {
                id: 2,
                title: "Orders",
                rout: "/profile/sell/orders"
            },
            {
                id: 3,
                title: "Returns",
                rout: "/profile/sell/returns"
            },
            {
                id: 4,
                title: "Bundle Discount",
                rout: "/profile/sell/bundle-discount"
            }
        ]
    },
    {
        id: 3,
        title: "Payment",
        rout: "/profile/payment",
        routs: [
            {
                id: 5,
                title: "Earnings",
                rout: "/profile/payment/earnings"
            }
        ]
    },
    {
        id: 2,
        title: "Settings",
        rout: "/profile",
        routs: [
            {
                id: 5,
                title: "Profile",
                rout: "/profile"
            },
            {
                id: 8,
                title: "Address",
                rout: "/profile/address"
            },
            {
                id: 6,
                title: "Vacation Mode",
                rout: "/profile/vacation-mode"
            },
            {
                id: 1,
                title: "Notifications",
                rout: "/profile/notifications"
            },
            {
                id: 7,
                title: "Change Password",
                rout: "/profile/change-password"
            }
        ]
    }
]

function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Container>

            <div className='grid grid-cols-4 gap-5 pt-5 bg-white'>
                <div className='col-span-5 lg:col-span-1 rounded-md p-8 pt-4 self-start'>
                    {routs.map((route) => (
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

                <div className='col-span-5 lg:col-span-3'>
                    {children}
                </div>

            </div>

        </Container>
    )
}

export default ProfileLayout