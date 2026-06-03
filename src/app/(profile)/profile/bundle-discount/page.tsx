import { EnableBundleCreation } from '@/components/shared/UserProfile/CreateBundle/EnableBundleCreation'
import { GetBundleDiscounts } from '@/lib/services/UserDetails';
import React from 'react'

async function BundleDiscount() {

    const discounts = await GetBundleDiscounts() as { data: { enabled: boolean, tiers: { itemCount: number, discountPercent: number }[] } };

    return (
        <div>
            <EnableBundleCreation discounts={discounts.data} />
        </div>
    )
}

export default BundleDiscount