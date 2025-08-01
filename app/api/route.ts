import { redis } from "@/lib/db";
import { NextResponse } from "next/server";
import { ratelimit } from "@/middleware"



export const GET = async () => {
    const result = await redis.get('foo');

    return NextResponse.json({ data: result });
    
}




