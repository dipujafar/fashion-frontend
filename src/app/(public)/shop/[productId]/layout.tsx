import Container from '@/components/shared/Container';
import React from 'react'

async function ProdDetailsLayout({
    prodDetails,
    questions,
    supportCharity,
    moreFromSeller,
    moreByCategory,
    moreByColor
}: {
    children: React.ReactNode;
    prodDetails: React.ReactNode,
    questions: React.ReactNode,
    supportCharity: React.ReactNode,
    moreFromSeller: React.ReactNode,
    moreByCategory: React.ReactNode,
    moreByColor: React.ReactNode
}) {

    return (
        <Container className='xl:space-y-8 lg:space-y-6 space-y-4'>
            {prodDetails}
            {questions}
            {supportCharity}
            {moreFromSeller}
            {moreByCategory}
            {moreByColor}
        </Container>
    )
}

export default ProdDetailsLayout