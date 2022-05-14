import '../styles/globals.css'
import { Ropsten, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core'

const dappConfig = {}

function MyApp({ Component, pageProps }) {
  return <DAppProvider config={dappConfig}>
    <Component {...pageProps} />
  </DAppProvider>
}

export default MyApp
