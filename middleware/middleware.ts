import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis'


const requestIp = require('request-ip');

export const ipMiddleware = function(req: Request, res: Response, next: any) {
    const clientIp = requestIp.getClientIp(req); 
    next();
};

// Create a new ratelimiter, that allows 10 requests per 10 seconds
 export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});