import { useEffect, useState } from 'react'
import { useMergedT, useSiteConfig } from '../i18n'

const ICONS = {
  chat: 'M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm3 6a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 7 10zm5 0a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 12 10zm5 0a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 17 10z',
  phone: 'M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z',
  messenger: 'M12 2C6.48 2 2 6.15 2 11.27c0 2.92 1.46 5.52 3.74 7.22V22l3.42-1.88c.91.25 1.87.38 2.84.38 5.52 0 10-4.15 10-9.23S17.52 2 12 2zm.99 12.47-2.55-2.72-4.98 2.72 5.48-5.82 2.62 2.72 4.92-2.72-5.49 5.82z',
  zalo: 'M5.21 6.05h7.64v1.72L8.1 13.84h4.91v2.11H5v-1.72l4.74-6.07H5.21V6.05zm9.01 3.3c.56-.48 1.27-.72 2.14-.72 1.91 0 3.19 1.43 3.19 3.72v3.6h-2.21v-.7c-.47.57-1.11.86-1.91.86-1.49 0-2.52-.91-2.52-2.24 0-1.44 1.1-2.27 3.08-2.27h1.35v-.13c0-.62-.42-.97-1.16-.97-.61 0-1.13.23-1.66.68l-.3-1.83zm3.12 3.62h-1.08c-.75 0-1.14.27-1.14.77 0 .46.35.72.92.72.75 0 1.3-.5 1.3-1.21v-.28z',
}

function findSocial(socials, names) {
  return socials.find((social) =>
    names.some((name) => String(social.name).toLowerCase().includes(name)),
  )?.href
}

export default function StickyContact() {
  const [open, setOpen] = useState(false)
  const t = useMergedT()
  const { socials = [] } = useSiteConfig()
  const phone = String(t.contact.phone || '0908 050 527')
  const phoneDigits = phone.replace(/\D/g, '')
  const messenger = findSocial(socials, ['messenger']) || 'https://m.me/mincreative'
  const zalo = findSocial(socials, ['zalo']) || `https://zalo.me/${phoneDigits}`

  const contacts = [
    { type: 'messenger', label: 'Messenger', href: messenger, external: true },
    { type: 'zalo', label: 'Zalo', href: zalo, external: true },
    { type: 'phone', label: 'Gọi ngay', href: `tel:${phoneDigits}` },
  ]

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <aside className={`sticky-contact ${open ? 'is-expanded' : ''}`} aria-label="Liên hệ nhanh">
      {contacts.map((contact) => (
        <a
          key={contact.type}
          className={`sticky-contact-link is-${contact.type}`}
          href={contact.href}
          aria-label={contact.label}
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          {...(contact.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <span className="sticky-contact-label">{contact.label}</span>
          <span className="sticky-contact-icon" aria-hidden="true">
            {contact.type === 'zalo' ? (
              <span className="zalo-wordmark">Zalo</span>
            ) : (
              <svg viewBox="0 0 24 24">
                <path fill="currentColor" d={ICONS[contact.type]} />
              </svg>
            )}
          </span>
        </a>
      ))}
      <button
        type="button"
        className="sticky-contact-trigger"
        aria-label={open ? 'Đóng liên hệ nhanh' : 'Mở liên hệ nhanh'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <svg className="contact-chat-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d={ICONS.chat} />
        </svg>
        <span className="contact-close-icon" aria-hidden="true" />
      </button>
    </aside>
  )
}
