import { useState } from 'react'
import { RequireAdmin } from './Login'
import BrandingSection from './BrandingSection'
import ContactSection from './ContactSection'
import ServicesSection from './ServicesSection'
import GallerySection from './GallerySection'
import ClientsSection from './ClientsSection'
import UsersSection from './UsersSection'
import DataSection from './DataSection'
import './admin.css'

const SECTIONS = [
  { id: 'branding', label: 'Thương hiệu', Component: BrandingSection },
  { id: 'contact', label: 'Liên hệ & MXH', Component: ContactSection },
  { id: 'services', label: 'Dịch vụ', Component: ServicesSection },
  { id: 'gallery', label: 'Tác phẩm', Component: GallerySection },
  { id: 'clients', label: 'Khách hàng', Component: ClientsSection },
  { id: 'users', label: 'Người dùng', Component: UsersSection },
  { id: 'data', label: 'Dữ liệu', Component: DataSection },
]

function Layout({ session, logout }) {
  const [active, setActive] = useState('contact')

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <p className="admin-brand">
          Min<span>Creative</span>
        </p>
        <nav className="admin-nav">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={active === s.id ? 'active' : ''}
              onClick={() => setActive(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-foot">
          <p className="admin-user">👤 {session.name || session.username}</p>
          <button type="button" className="btn btn-ghost admin-logout" onClick={logout}>
            Đăng xuất
          </button>
          <a href="/" className="btn btn-ghost admin-view-site">
            Xem website →
          </a>
        </div>
      </aside>
      <main className="admin-main">
        {SECTIONS.filter((s) => s.id === active).map((s) => {
          const C = s.Component
          return <C key={s.id} />
        })}
      </main>
    </div>
  )
}

export default function AdminPage() {
  return <RequireAdmin>{(p) => <Layout {...p} />}</RequireAdmin>
}
