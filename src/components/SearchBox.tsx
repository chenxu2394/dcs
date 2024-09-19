import { Input } from "@/components/ui/input"

interface Props {
  setSearchTerm: (searchTerm: string) => void
}

export function SearchBox({ setSearchTerm }: Props) {
  return (
    <div className="flex justify-center items-center w-full   rounded-lg border  dark:bg-gray-900  py-1">
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
