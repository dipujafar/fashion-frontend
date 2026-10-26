"use client"
import { Mail } from "lucide-react";;
import Link from "next/link";
import { useTotalUnreadMsgCountQuery } from "@/redux/api/message.api";

export default function MessageDropDown() {
    const { isSuccess, data } = useTotalUnreadMsgCountQuery();
    const msgCount = data?.data || 0;
    return (
        <>
            <div className="relative">

                <Link href="/inbox">
                    <Mail className="size-[20px] lg:size-[24px]" color="#212121" />
                </Link>

                {(isSuccess && data?.data > 0) && <span className="absolute right-0 top-0 grid min-h-[20px] min-w-[20px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-600 px-[3px] py-0.5 text-[10px] text-white">{msgCount < 100 ? msgCount : `100+`}</span>}

            </div>
        </>
    );
}
