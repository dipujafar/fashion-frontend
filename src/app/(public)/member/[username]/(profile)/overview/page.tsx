import { CharityDonationFormDialog } from '@/components/shared/Modal/Charity/CharityDonationFormDialog';
import { Globe, Mail } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

async function CharityDetails({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;

    return (
        <div>
            <div className='grid grid-cols-3 gap-2'>

                <div className='col-span-2'>

                </div>
                <div className='col-span-1 space-y-3'>
                    <div className="rounded-2xl bg-[#0f172a] text-white p-5 shadow-sm">
                        <div className="text-[10px] uppercase tracking-wider text-[#64748b] mb-1 font-semibold">Ready to give?</div>
                        <div className="text-lg font-bold mb-1 leading-tight" style={{ textWrap: "pretty" }}>100% goes to this charity</div>
                        <p className="text-[12.5px] text-white mb-4 leading-relaxed">FASHION doesn't take a cut. Donate directly on their site.</p>

                        <CharityDonationFormDialog>
                            <button className="block text-center w-full bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold py-2.5 rounded-xl text-sm cursor-pointer">
                                Make your donation
                            </button>
                        </CharityDonationFormDialog>
                    </div>

                    <div className="rounded-lg bg-white border border-[#e2e8f0] p-4 shadow-sm">
                        <div className="text-base text-gray-700 mb-3 font-semibold">Contact</div>
                        <div className="space-y-2 text-[12.5px]">

                            <div className="space-y-2.5">

                                <div className="flex items-center gap-2">
                                    <Mail className='size-5' />
                                    <div className="flex flex-col gap-0.5">
                                        <Link target="_blank" href="mailto:xyz@gmail.com" className="text-[#4f46e5] hover:underline text-sm">xyz@gmail.com</Link>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Globe className='size-5' />
                                    <div className="flex flex-col gap-0.5">
                                        <Link target="_blank" href="https://xyz.com" className="text-[#4f46e5] hover:underline text-sm">https://xyz.com</Link>
                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CharityDetails