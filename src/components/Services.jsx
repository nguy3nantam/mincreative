import { useMergedT } from '../i18n'

export default function Services() {
  const t = useMergedT()
  return (
    <>
      <section id="services" className="section services">
        <div className="section-head">
          <p className="kicker">{t.services.kicker}</p>
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-sub">{t.services.subtitle}</p>
        </div>
        <div className="services-grid">
          {t.services.packages.map((item) => (
            <article
              className={`service ${item.src ? 'has-img' : ''}`}
              key={item.num}
              style={item.src ? { '--srv-img': `url("${item.src}")` } : undefined}
            >
              {item.src && <span className="service-img" aria-hidden="true" />}
              <span className="service-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>

        <div className="services-sub-head">
          <h3>{t.services.servicesLabel}</h3>
          <p className="section-sub">{t.services.subtitle}</p>
        </div>
        <div className="services-list">
          {t.services.services.map((s) => (
            <div className="service-row" key={s.title}>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="services-sub-head alt">
          <h3>{t.services.fieldsLabel}</h3>
        </div>
        <div className="field-grid">
          {t.services.fields.map((f) => (
            <div className="field-card" key={f.title}>
              <span className="field-tag">{f.tag}</span>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="clients" className="section clients">
        <div className="section-head">
          <p className="kicker">{t.partnership.kicker}</p>
          <h2 className="section-title">{t.partnership.title}</h2>
        </div>
        <p className="clients-desc">{t.partnership.desc}</p>
        <div className="clients-logos">
          {t.clients.map((c) => (
            <span className="client-logo" key={c}>
              {c}
            </span>
          ))}
        </div>
        <div className="clients-cta">
          <a href="#contact" className="btn btn-primary">
            {t.partnership.cta}
          </a>
        </div>
      </section>
    </>
  )
}