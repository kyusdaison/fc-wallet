import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ChatsModule } from './CommsModule';

const CitizenCommsModule = ({ onSelectChat, onOpenScanner }) => {
  return (
    <motion.div key="citizen-comms" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} style={{ display: 'flex', flexDirection: 'column', gap: '0px', height: '100%' }}>
      <ChatsModule onSelectChat={onSelectChat} onOpenScanner={onOpenScanner} />
    </motion.div>
  );
};

export default CitizenCommsModule;
