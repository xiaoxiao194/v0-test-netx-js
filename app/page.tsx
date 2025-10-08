"use client"

import { useState } from "react"
import { ZodiacSelector } from "@/components/zodiac-selector"
import { FortuneDisplay } from "@/components/fortune-display"
import { Sparkles, Moon, Stars } from "lucide-react"

export default function Home() {
  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        {/* 渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />

        {/* 星星效果 */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* 大光晕 */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <header className="border-b border-border/40 backdrop-blur-md bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Moon className="w-7 h-7 text-accent" />
              <Sparkles className="w-3 h-3 text-primary absolute -top-1 -right-1" />
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

      <section className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>每日更新运势预测</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              发现你的
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              星座运势
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
            选择你的星座，获取今日专属运势预测
            <br />
            <span className="text-primary/80">包括爱情、事业、财运等多维度指引</span>
          </p>

          <div className="flex items-center justify-center gap-8 pt-4">
            {["✨", "🌙", "⭐", "💫"].map((emoji, i) => (
              <span
                key={i}
                className="text-3xl opacity-60"
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

      {/* Zodiac Selector */}
      <section className="container mx-auto px-4 pb-16 relative z-10">
        <ZodiacSelector selectedZodiac={selectedZodiac} onSelectZodiac={setSelectedZodiac} />
      </section>

      {/* Fortune Display */}
      {selectedZodiac && (
        <section className="container mx-auto px-4 pb-24 relative z-10">
          <FortuneDisplay zodiac={selectedZodiac} />
        </section>
      )}

      <footer className="border-t border-border/40 mt-auto backdrop-blur-md bg-background/50 relative z-10">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">© 2025 星座运势计算器 · 仅供娱乐参考</p>
          <p className="text-xs text-muted-foreground/60 mt-2">愿星辰指引你的方向 ✨</p>
        </div>
      </footer>
    </main>
  )
}
