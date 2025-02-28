"use client"

import { useState, useEffect, useRef, useCallback } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BurjKhalifa } from "@/components/buildings/BurjKhalifa"
import { EiffelTower } from "@/components/buildings/EiffelTower"
import { EmpireState } from "@/components/buildings/EmpireState"

interface Building {
  name: string;
  floors: number;
  height: number;
  color: string;
  accent: string;
  glass?: string;
  realConstructionTime: string; // human-readable construction time
  realConstructionMonths: number; // in months for calculations
}

// Define buildings
const buildings: Record<string, Building> = {
  burj: {
    name: "Burj Khalifa",
    floors: 40,
    height: 400,
    color: "from-sky-300 via-sky-400 to-sky-600",
    accent: "from-sky-200 to-sky-400",
    glass: "from-sky-200/30 to-sky-300/30",
    realConstructionTime: "6 years (2004-2010)",
    realConstructionMonths: 72, // 6 years
  },
  eiffel: {
    name: "Eiffel Tower",
    floors: 30,
    height: 300,
    color: "from-zinc-400 to-zinc-600",
    accent: "from-zinc-300 to-zinc-500",
    realConstructionTime: "2 years, 2 months, 5 days (1887-1889)",
    realConstructionMonths: 26, // 2 years, 2 months
  },
  empire: {
    name: "Empire State Building",
    floors: 35,
    height: 350,
    color: "from-amber-400 to-amber-600",
    accent: "from-amber-300 to-amber-500",
    realConstructionTime: "1 year and 45 days (1930-1931)",
    realConstructionMonths: 13, // 1 year and 45 days
  },
}

export function BuildingConstruction() {
  const [selectedBuilding, setSelectedBuilding] = useState("eiffel")
  const [flashblocksFloors, setFlashblocksFloors] = useState(0)
  const [blocksFloors, setBlocksFloors] = useState(0)

  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const resetBuilding = useCallback(() => {
    setFlashblocksFloors(0)
    setBlocksFloors(0)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    startTimeRef.current = null
  }, [])

  const animateBuilding = useCallback(() => {
    const now = performance.now()
    const elapsed = startTimeRef.current ? now - startTimeRef.current : 0

    // Each floor takes 200ms for Flashblocks, 2000ms for Blocks
    const totalFloors = buildings[selectedBuilding as keyof typeof buildings].floors

    // Calculate floors completed
    const newFlashblocksFloors = Math.min(totalFloors, Math.floor(elapsed / 200))
    const newBlocksFloors = Math.min(totalFloors, Math.floor(elapsed / 2000))

    setFlashblocksFloors(newFlashblocksFloors)
    setBlocksFloors(newBlocksFloors)

    if (newFlashblocksFloors < totalFloors || newBlocksFloors < totalFloors) {
      animationRef.current = requestAnimationFrame(animateBuilding)
    }
  }, [selectedBuilding])

  const startBuilding = useCallback(() => {
    resetBuilding()
    startTimeRef.current = performance.now()
    animateBuilding()
  }, [resetBuilding, animateBuilding])

  // Automatically start building when the selected building changes
  useEffect(() => {
    startBuilding()
  }, [selectedBuilding, startBuilding])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const buildingData = buildings[selectedBuilding as keyof typeof buildings]
  const totalFloors = buildingData.floors
  const flashblocksProgress = (flashblocksFloors / totalFloors) * 100
  const blocksProgress = (blocksFloors / totalFloors) * 100

  // Calculate real-world construction time comparison
  const getRealWorldComparison = () => {
    const realTime = buildingData.realConstructionMonths;
    
    // Format months into years and months
    const formatTime = (months: number) => {
      const years = Math.floor(months / 12);
      const remainingMonths = Math.round(months % 12);
      
      if (years === 0) {
        return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
      } else if (remainingMonths === 0) {
        return `${years} year${years !== 1 ? 's' : ''}`;
      } else {
        return `${years} year${years !== 1 ? 's' : ''} and ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
      }
    };
    
    const traditionalTime = formatTime(realTime);
    const flashblocksTime = formatTime(realTime / 10);
    
    return {
      traditional: traditionalTime,
      flashblocks: flashblocksTime
    };
  };

  // Render the appropriate building based on selection
  const renderBuilding = (type: string, completedFloors: number) => {
    const building = buildings[type as keyof typeof buildings];

    switch (type) {
      case "burj":
        return <BurjKhalifa completedFloors={completedFloors} totalFloors={building.floors} />;

      case "eiffel":
        return <EiffelTower completedFloors={completedFloors} totalFloors={building.floors} />;

      case "empire":
        return <EmpireState completedFloors={completedFloors} totalFloors={building.floors} />;

      default:
        return null;
    }
  }

  const timeComparison = getRealWorldComparison();
  
  // Calculate current time based on completed floors
  const flashblocksCurrentTime = (flashblocksFloors * 0.2).toFixed(1);
  const blocksCurrentTime = (blocksFloors * 2).toFixed(1);

  return (
    <div className="space-y-2">
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardContent className="p-4">
          {/* Building selection buttons moved to the top */}
          <div className="mb-3 flex items-center justify-center">
            <div className="flex gap-2 flex-wrap justify-center">
              {Object.entries(buildings).map(([key, building]) => (
                <Button
                  key={key}
                  variant={selectedBuilding === key ? "default" : "outline"}
                  onClick={() => setSelectedBuilding(key)}
                  className="px-3 h-8 text-sm"
                  size="sm"
                >
                  {building.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <div className="relative h-[450px] border rounded-lg flex items-center justify-center p-3 pt-12 bg-gradient-to-b from-sky-50 via-sky-100 to-sky-200 dark:from-sky-900 dark:via-sky-800 dark:to-sky-950 overflow-hidden">
                {renderBuilding(selectedBuilding, flashblocksFloors)}
              </div>
              <div className="flex items-center justify-between">
                <Progress value={flashblocksProgress} className="h-2 flex-1" />
                <span className="ml-2 text-xs font-medium">{flashblocksCurrentTime}s</span>
              </div>
              <div className="text-center text-sm font-medium">Flashblocks</div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="relative h-[450px] border rounded-lg flex items-center justify-center p-3 pt-12 bg-gradient-to-b from-sky-50 via-sky-100 to-sky-200 dark:from-sky-900 dark:via-sky-800 dark:to-sky-950 overflow-hidden">
                {renderBuilding(selectedBuilding, blocksFloors)}
              </div>
              <div className="flex items-center justify-between">
                <Progress value={blocksProgress} className="h-2 flex-1" color="destructive" />
                <span className="ml-2 text-xs font-medium">{blocksCurrentTime}s</span>
              </div>
              <div className="text-center text-sm font-medium">Traditional Blocks</div>
            </div>
          </div>

          {/* Real-world construction time comparison - always visible */}
          <div className="mt-3">
            <div className="bg-muted p-3 rounded-lg max-w-3xl mx-auto">
              <h3 className="text-base font-semibold mb-2 text-center">Real-World Construction Comparison</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-background p-2 rounded-md border">
                  <div className="text-xs text-muted-foreground">With Flashblocks Technology:</div>
                  <div className="font-medium text-sm">It would have only taken <span className="text-primary font-bold">{timeComparison.flashblocks}</span> to build</div>
                </div>
                <div className="bg-background p-2 rounded-md border">
                  <div className="text-xs text-muted-foreground">Blocks:</div>
                  <div className="font-medium text-sm">The {buildingData.name} took <span className="text-destructive font-bold">{timeComparison.traditional}</span> to build</div>
                </div>
              </div>
              
              <div className="text-center text-xs text-muted-foreground mt-2">
                That&apos;s a 10x improvement in speed! Each task that takes 2 seconds with Traditional Blocks takes only 200ms with Flashblocks
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


