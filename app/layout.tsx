import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "星座运势计算器 - 每日星座运势预测",
  description:
    "专业的星座运势计算器，提供12星座每日运势预测，包括爱情、事业、财运等多维度指引。选择你的星座，获取今日专属运势预测。",
  keywords: ["星座运势", "星座预测", "每日运势", "星座计算器", "占星", "12星座", "运势查询"],
  authors: [{ name: "星座运势计算器" }],
  creator: "v0 & Next.js",
  publisher: "星座运势计算器",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://your-domain.com",
    title: "星座运势计算器 - 每日星座运势预测",
    description: "专业的星座运势计算器，提供12星座每日运势预测，包括爱情、事业、财运等多维度指引。",
    siteName: "星座运势计算器",
  },
  twitter: {
    card: "summary_large_image",
    title: "星座运势计算器 - 每日星座运势预测",
    description: "专业的星座运势计算器，提供12星座每日运势预测，包括爱情、事业、财运等多维度指引。",
  },
  alternates: {
    canonical: "https://your-domain.com",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#a855f7" },
    { media: "(prefers-color-scheme: dark)", color: "#a855f7" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
