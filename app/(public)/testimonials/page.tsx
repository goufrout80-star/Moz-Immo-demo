import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { Badge, Card } from '@/components/ui'
import { getTestimonials } from '@/lib/data'

export const metadata = {
  title: 'Testimonials',
  description: 'Read what our distinguished guests say about their Moz Immo luxury experience in Marrakech.',
}

export default function TestimonialsPage() {
  const testimonials = getTestimonials()

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-luxury-charcoal" />
        <div className="relative container-luxury">
          <div className="max-w-3xl">
            <Badge variant="gold" className="mb-4">Testimonials</Badge>
            <h1 className="heading-display mb-6">
              Trusted by Discerning Guests
            </h1>
            <p className="text-body text-xl">
              Discover what makes Moz Immo the preferred choice for luxury travelers and property owners in Marrakech.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-16 bg-luxury-charcoal text-white">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-16 h-16 text-luxury-gold mx-auto mb-8 opacity-50" />
            <blockquote className="text-2xl md:text-3xl font-serif italic mb-8">
              &ldquo;Moz Immo transformed our Marrakech experience from a simple holiday into a life-changing journey. Every detail was perfect, every moment magical.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={testimonials[0].image}
                  alt={testimonials[0].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">{testimonials[0].name}</div>
                <div className="text-gray-400">
                  {testimonials[0].title}
                  {testimonials[0].company && `, ${testimonials[0].company}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-luxury-gold text-luxury-gold" />
                  ))}
                </div>
                <blockquote className="text-gray-600 dark:text-gray-400 mb-6 flex-grow italic">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden grayscale">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.title}
                      {testimonial.company && `, ${testimonial.company}`}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-luxury-cream dark:bg-gray-900">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2">4.9</div>
              <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-400">5-Star Reviews</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-400">Would Recommend</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2">85%</div>
              <div className="text-gray-600 dark:text-gray-400">Return Guests</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
