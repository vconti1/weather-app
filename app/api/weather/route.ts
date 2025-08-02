import { redis } from "@/lib/db";
import { NextResponse } from "next/server";
import { ratelimit } from "@/middleware"
import { fetchWeather } from "@/services/fetchWeather";

export const GET = async (req: Request) => {
    //const result = await redis.get('foo');

    const { searchParams } = new URL(req.url);
    const location = searchParams.get('location');
    const key = process.env.API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&lang=English`;

    if (!location) {
    return NextResponse.json({ error: "Missing query param" }, { status: 400 });
    }

    const cached = await redis.get(location);

    if (cached) {
        return NextResponse.json(cached);
    }

    try {
        const res = await fetch(url);
        const json = await res.json();
        await redis.set(location, json, { ex: 60 * 5 } ); // cache for 5 min
        return NextResponse.json(json);

  } catch (err) {
    console.error("Error fetching weather:", err);
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
    
}




