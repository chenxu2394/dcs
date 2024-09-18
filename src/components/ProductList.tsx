import { Product } from "@/types"
import { ProductCard } from "./ProductCard"

type ProductListProps = {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
