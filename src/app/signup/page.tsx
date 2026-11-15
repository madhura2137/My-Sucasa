
"use client"

import Link from "next/link"
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/contexts/LanguageContext"

function SignupForm() {
  const searchParams = useSearchParams()
  const { t } = useLanguage();
  const tab = searchParams.get('tab')
  const formAction = tab ? `/dashboard?tab=${tab}` : "/dashboard"
  const loginHref = tab ? `/login?tab=${tab}` : "/login"

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader className="text-center">
        <Icons.logo className="mx-auto h-12 w-12 text-primary"/>
        <CardTitle className="text-2xl font-headline mt-4">{t('signup.title')}</CardTitle>
        <CardDescription>
          {t('signup.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">{t('signup.nameLabel')}</Label>
            <Input id="full-name" placeholder="Max Robinson" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">{t('signup.usernameLabel')}</Label>
            <Input id="username" placeholder="maxrob" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">{t('signup.phoneLabel')}</Label>
            <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{t('signup.emailLabel')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t('signup.passwordLabel')}</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            {t('signup.createButton')}
          </Button>
          <Button variant="outline" className="w-full">
            {t('signup.signupWithGoogle')}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {t('signup.haveAccount')}{" "}
          <Link href={loginHref} className="underline font-semibold text-primary">
            {t('logIn')}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <SignupForm />
        </Suspense>
      </main>
    </div>
  )
}
