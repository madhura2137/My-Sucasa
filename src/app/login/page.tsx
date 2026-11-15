
"use client"

import Link from "next/link"
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/contexts/LanguageContext"

function LoginForm() {
  const searchParams = useSearchParams()
  const { t } = useLanguage();
  const tab = searchParams.get('tab')
  const formAction = tab ? `/dashboard?tab=${tab}` : "/dashboard"
  const signupHref = tab ? `/signup?tab=${tab}` : "/signup"

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader className="text-center">
        <Icons.logo className="mx-auto h-12 w-12 text-primary"/>
        <CardTitle className="text-2xl font-headline mt-4">{t('login.welcome')}</CardTitle>
        <CardDescription>
          {t('login.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{t('login.emailLabel')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">{t('login.passwordLabel')}</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline text-muted-foreground hover:text-primary">
                {t('login.forgotPassword')}
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            {t('login.loginButton')}
          </Button>
          <Button variant="outline" className="w-full">
            {t('login.loginWithGoogle')}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {t('login.noAccount')}{" "}
          <Link href={signupHref} className="underline font-semibold text-primary">
            {t('signUp')}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  )
}
