import { IUser } from '@/types'
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

async function CharityAbout({ aboutPromise }: { aboutPromise: Promise<{ data: IUser }> }) {
    const userData = (await aboutPromise)?.data;

    return (
        <div>

            {/* About */}
            <section className="mt-14">
                <article className="md:col-span-3 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
                    <span className="text-xs uppercase tracking-[0.18em] text-primary">
                        About us
                    </span>
                    {/* <h2
                        className="mt-2 font-display text-3xl tracking-tight md:text-4xl"
                        style={{ fontWeight: 500 }}
                    >
                        Protecting the planet, <em className="italic">together</em>
                    </h2> */}
                    <div className="mt-2">
                        <p>{userData?.description}</p>
                    </div>
                </article>
            </section>

            {/* Gallery */}
            <section className="mt-14">
                <div className="flex items-end justify-between">
                    <div>
                        <span className="text-xs uppercase tracking-[0.18em] text-primary">
                            Gallery
                        </span>
                        <h2
                            className="mt-2 text-2xl tracking-tight md:text-3xl font-medium"
                        >
                            Stories from the field
                        </h2>
                    </div>
                </div>

                {!userData?.charityGalleries?.length ? (
                    // Empty State
                    <div className="mt-6 flex flex-col items-center justify-center rounded-3xl py-16 text-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground/40" />
                        <p className="mt-3 text-sm font-medium text-muted-foreground">No gallery images yet</p>
                        <p className="mt-1 text-xs text-muted-foreground/80">Photos added to this charity will appear here</p>
                    </div>
                ) : (
                    // Gallery Grid
                    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                        {userData?.charityGalleries?.map((g, i) => (
                            <figure
                                key={g?.id}
                                className={`group relative overflow-hidden rounded-3xl border border-border bg-card shadow-md ${i === 0 ? "md:col-span-2 md:row-span-2" : ""
                                    }`}
                            >
                                <Image
                                    src={g?.url}
                                    alt={g?.caption || g?.id}
                                    loading="lazy"
                                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i === 0 ? "aspect-square md:aspect-auto md:h-full" : "aspect-square"
                                        }`}
                                />
                                {g?.caption && (
                                    <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 to-transparent p-4 text-xs text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                                        {g?.caption}
                                    </figcaption>
                                )}
                            </figure>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default CharityAbout