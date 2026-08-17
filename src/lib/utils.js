import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Number(n || 0))
}

export function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`
  }
  return phone
}

export function getDaysSince(dateStr) {
  const last = new Date(dateStr)
  const now = new Date()
  return Math.floor((now - last) / (1000 * 60 * 60 * 24))
}

export function getLastVisit(client) {
  if (!client.visits?.length) return null
  return [...client.visits].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
}

export function getInTheChairLately(clients, limit = 8) {
  return [...clients]
    .filter(c => c.visits?.length)
    .sort((a, b) => {
      const aLast = getLastVisit(a)?.date || '1970-01-01'
      const bLast = getLastVisit(b)?.date || '1970-01-01'
      return new Date(bLast) - new Date(aLast)
    })
    .slice(0, limit)
}

export function getHaventBeenInAWhile(clients, threshold = 45) {
  return clients.filter(c => {
    const last = getLastVisit(c)
    if (!last) return true
    return getDaysSince(last.date) >= threshold
  }).sort((a, b) => {
    const aDays = getDaysSince(getLastVisit(a)?.date || '1970-01-01')
    const bDays = getDaysSince(getLastVisit(b)?.date || '1970-01-01')
    return bDays - aDays
  })
}