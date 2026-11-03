import { useState } from 'react'
import { useMergedT } from '../i18n'

export default function Contact() {
  const t = useMergedT()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const f = t.contact.form
  const phone = t.contact.phone
  const email = t.contact.email

  return (
    <section id="contact" className="section contact">
      <div className="contact-inner">
        <div className="contact-info">
          <p className="kicker">{t.contact.kicker}</p>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="contact-sub">{t.contact.subtitle}</p>
          <div className="contact-meta">
            <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>

        <div className="contact-form">
          {sent ? (
            <div className="form-success">{f.success}</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                <span>{f.name}</span>
                <input type="text" name="name" placeholder={f.placeholderName} required />
              </label>
              <label>
                <span>{f.email}</span>
                <input type="email" name="email" placeholder={f.placeholderEmail} required />
              </label>
              <label>
                <span>{f.message}</span>
                <textarea
                  name="message"
                  rows="5"
                  placeholder={f.placeholderMessage}
                  required
                />
              </label>
              <button type="submit" className="btn btn-primary">
                {f.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
