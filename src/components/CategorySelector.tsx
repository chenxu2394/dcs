import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Props {
  allCategoryNames: string[]
  selectedCategory: string | null
  setSelectedCategory: (category: string) => void
  allCategories: boolean
}

export function CategorySelector({
  allCategoryNames,
  selectedCategory,
  setSelectedCategory,
  allCategories
}: Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(selectedCategory)

  const categories = allCategoryNames.map((categoryName) => ({
    value: categoryName,
    label: categoryName
  }))

  if (allCategories) {
    categories.unshift({ value: "All Categories", label: "All Categories" })
  }
  const handleSelect = (currentValue: string) => {
    setValue(currentValue)
    setSelectedCategory(currentValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? categories.find((category) => category.value === value)?.label
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={() => handleSelect(category.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
