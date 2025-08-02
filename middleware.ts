import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server';

//console.log("working");

// Create a new ratelimiter, that allows 10 requests per 10 seconds
 export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "30 s"), // allow p1 requests per p2 seconds
});

export async function middleware(req: NextRequest){
    const ipHeader = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
    const ip = ipHeader ? ipHeader.split(',')[0].trim() : 'unknown';

    const { success } = await ratelimit.limit(ip);

    if(!success){
        return NextResponse.json({ error: "Too many requests. Try again later. " }, { status: 429 })
    }
    
    return NextResponse.next();
};


export const config = {
  matcher: ['/api/:path*'],
};

