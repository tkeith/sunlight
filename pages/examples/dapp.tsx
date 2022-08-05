import { TextButton } from '../../components/examples/misc'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { useSendTransaction } from 'wagmi'
import { BigNumber } from 'ethers'
import RequireWalletContainer from '../../components/examples/RequireWalletContainer'

function ConnectedInfo() {
  const { address } = useAccount();
  const { chain } = useNetwork()
  const { data: balanceData } = useBalance({
    addressOrName: address,
    watch: true,
  });

  const { data, isIdle, isError, isLoading, isSuccess, sendTransaction } =
    useSendTransaction({
      request: {
        to: '0x108C9FCd65e80c9999B34F85888861B4E20AA54d',
        value: BigNumber.from('1'), // 1 wei
      },
    });

  return <>
    <p>
      Connected to {address}
    </p>
    <p>
      Balance: {balanceData?.formatted}
    </p>
    <p>
      Network: {chain?.name}
    </p>
    {isIdle && (
      <TextButton disabled={isLoading} onClick={() => sendTransaction()}>
        Send Transaction
      </TextButton>
    )}
    {isLoading && <div>Check Wallet</div>}
    {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    {isError && <div>Error sending transaction</div>}
  </>
}

export default function DAppPage() {
  return (
    <RequireWalletContainer>
      <ConnectedInfo />
    </RequireWalletContainer>
  )
}
