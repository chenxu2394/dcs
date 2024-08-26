import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"

interface Props {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

export function SearchBox({ searchTerm, setSearchTerm }: Props) {
  const [inputValue, setInputValue] = useState(searchTerm)
  const lastUpdateTimeRef = useRef<Date | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const handleDebounce = () => {
      const now = new Date()
      const lastUpdateTime = lastUpdateTimeRef.current
      const delay = lastUpdateTime
        ? Math.min(1000, Math.max(500, now.getTime() - lastUpdateTime.getTime()))
        : 750
      // console.log(`Debouncing with a delay of ${delay}ms for: `, inputValue)

      if (timerRef.current) clearTimeout(timerRef.current)

      timerRef.current = window.setTimeout(() => {
        // console.log("Updating search term to: ", inputValue)
        setSearchTerm(inputValue)
        lastUpdateTimeRef.current = new Date() // Update the last update time
      }, delay)
    }

    handleDebounce()
    return () => {
      if (timerRef.current) {
        // console.log("Clearing timeout for: ", inputValue)
        clearTimeout(timerRef.current)
      }
    }
  }, [inputValue, setSearchTerm])

  return (
    <div className="flex items-center w-full max-w-sm space-x-2 rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-900 px-3.5 py-2">
      <Input
        type="search"
        placeholder="Search"
        value={inputValue}
        onChange={(e) => {
          console.log("Input changed to: ", e.target.value)
          setInputValue(e.target.value)
        }}
        className="w-full border-0 h-8 font-semibold"
      />
    </div>
  )
}
