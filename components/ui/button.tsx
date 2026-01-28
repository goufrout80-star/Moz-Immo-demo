import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-luxury-charcoal text-white hover:bg-luxury-slate focus:ring-luxury-charcoal dark:bg-luxury-gold dark:text-luxury-charcoal dark:hover:bg-brand-400',
      secondary: 'bg-brand-100 text-brand-900 hover:bg-brand-200 focus:ring-brand-500 dark:bg-brand-800 dark:text-brand-100',
      outline: 'border-2 border-luxury-charcoal text-luxury-charcoal hover:bg-luxury-charcoal hover:text-white focus:ring-luxury-charcoal dark:border-luxury-gold dark:text-luxury-gold dark:hover:bg-luxury-gold dark:hover:text-luxury-charcoal',
      ghost: 'text-luxury-charcoal hover:bg-brand-100 focus:ring-brand-500 dark:text-white dark:hover:bg-brand-800',
      link: 'text-luxury-charcoal underline-offset-4 hover:underline focus:ring-brand-500 dark:text-luxury-gold',
    }
    
    const sizes = {
      sm: 'h-9 px-4 text-sm rounded-md',
      md: 'h-11 px-6 text-base rounded-lg',
      lg: 'h-14 px-8 text-lg rounded-lg',
      icon: 'h-10 w-10 rounded-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </>
        ) : children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
