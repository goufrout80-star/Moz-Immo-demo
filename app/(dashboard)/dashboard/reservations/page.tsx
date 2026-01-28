'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Users, Eye, X, MessageCircle } from 'lucide-react'
import { Card, CardContent, Badge, Button, Modal } from '@/components/ui'
import { useStore } from '@/lib/store'
import { getCurrentUser } from '@/lib/auth'
import { getReservations, getVillaById } from '@/lib/data'
import { formatPrice, formatDate } from '@/lib/utils'
import { generateWhatsAppLink, messageTemplates } from '@/lib/whatsapp'
import type { Reservation } from '@/lib/data'

export default function ReservationsPage() {
  const { demoRole } = useStore()
  const user = getCurrentUser()
  const allReservations = getReservations()
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all')

  const reservations = demoRole === 'client' 
    ? allReservations.filter(r => r.userId === user?.id)
    : allReservations

  const filteredReservations = filter === 'all' 
    ? reservations 
    : reservations.filter(r => r.status === filter)

  const handleWhatsApp = (reservation: Reservation) => {
    const message = messageTemplates.conciergeRequest(
      `I have a question about my reservation for ${reservation.itemName} (${formatDate(reservation.checkIn)} - ${formatDate(reservation.checkOut)})`
    )
    window.open(generateWhatsAppLink(message), '_blank')
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">
            {demoRole === 'client' ? 'My Reservations' : 'Bookings'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {demoRole === 'client' 
              ? 'View and manage your upcoming stays' 
              : 'Manage all property bookings'
            }
          </p>
        </div>
        {demoRole === 'client' && (
          <Link href="/discover/villas">
            <Button>Book New Stay</Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              filter === status
                ? 'bg-luxury-gold text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.map((reservation) => {
          const villa = reservation.type === 'villa' ? getVillaById(reservation.itemId) : null
          
          return (
            <Card key={reservation.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {villa && (
                  <div className="relative w-full md:w-48 h-48 md:h-auto">
                    <Image
                      src={villa.images[0]}
                      alt={reservation.itemName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardContent className="flex-1 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold">{reservation.itemName}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {reservation.type} Booking
                          </p>
                        </div>
                        <Badge variant={
                          reservation.status === 'confirmed' ? 'success' :
                          reservation.status === 'pending' ? 'warning' :
                          reservation.status === 'cancelled' ? 'error' : 'default'
                        }>
                          {reservation.status}
                        </Badge>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {formatDate(reservation.checkIn)} - {formatDate(reservation.checkOut)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{reservation.guests} guests</span>
                        </div>
                        {villa && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{villa.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Price</p>
                        <p className="text-2xl font-bold text-luxury-gold">
                          {formatPrice(reservation.totalPrice)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedReservation(reservation)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleWhatsApp(reservation)}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          )
        })}

        {filteredReservations.length === 0 && (
          <Card className="p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Reservations Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {filter === 'all' 
                ? "You don't have any reservations yet."
                : `No ${filter} reservations found.`
              }
            </p>
            {demoRole === 'client' && (
              <Link href="/discover/villas">
                <Button>Browse Villas</Button>
              </Link>
            )}
          </Card>
        )}
      </div>

      {/* Reservation Details Modal */}
      <Modal
        isOpen={selectedReservation !== null}
        onClose={() => setSelectedReservation(null)}
        title="Reservation Details"
        size="lg"
      >
        {selectedReservation && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Property</p>
                <p className="font-semibold">{selectedReservation.itemName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                <Badge variant={
                  selectedReservation.status === 'confirmed' ? 'success' :
                  selectedReservation.status === 'pending' ? 'warning' : 'default'
                }>
                  {selectedReservation.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Check-in</p>
                <p className="font-semibold">{formatDate(selectedReservation.checkIn)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Check-out</p>
                <p className="font-semibold">{formatDate(selectedReservation.checkOut)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Guests</p>
                <p className="font-semibold">{selectedReservation.guests}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Price</p>
                <p className="font-semibold text-luxury-gold">
                  {formatPrice(selectedReservation.totalPrice)}
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button 
                className="flex-1"
                onClick={() => handleWhatsApp(selectedReservation)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              {selectedReservation.status === 'pending' && (
                <Button variant="outline" className="flex-1">
                  Cancel Reservation
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
