
export const fetchWeather = async (location: string) => {
    const res = await fetch(`/api/weather?query=${encodeURIComponent(location)}`);
    return res.json();
};
