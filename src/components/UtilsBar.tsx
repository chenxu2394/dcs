import { SearchBox } from "./SearchBox"
import { CategorySelector } from "./CategorySelector"
import { Card } from "./ui/card"

interface Props {
  setSearchTerm: (searchTerm: string) => void
  allCategoryNames: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export function UtilsBar({
  setSearchTerm,
  allCategoryNames,
  selectedCategory,
  setSelectedCategory
}: Props) {
  return (
    <Card className="flex p-2, mb-2">
      <SearchBox setSearchTerm={setSearchTerm} />
      <CategorySelector
        allCategoryNames={allCategoryNames}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </Card>
  )
}
