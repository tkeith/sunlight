import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { TextButton } from '../../components/examples/misc.js'

export default function DAppPage() {
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account)
  return (
    <div>
      <div>
        <TextButton onClick={() => activateBrowserWallet()}>Connect</TextButton>
      </div>
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
    </div>
  )
}
