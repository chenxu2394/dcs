import { SearchBox } from "./SearchBox"
import { CategorySelection } from "./CategorySelection"
import { Card } from "./ui/card"
import { all } from "axios"

interface Props {
  setSearchTerm: (searchTerm: string) => void
  allCategoryNames: string[]
}

export function UtilsBar({ setSearchTerm, allCategoryNames }: Props) {
  return (
    <Card className="flex p-2, mb-2">
      <SearchBox setSearchTerm={setSearchTerm} />
      <CategorySelection allCategoryNames={allCategoryNames} />
    </Card>
  )
}
