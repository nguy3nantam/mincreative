import { useState } from 'react'
import { apiLogin, getAdminSession, apiLogout } from '../store'

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    setTimeout(() => {
      const res = apiLogin(username.trim(), password)
      setBusy(false)
      if (res.ok) {
        onLogin(res.user)
      } else {
        setError(res.error)
      }
    }, 700)
  }

  return (
    <div className="admin-login">
      <div className="admin-above" aria-hidden="true">
        <span>CONNECTION</span>
        <span className="ab">•</span>
        <span>COLLABORATION</span>
        <span className="ab">•</span>
        <span>CREATE VALUES</span>
        <span className="ab">—</span>
        <span>EST. 2017</span>
      </div>

      <div className="iris" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="iris-ring">
          <g className="iris-leaves">
            {Array.from({ length: 8 }).map((_, i) => (
              <path
                key={i}
                d="M100 100 L100 32 A68 68 0 0 1 168 100 Z"
              />
            ))}
          </g>
          <circle cx="100" cy="100" r="30" className="iris-core" />
        </svg>
      </div>

      <div className="admin-login-card">
        <div className="admin-login-top">
          <p className="admin-login-brand">
            MIN<span>CREATIVE</span>
          </p>
          <p className="admin-login-eyebrow">PRODUCTION HOUSE · CONTROL ROOM</p>
        </div>

        <p className="admin-login-hello">Đăng nhập để quản lý nội dung.</p>

        <form onSubmit={handleSubmit}>
          <label className="admin-login-field">
            <span className="admin-login-label">TÊN ĐĂNG NHẬP</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              placeholder="admin"
              required
            />
          </label>
          <label className="admin-login-field">
            <span className="admin-login-label">MẬT KHẨU</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="•••••••"
              required
            />
          </label>

          {error && <p className="admin-error">{error}</p>}

          <button
            type="submit"
            className={`admin-reel-btn ${busy ? 'is-busy' : ''}`}
            disabled={busy}
          >
            <span className="rec-dot" />
            <span className="rec-label">{busy ? 'CHECKING...' : 'REC · ENTER'}</span>
          </button>
        </form>

        <div className="admin-login-foot">
          <span>TÀI KHOẢN MẶC ĐỊNH · admin / admin123</span>
          <span>2026</span>
        </div>
      </div>

      <div className="admin-below" aria-hidden="true">
        <span>CONNECTION</span>
        <span className="ab">•</span>
        <span>COLLABORATION</span>
        <span className="ab">•</span>
        <span>CREATE VALUES</span>
        <span className="ab">—</span>
        <span>EST. 2017</span>
      </div>

      <div className="admin-grade" aria-hidden="true" />
    </div>
  )
}

export function RequireAdmin({ children }) {
  const [session, setSession] = useState(getAdminSession)

  if (!session) {
    return <AdminLogin onLogin={(u) => setSession(u)} />
  }

  return children({
    session,
    logout: () => {
      apiLogout()
      setSession(null)
    },
  })
}