import React from 'react';
import { ClockCounterClockwise } from 'phosphor-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const HistoryList = ({ history, onSelectCity }) => {
  if (!history || history.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="w-full space-y-4 pt-4"
    >
      <div className="flex items-center space-x-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">
        <ClockCounterClockwise size={14} />
        <span>Recent Searches</span>
      </div>
      <div className="flex flex-col space-y-2">
        <AnimatePresence>
          {history.map((item, index) => (
            <motion.div
              key={`${item.city}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                onClick={() => onSelectCity(item.city)}
                className="w-full justify-between h-auto py-3 px-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all font-normal text-base group"
              >
                <span className="group-hover:translate-x-1 transition-transform">{item.city}, {item.country}</span>
                <span className="bg-white/10 px-2 py-0.5 rounded text-sm text-cyan-200 font-medium">{item.temp}&deg;</span>
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HistoryList;
