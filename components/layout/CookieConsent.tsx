'use client'

import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui'
import { Cookie, X } from 'lucide-react'

export function CookieConsent() {
  const { cookieConsent, setCookieConsent, locale } = useAppStore()

  if (cookieConsent !== null) return null

  const t = {
    title: locale === 'en' ? 'We value your privacy' : 'Nous respectons votre vie privée',
    description: locale === 'en'
      ? 'We use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies.'
      : 'Nous utilisons des cookies pour améliorer votre expérience de navigation. En cliquant sur "Accepter", vous consentez à l\'utilisation des cookies.',
    accept: locale === 'en' ? 'Accept All' : 'Tout accepter',
    decline: locale === 'en' ? 'Decline' : 'Refuser',
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 p-3 bg-brand-100 dark:bg-brand-900 rounded-full">
            <Cookie className="w-6 h-6 text-brand-600 dark:text-brand-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t.description}</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCookieConsent(false)}
              className="flex-1 sm:flex-none"
            >
              {t.decline}
            </Button>
            <Button
              size="sm"
              onClick={() => setCookieConsent(true)}
              className="flex-1 sm:flex-none"
            >
              {t.accept}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
