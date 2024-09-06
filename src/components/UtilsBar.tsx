import { SearchBox } from "./SearchBox"
import { CategorySelector } from "./CategorySelector"
import { Card } from "./ui/card"
import { PriceSelector } from "./PriceSelector"

interface Props {
  setSearchTerm: (searchTerm: string) => void
  allCategoryNames: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  maxPrice: number
  selectedPriceRange: number[]
  setSelectedPriceRange: (range: number[]) => void
}

export function UtilsBar({
  setSearchTerm,
  allCategoryNames,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  selectedPriceRange,
  setSelectedPriceRange
}: Props) {
  return (
    <Card className="grid gap-2 p-2 mb-2  place-items-center sm:grid-cols-3 grid-cols-1">
      <SearchBox setSearchTerm={setSearchTerm} />
      <div className="flex justify-center w-full max-w-sm rounded-lg border  dark:bg-gray-900 p-1">
        <CategorySelector
          allCategoryNames={allCategoryNames}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          allCategories={true}
        />
      </div>
      <PriceSelector
        maxPrice={maxPrice}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
      />
    </Card>
  )
}
