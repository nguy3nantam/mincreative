import { useLanguage } from '../i18n'

export default function Stats() {
  const { t } = useLanguage()
  return (
    <div className="stats">
      {t.stats.map((s) => (
        <div className="stat" key={s.label}>
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
