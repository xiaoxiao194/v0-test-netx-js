"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const zodiacs = [
  { name: "白羊座", icon: "♈", dates: "3/21 - 4/19", element: "fire", color: "from-red-500/20 to-orange-500/20" },
  { name: "金牛座", icon: "♉", dates: "4/20 - 5/20", element: "earth", color: "from-green-500/20 to-emerald-500/20" },
  { name: "双子座", icon: "♊", dates: "5/21 - 6/21", element: "air", color: "from-yellow-500/20 to-amber-500/20" },
  { name: "巨蟹座", icon: "♋", dates: "6/22 - 7/22", element: "water", color: "from-blue-500/20 to-cyan-500/20" },
  { name: "狮子座", icon: "♌", dates: "7/23 - 8/22", element: "fire", color: "from-orange-500/20 to-yellow-500/20" },
  { name: "处女座", icon: "♍", dates: "8/23 - 9/22", element: "earth", color: "from-teal-500/20 to-green-500/20" },
  { name: "天秤座", icon: "♎", dates: "9/23 - 10/23", element: "air", color: "from-pink-500/20 to-rose-500/20" },
  {
    name: "天蝎座",
    icon: "♏",
    dates: "10/24 - 11/21",
    element: "water",
    color: "from-purple-500/20 to-violet-500/20",
  },
  { name: "射手座", icon: "♐", dates: "11/22 - 12/21", element: "fire", color: "from-indigo-500/20 to-purple-500/20" },
  { name: "摩羯座", icon: "♑", dates: "12/22 - 1/19", element: "earth", color: "from-slate-500/20 to-gray-500/20" },
  { name: "水瓶座", icon: "♒", dates: "1/20 - 2/18", element: "air", color: "from-cyan-500/20 to-blue-500/20" },
  { name: "双鱼座", icon: "♓", dates: "2/19 - 3/20", element: "water", color: "from-violet-500/20 to-purple-500/20" },
]

interface ZodiacSelectorProps {
  selectedZodiac: string | null
  onSelectZodiac: (zodiac: string) => void
}

export function ZodiacSelector({ selectedZodiac, onSelectZodiac }: ZodiacSelectorProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12 space-y-3">
        <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          选择你的星座
        </h3>
        <p className="text-muted-foreground">点击星座卡片查看今日运势</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {zodiacs.map((zodiac, index) => (
          <Card
            key={zodiac.name}
            className={cn(
              "relative cursor-pointer transition-all duration-500 hover:scale-110 hover:-translate-y-2",
              "bg-card/80 backdrop-blur-sm border-border hover:border-primary/50",
              "group overflow-hidden",
              selectedZodiac === zodiac.name && "border-primary bg-primary/10 shadow-2xl shadow-primary/30 scale-105",
            )}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
            onClick={() => onSelectZodiac(zodiac.name)}
          >
            {/* 背景渐变 */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                zodiac.color,
              )}
            />

            {/* 光晕效果 */}
            {selectedZodiac === zodiac.name && <div className="absolute inset-0 bg-primary/5 animate-pulse" />}

            <div className="relative p-6 flex flex-col items-center gap-3">
              <div
                className={cn(
                  "text-5xl md:text-6xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-12",
                  selectedZodiac === zodiac.name && "scale-125 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]",
                )}
              >
                {zodiac.icon}
              </div>

              <div className="text-center space-y-1">
                <h4 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {zodiac.name}
                </h4>
                <p className="text-xs text-muted-foreground">{zodiac.dates}</p>
              </div>

              {/* 选中指示器 */}
              {selectedZodiac === zodiac.name && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-xs">✓</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
