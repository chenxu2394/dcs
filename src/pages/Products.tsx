import { Can } from "@/components/Can"
import { ProductList } from "@/components/ProductList"
import { useSearchProducts } from "@/features/use-products"
import { SearchBox } from "@/components/SearchBox"
import { useState } from "react"

export function Products() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [products, isLoading] = useSearchProducts(searchTerm)

  console.log("%csrc/pages/Products.tsx:11 searchTerm", "color: #007acc;", searchTerm)

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
              <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <ProductList products={products} />
            </div>
          )
        }
      />
    </div>
  )
}
