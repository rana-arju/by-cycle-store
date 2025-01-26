import type { FilterState } from "../../types/product"

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  categories: string[];

}

export function FilterSidebar({
  filters,
  onChange,
  categories,

}: FilterSidebarProps) {
  return (
    <div className="w-52 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Availability</h3>
        <div className="space-y-2">
          {["all", "in-stock", "out-of-stock"].map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="availability"
                className="checkbox-input"
                checked={filters.availability === option}
                onChange={() =>
                  onChange({
                    ...filters,
                    availability: option as FilterState["availability"],
                  })
                }
              />
              <span className="text-sm capitalize">
                {option.replace("-", " ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div style={{marginTop: "10px"}}>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <input
          type="range"
          min={0}
          max={50000}
          step={100}
          value={filters.priceRange[1]}
          onChange={(e) =>
            onChange({
              ...filters,
              priceRange: [filters.priceRange[0], Number(e.target.value)],
            })
          }
          className="price-slider"
          style={{width: "100%"}}
        />
        <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
          <span>৳{filters.priceRange[0]}</span>
          <span>৳{filters.priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="checkbox-input"
                checked={filters.category.includes(category)}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    category: e.target.checked
                      ? [...filters.category, category]
                      : filters.category.filter((c) => c !== category),
                  })
                }
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>
       <div>
        <h3 className="text-lg font-semibold mb-4">Brand</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="checkbox-input"
                checked={filters.category.includes(category)}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    category: e.target.checked
                      ? [...filters.category, category]
                      : filters.category.filter((c) => c !== category),
                  })
                }
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>   <div>
        <h3 className="text-lg font-semibold mb-4">Model</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="checkbox-input"
                checked={filters.category.includes(category)}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    category: e.target.checked
                      ? [...filters.category, category]
                      : filters.category.filter((c) => c !== category),
                  })
                }
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

     

   
    </div>
  );
}
