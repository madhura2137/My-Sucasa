"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

type UserType = 'buyer' | 'renter' | 'landlord' | 'investor' | 'seller';

interface UserTypeSelectorProps {
  onSelect: (type: UserType) => void;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ onSelect }) => {

  const userTypes = [
    { 
      type: 'buyer' as UserType, 
      title: "Buyer", 
      description: "I want to buy a property",
      icon: '🏠',
      color: 'from-cyan-500 to-blue-600',
      aiFeature: 'Smart Property Matching'
    },
    { 
      type: 'renter' as UserType, 
      title: "Renter", 
      description: "I want to rent a property",
      icon: '🏘️',
      color: 'from-teal-500 to-cyan-600',
      aiFeature: 'AI Rental Analysis'
    },
    { 
      type: 'landlord' as UserType, 
      title: "Landlord", 
      description: "I want to list my property for rent",
      icon: '🏢',
      color: 'from-purple-500 to-indigo-600',
      aiFeature: 'Smart Pricing AI'
    },
    { 
      type: 'investor' as UserType, 
      title: "Investor", 
      description: "I'm looking for investment opportunities",
      icon: '📈',
      color: 'from-blue-500 to-purple-600',
      aiFeature: 'Market Prediction AI'
    },
    { 
      type: 'seller' as UserType, 
      title: "Seller", 
      description: "I want to sell my property",
      icon: '💰',
      color: 'from-indigo-500 to-purple-600',
      aiFeature: 'AI Valuation Engine'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="relative inline-block">
          <h2 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            What are you looking for?
          </h2>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
        </div>
        <p className="text-xl text-cyan-200/80 mt-6">
          Choose your requirement to get started with our AI-powered real estate assistant.
        </p>
        <div className="mt-4 inline-flex items-center px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-400/30">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2"></span>
          <span className="text-cyan-300 text-sm font-mono">AI-Powered Recommendations</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {userTypes.map((userType, index) => (
          <div
            key={userType.type}
            className="group relative overflow-hidden bg-black/20 backdrop-blur-lg border border-cyan-400/30 rounded-2xl p-6 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
            onClick={() => onSelect(userType.type)}
          >
            {/* AI Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzAgMzBjMC04LjI4LTYuNzItMTUtMTUtMTVTMCAyMS43MiAwIDMwczYuNzIgMTUgMTUgMTUgMTUtNi43MiAxNS0xNXptMTUgMGMwLTguMjgtNi43Mi0xNS0xNS0xNXMtMTUgNi43Mi0xNSAxNSA2LjcyIDE1IDE1IDE1IDE1LTYuNzIgMTUtMTV6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
            </div>
            
            {/* AI Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${userType.color} flex items-center justify-center text-4xl mb-4 transform transition-all duration-300 group-hover:scale-110`}>
                {userType.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">{userType.title}</h3>
              <p className="text-cyan-200/80 text-center">{userType.description}</p>
              <div className="mt-4 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-400/30">
                <span className="text-cyan-300 text-sm font-mono">{userType.aiFeature}</span>
              </div>
            </div>
            
            {/* AI Accent */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 right-4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

    