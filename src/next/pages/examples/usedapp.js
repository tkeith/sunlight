import { TextButton } from '../../components/examples/misc.js'
import { DAppProvider, useEthers } from '@usedapp/core'

const dappConfig = {}

function DAppBase({ children }) {
  return <DAppProvider config={dappConfig}>
    {children}
  </DAppProvider>
}

function DAppComponent() {
  const { activateBrowserWallet, account } = useEthers()
  return (
    <DAppBase>
      <div>
        <TextButton onClick={() => activateBrowserWallet()}>Connect</TextButton>
      </div>
      {account && <p>Account: {account}</p>}
    </DAppBase>
  )
}

export default function DAppPage() {
  return <DAppBase>
    <DAppComponent />
  </DAppBase>
}
