import { RateLimiterRedis } from "rate-limiter-flexible"
import Client from "ioredis";

const redisClient = new Client({ host: "redis" })

const getRateLimiter = (key, points, duration) => new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: key,
  points: points,
  duration: duration / 1000,
})

export default getRateLimiter
