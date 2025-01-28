import { Radio, Slider, Checkbox, Card, Typography, Space } from "antd";
import { FilterState } from "../../types/product";

const { Title } = Typography;

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  categories: string[];
  brands: string[];
  models: string[];
}

export function FilterSidebar({
  filters,
  onChange,
  categories,
  brands,
  models,
}: FilterSidebarProps) {
  const handleAvailabilityChange = (value: FilterState["availability"]) => {
    onChange({ ...filters, availability: value });
  };

  const handlePriceRangeChange = (value: number[]) => {
    onChange({ ...filters, priceRange: value });
  };

  const handleCategoryChange = (checkedValues: string[]) => {
    onChange({ ...filters, category: checkedValues });
  };

  const handleBrandChange = (checkedValues: string[]) => {
    onChange({ ...filters, brand: checkedValues });
  };

  const handleModelChange = (checkedValues: string[]) => {
    onChange({ ...filters, model: checkedValues });
  };

  return (
    <Card className="w-64 shadow-md">
      <Space direction="vertical" size="large" className="w-full">
        <div>
          <Title level={4}>Availability</Title>
          <Radio.Group
            value={filters.availability}
            onChange={(e) => handleAvailabilityChange(e.target.value)}
          >
            <Space direction="vertical">
              <Radio value="all">All</Radio>
              <Radio value="in-stock">In Stock</Radio>
              <Radio value="out-of-stock">Out of Stock</Radio>
            </Space>
          </Radio.Group>
        </div>

        <div>
          <Title level={4}>Price Range</Title>
          <Slider
            range
            min={0}
            max={50000}
            step={100}
            value={filters.priceRange}
           onChange={handlePriceRangeChange}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>৳{filters.priceRange[0]}</span>
            <span>৳{filters.priceRange[1]}</span>
          </div>
        </div>

        <div>
          <Title level={4}>Categories</Title>
          <Checkbox.Group
            options={categories.map((category) => ({
              label: category,
              value: category,
            }))}
            value={filters.category}
            onChange={handleCategoryChange}
          />
        </div>

        <div>
          <Title level={4}>Brand</Title>
          <Checkbox.Group
            options={brands.map((brand) => ({
              label: brand,
              value: brand,
            }))}
            value={filters.brand}
            onChange={handleBrandChange}
          />
        </div>

        <div>
          <Title level={4}>Model</Title>
          <Checkbox.Group
            options={models.map((model) => ({
              label: model,
              value: model,
            }))}
            value={filters.model}
            onChange={handleModelChange}
          />
        </div>
      </Space>
    </Card>
  );
}
