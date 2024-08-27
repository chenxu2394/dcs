import { Label } from "./ui/label"
import { Slider } from "./ui/slider"
import { cn } from "@/lib/utils"

interface Props {
  maxPrice: number
  selectedPriceRange: number[]
  setSelectedPriceRange: (range: number[]) => void
}

export function PriceSelector({ maxPrice, selectedPriceRange, setSelectedPriceRange }: Props) {
  return (
    <div className="flex items-center w-full max-w-sm space-x-2 rounded-lg border  dark:bg-gray-900 px-3.5 py-2">
      <Label>Price(€)</Label>
      <Slider
        min={0}
        max={maxPrice}
        step={1}
        className={cn("w-60")}
        minStepsBetweenThumbs={1}
        value={selectedPriceRange}
        onValueChange={setSelectedPriceRange}
      />
    </div>
  )
}
