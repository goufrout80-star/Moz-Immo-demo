import React from 'react'
import { UserRole, getCurrentUser } from './auth'

// ============================================
// PERMISSION SYSTEM - CENTRALIZED ACCESS CONTROL
// ============================================

export type Permission =
  | 'view:dashboard'
  | 'view:client-dashboard'
  | 'view:owner-dashboard'
  | 'view:admin-dashboard'
  | 'manage:villas'
  | 'manage:cars'
  | 'manage:blog'
  | 'manage:users'
  | 'manage:bookings'
  | 'manage:services'
  | 'view:analytics'
  | 'view:invoices'
  | 'view:reservations'
  | 'create:booking'
  | 'edit:own-villas'
  | 'edit:all-villas'

// Role-based permission mapping
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  client: [
    'view:dashboard',
    'view:client-dashboard',
    'view:reservations',
    'view:invoices',
    'create:booking',
  ],
  owner: [
    'view:dashboard',
    'view:client-dashboard',
    'view:owner-dashboard',
    'view:reservations',
    'view:invoices',
    'view:analytics',
    'manage:villas',
    'edit:own-villas',
    'create:booking',
  ],
  admin: [
    'view:dashboard',
    'view:client-dashboard',
    'view:owner-dashboard',
    'view:admin-dashboard',
    'manage:villas',
    'manage:cars',
    'manage:blog',
    'manage:users',
    'manage:bookings',
    'manage:services',
    'view:analytics',
    'view:invoices',
    'view:reservations',
    'create:booking',
    'edit:own-villas',
    'edit:all-villas',
  ],
}

export function hasPermission(permission: Permission): boolean {
  const user = getCurrentUser()
  if (!user) return false
  
  const userPermissions = ROLE_PERMISSIONS[user.role]
  return userPermissions.includes(permission)
}

export function hasAnyPermission(permissions: Permission[]): boolean {
  return permissions.some(hasPermission)
}

export function hasAllPermissions(permissions: Permission[]): boolean {
  return permissions.every(hasPermission)
}

export function getPermissions(): Permission[] {
  const user = getCurrentUser()
  if (!user) return []
  return ROLE_PERMISSIONS[user.role]
}

export function requirePermission(permission: Permission): void {
  if (!hasPermission(permission)) {
    throw new Error(`Permission denied: ${permission}`)
  }
}

// Guard component helper
export function withPermission<T extends object>(
  permission: Permission,
  Component: React.ComponentType<T>
): React.ComponentType<T> {
  return function PermissionGuard(props: T) {
    if (!hasPermission(permission)) {
      return null
    }
    return React.createElement(Component, props)
  }
}
