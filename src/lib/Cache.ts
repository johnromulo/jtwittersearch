import { Redis } from 'ioredis';

import redisConfig from '@config/redis';
import RedisConfig from '@config/ioredis';

class Cache {
  private redis: Redis;

  constructor() {
    this.redis = new RedisConfig({
      ...redisConfig,
      keyPrefix: 'cache:',
    });
  }

  set(key: string, value: object): Promise<string> {
    // const { expire = 60 * 60 * 24 } = options;
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  async get(key: string): Promise<object> {
    const cached = await this.redis.get(key);

    return cached ? JSON.parse(cached) : null;
  }

  invalidate(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async invalidatePrefix(prefix: string): Promise<number> {
    const keys = await this.redis.keys(`cache:${prefix}:*`);

    const keysWithoutPrefix = keys.map(key => key.replace('cache:', ''));

    return this.redis.del(...keysWithoutPrefix);
  }
}

export default new Cache();
