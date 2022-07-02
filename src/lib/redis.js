import { createClient } from 'redis';
import callOnce from './callOnce.js';

const getRedis = callOnce(async () => {
  const client = createClient({
    url: 'redis://redis:6379'
  })
  try {
    await client.connect()
    return client
  } catch (err) {
    await new Promise(r => setTimeout(r, 1000))
    return await connect()
  }
});

export default getRedis
