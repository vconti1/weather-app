'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { BentoGridItem } from "../components/ui/bentogrid";

export default function WeatherDetailsPage() {

  const searchParams = useSearchParams();
  const location = searchParams.get('location');

  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch');
        }

        setWeather(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, [location]);


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Weather for {weather.location.name}</h1>

      {error && <p className="text-red-500">{error}</p>}

      {!weather && !error && <p>Loading...</p>}

      {weather && (
        <div className = "flex flex-col">
          <BentoGridItem className = "h-100 w-150 ">

          </BentoGridItem>
          <BentoGridItem className = "h-100 w-150 ">

          </BentoGridItem>
        </div>
      )}
    </div>
  );
}