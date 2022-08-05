import { TextButton } from '../../components/examples/misc'
import { DAppProvider, useEthers } from '@usedapp/core'
import { ReactNode } from 'react'

const dappConfig = {}

function DAppBase({ children }: { children: ReactNode }) {
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
