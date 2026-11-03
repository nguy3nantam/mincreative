import { LanguageProvider } from './i18n'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FaviconSync from './components/FaviconSync'
import StickyContact from './components/StickyContact'
import AdminPage from './admin/AdminPage'
import './App.css'

function App() {
  const isAdmin = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/')

  if (isAdmin) {
    return (
      <LanguageProvider>
        <FaviconSync />
        <AdminPage />
      </LanguageProvider>
    )
  }

  return (
    <LanguageProvider>
      <FaviconSync />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <StickyContact />
      <Footer />
    </LanguageProvider>
  )
}

export default App
