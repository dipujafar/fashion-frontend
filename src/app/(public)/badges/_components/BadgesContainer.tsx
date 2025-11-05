import React from 'react'
import { BADGES } from './data'
import { BadgeCard } from './BadgeCard'

export default function BadgesContainer() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-8">
            {BADGES.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
            ))}
        </div>
    )
}
