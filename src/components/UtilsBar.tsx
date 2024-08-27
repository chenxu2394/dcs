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
    <Card className="grid p-2 mb-2 grid-cols-3 place-items-center">
      <SearchBox setSearchTerm={setSearchTerm} />
      <CategorySelector
        allCategoryNames={allCategoryNames}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <PriceSelector
        maxPrice={maxPrice}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
      />
    </Card>
  )
}
