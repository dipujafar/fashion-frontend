import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ISize } from "@/types";
import React from "react";

export default function Sizechart({ sizes }: { sizes: ISize[] }) {

    return (
        <Dialog>
            <DialogTrigger className="cursor-pointer underline text-primary-light-blue">
                Size Guide
            </DialogTrigger>
            <DialogContent className="overflow-y-auto scroll-hide rounded-none">
                <DialogHeader className=" border-b border-gray-200 pb-4">
                    <DialogTitle className="text-balance text-center">
                        Size Guide
                    </DialogTitle>
                </DialogHeader>

                <div className="md:px-5 md:pb-8">

                    <div className="w-full bg-white flex justify-center px-4">
                        <div className="w-full max-w-md">
                            {/* Header */}
                            <h1 className="text-center text-xl font-semibold tracking-wide text-neutral-900">
                                Conversion Guide
                            </h1>
                            <p className="mt-2 mb-6 text-center text-sm text-neutral-500 flex items-center justify-center gap-1">
                                <span>Conversion between different size systems</span>
                            </p>

                            {/* Table */}
                            <div className="overflow-hidden rounded-sm border border-neutral-200">
                                <table className="w-full border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-white">
                                            {["INTL", "US", "UK", "EU"].map((h) => (
                                                <th
                                                    key={h}
                                                    className="px-4 py-3 text-left font-semibold text-neutral-900 border-b border-neutral-200"
                                                >
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sizes.map((row, i) => (
                                            <tr
                                                key={row?.id}
                                                className={i % 2 === 1 ? "bg-neutral-100" : "bg-white"}
                                            >
                                                <td className="px-4 py-3 text-neutral-700">{row?.title}</td>
                                                <td className="px-4 py-3 text-neutral-700">{row?.US}</td>
                                                <td className="px-4 py-3 text-neutral-700">{row?.UK}</td>
                                                <td className="px-4 py-3 text-neutral-700">{row?.EU}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
}
