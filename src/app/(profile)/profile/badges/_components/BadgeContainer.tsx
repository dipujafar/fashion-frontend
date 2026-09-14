import { IBadge } from '@/types';
import React from 'react'
import { Badge } from './BadgesItems';

async function BadgeContainer({ req_promise }: { req_promise: Promise<{ data: IBadge[] }> }) {
    const badges = await req_promise;

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {badges?.data?.map((badge) => (
                    <Badge key={badge?.id} badge={badge} />
                ))}
            </div>
        </div>
    )
}

export default BadgeContainer