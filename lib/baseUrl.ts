import getConfig from './getConfig'

const baseUrl = async () => {
  const cfg = getConfig();
  if (cfg.domain) {
    return `https://${cfg.domain}`;
  }
  if (cfg.host) {
    return `https://${cfg.host}`;
  }
  return `http://localhost:8000`;
};

export default baseUrl;
