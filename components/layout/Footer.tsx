'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, Send } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { subscribeNewsletter } from '@/lib/email'
import { Button, Input } from '@/components/ui'

const quickLinks = [
  { name: { en: 'Home', fr: 'Accueil' }, href: '/' },
  { name: { en: 'About', fr: 'À propos' }, href: '/about' },
  { name: { en: 'Villas', fr: 'Villas' }, href: '/villas' },
  { name: { en: 'Blog', fr: 'Blog' }, href: '/blog' },
  { name: { en: 'Testimonials', fr: 'Témoignages' }, href: '/testimonials' },
  { name: { en: 'Contact', fr: 'Contact' }, href: '/contact' },
]

const services = [
  { name: { en: 'Villa Management', fr: 'Gestion de Villas' }, href: '/services#villa-management' },
  { name: { en: 'Luxury Rentals', fr: 'Locations de Luxe' }, href: '/services#luxury-rentals' },
  { name: { en: 'Car Services', fr: 'Services Auto' }, href: '/cars' },
  { name: { en: 'Lifestyle Concierge', fr: 'Conciergerie' }, href: '/experiences' },
]

export function Footer() {
  const { locale } = useAppStore()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [subscribing, setSubscribing] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setSubscribing(true)
    await subscribeNewsletter(email)
    setSubscribed(true)
    setSubscribing(false)
    setEmail('')
  }

  const t = {
    tagline: locale === 'en' ? 'Buy your peace of mind.' : 'Achetez votre tranquillité d\'esprit.',
    quickLinks: locale === 'en' ? 'Quick Links' : 'Liens Rapides',
    services: locale === 'en' ? 'Services' : 'Services',
    contact: locale === 'en' ? 'Contact' : 'Contact',
    newsletter: locale === 'en' ? 'Newsletter' : 'Newsletter',
    newsletterText: locale === 'en' 
      ? 'Subscribe for exclusive offers and updates.' 
      : 'Abonnez-vous pour des offres exclusives.',
    subscribe: locale === 'en' ? 'Subscribe' : 'S\'abonner',
    subscribed: locale === 'en' ? 'Thank you for subscribing!' : 'Merci pour votre inscription !',
    rights: locale === 'en' ? 'All rights reserved.' : 'Tous droits réservés.',
    privacy: locale === 'en' ? 'Privacy Policy' : 'Confidentialité',
    terms: locale === 'en' ? 'Terms of Service' : 'Conditions',
  }

  return (
    <footer className="bg-luxury-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-serif font-bold text-white">Moz Immo</h2>
            </Link>
            <p className="mt-4 text-luxury-gold font-medium">{t.tagline}</p>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              {locale === 'en' 
                ? 'Your trusted partner for luxury living in Marrakech. Villa management, rentals, and bespoke concierge services.'
                : 'Votre partenaire de confiance pour le luxe à Marrakech. Gestion de villas, locations et services de conciergerie sur mesure.'}
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-luxury-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-luxury-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-luxury-gold transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-luxury-gold transition-colors text-sm">
                    {link.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.services}</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="text-gray-400 hover:text-luxury-gold transition-colors text-sm">
                    {service.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold mb-4 mt-8">{t.contact}</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-luxury-gold" />
                <span>Gueliz, Marrakech, Morocco</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-luxury-gold" />
                <span>+212 600 000 000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-luxury-gold" />
                <span>contact@mozimmo.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.newsletter}</h3>
            <p className="text-gray-400 text-sm mb-4">{t.newsletterText}</p>
            {subscribed ? (
              <p className="text-luxury-gold text-sm">{t.subscribed}</p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button type="submit" className="w-full" loading={subscribing}>
                  <Send className="w-4 h-4 mr-2" />
                  {t.subscribe}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Moz Immo. {t.rights}
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-luxury-gold transition-colors">
              {t.privacy}
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-luxury-gold transition-colors">
              {t.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
