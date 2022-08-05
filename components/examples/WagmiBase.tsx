import { WagmiConfig, createClient } from 'wagmi'
import { configureChains, chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { connectorsForWallets, RainbowKitProvider, wallet } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, provider, webSocketProvider } = configureChains([
  chain.polygon,
], [
  publicProvider(),
]);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      wallet.metaMask({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function DAppBase({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
