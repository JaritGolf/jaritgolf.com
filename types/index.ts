// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  specs: ProductSpec[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductSpec {
  title: string;
  description: string;
}

// Cart Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Order Types
export interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  total: number;
  status: OrderStatus;
  stripeSessionId?: string;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

// Stripe Types
export interface StripeCheckoutSession {
  sessionId: string;
  url: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}


