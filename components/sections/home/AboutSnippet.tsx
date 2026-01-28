'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// Rotating words for the typing effect
const ROTATING_WORDS = [
  'luxury experiences',
  'dream vacations',
  'unforgettable stays',
  'exclusive retreats',
  'bespoke journeys',
  'private escapes',
  'curated moments',
  'timeless memories',
  'elite hospitality',
  'refined living',
  'serene getaways',
  'exceptional service',
]

// Typewriter effect component
function TypewriterText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentWord = ROTATING_WORDS[currentIndex]
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 2000)
      return () => clearTimeout(pauseTimer)
    }

    const typeSpeed = isDeleting ? 40 : 80
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
        } else {
          setIsPaused(true)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
        }
      }
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentIndex, isPaused])

  return (
    <span className="text-gradient-gold">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[2px] h-[0.9em] bg-luxury-gold ml-1 align-middle"
      />
    </span>
  )
}

export function AboutSnippet() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" })

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 md:py-16 bg-luxury-cream dark:bg-luxury-charcoal overflow-hidden"
    >
      {/* Subtle top/bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent" />

      <div className="container-wide relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left: Heading with typewriter */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-luxury-charcoal dark:text-white leading-tight">
              Crafting <TypewriterText />
            </h2>
          </motion.div>

          {/* Center: Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-sm md:text-base text-gray-600 dark:text-gray-400 text-center lg:text-left max-w-md"
          >
            15+ years connecting discerning travelers with Marrakech&apos;s finest luxury properties.
          </motion.p>

          {/* Right: CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <Link 
              href="/about"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-luxury-charcoal dark:bg-white text-white dark:text-luxury-charcoal text-sm font-medium rounded-full hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-300"
            >
              Our Story
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
