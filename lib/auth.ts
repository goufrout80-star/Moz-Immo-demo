// ============================================
// DEMO AUTH SYSTEM - REPLACEABLE WITH NEXTAUTH/JWT/SSO
// ============================================

export type UserRole = 'client' | 'owner' | 'admin'

export interface User {
  id: number
  name: string
  email: string
  phone?: string
  bio?: string
  role: UserRole
  avatar?: string
}

// DEMO: Simulated current user - Replace with real auth provider
const DEMO_USERS: Record<string, User> = {
  admin: {
    id: 1,
    name: 'Ahmed El Fassi',
    email: 'admin@mozimmo.com',
    phone: '+212 600 000 000',
    bio: 'Founder of Moz Immo with 20 years of experience in luxury real estate.',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  owner: {
    id: 2,
    name: 'Youssef Bennani',
    email: 'owner@mozimmo.com',
    phone: '+212 611 111 111',
    bio: 'Proud owner of several luxury villas in Marrakech Palmeraie.',
    role: 'owner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  client: {
    id: 3,
    name: 'Sophie Laurent',
    email: 'client@mozimmo.com',
    phone: '+33 6 00 00 00 00',
    bio: 'Frequent traveler and luxury enthusiast.',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
}

// DEMO: Currently logged in user - Change this to switch roles
let currentDemoRole: keyof typeof DEMO_USERS = 'admin'

export function getCurrentUser(): User {
  return DEMO_USERS[currentDemoRole]
}

export function setDemoRole(role: keyof typeof DEMO_USERS): void {
  currentDemoRole = role
}

export function getDemoRole(): string {
  return currentDemoRole
}

// Auth check abstraction - Replace internals with real auth
export function isAuthenticated(): boolean {
  // DEMO: Always authenticated
  return true
}

export function hasRole(requiredRole: UserRole): boolean {
  const user = getCurrentUser()
  if (!user) return false
  
  // Admin has access to everything
  if (user.role === 'admin') return true
  
  // Owner has access to owner and client routes
  if (user.role === 'owner' && (requiredRole === 'owner' || requiredRole === 'client')) return true
  
  // Client only has access to client routes
  return user.role === requiredRole
}

export function requireRole(requiredRole: UserRole): User {
  if (!isAuthenticated()) {
    throw new AuthError('Not authenticated', 'UNAUTHENTICATED')
  }
  
  if (!hasRole(requiredRole)) {
    throw new AuthError('Insufficient permissions', 'FORBIDDEN')
  }
  
  return getCurrentUser()
}

export function requireAuth(): User {
  if (!isAuthenticated()) {
    throw new AuthError('Not authenticated', 'UNAUTHENTICATED')
  }
  return getCurrentUser()
}

// Custom Auth Error
export class AuthError extends Error {
  code: 'UNAUTHENTICATED' | 'FORBIDDEN'
  
  constructor(message: string, code: 'UNAUTHENTICATED' | 'FORBIDDEN') {
    super(message)
    this.code = code
    this.name = 'AuthError'
  }
}

// For use in Server Components
export async function getServerSession(): Promise<User | null> {
  // DEMO: Return current user
  // FUTURE: Replace with real session check (cookies, JWT, etc.)
  if (isAuthenticated()) {
    return getCurrentUser()
  }
  return null
}

// Role check helpers for components
export function canAccessDashboard(role: UserRole, targetDashboard: 'client' | 'owner' | 'admin'): boolean {
  if (role === 'admin') return true
  if (role === 'owner' && (targetDashboard === 'owner' || targetDashboard === 'client')) return true
  return role === targetDashboard
}

export function canManageVillas(role: UserRole): boolean {
  return role === 'admin' || role === 'owner'
}

export function canManageUsers(role: UserRole): boolean {
  return role === 'admin'
}

export function canViewAnalytics(role: UserRole): boolean {
  return role === 'admin' || role === 'owner'
}
