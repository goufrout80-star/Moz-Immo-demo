// ============================================
// WHATSAPP INTEGRATION
// ============================================

const WHATSAPP_NUMBER = '+212600000000' // Replace with actual number

export interface WhatsAppMessage {
  phone?: string
  message: string
}

export function generateWhatsAppLink(message: string, phone?: string): string {
  const targetPhone = phone || WHATSAPP_NUMBER
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${targetPhone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`
}

export function openWhatsApp(message: string, phone?: string): void {
  const link = generateWhatsAppLink(message, phone)
  if (typeof window !== 'undefined') {
    window.open(link, '_blank')
  }
}

// Pre-built message templates
export const messageTemplates = {
  villaInquiry: (villaName: string, dates?: { checkIn?: string; checkOut?: string }) => {
    let message = `Hello Moz Immo,\n\nI am interested in ${villaName}.`
    if (dates?.checkIn && dates?.checkOut) {
      message += `\n\nDesired dates:\nCheck-in: ${dates.checkIn}\nCheck-out: ${dates.checkOut}`
    }
    message += '\n\nPlease provide more information about availability and pricing.\n\nThank you.'
    return message
  },

  carRental: (carName: string, options?: { chauffeur?: boolean; dates?: string }) => {
    let message = `Hello Moz Immo,\n\nI would like to inquire about renting the ${carName}.`
    if (options?.chauffeur) {
      message += '\n\nI would like a chauffeur service included.'
    }
    if (options?.dates) {
      message += `\n\nDesired dates: ${options.dates}`
    }
    message += '\n\nPlease let me know the availability and rates.\n\nThank you.'
    return message
  },

  serviceRequest: (serviceName: string, details?: string) => {
    let message = `Hello Moz Immo,\n\nI would like to request your ${serviceName} service.`
    if (details) {
      message += `\n\nDetails: ${details}`
    }
    message += '\n\nPlease contact me to discuss further.\n\nThank you.'
    return message
  },

  conciergeRequest: (request: string) => {
    return `Hello Moz Immo,\n\nI have a concierge request:\n\n${request}\n\nPlease advise on availability and next steps.\n\nThank you.`
  },

  generalContact: (name: string, subject: string, message: string) => {
    return `Hello Moz Immo,\n\nMy name is ${name}.\n\nSubject: ${subject}\n\n${message}\n\nThank you.`
  },

  general: (message: string) => {
    return `Hello Moz Immo,\n\n${message}\n\nThank you.`
  },

  carInquiry: (carName: string, dates?: { startDate?: string; endDate?: string }) => {
    let message = `Hello Moz Immo,\n\nI am interested in renting the ${carName}.`
    if (dates?.startDate && dates?.endDate) {
      message += `\n\nDesired dates:\nPick-up: ${dates.startDate}\nReturn: ${dates.endDate}`
    }
    message += '\n\nPlease provide availability and pricing details.\n\nThank you.'
    return message
  },

  experienceInquiry: (experienceName: string, date?: string) => {
    let message = `Hello Moz Immo,\n\nI would like to book the ${experienceName} experience.`
    if (date) {
      message += `\n\nPreferred date: ${date}`
    }
    message += '\n\nPlease confirm availability and next steps.\n\nThank you.'
    return message
  },

  booking: (type: 'villa' | 'car' | 'experience', itemName: string, details: Record<string, string>) => {
    let message = `Hello Moz Immo,\n\nI would like to make a booking:\n\nType: ${type.charAt(0).toUpperCase() + type.slice(1)}\nItem: ${itemName}`
    
    Object.entries(details).forEach(([key, value]) => {
      message += `\n${key}: ${value}`
    })
    
    message += '\n\nPlease confirm availability and send me the booking details.\n\nThank you.'
    return message
  },
}

export function sendWhatsAppBooking(
  type: 'villa' | 'car' | 'experience',
  itemName: string,
  details: Record<string, string>
): void {
  const message = messageTemplates.booking(type, itemName, details)
  openWhatsApp(message)
}
