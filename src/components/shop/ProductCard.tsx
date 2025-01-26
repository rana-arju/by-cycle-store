import { Button } from "antd";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div
      className="group relative border border-[#3182CE] rounded-md hover:shadow-xl"
      style={{ padding: "5px" }}
    >
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full  object-center transition-transform duration-300 group-hover:scale-105 object-fill"
        />
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <div className="flex items-center gap-2">
          {product.salePrice ? (
            <>
              <p className="text-lg font-bold text-gray-900">
                ${product.salePrice}
              </p>
              <p className="text-sm text-gray-500 line-through">
                ${product.price}
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-gray-900">${product.price}</p>
          )}
        </div>
        <div className="mt-[5px] flex justify-center">
          <Button htmlType="submit" type="primary" className="w-full" style={{marginTop: "10px", marginBottom: "10px", textTransform: "capitalize", fontSize: "15px"}}>Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
