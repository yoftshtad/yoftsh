'use client'

import { useEffect, useState } from 'react'

export function SiteFooter() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      setTime(new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(new Date()))
    }

    updateTime()
    const interval = window.setInterval(updateTime, 30_000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <footer className="mx-auto flex max-w-[1430px] flex-col items-center justify-between gap-5 border-t border-foreground/50 px-6 py-8 text-[17px] font-medium sm:flex-row">
      <span>© 2026 Yoftahe Tadele</span>
      <span aria-label="Current local time">{time || '—'}</span>
      <span className="flex items-center gap-3"><span className="size-3 rounded-full bg-lime-400 shadow-[0_0_0_4px_rgba(163,230,53,0.18)]" aria-hidden="true" />Available for Work</span>
    </footer>
  )
}
