import { Input } from "@/components/ui/input"

interface Props {
  setSearchTerm: (searchTerm: string) => void
}

export function SearchBox({ setSearchTerm }: Props) {
  return (
    <div className="flex items-center w-full max-w-sm space-x-2 rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-900 px-3.5 py-2">
      <Input
        type="search"
        placeholder="Search"
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
        className="w-full border-0 h-8 font-semibold"
      />
    </div>
  )
}
