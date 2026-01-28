'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Home, Key, Car, Sparkles, ArrowUpRight, ArrowRight } from 'lucide-react'
import { Service } from '@/lib/data'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ServicesPreviewProps {
  services: Service[]
}

// Animated heading component
function AnimatedHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Service card with hover effects
function ServiceCard({ service, index, isLarge = false }: { service: Service; index: number; isLarge?: boolean }) {
  const IconComponent = service.icon === 'Home' ? Home 
    : service.icon === 'Key' ? Key 
    : service.icon === 'Car' ? Car 
    : Sparkles

  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={isLarge ? 'md:col-span-2 md:row-span-2' : ''}
    >
      <Link href={`/services#${service.slug}`} className="block h-full">
        <motion.div
          className={`
            relative group h-full overflow-hidden rounded-2xl
            ${isLarge 
              ? 'min-h-[400px] md:min-h-[500px]' 
              : 'min-h-[280px]'}
            bg-luxury-charcoal
          `}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-luxury-charcoal/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
            {/* Icon */}
            <motion.div
              className="mb-4"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-luxury-gold/20 backdrop-blur-sm border border-luxury-gold/30 text-luxury-gold">
                <IconComponent className="w-6 h-6" />
              </div>
            </motion.div>

            {/* Title */}
            <h3 className={`
              font-display font-semibold text-white mb-2
              ${isLarge ? 'text-2xl md:text-3xl' : 'text-xl'}
            `}>
              {service.name}
            </h3>

            {/* Description */}
            <p className={`
              text-white/60 leading-relaxed mb-4
              ${isLarge ? 'text-base' : 'text-sm line-clamp-2'}
            `}>
              {service.shortDescription}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-2 text-luxury-gold text-sm font-medium">
              <span className="group-hover:underline underline-offset-4">Explore</span>
              <motion.div
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>

          {/* Hover border effect */}
          <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-luxury-gold/30 transition-colors duration-500" />
        </motion.div>
      </Link>
    </motion.div>
  )
}

export function ServicesPreview({ services }: ServicesPreviewProps) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-40 lg:py-48 bg-luxury-cream dark:bg-luxury-charcoal overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[180px]" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <AnimatedHeading>
            <span className="inline-block text-sm font-medium uppercase tracking-[0.2em] text-luxury-gold mb-4">
              Our Services
            </span>
          </AnimatedHeading>
          
          <AnimatedHeading>
            <h2 className="text-display-md text-luxury-charcoal dark:text-white mb-6">
              Comprehensive luxury services{' '}
              <span className="text-gradient-gold">tailored to you</span>
            </h2>
          </AnimatedHeading>
          
          <AnimatedHeading>
            <p className="text-body-lg max-w-xl">
              From villa management to bespoke experiences, we craft every detail 
              of your Marrakech journey with precision and elegance.
            </p>
          </AnimatedHeading>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isLarge={index === 0}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link 
            href="/discover/services"
            className="inline-flex items-center gap-3 text-luxury-charcoal dark:text-white hover:text-luxury-gold transition-colors group"
          >
            <span className="text-sm font-medium uppercase tracking-[0.15em]">
              View all services
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
