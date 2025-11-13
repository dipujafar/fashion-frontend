import React from 'react'
import { BadgeGrid } from './BadgeCard'
import { CHARITY_BADGES, ECO_BADGES, GENERAL_BADGES } from './data'


export default function BadgesContainer() {
    return (
         <div className="min-h-screen bg-background">
      <main className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16">
  
     
       
        {/* General Badges */}
        <section>
          <BadgeGrid badges={GENERAL_BADGES} title="General Badges" />
        </section>

        {/* Divider */}
        <div className="h-1 bg-foreground w-full" />

        {/* Eco Badges */}
        <section>
          <BadgeGrid badges={ECO_BADGES} title="Eco Friendly Badges" />
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
