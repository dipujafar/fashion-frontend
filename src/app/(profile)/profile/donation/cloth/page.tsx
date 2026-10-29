import { Shirt } from 'lucide-react'
import React from 'react'
import CLothRaisedContainer from './_components/CLothRaisedContainer'

function page() {
    return (
        <div className="pb-10 max-w-4xl">
            {/* Header */}
            <div className="mb-5 md:mb-6 lg:mb-8">
                <div className="flex items-center gap-2">
                    <Shirt className="h-6 w-6 text-muted-foreground" />
                    <h3 className="text-xl font-semibold text-foreground">
                        Cloth Donations Received
                    </h3>
                </div>
                <p className="mt-1 text-sm text-gray-700 max-w-2xl">
                    Review, approve, or decline clothing donations submitted to your
                    charity shop by supporters.
                </p>
            </div>

            <CLothRaisedContainer />
        </div>
    )
}

export default page
