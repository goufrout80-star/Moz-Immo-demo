'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Users, Bed, Bath, Square, Check, Calendar, MessageCircle, Mail, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, Badge, Card, Input, Textarea, Modal } from '@/components/ui'
import { getVillaBySlug, getVillas } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import { sendBookingEmail } from '@/lib/email'
import { generateWhatsAppLink, messageTemplates } from '@/lib/whatsapp'

export default function VillaDetailPage() {
  const params = useParams()
  const villa = getVillaBySlug(params.slug as string)
  const [currentImage, setCurrentImage] = useState(0)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!villa) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Villa not found</h1>
          <Link href="/discover/villas">
            <Button>Back to Villas</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    await sendBookingEmail({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      itemType: 'villa',
      itemName: villa.name,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: parseInt(formData.guests) || undefined,
      specialRequests: formData.message,
    })

    setSubmitting(false)
    setSubmitted(true)
  }

  const handleWhatsApp = () => {
    const message = messageTemplates.villaInquiry(villa.name, {
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
    })
    window.open(generateWhatsAppLink(message), '_blank')
  }

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % villa.images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + villa.images.length) % villa.images.length)

  return (
    <>
      {/* Back Button */}
      <div className="pt-[calc(5rem+var(--banner-height)+1rem)] pb-4 container-luxury">
        <Link href="/discover/villas" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-luxury-gold transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Villas
        </Link>
      </div>

      {/* Image Gallery */}
      <section className="container-luxury mb-8">
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden">
          <Image
            src={villa.images[currentImage]}
            alt={villa.name}
            fill
            className="object-cover"
            priority
          />
          
          {/* Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-black/80 rounded-full hover:bg-white dark:hover:bg-black transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-black/80 rounded-full hover:bg-white dark:hover:bg-black transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {villa.verified && <Badge variant="gold">Verified Villa</Badge>}
            {!villa.available && <Badge variant="error">Currently Booked</Badge>}
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {villa.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImage ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="hidden md:flex gap-2 mt-2">
          {villa.images.slice(0, 5).map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative aspect-video w-24 rounded-lg overflow-hidden ${
                index === currentImage ? 'ring-2 ring-luxury-gold' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="container-luxury pb-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{villa.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{villa.location}, Marrakech</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-luxury-gold">{formatPrice(villa.price)}</div>
                <div className="text-gray-500">per night</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 py-6 border-y border-gray-200 dark:border-gray-800 mb-8">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-luxury-gold" />
                <span>{villa.capacity} guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-luxury-gold" />
                <span>{villa.bedrooms} bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-luxury-gold" />
                <span>{villa.bathrooms} bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Square className="w-5 h-5 text-luxury-gold" />
                <span>{villa.area} m²</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">About this property</h2>
              <div className="prose dark:prose-invert max-w-none">
                {villa.description.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-400 mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {villa.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-luxury-gold" />
                    <span className="text-gray-700 dark:text-gray-300">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Included Services</h2>
              <div className="grid grid-cols-2 gap-3">
                {villa.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-luxury-gold" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-28 p-6">
              <h3 className="text-xl font-semibold mb-4">Book this villa</h3>
              
              {/* Mock Calendar */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-luxury-gold" />
                  <span className="font-medium">Availability</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {villa.available 
                    ? 'This property is available for booking. Contact us for specific dates.'
                    : 'Currently booked. Contact us for future availability.'}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <Input
                  label="Check-in"
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                />
                <Input
                  label="Check-out"
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                />
                <Input
                  label="Guests"
                  type="number"
                  min="1"
                  max={villa.capacity}
                  placeholder={`Up to ${villa.capacity} guests`}
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                />
              </div>

              <Button className="w-full mb-3" onClick={() => setShowBookingModal(true)}>
                Book Now
              </Button>
              <Button variant="outline" className="w-full" onClick={handleWhatsApp}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Inquire via WhatsApp
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title={`Book ${villa.name}`}
        size="lg"
      >
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Booking Request Sent!</h3>
            <p className="text-gray-600 dark:text-gray-400">We&apos;ll confirm your reservation shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <Input
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Check-in"
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                  required
                />
                <Input
                  label="Check-out"
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                  required
                />
              </div>
              <Textarea
                label="Special Requests"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button type="submit" className="flex-1" loading={submitting}>
                <Mail className="w-4 h-4 mr-2" />
                Send Booking Request
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={handleWhatsApp}>
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  )
}
