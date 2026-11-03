import { useMergedT } from '../i18n'
import heroImg from '../assets/portfolio/optimized/beauty-1.jpg'

export default function Hero() {
  const t = useMergedT()
  const doubled = [...t.clients, ...t.clients]
  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <p className="kicker">{t.hero.kicker}</p>
        <h1 className="hero-title">{t.hero.title}</h1>
        <p className="hero-sub">{t.hero.subtitle}</p>
        <div className="hero-actions">
          <a href="#services" className="btn btn-primary">
            {t.hero.ctaPrimary}
          </a>
          <a href="#contact" className="btn btn-ghost">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>

      <div className="hero-figure">
        <div className="hero-img">
          <img src={heroImg} alt="" />
        </div>
        <p className="scroll-hint">
          {t.hero.scroll} <span className="scroll-line" />
        </p>
      </div>

      <div className="clients-strip">
        <p className="clients-label">{t.hero.clients_label}</p>
        <div className="clients-marquee">
          <div className="clients-track">
            {doubled.map((c, i) => (
              <span className="client-chip" key={`${c}-${i}`}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
