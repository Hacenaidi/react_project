import { createFileRoute, Outlet } from '@tanstack/react-router'

import Home from './Home'
import { useEffect } from 'react'
export const Route = createFileRoute('/')({
  component: () => <Index />
})

function Index() {
  return <Home />
}

export default Index
