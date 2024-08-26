import { Can } from "@/components/Can"
import { ProductList } from "@/components/ProductList"
import { useGetProducts } from "@/features/use-products"

export function Products() {
  const [products, isLoading] = useGetProducts()

  return (
    <div className="p-2">
      <Can
        permission="PRODUCT:GET"
        permissionType="actions"
        yes={() => (isLoading ? <p>Loading...</p> : <ProductList products={products} />)}
      />
    </div>
  )
}
