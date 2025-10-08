"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Briefcase, DollarSign, Star, TrendingUp, Sparkles, Download, Share2, Copy, Check } from "lucide-react"
import { useEffect, useState, useRef } from "react"

interface FortuneDisplayProps {
  zodiac: string
}

interface Fortune {
  overall: string
  love: { score: number; text: string }
  career: { score: number; text: string }
  wealth: { score: number; text: string }
  lucky: {
    color: string
    number: number
    direction: string
  }
}

export function FortuneDisplay({ zodiac }: FortuneDisplayProps) {
  const [fortune, setFortune] = useState<Fortune | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fortuneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchFortune = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/fortune?zodiac=${encodeURIComponent(zodiac)}`)

        if (!response.ok) {
          throw new Error("Failed to fetch fortune")
        }

        const data = await response.json()
        setFortune(data.fortune)
      } catch (err) {
        console.error("[v0] 获取运势失败:", err)
        setError("获取运势失败，请稍后重试")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFortune()
  }, [zodiac])

  const handleGenerateImage = async () => {
    if (!fortune) return

    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // 设置画布尺寸
      canvas.width = 1200
      canvas.height = 1600

      // 绘制背景
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#1a1625")
      gradient.addColorStop(0.5, "#2d1b4e")
      gradient.addColorStop(1, "#1a1625")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 绘制装饰星星
      ctx.fillStyle = "rgba(168, 85, 247, 0.3)"
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 3 + 1
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      let yOffset = 80

      // 绘制标题
      ctx.font = "bold 64px sans-serif"
      ctx.textAlign = "center"
      const titleGradient = ctx.createLinearGradient(0, yOffset, canvas.width, yOffset)
      titleGradient.addColorStop(0, "#a855f7")
      titleGradient.addColorStop(0.5, "#fbbf24")
      titleGradient.addColorStop(1, "#a855f7")
      ctx.fillStyle = titleGradient
      ctx.fillText(`${zodiac} 今日运势`, canvas.width / 2, yOffset)

      // 绘制日期
      yOffset += 60
      ctx.font = "24px sans-serif"
      ctx.fillStyle = "#a1a1aa"
      ctx.fillText(
        new Date().toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        }),
        canvas.width / 2,
        yOffset,
      )

      // 绘制综合运势卡片
      yOffset += 80
      ctx.fillStyle = "rgba(168, 85, 247, 0.2)"
      ctx.fillRect(60, yOffset, canvas.width - 120, 200)
      ctx.strokeStyle = "rgba(168, 85, 247, 0.5)"
      ctx.lineWidth = 2
      ctx.strokeRect(60, yOffset, canvas.width - 120, 200)

      ctx.font = "bold 32px sans-serif"
      ctx.fillStyle = "#fafafa"
      ctx.textAlign = "left"
      ctx.fillText("综合运势", 100, yOffset + 50)

      ctx.font = "24px sans-serif"
      ctx.fillStyle = "#e4e4e7"
      const maxWidth = canvas.width - 200
      const lines = wrapText(ctx, fortune.overall, maxWidth)
      lines.forEach((line, index) => {
        ctx.fillText(line, 100, yOffset + 100 + index * 35)
      })

      // 绘制三个运势指标
      yOffset += 280
      const metrics = [
        { icon: "♥", label: "爱情运势", score: fortune.love.score, text: fortune.love.text, color: "#a855f7" },
        { icon: "💼", label: "事业运势", score: fortune.career.score, text: fortune.career.text, color: "#a855f7" },
        { icon: "$", label: "财运", score: fortune.wealth.score, text: fortune.wealth.text, color: "#fbbf24" },
      ]

      const cardWidth = 340
      const cardHeight = 240
      const gap = 30
      const startX = (canvas.width - cardWidth * 3 - gap * 2) / 2

      metrics.forEach((metric, index) => {
        const x = startX + index * (cardWidth + gap)
        const y = yOffset

        // 绘制卡片背景
        ctx.fillStyle = "rgba(39, 39, 42, 0.8)"
        ctx.fillRect(x, y, cardWidth, cardHeight)
        ctx.strokeStyle = "rgba(63, 63, 70, 1)"
        ctx.lineWidth = 1
        ctx.strokeRect(x, y, cardWidth, cardHeight)

        // 绘制图标和标题
        ctx.font = "32px sans-serif"
        ctx.fillStyle = metric.color
        ctx.textAlign = "left"
        ctx.fillText(metric.icon, x + 20, y + 50)

        ctx.font = "bold 24px sans-serif"
        ctx.fillStyle = "#fafafa"
        ctx.fillText(metric.label, x + 70, y + 50)

        // 绘制进度条
        const barY = y + 80
        const barWidth = cardWidth - 100
        ctx.fillStyle = "rgba(63, 63, 70, 1)"
        ctx.fillRect(x + 20, barY, barWidth, 12)

        const progressGradient = ctx.createLinearGradient(x + 20, barY, x + 20 + barWidth, barY)
        progressGradient.addColorStop(0, metric.color)
        progressGradient.addColorStop(1, "#fbbf24")
        ctx.fillStyle = progressGradient
        ctx.fillRect(x + 20, barY, (barWidth * metric.score) / 100, 12)

        // 绘制分数
        ctx.font = "bold 28px sans-serif"
        ctx.fillStyle = metric.color
        ctx.textAlign = "right"
        ctx.fillText(metric.score.toString(), x + cardWidth - 20, barY + 10)

        // 绘制描述文本
        ctx.font = "18px sans-serif"
        ctx.fillStyle = "#a1a1aa"
        ctx.textAlign = "left"
        const textLines = wrapText(ctx, metric.text, cardWidth - 40)
        textLines.slice(0, 3).forEach((line, lineIndex) => {
          ctx.fillText(line, x + 20, barY + 50 + lineIndex * 28)
        })
      })

      // 绘制幸运元素
      yOffset += cardHeight + 80
      ctx.fillStyle = "rgba(39, 39, 42, 0.8)"
      ctx.fillRect(60, yOffset, canvas.width - 120, 200)
      ctx.strokeStyle = "rgba(63, 63, 70, 1)"
      ctx.lineWidth = 1
      ctx.strokeRect(60, yOffset, canvas.width - 120, 200)

      ctx.font = "bold 28px sans-serif"
      ctx.fillStyle = "#fafafa"
      ctx.textAlign = "left"
      ctx.fillText("幸运元素", 100, yOffset + 50)

      const luckyItems = [
        { label: "幸运颜色", value: fortune.lucky.color },
        { label: "幸运数字", value: fortune.lucky.number.toString() },
        { label: "幸运方位", value: fortune.lucky.direction },
      ]

      const itemWidth = (canvas.width - 200) / 3
      luckyItems.forEach((item, index) => {
        const x = 100 + index * itemWidth
        const y = yOffset + 100

        ctx.font = "20px sans-serif"
        ctx.fillStyle = "#a1a1aa"
        ctx.textAlign = "center"
        ctx.fillText(item.label, x + itemWidth / 2, y)

        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#fbbf24"
        ctx.fillText(item.value, x + itemWidth / 2, y + 50)
      })

      // 下载图片
      const link = document.createElement("a")
      link.download = `${zodiac}-运势-${new Date().toLocaleDateString()}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("[v0] 生成签图失败:", error)
      alert("生成签图失败，请稍后重试")
    }
  }

  const handleCopyText = async () => {
    if (!fortune) return

    const text = `${zodiac} 今日运势 (${new Date().toLocaleDateString("zh-CN")})

综合运势：${fortune.overall}

爱情运势 (${fortune.love.score}分)：${fortune.love.text}

事业运势 (${fortune.career.score}分)：${fortune.career.text}

财运 (${fortune.wealth.score}分)：${fortune.wealth.text}

幸运元素：
- 幸运颜色：${fortune.lucky.color}
- 幸运数字：${fortune.lucky.number}
- 幸运方位：${fortune.lucky.direction}

来自：星座运势计算器`

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error("[v0] 复制失败:", error)
    }
  }

  const handleShare = async () => {
    if (!fortune) return

    const shareData = {
      title: `${zodiac} 今日运势`,
      text: `${fortune.overall}\n\n来自：星座运势计算器`,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert("链接已复制到剪贴板")
      }
    } catch (error) {
      console.error("[v0] 分享失败:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-12 bg-card/80 backdrop-blur-sm border-primary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 animate-pulse" />
          <div className="relative flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <div className="relative">
              <Star className="w-12 h-12 text-primary animate-spin" />
              <Sparkles className="w-6 h-6 text-accent absolute top-0 right-0 animate-pulse" />
            </div>
            <p className="text-lg font-medium">正在为你解读星象...</p>
            <p className="text-sm text-muted-foreground/60">请稍候片刻</p>
          </div>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-12 bg-card/80 backdrop-blur-sm border-destructive/30 relative overflow-hidden">
          <div className="relative flex flex-col items-center justify-center gap-4 text-destructive">
            <Star className="w-12 h-12" />
            <p className="text-lg font-medium">{error}</p>
          </div>
        </Card>
      </div>
    )
  }

  if (!fortune) return null

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div
        ref={fortuneRef}
        data-fortune-content
        className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
      >
        <div className="text-center space-y-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-xl" />
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent relative">
            {zodiac} 今日运势
          </h3>
          <p className="text-muted-foreground text-lg relative">
            {new Date().toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </p>
        </div>

        <Card className="p-8 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 border-primary/30 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-accent/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-start gap-5">
            <div className="p-4 rounded-full bg-primary/30 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
              <Star className="w-8 h-8 text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-semibold mb-3 text-card-foreground">综合运势</h4>
              <p className="text-card-foreground/90 leading-relaxed text-lg">{fortune.overall}</p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 group">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-colors">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg text-card-foreground">爱情运势</h4>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                      style={{ width: `${fortune.love.score}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold text-primary min-w-[3ch]">{fortune.love.score}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{fortune.love.text}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 group">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-colors">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg text-card-foreground">事业运势</h4>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                      style={{ width: `${fortune.career.score}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold text-primary min-w-[3ch]">{fortune.career.score}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{fortune.career.text}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border hover:border-accent/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20 group">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 group-hover:from-accent/30 group-hover:to-accent/20 transition-colors">
                  <DollarSign className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-semibold text-lg text-card-foreground">财运</h4>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-yellow-500 transition-all duration-1000 ease-out"
                      style={{ width: `${fortune.wealth.score}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold text-accent min-w-[3ch]">{fortune.wealth.score}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{fortune.wealth.text}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-card/80 backdrop-blur-sm border-border hover:border-accent/50 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold text-xl text-card-foreground">幸运元素</h4>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center space-y-3 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent hover:from-primary/20 transition-colors">
                <p className="text-sm text-muted-foreground font-medium">幸运颜色</p>
                <p className="text-2xl font-bold text-accent">{fortune.lucky.color}</p>
              </div>
              <div className="text-center space-y-3 p-4 rounded-xl bg-gradient-to-br from-accent/10 to-transparent hover:from-accent/20 transition-colors">
                <p className="text-sm text-muted-foreground font-medium">幸运数字</p>
                <p className="text-2xl font-bold text-accent">{fortune.lucky.number}</p>
              </div>
              <div className="text-center space-y-3 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent hover:from-primary/20 transition-colors">
                <p className="text-sm text-muted-foreground font-medium">幸运方位</p>
                <p className="text-2xl font-bold text-accent">{fortune.lucky.direction}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Button
          onClick={handleGenerateImage}
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-all duration-300 group"
        >
          <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
          生成星座签图
        </Button>

        <Button
          onClick={handleCopyText}
          variant="outline"
          className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300 group bg-card/50 text-foreground hover:text-foreground"
        >
          {isCopied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-500" />
              已复制
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              复制运势文本
            </>
          )}
        </Button>

        <Button
          onClick={handleShare}
          variant="outline"
          className="border-accent/50 hover:bg-accent/10 hover:border-accent transition-all duration-300 group bg-card/50 text-foreground hover:text-foreground"
        >
          <Share2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
          分享运势
        </Button>
      </div>
    </div>
  )
}

// 文本换行辅助函数
const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
  const words = text.split("")
  const lines: string[] = []
  let currentLine = ""

  for (const char of words) {
    const testLine = currentLine + char
    const metrics = ctx.measureText(testLine)

    if (metrics.width > maxWidth && currentLine.length > 0) {
      lines.push(currentLine)
      currentLine = char
    } else {
      currentLine = testLine
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine)
  }

  return lines
}
