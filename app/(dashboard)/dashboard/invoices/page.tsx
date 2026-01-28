'use client'

import { useState } from 'react'
import { FileText, Download, Eye, CreditCard, Check } from 'lucide-react'
import { Card, CardContent, Badge, Button, Modal } from '@/components/ui'
import { useStore } from '@/lib/store'
import { getCurrentUser } from '@/lib/auth'
import { getInvoices } from '@/lib/data'
import { formatPrice, formatDate } from '@/lib/utils'
import type { Invoice } from '@/lib/data'

export default function InvoicesPage() {
  const { demoRole } = useStore()
  const user = getCurrentUser()
  const allInvoices = getInvoices()
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid' | 'overdue'>('all')

  const invoices = demoRole === 'client' 
    ? allInvoices.filter(i => i.userId === user?.id)
    : allInvoices

  const filteredInvoices = filter === 'all' 
    ? invoices 
    : invoices.filter(i => i.status === filter)

  const totalPending = invoices
    .filter(i => i.status === 'pending')
    .reduce((sum, i) => sum + i.amount, 0)

  const totalPaid = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Invoices</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage your invoices
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Invoices</p>
              <p className="text-2xl font-bold">{invoices.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-xl">
              <CreditCard className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Amount</p>
              <p className="text-2xl font-bold">{formatPrice(totalPending)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
              <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Paid</p>
              <p className="text-2xl font-bold">{formatPrice(totalPaid)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['all', 'pending', 'paid', 'overdue'] as const).map((status) => (
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

      {/* Invoices Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Invoice</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">INV-{String(invoice.id).padStart(4, '0')}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Reservation #{invoice.reservationId}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">{formatDate(invoice.dueDate)}</p>
                    {invoice.paidAt && (
                      <p className="text-xs text-green-600">Paid: {formatDate(invoice.paidAt)}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold">{formatPrice(invoice.amount)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      invoice.status === 'paid' ? 'success' :
                      invoice.status === 'pending' ? 'warning' : 'error'
                    }>
                      {invoice.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedInvoice(invoice)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      {invoice.status === 'pending' && demoRole === 'client' && (
                        <Button size="sm">Pay Now</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Invoices Found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filter === 'all' 
                ? "You don't have any invoices yet."
                : `No ${filter} invoices found.`
              }
            </p>
          </div>
        )}
      </Card>

      {/* Invoice Details Modal */}
      <Modal
        isOpen={selectedInvoice !== null}
        onClose={() => setSelectedInvoice(null)}
        title={`Invoice #INV-${String(selectedInvoice?.id || 0).padStart(4, '0')}`}
        size="lg"
      >
        {selectedInvoice && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Due Date</p>
                <p className="font-semibold">{formatDate(selectedInvoice.dueDate)}</p>
              </div>
              <Badge variant={
                selectedInvoice.status === 'paid' ? 'success' :
                selectedInvoice.status === 'pending' ? 'warning' : 'error'
              }>
                {selectedInvoice.status}
              </Badge>
            </div>

            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4">
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-gray-500 dark:text-gray-400">
                    <th className="text-left pb-2">Description</th>
                    <th className="text-right pb-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2">{item.description}</td>
                      <td className="py-2 text-right">{formatPrice(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t border-gray-200 dark:border-gray-700">
                  <tr className="font-semibold">
                    <td className="pt-4">Total</td>
                    <td className="pt-4 text-right text-luxury-gold">
                      {formatPrice(selectedInvoice.amount)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              {selectedInvoice.status === 'pending' && demoRole === 'client' && (
                <Button className="flex-1">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Now
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
