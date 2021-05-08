import React from 'react'
import Layout from './src/components/Layout/Layout'

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

// trigger an immediate page refresh when an update is found
export const onServiceWorkerUpdateReady = () => window.location.reload()
