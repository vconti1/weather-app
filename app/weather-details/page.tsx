'use client';

import { format } from 'date-fns';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { ForecastItem } from "../components/ui/Forecast";
import { ThreeDayForeCastItem } from "../components/ui/ThreeDayForecast";
import { FeelsLikeItem } from "../components/ui/FeelsLike";
import { UVIndexItem } from "../components/ui/UVIndex";
import { AirQualityItem } from "../components/ui/AirQuality";


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
      };
       forecastOfTheDay.push(customHour);
    }else if(hour===12){
      const customHour = {
        time: `12PM`, //can only ever be 12PM due to conditional
        temp_f: hourInfo.temp_f,
        icon: `https:${hourInfo.condition.icon}`,
      };
       forecastOfTheDay.push(customHour);
    }else{
      hourInfo = weather.forecast.forecastday[day].hour[hour];
      const customHour = {
        time: hour > 12 ? `${(hour-12).toString()}PM` : `${hour.toString()}AM`,
        temp_f: hourInfo.temp_f,
        icon: `https:${hourInfo.condition.icon}`,
      };
       forecastOfTheDay.push(customHour);
      }
    }
    return forecastOfTheDay;
  }
  const nextTwentyFourHoursData = nextTwentyFourHours();
  //console.log(result);

  function uvInfo(uv:number): {risk:string; info:string}{

    if (uv <= 2) {
      return {
        risk: 'Low',
        info: 'No protection needed unless sensitive skin. Sunglasses optional.'
      };
    }
    if (uv > 2 && uv <= 5) {
      return {
        risk: 'Moderate',
        info: 'Wear sunscreen, hat, sunglasses. Seek shade at midday.'
      };
    }
    if (uv > 5 && uv <= 7) {
      return {
        risk: 'High',
        info: 'Wear sunscreen, long sleeves, wide-brim hat. Reapply sunscreen every 2 hours.'
      };
    }
    if (uv > 7 && uv <= 10) {
      return {
        risk: 'Very High',
        info: 'SPF 50+, minimize sun exposure (10am–4pm). Stay in shade.'
      };
    }
    if (uv > 10) {
      return {
        risk: 'Extreme',
        info: 'Avoid sun if possible. Full protection: SPF 50+, UPF clothes, hat, sunglasses.'
      };
    }
      return { risk: 'Unknown', info: 'UV data unavailable.' };
  }

  function airQualityInfo(pm10: number): { category: string; info: string } {
  if (pm10 <= 54) {
    return {
      category: 'Good',
      info: 'Air quality is considered satisfactory; air pollution poses little or no risk.'
    };
  }
  if (pm10 <= 154) {
    return {
      category: 'Moderate',
      info: 'Air quality is acceptable; some pollutants may be a concern for a small number of people.'
    };
  }
  if (pm10 <= 254) {
    return {
      category: 'Unhealthy for Sensitive Groups',
      info: 'Sensitive groups may experience health effects; the general public is unlikely to be affected.'
    };
  }
  if (pm10 <= 354) {
    return {
      category: 'Unhealthy',
      info: 'Everyone may begin to experience health effects; sensitive groups may experience more serious effects.'
    };
  }
  if (pm10 <= 424) {
    return {
      category: 'Very Unhealthy',
      info: 'Health alert: everyone may experience more serious health effects.'
    };
  }
  if (pm10 > 424) {
    return {
      category: 'Hazardous',
      info: 'Health warnings of emergency conditions. The entire population is more likely to be affected.'
    };
  }
  return {
    category: 'Unknown',
    info: 'Air quality data unavailable or invalid.'
  };
}


  return (
    <div className="p-8 items-center">
      <h1 className="text-4xl font-mono mb-10 text-center">Better Weather</h1>  {/* Causes error when looking into api call since it hasnt processed yet on this line */}

      {error && <p className="text-red-500">{error}</p>}

      {!weather && !error && <p>Loading...</p>}

      {/* BENTO GRID CONTAINER */}
      {weather && (
        <div className = "justify-center flex flex-row">
        <div className = "flex flex-col pl-25">

            <div>
            <ForecastItem className = "h-110 w-150"
            //header = {weather.location.country}
            title = {weather.location.name}
            temp = {`${weather.current.temp_f}°`}
            tempRange = {`H: ${weather.forecast.forecastday[0].day.maxtemp_f}° L: ${weather.forecast.forecastday[0].day.mintemp_f}°`}
            condition = {`${weather.current.condition.text}`}
            img = {`https:${weather.current.condition.icon.replace("64x64", "128x128")}`}
            data = {nextTwentyFourHoursData}
            />
            
            </div>
            <div className = "pt-5">
              <ThreeDayForeCastItem className = "h-60 w-150"
              data = {threeDaysData}
              />
            </div>
        </div>
        <div className = "pl-5">
        <FeelsLikeItem className = "h-52 w-56"
        title = {`Feels like`}
        temp = {`${weather.current.feelslike_f}°`}
        description = {weather.current.feelslike_f > weather.current.temp_f ? `It feels warmer than the actual temperature.` : `It feels cooler than the actual temperature.`}
        />
        <div className = "pt-5">
        <UVIndexItem className = "h-53 w-56"
          title = {`UV Index`}
          uv = {weather.current.uv}
          risk = {uvInfo(weather.current.uv).risk}
          info = {uvInfo(weather.current.uv).info}
        />
        </div>
        <div className = "pt-5">
          <AirQualityItem className = "h-60 w-56"
          title = {`Air Quality`}
          risk = {airQualityInfo(weather.current.air_quality.pm10).category}
          airQuality={weather.current.air_quality.pm10}
          info = {airQualityInfo(weather.current.air_quality.pm10).info}
          />
        </div>
        </div>

        </div>
        
      )}
    </div>
  );
}