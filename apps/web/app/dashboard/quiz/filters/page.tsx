"use client"

import { useState } from "react"
import { Card, CardContent } from "@repo/ui"
import { Slider } from "@repo/ui"
import { Button } from "@repo/ui"

const denominations = [
  "Catholic",
  "Baptist",
  "Methodist",
  "Pentecostal",
]

export default function FiltersPage() {
  const [age, setAge] = useState([18, 65])
  const [radius, setRadius] = useState([50])
  const [selectedDenomination, setSelectedDenomination] = useState<string[]>([])

  const toggleDenomination = (item: string) => {
    setSelectedDenomination((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    )
  }

  return (
    <div className="filters min-h-screen w-full bg-gradient-to-b from-[#140034] to-[#01010D] flex items-center justify-center p-6">

      <Card className="w-[620px] bg-[#160033]/70 backdrop-blur border border-white/10 rounded-3xl">
        <CardContent className="p-6 space-y-6">

          {/* AGE */}
          <div className="space-y-3">
            <div className="flex justify-between text-base text-white">
              <span>{age[0]} Years</span>
              <span>{age[1]}+ Years</span>
            </div>

            <Slider
              value={age}
              min={18}
              max={70}
              step={1}
              onValueChange={(value: number[]) => setAge(value)}
              className="
              [&_[data-radix-slider-track]]:bg-white/30
              [&_[data-radix-slider-range]]:bg-[#C39936]
              [&_[data-radix-slider-thumb]]:bg-[#C39936]
              [&_[data-radix-slider-thumb]]:border-2
              [&_[data-radix-slider-thumb]]:border-white
              "
            />
          </div>

          {/* LOCATION RADIUS */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-white/70">
              <span>Location Radius</span>
              <span className="bg-[#F2EEE5] text-[#C39936] px-3 py-1 rounded-full text-sm">
                {radius[0]} miles
              </span>
            </div>

            <Slider
              value={radius}
              min={1}
              max={100}
              step={1}
              onValueChange={(value: number[]) => setRadius(value)}
            />
          </div>

          {/* DENOMINATIONS */}
          <div className="space-y-3">
            <div className="flex justify-between text-white text-sm">
              <span>Denomination Preferences</span>
              <span className="text-white/60 text-xs">Select multiple</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {denominations.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleDenomination(item)}
                  className={`cursor-pointer py-5 rounded-[12px] text-base border font-normal transition
                  ${
                    selectedDenomination.includes(item)
                      ? "bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] border-transparent "
                      : "bg-[#F2EEE5] text-black border-[#E7ECF2]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* FAITH LIFESTYLE */}
          <div className="space-y-3">

            <h3 className="text-sm text-white/80">
              Faith & Lifestyle
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between items-center bg-white/90 text-black px-4 py-4 rounded-lg">
                <span className="text-sm font-medium text-[#1A1A1A] flex items-center gap-2"><img src="/images/smoke.png" alt="smoking" className="w-[16px] h-[16px]" /> Smoking</span>
                <span className="text-[#C39936] text-sm font-medium">Never</span>
              </div>

              <div className="flex justify-between items-center bg-white/90 text-black px-4 py-4 rounded-lg">
                <span className="text-sm font-medium text-[#1A1A1A] flex items-center gap-2"><img src="/images/drink.png" alt="alcohol" className="w-[16px] h-[16px]" /> Alcohol</span>
                <span className="text-[#C39936] text-sm font-medium">Socially</span>
              </div>

              <div className="flex justify-between items-center bg-white/90 text-black px-4 py-4 rounded-lg">
                <span className="text-sm font-medium text-[#1A1A1A] flex items-center gap-2"><img src="/images/dietplan.png" alt="diet" className="w-[16px] h-[16px]" /> Diet</span>
                <span className="text-[#C39936] text-sm font-medium">
                  No specific diet
                </span>
              </div>

            </div>
          </div>

          {/* APPLY BUTTON */}
          <button
            className="cursor-pointer bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] w-full h-[56px] rounded-[12px] text-[#913C01] font-semibold"
          >
            Apply Filters
          </button>

        </CardContent>
      </Card>
    </div>
  )
}