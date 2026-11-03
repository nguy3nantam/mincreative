import { useEffect } from 'react'
import { useSiteConfig } from '../i18n'

export default function FaviconSync() {
  const favicon = useSiteConfig().branding.favicon

  useEffect(() => {
    if (!favicon) return
    let link = document.querySelector('link[rel="icon"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = favicon
  }, [favicon])

  return null
}