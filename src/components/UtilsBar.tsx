import { SearchBox } from "./SearchBox"
import { Card } from "./ui/card"

interface Props {
  setSearchTerm: (searchTerm: string) => void
}

export function UtilsBar({ setSearchTerm }: Props) {
  return (
    <Card className="p-2, mb-2">
      <SearchBox setSearchTerm={setSearchTerm} />
    </Card>
  )
}
