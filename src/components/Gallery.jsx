import { useMergedT, useSiteConfig } from '../i18n'
import movie from '../assets/portfolio/optimized/movie-1.jpg'
import tvc from '../assets/portfolio/optimized/tvc-1.jpg'
import mv from '../assets/portfolio/optimized/mv-1.jpg'
import beauty from '../assets/portfolio/optimized/beauty-1.jpg'
import event from '../assets/portfolio/optimized/event-1.jpg'
import food from '../assets/portfolio/optimized/food-1.jpg'
import arch from '../assets/portfolio/optimized/arch-1.jpg'
import portrait from '../assets/portfolio/optimized/portrait-1.jpg'
import product from '../assets/portfolio/optimized/product-1.jpg'
import food2 from '../assets/portfolio/optimized/food-2.jpg'
import event2 from '../assets/portfolio/optimized/event-2.jpg'
import arch2 from '../assets/portfolio/optimized/arch-2.jpg'

const defaultTiles = [
  { label: 'Movie / Drama', src: movie, tall: true },
  { label: 'TVC / Viral', src: tvc },
  { label: 'Music Video', src: mv, tall: true },
  { label: 'Beauty & Fashion', src: beauty, tall: true },
  { label: 'Event', src: event },
  { label: 'Food', src: food, tall: true },
  { label: 'Architecture', src: arch },
  { label: 'Portrait', src: portrait, tall: true },
  { label: 'Product', src: product },
  { label: 'Food Campaign', src: food2 },
  { label: 'Event Highlight', src: event2 },
  { label: 'Interior', src: arch2 },
]

export default function Gallery() {
  const t = useMergedT()
  const { gallery } = useSiteConfig()
  const tiles = gallery.length ? gallery : defaultTiles
  return (
    <section id="gallery" className="section gallery">
      <div className="section-head">
        <p className="kicker">{t.gallery.kicker}</p>
        <h2 className="section-title">{t.gallery.title}</h2>
      </div>
      <div className="gallery-grid">
        {tiles.map((tile) => (
          <figure
            className={`gallery-item ${tile.tall ? 'is-tall' : ''}`}
            key={tile.label}
          >
            <img src={tile.src} alt={tile.label} loading="lazy" />
            <figcaption>{tile.label}</figcaption>
          </figure>
        ))}
      </div>
      <div className="gallery-cta">
        <a href="#contact" className="btn btn-primary">
          {t.gallery.cta}
        </a>
      </div>
    </section>
  )
}