
import React from 'react';
import { Wind, Drop, MapPin, ThermometerSimple } from 'phosphor-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { motion } from 'framer-motion';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
        
        <CardHeader className="relative pb-2">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-2 text-muted-foreground mb-1">
                <MapPin className="h-4 w-4" />
                <span className="text-xs font-semibold tracking-widest uppercase">{weather.country}</span>
              </div>
              <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                {weather.city}
              </CardTitle>
              <CardDescription className="capitalize text-lg font-medium text-blue-200/80 mt-1">
                {weather.description}
              </CardDescription>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-muted-foreground block">
                {new Date(weather.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <div className="mt-2 bg-white/10 rounded-full p-2 w-fit ml-auto backdrop-blur-md">
                 <img 
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
                    alt={weather.description}
                    className="w-10 h-10 -my-2"
                 />
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative">
          <div className="flex items-end justify-between py-6">
            <div className="relative">
              <span className="text-8xl font-black tracking-tighter text-white drop-shadow-2xl">
                {weather.temp}&deg;
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-white/10">
               <div className="rounded-full bg-blue-500/20 p-2.5 text-blue-400 group-hover:scale-110 transition-transform">
                 <Wind size={20} weight="duotone" />
               </div>
               <div className="flex flex-col">
                 <span className="text-xs font-medium text-muted-foreground">Wind Speed</span>
                 <span className="text-lg font-semibold tabular-nums">{weather.windSpeed} <span className="text-xs text-muted-foreground">km/h</span></span>
               </div>
            </div>
            
            <div className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-white/10">
               <div className="rounded-full bg-cyan-500/20 p-2.5 text-cyan-400 group-hover:scale-110 transition-transform">
                 <Drop size={20} weight="duotone" />
               </div>
               <div className="flex flex-col">
                 <span className="text-xs font-medium text-muted-foreground">Humidity</span>
                 <span className="text-lg font-semibold tabular-nums">{weather.humidity}<span className="text-xs text-muted-foreground">%</span></span>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WeatherCard;
