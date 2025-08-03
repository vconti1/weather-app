'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { BentoGridItem } from "../components/ui/BentoGrid";


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
    <div className="p-8 items-center">
      <h1 className="text-4xl font-mono mb-4 text-center">Better Weather</h1>  {/* Causes error when looking into api call since it hasnt processed yet on this line */}

      {error && <p className="text-red-500">{error}</p>}

      {!weather && !error && <p>Loading...</p>}

      {/* BENTO GRID CONTAINER */}
      {weather && (
        <div className = "flex flex-col px-25 pt-10">

            <div>
            <BentoGridItem className = "h-110 w-150"
            //header = {weather.location.country}
            title = {weather.location.name}
            temp = {`${weather.current.temp_f}°`}
            tempRange = {`H:${weather.forecast.forecastday[0].day.maxtemp_f}° L:${weather.forecast.forecastday[0].day.mintemp_f}°`}
            condition = {`${weather.current.condition.text}`}
            img = {`https:${weather.current.condition.icon.replace("64x64", "128x128")}`}
            />
            </div>

            <div className = "pt-5">
              <BentoGridItem className = "h-60 w-150"
              
              />
            </div>



        </div>
      )}
    </div>
  );
}