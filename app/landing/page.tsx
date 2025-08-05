'use client'

import { fetchWeather } from "@/services/fetchWeather";
import { useState } from 'react';
import { useRouter } from 'next/navigation';



export default function LandingPage() {

const [data, setData] = useState<any>(null);
const [input, setInput] = useState('');
const [error, setError] = useState('');
const router = useRouter();


const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetchWeather(input);
    setData(res);
    if(!res.error){
    router.push(`/weather-details?location=${encodeURIComponent(input)}`);
    }
    else{
      setError('Could not fetch weather data. Make sure the city or zip code you are entering is valid.');
    }
}

  return (
    <div className = "flex flex-col items-center pt-90 font-mono">
      <h1 className = "center text-center text-6xl">Better Weather</h1>
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
           {error && (
            <p className="text-red-500 mt-10 text-sm">{error}</p>
            )}
    </div>
  );
}