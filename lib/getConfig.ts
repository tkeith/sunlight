import { readFileSync } from 'fs'
import callOnce from './callOnce'

const getConfig = callOnce(async () => {
  const data = readFileSync('/opt/config.json')
  const cfg = JSON.parse(data.toString())
  return cfg
});

export default getConfig
