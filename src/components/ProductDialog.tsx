import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { CategorySelector } from "./CategorySelector"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Category, Product, ProductUpdate, ProductCreate, productDialogSchema } from "../types"
import { ChangeEvent, FormEvent, useState } from "react"
import { EditIcon } from "lucide-react"
import { useUpdateProduct, useCreateProduct } from "../features/use-products"
import { useToast } from "./ui/use-toast"

type DialogProps = {
  product: Product
  allCategories: Category[]
  forCreate?: boolean
}
export function ProductDialog({ product, allCategories, forCreate = true }: DialogProps) {
  const [targetProduct, setTargetProduct] = useState(product)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(product.category.name)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const productUpdate = useUpdateProduct()
  const productCreate = useCreateProduct()
  const { toast } = useToast()

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
      setErrors({ categoryId: "No category selected" })
      toast({ description: "No category selected" })
      return
    }

    const selectedCategoryObj = allCategories.find((c) => c.name === selectedCategory)

    if (!selectedCategoryObj || !selectedCategoryObj.id) {
      setErrors({ categoryId: "Selected category not found or invalid" })
      toast({ description: "Selected category not found or invalid" })
      return
    }

    const { id, category, ...rest } = targetProduct
    const formData = { ...rest, categoryId: selectedCategoryObj.id }

    const result = productDialogSchema.safeParse(formData)
    if (!result.success) {
      const errorMessages = result.error.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message
        toast({ description: error.message })
        return acc
      }, {} as { [key: string]: string })
      setErrors(errorMessages)
      return
    }

    setErrors({})

    if (forCreate) {
      const toBeCreated: ProductCreate = result.data
      productCreate.mutate(toBeCreated)
    } else {
      const toBeUpdated: ProductUpdate = { id, ...result.data }
      productUpdate.mutate(toBeUpdated)
    }

    // Close the dialog only if there are no validation errors
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          {forCreate ? "Add Product" : <EditIcon />}
        </Button>
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
              {errors.name && <span className="text-red-500 col-span-4">{errors.name}</span>}
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
              {errors.description && (
                <span className="text-red-500 col-span-4">{errors.description}</span>
              )}
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
              {errors.price && <span className="text-red-500 col-span-4">{errors.price}</span>}
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
              {errors.discount && (
                <span className="text-red-500 col-span-4">{errors.discount}</span>
              )}
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
                {errors.categoryId && (
                  <span className="text-red-500 col-span-4">{errors.categoryId}</span>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{forCreate ? "Create product" : "Update product"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
