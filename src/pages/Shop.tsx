import { useState } from "react";

import type { Product, FilterState } from "../types/product";
import { FilterSidebar } from "../components/shop/FilterSidebar";
import { ProductCard } from "../components/shop/ProductCard";
import ShopHeader from "../components/shop";
import { Button, Drawer, Layout, Pagination, Select } from "antd";
import { MenuOutlined } from "@ant-design/icons";
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
     priceRange: [0, 1000],
     brand: [],
     category: [],
   });
   const [sortBy, setSortBy] = useState<string>("featured");
   const [currentPage, setCurrentPage] = useState(1);
   const [drawerVisible, setDrawerVisible] = useState(false);

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

   

/*
     if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
       return false;
     }
       */

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

   const itemsPerPage = 12;
   const paginatedProducts = sortedProducts.slice(
     (currentPage - 1) * itemsPerPage,
     currentPage * itemsPerPage
   );

  return (
    <>
      <div className="pb-56">
        <ShopHeader />
      </div>
      <Layout className="min-h-screen bg-gray-100" style={{marginBottom: "50px"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 container">
          <div className="flex items-center justify-end mb-6">
            <div className="flex items-center gap-4 " style={{marginBottom: "20px", marginTop: "20px"}}>
              <Button
                icon={<MenuOutlined />}
                onClick={() => setDrawerVisible(true)}
                className="filter-button"
               
              >
                Filters
              </Button>
              <Select
                value={sortBy}
                onChange={setSortBy}
                className="w-[200px]"
                options={[
                  { value: "featured", label: "Featured" },
                  { value: "price-asc", label: "Price: Low to High" },
                  { value: "price-desc", label: "Price: High to Low" },
                ]}
              />
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                brand={["SportsPro", "ActiveWear", "FitGear"]}
                categories={[]}
              />
            </div>

            {/* Mobile Drawer */}
            <Drawer
              title="Filters"
              placement="left"
              onClose={() => setDrawerVisible(false)}
              visible={drawerVisible}
              width={300}
            >
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                brand={["SportsPro", "ActiveWear", "FitGear"]}
                categories={[]}
              />
            </Drawer>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Pagination
                  current={currentPage}
                  onChange={setCurrentPage}
                  total={sortedProducts.length}
                  pageSize={itemsPerPage}
                  showSizeChanger={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
