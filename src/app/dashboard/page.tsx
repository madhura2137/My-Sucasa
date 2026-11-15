

"use client"

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DashboardCard, DashboardCardProps } from '@/components/DashboardCard';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const BuyerFlow = dynamic(() => import('@/components/BuyerFlow').then(mod => mod.BuyerFlow), { loading: () => <FlowLoader /> });
const RenterFlow = dynamic(() => import('@/components/RenterFlow').then(mod => mod.RenterFlow), { loading: () => <FlowLoader /> });
const SellerFlow = dynamic(() => import('@/components/Seller').then(mod => mod.SellerFlow), { loading: () => <FlowLoader /> });
const InvestorFlow = dynamic(() => import('@/components/InvestorFlow').then(mod => mod.InvestorFlow), { loading: () => <FlowLoader /> });
const ListPropertyForRentFlow = dynamic(() => import('@/components/ListPropertyForRentFlow').then(mod => mod.ListPropertyForRentFlow), { loading: () => <FlowLoader /> });
const RoommateFlow = dynamic(() => import('@/components/RoommateFlow').then(mod => mod.RoommateFlow), { loading: () => <FlowLoader /> });


type Flow = 'buyer' | 'seller' | 'renter' | 'list-property' | 'investor' | 'roommate' | null;

const FlowLoader = () => (
  <div className="flex justify-center items-center h-full min-h-[50vh]">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

export default function DashboardPage() {
  const [activeFlow, setActiveFlow] = useState<Flow>(null);
  const { t } = useLanguage();

  const flows: Omit<DashboardCardProps, 'onClick'>[] = [
    {
      title: t('dashboard.cards.buyer.title'),
      description: t('dashboard.cards.buyer.description'),
      aiFeature: t('dashboard.cards.buyer.aiFeature'),
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="icon-buyer-bg" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4DD0E1"/>
              <stop offset="1" stopColor="#00ACC1"/>
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="24" fill="url(#icon-buyer-bg)"/>
          <path d="M14 26.5V34H20V28H28V34H34V26.5L24 18L14 26.5Z" fill="#E0F2F7"/>
          <path d="M31 19.5L24 13L17 19.5V17L24 10.5L31 17V19.5Z" fill="#B2EBF2"/>
        </svg>
      ),
      color: 'cyan',
      flow: 'buyer'
    },
    {
      title: t('dashboard.cards.seller.title'),
      description: t('dashboard.cards.seller.description'),
      aiFeature: t('dashboard.cards.seller.aiFeature'),
      icon: (
         <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="icon-seller-bg" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#BA68C8"/>
              <stop offset="1" stopColor="#9C27B0"/>
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="24" fill="url(#icon-seller-bg)"/>
          <path d="M24 19.5C25.3807 19.5 26.5 20.6193 26.5 22V26C26.5 27.3807 25.3807 28.5 24 28.5C22.6193 28.5 21.5 27.3807 21.5 26V22C21.5 20.6193 22.6193 19.5 24 19.5ZM24.5 16.5H23.5V19.5H24.5V16.5ZM24.5 28.5H23.5V31.5H24.5V28.5Z" fill="#F3E5F5"/>
          <path d="M24 21.5C24.8284 21.5 25.5 22.1716 25.5 23C25.5 23.8284 24.8284 24.5 24 24.5C23.1716 24.5 22.5 23.8284 22.5 23C22.5 22.1716 23.1716 21.5 24 21.5Z" fill="#D1C4E9"/>
        </svg>
      ),
      color: 'purple',
      flow: 'seller'
    },
    {
      title: t('dashboard.cards.renter.title'),
      description: t('dashboard.cards.renter.description'),
      aiFeature: t('dashboard.cards.renter.aiFeature'),
      icon: (
         <svg width="48" height="48" viewBox="0.0.48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="icon-renter-bg" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4DB6AC"/>
              <stop offset="1" stopColor="#00897B"/>
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="24" fill="url(#icon-renter-bg)"/>
          <path d="M16 34H32V24L24 18L16 24V34ZM20 28H28V32H20V28Z" fill="#E0F2F1"/>
          <path d="M20 22H22V24H20V22ZM26 22H28V24H26V22Z" fill="#B2DFDB"/>
          <path d="M16 34H32V24L24 18L16 24V34Z" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="1"/>
        </svg>
      ),
      color: 'teal',
      flow: 'renter'
    },
    {
      title: t('dashboard.cards.listProperty.title'),
      description: t('dashboard.cards.listProperty.description'),
      aiFeature: t('dashboard.cards.listProperty.aiFeature'),
      icon: (
        <svg width="48" height="48" viewBox="0.0.48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="icon-list-bg" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#81C784"/>
              <stop offset="1" stopColor="#4CAF50"/>
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="24" fill="url(#icon-list-bg)"/>
          <path d="M14 34H34V20H14V34ZM18 24H22V26H18V24ZM24 24H28V26H24V24ZM18 28H22V30H18V28ZM24 28H28V30H24V28Z" fill="#E8F5E9"/>
          <path d="M30 18H18L24 13L30 18Z" fill="#C8E6C9"/>
        </svg>
      ),
      color: 'green',
      flow: 'list-property'
    },
    {
      title: t('dashboard.cards.investor.title'),
      description: t('dashboard.cards.investor.description'),
      aiFeature: t('dashboard.cards.investor.aiFeature'),
      icon: (
        <svg width="48" height="48" viewBox="0.0.48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="icon-investor-bg" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#64B5F6"/>
              <stop offset="1" stopColor="#2196F3"/>
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="24" fill="url(#icon-investor-bg)"/>
          <path d="M16 32H32V16H16V32ZM18 28L22 24L26 28L30 20" stroke="#E3F2FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: 'blue',
      flow: 'investor'
    },
    {
      title: t('dashboard.cards.roommate.title'),
      description: t('dashboard.cards.roommate.description'),
      aiFeature: t('dashboard.cards.roommate.aiFeature'),
      icon: (
        <svg width="48" height="48" viewBox="0.0.48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="icon-roommate-bg" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFB74D"/>
              <stop offset="1" stopColor="#FB8C00"/>
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="24" fill="url(#icon-roommate-bg)"/>
          <circle cx="18" cy="22" r="4" fill="#FFE0B2"/>
          <path d="M14 30C14 27.7909 15.7909 26 18 26C20.2091 26 22 27.7909 22 30H14Z" fill="#FFE0B2"/>
          <circle cx="30" cy="22" r="4" fill="#FFCC80"/>
          <path d="M26 30C26 27.7909 27.7909 26 30 26C32.2091 26 34 27.7909 34 30H26Z" fill="#FFCC80"/>
        </svg>
      ),
      color: 'orange',
      flow: 'roommate'
    }
  ];

  const handleCardClick = (flow: Flow) => {
    setActiveFlow(flow);
  };
  
  const handleBack = () => {
    setActiveFlow(null);
  }

  const renderFlow = () => {
    switch (activeFlow) {
      case 'buyer':
        return <BuyerFlow onBack={handleBack} />;
      case 'renter':
        return <RenterFlow onBack={handleBack} />;
      case 'seller':
        return <SellerFlow onBack={handleBack} />;
      case 'investor':
        return <InvestorFlow onBack={handleBack} />;
      case 'list-property':
        return <ListPropertyForRentFlow onBack={handleBack} />;
      case 'roommate':
        return <RoommateFlow onBack={handleBack} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          {activeFlow ? (
             renderFlow()
          ) : (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-primary mb-4">{t('dashboard.title')}</h1>
                <p className="text-xl text-muted-foreground">{t('dashboard.description')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {flows.map((card, index) => (
                  <DashboardCard
                    key={card.flow || index}
                    {...card}
                    onClick={() => handleCardClick(card.flow as Flow)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
