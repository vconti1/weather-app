'use client'

import { fetchWeather } from "@/services/fetchWeather";
import { useEffect, useState } from 'react';
import { GET } from "../api/weather/route";
import { NextResponse } from "next/server";


export default function LandingPage() {

const [data, setData] = useState<any>(null);
const [input, setInput] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
    const res = await fetchWeather(input);
    setData(res);
}

  return (
    <div className = "flex flex-col items-center pt-90 font-mono">
      <h1 className = "center text-6xl">Better Weather</h1>
         <h2 className = "text-2xl pt-5">Enter a zip code or city name</h2>
           <form onSubmit={handleSubmit} className = "pt-5 max-width max-h-11">
            <input
            type = "text"
            placeholder="Type here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2 rounded w-full"
            />
           </form>
    </div>
  );
}