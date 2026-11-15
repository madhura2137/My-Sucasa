
"use client";

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

const ChatBubble: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0, y: 100 }}
      transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 120 }}
      className="fixed bottom-12 right-12 z-[60]"
    >
      <Button
        onClick={onClick}
        className="w-16 h-16 rounded-full shadow-lg"
      >
        <Bot className="h-8 w-8" />
      </Button>
    </motion.div>
  );
};

const ChatWindow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm MySuCasa AI, your intelligent real estate assistant. How can I help you find your perfect property today?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "I'm looking for a 2BHK apartment",
        "Show me properties under &#8377;50,00,000",
        "What are the best neighborhoods for families?",
        "I need investment property advice"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const generateAIResponse = (userInput: string): Message => {
      const input = userInput.toLowerCase();
      
      if (input.includes('2bhk') || input.includes('apartment')) {
        return {
          id: Date.now().toString(),
          text: "I found 15 excellent 2BHK apartments matching your criteria. Based on AI analysis, the top 3 are in premium locations with great appreciation potential. Would you like me to show you detailed comparisons?",
          sender: 'ai',
          timestamp: new Date(),
          suggestions: [
            "Show me the top 3 apartments",
            "What are the price ranges?",
            "Which has the best ROI?",
            "Schedule a virtual tour"
          ]
        };
      }
      
      if (input.includes('5000000') || input.includes('budget')) {
        return {
          id: Date.now().toString(),
          text: "Based on your budget of &#8377;50,00,000, my AI algorithms have identified 28 properties with high value-for-money scores. I've analyzed market trends and found that now is an excellent time to buy in several up-and-coming neighborhoods.",
          sender: 'ai',
          timestamp: new Date(),
          suggestions: [
            "Show me budget-friendly options",
            "Which neighborhoods are appreciating?",
            "What about financing options?",
            "Compare with rental yields"
          ]
        };
      }
      
      if (input.includes('family') || input.includes('neighborhood')) {
        return {
          id: Date.now().toString(),
          text: "For families, I recommend neighborhoods with top-rated schools, parks, and family amenities. My AI has analyzed crime rates, school performances, and future development plans. The top family-friendly areas are Green Valley, Riverside Heights, and Sunshine Meadows.",
          sender: 'ai',
          timestamp: new Date(),
          suggestions: [
            "Tell me about Green Valley",
            "What are school ratings?",
            "Show family properties",
            "What about healthcare facilities?"
          ]
        };
      }
      
      if (input.includes('investment') || input.includes('roi')) {
        return {
          id: Date.now().toString(),
          text: "Excellent choice! My investment AI has analyzed market data, rental yields, and appreciation trends. Currently, commercial properties in downtown areas show 12-15% ROI, while residential properties in developing suburbs offer 8-10% with lower risk.",
          sender: 'ai',
          timestamp: new Date(),
          suggestions: [
            "Show commercial opportunities",
            "What about residential investments?",
            "Market analysis report",
            "Risk assessment"
          ]
        };
      }
      
      // Default response
      return {
        id: Date.now().toString(),
        text: "I understand you're looking for property assistance. My AI can help you find the perfect match based on your preferences, budget, and lifestyle needs. Could you tell me more about what you're looking for?",
        sender: 'ai',
        timestamp: new Date(),
        suggestions: [
          "I want to buy a home",
          "I'm looking to rent",
          "Investment opportunities",
          "Sell my property"
        ]
      };
    };

    const aiResponse = generateAIResponse(text);
    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };


  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-12 right-4 md:right-8 w-[calc(100vw-2rem)] h-[calc(100vh-8rem)] md:w-[400px] md:h-[600px] bg-card border border-border/50 rounded-2xl shadow-2xl z-[70] flex flex-col overflow-hidden"
    >
      {/* AI Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
              </div>
          </div>
          <div>
              <h3 className="font-bold">MySuCasa AI</h3>
              <p className="text-muted-foreground text-xs">Real Estate Assistant</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-muted/50 rounded-full">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 items-end ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'ai' && (
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-muted/50 rounded-bl-none'
              }`}
            >
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: message.text }} />
              {message.suggestions && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(suggestion.replace(/&#8377;/g, '₹'))}
                      className="block w-full text-left p-2 bg-background hover:bg-accent rounded-lg text-xs text-primary transition-colors border"
                      dangerouslySetInnerHTML={{ __html: suggestion }}
                    />
                  ))}
                </div>
              )}
            </div>
              {message.sender === 'user' && (
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="bg-background focus:ring-primary/50"
          />
          <Button
            onClick={() => handleSendMessage(inputText)}
            className="p-2"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};


export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isOpen && <ChatBubble onClick={() => setIsOpen(true)} />}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

    