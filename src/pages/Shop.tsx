import { useState } from "react";

import type { FilterState } from "../types/product";
import { FilterSidebar } from "../components/shop/FilterSidebar";
import ShopHeader from "../components/shop";
import { Button, Drawer, Layout, Pagination, Select, Spin } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useGetAllProductQuery } from "../redux/features/product/productApi";
import { IQueryParam } from "../types/global";
import ProductCard from "../components/card";
import AppFooter from "../components/footer";
// This would normally come from an API


export default function Shop() {
  const [params, setParams] = useState<IQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("name");

  const {
    data: products,
    isFetching,
    isLoading,
  } = useGetAllProductQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "sort", value: sortBy },
    ...params,
  ]);
 
  const [filters, setFilters] = useState<FilterState>({
    availability: "all",
    priceRange: [500, 40000],
    brand: [],
    model: [],
    category: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Render loading UI conditionally
  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }
console.log("filters", filters);

  return (
    <>
      <div className="pb-56">
        <ShopHeader />
      </div>
      <Layout
        className="min-h-screen bg-gray-100"
        style={{ marginBottom: "50px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 container" style={{marginBottom: "20px"}}>
          <div className="flex items-center justify-end mb-6">
            <div
              className="flex items-center gap-4 "
              style={{ marginBottom: "20px", marginTop: "20px" }}
            >
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
                  { value: "name", label: "Product name" },
                  { value: "price", label: "Price: Low to High" },
                  { value: "-price", label: "Price: High to Low" },
                ]}
              />
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
              {products && (
                <FilterSidebar
                  filters={filters}
                  onChange={setFilters}
                  brands={["SportsPro", "ActiveWear", "FitGear"]}
                  models={[
                    "ModelX100",
                    "TrailBlazer",
                    "SpeedsterPro",
                    "UrbanRider",
                    "EcoCruise",
                    "XtremeBMX",
                    "PowerPedal",
                    "FoldMaster",
                    "JuniorJoy",
                    "TouringPro",
                    "GravelGrinder",
                    "FatTireX",
                    "RecuRide",
                    "TandemExpress",
                    "TrackStar",
                  ]}
                  categories={[
                    "Mountain",
                    "Road",
                    "Hybrid",
                    "BMX",
                    "Electric",
                    "Cruiser",
                    "Folding",
                    "Kids",
                    "Touring",
                    "Cyclocross",
                    "Gravel",
                    "Fat",
                    "Recumbent",
                    "Tandem",
                    "Track",
                  ]}
                />
              )}
            </div>

            {/* Mobile Drawer */}
            <Drawer
              title="Filters"
              placement="left"
              onClose={() => setDrawerVisible(false)}
              visible={drawerVisible}
              width={300}
            >
              {products && (
                <FilterSidebar
                  filters={filters}
                  onChange={setFilters}
                  brands={["SportsPro", "ActiveWear", "FitGear"]}
                  models={[
                    "ModelX100",
                    "TrailBlazer",
                    "SpeedsterPro",
                    "UrbanRider",
                    "EcoCruise",
                    "XtremeBMX",
                    "PowerPedal",
                    "FoldMaster",
                    "JuniorJoy",
                    "TouringPro",
                    "GravelGrinder",
                    "FatTireX",
                    "RecuRide",
                    "TandemExpress",
                    "TrackStar",
                  ]}
                  categories={[
                    "Mountain",
                    "Road",
                    "Hybrid",
                    "BMX",
                    "Electric",
                    "Cruiser",
                    "Folding",
                    "Kids",
                    "Touring",
                    "Cyclocross",
                    "Gravel",
                    "Fat",
                    "Recumbent",
                    "Tandem",
                    "Track",
                  ]}
                />
              )}
            </Drawer>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {!isFetching &&
                  !isLoading &&
                  products &&
                  products?.data?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Pagination
                  current={currentPage}
                  onChange={setCurrentPage}
                  total={10}
                  pageSize={10}
                  showSizeChanger={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
        <AppFooter />
    </>
  );
}
