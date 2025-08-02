
export const fetchWeather = async (location: string) => {
  const res = await fetch(`/api/weather?query=${encodeURIComponent(location)}`);
  if (!res.ok){
     throw new Error("Failed to fetch weather data");
  }
  return res.json();
};

  //const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&lang=English`; 