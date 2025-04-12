import React, { useState } from 'react';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import { getWeatherByCity, WeatherData, getWeatherBackgroundClass } from '@/services/weatherService';
import { useToast } from '@/hooks/use-toast';

const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundClass, setBackgroundClass] = useState('weather-gradient-default');
  const { toast } = useToast();

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
      setBackgroundClass(getWeatherBackgroundClass(data.condition));
      // Store the search in localStorage
      const searchHistory = JSON.parse(localStorage.getItem('weatherSearchHistory') || '[]');
      if (!searchHistory.includes(city)) {
        searchHistory.unshift(city);
        // Keep only the last 5 searches
        if (searchHistory.length > 5) {
          searchHistory.pop();
        }
        localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
      }
    } catch (error) {
      let message = 'Failed to fetch weather data';
      if (error instanceof Error) {
        message = error.message;
      }
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-500 ${backgroundClass}`}>
      <div className="w-full max-w-md text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-md">Weather Dashboard</h1>
        <p className="text-white/80 mb-6">Check the current weather in any city</p>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </div>
      
      {isLoading ? (
        <div className="w-full max-w-md h-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Fetching weather data...</p>
          </div>
        </div>
      ) : weatherData ? (
        <WeatherCard data={weatherData} />
      ) : (
        <div className="w-full max-w-md p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Enter a city name to see the current weather
          </p>
        </div>
      )}
      
      <div className="mt-8 text-xs text-white/60">
        Powered by OpenWeatherMap
      </div>
    </div>
  );
};

export default WeatherDashboard;
