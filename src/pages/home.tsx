import { ProductList } from "@/components/ProductList"
import { useGetProducts } from "@/features/use-products"
import { Can } from "@/components/Can"

export function Home() {
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
