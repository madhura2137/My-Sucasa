"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CircleUser, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const ADMIN_USER = "Max Robinson";

export function SiteHeader() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const isAuthenticated = pathname.includes('/dashboard') || pathname.includes('/properties') || pathname.includes('/admin');
  const userName = "Max Robinson"; // In a real app, this would come from user state
  const isAdmin = userName === ADMIN_USER;

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'te', name: 'తెలుగు' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">
              MySuCasa
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/properties"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t('properties')}
            </Link>
             <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t('dashboard')}
            </Link>
             {isAdmin && (
              <Link
                href="/admin"
                className={cn("transition-colors hover:text-foreground/80 text-foreground/60", pathname === "/admin" && "font-semibold text-primary")}
              >
                {t('admin')}
              </Link>
            )}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Change language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code as 'en' | 'hi' | 'mr' | 'te')}>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User avatar" />
                    <AvatarFallback>
                      <CircleUser />
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t('profile')}</DropdownMenuItem>
                <DropdownMenuItem>{t('settings')}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">{t('signOut')}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">{t('logIn')}</Link>
              </Button>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/signup">{t('signUp')}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
