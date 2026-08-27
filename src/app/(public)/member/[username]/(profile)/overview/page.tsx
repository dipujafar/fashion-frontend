import { CharityDonationFormDialog } from '@/components/shared/Modal/Charity/CharityDonationFormDialog';
import { GetCharityAbout } from '@/lib/services/UserDetails';
import { IUser } from '@/types';
import { defaultImg } from '@/utils/defaultImg';
import { Globe, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

async function CharityDetails({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;

    const user = GetCharityAbout({ userName: username })


    return (
        <div>
            <Suspense fallback={<div className="flex-center h-28 lg:h-40">
                <span className="loaderDark !w-10"> </span>
            </div>}>
                <OverViewDetails userPromise={user} />
            </Suspense>
        </div>
    )
}

export default CharityDetails;

const OverViewDetails = async ({ userPromise }: { userPromise: Promise<{ data: IUser }> }) => {

    const user = await userPromise;

    if (!user?.data) {
        return notFound()
    }

    return <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16'>

        <div className='order-2 col-span-1 space-y-5 md:space-y-8 lg:space-y-10'>
            <div className="rounded-2xl bg-[#0f172a] text-white p-5 shadow-sm">
                <div className="text-[10px] uppercase tracking-wider text-[#64748b] mb-1 font-semibold">Ready to give?</div>
                <div className="text-lg font-bold mb-1 leading-tight" style={{ textWrap: "pretty" }}>100% goes to this charity</div>
                <p className="text-[12.5px] text-white mb-4 leading-relaxed">FASHION doesn't take a cut. Donate directly from this page.</p>

                <CharityDonationFormDialog>
                    <button className="block text-center w-full bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold py-2.5 rounded-xl text-sm cursor-pointer">
                        Make your donation
                    </button>
                </CharityDonationFormDialog>
            </div>

            <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-4">
                    Connect
                </h2>
                <ul className="space-y-4">
                    {user?.data?.website && <li>
                        <Link
                            href={user?.data?.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between text-base font-medium hover:text-brand transition-colors"
                        >
                            <span>Website</span>
                            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                → {user?.data?.website}
                            </span>
                        </Link>
                    </li>}
                    {user?.data?.facebook && <li>
                        <Link
                            href={user?.data?.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between text-base font-medium hover:text-brand transition-colors"
                        >
                            <span>Facebook</span>
                            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                → {user?.data?.facebook}
                            </span>
                        </Link>
                    </li>}
                    {user?.data?.instagram && <li>
                        <Link
                            href={user?.data?.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between text-base font-medium hover:text-brand transition-colors"
                        >
                            <span>Instagram</span>
                            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                → {user?.data?.instagram}
                            </span>
                        </Link>
                    </li>}
                    {user?.data?.twitter && <li>
                        <Link
                            href={user?.data?.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between text-lg font-medium hover:text-brand transition-colors"
                        >
                            <span>Twitter</span>
                            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                → {user?.data?.twitter}
                            </span>
                        </Link>
                    </li>}
                </ul>
            </div>

            {user?.data?.support_email && <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-4">
                    Inquiries
                </h2>
                <Link
                    href={`mailto:${user?.data?.support_email}`}
                    className="text-lg font-medium border-b border-black/10 pb-1 hover:border-brand transition-colors"
                >
                    {user?.data?.support_email}
                </Link>
            </div>}

        </div>

        <div className='order-1 col-span-1 md:col-span-2 space-y-5 md:space-y-8'>

            <section>
                <h2 className="text-xl font-semibold text-foreground">About this charity</h2>
                <div className="mt-3 space-y-4 text-base leading-relaxed text-gray-800">
                    <p>
                        {user?.data?.description || "No description available for this charity."}
                    </p>
                </div>
            </section>

            {user?.data?.charityGalleries.length > 0 && <section>
                <h2 className="text-xl font-semibold text-foreground">Gallery</h2>
                <p className="mt-1 text-sm text-gray-700">
                    Moments from our recent programmes on the ground.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                    {user?.data?.charityGalleries?.map((image) => (
                        <Image
                            src={image.url || defaultImg?.placeholderImg}
                            key={image?.id}
                            alt={image?.caption || `Gallery Image`}
                            placeholder='blur'
                            blurDataURL={defaultImg?.placeholderImg}
                            width={1024}
                            height={768}
                            className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ))}
                </div>
            </section>}

        </div>

    </div>
}