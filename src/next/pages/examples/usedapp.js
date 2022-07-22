import { formatEther } from '@ethersproject/units'
import { TextButton } from '../../components/examples/misc.js'
import { DAppProvider, useEtherBalance, useEthers } from '@usedapp/core'

const dappConfig = {}

function DAppBase({ children }) {
  return <DAppProvider config={dappConfig}>
    {children}
  </DAppProvider>
}

function DAppComponent() {
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account)
  return (
    <DAppBase>
      <div>
        <TextButton onClick={() => activateBrowserWallet()}>Connect</TextButton>
      </div>
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
    </DAppBase>
  )
}

export default function DAppPage() {
  return <DAppBase>
    <DAppComponent />
  </DAppBase>
}
