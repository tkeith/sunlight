import getConfig from './getConfig'

const baseUrl = () => {
  return getConfig().public.base_url
};

export default baseUrl;
