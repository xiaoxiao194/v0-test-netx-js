"use client"

import { Card } from "@/components/ui/card"
import { Heart, Briefcase, DollarSign, Star, TrendingUp, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

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

const fortunes: Record<string, Fortune> = {
  白羊座: {
    overall: "今天是充满活力的一天！你的热情会感染周围的人，适合主动出击，把握机会。",
    love: { score: 85, text: "感情运势旺盛，单身者有机会遇到心仪对象，恋爱中的人感情升温。" },
    career: { score: 78, text: "工作上会有新的挑战，但你的积极态度会帮助你克服困难。" },
    wealth: { score: 72, text: "财运平稳，适合做长期投资规划，避免冲动消费。" },
    lucky: { color: "红色", number: 7, direction: "东方" },
  },
  金牛座: {
    overall: "稳扎稳打的一天，坚持你的计划会带来意想不到的收获。",
    love: { score: 75, text: "感情需要更多耐心经营，真诚的沟通能增进彼此了解。" },
    career: { score: 88, text: "工作效率高，你的专业能力会得到认可，可能有晋升机会。" },
    wealth: { score: 90, text: "财运极佳，投资理财都有不错的回报，但要谨慎选择。" },
    lucky: { color: "绿色", number: 5, direction: "西方" },
  },
  双子座: {
    overall: "思维活跃，灵感不断，适合创意工作和社交活动。",
    love: { score: 80, text: "魅力四射，社交场合容易吸引异性目光，把握机会。" },
    career: { score: 82, text: "沟通能力出众，团队合作顺利，创意想法受到重视。" },
    wealth: { score: 68, text: "财运一般，避免因一时冲动而做出错误的财务决策。" },
    lucky: { color: "黄色", number: 3, direction: "南方" },
  },
  巨蟹座: {
    overall: "情感丰富的一天，关注内心感受，与家人朋友共度美好时光。",
    love: { score: 92, text: "感情运势极佳，温柔体贴的你会让对方感到幸福满满。" },
    career: { score: 70, text: "工作中需要更多主动性，不要过于依赖他人的帮助。" },
    wealth: { score: 75, text: "财运稳定，适合储蓄和家庭理财规划。" },
    lucky: { color: "银色", number: 2, direction: "北方" },
  },
  狮子座: {
    overall: "自信满满的一天，你的领导力会得到充分展现。",
    love: { score: 77, text: "感情中需要更多倾听，不要过于强势，给对方表达的空间。" },
    career: { score: 95, text: "事业运势极佳，你的才华会被看见，适合展示自己。" },
    wealth: { score: 80, text: "财运不错，但要注意控制开支，避免过度消费。" },
    lucky: { color: "金色", number: 1, direction: "东南" },
  },
  处女座: {
    overall: "注重细节的一天，你的认真态度会带来好结果。",
    love: { score: 73, text: "感情中不要过于挑剔，学会欣赏对方的优点。" },
    career: { score: 90, text: "工作表现出色，细致的工作态度让你脱颖而出。" },
    wealth: { score: 85, text: "理财规划得当，精打细算会让你的财富稳步增长。" },
    lucky: { color: "米色", number: 6, direction: "西南" },
  },
  天秤座: {
    overall: "平衡和谐的一天，你的优雅气质会吸引好运。",
    love: { score: 88, text: "感情运势旺盛，你的魅力无法抵挡，浪漫邂逅在等着你。" },
    career: { score: 76, text: "工作中需要做出重要决定，相信自己的判断。" },
    wealth: { score: 78, text: "财运平稳，适合与他人合作投资，但要谨慎选择伙伴。" },
    lucky: { color: "粉色", number: 4, direction: "东北" },
  },
  天蝎座: {
    overall: "直觉敏锐的一天，相信你的第六感会带来好运。",
    love: { score: 90, text: "感情深刻而热烈，真诚的表达会让关系更进一步。" },
    career: { score: 85, text: "洞察力强，能发现别人注意不到的机会和问题。" },
    wealth: { score: 82, text: "财运不错，投资眼光独到，但要控制风险。" },
    lucky: { color: "深紫色", number: 8, direction: "西北" },
  },
  射手座: {
    overall: "充满冒险精神的一天，勇敢尝试新事物会带来惊喜。",
    love: { score: 79, text: "感情中需要更多承诺，不要过于追求自由而忽略对方感受。" },
    career: { score: 83, text: "工作中会有新的机会，勇于接受挑战会有好结果。" },
    wealth: { score: 70, text: "财运一般，避免高风险投资，稳健为上。" },
    lucky: { color: "紫色", number: 9, direction: "南方" },
  },
  摩羯座: {
    overall: "脚踏实地的一天，你的努力会得到应有的回报。",
    love: { score: 72, text: "感情需要更多时间经营，不要因为工作而忽略另一半。" },
    career: { score: 93, text: "事业运势极佳，你的专业和责任心会带来重大突破。" },
    wealth: { score: 88, text: "财运旺盛，长期投资会有丰厚回报。" },
    lucky: { color: "黑色", number: 10, direction: "北方" },
  },
  水瓶座: {
    overall: "创新思维活跃，你的独特想法会得到认可。",
    love: { score: 76, text: "感情中需要更多情感交流，不要过于理性而忽略感受。" },
    career: { score: 87, text: "创意工作表现出色，你的前瞻性思维会带来新机遇。" },
    wealth: { score: 74, text: "财运平稳，可以尝试新型投资方式，但要做好功课。" },
    lucky: { color: "蓝色", number: 11, direction: "东方" },
  },
  双鱼座: {
    overall: "充满想象力的一天，艺术和创作会带来灵感。",
    love: { score: 94, text: "感情运势极佳，浪漫温柔的你会让对方深深着迷。" },
    career: { score: 71, text: "工作中需要更多实际行动，不要只停留在想象阶段。" },
    wealth: { score: 69, text: "财运一般，避免感性消费，理性规划财务。" },
    lucky: { color: "海蓝色", number: 12, direction: "西方" },
  },
}

export function FortuneDisplay({ zodiac }: FortuneDisplayProps) {
  const [fortune, setFortune] = useState<Fortune | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setFortune(fortunes[zodiac])
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [zodiac])

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

  if (!fortune) return null

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
  )
}
