
export const fetchWeather = async (location: string) => {
    const res = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
    return res.json();
};
