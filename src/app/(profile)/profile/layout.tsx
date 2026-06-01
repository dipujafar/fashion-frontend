import Container from '@/components/shared/Container';
import Link from 'next/link';
import React from 'react'

const routs = [
    {
        id: 1,
        title: "Manage My Account",
        rout: "/profile",
        routs: [
            {
                id: 1,
                title: "My Profile",
                rout: "/profile"
            },
            {
                id: 2,
                title: "Shipping",
                rout: "/profile/shipping"
            },
            {
                id: 4,
                title: "Bundle Discount",
                rout: "/profile/bundle-discount"
            }
        ],

    },
    {
        id: 4,
        title: "Manage Products",
        rout: "/profile/products",
        routs: [
            {
                id: 1,
                title: "Products",
                rout: "/profile/products"
            },
        ]
    },
    {
        id: 2,
        title: "Orders",
        rout: "/profile/purchase",
        routs: [
            {
                id: 5,
                title: "Sell",
                rout: "/profile/sell"
            },
            {
                id: 6,
                title: "Purchase",
                rout: "/profile/purchase"
            },
        ]
    },
    {
        id: 3,
        title: "Wallet",
        rout: "/profile/balance",
        routs: [
            {
                id: 7,
                title: "Balance",
                rout: "/profile/balance"
            },
            {
                id: 8,
                title: "Payout Setup",
                rout: "/profile/setup"
            },
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

            <div className='grid grid-cols-5 gap-5 mt-5'>
                <div className='col-span-5 lg:col-span-1 border border-gray-200 rounded-md p-4 self-start'>
                    {routs.map((route) => (
                        <div key={route.id} className='mb-3.5'>
                            <h6 className='font-medium text-lg text-gray-900'>{route.title}</h6>
                            <ul className='pl-3 mt-0.5'>
                                {route.routs.map((subRoute) => (
                                    <li key={subRoute.id} className='mb-1.5'>
                                        <Link href={subRoute.rout} className='text-gray-700 hover:underline'>
                                            {subRoute.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                        </div>

                    ))}
                </div>

                <div className='col-span-5 lg:col-span-4'>
                    {children}
                </div>

            </div>

        </Container>
    )
}

export default ProfileLayout