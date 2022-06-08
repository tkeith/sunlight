import { createClient } from 'redis';

const connect = async () => {
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
}

let clientPromise

const getRedis = () => {
  if (!clientPromise) {
    clientPromise = connect()
  }
  return clientPromise
}

export default getRedis
