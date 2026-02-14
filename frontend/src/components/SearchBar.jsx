import React, { useState } from 'react';
import { MagnifyingGlass } from 'phosphor-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      onSubmit={handleSubmit} 
      className="w-full space-y-2"
    >

      
      <div className="flex w-full items-center space-x-3">
        <div className="relative w-full">
          <MagnifyingGlass className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="city-input"
            type="text"
            className="pl-10 h-11 bg-background/50 backdrop-blur-sm border-white/10 text-base shadow-sm transition-all focus:border-blue-500/50"
            placeholder="e.g. London, Tokyo..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <Button 
          type="submit" 
          className="shrink-0 h-11 px-6 rounded-lg bg-white text-black hover:bg-gray-100 font-semibold shadow-lg shadow-white/10 transition-all hover:scale-105"
        >
          Check Weather
        </Button>
      </div>
    </motion.form>
  );
};

export default SearchBar;
