import { useRef, useState } from 'react'
import { exportData, importData, resetConfig } from '../store'

export default function DataSection() {
  const fileRef = useRef(null)
  const [msg, setMsg] = useState('')

  const handleExport = () => {
    const json = exportData()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mincreative-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = async (file) => {
    if (!file) return
    const text = await file.text()
    const res = importData(text)
    setMsg(res.ok ? 'Đã nhập dữ liệu thành công.' : res.error)
  }

  const handleReset = () => {
    if (window.confirm('Xóa toàn bộ chỉnh sửa và khôi phục mặc định?')) {
      resetConfig()
      setMsg('Đã khôi phục cấu hình mặc định.')
    }
  }

  return (
    <section className="admin-card">
      <h2>Dữ liệu</h2>
      <p className="admin-note">
        Sao lưu toàn bộ cấu hình và người dùng dưới dạng file JSON, hoặc khôi phục từ file đã xuất.
      </p>
      <div className="admin-data-actions">
        <button type="button" className="btn btn-ghost" onClick={handleExport}>
          ⬇ Xuất JSON
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => fileRef.current && fileRef.current.click()}
        >
          ⬆ Nhập JSON
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          style={{ display: 'none' }}
          onChange={(e) => {
            handleImport(e.target.files[0])
            e.target.value = ''
          }}
        />
        <button type="button" className="btn btn-danger" onClick={handleReset}>
          Khôi phục mặc định
        </button>
      </div>
      {msg && <p className="admin-ok">{msg}</p>}
    </section>
  )
}