import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield, Eye, Award, Users } from 'lucide-react'
import { Button, Badge, Card, CardContent } from '@/components/ui'

export const metadata = {
  title: 'About Us',
  description: 'Learn about Moz Immo - your trusted partner for luxury villa management, rentals, and concierge services in Marrakech, Morocco.',
}

const values = [
  {
    icon: Shield,
    title: 'Trust',
    description: 'Building lasting relationships through transparency and reliability. Every promise kept, every expectation exceeded.',
  },
  {
    icon: Eye,
    title: 'Discretion',
    description: 'Your privacy is sacred. We operate with utmost confidentiality, ensuring complete peace of mind for our distinguished clients.',
  },
  {
    icon: Award,
    title: 'Perfection',
    description: 'Every detail matters. From the thread count of your linens to the temperature of your pool, we accept nothing less than excellence.',
  },
]

const team = [
  {
    name: 'Ahmed El Fassi',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'With over 20 years in luxury hospitality, Ahmed founded Moz Immo to bring world-class concierge services to Marrakech.',
  },
  {
    name: 'Sofia Bennani',
    role: 'Lifestyle Manager',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Sofia curates bespoke experiences that transform ordinary stays into extraordinary memories.',
  },
  {
    name: 'Youssef Alaoui',
    role: 'Property Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Youssef ensures every property in our portfolio meets our exacting standards of luxury and comfort.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-luxury-charcoal" />
        <div className="relative container-luxury">
          <div className="max-w-3xl">
            <Badge variant="gold" className="mb-4">About Moz Immo</Badge>
            <h1 className="heading-display mb-6">
              Your Trusted Partner in Luxury Marrakech Living
            </h1>
            <p className="text-body text-xl">
              Founded on the principles of trust, discretion, and perfection, we deliver unparalleled luxury experiences in the heart of Morocco.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=1000&fit=crop"
                  alt="Marrakech medina"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl hidden md:block">
                <Image
                  src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=200&h=200&fit=crop"
                  alt="Moroccan detail"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="heading-section mb-6">Our Story</h2>
              <div className="space-y-4 text-body">
                <p>
                  Moz Immo was born from a simple observation: discerning travelers and property owners in Marrakech deserved a service that truly understood their needs—a partner who could deliver not just accommodation, but peace of mind.
                </p>
                <p>
                  Founded in 2010, we began with a single villa and a commitment to excellence that has never wavered. Today, our portfolio includes some of Marrakech&apos;s most exclusive properties, and our concierge services have earned the trust of clients from around the world.
                </p>
                <p>
                  What sets us apart is not just our properties or services, but our philosophy. We believe that true luxury lies in the details—in anticipating needs before they arise, in creating moments of unexpected delight, and in treating every guest as a member of our extended family.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-luxury-cream dark:bg-gray-900">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Our Values</Badge>
            <h2 className="heading-section mb-4">The Pillars of Our Service</h2>
            <p className="text-body max-w-2xl mx-auto">
              Three core values guide everything we do, from property management to guest experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-luxury-gold/10 text-luxury-gold mb-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Our Team</Badge>
            <h2 className="heading-section mb-4">Meet the People Behind Moz Immo</h2>
            <p className="text-body max-w-2xl mx-auto">
              Our dedicated team combines local expertise with international hospitality standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} hover className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-luxury-gold font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-luxury-charcoal text-white">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2">15+</div>
              <div className="text-gray-400">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2">50+</div>
              <div className="text-gray-400">Premium Properties</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2">1000+</div>
              <div className="text-gray-400">Happy Guests</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2">24/7</div>
              <div className="text-gray-400">Concierge Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-luxury text-center">
          <h2 className="heading-section mb-6">Ready to Experience the Difference?</h2>
          <p className="text-body max-w-2xl mx-auto mb-8">
            Whether you&apos;re seeking the perfect villa for your stay or looking to entrust your property to expert hands, we&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg">
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/discover/villas">
              <Button size="lg" variant="outline">
                Explore Villas
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
