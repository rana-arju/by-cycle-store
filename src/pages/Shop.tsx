import React, { useState } from "react";

import type { Product, FilterState } from "../types/product";
import { FilterSidebar } from "../components/shop/FilterSidebar";
import { ProductCard } from "../components/shop/ProductCard";
import ShopHeader from "../components/shop";
import { Select } from "antd";
// This would normally come from an API
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Mountain Bike Pro",
    price: 999.99,
    salePrice: 899.99,
    images: [
      "https://cdn.shopify.com/s/files/1/0628/5547/9548/products/Harris-200-27_5T-Black_720x.jpg?v=1659693517",
      "https://cdn.shopify.com/s/files/1/0628/5547/9548/files/TORRAC21SALYAGRNBLK27T_720x.jpg?v=1691576187",
    ],
    colors: ["#000000", "#FF0000", "#0000FF"],
    category: "Mountain Bikes",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "1",
    name: "Mountain Bike Pro",
    price: 999.99,
    salePrice: 899.99,
    images: [
      "https://cdn.shopify.com/s/files/1/0628/5547/9548/files/Rower26TDDMSBlkCyan_720x.jpg?v=1688644178",
    ],
    colors: ["#000000", "#FF0000", "#0000FF"],
    category: "Mountain Bikes",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "1",
    name: "Mountain Bike Pro",
    price: 999.99,
    salePrice: 899.99,
    images: [
      "https://cdn.shopify.com/s/files/1/0628/5547/9548/products/29T-VIBE-MBLACK-RED_1000x740_92e07747-9e50-4a84-8014-16b452d8e80e_720x.jpg?v=1649233895",
    ],
    colors: ["#000000", "#FF0000", "#0000FF"],
    category: "Mountain Bikes",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "1",
    name: "Mountain Bike Pro",
    price: 999.99,
    salePrice: 899.99,
    images: [
      "https://cdn.shopify.com/s/files/1/0628/5547/9548/products/Gelon-27-5T-21S_720x.jpg?v=1659950399",
    ],
    colors: ["#000000", "#FF0000", "#0000FF"],
    category: "Mountain Bikes",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "1",
    name: "Mountain Bike Pro",
    price: 999.99,
    salePrice: 899.99,
    images: [
      "https://cdn.shopify.com/s/files/1/0628/5547/9548/files/Magnet20TLHISOForGrn_720x.png?v=1688638127",
    ],
    colors: ["#000000", "#FF0000", "#0000FF"],
    category: "Mountain Bikes",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
  },
  // Add more products...
];

export default function Shop() {
  const [filters, setFilters] = useState<FilterState>({
    availability: "all",
    priceRange: [0, 5000],
    colors: [],
    sizes: [],
    category: [],
  });
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    if (
      (filters.availability === "in-stock" && !product.inStock) ||
      (filters.availability === "out-of-stock" && product.inStock)
    ) {
      return false;
    }

    const price = product.salePrice || product.price;
    if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
      return false;
    }

    if (
      filters.colors.length > 0 &&
      !filters.colors.some((color) => product.colors.includes(color))
    ) {
      return false;
    }

    if (
      filters.sizes.length > 0 &&
      !filters.sizes.some((size) => product.sizes?.includes(size))
    ) {
      return false;
    }

    if (
      filters.category.length > 0 &&
      !filters.category.includes(product.category)
    ) {
      return false;
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case "price-desc":
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      default:
        return 0;
    }
  });
const handleSort =() => {

}
  return (
    <>
      <div className="pb-56">
        <ShopHeader />
      </div>
      <div
        className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 container"
        style={{ marginTop: "20px", paddingBottom: "50px" }}
      >
        <div
          className="flex items-baseline justify-end border-b border-gray-200 pb-6"
          style={{ marginBottom: "20px" }}
        >
          <div className="flex items-center">
            <Select
              value={sortBy}
              onChange={handleSort}
              className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              style={{ width: "200px", marginBottom: "10px" }}
              options={[
                { value: "recently added", label: "Recently Added" },
                { value: "price low to high", label: "Price low to high" },
                { value: "price high to low", label: "Price high to low" },
              ]}
            />
          </div>
        </div>

        <div className="flex gap-x-8 py-6">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            categories={["Mountain Bikes", "Road Bikes", "Electric Bikes"]}
          />

          <div className="flex-1">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
