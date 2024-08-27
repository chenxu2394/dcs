import { Slider } from "./ui/slider"
import { cn } from "@/lib/utils"

interface Props {
  maxPrice: number
  selectedPriceRange: number[]
  setSelectedPriceRange: (range: number[]) => void
}

export function PriceSelector({ maxPrice, selectedPriceRange, setSelectedPriceRange }: Props) {
  return (
    <div className="flex items-center space-x-4">
      <label className="text-sm">Price:</label>
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
