export interface User {
  _id: string;
  name: string;
  email: string;
  status: string;
  role: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Product {
  _id: string;
  name: string;
  brand: string;
  images: string[];
  price: number;
  model: string;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderProduct {
  product: Product;
  quantity: number;
  _id: string;
}

export interface Transaction {
  id: string;
  transactionStatus: string | null;
  bank_status?: string;
  date_time?: string;
  method?: string;
  sp_code?: string;
  sp_message?: string;
}

export interface Order {
  _id: string;
  user: User;
  products: OrderProduct[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  transaction?: Transaction;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: Order[];
}
