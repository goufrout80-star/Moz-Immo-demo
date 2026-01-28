'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// Floating particle component
function FloatingParticle({ delay, duration, x, y }: { delay: number; duration: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-luxury-gold/40 rounded-full"
      initial={{ opacity: 0, x, y }}
      animate={{
        opacity: [0, 1, 0],
        y: [y, y - 100],
        x: [x, x + 20],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
    />
  )
}

// Animated counter component
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [value])
  
  return <span>{count}{suffix}</span>
}

// Magnetic button effect
function MagneticButton({ children, href, variant = 'primary' }: { children: React.ReactNode; href: string; variant?: 'primary' | 'secondary' }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.15)
    y.set((e.clientY - centerY) * 0.15)
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
      className={`
        group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium
        rounded-full overflow-hidden transition-all duration-500
        ${variant === 'primary' 
          ? 'bg-luxury-gold text-luxury-charcoal hover:shadow-[0_0_40px_rgba(201,169,98,0.4)]' 
          : 'border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm'}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
    </motion.a>
  )
}

// Split text animation
function SplitText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ')
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', rotateX: -90 }}
            animate={{ y: 0, rotateX: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.08,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Reveal line component
function RevealLine({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.9])

  // Mouse parallax for decorative elements
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    mouseX.set((clientX - innerWidth / 2) / 50)
    mouseY.set((clientY - innerHeight / 2) / 50)
  }

  const springConfig = { stiffness: 50, damping: 30 }
  const decorX = useSpring(mouseX, springConfig)
  const decorY = useSpring(mouseY, springConfig)

  // Stats data
  const stats = [
    { value: 15, suffix: '+', label: 'Years Experience' },
    { value: 150, suffix: '+', label: 'Luxury Properties' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
  ]

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-[100vh] min-h-[800px] flex items-center justify-center overflow-hidden bg-luxury-charcoal"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1920&h=1080&fit=crop"
          alt="Luxury villa in Marrakech"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dynamic overlay */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-luxury-charcoal/70 via-luxury-charcoal/40 to-luxury-charcoal/90" 
        />
      </motion.div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-1 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            duration={4 + Math.random() * 2}
            x={100 + Math.random() * (typeof window !== 'undefined' ? window.innerWidth - 200 : 800)}
            y={typeof window !== 'undefined' ? window.innerHeight : 800}
          />
        ))}
      </div>

      {/* Decorative elements with mouse parallax */}
      <motion.div
        style={{ x: decorX, y: decorY }}
        className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full pointer-events-none"
      >
        <div className="absolute inset-0 bg-luxury-gold/10 rounded-full blur-[100px]" />
      </motion.div>
      <motion.div
        style={{ x: useTransform(decorX, v => -v), y: useTransform(decorY, v => -v) }}
        className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full pointer-events-none"
      >
        <div className="absolute inset-0 bg-brand-500/10 rounded-full blur-[120px]" />
      </motion.div>

      {/* Grid lines decoration */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-20">
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute right-[20%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 text-center text-white max-w-6xl mx-auto px-6"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-[0.25em] bg-white/5 backdrop-blur-md border border-white/10 text-white/80">
            <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-pulse" />
            Luxury Concierge · Marrakech
          </span>
        </motion.div>

        {/* Main Headline */}
        <h1 className="text-display-xl text-white mb-8 perspective-1000">
          <SplitText text="Your peace of mind" delay={0.4} />
          <br />
          <span className="text-gradient-gold">
            <SplitText text="our privilege" delay={0.8} />
          </span>
        </h1>

        {/* Decorative line */}
        <div className="max-w-xs mx-auto mb-8">
          <RevealLine delay={1.2} />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Exceptional villa management, luxury rentals, and bespoke concierge 
          services in the heart of Marrakech
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <MagneticButton href="/contact" variant="primary">
            Request Concierge
          </MagneticButton>
          <MagneticButton href="/discover/villas" variant="secondary">
            View Collection
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs uppercase tracking-[0.15em] text-white/40">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>

      {/* Side decorative text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium [writing-mode:vertical-rl] rotate-180">
            Est. 2010
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
      </motion.div>

      {/* Right side social links placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="flex flex-col gap-3">
          {['IG', 'FB', 'LI'].map((social, i) => (
            <motion.a
              key={social}
              href="#"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 + i * 0.1 }}
              className="text-[10px] text-white/30 hover:text-luxury-gold transition-colors"
            >
              {social}
            </motion.a>
          ))}
        </div>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </motion.div>
    </section>
  )
}
