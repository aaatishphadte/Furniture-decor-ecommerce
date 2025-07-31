"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([50, 1000])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<string[]>([])

  const materials = ["Wood", "Metal", "Fabric", "Glass"]
  const colors = [
    { name: "White", value: "#FFFFFF" },
    { name: "Black", value: "#000000" },
    { name: "Red", value: "#FF0000" },
    { name: "Green", value: "#00FF00" },
    { name: "Blue", value: "#0000FF" },
  ]
  const brands = ["Roof&RoomMasters", "Modern Living", "Rustic Charm"]
  const ratings = ["4 Stars & Up", "3 Stars & Up", "2 Stars & Up", "1 Star & Up"]

  const handleMaterialChange = (material: string, checked: boolean) => {
    if (checked) {
      setSelectedMaterials([...selectedMaterials, material])
    } else {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material))
    }
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const handleRatingChange = (rating: string, checked: boolean) => {
    if (checked) {
      setSelectedRatings([...selectedRatings, rating])
    } else {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating))
    }
  }

  return (
    <div className="w-80 flex-shrink-0">
      <div className="bg-white p-4">
        <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight mb-6">Filters</h2>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-gray-900 text-base font-medium leading-normal mb-4">Price Range</h3>
          <div className="px-2">
            <Slider value={priceRange} onValueChange={setPriceRange} max={2000} min={0} step={10} className="mb-4" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Material */}
        <div className="mb-6">
          <h3 className="text-gray-900 text-lg font-bold leading-tight tracking-tight mb-4">Material</h3>
          <div className="space-y-3">
            {materials.map((material) => (
              <div key={material} className="flex items-center space-x-3">
                <Checkbox
                  id={material}
                  checked={selectedMaterials.includes(material)}
                  onCheckedChange={(checked) => handleMaterialChange(material, checked as boolean)}
                />
                <Label htmlFor={material} className="text-gray-900 text-base font-normal leading-normal">
                  {material}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="mb-6">
          <h3 className="text-gray-900 text-lg font-bold leading-tight tracking-tight mb-4">Color</h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <label
                key={color.name}
                className={`size-10 rounded-full border-2 cursor-pointer transition-all ${
                  selectedColor === color.value ? "border-gray-900 ring-2 ring-gray-400" : "border-gray-300"
                }`}
                style={{ backgroundColor: color.value }}
              >
                <input
                  type="radio"
                  name="color"
                  value={color.value}
                  checked={selectedColor === color.value}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div className="mb-6">
          <h3 className="text-gray-900 text-lg font-bold leading-tight tracking-tight mb-4">Brand</h3>
          <div className="space-y-3">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-3">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                />
                <Label htmlFor={brand} className="text-gray-900 text-base font-normal leading-normal">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Ratings */}
        <div className="mb-6">
          <h3 className="text-gray-900 text-lg font-bold leading-tight tracking-tight mb-4">Customer Ratings</h3>
          <div className="space-y-3">
            {ratings.map((rating) => (
              <div key={rating} className="flex items-center space-x-3">
                <Checkbox
                  id={rating}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
                />
                <Label htmlFor={rating} className="text-gray-900 text-base font-normal leading-normal">
                  {rating}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
