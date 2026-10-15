"use client"
import { Globe, X } from 'lucide-react'
import React, { useState } from 'react'

function CountrySellNotAvaialbleAlert({ currentCountry }: { currentCountry?: string }) {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="flex items-start gap-3 xl:gap-4 rounded-md bg-blue-50 p-3 md:p-4 lg:p-5 xl:p-6 relative">
            <Globe
                className="h-7 md:h-8 lg:h-9 w-7 md:w-8 lg:w-9 shrink-0 text-blue-500"
                strokeWidth={1.75}
                aria-hidden="true"
            />

            <div className="max-w-md">
                <h3 className="text-base font-semibold text-slate-900">
                    Selling is coming soon to your country 🌏
                </h3>
                <p className="mt-1 text-sm leading-snug text-slate-600">
                    You can still shop from{" "}
                    {currentCountry ? <span className="text-blue-600">
                        {currentCountry} sellers
                    </span> : "any region"}
                    , and we'll let you know when selling becomes available in your region.
                </p>
            </div>

            <button
                type="button"
                onClick={() => setVisible(false)}
                aria-label="Dismiss notice"
                className="cursor-pointer absolute right-3 top-3 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}

export default CountrySellNotAvaialbleAlert