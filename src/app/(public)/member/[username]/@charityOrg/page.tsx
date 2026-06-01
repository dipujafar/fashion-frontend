import Container from '@/components/shared/Container';
import GetUserDetails, { GetCharityAbout, GetCharityStatsByUserName } from '@/lib/services/UserDetails';
import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react'
import CharityProfile from '../_components/CharityProfile';
import { Skeleton } from '@/components/ui/skeleton';
import CharityStats from '../_components/CharityStats';
import CharityAbout from '../_components/CharityAbout';


async function Charityorgpage({ params }: { params: Promise<{ username: string }> }) {

    const { username } = await params;
    const userpromise = GetUserDetails({ userName: username });
    const statpromise = GetCharityStatsByUserName({ userName: username });
    const aboutpromise = GetCharityAbout({ userName: username });

    return (
        <div className="space-y-5">

            <Container className="">

                <div className="space-y-5 lg:space-y-8">
                    <Suspense fallback={<div className='min-h-40 flex items-center justify-center'>
                        <LoaderCircle size={50} className="text-4xl text-main-color animate-spin" />
                    </div>}>
                        <CharityProfile userPromise={userpromise} />
                    </Suspense>

                    <Suspense fallback={<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                    </div>}>
                        <CharityStats statPromise={statpromise} memberId={username} />
                    </Suspense>

                    <Suspense fallback={<CharityAboutSkeleton />}>
                        <CharityAbout aboutPromise={aboutpromise} />
                    </Suspense>

                </div>

            </Container>

        </div>
    )
}

export default Charityorgpage;


function CharityAboutSkeleton() {
    return (
        <div>
            {/* About Skeleton */}
            <section className="mt-14">
                <article className="md:col-span-3 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
                    <Skeleton className="h-3 w-16" /> {/* "About us" label */}
                    <div className="mt-2 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </article>
            </section>

            {/* Gallery Skeleton */}
            <section className="mt-14">
                <div className="flex items-end justify-between">
                    <div>
                        <Skeleton className="h-3 w-16" /> {/* "Gallery" label */}
                        <Skeleton className="mt-2 h-7 w-48" /> {/* "Stories from the field" */}
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {/* First item spans 2 cols & 2 rows */}
                    <Skeleton className="col-span-1 md:col-span-2 md:row-span-2 aspect-square rounded-3xl" />
                    <Skeleton className="aspect-square rounded-3xl" />
                    <Skeleton className="aspect-square rounded-3xl" />
                    <Skeleton className="aspect-square rounded-3xl" />
                    <Skeleton className="aspect-square rounded-3xl" />
                </div>
            </section>
        </div>
    )
}