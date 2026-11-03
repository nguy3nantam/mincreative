import { useState } from 'react'
import { getConfig, setConfig } from '../store'

const fallbackSocials = [
  { name: 'Fanpage', href: '' },
  { name: 'TikTok', href: '' },
  { name: 'YouTube', href: '' },
  { name: 'Zalo', href: '' },
]

export default function ContactSection() {
  const cfg = getConfig()
  const [phone, setPhone] = useState(cfg.contact.phone)
  const [email, setEmail] = useState(cfg.contact.email)
  const [socials, setSocials] = useState(
    cfg.socials.length ? cfg.socials : fallbackSocials,
  )
  const [saved, setSaved] = useState(false)

  const handleSocialChange = (i, field, value) => {
    setSocials((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)),
    )
  }

  const addSocial = () => setSocials((prev) => [...prev, { name: '', href: '' }])
  const removeSocial = (i) =>
    setSocials((prev) => prev.filter((_, idx) => idx !== i))

  const save = () => {
    const filtered = socials.filter((s) => s.name && s.href)
    setConfig({
      contact: { phone, email },
      socials: filtered,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <section className="admin-card">
      <h2>Liên hệ</h2>
      <div className="admin-grid2">
        <label>
          <span>Số điện thoại</span>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0908 050 527"
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hello@mincreative.com"
          />
        </label>
      </div>

      <h3>Mạng xã hội</h3>
      {socials.map((s, i) => (
        <div className="admin-social-row" key={i}>
          <input
            className="admin-social-name"
            type="text"
            value={s.name}
            onChange={(e) => handleSocialChange(i, 'name', e.target.value)}
            placeholder="Tên kênh (vd: Fanpage)"
          />
          <input
            className="admin-social-href"
            type="text"
            value={s.href}
            onChange={(e) => handleSocialChange(i, 'href', e.target.value)}
            placeholder="https://..."
          />
          <button
            type="button"
            className="admin-icon-btn"
            onClick={() => removeSocial(i)}
            aria-label="Xóa"
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" className="admin-add-btn" onClick={addSocial}>
        + Thêm kênh
      </button>

      <div className="admin-actions">
        <button type="button" className="btn btn-primary" onClick={save}>
          Lưu
        </button>
        {saved && <span className="admin-saved">Đã lưu ✓</span>}
      </div>
    </section>
  )
}