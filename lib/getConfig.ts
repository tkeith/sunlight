import { readFileSync } from 'fs'
import callOnce from './callOnce'

const getConfig = callOnce(() => {
  const cfg = JSON.parse(readFileSync('/opt/runtime-config.json').toString())
  // handled in `run` script
  // cfg.deployment = JSON.parse(readFileSync('/opt/deployment.json').toString())
  return cfg
});

export default getConfig
