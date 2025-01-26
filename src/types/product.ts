export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  colors: string[];
  category: string;
  inStock: boolean;
  sizes?: string[];
}

export interface FilterState {
  availability: "all" | "in-stock" | "out-of-stock";
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  category: string[];
}
