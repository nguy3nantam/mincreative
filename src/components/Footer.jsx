import { useMergedT, useSiteConfig } from '../i18n'

const socials = [
  {
    name: 'Fanpage',
    href: 'https://facebook.com/mincreative',
    icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@mincreative',
    icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@mincreative',
    icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    name: 'Zalo',
    href: 'https://zalo.me/0908050527',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.3 12.7c-.6.6-1.5 1-2.5 1h-2.7l-1 2.1c-.2.4-.7.6-1.1.4-.4-.2-.6-.7-.4-1.1l.9-1.9c-.6-.7-.9-1.6-.9-2.5 0-2.3 1.8-4.2 4.2-4.2h.9c.6 0 1 .4 1 1v.6c0 1.5-.9 2.8-2.4 3.7 1.4.2 2.1.7 2.6 1.2 0 0-.1.5-.7.7 0 0-.1 0-.1-.1zm.5-1.9c-.1.3-.5.4-.8.2-.5-.4-1.3-.9-2.9-.9H11c-.6 0-.9-.4-.9-1 0-2.2 1.7-4 3.8-4 .6 0 1.1.5 1.1 1.1v3.7c.1.1.1.4 0 .6.3.1.5.2.8.3z',
  },
]

function iconFor(name) {
  const known = socials.find((s) => s.name.toLowerCase() === String(name).toLowerCase())
  return known ? known.icon : 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-2.9-.5-5-3.02-5-5.95a6.01 6.01 0 0 1 5-5.93V5.1a6 6 0 0 1 2.66 11.46c-.53.24-.9.74-.9 1.34v1.9a7.98 7.98 0 0 1-1.76.13z'
}

export default function Footer() {
  const t = useMergedT()
  const config = useSiteConfig()
  const defined =
    config.socials && config.socials.length > 0
      ? config.socials.filter((s) => s && s.name)
      : null
  const links = defined || socials
  const phone = t.contact.phone
  const email = t.contact.email
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <p className="footer-brand">Min<span>Creative</span></p>
          <p className="footer-tagline">{t.footer.tagline}</p>
        </div>

        <div className="footer-col">
          <h4>{t.footer.quickLinks}</h4>
          <ul className="footer-links">
            {t.footer.nav.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t.footer.contactLabel}</h4>
          <ul className="footer-links">
            <li>
              <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
            </li>
            <li>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t.footer.socialLabel}</h4>
          <div className="footer-socials">
            {links.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={s.name}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path fill="currentColor" d={iconFor(s.name)} />
                </svg>
                <span>{s.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Min Creative. {t.footer.rights}.</span>
        <a href="#home" className="back-top">
          ↑ {t.footer.backToTop}
        </a>
      </div>
    </footer>
  )
}