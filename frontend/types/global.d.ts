export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export interface Blog {
  _id: string;
  title: string;
  category: string;
  date: string;
  commentsCount?: number;
  excerpt: string;
  image: string;
}

export interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
}

export interface CartState {
  carts: Record<string, CartItem[]>;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (userId: string, item: CartItem) => void;
  removeItem: (userId: string, id: string) => void;
  updateQty: (userId: string, id: string, qty: number) => void;
  clearCart: (userId: string) => void;
}