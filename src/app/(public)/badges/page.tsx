import Container from '@/components/shared/Container'
import React from 'react'
import { BadgesHeader } from './_components/BadgesHeader'
import BadgesContainer from './_components/BadgesContainer'

export default function BadgesPage() {
  return (
    <Container>
        <BadgesHeader />
        <BadgesContainer />
    </Container>
  )
}
