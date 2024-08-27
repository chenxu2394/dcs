import { Can } from "@/components/Can"
import { ProductList } from "@/components/ProductList"
import { useFilterProducts } from "@/features/use-products"
import { UtilsBar } from "@/components/UtilsBar"
import { useState } from "react"
import { useDebounce } from "@/features/useDebounce"
import { useGetCategories } from "@/features/use-categories"

export function Products() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories")
  const [products, isLoading] = useFilterProducts(debouncedSearchTerm, selectedCategory)
  const [allCategories] = useGetCategories()

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
              <UtilsBar
                setSearchTerm={setSearchTerm}
                allCategoryNames={allCategories.map((c) => c.name)}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <ProductList products={products} />
            </div>
          )
        }
      />
    </div>
  )
}
