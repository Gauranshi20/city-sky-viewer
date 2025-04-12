
import axios from 'axios';

// OpenWeatherMap API endpoint
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = 'YOUR_API_KEY'; // This should be replaced with your actual API key

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feels_like: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  wind_speed: number;
  pressure: number;
  sunrise: number;
  sunset: number;
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  try {
    // Using units=metric for Celsius
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    const data = response.data;
    
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      pressure: data.main.pressure,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        throw new Error("City not found. Please check the spelling and try again.");
      } 
      throw new Error(`Error fetching weather data: ${error.response.data.message}`);
    }
    throw new Error("Failed to fetch weather data. Please try again later.");
  }
}

// Helper function to get the weather icon URL from OpenWeatherMap
export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Helper to get background class based on weather condition
export function getWeatherBackgroundClass(condition: string): string {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
    return 'weather-gradient-sunny';
  } else if (conditionLower.includes('cloud')) {
    return 'weather-gradient-cloudy';
  } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return 'weather-gradient-rainy';
  } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    return 'weather-gradient-stormy';
  } else if (conditionLower.includes('snow') || conditionLower.includes('ice')) {
    return 'weather-gradient-snowy';
  } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
    return 'weather-gradient-misty';
  } else {
    return 'weather-gradient-default';
  }
}
