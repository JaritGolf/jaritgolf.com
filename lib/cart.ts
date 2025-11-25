// Cart item interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Get cart from localStorage
export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Add item to cart
export function addToCart(item: Omit<CartItem, 'quantity'>): void {
  if (typeof window === 'undefined') return;
  
  const cart = getCart();
  const existingItem = cart.find(i => i.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('storage'));
}

// Update cart item quantity
export function updateCartItemQuantity(id: string, quantity: number): void {
  if (typeof window === 'undefined') return;
  
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  
  if (item) {
    item.quantity = quantity;
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
  }
}

// Remove item from cart
export function removeFromCart(id: string): void {
  if (typeof window === 'undefined') return;
  
  const cart = getCart();
  const filteredCart = cart.filter(i => i.id !== id);
  localStorage.setItem('cart', JSON.stringify(filteredCart));
  window.dispatchEvent(new Event('storage'));
}

// Clear cart
export function clearCart(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('cart');
  window.dispatchEvent(new Event('storage'));
}

// Get cart total
export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}


