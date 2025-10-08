"use client"

import { useEffect, useRef, useState } from "react"

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 设置画布大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // 星星粒子类
    class Star {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      fadeSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random()
        this.fadeSpeed = (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1)
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.opacity += this.fadeSpeed

        // 边界检测
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1

        // 透明度循环
        if (this.opacity <= 0 || this.opacity >= 1) {
          this.fadeSpeed *= -1
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity * 0.6})`
        ctx.fill()

        // 添加光晕
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
        gradient.addColorStop(0, `rgba(168, 85, 247, ${this.opacity * 0.3})`)
        gradient.addColorStop(1, "rgba(168, 85, 247, 0)")
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const stars: Star[] = []
    const starCount = isMobile
      ? Math.min(50, Math.floor((canvas.width * canvas.height) / 15000))
      : Math.min(100, Math.floor((canvas.width * canvas.height) / 10000))

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star())
    }

    // 动画循环
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        star.update()
        star.draw()
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [isMobile])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
