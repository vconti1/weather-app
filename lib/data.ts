
/*
export const RAIN_CODES: number[] = [
  1063, // Patchy rain possible
  1180, // Patchy light rain
  1183, // Light rain
  1186, // Moderate rain at times
  1189, // Moderate rain
  1192, // Heavy rain at times
  1195, // Heavy rain
  1198, // Light freezing rain
  1201, // Moderate or heavy freezing rain
  1240, // Light rain shower
  1243  // Moderate or heavy rain shower
];

export const SNOW_CODES: number[] = [
  1066, // Patchy snow possible
  1114, // Blowing snow
  1204, // Light sleet
  1207, // Moderate or heavy sleet
  1210, // Patchy light snow
  1213, // Light snow
  1216, // Patchy moderate snow
  1219, // Moderate snow
  1222, // Patchy heavy snow
  1225  // Heavy snow
];
*/
export const UV_LEVELS = [
  {
    min: 0,
    max: 2,
    risk: 'Low',
    info: 'No protection needed unless sensitive skin. Sunglasses optional.'
  },
  {
    min: 3,
    max: 5,
    risk: 'Moderate',
    info: 'Wear sunscreen, hat, sunglasses. Seek shade at midday.'
  },
  {
    min: 6,
    max: 7,
    risk: 'High',
    info: 'Wear sunscreen, long sleeves, wide-brim hat. Reapply sunscreen every 2 hours.'
  },
  {
    min: 8,
    max: 10,
    risk: 'Very High',
    info: 'SPF 50+, minimize sun exposure (10am–4pm). Stay in shade.'
  },
  {
    min: 11,
    max: Infinity,
    risk: 'Extreme',
    info: 'Avoid sun if possible. Full protection: SPF 50+, UPF clothes, hat, sunglasses.'
  }
];

export const PM10_LEVELS = [
  {
    max: 54,
    category: 'Good',
    info: 'Air quality is considered satisfactory; air pollution poses little or no risk.'
  },
  {
    max: 154,
    category: 'Moderate',
    info: 'Air quality is acceptable; some pollutants may be a concern for a small number of people.'
  },
  {
    max: 254,
    category: 'Unhealthy for Sensitive Groups',
    info: 'Sensitive groups may experience health effects; the general public is unlikely to be affected.'
  },
  {
    max: 354,
    category: 'Unhealthy',
    info: 'Everyone may begin to experience health effects; sensitive groups may experience more serious effects.'
  },
  {
    max: 424,
    category: 'Very Unhealthy',
    info: 'Health alert: everyone may experience more serious health effects.'
  },
  {
    max: Infinity,
    category: 'Hazardous',
    info: 'Health warnings of emergency conditions. The entire population is more likely to be affected.'
  }
];
