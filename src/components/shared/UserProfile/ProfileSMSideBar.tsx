"use client"
import { usePathname } from "next/navigation"
import React, { useMemo } from "react"
import Link from "next/link"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { ProfileRoute } from "@/lib/profileRoutes"

const isMatch = (pathname: string, rout: string) =>
    pathname === rout || pathname.startsWith(rout + "/")

function useActiveRoute(pathname: string | null, profileRouts: ProfileRoute[]) {
    return useMemo(() => {
        if (!pathname) return { parent: undefined, child: undefined }

        let best: { parent: (typeof profileRouts)[number]; child: any } | undefined

        for (const parent of profileRouts) {
            for (const child of parent.routs ?? []) {
                if (!isMatch(pathname, child.rout)) continue
                // longest matching route wins
                if (!best || child.rout.length > best.child.rout.length) {
                    best = { parent, child }
                }
            }
        }
        return { parent: best?.parent, child: best?.child }
    }, [pathname])
}

function ProfileSMSideBar({ routes }: { routes: ProfileRoute[] }) {
    const pathname = usePathname()
    const { parent: currentParent, child: currentChild } = useActiveRoute(pathname, routes)

    return (
        <div className="lg:hidden bg-white">
            <Accordion type="multiple">
                <AccordionItem value="menu">
                    <AccordionTrigger className="font-semibold text-base text-gray-900 px-4 border-b border-b-gray-200 rounded-none hover:no-underline">
                        {currentChild?.title ?? "Menu"}
                    </AccordionTrigger>

                    <AccordionContent className="rounded-none">
                        <Accordion
                            type="single"
                            collapsible
                            defaultValue={currentParent ? String(currentParent.id) : undefined}
                        >
                            {routes.map((parent) => (
                                <AccordionItem value={String(parent.id)} key={parent.id}>
                                    <AccordionTrigger
                                        className={cn(
                                            "text-sm px-4 hover:no-underline",
                                            currentParent?.id === parent.id && "font-semibold"
                                        )}
                                    >
                                        {parent.title}
                                    </AccordionTrigger>

                                    <AccordionContent className="px-4 space-y-2">
                                        {parent.routs?.map((r) => (
                                            <Link href={r.rout} key={r.id}>
                                                <div
                                                    className={cn(
                                                        "py-3 px-4 hover:bg-zinc-100 focus:bg-zinc-100",
                                                        currentChild?.id === r.id && "font-semibold bg-zinc-100"
                                                    )}
                                                >
                                                    <p>{r.title}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default ProfileSMSideBar