
"use client";

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

interface ChatBubbleProps {
  onClick: () => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0, y: 100 }}
      transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 120 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <Button
        onClick={onClick}
        className="w-16 h-16 rounded-full shadow-lg"
      >
        <MessageSquare className="h-8 w-8" />
      </Button>
    </motion.div>
  );
};

    