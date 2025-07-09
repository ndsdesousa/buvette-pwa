export interface Product {
  id: string;
  name: string;
  price: number;
  consigne?: number;
  category: 'boisson' | 'consigne';
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  consignesReturned: number;
  total: number;
  totalConsignes: number;
  finalTotal: number;
  timestamp: Date;
}

export interface DailyStats {
  date: string;
  orders: Order[];
  totalSales: number;
  totalConsignes: number;
}
