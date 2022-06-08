import Client from "ioredis";
import Redlock from "redlock";

const redisClient = new Client({ host: "redis" })

const params = {
  driftFactor: 0.01,
  retryCount: -1,
  retryDelay: 200,
  retryJitter: 200,
  automaticExtensionThreshold: 1000,
}

const redlock = new Redlock(
  [redisClient],
  params
)

export default redlock
