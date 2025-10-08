import { type NextRequest, NextResponse } from "next/server"

// 星座运势数据生成器
// 注意：这是模拟数据，实际使用时可以替换为真实的第三方API调用
// 例如：天行数据 API、RapidAPI Horoscope 等

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

const zodiacData: Record<string, Fortune> = {
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

// 根据日期生成随机但稳定的运势变化
function generateDailyVariation(zodiac: string, date: string): Fortune {
  const baseData = zodiacData[zodiac]
  if (!baseData) {
    throw new Error("Invalid zodiac sign")
  }

  // 使用日期作为种子生成稳定的随机数
  const seed = date.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const random = (min: number, max: number, offset: number) => {
    const value = ((seed + offset) % (max - min + 1)) + min
    return value
  }

  // 每天的运势分数会有小幅波动
  const loveVariation = random(-5, 5, 1)
  const careerVariation = random(-5, 5, 2)
  const wealthVariation = random(-5, 5, 3)

  return {
    ...baseData,
    love: {
      ...baseData.love,
      score: Math.max(0, Math.min(100, baseData.love.score + loveVariation)),
    },
    career: {
      ...baseData.career,
      score: Math.max(0, Math.min(100, baseData.career.score + careerVariation)),
    },
    wealth: {
      ...baseData.wealth,
      score: Math.max(0, Math.min(100, baseData.wealth.score + wealthVariation)),
    },
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const zodiac = searchParams.get("zodiac")

    if (!zodiac) {
      return NextResponse.json({ error: "Missing zodiac parameter" }, { status: 400 })
    }

    if (!zodiacData[zodiac]) {
      return NextResponse.json({ error: "Invalid zodiac sign" }, { status: 400 })
    }

    // 获取今天的日期作为缓存键
    const today = new Date().toDateString()

    // 生成今日运势（带有每日变化）
    const fortune = generateDailyVariation(zodiac, today)

    // 添加缓存头，每天更新一次
    return NextResponse.json(
      { zodiac, date: today, fortune },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    )
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// 如果要接入真实的第三方API，可以使用以下模板：
/*
async function fetchFromThirdPartyAPI(zodiac: string) {
  const apiKey = process.env.HOROSCOPE_API_KEY
  const response = await fetch(`https://api.example.com/horoscope?sign=${zodiac}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  })
  return response.json()
}
*/
