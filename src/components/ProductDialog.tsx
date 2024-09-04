import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { CategorySelector } from "./CategorySelector"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Category, Product, ProductUpdate } from "../types"
import { ChangeEvent, FormEvent, useState } from "react"
import { EditIcon, PlusIcon } from "lucide-react"
import { useUpdateProduct, useCreateProduct } from "../features/use-products"
import { ProductCreate } from "../types/product"

type DialogProps = {
  product: Product
  allCategories: Category[]
  forCreate?: boolean
}
export function ProductDialog({ product, allCategories, forCreate = true }: DialogProps) {
  const [targetProduct, setTargetProduct] = useState(product)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(product.category.name)
  const productUpdate = useUpdateProduct()
  const productCreate = useCreateProduct()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTargetProduct((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!selectedCategory) {
      console.error("No category selected")
      return
    }

    const selectedCategoryObj = allCategories.find((c) => c.name === selectedCategory)

    if (!selectedCategoryObj) {
      // Handle the case where the category is not found
      console.error("Selected category not found")
      return
    }

    if (!selectedCategoryObj.id) {
      // Handle the case where the category id is not found
      console.error("Selected category id not found")
      return
    }

    const { id, category, ...rest } = targetProduct
    if (forCreate) {
      const toBeCreated: ProductCreate = {
        ...rest,
        categoryId: selectedCategoryObj.id
      }
      productCreate.mutate(toBeCreated)
    } else {
      const toBeUpdated: ProductUpdate = {
        id,
        ...rest,
        categoryId: selectedCategoryObj.id
      }
      productUpdate.mutate(toBeUpdated)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{forCreate ? <PlusIcon /> : <EditIcon />}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{forCreate ? "Create a new product" : "Edit product"}</DialogTitle>
          <DialogDescription>
            {forCreate
              ? "Fill in the details below to create a new product."
              : "Update the details below to edit the product."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={targetProduct.name}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={targetProduct.description}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price(€)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={targetProduct.price}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount" className="text-right">
                Discount(%)
              </Label>
              <Input
                id="discount"
                name="discount"
                type="number"
                value={targetProduct.discount}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Category</Label>
              <div id="category" className="col-span-3">
                <CategorySelector
                  allCategoryNames={allCategories
                    .map((c) => c.name)
                    .filter((name): name is string => name !== null)}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  allCategories={false}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">{forCreate ? "Create product" : "Update product"}</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
