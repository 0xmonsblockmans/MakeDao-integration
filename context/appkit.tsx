'use client'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, arbitrum, bscTestnet } from '@reown/appkit/networks'

// 1. Get projectId at https://cloud.reown.com
const projectId = "59ea19a25f36a9421c1982f46f23c649";

// 2. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [bscTestnet],
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function AppKit({children}: {children: React.ReactNode}) {
  return (
    <div>{children}</div>//make sure you have configured the <appkit-button> inside
  )
}