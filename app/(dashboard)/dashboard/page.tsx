'use client'

import Link from 'next/link'
import { 
  Building2, Car, Calendar, DollarSign, TrendingUp, Users, 
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle, XCircle
} from 'lucide-react'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import { useStore } from '@/lib/store'
import { getCurrentUser } from '@/lib/auth'
import { getReservations, getInvoices, getVillas } from '@/lib/data'
import { formatPrice, formatDate } from '@/lib/utils'

export default function DashboardPage() {
  const { demoRole } = useStore()
  const user = getCurrentUser()
  const reservations = getReservations()
  const invoices = getInvoices()
  const villas = getVillas()

  const userReservations = reservations.filter(r => r.userId === user?.id)
  const userInvoices = invoices.filter(i => i.userId === user?.id)

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here&apos;s what&apos;s happening with your {demoRole === 'client' ? 'bookings' : 'properties'} today.
        </p>
      </div>

      {/* Stats Grid */}
      {demoRole === 'client' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <p className="text-3xl font-bold mb-1">{userReservations.length}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Bookings</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">
              {userReservations.filter(r => r.status === 'confirmed').length}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Confirmed</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">
              {userReservations.filter(r => r.status === 'pending').length}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Pending</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">
              {formatPrice(userReservations.reduce((sum, r) => sum + r.totalPrice, 0))}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Spent</p>
          </Card>
        </div>
      )}

      {(demoRole === 'owner' || demoRole === 'admin') && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUpRight className="w-4 h-4" />
                12%
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">{villas.length}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Properties</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUpRight className="w-4 h-4" />
                8%
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">{formatPrice(125000)}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Monthly Revenue</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">{reservations.length}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Active Bookings</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-xl">
                <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">87%</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Occupancy Rate</p>
          </Card>
        </div>
      )}

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Bookings / Reservations */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {demoRole === 'client' ? 'My Reservations' : 'Recent Bookings'}
              </h2>
              <Link href="/dashboard/reservations">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="space-y-4">
              {(demoRole === 'client' ? userReservations : reservations).slice(0, 4).map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div>
                    <p className="font-medium">{reservation.itemName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(reservation.checkIn)} - {formatDate(reservation.checkOut)}
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
              ))}
              {(demoRole === 'client' ? userReservations : reservations).length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No reservations yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Invoices</h2>
              <Link href="/dashboard/invoices">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="space-y-4">
              {(demoRole === 'client' ? userInvoices : invoices).slice(0, 4).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div>
                    <p className="font-medium">Invoice #{invoice.id}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Due: {formatDate(invoice.dueDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(invoice.amount)}</p>
                    <Badge variant={
                      invoice.status === 'paid' ? 'success' :
                      invoice.status === 'pending' ? 'warning' : 'error'
                    }>
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {(demoRole === 'client' ? userInvoices : invoices).length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No invoices yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {demoRole === 'client' && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/discover/villas">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Building2 className="w-5 h-5" />
                  Browse Villas
                </Button>
              </Link>
              <Link href="/discover/cars">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Car className="w-5 h-5" />
                  Rent a Car
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Users className="w-5 h-5" />
                  Contact Concierge
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
