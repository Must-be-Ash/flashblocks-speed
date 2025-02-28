"use client"

// import { cn } from "@/lib/utils"
import { BuildingConstruction } from "@/components/building-construction"
import { Footer } from "@/components/Footer"

export default function SpeedComparison() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-3 py-4 max-w-7xl">
        <header className="flex justify-center items-center mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Flashblocks vs Blocks
          </h1>
        </header>

        <BuildingConstruction />
      </div>
      
      <div className="pb-8"></div> {/* Spacer to ensure content doesn't get hidden behind fixed footer */}
      <Footer />
    </div>
  )
}

