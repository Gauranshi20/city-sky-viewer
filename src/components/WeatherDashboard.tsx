
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import ThemeToggle from './ThemeToggle';
import { getWeatherByCity, WeatherData, getWeatherBackgroundClass } from '@/services/weatherService';
import { useToast } from '@/hooks/use-toast';
import { History, RefreshCw } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundClass, setBackgroundClass] = useState('weather-gradient-default');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('weatherSearchHistory') || '[]');
    setSearchHistory(storedHistory);
    
    // Automatically search for a default city if there's no weather data
    if (!weatherData && storedHistory.length > 0) {
      handleSearch(storedHistory[0]);
    } else if (!weatherData) {
      // Default to a major city if no history
      handleSearch('London');
    }
  }, []);

  const handleSearch = async (city: string) => {
    if (!city.trim()) return;
    
    setIsLoading(true);
    try {
      console.log(`Fetching weather data for: ${city}`);
      const data = await getWeatherByCity(city);
      console.log('Weather data received:', data);
      
      setWeatherData(data);
      setBackgroundClass(getWeatherBackgroundClass(data.condition));
      
      // Update search history
      const updatedHistory = [city, ...searchHistory.filter(item => item.toLowerCase() !== city.toLowerCase())];
      const limitedHistory = updatedHistory.slice(0, 5);
      setSearchHistory(limitedHistory);
      localStorage.setItem('weatherSearchHistory', JSON.stringify(limitedHistory));
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
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

  const refreshWeather = async () => {
    if (weatherData) {
      handleSearch(weatherData.city);
    }
  };

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-500 ${backgroundClass} ${theme === 'dark' ? 'dark-weather' : ''}`}
    >
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full w-10 h-10 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-800/60 transition-all"
            >
              <History className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-background/90 dark:bg-gray-800/90 backdrop-blur-lg">
            <div className="py-6">
              <h3 className="text-lg font-medium mb-4">Search History</h3>
              <div className="space-y-2">
                {searchHistory.length > 0 ? (
                  searchHistory.map((city, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleSearch(city)}
                    >
                      {city}
                    </Button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No search history yet</p>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md text-center mb-8 relative">
        <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-md animate-fade-in">
          Weather Dashboard
        </h1>
        <p className="text-white/80 mb-6">Check the current weather in any city</p>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </div>
      
      {isLoading ? (
        <div className="w-full max-w-md h-64 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-foreground">Fetching weather data...</p>
          </div>
        </div>
      ) : weatherData ? (
        <div className="relative w-full max-w-md">
          <WeatherCard data={weatherData} />
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute -top-2 -right-2 rounded-full w-9 h-9 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
            onClick={refreshWeather}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-md p-8 bg-background/80 backdrop-blur-sm rounded-lg text-center animate-fade-in">
          <p className="text-foreground">
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
