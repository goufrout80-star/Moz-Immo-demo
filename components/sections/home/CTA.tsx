'use client'

import Image from 'next/image'
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'

// Magnetic button with glow
function MagneticCTA({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.1)
    y.set((e.clientY - centerY) * 0.1)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const springConfig = { stiffness: 150, damping: 15 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative inline-flex items-center gap-3 px-10 py-5 bg-luxury-gold text-luxury-charcoal rounded-full font-semibold text-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: '0 0 60px 20px rgba(201, 169, 98, 0.5)'
        }}
      />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'linear' }}
      />
      
      <span className="relative z-10">{children}</span>
      <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
    </motion.a>
  )
}

export function CTA() {
  const sectionRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1920&h=1080&fit=crop"
          alt="Marrakech"
          fill
          className="object-cover"
          quality={90}
        />
        {/* Clean dark overlay */}
        <div className="absolute inset-0 bg-luxury-charcoal/85" />
      </motion.div>

      {/* Subtle vignette effect - replacing the ugly gradient */}
      <div className="absolute inset-0 z-1" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.4) 100%)' }} />

      {/* Top/bottom subtle gradients for seamless transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-luxury-cream dark:from-luxury-slate to-transparent z-1" />

      {/* Minimal decorative elements */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/10" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-6 py-16">
        {/* Small accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-12 h-px bg-luxury-gold mx-auto mb-6"
        />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4"
        >
          Ready to experience{' '}
          <span className="text-luxury-gold">Marrakech&apos;s finest?</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base md:text-lg text-white/50 max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Let us craft your perfect Moroccan experience. Our concierge team 
          is ready to create unforgettable memories.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-10"
        >
          <MagneticCTA href="/contact">
            Start Your Journey
          </MagneticCTA>
        </motion.div>

        {/* Contact info - more compact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-white/40 text-xs">
          <a href="tel:+212600000000" className="flex items-center gap-1.5 hover:text-luxury-gold transition-colors">
            <Phone className="w-3.5 h-3.5" />
            +212 6 00 00 00 00
          </a>
          <a href="mailto:contact@mozimmo.com" className="flex items-center gap-1.5 hover:text-luxury-gold transition-colors">
            <Mail className="w-3.5 h-3.5" />
            contact@mozimmo.com
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            Marrakech, Morocco
          </span>
        </motion.div>
      </div>

      {/* Bottom gradient fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-luxury-charcoal/80 to-transparent z-5" />
    </section>
  )
}
