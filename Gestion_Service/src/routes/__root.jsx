import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { CartContext } from '../contexts'
import Index from '.'
import ErrorBoundary from '../components/ErrorBoundary'

export const Route = createRootRoute({
  component: () => {
    const cartHook = useState([])
    return (
      <>
        <CartContext.Provider value={cartHook}>
          <ErrorBoundary>
            <div>
              <Outlet />
            </div>
          </ErrorBoundary>
        </CartContext.Provider>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    )
  }
})
