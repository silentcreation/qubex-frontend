import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet } from 'wagmi/connectors'
import { injected } from 'wagmi/connectors'
// import { metaMask } from 'wagmi/connectors'
import { walletConnect } from 'wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_REOWN_PROJECT_ID!;

console.log("projectId", projectId)

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    coinbaseWallet(),
    walletConnect({
      projectId: projectId,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
