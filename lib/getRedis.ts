import { createClient } from 'redis';
import asyncRetryTimeout from "./asyncRetryTimeout"
import callOnce from './callOnce';

const connect = async () => {
  const client = createClient({
    url: 'redis://redis:6379'
  })
  await client.connect()
  return client
}

const retryer = async () => asyncRetryTimeout(10000, 1000, connect);

const getRedis = callOnce(retryer);

export default getRedis
