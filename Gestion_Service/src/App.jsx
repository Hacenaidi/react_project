import React from 'react'
import { StrictMode } from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './assets/styles.css'
import ErrorBoundary from './components/ErrorBoundary'

const router = createRouter({ routeTree })
const queryClient = new QueryClient()

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>
  )
}

export default App
