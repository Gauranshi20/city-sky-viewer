
import React from 'react';
import { WeatherData, getWeatherIconUrl } from '@/services/weatherService';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Thermometer, Droplets, Wind, Compass, Clock } from 'lucide-react';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border-none ring-1 ring-white/10 dark:ring-gray-800/30 animate-fade-in overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 dark:to-primary/10 pointer-events-none" />
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{data.city}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{data.country}</p>
          </div>
          <div className="flex flex-col items-center">
            <img 
              src={getWeatherIconUrl(data.icon)} 
              alt={data.description}
              className="w-16 h-16 drop-shadow-md"
            />
            <span className="text-sm font-medium capitalize">{data.description}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Thermometer className="h-6 w-6 text-red-500" />
              <span className="text-4xl font-bold">{data.temperature}°C</span>
            </div>
            <div className="text-sm bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full text-primary dark:text-primary-foreground">
              Feels like {data.feels_like}°C
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <Droplets className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              <span className="text-sm font-medium">Humidity: {data.humidity}%</span>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/20 p-3 rounded-lg">
              <Wind className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">Wind: {data.wind_speed} m/s</span>
            </div>
            
            <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
              <Compass className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
              <span className="text-sm font-medium">Pressure: {data.pressure} hPa</span>
            </div>
            
            <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
              <Clock className="h-5 w-5 text-orange-500 dark:text-orange-400" />
              <div className="flex flex-col text-xs">
                <span>🌅 Rise: {formatTime(data.sunrise)}</span>
                <span>🌇 Set: {formatTime(data.sunset)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
