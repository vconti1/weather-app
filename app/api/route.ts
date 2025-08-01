import { redis } from "@/lib/db";
import { ratelimit } from "@/middleware/middleware"
import { NextResponse } from "next/server";



export const GET = async () => {
    const result = await redis.get('foo');
    //const ip = getClientIp(req: Request) || 'unknown';

    const ratelimitResult = await ratelimit.limit('test');

    if(!ratelimitResult.success){
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    return NextResponse.json({
        result,
        ratelimitResult,
    });
}




