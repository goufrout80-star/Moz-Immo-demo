// ============================================
// INTERNATIONALIZATION - EN/FR
// ============================================

export type Locale = 'en' | 'fr'

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      villas: 'Villas',
      cars: 'Cars',
      experiences: 'Experiences',
      blog: 'Blog',
      testimonials: 'Testimonials',
      contact: 'Contact',
      dashboard: 'Dashboard',
    },
    // Hero
    hero: {
      headline: 'Your peace of mind, our privilege',
      subheadline: 'Luxury concierge services in the heart of Marrakech',
      ctaConcierge: 'Request Concierge',
      ctaVillas: 'View Villas',
    },
    // Common
    common: {
      readMore: 'Read More',
      viewAll: 'View All',
      bookNow: 'Book Now',
      requestService: 'Request this service',
      learnMore: 'Learn More',
      perNight: 'per night',
      perDay: 'per day',
      perWeek: 'per week',
      guests: 'guests',
      bedrooms: 'bedrooms',
      bathrooms: 'bathrooms',
      from: 'From',
      verified: 'Verified',
      available: 'Available',
      unavailable: 'Unavailable',
    },
    // Contact
    contact: {
      title: 'Contact Us',
      subtitle: "Let's start your Marrakech experience",
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'Failed to send message. Please try again.',
    },
    // Footer
    footer: {
      tagline: 'Buy your peace of mind.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contact: 'Contact',
      newsletter: 'Newsletter',
      newsletterText: 'Subscribe for exclusive offers and updates.',
      subscribe: 'Subscribe',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    // Dashboard
    dashboard: {
      welcome: 'Welcome',
      reservations: 'Reservations',
      invoices: 'Invoices',
      analytics: 'Analytics',
      manageVillas: 'Manage Villas',
      manageCars: 'Manage Cars',
      manageBlog: 'Manage Blog',
      manageUsers: 'Manage Users',
    },
    // Services
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive luxury services tailored to your needs',
    },
    // Villas
    villas: {
      title: 'Luxury Villas',
      subtitle: 'Discover our curated collection of exceptional properties',
      filters: {
        location: 'Location',
        capacity: 'Capacity',
        price: 'Price Range',
        all: 'All',
      },
    },
    // About
    about: {
      title: 'About Moz Immo',
      subtitle: 'Your trusted partner in luxury Marrakech living',
      values: {
        trust: 'Trust',
        trustDesc: 'Building lasting relationships through transparency and reliability.',
        discretion: 'Discretion',
        discretionDesc: 'Your privacy is sacred. We operate with utmost confidentiality.',
        perfection: 'Perfection',
        perfectionDesc: 'Every detail matters. We accept nothing less than excellence.',
      },
    },
  },
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      about: 'À propos',
      services: 'Services',
      villas: 'Villas',
      cars: 'Voitures',
      experiences: 'Expériences',
      blog: 'Blog',
      testimonials: 'Témoignages',
      contact: 'Contact',
      dashboard: 'Tableau de bord',
    },
    // Hero
    hero: {
      headline: 'Votre tranquillité d\'esprit, notre privilège',
      subheadline: 'Services de conciergerie de luxe au cœur de Marrakech',
      ctaConcierge: 'Demander un concierge',
      ctaVillas: 'Voir les villas',
    },
    // Common
    common: {
      readMore: 'Lire la suite',
      viewAll: 'Voir tout',
      bookNow: 'Réserver',
      requestService: 'Demander ce service',
      learnMore: 'En savoir plus',
      perNight: 'par nuit',
      perDay: 'par jour',
      perWeek: 'par semaine',
      guests: 'personnes',
      bedrooms: 'chambres',
      bathrooms: 'salles de bain',
      from: 'À partir de',
      verified: 'Vérifié',
      available: 'Disponible',
      unavailable: 'Indisponible',
    },
    // Contact
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Commencez votre expérience à Marrakech',
      name: 'Nom complet',
      email: 'Adresse e-mail',
      phone: 'Numéro de téléphone',
      subject: 'Sujet',
      message: 'Message',
      send: 'Envoyer',
      sending: 'Envoi en cours...',
      success: 'Message envoyé avec succès !',
      error: 'Échec de l\'envoi. Veuillez réessayer.',
    },
    // Footer
    footer: {
      tagline: 'Achetez votre tranquillité d\'esprit.',
      quickLinks: 'Liens rapides',
      services: 'Services',
      contact: 'Contact',
      newsletter: 'Newsletter',
      newsletterText: 'Abonnez-vous pour des offres exclusives.',
      subscribe: 'S\'abonner',
      rights: 'Tous droits réservés.',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions d\'utilisation',
    },
    // Dashboard
    dashboard: {
      welcome: 'Bienvenue',
      reservations: 'Réservations',
      invoices: 'Factures',
      analytics: 'Analytiques',
      manageVillas: 'Gérer les villas',
      manageCars: 'Gérer les voitures',
      manageBlog: 'Gérer le blog',
      manageUsers: 'Gérer les utilisateurs',
    },
    // Services
    services: {
      title: 'Nos Services',
      subtitle: 'Des services de luxe adaptés à vos besoins',
    },
    // Villas
    villas: {
      title: 'Villas de Luxe',
      subtitle: 'Découvrez notre collection de propriétés exceptionnelles',
      filters: {
        location: 'Emplacement',
        capacity: 'Capacité',
        price: 'Gamme de prix',
        all: 'Tous',
      },
    },
    // About
    about: {
      title: 'À propos de Moz Immo',
      subtitle: 'Votre partenaire de confiance pour le luxe à Marrakech',
      values: {
        trust: 'Confiance',
        trustDesc: 'Construire des relations durables par la transparence.',
        discretion: 'Discrétion',
        discretionDesc: 'Votre vie privée est sacrée. Confidentialité absolue.',
        perfection: 'Perfection',
        perfectionDesc: 'Chaque détail compte. Nous n\'acceptons que l\'excellence.',
      },
    },
  },
}

export function getTranslations(locale: Locale) {
  return translations[locale]
}

export type Translations = typeof translations.en
