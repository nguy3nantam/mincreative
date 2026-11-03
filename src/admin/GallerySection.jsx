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

export default function GallerySection() {
  const cfg = getConfig()
  const [items, setItems] = useState(cfg.gallery)
  const [saved, setSaved] = useState(false)
  const fileRef = useRef(null)

  const patch = (i, field, value) => {
    const next = items.map((it, idx) => (idx === i ? { ...it, [field]: value } : it))
    setItems(next)
  }

  const add = () => setItems([...items, { label: '', src: '' }])
  const remove = (i) => setItems(items.filter((_, idx) => idx !== i))
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    setItems(next)
  }

  const onUpload = async (i, file) => {
    if (!file) return
    if (file.size > 4 * 1024 * 1024) {
      alert('Ảnh quá lớn (giới hạn 4MB). Hãy dùng ảnh nhỏ hoặc nhập URL.')
      return
    }
    const dataUrl = await readAsDataURL(file)
    patch(i, 'src', dataUrl)
  }

  const save = () => {
    setConfig({ gallery: items.filter((it) => it.label) })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <section className="admin-card">
      <h2>Tác phẩm (Gallery)</h2>
      <p className="admin-note">
        Ảnh có thể tải lên từ máy (lưu dạng data, giới hạn 4MB) hoặc dán URL.
      </p>
      {items.map((item, i) => (
        <div className="admin-gallery-item" key={i}>
          <div className="admin-gallery-preview">
            {item.src ? (
              <img src={item.src} alt="" />
            ) : (
              <span className="admin-gallery-empty">Chưa có ảnh</span>
            )}
            <button
              type="button"
              className="admin-upload-btn"
              onClick={() => fileRef.current && fileRef.current.click()}
            >
              Tải ảnh
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                onUpload(i, e.target.files[0])
                e.target.value = ''
              }}
            />
          </div>
          <div className="admin-gallery-fields">
            <label>
              <span>Nhãn</span>
              <input
                type="text"
                value={item.label || ''}
                onChange={(e) => patch(i, 'label', e.target.value)}
                placeholder="Movie / Drama"
              />
            </label>
            <label>
              <span>URL ảnh</span>
              <input
                type="text"
                value={item.src || ''}
                onChange={(e) => patch(i, 'src', e.target.value)}
                placeholder="https://... hoặc dán data URL"
              />
            </label>
          </div>
          <div className="admin-list-ops">
            <button type="button" onClick={() => move(i, -1)} aria-label="Lên">
              ↑
            </button>
            <button type="button" onClick={() => move(i, 1)} aria-label="Xuống">
              ↓
            </button>
            <button
              type="button"
              className="admin-icon-btn"
              onClick={() => remove(i)}
              aria-label="Xóa"
            >
              ×
            </button>
          </div>
        </div>
      ))}
      <button type="button" className="admin-add-btn" onClick={add}>
        + Thêm tác phẩm
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