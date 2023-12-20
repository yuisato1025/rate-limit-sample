'use server';

import { Ratelimit } from '@upstash/ratelimit'; // for deno: see above
import { Redis } from '@upstash/redis';

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: '@upstash/ratelimit',
});

// Use a constant string to limit all requests with a single ratelimit
// Or use a userID, apiKey or ip address for individual limits.
const identifier = 'api';

export async function process() {
  const date = new Date();
  const time = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const { success } = await ratelimit.limit(identifier);

  if (!success) {
    console.log({ time: time, status: 'ratelimit exceeded' });
  } else {
    console.log({ time: time, status: 'success' });
  }
}
