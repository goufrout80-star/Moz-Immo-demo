// ============================================
// CMS-LIKE DATA STORE - DEMO MODE
// ============================================

// Types
export interface Villa {
  id: number
  slug: string
  name: string
  description: string
  shortDescription: string
  location: string
  price: number
  capacity: number
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  amenities: string[]
  features: string[]
  verified: boolean
  available: boolean
  availableDates: { start: string; end: string }[]
  ownerId: number
  createdAt: string
  updatedAt: string
}

export interface Car {
  id: number
  slug: string
  name: string
  brand: string
  model: string
  year: number
  description: string
  dailyRate: number
  weeklyRate: number
  chauffeurRate: number
  images: string[]
  features: string[]
  available: boolean
  seats: number
  transmission: 'automatic' | 'manual'
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  authorImage: string
  category: string
  tags: string[]
  publishedAt: string
  readTime: number
}

export interface Experience {
  id: number
  slug: string
  name: string
  description: string
  shortDescription: string
  price: number
  duration: string
  image: string
  category: string
  highlights: string[]
}

export interface Testimonial {
  id: number
  name: string
  title: string
  company?: string
  content: string
  image: string
  rating: number
}

export interface Service {
  id: number
  slug: string
  name: string
  description: string
  shortDescription: string
  icon: string
  features: string[]
  image: string
}

export interface Reservation {
  id: number
  userId: number
  type: 'villa' | 'car' | 'experience'
  itemId: number
  itemName: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}

export interface Invoice {
  id: number
  reservationId: number
  userId: number
  amount: number
  status: 'pending' | 'paid' | 'overdue'
  dueDate: string
  paidAt?: string
  items: { description: string; amount: number }[]
}

// ============================================
// DEMO DATA
// ============================================

const villaImages = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop',
]

const interiorImages = [
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop',
]

const locations = ['Palmeraie', 'Medina', 'Amelkis', 'Route de Fès', 'Route de Ouarzazate', 'Agdal', 'Hivernage', 'Targa']

const amenities = [
  'Private Pool', 'Garden', 'Air Conditioning', 'WiFi', 'Parking', 'Security',
  'Housekeeping', 'Chef Available', 'Spa', 'Gym', 'Home Cinema', 'Tennis Court',
  'Hammam', 'Fireplace', 'BBQ Area', 'Rooftop Terrace'
]

export let villas: Villa[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  slug: `villa-${['riad-elegance', 'dar-serenity', 'palais-jardin', 'maison-soleil', 'villa-atlas', 'riad-luxe', 'dar-palmeraie', 'villa-oasis', 'maison-paradis', 'riad-royal', 'villa-eden', 'dar-harmonie', 'palais-rose', 'villa-saphir', 'riad-perle', 'maison-orient', 'villa-diamant', 'dar-etoile', 'palais-or', 'villa-jade'][i]}`,
  name: ['Riad Elegance', 'Dar Serenity', 'Palais du Jardin', 'Maison Soleil', 'Villa Atlas View', 'Riad Luxe', 'Dar Palmeraie', 'Villa Oasis', 'Maison Paradis', 'Riad Royal', 'Villa Eden', 'Dar Harmonie', 'Palais Rose', 'Villa Saphir', 'Riad Perle', 'Maison Orient', 'Villa Diamant', 'Dar Etoile', 'Palais Or', 'Villa Jade'][i],
  description: `Experience unparalleled luxury in this stunning ${['traditional riad', 'modern villa', 'palatial estate', 'boutique residence', 'contemporary masterpiece'][i % 5]} nestled in the heart of Marrakech. This exceptional property combines authentic Moroccan architecture with modern amenities, offering guests an unforgettable retreat. The property features exquisite handcrafted details, lush gardens, and breathtaking views of the Atlas Mountains. Every corner tells a story of Moroccan craftsmanship and timeless elegance.

The interior spaces are thoughtfully designed to provide both privacy and communal gathering areas. Each bedroom is a sanctuary of comfort, featuring premium linens, en-suite bathrooms, and carefully curated decor. The living areas open onto beautiful courtyards and terraces, perfect for al fresco dining or simply enjoying the Marrakech sunshine.

Guests have access to a private pool, fully equipped kitchen, and dedicated staff including a house manager and optional private chef. This is more than accommodation – it's an experience of Moroccan hospitality at its finest.`,
  shortDescription: `Stunning ${['traditional riad', 'modern villa', 'palatial estate', 'boutique residence', 'contemporary masterpiece'][i % 5]} with ${3 + (i % 4)} bedrooms, private pool, and panoramic views.`,
  location: locations[i % locations.length],
  price: [800, 1200, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000][i % 10],
  capacity: [6, 8, 10, 12, 14, 16][i % 6],
  bedrooms: 3 + (i % 4),
  bathrooms: 2 + (i % 4),
  area: [300, 400, 500, 600, 800, 1000][i % 6],
  images: [
    villaImages[i % villaImages.length],
    interiorImages[i % interiorImages.length],
    villaImages[(i + 1) % villaImages.length],
    interiorImages[(i + 1) % interiorImages.length],
    villaImages[(i + 2) % villaImages.length],
  ],
  amenities: amenities.slice(0, 8 + (i % 8)),
  features: ['24/7 Security', 'Airport Transfer', 'Concierge Service', 'Daily Housekeeping'].slice(0, 2 + (i % 3)),
  verified: i % 3 === 0,
  available: i % 5 !== 0,
  availableDates: [
    { start: '2026-02-01', end: '2026-02-28' },
    { start: '2026-03-15', end: '2026-04-30' },
    { start: '2026-06-01', end: '2026-08-31' },
  ],
  ownerId: (i % 3) + 1,
  createdAt: new Date(2025, i % 12, (i % 28) + 1).toISOString(),
  updatedAt: new Date().toISOString(),
}))

export let cars: Car[] = [
  {
    id: 1,
    slug: 'mercedes-s-class',
    name: 'Mercedes S-Class',
    brand: 'Mercedes-Benz',
    model: 'S 580',
    year: 2024,
    description: 'The epitome of luxury sedans. Perfect for executive travel and special occasions.',
    dailyRate: 500,
    weeklyRate: 3000,
    chauffeurRate: 150,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&h=800&fit=crop',
    ],
    features: ['Leather Interior', 'Massage Seats', 'Rear Entertainment', 'Climate Control', 'WiFi'],
    available: true,
    seats: 4,
    transmission: 'automatic',
  },
  {
    id: 2,
    slug: 'range-rover-autobiography',
    name: 'Range Rover Autobiography',
    brand: 'Land Rover',
    model: 'Autobiography LWB',
    year: 2024,
    description: 'Commanding presence meets refined luxury. Ideal for desert excursions and city tours.',
    dailyRate: 600,
    weeklyRate: 3600,
    chauffeurRate: 150,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&h=800&fit=crop',
    ],
    features: ['All-Terrain Capability', 'Panoramic Roof', 'Premium Audio', 'Refrigerated Compartment'],
    available: true,
    seats: 5,
    transmission: 'automatic',
  },
  {
    id: 3,
    slug: 'bentley-continental-gt',
    name: 'Bentley Continental GT',
    brand: 'Bentley',
    model: 'Continental GT V8',
    year: 2024,
    description: 'British craftsmanship at its finest. A grand tourer for the discerning traveler.',
    dailyRate: 800,
    weeklyRate: 4800,
    chauffeurRate: 200,
    images: [
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&h=800&fit=crop',
    ],
    features: ['Handcrafted Interior', 'Diamond Quilted Seats', 'Rotating Display', 'Naim Audio'],
    available: true,
    seats: 4,
    transmission: 'automatic',
  },
  {
    id: 4,
    slug: 'rolls-royce-ghost',
    name: 'Rolls-Royce Ghost',
    brand: 'Rolls-Royce',
    model: 'Ghost Extended',
    year: 2024,
    description: 'The pinnacle of automotive luxury. An experience reserved for the most distinguished guests.',
    dailyRate: 1500,
    weeklyRate: 9000,
    chauffeurRate: 300,
    images: [
      'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1200&h=800&fit=crop',
    ],
    features: ['Starlight Headliner', 'Champagne Cooler', 'Bespoke Audio', 'Privacy Suite'],
    available: true,
    seats: 4,
    transmission: 'automatic',
  },
  {
    id: 5,
    slug: 'porsche-911-turbo',
    name: 'Porsche 911 Turbo S',
    brand: 'Porsche',
    model: '911 Turbo S',
    year: 2024,
    description: 'Exhilarating performance meets everyday usability. For those who demand driving excellence.',
    dailyRate: 700,
    weeklyRate: 4200,
    chauffeurRate: 175,
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&h=800&fit=crop',
    ],
    features: ['Sport Chrono Package', 'Carbon Ceramic Brakes', 'Adaptive Suspension', 'Launch Control'],
    available: true,
    seats: 2,
    transmission: 'automatic',
  },
  {
    id: 6,
    slug: 'mercedes-v-class',
    name: 'Mercedes V-Class',
    brand: 'Mercedes-Benz',
    model: 'V 300 d',
    year: 2024,
    description: 'Spacious luxury for group travel. Perfect for airport transfers and family excursions.',
    dailyRate: 400,
    weeklyRate: 2400,
    chauffeurRate: 120,
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&h=800&fit=crop',
    ],
    features: ['Captain Seats', 'Conference Seating', 'Rear Climate Control', 'Large Luggage Space'],
    available: true,
    seats: 7,
    transmission: 'automatic',
  },
]

export let blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: '5-ways-experience-marrakech-luxury',
    title: '5 Ways to Experience Marrakech in Luxury',
    excerpt: 'Discover the most exclusive experiences that Marrakech has to offer for the discerning traveler.',
    content: `Marrakech, the Red City, has long been a destination for those seeking exotic beauty and refined experiences. Here are five extraordinary ways to experience this magical city in ultimate luxury.

## 1. Private Riad Experience

Nothing compares to having an entire traditional riad to yourself. With dedicated staff, private pool, and personalized service, you'll experience Moroccan hospitality at its finest. Wake up to the sound of fountains, enjoy breakfast in your private courtyard, and let your personal chef prepare authentic Moroccan cuisine.

## 2. Desert Glamping Under the Stars

Escape to the Agafay Desert for an unforgettable night of luxury camping. Private tented suites with king-sized beds, en-suite bathrooms, and gourmet dining under a canopy of stars. This is glamping elevated to an art form.

## 3. Exclusive Spa Journey

Marrakech is home to some of the world's most luxurious spas. From traditional hammam rituals to cutting-edge treatments, immerse yourself in a world of relaxation. Private spa suites, signature argan oil treatments, and ancient wellness traditions await.

## 4. Culinary Excellence

From Michelin-starred rooftop restaurants to private cooking classes with renowned chefs, Marrakech offers a culinary journey like no other. Explore the souks with a private guide to source ingredients, then learn the secrets of Moroccan cuisine in an intimate setting.

## 5. Bespoke Cultural Immersion

Access private art galleries, meet master craftsmen in their ateliers, and explore hidden palaces not open to the public. A luxury concierge service can arrange exclusive cultural experiences that reveal the true soul of Marrakech.`,
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&h=800&fit=crop',
    author: 'Sofia Bennani',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    category: 'Lifestyle',
    tags: ['Luxury Travel', 'Marrakech', 'Experiences'],
    publishedAt: '2025-12-15',
    readTime: 8,
  },
  {
    id: 2,
    slug: 'art-of-villa-management',
    title: 'The Art of Villa Management',
    excerpt: 'What it takes to maintain a luxury property to the highest standards in Marrakech.',
    content: `Managing a luxury villa in Marrakech is an art form that requires attention to detail, cultural sensitivity, and an unwavering commitment to excellence.

## Understanding the Property

Every villa has its unique character. Traditional riads require specialized knowledge of zellige tilework, tadelakt finishes, and fountain maintenance. Modern villas demand expertise in smart home systems and contemporary design preservation.

## Building the Right Team

The heart of excellent villa management is the team. From housekeepers who understand the nuances of luxury linens to gardeners who maintain the perfect Moroccan garden, every staff member plays a crucial role.

## Guest Experience Excellence

Anticipating needs before they arise is the hallmark of luxury service. Pre-arrival consultations, personalized welcome amenities, and 24/7 concierge support ensure every guest feels like royalty.

## Preventive Maintenance

The Marrakech climate presents unique challenges. Regular inspections of pool systems, air conditioning units, and water features prevent issues before they affect guests.

## Security and Privacy

High-net-worth guests expect absolute discretion. Advanced security systems, vetted staff, and strict privacy protocols are non-negotiable elements of our service.`,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
    author: 'Ahmed El Fassi',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    category: 'Property',
    tags: ['Villa Management', 'Property Care', 'Luxury Real Estate'],
    publishedAt: '2025-11-28',
    readTime: 6,
  },
  {
    id: 3,
    slug: 'hidden-gems-marrakech',
    title: 'Hidden Gems of Marrakech',
    excerpt: 'Beyond the tourist trails: secret spots that only locals know about.',
    content: `Marrakech reveals its true magic to those who venture beyond the well-trodden paths. Here are some of our favorite hidden gems.

## Secret Gardens

While the Majorelle Garden draws crowds, the Anima Garden by André Heller remains a surreal paradise known to few. This botanical wonderland features sculptures, art installations, and rare plants in a dreamlike setting.

## Artisan Ateliers

Skip the tourist souks and visit the craftsmen directly. In the Mouassine quarter, master woodworkers, leather artisans, and textile weavers welcome visitors to their workshops, offering authentic pieces at fair prices.

## Rooftop Sanctuaries

Some of the city's most beautiful rooftop terraces remain hidden behind unmarked doors. These secret cafes offer panoramic views of the medina and Atlas Mountains without the crowds.

## Ancient Hammams

Beyond the luxury spa hammams, traditional neighborhood hammams offer an authentic experience. The ritual of steam, scrub, and massage has remained unchanged for centuries.

## Private Museums

Several private collectors have opened their homes as museums by appointment only. From contemporary art to antique Moroccan crafts, these intimate spaces offer unique cultural experiences.`,
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1200&h=800&fit=crop',
    author: 'Yasmine Alaoui',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    category: 'Travel',
    tags: ['Hidden Gems', 'Local Tips', 'Authentic Morocco'],
    publishedAt: '2025-10-20',
    readTime: 7,
  },
  {
    id: 4,
    slug: 'moroccan-cuisine-journey',
    title: 'A Journey Through Moroccan Cuisine',
    excerpt: 'From street food to fine dining: exploring the rich tapestry of Moroccan flavors.',
    content: `Moroccan cuisine is a testament to centuries of cultural exchange, blending Berber, Arab, Andalusian, and Mediterranean influences into a unique culinary tradition.

## The Art of Tagine

The iconic conical pot produces dishes of extraordinary depth. Slow-cooked meats, preserved lemons, olives, and aromatic spices combine in perfect harmony. Each region has its signature tagine.

## Couscous Friday

The traditional Friday lunch brings families together over steaming plates of hand-rolled couscous topped with tender vegetables and meat. This weekly ritual is sacred to Moroccan culture.

## Street Food Treasures

From the tangia of Marrakech to the fresh seafood of Essaouira, street food offers authentic flavors at their most vibrant. The legendary Jemaa el-Fna food stalls come alive at sunset.

## Modern Moroccan

A new generation of chefs is reimagining traditional dishes with contemporary techniques. Fine dining restaurants offer tasting menus that honor heritage while embracing innovation.

## The Sweet Finale

Moroccan pastries are works of art. From the honey-drenched chebakia to the almond-filled cornes de gazelle, each sweet tells a story of celebration and hospitality.`,
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=1200&h=800&fit=crop',
    author: 'Fatima Zahra',
    authorImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
    category: 'Cuisine',
    tags: ['Moroccan Food', 'Gastronomy', 'Culinary Arts'],
    publishedAt: '2025-09-15',
    readTime: 9,
  },
  {
    id: 5,
    slug: 'sustainable-luxury-morocco',
    title: 'Sustainable Luxury in Morocco',
    excerpt: 'How responsible tourism is shaping the future of luxury travel in Morocco.',
    content: `The concept of sustainable luxury is no longer a contradiction. Morocco's hospitality industry is leading the way in combining opulence with environmental responsibility.

## Solar-Powered Estates

Many luxury villas now operate entirely on solar power. The abundant Moroccan sunshine provides clean energy for pools, air conditioning, and all modern amenities.

## Water Conservation

Innovative water management systems, including greywater recycling and drought-resistant landscaping, preserve this precious resource while maintaining beautiful gardens.

## Supporting Local Communities

True luxury means positive impact. Partnerships with local artisans, fair employment practices, and community development projects ensure tourism benefits everyone.

## Organic Excellence

From organic gardens supplying villa kitchens to partnerships with local organic farms, sustainable gastronomy is becoming the norm in luxury hospitality.

## Preserving Heritage

Restoration projects that maintain traditional building techniques, support master craftsmen, and preserve architectural heritage contribute to Morocco's cultural sustainability.`,
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&h=800&fit=crop',
    author: 'Omar Benjelloun',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    category: 'Sustainability',
    tags: ['Sustainable Travel', 'Eco-Luxury', 'Responsible Tourism'],
    publishedAt: '2025-08-10',
    readTime: 6,
  },
]

export let experiences: Experience[] = [
  {
    id: 1,
    slug: 'private-spa-retreat',
    name: 'Private Spa Retreat',
    description: 'Indulge in a complete spa experience with traditional hammam, argan oil massage, and beauty treatments. Our expert therapists will guide you through ancient Moroccan wellness rituals in a private setting.',
    shortDescription: 'Traditional hammam and luxury spa treatments in your villa.',
    price: 350,
    duration: '3 hours',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=800&fit=crop',
    category: 'Wellness',
    highlights: ['Traditional Hammam', 'Argan Oil Massage', 'Facial Treatment', 'Private Setting'],
  },
  {
    id: 2,
    slug: 'private-chef-experience',
    name: 'Private Chef Experience',
    description: 'A renowned Moroccan chef will prepare an exquisite multi-course meal in your villa. From market sourcing to final presentation, experience the art of Moroccan cuisine firsthand.',
    shortDescription: 'Gourmet Moroccan cuisine prepared in your villa by a master chef.',
    price: 500,
    duration: '4-5 hours',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&h=800&fit=crop',
    category: 'Culinary',
    highlights: ['Market Tour', 'Cooking Demonstration', '5-Course Meal', 'Wine Pairing'],
  },
  {
    id: 3,
    slug: 'desert-dinner',
    name: 'Desert Dinner Under the Stars',
    description: 'Journey to the Agafay Desert for an unforgettable evening. Enjoy sunset canapés, a gourmet dinner, and stargazing in this magical setting with traditional music and fire dancers.',
    shortDescription: 'Magical evening in the Agafay Desert with gourmet dining.',
    price: 800,
    duration: '5 hours',
    image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&h=800&fit=crop',
    category: 'Dining',
    highlights: ['Private Transfer', 'Sunset Canapés', 'Gourmet Dinner', 'Live Entertainment'],
  },
  {
    id: 4,
    slug: 'golf-day',
    name: 'Royal Golf Experience',
    description: 'Play on championship courses designed by legendary architects. Includes private caddy, luxury golf cart, and refreshments at the clubhouse.',
    shortDescription: 'Championship golf on Marrakech\'s finest courses.',
    price: 400,
    duration: 'Full Day',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&h=800&fit=crop',
    category: 'Sport',
    highlights: ['Championship Course', 'Private Caddy', 'Club Rental', 'Clubhouse Lunch'],
  },
  {
    id: 5,
    slug: 'private-event',
    name: 'Exclusive Event Planning',
    description: 'From intimate celebrations to grand soirées, we orchestrate unforgettable events. Our team handles every detail from venue selection to entertainment.',
    shortDescription: 'Bespoke event planning for any occasion.',
    price: 2000,
    duration: 'Custom',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop',
    category: 'Events',
    highlights: ['Venue Selection', 'Catering', 'Entertainment', 'Decor & Florals'],
  },
  {
    id: 6,
    slug: 'hot-air-balloon',
    name: 'Hot Air Balloon at Sunrise',
    description: 'Soar above the palm groves and Atlas Mountains as the sun rises over Marrakech. Includes champagne breakfast upon landing.',
    shortDescription: 'Breathtaking sunrise flight over Marrakech.',
    price: 450,
    duration: '3 hours',
    image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1200&h=800&fit=crop',
    category: 'Adventure',
    highlights: ['Sunrise Flight', 'Champagne Breakfast', 'Certificate', 'Photos'],
  },
  {
    id: 7,
    slug: 'atlas-excursion',
    name: 'Atlas Mountains Expedition',
    description: 'Explore the majestic Atlas Mountains with a private guide. Visit Berber villages, enjoy a traditional lunch, and discover hidden waterfalls.',
    shortDescription: 'Private guided tour of the Atlas Mountains.',
    price: 350,
    duration: 'Full Day',
    image: 'https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=1200&h=800&fit=crop',
    category: 'Adventure',
    highlights: ['Private Guide', 'Berber Village Visit', 'Traditional Lunch', '4x4 Transport'],
  },
  {
    id: 8,
    slug: 'shopping-experience',
    name: 'Exclusive Shopping Experience',
    description: 'Access private showrooms and meet master artisans with our expert shopping guide. Discover authentic treasures from rugs to jewelry.',
    shortDescription: 'Curated shopping with access to hidden gems.',
    price: 250,
    duration: '4 hours',
    image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=1200&h=800&fit=crop',
    category: 'Lifestyle',
    highlights: ['Expert Guide', 'Private Showrooms', 'Artisan Meetings', 'Negotiation Assistance'],
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'James Richardson',
    title: 'CEO',
    company: 'Richardson Capital',
    content: 'Moz Immo exceeded every expectation. From the moment we arrived, every detail was flawless. The villa was magnificent, and the concierge service anticipated our every need. This is the gold standard of luxury travel.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop',
    rating: 5,
  },
  {
    id: 2,
    name: 'Caroline Dubois',
    title: 'Fashion Designer',
    content: 'I have stayed in luxury properties around the world, but the level of service and attention to detail at Moz Immo properties is unmatched. They transformed our family vacation into an unforgettable experience.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mohammed Al-Rashid',
    title: 'Entrepreneur',
    content: 'Privacy, discretion, and impeccable service. Moz Immo understands what high-net-worth clients truly need. I wouldn\'t trust anyone else with my Marrakech properties or travel arrangements.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    rating: 5,
  },
  {
    id: 4,
    name: 'Elena Petrova',
    title: 'Art Collector',
    content: 'The team arranged private viewings at galleries I didn\'t know existed and introduced me to incredible local artists. Their cultural knowledge and connections are invaluable.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    rating: 5,
  },
  {
    id: 5,
    name: 'Thomas Weber',
    title: 'Managing Director',
    company: 'Weber Industries',
    content: 'We hosted our executive retreat through Moz Immo. The seamless coordination, exclusive venues, and exceptional hospitality made it our most successful corporate event ever.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    rating: 5,
  },
]

export const services: Service[] = [
  {
    id: 1,
    slug: 'villa-management',
    name: 'Villa Management',
    description: 'Comprehensive property management services for luxury villa owners in Marrakech. We handle everything from maintenance and staff management to guest services and revenue optimization. Our dedicated team ensures your property is always in pristine condition and generating optimal returns.',
    shortDescription: 'Complete care for your Marrakech property investment.',
    icon: 'Home',
    features: [
      '24/7 Property Monitoring',
      'Staff Recruitment & Training',
      'Maintenance & Repairs',
      'Guest Management',
      'Financial Reporting',
      'Legal Compliance',
    ],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
  },
  {
    id: 2,
    slug: 'luxury-villa-rentals',
    name: 'Luxury Villa Rentals',
    description: 'Access our curated collection of the finest villas in Marrakech. Each property is handpicked for its exceptional quality, location, and service standards. From traditional riads to contemporary estates, we match you with your perfect Moroccan retreat.',
    shortDescription: 'Curated collection of Marrakech\'s finest properties.',
    icon: 'Key',
    features: [
      'Verified Luxury Properties',
      'Personal Villa Matching',
      'Pre-Arrival Concierge',
      'In-Villa Services',
      'Flexible Booking',
      'VIP Amenities',
    ],
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop',
  },
  {
    id: 3,
    slug: 'car-services',
    name: 'Car Services & Transfers',
    description: 'Travel in style with our fleet of luxury vehicles and professional chauffeurs. From airport transfers to day excursions, we provide seamless transportation that matches the quality of your accommodation.',
    shortDescription: 'Luxury transportation with professional chauffeurs.',
    icon: 'Car',
    features: [
      'Luxury Fleet',
      'Professional Chauffeurs',
      'Airport Transfers',
      'Day Excursions',
      '24/7 Availability',
      'Multilingual Drivers',
    ],
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop',
  },
  {
    id: 4,
    slug: 'lifestyle-concierge',
    name: 'Lifestyle Concierge',
    description: 'Your personal key to Marrakech\'s finest experiences. From restaurant reservations and spa appointments to private events and exclusive access, our lifestyle concierge team makes the impossible possible.',
    shortDescription: 'Bespoke experiences and exclusive access.',
    icon: 'Sparkles',
    features: [
      'Restaurant Reservations',
      'Spa & Wellness Bookings',
      'Private Experiences',
      'Event Planning',
      'Personal Shopping',
      '24/7 Concierge Line',
    ],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=800&fit=crop',
  },
]

// Demo reservations for client dashboard
export let reservations: Reservation[] = [
  {
    id: 1,
    userId: 3,
    type: 'villa',
    itemId: 1,
    itemName: 'Riad Elegance',
    checkIn: '2026-02-15',
    checkOut: '2026-02-22',
    guests: 4,
    totalPrice: 5600,
    status: 'confirmed',
    createdAt: '2026-01-10',
  },
  {
    id: 2,
    userId: 3,
    type: 'car',
    itemId: 1,
    itemName: 'Mercedes S-Class',
    checkIn: '2026-02-15',
    checkOut: '2026-02-22',
    guests: 2,
    totalPrice: 3000,
    status: 'confirmed',
    createdAt: '2026-01-12',
  },
  {
    id: 3,
    userId: 3,
    type: 'experience',
    itemId: 3,
    itemName: 'Desert Dinner Under the Stars',
    checkIn: '2026-02-18',
    checkOut: '2026-02-18',
    guests: 4,
    totalPrice: 800,
    status: 'pending',
    createdAt: '2026-01-15',
  },
]

export let invoices: Invoice[] = [
  {
    id: 1,
    reservationId: 1,
    userId: 3,
    amount: 5600,
    status: 'paid',
    dueDate: '2026-02-01',
    paidAt: '2026-01-25',
    items: [
      { description: 'Riad Elegance - 7 nights', amount: 5600 },
    ],
  },
  {
    id: 2,
    reservationId: 2,
    userId: 3,
    amount: 3150,
    status: 'pending',
    dueDate: '2026-02-10',
    items: [
      { description: 'Mercedes S-Class - 7 days', amount: 3000 },
      { description: 'Chauffeur Service', amount: 150 },
    ],
  },
]

// ============================================
// DATA OPERATIONS (IN-MEMORY CRUD)
// ============================================

// Villas
export function getVillas(): Villa[] {
  return villas
}

export function getVillaBySlug(slug: string): Villa | undefined {
  return villas.find(v => v.slug === slug)
}

export function getVillaById(id: number): Villa | undefined {
  return villas.find(v => v.id === id)
}

export function addVilla(villa: Omit<Villa, 'id' | 'createdAt' | 'updatedAt'>): Villa {
  const newVilla: Villa = {
    ...villa,
    id: Math.max(...villas.map(v => v.id)) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  villas.push(newVilla)
  return newVilla
}

export function updateVilla(id: number, updates: Partial<Villa>): Villa | undefined {
  const index = villas.findIndex(v => v.id === id)
  if (index === -1) return undefined
  villas[index] = { ...villas[index], ...updates, updatedAt: new Date().toISOString() }
  return villas[index]
}

export function deleteVilla(id: number): boolean {
  const index = villas.findIndex(v => v.id === id)
  if (index === -1) return false
  villas.splice(index, 1)
  return true
}

// Cars
export function getCars(): Car[] {
  return cars
}

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find(c => c.slug === slug)
}

// Blog
export function getBlogPosts(): BlogPost[] {
  return blogPosts
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug)
}

export function addBlogPost(post: Omit<BlogPost, 'id'>): BlogPost {
  const newPost: BlogPost = {
    ...post,
    id: Math.max(...blogPosts.map(p => p.id)) + 1,
  }
  blogPosts.push(newPost)
  return newPost
}

// Experiences
export function getExperiences(): Experience[] {
  return experiences
}

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find(e => e.slug === slug)
}

// Services
export function getServices(): Service[] {
  return services
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug)
}

// Testimonials
export function getTestimonials(): Testimonial[] {
  return testimonials
}

// Reservations
export function getReservationsByUser(userId: number): Reservation[] {
  return reservations.filter(r => r.userId === userId)
}

export function getAllReservations(): Reservation[] {
  return reservations
}

export const getReservations = getAllReservations

// Invoices
export function getInvoicesByUser(userId: number): Invoice[] {
  return invoices.filter(i => i.userId === userId)
}

export function getAllInvoices(): Invoice[] {
  return invoices
}

export const getInvoices = getAllInvoices

// Analytics (mock data for admin dashboard)
export function getAnalytics() {
  return {
    totalBookings: 156,
    totalRevenue: 485000,
    averageBookingValue: 3109,
    occupancyRate: 78,
    popularVillas: villas.slice(0, 5).map(v => ({ name: v.name, bookings: Math.floor(Math.random() * 20) + 5 })),
    monthlyRevenue: [
      { month: 'Jan', revenue: 42000 },
      { month: 'Feb', revenue: 38000 },
      { month: 'Mar', revenue: 55000 },
      { month: 'Apr', revenue: 48000 },
      { month: 'May', revenue: 52000 },
      { month: 'Jun', revenue: 61000 },
    ],
    clientInsights: {
      totalClients: 89,
      repeatClients: 34,
      averageStay: 5.2,
      topNationalities: ['France', 'UK', 'Germany', 'USA', 'UAE'],
    },
  }
}
