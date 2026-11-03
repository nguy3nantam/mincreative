import { useState } from 'react'
import { getConfig, setConfig } from '../store'

export default function ClientsSection() {
  const cfg = getConfig()
  const [clients, setClients] = useState(cfg.clients)
  const [saved, setSaved] = useState(false)

  const save = () => {
    setConfig({ clients: clients.filter(Boolean) })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <section className="admin-card">
      <h2>Khách hàng</h2>
      <div className="admin-chip-editor">
        {clients.map((c, i) => (
          <div className="admin-chip-row" key={i}>
            <input
              type="text"
              value={c}
              onChange={(e) =>
                setClients((prev) =>
                  prev.map((x, idx) => (idx === i ? e.target.value : x)),
                )
              }
              placeholder="Tên thương hiệu"
            />
            <button
              type="button"
              className="admin-icon-btn"
              onClick={() => setClients((prev) => prev.filter((_, idx) => idx !== i))}
              aria-label="Xóa"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          className="admin-add-btn"
          onClick={() => setClients((prev) => [...prev, ''])}
        >
          + Thêm khách hàng
        </button>
      </div>
      <div className="admin-actions">
        <button type="button" className="btn btn-primary" onClick={save}>
          Lưu
        </button>
        {saved && <span className="admin-saved">Đã lưu ✓</span>}
      </div>
    </section>
  )
}