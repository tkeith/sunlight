import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import DAppBase from "./WagmiBase";
import WalletNotConnectedWarning from "./WalletNotConnectedWarning";
import useIsMounted from '../../hooks/useIsMounted.js'

function Wrapper({ children }) {
  const { isConnected } = useAccount();
  const isMounted = useIsMounted();

  return (
    <>
      <ConnectButton />
      {isMounted && isConnected && children}
      {isMounted && !isConnected && <WalletNotConnectedWarning />}
    </>
  )
}

export default function RequireWalletContainer({children}) {
  return (
    <DAppBase>
      <Wrapper>
        {children}
      </Wrapper>
    </DAppBase>
  )
}
