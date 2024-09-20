import { Input } from "@/components/ui/input"
import { useRef, useEffect } from "react"

interface Props {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

export function SearchBox({ searchTerm, setSearchTerm }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchTerm])

  return (
    <div className="flex justify-center items-center w-full rounded-lg border dark:bg-gray-900 py-1">
      <Input
        ref={inputRef}
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
        className="w-full border-0 h-8 font-semibold"
      />
    </div>
  )
}
