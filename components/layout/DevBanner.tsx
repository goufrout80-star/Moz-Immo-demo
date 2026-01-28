'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, X } from 'lucide-react'
import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'

export function DevBanner() {
  const { devBannerHidden, setDevBannerHidden } = useAppStore()

  useEffect(() => {
    document.documentElement.style.setProperty('--banner-height', devBannerHidden ? '0px' : '32px')
  }, [devBannerHidden])

  return (
    <AnimatePresence>
      {!devBannerHidden && (
        <motion.div
          initial={{ y: -32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -32, opacity: 0 }}
          className="fixed top-0 left-0 right-0 h-8 bg-luxury-gold overflow-hidden flex items-center z-[60]"
        >
          <button 
            onClick={() => setDevBannerHidden(true)}
            className="absolute left-4 z-10 p-1 hover:bg-luxury-charcoal/10 rounded-full transition-colors group"
            title="Hide development banner"
          >
            <X className="w-3.5 h-3.5 text-luxury-charcoal group-hover:scale-110 transition-transform" />
          </button>

          <div className="relative flex-1 flex overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: ['0%', '100%'] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center space-x-12 px-6 text-luxury-charcoal font-medium text-[10px] uppercase tracking-[0.2em]"
        >
          <BannerContent />
          <BannerContent />
        </motion.div>
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: ['-100%', '0%'] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0 flex items-center space-x-12 px-6 text-luxury-charcoal font-medium text-[10px] uppercase tracking-[0.2em]"
        >
          <BannerContent />
          <BannerContent />
        </motion.div>
      </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function BannerContent() {
  return (
    <>
      <div className="flex items-center gap-2">
        <AlertCircle className="w-3 h-3" />
        <span>This website is still in development</span>
      </div>
      <span className="w-1 h-1 rounded-full bg-luxury-charcoal/20" />
      <div className="flex items-center gap-2">
        <span className="font-bold text-luxury-charcoal/40">©</span>
        <span>Created by MarocMOOD</span>
      </div>
      <span className="w-1 h-1 rounded-full bg-luxury-charcoal/20" />
      <div className="flex items-center gap-2">
        <span className="px-1.5 py-0.5 rounded-full bg-luxury-charcoal text-[8px] text-luxury-gold font-bold">ALPHA</span>
        <span>Exclusive Preview Mode</span>
      </div>
      <span className="w-1 h-1 rounded-full bg-luxury-charcoal/20" />
    </>
  )
}
