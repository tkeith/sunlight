import getConfig from './getConfig'

const baseUrl = () => {
  return getConfig().public.baseUrl
};

export default baseUrl;
