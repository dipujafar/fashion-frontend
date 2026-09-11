"use client"
import { useAccountDataQuery, useBalanceQuery, useConnectAccountMutation } from '@/redux/api/userApi';
import React from 'react'
import { Banknote, CreditCard, Wallet } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function Balance() {

    const { data, isLoading } = useBalanceQuery(undefined, { refetchOnMountOrArgChange: true });

    if (isLoading) {
        return <Skeleton className="h-8 w-32 rounded-md bg-zinc-700" />
    }

    return (
        <p className="text-3xl md:text-4xl font-semibold tracking-tight">
            {data?.data?.balance ? `$ ${data.data.balance}` : "__"}
        </p>
    )
}

export default Balance;

const Account = () => {
    const [connectAccount, { isLoading: isConnecting }] = useConnectAccountMutation();
    const { data, isLoading, isSuccess } = useAccountDataQuery(undefined, { refetchOnMountOrArgChange: true });

    const router = useRouter();

    const handleConnectAccount = async () => {
        try {
            const res = await connectAccount().unwrap();
            if (res?.data?.url) {
                router.push(res.data.url);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to connect account");
        }
    }

    return (
        <>
            <div className="mt-3 md:mt-4 lg:mt-5 flex flex-wrap items-center gap-3">
                {isLoading ? (
                    <>
                        <Skeleton className="h-12 w-32 rounded-md bg-zinc-700" />
                        <Skeleton className="h-12 w-32 rounded-md bg-zinc-700" />
                    </>
                ) : <>

                    {data?.data?.account_last_num && <button
                        // onClick={() => setWithdrawOpen(true)}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-foreground/90 cursor-pointer"
                    >
                        <Banknote className="size-4" />
                        Withdraw
                    </button>}
                    <button
                        onClick={handleConnectAccount}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary-foreground/10 px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/20 cursor-pointer"
                        disabled={isConnecting}
                    >
                        {isConnecting ? <span className="loader" /> : <>
                            <CreditCard className="size-4" />
                            {data?.data?.account_last_num ? "Change Payout" : "Add Payout"}
                        </>}
                    </button>

                </>}
            </div>
            {isLoading ? <Skeleton className="h-2 w-28 rounded-md mt-3 bg-zinc-700" /> : isSuccess && data?.data?.account_last_num && <p className="mt-4 text-xs text-primary-foreground/60">
                Payout to Chase Checking <span className="text-primary-foreground">{data?.data?.account_last_num}</span>
            </p>}
        </>
    )
}

export const AccountBalance = () => {
    return (
        <div className="relative rounded-xl lg:rounded-2xl bg-primary p-6 text-primary-foreground sm:col-span-3">
            <div className="relative z-10">
                <p className="text-xs font-medium uppercase tracking-widest opacity-80 mb-2">Withdrawable balance</p>
                <Balance />

                <Account />

            </div>
            <Banknote className="absolute -bottom-4 -right-4 h-32 w-32 rotate-12 opacity-10" />
        </div>
    )
}