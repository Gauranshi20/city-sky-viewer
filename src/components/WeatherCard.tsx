
import React from 'react';
import { WeatherData, getWeatherIconUrl } from '@/services/weatherService';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Thermometer, Droplets, Wind, Compass } from 'lucide-react';

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
    <Card className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
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
              className="w-16 h-16"
            />
            <span className="text-sm font-medium capitalize">{data.description}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-red-500" />
              <span className="text-3xl font-bold">{data.temperature}°C</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Feels like {data.feels_like}°C
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span>Humidity: {data.humidity}%</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-gray-500" />
              <span>Wind: {data.wind_speed} m/s</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-yellow-500" />
              <span>Pressure: {data.pressure} hPa</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs">🌅 {formatTime(data.sunrise)}</span>
              <span>|</span>
              <span className="text-xs">🌇 {formatTime(data.sunset)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
