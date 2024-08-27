import { Can } from "@/components/Can"
import { ProductList } from "@/components/ProductList"
import { useSearchProducts } from "@/features/use-products"
import { SearchBox } from "@/components/SearchBox"
import { useState } from "react"
import { useDebounce } from "@/features/useDebounce"

export function Products() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [products, isLoading] = useSearchProducts(debouncedSearchTerm)

  return (
    <div className="p-2">
      <Can
        permission="PRODUCT:GET"
        permissionType="actions"
        yes={() =>
          isLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <SearchBox setSearchTerm={setSearchTerm} />
              <ProductList products={products} />
            </div>
          )
        }
      />
    </div>
  )
}
