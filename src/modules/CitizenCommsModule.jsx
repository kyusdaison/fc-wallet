import React from 'react';
import { motion } from 'framer-motion';
import { ChatsModule } from './CommsModule';

const CitizenCommsModule = ({ onSelectChat, onOpenScanner }) => {
  return (
    <motion.div key="citizen-comms" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="module-stack-0">
      <ChatsModule onSelectChat={onSelectChat} onOpenScanner={onOpenScanner} />
    </motion.div>
  );
};

export default CitizenCommsModule;
