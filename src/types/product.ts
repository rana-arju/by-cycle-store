export interface IProduct {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  model: string;
  brand: string;
  quantity: number;
  


}

export interface FilterState {
  availability: "all" | "in-stock" | "out-of-stock";
  priceRange: number[];
  category: string[];
  brand: string[];
  model: string[];
}