import { useState } from 'react'
import { apiListUsers, apiCreateUser, apiDeleteUser, apiUpdateUser } from '../store'

const ROLE_LABELS = {
  admin: 'Quản trị',
  user: 'Người dùng',
  customer: 'Khách hàng',
}

export default function UsersSection() {
  const [users, setUsers] = useState(apiListUsers)
  const [form, setForm] = useState({ name: '', username: '', password: '', role: 'customer' })
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  const refresh = () => setUsers(apiListUsers())

  const handleCreate = (e) => {
    e.preventDefault()
    setError('')
    setOk('')
    if (!form.username.trim() || !form.password.trim()) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu.')
      return
    }
    const res = apiCreateUser({
      username: form.username.trim(),
      password: form.password,
      role: form.role,
      name: form.name.trim() || form.username.trim(),
    })
    if (res.ok) {
      setForm({ name: '', username: '', password: '', role: 'customer' })
      setOk('Đã tạo người dùng.')
      refresh()
    } else {
      setError(res.error)
    }
  }

  const handleDelete = (id) => {
    const res = apiDeleteUser(id)
    if (res.ok) {
      setOk('Đã xóa.')
      refresh()
    } else {
      setError(res.error)
    }
  }

  return (
    <section className="admin-card">
      <h2>Người dùng</h2>
      <p className="admin-note">
        Các vai trò: Quản trị (admin) — toàn quyền; Người dùng (user); Khách hàng (customer).
      </p>

      <div className="admin-users-list">
        {users.map((u) => (
          <div className="admin-user-row" key={u.id}>
            <div className="admin-user-info">
              <strong>{u.name}</strong>
              <span className="admin-user-username">@{u.username}</span>
              <span className={`admin-role-pill role-${u.role}`}>
                {ROLE_LABELS[u.role] || u.role}
              </span>
            </div>
            <div className="admin-user-ops">
              <select
                className="admin-user-role-select"
                value={u.role}
                onChange={(e) => {
                  apiUpdateUser(u.id, { role: e.target.value })
                  refresh()
                }}
                aria-label="Vai trò"
              >
                <option value="admin">Quản trị</option>
                <option value="user">Người dùng</option>
                <option value="customer">Khách hàng</option>
              </select>
              <button
                type="button"
                className="admin-icon-btn"
                onClick={() => handleDelete(u.id)}
                aria-label="Xóa người dùng"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3>Tạo người dùng mới</h3>
      <form className="admin-create-user" onSubmit={handleCreate}>
        <label>
          <span>Họ tên</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nguyễn Văn A"
          />
        </label>
        <label>
          <span>Tên đăng nhập</span>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="van_a"
            required
          />
        </label>
        <label>
          <span>Mật khẩu</span>
          <input
            type="text"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••"
            required
          />
        </label>
        <label>
          <span>Vai trò</span>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="customer">Khách hàng</option>
            <option value="user">Người dùng</option>
            <option value="admin">Quản trị</option>
          </select>
        </label>
        <button type="submit" className="btn btn-primary">
          Tạo
        </button>
      </form>
      {error && <p className="admin-error">{error}</p>}
      {ok && <p className="admin-ok">{ok}</p>}
    </section>
  )
}