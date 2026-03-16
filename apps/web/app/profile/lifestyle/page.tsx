"use client"

import { useState } from "react"

import { ChevronLeft } from "lucide-react"
import { Button, Card, CardContent, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui"
import Link from "next/link"

export default function LifestylePage() {
  const [smoking, setSmoking] = useState("Never")
  const [alcohol, setAlcohol] = useState("Socially")
  const [diet, setDiet] = useState("No specific diet")

  const options = ["Never", "Socially", "Regularly"]

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col md:gap-6 gap-3 sm:p-6 px-3 text-white">
        <div className="flex items-center px-0 pb-2 w-full">
        <Link
          href="/profile"
          className="flex items-center justify-center size-10 rounded-full text-white/90 hover:bg-white/10 transition-colors"
          aria-label="Back"
        >
          <ChevronLeft className="size-6" />
        </Link>
      </div>

        {/* Header */}
        <div className="flex items-center gap-2 ">
          <h1 className="text-[24px] font-normal font-serif">Lifestyle</h1>
        </div>

        <p className="text-[20px] font-light">Lifestyle Basics</p>

        {/* Smoking */}
        <div className="">
          <p className="mb-3 sm:text-[20px] text-[16px] font-light">Smoking</p>

          <div className="flex gap-3">
            {options.map((item) => (
              <button
                key={item}
                onClick={() => setSmoking(item)}
                className={`cursor-pointer flex-1 sm:h-[52px] h-[36px] rounded-[8px]  text-sm font-medium transition
                ${
                  smoking === item
                    ? "bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01]"
                    : "bg-[#FBFAF9] text-[#1A1A1A]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Alcohol */}
        <div className="">
          <p className="mb-3 sm:text-[20px] text-[16px] font-light">Alcohol</p>

          <div className="flex gap-3">
            {options.map((item) => (
              <button
                key={item}
                onClick={() => setAlcohol(item)}
                className={`cursor-pointer flex-1 sm:h-[52px] h-[36px] rounded-[8px] text-sm font-medium transition
                ${
                  alcohol === item
                    ? "bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01]"
                    : "bg-[#FBFAF9] text-[#1A1A1A]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="">
          <p className="mb-3 sm:text-[20px] text-[16px] font-light">Dietary Preferences</p>

          <Select
            value={diet}
            onValueChange={(value) => setDiet(value)}
          >
            <SelectTrigger className="w-full bg-[#FBFAF9] !h-[52px] rounded-[8px] text-[#1A1A1A] text-sm">
              <SelectValue placeholder="Select diet" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="No specific diet">
                No specific diet
              </SelectItem>
              <SelectItem value="Vegetarian">
                Vegetarian
              </SelectItem>
              <SelectItem value="Vegan">
                Vegan
              </SelectItem>
              <SelectItem value="Keto">
                Keto
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Save Button */}
        <Button
          className="cursor-pointer w-full h-[52px] mb-4 text-[#913C01] font-semibold bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)]"
        >
          Save Changes
        </Button>

        {/* Cancel */}
        <button className="cursor-pointer w-full h-[52px] rounded-[12px] md:rounded-[8px] border border-[#913C01] text-[#913C01] font-medium">
          Cancel
        </button>

      </CardContent>
      </Card>
    </div>
  )
}