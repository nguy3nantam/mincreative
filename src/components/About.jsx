import { useLanguage } from '../i18n'
import Stats from './Stats'

export default function About() {
  const { t } = useLanguage()
  return (
    <section id="about" className="section about">
      <div className="section-head">
        <p className="kicker">2017 – 2026</p>
        <h2 className="section-title">{t.motto}</h2>
      </div>
      <div className="about-body">
        <div className="about-text">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <span className="signature">{t.about.signature}</span>
        </div>
        <Stats />
      </div>
    </section>
  )
}