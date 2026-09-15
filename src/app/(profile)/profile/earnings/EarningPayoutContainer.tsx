"use client"

import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import EarningsPayoutsTabs from "./_components/EarningPayoutTab"
import { UserRole } from "@/types"

function EarningPayoutContainer() {
    const user = useSelector((state: RootState) => state.auth.user)

    const isCharityOrg = user?.auth?.role === UserRole.CHARITABLE_ORGANIZATION;

    const isCharityShop = user?.auth?.role === UserRole.CHARITY_SHOP;

    return (
        <div>
            <EarningsPayoutsTabs showPanel={isCharityOrg ? "donation" : isCharityShop ? undefined : "seller"} />
        </div>
    )
}

export default EarningPayoutContainer