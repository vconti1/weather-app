
export const fetchWeatherData = async(location : String)=>{
    // location may be city name or zip code
    const key = process.env.API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`; 

    try{
        const res = await fetch(url);
    }catch(err){
        console.error("Error fetching data.", err);
    }

    return;
}