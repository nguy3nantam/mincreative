import { useRef, useState } from 'react'
import { getConfig, setConfig } from '../store'

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function BrandingSection() {
  const cfg = getConfig()
  const [logo, setLogo] = useState(cfg.branding.logo)
  const [favicon, setFavicon] = useState(cfg.branding.favicon)
  const [saved, setSaved] = useState(false)
  const logoInput = useRef(null)
  const faviconInput = useRef(null)

  const handleLogo = async (file) => {
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      alert('Logo quá lớn (giới hạn 2MB). Vui lòng dùng ảnh nhỏ hơn.')
      return
    }
    setLogo(await readAsDataURL(file))
  }

  const handleFavicon = async (file) => {
    if (!file) return
    if (file.size > 512 * 1024) {
      alert('Favicon quá lớn (giới hạn 512KB). Dùng ảnh 64x64 hoặc 128x128 là tốt nhất.')
      return
    }
    setFavicon(await readAsDataURL(file))
  }

  const save = () => {
    setConfig({ branding: { logo, favicon } })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <section className="admin-card">
      <h2>Thương hiệu — Logo & Favicon</h2>
      <p className="admin-note">
        Tải logo hiển thị trên header và favicon (icon tab trình duyệt). Ưu tiên ảnh nền trong suốt (PNG/SVG).
      </p>

      <div className="admin-brand-row">
        <div className="admin-brand-box">
          <p className="admin-brand-box-label">Logo Web</p>
          <div className="admin-brand-preview logo-preview">
            {logo ? (
              <img src={logo} alt="Logo" />
            ) : (
              <span className="admin-gallery-empty">Logo hiện tại</span>
            )}
          </div>
          <div className="admin-brand-actions">
            <button
              type="button"
              className="admin-upload-btn static"
              onClick={() => logoInput.current && logoInput.current.click()}
            >
              Chọn logo
            </button>
            {logo && (
              <button type="button" className="admin-clear-btn" onClick={() => setLogo('')}>
                Xóa
              </button>
            )}
            <input
              ref={logoInput}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                handleLogo(e.target.files[0])
                e.target.value = ''
              }}
            />
          </div>
        </div>

        <div className="admin-brand-box">
          <p className="admin-brand-box-label">Favicon</p>
          <div className="admin-brand-preview favicon-preview">
            {favicon ? (
              <img src={favicon} alt="Favicon" />
            ) : (
              <span className="admin-gallery-empty">Favicon hiện tại</span>
            )}
          </div>
          <div className="admin-brand-actions">
            <button
              type="button"
              className="admin-upload-btn static"
              onClick={() => faviconInput.current && faviconInput.current.click()}
            >
              Chọn favicon
            </button>
            {favicon && (
              <button type="button" className="admin-clear-btn" onClick={() => setFavicon('')}>
                Xóa
              </button>
            )}
            <input
              ref={faviconInput}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                handleFavicon(e.target.files[0])
                e.target.value = ''
              }}
            />
          </div>
        </div>
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