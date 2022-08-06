import getConfig from "next/config"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()


export default function Config() {

  return <h1>{JSON.stringify(publicRuntimeConfig)}</h1>
}
