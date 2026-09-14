"use client"
import { useSellerSellCharitySupportStatsQuery } from '@/redux/api/donation.api'
import { defaultImg } from '@/utils/defaultImg';
import { HeartHandshake } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

function Stat({ value, label }: { value: string; label: string }) {
    return (
        <div>
            <dt className="sr-only">{label}</dt>
            <dd className="text-base font-semibold text-foreground">{value}</dd>
            <span className="text-sm text-muted-foreground">{label}</span>
        </div>
    );
}

function SupportStats({ userName }: { userName: string }) {

    const { isLoading, data, isSuccess } = useSellerSellCharitySupportStatsQuery({ userName }, { refetchOnMountOrArgChange: true });

    if (isLoading) {
        return <div className="flex-center h-40 lg:h-60">
            <span className="loaderDark !w-10"> </span>
        </div>
    }

    return (
        <div className='space-y-5'>
            <section className="rounded-xl border border-border bg-surface p-6">
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="flex size-11 items-center justify-center rounded-lg bg-green-600/10 text-brand-foreground">
                            <HeartHandshake className="size-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">Giving Back</h2>
                            <p className="max-w-xl text-sm text-muted-foreground">
                                {userName} donates a share of every sale to verified charities.
                                Buying from this seller supports these causes directly.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-10">
                        <Stat value={`${data?.data?.sellDonatedAmount?.toFixed(2) || 0}`} label="Total donated" />
                        <Stat value={`${data?.data?.avgSellDonationPercentage.toFixed(2) || 0}%`} label="Pledged avg sale" />
                        <Stat value={`${data?.data?.totalCharitiesToSupport.toFixed(2) || 0}`} label="Charities" />
                    </div>
                </div>
            </section>

            {(isSuccess && data?.data?.donationsByCharity.length > 0) && <div>
                <div className="mb-4 flex items-baseline justify-between">
                    <h3 className="text-base font-medium text-foreground">Supported charities</h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data?.data?.donationsByCharity?.map((c) => (
                        <div
                            key={c?.charityId}
                            className="flex items-center gap-4 rounded border border-gray-100 p-4"
                        >
                            <Image
                                src={c?.charityImage || defaultImg?.empty_user}
                                alt={`${c?.charityName} logo`}
                                className="size-14 rounded-lg object-cover"
                            />
                            <div className="min-w-0 flex-1">
                                <h4 className="truncate text-sm font-semibold text-foreground">
                                    {c?.charityName}
                                </h4>
                                <p className="text-sm text-muted-foreground">{c?.totalDonation?.toFixed(2) || 0} donated</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}

        </div>
    )
}

export default SupportStats