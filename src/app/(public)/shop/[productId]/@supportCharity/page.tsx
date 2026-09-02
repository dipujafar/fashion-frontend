import { HeartHandshake } from "lucide-react";
import { GetProductCharitySupport } from "@/lib/services/Products";
import Image from "next/image";
import { IUser } from "@/types";
import { defaultImg } from "@/utils/defaultImg";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function CharityImpact({ params }: { params: Promise<{ productId: string }> }) {

    const { productId } = await params;

    const res = await GetProductCharitySupport({ productId }) as {
        data: {
            charities: { charity: IUser }[],
            donation_percent: number,
            donation_amount: number,
        }
    }

    const donation = res?.data?.donation_amount || 0;

    const GLOBAL_DONATION_PERCENT = res?.data?.donation_percent || 0;

    const splitPercent = GLOBAL_DONATION_PERCENT / res?.data?.charities?.length || 0;

    return (
        <section
            className="mt-10"
        >
            <div className="flex flex-wrap items-center gap-4">
                <span className="flex size-11 items-center justify-center rounded-full bg-green-500/10 text-primary">
                    <HeartHandshake className="size-5" aria-hidden />
                </span>
                <div>
                    <h2 id="charity-heading" className="text-lg lg:text-xl font-semibold tracking-tight text-foreground">
                        Where your purchase gives back
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        The seller donates{" "}
                        <strong className="font-semibold text-foreground">
                            {GLOBAL_DONATION_PERCENT.toFixed(2)}% of every sale
                        </strong>{" "}
                        of this item — about ${donation.toFixed(2)} from this order.
                    </p>
                </div>
            </div>

            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {res?.data?.charities?.map((c) => (
                    <li
                        key={c?.charity.fname + c?.charity.lname}
                        className="flex items-center gap-3 rounded-md border border-border bg-card/80 p-3 backdrop-blur"
                    >
                        <Link href={`/member/${c?.charity.userName}`}>
                            <Avatar className="h-12 w-12 shadow-sm">
                                <AvatarImage src={c?.charity?.picture?.url} className='bg-card object-cover ring-4 ring-card shadow' />
                                <AvatarFallback className='text-lg capitalize font-medium'>{c?.charity?.fname.slice(0, 1)}{c?.charity?.lname.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <Link href={`/member/${c?.charity.userName}`}>
                            <div className="min-w-0">
                                <p className="truncate text-base font-semibold">{c?.charity.fname} {c?.charity.lname}</p>
                                <p className="text-sm text-muted-foreground">
                                    {splitPercent.toFixed(2)}% of the donation · ${((donation * splitPercent) / 100).toFixed(2)}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default CharityImpact;