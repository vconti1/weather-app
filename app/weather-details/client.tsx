"use client";

import { format } from 'date-fns';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { ForecastItem } from "../components/ui/Forecast";
import { ThreeDayForeCastItem } from "../components/ui/ThreeDayForecast";
import { FeelsLikeItem } from "../components/ui/FeelsLike";
import { UVIndexItem } from "../components/ui/UVIndex";
import { AirQualityItem } from "../components/ui/AirQuality";
import { fetchWeather } from '@/services/fetchWeather';
import { PM10_LEVELS, UV_LEVELS } from '@/lib/data';

export default function WeatherDetailsClient() {

  const searchParams = useSearchParams();
  const location = searchParams.get('location');

  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<any>(null);
  const [input, setInput] = useState('');
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const res = await fetchWeather(input);
      setData(res);
      if(!res.error){
      router.push(`/weather-details?location=${encodeURIComponent(input)}`);
      setError(null);
      }
      else{
        setError('Could not fetch weather data. Make sure the city or zip code you are entering is valid.');
      }
  }

  function nextThreeDays(){
    if (!weather || !weather.forecast || !weather.forecast.forecastday) {
      return []; 
    }
    let threeDays: any[] = [];
    const daysToGet = 3;
    let dayInfo;

    for(let i = 0; i < daysToGet; i++){
      dayInfo = weather.forecast.forecastday[i];
      const [year, month, day] = dayInfo.date.split('-').map(Number);
      const localDate = new Date(year, month - 1, day); // month is 0-indexed

      if(threeDays.length===0){
        const customDay = {
        day_name: `Today`, //EEE means short form i.e. Mon or Fri
        temp_low: dayInfo.day.mintemp_f,
        temp_high: dayInfo.day.maxtemp_f,
        icon: `https:${dayInfo.day.condition.icon.replace("64x64", "128x128")}`,
      };
      threeDays.push(customDay);
      }else{
      const customDay = {
        day_name: format(localDate, 'EEE'), //EEE means short form i.e. Mon or Fri
        temp_low: dayInfo.day.mintemp_f,
        temp_high: dayInfo.day.maxtemp_f,
        icon: `https:${dayInfo.day.condition.icon.replace("64x64", "128x128")}`,
      };
      threeDays.push(customDay);
      }
    }
    return threeDays;
  }
  const threeDaysData = nextThreeDays();

  function nextTwentyFourHours(){

    if (!weather || !weather.location || !weather.location.localtime) {
      return []; 
    }
    let forecastOfTheDay: any[] = [];
    const nextHours = 24;
    const localTimeString = weather.location.localtime.split(' ')[1]; // looks like "15:00", "0:00", "7:00" etc. (goes up to "23:00")
    let hour = parseInt(localTimeString?.split(':')[0], 10);
    let hourInfo;

   for(let i = 0, day = 0; i < nextHours; i++, hour++){

    if(forecastOfTheDay.length === 0){
      hourInfo = weather.forecast.forecastday[day].hour[hour];
      const customHour = {
        time: `Now`, 
        temp_f: hourInfo.temp_f,
        icon: `https:${hourInfo.condition.icon}`,
        chance_of_rain: hourInfo.chance_of_rain,
      };
      forecastOfTheDay.push(customHour);
    }else if(hour===24){
      day = 1; // index of following day
      hour = 0; //reset clock
      hourInfo = weather.forecast.forecastday[day].hour[hour];
      const customHour = {
        time: `12AM`, //can only ever be 12AM due to conditional
        temp_f: hourInfo.temp_f,
        icon: `https:${hourInfo.condition.icon}`,
        chance_of_rain: hourInfo.chance_of_rain,
      };
       forecastOfTheDay.push(customHour);
    }else if(hour===12){
      const customHour = {
        time: `12PM`, //can only ever be 12PM due to conditional
        temp_f: hourInfo.temp_f,
        icon: `https:${hourInfo.condition.icon}`,
        chance_of_rain: hourInfo.chance_of_rain,
      };
       forecastOfTheDay.push(customHour);
    }else{
      hourInfo = weather.forecast.forecastday[day].hour[hour];
      const customHour = {
        time: hour > 12 ? `${(hour-12).toString()}PM` : `${hour.toString()}AM`,
        temp_f: hourInfo.temp_f,
        icon: `https:${hourInfo.condition.icon}`,
        chance_of_rain: hourInfo.chance_of_rain,
      };
       forecastOfTheDay.push(customHour);
      }
    }
    return forecastOfTheDay;
  }
  const nextTwentyFourHoursData = nextTwentyFourHours();
  //console.log(result);

  function uvInfo(uv:number): {risk:string; info:string}{
    const uvData =  UV_LEVELS?.find(level => uv >= level.min && uv <= level.max);
    if(uvData){
    return { risk: uvData.risk, info: uvData.info }; 
    }
      return { risk: 'Unknown', info: 'UV data unavailable.' };
  }

  function airQualityInfo(pm10: number): { category: string; info: string } {
    const airQualityData = PM10_LEVELS?.find(level => pm10 <= level.max);

    if(airQualityData){
      return {category: airQualityData.category, info: airQualityData.info};
    }

    return {
      category: 'Unknown',
      info: 'Air quality data unavailable or invalid.'
    };
}


  return (
    <div className="p-8 items-center grid grid-cols-1">
      <div className = "flex flex row items-center justify-center mb-10 font-mono">
      <h1 className="text-4xl text-center flex-row px-10">Better Weather</h1>
      <form onSubmit={handleSubmit} className = "max-w-sm flex flex-row">
            <input
            type = "text"
            placeholder="Enter city or zipcode"
            value={input}
            onChange={((e) => setInput(e.target.value))}
            className="border p-2 rounded w-full"
            />
           </form>
           
          </div>

      {error && <p className="text-red-500 text-center pb-10">{error}</p>}

      {!weather && !error && <p className = "text-5xl text-center items-center justify-center">Loading...</p>}

      

      {/* BENTO GRID CONTAINER */}
      {weather && (
        <div className = "grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[2fr_1fr] max-w-5xl mx-auto items-stretch">

            <div className="flex flex-col gap-5 max-w-2xl ">
            <ForecastItem
            className="w-full flex-grow"
            //header = {weather.location.country}
            region = {`${weather.location.country}, ${weather.location.region}`}
            city = {weather.location.name}
            temp = {`${weather.current.temp_f}°`}
            tempRange = {`H: ${weather.forecast.forecastday[0].day.maxtemp_f}° L: ${weather.forecast.forecastday[0].day.mintemp_f}°`}
            condition = {`${weather.current.condition.text}`}
            img = {`https:${weather.current.condition.icon.replace("64x64", "128x128")}`}
            data = {nextTwentyFourHoursData}
            />
              <ThreeDayForeCastItem
              className = "w-full overflow-hidden flex-wrap "
              data = {threeDaysData}
              />
            
        </div>

        <div className = "grid grid-rows-[2fr_1fr] gap-5 h-full">
        <div className = "grid grid-row-2 h-full gap-5">
        <FeelsLikeItem
        className="w-full h-full"
        title = {`Feels like`}
        temp = {`${weather.current.feelslike_f}°`}
        description = {weather.current.feelslike_f > weather.current.temp_f ? `It feels warmer than the actual temperature.` : `It feels cooler than the actual temperature.`}
        />
        <div className = "flex flex-col gap-5">
        <UVIndexItem
          className="w-full h-full"
          title = {`UV Index`}
          uv = {weather.current.uv}
          risk = {uvInfo(weather.current.uv).risk}
          info = {uvInfo(weather.current.uv).info}
        />
        </div>
        </div>
        
          <AirQualityItem
          className="w-full h-full"
          title = {`Air Quality`}
          risk = {airQualityInfo(weather.current.air_quality.pm10).category}
          airQuality={weather.current.air_quality.pm10}
          info = {airQualityInfo(weather.current.air_quality.pm10).info}
          />

        </div>
        </div>
        
      )}
    </div>
  );
}