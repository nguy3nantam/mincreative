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

const fallback = () => ({
  packages: [
    { num: '01', title: '', desc: '', src: '' },
    { num: '02', title: '', desc: '', src: '' },
  ],
  services: [{ title: '', desc: '' }],
  fields: [{ title: '', desc: '', tag: '' }],
})

function EditableList({ label, items, fields, onChange }) {
  const [idKey] = useState(() => Math.random().toString(36).slice(2))
  const fileInputs = useRef({})

  const patch = (i, field, value) => {
    const next = items.map((it, idx) =>
      idx === i ? { ...it, [field]: value } : it,
    )
    onChange(next)
  }

  const onUpload = async (i, file) => {
    if (!file) return
    if (file.size > 3 * 1024 * 1024) {
      alert('Ảnh quá lớn (giới hạn 3MB). Vui lòng dùng ảnh nhỏ hơn.')
      return
    }
    const dataUrl = await readAsDataURL(file)
    patch(i, 'src', dataUrl)
  }

  const add = () => {
    const blank = {}
    fields.forEach((f) => (blank[f.key] = ''))
    onChange([...items, blank])
  }

  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))

  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  return (
    <div className="admin-editable-list">
      <h3>{label}</h3>
      {items.map((item, i) => (
        <div className="admin-list-item" key={`${idKey}-${i}`}>
          {fields.some((f) => f.type === 'image') && (
            <div className="admin-service-img">
              {item.src ? (
                <img src={item.src} alt="" />
              ) : (
                <span className="admin-gallery-empty">Chưa có ảnh</span>
              )}
              <div className="admin-service-img-ops">
                <button
                  type="button"
                  className="admin-upload-btn static"
                  onClick={() => fileInputs.current[i] && fileInputs.current[i].click()}
                >
                  Chọn ảnh
                </button>
                {item.src && (
                  <button
                    type="button"
                    className="admin-clear-btn"
                    onClick={() => patch(i, 'src', '')}
                  >
                    Xóa
                  </button>
                )}
                <input
                  ref={(el) => (fileInputs.current[i] = el)}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    onUpload(i, e.target.files[0])
                    e.target.value = ''
                  }}
                />
              </div>
            </div>
          )}
          <div className="admin-list-fields">
            {fields.map((f) =>
              f.type === 'textarea' ? (
                <label key={f.key}>
                  <span>{f.label}</span>
                  <textarea
                    rows={2}
                    value={item[f.key] || ''}
                    onChange={(e) => patch(i, f.key, e.target.value)}
                    placeholder={f.placeholder}
                  />
                </label>
              ) : f.type === 'image' ? null : (
                <label key={f.key}>
                  <span>{f.label}</span>
                  <input
                    type="text"
                    value={item[f.key] || ''}
                    onChange={(e) => patch(i, f.key, e.target.value)}
                    placeholder={f.placeholder}
                  />
                </label>
              ),
            )}
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
        + Thêm
      </button>
    </div>
  )
}

export default function ServicesSection() {
  const cfg = getConfig()
  const initial = fallback()
  const [packages, setPackages] = useState(
    cfg.services.packages.length ? cfg.services.packages : initial.packages,
  )
  const [prodServices, setProdServices] = useState(
    cfg.services.services.length ? cfg.services.services : initial.services,
  )
  const [fields, setFields] = useState(
    cfg.services.fields.length ? cfg.services.fields : initial.fields,
  )
  const [saved, setSaved] = useState(false)

  const save = () => {
    setConfig({
      services: {
        packages,
        services: prodServices,
        fields,
      },
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <section className="admin-card">
      <h2>Dịch vụ</h2>
      <EditableList
        label="Gói sản xuất (Full Package)"
        items={packages}
        fields={[
          { key: 'src', label: 'Ảnh', type: 'image' },
          { key: 'num', label: 'Số', placeholder: '01' },
          { key: 'title', label: 'Tên gói', placeholder: 'Movie / Drama' },
          { key: 'desc', label: 'Mô tả', placeholder: 'Mô tả ngắn' },
        ]}
        onChange={setPackages}
      />
      <EditableList
        label="Dịch vụ sản xuất (Production Service)"
        items={prodServices}
        fields={[
          { key: 'title', label: 'Tên', placeholder: 'Post Production' },
          { key: 'desc', label: 'Mô tả', placeholder: 'Mô tả ngắn' },
        ]}
        onChange={setProdServices}
      />
      <EditableList
        label="Lĩnh vực quay & chụp"
        items={fields}
        fields={[
          { key: 'title', label: 'Tên', placeholder: 'Food' },
          { key: 'tag', label: 'Nhãn', placeholder: 'Gói quay + chụp' },
          { key: 'desc', label: 'Mô tả', placeholder: 'Mô tả ngắn' },
        ]}
        onChange={setFields}
      />
      <div className="admin-actions">
        <button type="button" className="btn btn-primary" onClick={save}>
          Lưu
        </button>
        {saved && <span className="admin-saved">Đã lưu ✓</span>}
      </div>
    </section>
  )
}