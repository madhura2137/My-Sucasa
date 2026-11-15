
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { SiteHeader } from '@/components/site-header';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const FloatingIcons = () => {
  const icons = [
    { icon: '🏠', size: 'text-4xl', x: '10%', y: '20%', duration: 10 },
    { icon: '🏢', size: 'text-5xl', x: '80%', y: '15%', duration: 12 },
    { icon: '🏘️', size: 'text-3xl', x: '90%', y: '70%', duration: 8 },
    { icon: '🏨', size: 'text-4xl', x: '5%', y: '80%', duration: 11 },
    { icon: '🏦', size: 'text-3xl', x: '50%', y: '5%', duration: 13 },
    { icon: '🏤', size: 'text-4xl', x: '25%', y: '85%', duration: 9 },
    { icon: '🏡', size: 'text-5xl', x: '70%', y: '60%', duration: 14 },
    { icon: '🏣', size: 'text-3xl', x: '40%', y: '90%', duration: 7 },
    { icon: '🏠', size: 'text-2xl', x: '20%', y: '5%', duration: 15 },
    { icon: '🏢', size: 'text-4xl', x: '60%', y: '95%', duration: 10 },
    { icon: ' bungalows', size: 'text-4xl', x: '95%', y: '30%', duration: 12 },
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {icons.map((item, index) => (
        <motion.span
          key={index}
          className={`${item.size} absolute opacity-20 dark:opacity-10`}
          style={{ top: item.y, left: item.x }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 10, 0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.05, 1, 0.95, 1],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: index * 0.5
          }}
        >
          {item.icon}
        </motion.span>
      ))}
    </div>
  );
}


export default function Home() {
  const { t } = useLanguage();
  const userRoles = [
    {
      title: t('home.roles.buyer.title'),
      description: t('home.roles.buyer.description'),
      icon: '🏠',
      steps: [
        t('home.roles.buyer.step1'),
        t('home.roles.buyer.step2'),
        t('home.roles.buyer.step3'),
        t('home.roles.buyer.step4'),
        t('home.roles.buyer.step5')
      ],
      href: '/login?tab=buyer'
    },
    {
      title: t('home.roles.renter.title'),
      description: t('home.roles.renter.description'),
      icon: '🏢',
      steps: [
        t('home.roles.renter.step1'),
        t('home.roles.renter.step2'),
        t('home.roles.renter.step3'),
        t('home.roles.renter.step4'),
        t('home.roles.renter.step5')
      ],
      href: '/login?tab=renter'
    },
    {
      title: t('home.roles.seller.title'),
      description: t('home.roles.seller.description'),
      icon: '💼',
      steps: [
        t('home.roles.seller.step1'),
        t('home.roles.seller.step2'),
        t('home.roles.seller.step3'),
        t('home.roles.seller.step4'),
        t('home.roles.seller.step5')
      ],
      href: '/login?tab=seller'
    },
    {
      title: t('home.roles.investor.title'),
      description: t('home.roles.investor.description'),
      icon: '📈',
      steps: [
        t('home.roles.investor.step1'),
        t('home.roles.investor.step2'),
        t('home.roles.investor.step3'),
        t('home.roles.investor.step4'),
        t('home.roles.investor.step5')
      ],
      href: '/login?tab=investor'
    },
    {
      title: t('home.roles.listProperty.title'),
      description: t('home.roles.listProperty.description'),
      icon: '🏘️',
      steps: [
        t('home.roles.listProperty.step1'),
        t('home.roles.listProperty.step2'),
        t('home.roles.listProperty.step3'),
        t('home.roles.listProperty.step4'),
        t('home.roles.listProperty.step5')
      ],
      href: '/login?tab=list-property'
    },
    {
      title: t('home.roles.roommate.title'),
      description: t('home.roles.roommate.description'),
      icon: '👥',
      steps: [
        t('home.roles.roommate.step1'),
        t('home.roles.roommate.step2'),
        t('home.roles.roommate.step3'),
        t('home.roles.roommate.step4'),
        t('home.roles.roommate.step5')
      ],
      href: '/login?tab=roommate'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
      <SiteHeader />
      <main className="flex-1 relative z-10">
        <section className="relative min-h-[calc(100vh-56px)] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950 dark:to-slate-900 opacity-50" />
        <FloatingIcons />
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {t('welcomeToMySuCasa')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-700/80 dark:text-cyan-200/80 mb-10 max-w-3xl mx-auto">
              {t('tagline')}
            </p>
            <div className="flex justify-center">
              <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/login">
                  {t('getStarted')} <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="roles" className="py-20 bg-background/80 dark:bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground dark:text-white mb-4">{t('howCanIHelp')}</h2>
              <p className="text-lg text-muted-foreground dark:text-cyan-200/80">{t('selectRole')}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {userRoles.map((role) => (
                <AnimatedCard key={role.title} className="flex flex-col">
                  <div className="p-8 flex-grow">
                    <div className="flex items-start gap-6">
                      <div className="text-5xl">{role.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground dark:text-white mb-2">{role.title}</h3>
                        <p className="text-muted-foreground dark:text-cyan-200/80 mb-6">{role.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-3 text-left">
                      {role.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground dark:text-cyan-200/90">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                   <div className="p-8 pt-0 mt-auto">
                      <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          <Link href={role.href}>
                              {t('getStarted')} <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
