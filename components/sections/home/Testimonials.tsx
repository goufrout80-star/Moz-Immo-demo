'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Testimonial } from '@/lib/data'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

// Premium star rating with animation
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 400 }}
        >
          <Star 
            className={`w-5 h-5 ${i < rating ? 'fill-luxury-gold text-luxury-gold' : 'text-gray-200 dark:text-gray-700'}`} 
          />
        </motion.div>
      ))}
    </div>
  )
}

// Premium testimonial card with glassmorphism
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative">
      {/* Animated gradient border */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-luxury-gold/30 via-luxury-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Card content */}
      <div className="relative bg-white dark:bg-luxury-charcoal/40 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)]">
        {/* Top accent line */}
        <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />
        
        {/* Quote mark */}
        <div className="absolute -top-4 left-8 text-6xl font-serif text-luxury-gold/20 leading-none select-none">
          &ldquo;
        </div>

        {/* Rating */}
        <div className="mb-8">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Content with elegant typography */}
        <blockquote className="text-xl md:text-2xl lg:text-[1.75rem] text-luxury-charcoal dark:text-white leading-relaxed mb-10 font-light tracking-[-0.01em]">
          {testimonial.content}
        </blockquote>

        {/* Author section with premium styling */}
        <div className="flex items-center gap-5">
          {/* Avatar with gold ring */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-luxury-gold via-luxury-gold/50 to-transparent animate-[spin_8s_linear_infinite]" />
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white dark:ring-luxury-charcoal">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="font-semibold text-lg text-luxury-charcoal dark:text-white">
              {testimonial.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span>{testimonial.title}</span>
              {testimonial.company && (
                <>
                  <span className="w-1 h-1 rounded-full bg-luxury-gold" />
                  <span className="text-luxury-gold">{testimonial.company}</span>
                </>
              )}
            </div>
          </div>

          {/* Verified badge */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-luxury-gold/5 border border-luxury-gold/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-luxury-gold uppercase tracking-wider">Verified</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Progress bar for auto-advance
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200/50 dark:bg-white/10 overflow-hidden rounded-full">
      <motion.div
        className="h-full bg-gradient-to-r from-luxury-gold to-luxury-gold/70"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
    </div>
  )
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const DURATION = 6000 // 6 seconds per testimonial

  // Auto-advance with progress
  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setDirection(1)
          setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
          return 0
        }
        return prev + (100 / (DURATION / 100))
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPaused, testimonials.length])

  const goToNext = useCallback(() => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setProgress(0)
  }, [testimonials.length])

  const goToPrev = useCallback(() => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setProgress(0)
  }, [testimonials.length])

  const goToIndex = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
    setProgress(0)
  }, [activeIndex])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98
    })
  }

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-luxury-cream via-white to-luxury-cream dark:from-luxury-slate dark:via-luxury-charcoal dark:to-luxury-slate overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-luxury-gold/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-luxury-gold/[0.02] rounded-full blur-[100px]" />
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l border-t border-luxury-gold/10 hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r border-b border-luxury-gold/10 hidden lg:block" />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-[1px] bg-luxury-gold" />
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-luxury-gold">Client Stories</span>
            <span className="w-8 h-[1px] bg-luxury-gold" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-luxury-charcoal dark:text-white mb-6"
          >
            Trusted by the{' '}
            <span className="relative">
              <span className="text-gradient-gold">world&apos;s elite</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Exceptional experiences shared by our distinguished clientele
          </motion.p>
        </div>

        {/* Main Testimonial Carousel */}
        <div 
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 400, damping: 35 },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.3 }
                }}
                className="group"
              >
                <TestimonialCard testimonial={testimonials[activeIndex]} />
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="mt-6 relative">
              <ProgressBar progress={progress} />
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-between mt-10">
            {/* Prev button */}
            <motion.button
              onClick={goToPrev}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 text-luxury-charcoal dark:text-white hover:text-luxury-gold transition-colors"
            >
              <span className="w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:bg-luxury-gold group-hover:border-luxury-gold group-hover:text-luxury-charcoal transition-all duration-300">
                <ChevronLeft className="w-5 h-5" />
              </span>
              <span className="hidden sm:block text-sm font-medium uppercase tracking-wider">Previous</span>
            </motion.button>

            {/* Dot indicators with numbers */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToIndex(i)}
                  className="group relative"
                >
                  <span className={`
                    block w-10 h-10 rounded-full border-2 transition-all duration-300
                    ${i === activeIndex 
                      ? 'border-luxury-gold bg-luxury-gold/10' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-luxury-gold/50'}
                  `}>
                    <span className={`
                      absolute inset-0 flex items-center justify-center text-sm font-medium transition-colors
                      ${i === activeIndex ? 'text-luxury-gold' : 'text-gray-400 group-hover:text-luxury-gold'}
                    `}>
                      {i + 1}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {/* Next button */}
            <motion.button
              onClick={goToNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 text-luxury-charcoal dark:text-white hover:text-luxury-gold transition-colors"
            >
              <span className="hidden sm:block text-sm font-medium uppercase tracking-wider">Next</span>
              <span className="w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:bg-luxury-gold group-hover:border-luxury-gold group-hover:text-luxury-charcoal transition-all duration-300">
                <ChevronRight className="w-5 h-5" />
              </span>
            </motion.button>
          </div>
        </div>

        {/* Trust badges / Featured in */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 pt-10 border-t border-gray-200/50 dark:border-white/5"
        >
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-8">
            As featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { name: 'Forbes', style: 'font-serif italic' },
              { name: 'Condé Nast', style: 'font-serif' },
              { name: 'Traveler', style: 'font-sans font-light tracking-widest uppercase text-sm' },
              { name: 'Monocle', style: 'font-mono uppercase tracking-wider text-sm' },
              { name: 'Robb Report', style: 'font-serif italic' }
            ].map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="group relative"
              >
                <span className={`
                  ${brand.style}
                  text-lg md:text-xl text-gray-400 dark:text-gray-600 
                  group-hover:text-luxury-gold transition-colors duration-300
                `}>
                  {brand.name}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxury-gold group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link 
            href="/testimonials"
            className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-luxury-charcoal/20 dark:border-white/20 text-luxury-charcoal dark:text-white hover:bg-luxury-gold hover:border-luxury-gold hover:text-luxury-charcoal transition-all duration-300 group"
          >
            <span className="text-sm font-medium uppercase tracking-[0.15em]">
              View all testimonials
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
