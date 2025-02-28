import Image from "next/image"
import Link from "next/link"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full py-1 px-4 bg-white/30 dark:bg-black/30 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-1">
        <div className="flex items-center gap-1 text-center">
          <div className="flex items-center gap-1">
            <Image
              src="/nvg.svg"
              alt="Navigate Logo"
              width={16}
              height={16}
              className="dark:invert"
            />
            <AnimatedShinyText className="text-xs">
              Built by{" "}
              <Link 
                href="https://x.com/navigate_ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold text-[#FF5F1F] hover:text-[#FF5F1F]/80"
              >
                Navigate
              </Link>
            </AnimatedShinyText>
          </div>
          <span className="mx-1 text-gray-400">-</span>
          <AnimatedShinyText className="text-xs">
            the data marketplace for AI Agents built on Base
          </AnimatedShinyText>
        </div>
      </div>
    </footer>
  )
} 
