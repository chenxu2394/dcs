import { Category, CategoryCreate, categoryDialogSchema, CategoryUpdate } from "@/types"
import { useToast } from "./ui/use-toast"
import { ChangeEvent, FormEvent, useState } from "react"
import { useCreateCategory, useUpdateCategory } from "@/features/use-categories"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { EditIcon } from "lucide-react"

type DialogProps = {
  category: Category
  forCreate?: boolean
}

export function CategoryDialog({ category, forCreate = true }: DialogProps) {
  const [targetCategory, setTargetCategory] = useState(category)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const categoryUpdate = useUpdateCategory()
  const categoryCreate = useCreateCategory()
  const { toast } = useToast()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTargetCategory((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!targetCategory.name) {
      setErrors({ name: "Name is required" })
      toast({ description: "Name is required" })
      return
    }

    const { id, ...rest } = targetCategory
    const formData = { ...rest }
    const result = categoryDialogSchema.safeParse(formData)
    if (!result.success) {
      const errorMessages = result.error.errors.reduce<Record<string, string>>((acc, error) => {
        if (typeof error.path[0] === "string") {
          acc[error.path[0]] = error.message
        }
        toast({ description: error.message })
        return acc
      }, {})
      setErrors(errorMessages)
      return
    }

    setErrors({})

    if (forCreate) {
      const toBeCreated: CategoryCreate = result.data
      categoryCreate.mutate(toBeCreated)
    } else {
      const toBeUpdated: CategoryUpdate = { id, ...result.data }
      categoryUpdate.mutate(toBeUpdated)
    }

    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          {forCreate ? "Add Category" : <EditIcon />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{forCreate ? "Create a new category" : "Edit category"}</DialogTitle>
          <DialogDescription>
            {forCreate
              ? "Fill in the details below to create a new category."
              : "Update the details below to edit the category."}
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
                value={targetCategory.name}
                onChange={handleChange}
                className="col-span-3"
                // required
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
                value={targetCategory.description}
                onChange={handleChange}
                className="col-span-3"
                // required
              />
              {errors.description && (
                <span className="text-red-500 col-span-4">{errors.description}</span>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{forCreate ? "Create" : "Update"}</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
