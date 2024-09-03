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
import { Category, Product } from "../types"
import { ChangeEvent, FormEvent, useState } from "react"
import { EditIcon } from "lucide-react"
import { useUpdateProduct } from "../features/use-products"

type DialogProps = {
  product: Product
  allCategories: Category[]
  // productUpdate: ReturnType<typeof useUpdateProduct>
}
export function ProductDialog({ product, allCategories }: DialogProps) {
  const [updatedProduct, setUpdatedProduct] = useState(product)
  const [selectedCategory, setSelectedCategory] = useState<string>(product.category.name)
  const productUpdate = useUpdateProduct()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const selectedCategoryObj = allCategories.find((c) => c.name === selectedCategory)

    if (!selectedCategoryObj) {
      // Handle the case where the category is not found
      console.error("Selected category not found")
      return
    }

    const { category, ...rest } = updatedProduct

    const toBeUpdated = {
      ...rest,
      categoryId: selectedCategoryObj.id
    }

    productUpdate.mutate(toBeUpdated)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            Make changes to the product here. Click save when you are done.
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
                value={updatedProduct.name}
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
                value={updatedProduct.description}
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
                value={updatedProduct.price}
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
                value={updatedProduct.discount}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Category</Label>
              <div id="category" className="col-span-3">
                <CategorySelector
                  allCategoryNames={allCategories.map((c) => c.name)}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  allCategories={false}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
