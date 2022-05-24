import { promises } from 'fs'

const readConfig = async () => {
  const data = await promises.readFile('/opt/config.json')
  const cfg = JSON.parse(data.toString())
  return cfg
}

let cfgPromise

const getConfig = () => {
  if (!cfgPromise) {
    cfgPromise = readConfig()
  }
  return cfgPromise
}

export default getConfig
