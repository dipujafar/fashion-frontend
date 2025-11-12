import React from 'react'
import { FeaturedBadge } from './FeaturedBadge'
import { BadgeGrid } from './BadgeCard'
import { CHARITY_BADGES, ECO_BADGES, GENERAL_BADGES } from './data'


export default function BadgesContainer() {
    return (
         <div className="min-h-screen bg-background">
      <main className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Featured Badge Section */}
        <section className="flex flex-col items-center gap-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center text-balance">
            Fashion Philanthropist
          </h1>
          <FeaturedBadge
            icon="💷"
            title="Fashion Philanthropist"
            subtitle="£0 - £1,000"
            description="Recognizes users who have raised or donated over £1,000 through sales or charity contributions — true icons of giving back through fashion."
          />
        </section>

        {/* Divider */}
        <div className="h-1 bg-foreground w-full" />

        {/* General Badges */}
        <section>
          <BadgeGrid badges={GENERAL_BADGES} title="General Badges" />
        </section>

        {/* Divider */}
        <div className="h-1 bg-foreground w-full" />

        {/* Eco Badges */}
        <section>
          <BadgeGrid badges={ECO_BADGES} title="Eco Badges" />
        </section>

        {/* Divider */}
        <div className="h-1 bg-foreground w-full" />

        {/* Charity Badges */}
        <section>
          <BadgeGrid badges={CHARITY_BADGES} title="Charity Store Badges" />
        </section>
      </main>
    </div>
    )
}
