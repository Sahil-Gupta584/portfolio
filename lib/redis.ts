import { Redis } from "@upstash/redis";

if (!process.env.UPSTASH_REDIS_URL || !process.env.UPSTASH_REDIS_TOKEN) {
  throw new Error("Missing Upstash Redis environment variables");
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

export const getCache = async (key: string) => {
  return await redis.get(key);
};

export const setCache = async (key: string, value: any, ttl: number = 3600) => {
  return await redis.set(key, JSON.stringify(value), { ex: ttl });
};
