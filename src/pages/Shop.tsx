import { useState, useCallback, useEffect } from "react";
import { Button, Drawer, Layout, Pagination, Select, Spin } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import type { FilterState } from "../types/product";
import { FilterSidebar } from "../components/shop/FilterSidebar";
import { useGetAllProductQuery } from "../redux/features/product/productApi";
import type { IQueryParam } from "../types/global";
import ProductCard from "../components/card";
import ShopHeader from "../components/shop";

export default function Shop() {
  const [queryParams, setQueryParams] = useState<IQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("name");
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: products,
    isFetching,
    isLoading,
  } = useGetAllProductQuery([
    { name: "page", value: page.toString() },
    { name: "sort", value: sortBy },
    { name: "searchTerm", value: searchTerm },
    ...queryParams,
  ]);

  const defaultFiletr: FilterState = {
    availability: "all",
    priceRange: [500, 40000],
    brand: [],
    model: [],
    category: [],
  };
  const [filters, setFilters] = useState<FilterState>(defaultFiletr);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
    // Clear other filters when searching
    setFilters({
      availability: "all",
      priceRange: [500, 40000],
      brand: [],
      model: [],
      category: [],
    });
  };

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1);
    // Clear search term when filtering
    setSearchTerm("");
  }, []);

  useEffect(() => {
    const newParams: IQueryParam[] = [];
    if (filters.availability !== "all") {
      newParams.push({ name: "availability", value: filters.availability });
    }
    if (filters.priceRange[0] !== 500 || filters.priceRange[1] !== 40000) {
      newParams.push({
        name: "minPrice",
        value: filters.priceRange[0].toString(),
      });
      newParams.push({
        name: "maxPrice",
        value: filters.priceRange[1].toString(),
      });
    }
    if (filters.brand.length > 0) {
      newParams.push({ name: "brand", value: filters.brand.join(",") });
    }
    if (filters.model.length > 0) {
      newParams.push({ name: "model", value: filters.model.join(",") });
    }
    if (filters.category.length > 0) {
      newParams.push({ name: "category", value: filters.category.join(",") });
    }
    setQueryParams(newParams);
  }, [filters]);

  return (
    <>
      <div>
        <ShopHeader onSearch={handleSearch} value={searchTerm} />
      </div>
      <Layout
        className="min-h-screen bg-gray-100"
        style={{ marginBottom: "10px" }}
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 container"
          style={{ marginBottom: "20px" }}
        >
          <div className="flex items-center justify-end mb-6">
            <div
              className="flex items-center gap-4"
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
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                brands={[
                  "Trek",
                  "Giant",
                  "Specialized",
                  "Cannondale",
                  "Scott",
                  "Santa Cruz",
                  "Bianchi",
                  "Merida",
                  "Cervélo",
                  "Orbea",
                  "Fuji",
                  "Cube",
                  "Marin",
                  "Kona",
                  "Raleigh",
                  "GT Bicycles",
                  "Polygon",
                  "Norco",
                  "BMC",
                  "Yeti Cycles",
                ]}
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
                onChange={handleFilterChange}
                brands={[
                  "Trek",
                  "Giant",
                  "Specialized",
                  "Cannondale",
                  "Scott",
                  "Santa Cruz",
                  "Bianchi",
                  "Merida",
                  "Cervélo",
                  "Orbea",
                  "Fuji",
                  "Cube",
                  "Marin",
                  "Kona",
                  "Raleigh",
                  "GT Bicycles",
                  "Polygon",
                  "Norco",
                  "BMC",
                  "Yeti Cycles",
                ]}
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
            </Drawer>

            {/* Product Grid */}
            <div className="flex-1">
              {isFetching || isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Spin size="large" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {products?.data && products?.data?.length > 0 ? (
                      products?.data?.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "20px",
                            color: "#1D4ED8",
                          }}
                        >
                          There are no product available!
                        </p>
                      </div>
                    )}
                  </div>

                  <div
                    className="mt-8 flex justify-center"
                    style={{ marginTop: "20px" }}
                  >
                    <Pagination
                      current={page}
                      onChange={setPage}
                      total={products?.meta?.total || 0}
                      pageSize={products?.meta?.limit || 10}
                      showSizeChanger={false}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
