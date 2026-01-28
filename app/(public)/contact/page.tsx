'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock, MessageCircle, Check } from 'lucide-react'
import { Button, Badge, Card, CardContent, Input, Textarea, Select } from '@/components/ui'
import { sendContactEmail } from '@/lib/email'
import { generateWhatsAppLink, messageTemplates } from '@/lib/whatsapp'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['Guéliz, Avenue Mohammed V', 'Marrakech 40000, Morocco'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+212 524 123 456', '+212 661 234 567'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['contact@mozimmo.com', 'concierge@mozimmo.com'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Mon - Fri: 9:00 - 18:00', 'Sat: 10:00 - 14:00'],
  },
]

const inquiryTypes = [
  { value: '', label: 'Select inquiry type' },
  { value: 'villa-rental', label: 'Villa Rental Inquiry' },
  { value: 'property-management', label: 'Property Management' },
  { value: 'concierge', label: 'Concierge Services' },
  { value: 'car-rental', label: 'Luxury Car Rental' },
  { value: 'experience', label: 'Experience Booking' },
  { value: 'partnership', label: 'Partnership Inquiry' },
  { value: 'other', label: 'Other' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    await sendContactEmail({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.inquiryType || 'General Inquiry',
      message: formData.message,
    })

    setSubmitting(false)
    setSubmitted(true)
  }

  const handleWhatsApp = () => {
    const message = messageTemplates.general(formData.message || 'Hello, I would like to inquire about your services.')
    window.open(generateWhatsAppLink(message), '_blank')
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-4">Message Sent!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for reaching out. Our team will get back to you within 24 hours.
          </p>
          <Button onClick={() => setSubmitted(false)}>Send Another Message</Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-luxury-charcoal" />
        <div className="relative container-luxury">
          <div className="max-w-3xl">
            <Badge variant="gold" className="mb-4">Contact Us</Badge>
            <h1 className="heading-display mb-6">
              Let&apos;s Start a Conversation
            </h1>
            <p className="text-body text-xl">
              Whether you&apos;re planning your dream vacation or looking for expert property management, our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-luxury-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-gray-600 dark:text-gray-400 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 aspect-square rounded-2xl overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=400&fit=crop"
                  alt="Marrakech Map"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-luxury-charcoal/30 flex items-center justify-center">
                  <span className="bg-white dark:bg-gray-900 px-4 py-2 rounded-lg font-medium text-sm">
                    View on Google Maps
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
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
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <Select
                      label="Inquiry Type"
                      options={inquiryTypes}
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    />
                  </div>
                  <Textarea
                    label="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    required
                  />

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Button type="submit" className="flex-1" loading={submitting}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button type="button" variant="outline" onClick={handleWhatsApp}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Us
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
