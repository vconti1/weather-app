
export const fetchWeather = async(location : String)=>{
    // location may be city name or zip code
    let res;
    const key = process.env.NEXT_PUBLIC_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&lang=English`; 

    try{
         res = await fetch(url);
         const jsonData = await res.json();
        // console.log("this function is working");
         return jsonData;
    }catch(err){
        console.error("Error fetching data.", err);
    }
    return;
}

