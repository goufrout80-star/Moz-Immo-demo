'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, Users, Bed, X, Search, SlidersHorizontal, 
  Home, Car, Sparkles, Compass, Clock, Check, ArrowRight,
  Grid3X3, LayoutList, Cog, MessageCircle
} from 'lucide-react'
import { Button, Badge, Input, Textarea, Modal } from '@/components/ui'
import { getVillas, getCars, getExperiences, getServices, Villa, Car as CarType, Experience, Service } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import { sendBookingEmail, sendContactEmail } from '@/lib/email'
import { generateWhatsAppLink, messageTemplates } from '@/lib/whatsapp'

// ============================================
// TYPES & CONSTANTS
// ============================================
type Category = 'villas' | 'cars' | 'experiences' | 'services'
type ViewMode = 'grid' | 'list'
type FilterMode = 'simple' | 'advanced'

const CATEGORIES = [
  { id: 'villas' as Category, label: 'Villas', icon: Home },
  { id: 'cars' as Category, label: 'Cars', icon: Car },
  { id: 'experiences' as Category, label: 'Experiences', icon: Compass },
  { id: 'services' as Category, label: 'Services', icon: Sparkles },
]

const VILLA_LOCATIONS = ['All', 'Palmeraie', 'Medina', 'Amelkis', 'Route de Fès', 'Route de Ouarzazate', 'Agdal', 'Hivernage', 'Targa']
const VILLA_CAPACITIES = [
  { value: '', label: 'Any capacity' },
  { value: '6', label: 'Up to 6 guests' },
  { value: '8', label: 'Up to 8 guests' },
  { value: '10', label: 'Up to 10 guests' },
  { value: '12', label: 'Up to 12 guests' },
  { value: '14', label: '14+ guests' },
]
const VILLA_PRICES = [
  { value: '', label: 'Any price' },
  { value: '0-1000', label: 'Under €1,000/night' },
  { value: '1000-2000', label: '€1,000 - €2,000/night' },
  { value: '2000-3500', label: '€2,000 - €3,500/night' },
  { value: '3500-99999', label: '€3,500+/night' },
]

const CAR_BRANDS = ['All', 'Mercedes-Benz', 'Land Rover', 'Bentley', 'Rolls-Royce', 'Porsche']
const CAR_PRICES = [
  { value: '', label: 'Any price' },
  { value: '0-500', label: 'Under €500/day' },
  { value: '500-800', label: '€500 - €800/day' },
  { value: '800-99999', label: '€800+/day' },
]

const EXPERIENCE_CATEGORIES = ['All', 'Wellness', 'Culinary', 'Dining', 'Sport', 'Events', 'Adventure', 'Lifestyle']

// ============================================
// CATEGORY TAB SWITCHER (with Links)
// ============================================
function CategoryTabs({ active }: { active: Category }) {
  const allVillas = getVillas()
  const allCars = getCars()
  const allExperiences = getExperiences()
  const allServices = getServices()

  const counts = {
    villas: allVillas.length,
    cars: allCars.length,
    experiences: allExperiences.length,
    services: allServices.length,
  }

  return (
    <div className="flex items-center justify-center gap-2 p-1.5 bg-gray-100 dark:bg-white/5 rounded-2xl">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon
        const isActive = active === cat.id
        return (
          <Link
            key={cat.id}
            href={`/discover/${cat.id}`}
            className={`
              relative flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-colors
              ${isActive ? 'text-luxury-charcoal dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white dark:bg-luxury-slate rounded-xl shadow-lg"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {cat.label}
              <span className={`
                px-2 py-0.5 text-xs rounded-full
                ${isActive ? 'bg-luxury-gold/20 text-luxury-gold' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}
              `}>
                {counts[cat.id]}
              </span>
            </span>
          </Link>
        )
      })}
    </div>
  )
}

// ============================================
// FILTER COMPONENTS
// ============================================
function VillaFilters({
  filters,
  setFilters,
  mode,
}: {
  filters: { location: string; capacity: string; priceRange: string; search: string; bedrooms: string }
  setFilters: (f: any) => void
  mode: FilterMode
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {VILLA_LOCATIONS.slice(0, mode === 'simple' ? 5 : VILLA_LOCATIONS.length).map((loc) => (
          <button
            key={loc}
            onClick={() => setFilters({ ...filters, location: loc })}
            className={`
              px-4 py-2 text-sm rounded-full transition-all duration-300
              ${filters.location === loc
                ? 'bg-luxury-gold text-luxury-charcoal font-medium'
                : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-luxury-gold/50'}
            `}
          >
            {loc}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {mode === 'advanced' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-white/10">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Capacity</label>
                <select
                  value={filters.capacity}
                  onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                >
                  {VILLA_CAPACITIES.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                >
                  {VILLA_PRICES.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Bedrooms</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                >
                  <option value="">Any bedrooms</option>
                  <option value="3">3+ bedrooms</option>
                  <option value="4">4+ bedrooms</option>
                  <option value="5">5+ bedrooms</option>
                  <option value="6">6+ bedrooms</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search villas..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CarFilters({
  filters,
  setFilters,
  mode,
}: {
  filters: { brand: string; priceRange: string; seats: string }
  setFilters: (f: any) => void
  mode: FilterMode
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CAR_BRANDS.map((brand) => (
          <button
            key={brand}
            onClick={() => setFilters({ ...filters, brand })}
            className={`
              px-4 py-2 text-sm rounded-full transition-all duration-300
              ${filters.brand === brand
                ? 'bg-luxury-gold text-luxury-charcoal font-medium'
                : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-luxury-gold/50'}
            `}
          >
            {brand}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {mode === 'advanced' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-white/10">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Daily Rate</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                >
                  {CAR_PRICES.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Seats</label>
                <select
                  value={filters.seats}
                  onChange={(e) => setFilters({ ...filters, seats: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                >
                  <option value="">Any seats</option>
                  <option value="2">2 seats</option>
                  <option value="4">4+ seats</option>
                  <option value="5">5+ seats</option>
                  <option value="7">7+ seats</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ExperienceFilters({
  filters,
  setFilters,
}: {
  filters: { category: string; priceRange: string }
  setFilters: (f: any) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {EXPERIENCE_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setFilters({ ...filters, category: cat })}
          className={`
            px-4 py-2 text-sm rounded-full transition-all duration-300
            ${filters.category === cat
              ? 'bg-luxury-gold text-luxury-charcoal font-medium'
              : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-luxury-gold/50'}
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

// ============================================
// ITEM CARDS
// ============================================
function VillaCard({ villa, view }: { villa: Villa; view: ViewMode }) {
  if (view === 'list') {
    return (
      <Link href={`/villas/${villa.slug}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="group flex gap-6 p-4 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 hover:shadow-xl hover:border-luxury-gold/30 transition-all duration-300"
        >
          <div className="relative w-48 h-36 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={villa.images[0]} alt={villa.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            {villa.verified && <Badge variant="gold" className="absolute top-2 left-2 text-xs">Verified</Badge>}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-luxury-charcoal dark:text-white group-hover:text-luxury-gold transition-colors truncate">{villa.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{villa.location}</span>
              <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{villa.bedrooms} beds</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{villa.capacity}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{villa.shortDescription}</p>
            <div className="mt-3">
              <span className="text-xl font-bold text-luxury-gold">{formatPrice(villa.price)}</span>
              <span className="text-gray-500 text-sm">/night</span>
            </div>
          </div>
        </motion.div>
      </Link>
    )
  }

  return (
    <Link href={`/villas/${villa.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className="group h-full bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 hover:shadow-xl hover:border-luxury-gold/30 transition-all duration-300"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={villa.images[0]} alt={villa.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-3 left-3 flex gap-2">
            {villa.verified && <Badge variant="gold" className="text-xs">Verified</Badge>}
            {!villa.available && <Badge variant="error" className="text-xs">Booked</Badge>}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-luxury-charcoal dark:text-white group-hover:text-luxury-gold transition-colors">{villa.name}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{villa.location}</span>
            <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{villa.bedrooms}</span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{villa.capacity}</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10">
            <span className="text-2xl font-bold text-luxury-gold">{formatPrice(villa.price)}</span>
            <span className="text-gray-500">/night</span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

function CarCard({ car, onBook }: { car: CarType; onBook: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group h-full bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 hover:shadow-xl hover:border-luxury-gold/30 transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={car.images[0]} alt={`${car.brand} ${car.model}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <Badge variant="gold" className="absolute top-3 left-3 text-xs">{car.brand}</Badge>
        {!car.available && <Badge variant="error" className="absolute top-3 right-3 text-xs">Unavailable</Badge>}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-luxury-charcoal dark:text-white group-hover:text-luxury-gold transition-colors">{car.brand} {car.model}</h3>
        <p className="text-sm text-gray-500">{car.year}</p>
        <div className="flex gap-4 text-sm text-gray-500 mt-3">
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{car.seats} seats</span>
          <span className="flex items-center gap-1"><Cog className="w-3.5 h-3.5" />{car.transmission}</span>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-white/10">
          <div>
            <span className="text-2xl font-bold text-luxury-gold">{formatPrice(car.dailyRate)}</span>
            <span className="text-gray-500">/day</span>
          </div>
          <Button size="sm" onClick={onBook} disabled={!car.available}>
            {car.available ? 'Book' : 'Unavailable'}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

function ExperienceCard({ experience, onBook }: { experience: Experience; onBook: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group h-full bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 hover:shadow-xl hover:border-luxury-gold/30 transition-all duration-300"
    >
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-square md:aspect-auto overflow-hidden">
          <Image src={experience.image} alt={experience.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <Badge variant="gold" className="absolute top-3 left-3 text-xs">{experience.category}</Badge>
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-luxury-charcoal dark:text-white group-hover:text-luxury-gold transition-colors">{experience.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">{experience.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
              <Clock className="w-3.5 h-3.5" />
              {experience.duration}
            </div>
            <ul className="mt-3 space-y-1">
              {experience.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Check className="w-3 h-3 text-luxury-gold" />{h}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-white/10">
            <div>
              <span className="text-2xl font-bold text-luxury-gold">{formatPrice(experience.price)}</span>
              <span className="text-gray-500 text-sm">/person</span>
            </div>
            <Button size="sm" onClick={onBook}>Book</Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ServiceCard({ service, onRequest }: { service: Service; onRequest: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group h-full bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 hover:shadow-xl hover:border-luxury-gold/30 transition-all duration-300"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={service.image} alt={service.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-semibold text-white">{service.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{service.shortDescription}</p>
        <ul className="mt-4 space-y-2">
          {service.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Check className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />{f}
            </li>
          ))}
        </ul>
        <Button className="w-full mt-5" onClick={onRequest}>
          Request Service <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function DiscoverCategoryPage() {
  const params = useParams()
  const router = useRouter()
  const categoryParam = params.category as string

  // Validate category
  const validCategories: Category[] = ['villas', 'cars', 'experiences', 'services']
  const activeCategory: Category = validCategories.includes(categoryParam as Category) 
    ? (categoryParam as Category) 
    : 'villas'

  // Redirect if invalid category
  useEffect(() => {
    if (!validCategories.includes(categoryParam as Category)) {
      router.replace('/discover/villas')
    }
  }, [categoryParam, router])

  // Data
  const allVillas = getVillas()
  const allCars = getCars()
  const allExperiences = getExperiences()
  const allServices = getServices()

  // UI State
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [filterMode, setFilterMode] = useState<FilterMode>('simple')

  // Filters
  const [villaFilters, setVillaFilters] = useState({ location: 'All', capacity: '', priceRange: '', search: '', bedrooms: '' })
  const [carFilters, setCarFilters] = useState({ brand: 'All', priceRange: '', seats: '' })
  const [experienceFilters, setExperienceFilters] = useState({ category: 'All', priceRange: '' })

  // Modal State
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null)
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', startDate: '', endDate: '', guests: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Filtered Data
  const filteredVillas = useMemo(() => {
    return allVillas.filter(villa => {
      if (villaFilters.location !== 'All' && villa.location !== villaFilters.location) return false
      if (villaFilters.capacity) {
        const maxCap = parseInt(villaFilters.capacity)
        if (maxCap === 14 && villa.capacity < 14) return false
        if (maxCap !== 14 && villa.capacity > maxCap) return false
      }
      if (villaFilters.priceRange) {
        const [min, max] = villaFilters.priceRange.split('-').map(Number)
        if (villa.price < min || villa.price > max) return false
      }
      if (villaFilters.bedrooms && villa.bedrooms < parseInt(villaFilters.bedrooms)) return false
      if (villaFilters.search && !villa.name.toLowerCase().includes(villaFilters.search.toLowerCase())) return false
      return true
    })
  }, [allVillas, villaFilters])

  const filteredCars = useMemo(() => {
    return allCars.filter(car => {
      if (carFilters.brand !== 'All' && car.brand !== carFilters.brand) return false
      if (carFilters.priceRange) {
        const [min, max] = carFilters.priceRange.split('-').map(Number)
        if (car.dailyRate < min || car.dailyRate > max) return false
      }
      if (carFilters.seats && car.seats < parseInt(carFilters.seats)) return false
      return true
    })
  }, [allCars, carFilters])

  const filteredExperiences = useMemo(() => {
    return allExperiences.filter(exp => {
      if (experienceFilters.category !== 'All' && exp.category !== experienceFilters.category) return false
      return true
    })
  }, [allExperiences, experienceFilters])

  const getCurrentCount = () => {
    switch (activeCategory) {
      case 'villas': return filteredVillas.length
      case 'cars': return filteredCars.length
      case 'experiences': return filteredExperiences.length
      case 'services': return allServices.length
    }
  }

  const clearFilters = () => {
    switch (activeCategory) {
      case 'villas':
        setVillaFilters({ location: 'All', capacity: '', priceRange: '', search: '', bedrooms: '' })
        break
      case 'cars':
        setCarFilters({ brand: 'All', priceRange: '', seats: '' })
        break
      case 'experiences':
        setExperienceFilters({ category: 'All', priceRange: '' })
        break
    }
  }

  // Form handlers
  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', startDate: '', endDate: '', guests: '', message: '' })
    setSubmitted(false)
  }

  const handleCarBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCar) return
    setSubmitting(true)
    await sendBookingEmail({
      name: formData.name, email: formData.email, phone: formData.phone,
      itemType: 'car', itemName: `${selectedCar.brand} ${selectedCar.model}`,
      checkIn: formData.startDate, checkOut: formData.endDate, specialRequests: formData.message,
    })
    setSubmitting(false)
    setSubmitted(true)
    setTimeout(() => { setSelectedCar(null); resetForm() }, 2000)
  }

  const handleExperienceBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedExperience) return
    setSubmitting(true)
    await sendBookingEmail({
      name: formData.name, email: formData.email, phone: formData.phone,
      itemType: 'experience', itemName: selectedExperience.name,
      checkIn: formData.startDate, guests: parseInt(formData.guests) || undefined, specialRequests: formData.message,
    })
    setSubmitting(false)
    setSubmitted(true)
    setTimeout(() => { setSelectedExperience(null); resetForm() }, 2000)
  }

  const handleServiceRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedService) return
    setSubmitting(true)
    await sendContactEmail({
      name: formData.name, email: formData.email, phone: formData.phone,
      subject: `Service Request: ${selectedService.name}`, message: formData.message,
    })
    setSubmitting(false)
    setSubmitted(true)
    setTimeout(() => { setSelectedService(null); resetForm() }, 2000)
  }

  const categoryTitles = {
    villas: 'Luxury Villas',
    cars: 'Luxury Fleet',
    experiences: 'Curated Experiences',
    services: 'Premium Services',
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-[calc(5rem+var(--banner-height)+1.5rem)] pb-12 bg-gradient-to-b from-luxury-cream to-white dark:from-luxury-slate dark:to-luxury-charcoal">
        <div className="container-luxury">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <motion.h1
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-luxury-charcoal dark:text-white mb-4"
            >
              Discover <span className="text-gradient-gold">{categoryTitles[activeCategory]}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              Explore our curated collection of luxury offerings in Marrakech
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <CategoryTabs active={activeCategory} />
          </motion.div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-8 bg-white dark:bg-luxury-charcoal">
        <div className="container-luxury">
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
            <div className="flex-1">
              {activeCategory === 'villas' && <VillaFilters filters={villaFilters} setFilters={setVillaFilters} mode={filterMode} />}
              {activeCategory === 'cars' && <CarFilters filters={carFilters} setFilters={setCarFilters} mode={filterMode} />}
              {activeCategory === 'experiences' && <ExperienceFilters filters={experienceFilters} setFilters={setExperienceFilters} />}
              {activeCategory === 'services' && <p className="text-sm text-gray-500">Showing all premium services</p>}
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              {activeCategory !== 'services' && (
                <button
                  onClick={() => setFilterMode(filterMode === 'simple' ? 'advanced' : 'simple')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filterMode === 'advanced' 
                      ? 'bg-luxury-gold text-luxury-charcoal' 
                      : 'bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 hover:border-luxury-gold/50'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {filterMode === 'simple' ? 'Advanced' : 'Simple'}
                </button>
              )}

              {activeCategory === 'villas' && (
                <div className="flex bg-white dark:bg-white/10 rounded-xl p-1 border border-gray-200 dark:border-white/10">
                  <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-luxury-gold text-luxury-charcoal' : 'text-gray-500 hover:text-gray-700'}`}>
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-luxury-gold text-luxury-charcoal' : 'text-gray-500 hover:text-gray-700'}`}>
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              )}

              <span className="text-sm text-gray-500 dark:text-gray-400">{getCurrentCount()} results</span>

              {activeCategory !== 'services' && (
                <button onClick={clearFilters} className="text-sm text-luxury-gold hover:underline flex items-center gap-1">
                  <X className="w-3.5 h-3.5" /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Content Grid */}
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              {activeCategory === 'villas' && (
                filteredVillas.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-xl text-gray-500 mb-4">No villas match your criteria</p>
                    <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                  </div>
                ) : (
                  <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                    {filteredVillas.map((villa) => <VillaCard key={villa.id} villa={villa} view={viewMode} />)}
                  </div>
                )
              )}

              {activeCategory === 'cars' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCars.map((car) => <CarCard key={car.id} car={car} onBook={() => setSelectedCar(car)} />)}
                </div>
              )}

              {activeCategory === 'experiences' && (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredExperiences.map((exp) => <ExperienceCard key={exp.id} experience={exp} onBook={() => setSelectedExperience(exp)} />)}
                </div>
              )}

              {activeCategory === 'services' && (
                <div className="grid md:grid-cols-2 gap-6">
                  {allServices.map((service) => <ServiceCard key={service.id} service={service} onRequest={() => setSelectedService(service)} />)}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Booking Modals */}
      <Modal isOpen={selectedCar !== null} onClose={() => setSelectedCar(null)} title={selectedCar ? `Book ${selectedCar.brand} ${selectedCar.model}` : ''} size="lg">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-green-600 dark:text-green-400" /></div>
            <h3 className="text-xl font-semibold mb-2">Booking Request Sent!</h3>
            <p className="text-gray-600 dark:text-gray-400">We&apos;ll confirm your reservation shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleCarBooking} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <Input label="Phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Pick-up Date" type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
              <Input label="Return Date" type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} required />
            </div>
            <Textarea label="Special Requests" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} />
            <div className="flex gap-3">
              <Button type="submit" className="flex-1" loading={submitting}>Send Request</Button>
              <Button type="button" variant="outline" onClick={() => selectedCar && window.open(generateWhatsAppLink(messageTemplates.carInquiry(`${selectedCar.brand} ${selectedCar.model}`, {})), '_blank')}>
                <MessageCircle className="w-4 h-4 mr-2" />WhatsApp
              </Button>
            </div>
          </form>
        )}
      </Modal>

      <Modal isOpen={selectedExperience !== null} onClose={() => setSelectedExperience(null)} title={selectedExperience ? `Book: ${selectedExperience.name}` : ''} size="lg">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-green-600 dark:text-green-400" /></div>
            <h3 className="text-xl font-semibold mb-2">Booking Request Sent!</h3>
            <p className="text-gray-600 dark:text-gray-400">We&apos;ll confirm your experience shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleExperienceBooking} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <Input label="Phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Preferred Date" type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
              <Input label="Number of Guests" type="number" min="1" value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: e.target.value })} required />
            </div>
            <Textarea label="Special Requests" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} />
            <div className="flex gap-3">
              <Button type="submit" className="flex-1" loading={submitting}>Send Request</Button>
              <Button type="button" variant="outline" onClick={() => selectedExperience && window.open(generateWhatsAppLink(messageTemplates.experienceInquiry(selectedExperience.name, formData.startDate)), '_blank')}>
                <MessageCircle className="w-4 h-4 mr-2" />WhatsApp
              </Button>
            </div>
          </form>
        )}
      </Modal>

      <Modal isOpen={selectedService !== null} onClose={() => setSelectedService(null)} title={`Request: ${selectedService?.name || ''}`} size="lg">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-green-600 dark:text-green-400" /></div>
            <h3 className="text-xl font-semibold mb-2">Request Submitted!</h3>
            <p className="text-gray-600 dark:text-gray-400">We&apos;ll get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleServiceRequest} className="space-y-4">
            <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <Input label="Phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            <Textarea label="Tell us about your needs" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} />
            <div className="flex gap-3">
              <Button type="submit" className="flex-1" loading={submitting}>Send Request</Button>
              <Button type="button" variant="outline" onClick={() => selectedService && window.open(generateWhatsAppLink(messageTemplates.serviceRequest(selectedService.name, formData.message)), '_blank')}>
                <MessageCircle className="w-4 h-4 mr-2" />WhatsApp
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  )
}
