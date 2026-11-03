import { useEffect, useState } from 'react'
import { useLanguage, useSiteConfig } from '../i18n'

function Logo() {
  const { logo } = useSiteConfig().branding
  if (logo) {
    return (
      <a href="#home" className="logo">
        <img className="logo-img" src={logo} alt="Min Creative" />
      </a>
    )
  }
  return (
    <a href="#home" className="logo">
      <span className="logo-mark">
        <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
          <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="7" fill="currentColor" />
        </svg>
      </span>
      <span className="logo-text">
        Min<span>Creative</span>
      </span>
    </a>
  )
}

export default function Header() {
  const { lang, setLang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth > 640) setOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const links = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#gallery', label: t.nav.work },
    { href: '#clients', label: t.nav.clients },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`}>
      <div className="header-inner">
        <Logo />
        <button
          type="button"
          className={`menu-backdrop ${open ? 'is-visible' : ''}`}
          aria-label="Đóng menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />
        <nav id="site-navigation" className={`nav ${open ? 'is-open' : ''}`} aria-label="Điều hướng chính">
          {links.map((l, index) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              <span className="nav-index" aria-hidden="true">0{index + 1}</span>
              {l.label}
            </a>
          ))}
          <div className="nav-lang nav-lang--inline">
            <LangToggle lang={lang} setLang={setLang} />
          </div>
        </nav>
        <div className="header-right">
          <div className="lang-toggle">
            <LangToggle lang={lang} setLang={setLang} />
          </div>
          <button
            type="button"
            className="menu-toggle"
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={open}
            aria-controls="site-navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

function LangToggle({ lang, setLang }) {
  return (
    <div className="lang-switch">
      <button
        type="button"
        className={lang === 'vi' ? 'active' : ''}
        onClick={() => setLang('vi')}
        aria-pressed={lang === 'vi'}
      >
        VI
      </button>
      <span>/</span>
      <button
        type="button"
        className={lang === 'en' ? 'active' : ''}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  )
}
