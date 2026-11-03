const CFG_KEY = 'mc_config'
const USERS_KEY = 'mc_users'
const SESSION_KEY = 'mc_session'

const DEFAULT_CONFIG = {
  contact: { phone: '', email: '' },
  socials: [],
  services: { packages: [], services: [], fields: [] },
  gallery: [],
  clients: [],
  branding: { logo: '', favicon: '' },
}

const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'admin123',
  role: 'admin',
  name: 'Administrator',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage full or unavailable */
  }
}

const listeners = new Set()

export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function notify() {
  listeners.forEach((fn) => {
    try {
      fn()
    } catch {
      /* ignore listener errors */
    }
  })
}

export function getConfig() {
  const cfg = read(CFG_KEY, {})
  return {
    contact: { ...DEFAULT_CONFIG.contact, ...(cfg.contact || {}) },
    socials: cfg.socials || DEFAULT_CONFIG.socials,
    services: {
      packages: cfg.services?.packages || [],
      services: cfg.services?.services || [],
      fields: cfg.services?.fields || [],
    },
    gallery: cfg.gallery || [],
    clients: cfg.clients || [],
    branding: { ...DEFAULT_CONFIG.branding, ...(cfg.branding || {}) },
  }
}

export function setConfig(patch) {
  const current = read(CFG_KEY, {})
  write(CFG_KEY, { ...current, ...patch })
  notify()
}

export function saveConfig(full) {
  write(CFG_KEY, full)
  notify()
}

export function resetConfig() {
  localStorage.removeItem(CFG_KEY)
  notify()
}

export function getUsers() {
  const users = read(USERS_KEY, [])
  if (!users.length) {
    users.push({ id: 'u-admin', ...DEFAULT_ADMIN })
    saveUsers(users)
  }
  return users
}

export function saveUsers(users) {
  write(USERS_KEY, users)
  notify()
}

function apiGetUsers() {
  return getUsers()
}

export function apiListUsers() {
  return apiGetUsers()
}

export function apiCreateUser({ username, password, role, name }) {
  const users = apiGetUsers()
  if (users.some((u) => u.username === username)) {
    return { ok: false, error: 'Username already exists.' }
  }
  users.push({ id: 'u-' + Date.now(), username, password, role, name })
  saveUsers(users)
  return { ok: true, user: users[users.length - 1] }
}

export function apiDeleteUser(id) {
  let users = apiGetUsers()
  const target = users.find((u) => u.id === id)
  if (!target) return { ok: false, error: 'User not found.' }
  if (target.role === 'admin' && users.filter((u) => u.role === 'admin').length <= 1) {
    return { ok: false, error: 'Cannot delete the last admin.' }
  }
  users = users.filter((u) => u.id !== id)
  saveUsers(users)
  return { ok: true }
}

export function apiUpdateUser(id, patch) {
  const users = apiGetUsers()
  const i = users.findIndex((u) => u.id === id)
  if (i < 0) return { ok: false, error: 'User not found.' }
  users[i] = { ...users[i], ...patch }
  saveUsers(users)
  return { ok: true, user: users[i] }
}

export function apiLogin(username, password) {
  const user = apiGetUsers().find(
    (u) => u.username === username && u.password === password,
  )
  if (!user) return { ok: false, error: 'Invalid username or password.' }
  const session = { id: user.id, username: user.username, name: user.name, role: user.role }
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  }
  return { ok: true, user: session }
}

export function apiLogout() {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
  localStorage.removeItem(SESSION_KEY)
}

export function getAdminSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function exportData() {
  const payload = {
    config: read(CFG_KEY, {}),
    users: apiListUsers(),
  }
  return JSON.stringify(payload, null, 2)
}

export function importData(jsonText) {
  let parsed
  try {
    parsed = JSON.parse(jsonText)
  } catch {
    return { ok: false, error: 'Invalid JSON.' }
  }
  if (parsed.config !== undefined) saveConfig(parsed.config)
  if (Array.isArray(parsed.users) && parsed.users.length > 0) saveUsers(parsed.users)
  return { ok: true }
}