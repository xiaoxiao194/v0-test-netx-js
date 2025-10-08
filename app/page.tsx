"use client"

import { useState, useEffect } from "react"
import { ZodiacSelector } from "@/components/zodiac-selector"
import { FortuneDisplay } from "@/components/fortune-display"
import { StarfieldBackground } from "@/components/starfield-background"
import { Sparkles, Moon, Stars } from "lucide-react"

export default function Home() {
  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null)
  const [showDailyUpdate, setShowDailyUpdate] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (typeof window !== "undefined") {
      const savedZodiac = localStorage.getItem("selectedZodiac")
      if (savedZodiac) {
        setSelectedZodiac(savedZodiac)
      }

      const lastUpdate = localStorage.getItem("lastUpdate")
      const today = new Date().toDateString()
      if (lastUpdate !== today) {
        setShowDailyUpdate(true)
        localStorage.setItem("lastUpdate", today)
        setTimeout(() => setShowDailyUpdate(false), 3000)
      }
    }
  }, [])

  const handleSelectZodiac = (zodiac: string) => {
    setSelectedZodiac(zodiac)
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedZodiac", zodiac)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <StarfieldBackground />

      {showDailyUpdate && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-500">
          <div className="px-6 py-3 rounded-full bg-primary/90 backdrop-blur-md border border-primary/50 shadow-2xl shadow-primary/50 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span className="text-white font-medium">今日运势已更新</span>
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <header className="border-b border-border/40 backdrop-blur-md bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Moon className="w-7 h-7 text-accent" />
              <Sparkles className="w-3 h-3 text-primary absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              星座运势
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground hidden sm:flex">
            <Stars className="w-4 h-4" />
            <p>探索你的星座奥秘</p>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 md:py-20 lg:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-4 md:mb-6 backdrop-blur-sm hover:bg-primary/30 hover:scale-105 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer group">
            <Sparkles className="w-4 h-4 animate-pulse group-hover:rotate-180 transition-transform duration-500" />
            <span>每日更新运势预测</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-balance leading-tight">
            <span
              className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow"
              style={{
                textShadow:
                  "0 0 20px rgba(168, 85, 247, 0.6), 0 0 40px rgba(168, 85, 247, 0.4), 0 0 60px rgba(168, 85, 247, 0.3)",
              }}
            >
              发现你的星座运势
            </span>
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed px-4">
            选择你的星座，获取今日专属运势预测
            <br />
            <span className="text-primary/80">包括爱情、事业、财运等多维度指引</span>
          </p>

          <div className="flex items-center justify-center gap-6 md:gap-8 pt-4">
            {["✨", "🌙", "⭐", "💫"].map((emoji, i) => (
              <span
                key={i}
                className="text-2xl md:text-3xl opacity-60 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer"
                style={{
                  animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12 md:pb-16 relative z-10">
        <ZodiacSelector selectedZodiac={selectedZodiac} onSelectZodiac={handleSelectZodiac} />
      </section>

      {selectedZodiac && (
        <section className="container mx-auto px-4 pb-16 md:pb-24 relative z-10">
          <FortuneDisplay zodiac={selectedZodiac} />
        </section>
      )}

      <footer className="border-t border-border/40 mt-auto backdrop-blur-md bg-background/50 relative z-10">
        <div className="container mx-auto px-4 py-6 md:py-8 text-center space-y-2 md:space-y-3">
          <p className="text-sm text-muted-foreground">© 2025 星座运势计算器 · 仅供娱乐参考</p>
          <p className="text-xs text-muted-foreground/60">愿星辰指引你的方向 ✨</p>
          <p className="text-xs text-muted-foreground/40 mt-2">Built with v0 & Next.js</p>
        </div>
      </footer>
    </main>
  )
}
