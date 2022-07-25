import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork } from "wagmi";
import DAppBase from "./WagmiBase";
import WalletNotConnectedWarning from "./WalletNotConnectedWarning";
import useIsMounted from '../../hooks/useIsMounted.js'
import WrongChainWarning from "./WrongChainWarning";

function Wrapper({ children }) {
  const { isConnected } = useAccount();
  const isMounted = useIsMounted();
  const { chain } = useNetwork();

  return (
    <>
      <ConnectButton />
      {isMounted && isConnected && !chain.unsupported && children}
      {isMounted && !isConnected && <WalletNotConnectedWarning />}
      {isMounted && isConnected && chain.unsupported && <WrongChainWarning />}
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
