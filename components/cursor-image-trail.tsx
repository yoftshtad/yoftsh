'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

type TrailImage = {
  id: number
  src: string
  x: number
  y: number
  targetX: number
  targetY: number
  rotate: number
}

const heroImages = [
  '/hero-images/cod.png',
  '/hero-images/Noir.png',
]

export function CursorImageTrail() {
  const [images, setImages] = useState<TrailImage[]>([])
  const nextImage = useRef(0)
  const lastPoint = useRef({ x: 0, y: 0 })
  const lastSpawn = useRef(0)
  const frame = useRef<number | null>(null)
  const removeTimers = useRef<number[]>([])

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    if (!media.matches) return

    const hero = document.querySelector<HTMLElement>('[data-hero-trail]')
    if (!hero) return

    const moveImages = () => {
      setImages((current) => current.map((image) => ({
        ...image,
        x: image.x + (image.targetX - image.x) * 0.12,
        y: image.y + (image.targetY - image.y) * 0.12,
      })))
      frame.current = requestAnimationFrame(moveImages)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect()
      if (event.clientY < bounds.top || event.clientY > bounds.bottom) return

      const x = event.clientX
      const y = event.clientY - bounds.top
      const distance = Math.hypot(event.clientX - lastPoint.current.x, event.clientY - lastPoint.current.y)
      const now = performance.now()

      if (distance < 70 || now - lastSpawn.current < 180) return

      const id = now
      const image: TrailImage = {
        id,
        src: heroImages[nextImage.current % heroImages.length],
        x,
        y,
        targetX: x,
        targetY: y,
        rotate: ((nextImage.current++ % 5) - 2) * 1.25,
      }

      setImages((current) => [...current.slice(-4), image])
      removeTimers.current.push(window.setTimeout(() => {
        setImages((current) => current.filter((item) => item.id !== id))
      }, 1250))
      lastPoint.current = { x: event.clientX, y: event.clientY }
      lastSpawn.current = now
    }

    frame.current = requestAnimationFrame(moveImages)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (frame.current) cancelAnimationFrame(frame.current)
      removeTimers.current.forEach((timer) => window.clearTimeout(timer))
      removeTimers.current = []
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block">
      {images.map((image) => (
        <img
          key={image.id}
          src={image.src}
          alt=""
          className="cursor-image-trail absolute h-[210px] w-[240px] rounded-[6px] object-cover"
          style={{
            left: image.x,
            top: image.y,
            marginLeft: '-120px',
            marginTop: '-105px',
            '--trail-rotation': `${image.rotate}deg`,
          } as CSSProperties}
        />
      ))}
    </div>
  )
}
