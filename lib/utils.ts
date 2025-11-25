import { type ClassValue, clsx } from 'clsx';

// Format price in cents to dollars
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

// Format date
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Generate order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `SM-${timestamp}-${random}`.toUpperCase();
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Calculate cart total
export function calculateCartTotal(items: Array<{ price: number; quantity: number }>): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Utility function for className merging
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}


