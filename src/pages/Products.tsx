import { Can } from "@/components/Can"
import { ProductList } from "@/components/ProductList"
import { useFilterProducts, useGetProducts } from "@/features/use-products"
import { UtilsBar } from "@/components/UtilsBar"
import { useEffect, useState } from "react"
import { useDebounce } from "@/features/useDebounce"
import { useGetCategories } from "@/features/use-categories"

export function Products() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories")
  const [products, isLoading] = useFilterProducts(debouncedSearchTerm, selectedCategory)
  const [allCategories] = useGetCategories()

  const [allProducts] = useGetProducts()
  const [maxPrice, setMaxPrice] = useState(0)
  useEffect(() => {
    const newMaxPrice = allProducts.reduce((acc, product) => Math.max(acc, product.price), 0)
    setMaxPrice(newMaxPrice)
    setSelectedPriceRange([0, newMaxPrice])
  }, [allProducts])

  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([0, maxPrice])
  const debouncedSelectedPriceRange = useDebounce(selectedPriceRange, 500)

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
                maxPrice={maxPrice}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
              />
              <ProductList products={products} />
            </div>
          )
        }
      />
    </div>
  )
}
