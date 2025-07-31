'use client'

import { fetchWeather } from "@/services/fetchWeather";
import { useEffect, useState } from 'react';


export default function Home() {

const [data, setData] = useState<any>(null);

useEffect(()=>{
    async function getWeatherData(){
    const res = await fetchWeather("20879"); // hardcoded zip
    setData(res);
  }
  getWeatherData();
},[]);


  return (
    <div className = "flex flex-col items-center pt-40">
      <h1 className = "center text-6xl">Hello World!</h1>
       <pre className = "pt-50">{JSON.stringify(data)}</pre>
    </div>
  );
}
