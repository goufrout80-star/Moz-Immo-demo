import { getVillas, getTestimonials, getServices } from '@/lib/data'
import { Hero, ServicesPreview, AboutSnippet, FeaturedVillas, Testimonials, CTA } from '@/components/sections/home'

export default function HomePage() {
  const villas = getVillas().slice(0, 6)
  const testimonials = getTestimonials()
  const services = getServices()

  return (
    <>
      <Hero />
      <ServicesPreview services={services} />
      <AboutSnippet />
      <FeaturedVillas villas={villas} />
      <Testimonials testimonials={testimonials} />
      <CTA />
    </>
  )
}
