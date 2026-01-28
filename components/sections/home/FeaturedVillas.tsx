'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Bed, Users, ArrowUpRight } from 'lucide-react'
import { Villa } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface FeaturedVillasProps {
  villas: Villa[]
}

// Clean minimal villa card
function VillaCard({ villa, index }: { villa: Villa; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/villas/${villa.slug}`} className="group block">
        {/* Image container */}
        <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
          <Image
            src={villa.images[0]}
            alt={villa.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Location badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-gray-800">
              {villa.location}
            </span>
          </div>
          
          {/* Arrow indicator */}
          <motion.div
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowUpRight className="w-4 h-4 text-gray-800" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white group-hover:text-luxury-gold transition-colors duration-300">
            {villa.name}
          </h3>

          {/* Details */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" />
              {villa.bedrooms} bedrooms
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              {villa.capacity} guests
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatPrice(villa.price)}
            </span>
            <span className="text-sm text-gray-400">/night</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function FeaturedVillas({ villas }: FeaturedVillasProps) {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-white dark:bg-luxury-charcoal">
      <div className="container-wide">
        {/* Section Header - Clean & Minimal */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0 }}
                animate={isHeaderInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="text-sm font-medium uppercase tracking-widest text-luxury-gold mb-4"
              >
                Featured Properties
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-gray-900 dark:text-white leading-tight"
              >
                Exceptional villas,
                <br />
                <span className="text-gray-400 dark:text-gray-500">curated for you</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link 
                href="/discover/villas"
                className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-luxury-gold dark:hover:text-luxury-gold transition-colors"
              >
                View all properties
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Clean Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {villas.slice(0, 6).map((villa, index) => (
            <VillaCard key={villa.id} villa={villa} index={index} />
          ))}
        </div>

        {/* Simple bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-20 text-center"
        >
          <Link 
            href="/discover/villas"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium hover:bg-luxury-gold hover:text-gray-900 transition-all duration-300"
          >
            Explore All Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
