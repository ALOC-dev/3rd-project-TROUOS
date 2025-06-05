import { createClient } from 'redis'

const redisClient = createClient({
  url: process.env.REDIS_URL, // ex: redis://localhost:6379
})

redisClient.on('error', (err) => console.error('Redis Client Error', err))

if (!redisClient.isOpen) {
    await redisClient.connect()
}

export default redisClient
