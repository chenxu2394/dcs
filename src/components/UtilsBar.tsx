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
    <div className="sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-center">
          <div className="w-full max-w-sm h-10">
            <SearchBox setSearchTerm={setSearchTerm} />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-sm h-10">
            <CategorySelector
              allCategoryNames={allCategoryNames}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              allCategories={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
