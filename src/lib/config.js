import { promises } from 'fs'

var _config

const getConfig = async () => {
  if (_config) {
    await _config
  }
  const data = await promises.readFile('/opt/config.json')
  _config = JSON.parse(data)
  console.log(_config)
  return _config
}

export default getConfig
