import { createContext, useContext, useEffect, useState } from 'react'
import { getConfig, subscribe } from './store'

const LanguageContext = createContext()

const MOTTO = 'CONNECTION • COLLABORATION • CREATE VALUES'

export const translations = {
  vi: {
    brand: 'Min Creative',
    motto: MOTTO,
    nav: {
      home: 'Trang chủ',
      services: 'Dịch vụ',
      work: 'Tác phẩm',
      clients: 'Khách hàng',
      contact: 'Liên hệ',
    },
    about: {
      p1: 'Min Creative là production house Việt Nam hoạt động từ 2017, chuyên cung cấp trọn gói sản xuất nội dung — từ điện ảnh, TVC cho đến nội dung số. Chúng tôi kết nối đội ngũ sáng tạo, kỹ thuật và thương hiệu để tạo ra giá trị thực sự.',
      p2: 'Với slogan CONNECTION • COLLABORATION • CREATE VALUES, chúng tôi đồng hành cùng các agency, nhãn hàng và công ty giải trí trong suốt chặng đường phát triển của họ.',
      signature: '— Đội ngũ Min Creative',
    },
    stats: [
      { value: '2017', label: 'Năm thành lập' },
      { value: '12+', label: 'Lĩnh vực sản xuất' },
      { value: '50+', label: 'Thương hiệu hợp tác' },
      { value: '100%', label: 'Trọn gói sản xuất' },
    ],
    hero: {
      kicker: 'Production House',
      title: 'Full Production Package cho phim, TVC, MV & nội dung số.',
      subtitle:
        'Min Creative là production house chuyên nghiệp cung cấp trọn gói sản xuất từ ý tưởng đến hoàn thiện — điện ảnh, TVC, MV, TV Show, Podcast, TikTok Reel cùng dịch vụ hậu kỳ, VFX và Key Visual Animation.',
      ctaPrimary: 'Xem dịch vụ',
      ctaSecondary: 'Liên hệ ngay',
      scroll: 'Cuộn xuống',
      clients_label: 'Đã đồng hành cùng các thương hiệu',
    },
    clients: [
      'BYD',
      'TikTok',
      'Toyota',
      'La Roche-Posay',
      'Acecook',
      'Vinamilk',
      'Monin',
      'BMW',
      "L'Officiel",
      'GAP',
      'Old Navy',
      'Kho Nhà Mình',
    ],
    services: {
      kicker: 'Dịch vụ',
      title: 'Những gì chúng tôi sản xuất.',
      subtitle: 'Full Production Package',
      packages: [
        { num: '01', title: 'Movie / Drama', desc: 'Phim điện ảnh và phim truyền hình trọn gói.' },
        { num: '02', title: 'TV Series / TV Show', desc: 'Sản xuất series và chương trình truyền hình.' },
        { num: '03', title: 'Short Film', desc: 'Phim ngắn sáng tạo, giàu cảm xúc.' },
        { num: '04', title: 'Music Video', desc: 'MV ca nhạc với kịch bản và hình ảnh đặc sắc.' },
        { num: '05', title: 'TVC / Viral', desc: 'Quảng cáo truyền hình và video lan truyền.' },
        { num: '06', title: 'Podcast / TikTok Reel', desc: 'Nội dung số ngắn gọn, hấp dẫn, hợp xu hướng.' },
      ],
      servicesLabel: 'Production Service',
      services: [
        { title: 'Music Video Production', desc: 'Sản xuất MV chuyên nghiệp từ tiền kỳ đến hậu kỳ.' },
        { title: 'Post Production', desc: 'Dựng phim, chỉnh màu, âm thanh chất lượng phòng thu.' },
        { title: 'VFX', desc: 'Hiệu ứng hình ảnh sống động, đúng chất.' },
        { title: 'Key Visual Animation', desc: 'Hoạt hình và key visual cho chiến dịch của bạn.' },
      ],
      fieldsLabel: 'Lĩnh vực quay & chụp',
      fields: [
        {
          title: 'Food',
          desc: 'Gói quay + chụp food có concept, stylist food.',
          tag: 'Gói quay + chụp',
        },
        {
          title: 'Beauty & Fashion',
          desc: 'Quay + chụp sản phẩm thời trang, mỹ phẩm, model...',
          tag: 'Gói quay + chụp',
        },
        {
          title: 'Event & Lifestyle',
          desc: 'Gói quay + chụp sự kiện, lễ trao giải — gồm 1 video highlight + 1 video full + toàn bộ hình ảnh.',
          tag: 'Gói quay + chụp',
        },
        {
          title: 'Architecture & Interior',
          desc: 'Quay chụp kiến trúc, nội thất chuyên nghiệp (WeWork).',
          tag: 'Quay + chụp',
        },
        {
          title: 'Portrait',
          desc: 'Gói quay + chụp ảnh Profile Cá Nhân, Doanh Nghiệp.',
          tag: 'Chân dung',
        },
      ],
    },
    partnership: {
      kicker: 'Hợp tác',
      title: 'Partnership & Sponsorship Marketing.',
      desc: 'Kết nối với các agency, thương hiệu, công ty giải trí và tập đoàn truyền thông.',
      cta: 'Hợp tác cùng chúng tôi',
    },
    gallery: {
      kicker: 'Tác phẩm',
      title: 'Dòng sản xuất của chúng tôi.',
      cta: 'Muốn sản xuất tương tự?',
    },
    contact: {
      kicker: 'Liên hệ',
      title: 'Bắt đầu dự án của bạn.',
      subtitle: 'Hãy liên hệ với chúng tôi để sản xuất nội dung tiếp theo.',
      form: {
        name: 'Họ và tên',
        email: 'Email',
        message: 'Nội dung',
        placeholderName: 'Tên của bạn',
        placeholderEmail: 'email@vidu.com',
        placeholderMessage: 'Kể cho chúng tôi về dự án của bạn...',
        submit: 'Gửi yêu cầu',
        success: 'Cảm ơn! Chúng tôi sẽ liên hệ lại sớm.',
      },
      phone: '0908 050 527',
      email: 'huynhmin43@gmail.com',
    },
    footer: {
      tagline: 'THANK YOU!',
      rights: 'Bản quyền thuộc về',
      backToTop: 'Lên đầu trang',
      contactLabel: 'Liên hệ',
      socialLabel: 'Theo dõi chúng tôi',
      quickLinks: 'Điều hướng',
      nav: [
        { href: '#home', label: 'Trang chủ' },
        { href: '#services', label: 'Dịch vụ' },
        { href: '#gallery', label: 'Tác phẩm' },
        { href: '#clients', label: 'Khách hàng' },
        { href: '#contact', label: 'Liên hệ' },
      ],
    },
  },
  en: {
    brand: 'Min Creative',
    motto: MOTTO,
    nav: {
      home: 'Home',
      services: 'Services',
      work: 'Work',
      clients: 'Clients',
      contact: 'Contact',
    },
    about: {
      p1: 'Min Creative is a Vietnamese production house operating since 2017, delivering full-production packages — from cinema and TVC to digital content. We connect creative teams, production and brands to create real value.',
      p2: 'Guided by CONNECTION • COLLABORATION • CREATE VALUES, we partner with agencies, brands and entertainment companies throughout their journey.',
      signature: '— The Min Creative team',
    },
    stats: [
      { value: '2017', label: 'Founded' },
      { value: '12+', label: 'Production fields' },
      { value: '50+', label: 'Brands partnered' },
      { value: '100%', label: 'Full production' },
    ],
    hero: {
      kicker: 'Production House',
      title: 'Full Production Package for film, TVC, MV & digital content.',
      subtitle:
        'Min Creative is a professional production house delivering end-to-end content — cinema, TVC, music videos, TV shows, podcasts and TikTok Reels, plus post-production, VFX and key visual animation.',
      ctaPrimary: 'View services',
      ctaSecondary: 'Get in touch',
      scroll: 'Scroll',
      clients_label: 'Trusted by leading brands',
    },
    clients: [
      'BYD',
      'TikTok',
      'Toyota',
      'La Roche-Posay',
      'Acecook',
      'Vinamilk',
      'Monin',
      'BMW',
      "L'Officiel",
      'GAP',
      'Old Navy',
      'Kho Nhà Mình',
    ],
    services: {
      kicker: 'Services',
      title: 'What we produce.',
      subtitle: 'Full Production Package',
      packages: [
        { num: '01', title: 'Movie / Drama', desc: 'Full-service feature and drama production.' },
        { num: '02', title: 'TV Series / TV Show', desc: 'TV series and entertainment shows.' },
        { num: '03', title: 'Short Film', desc: 'Creative, emotional short films.' },
        { num: '04', title: 'Music Video', desc: 'Music videos with standout direction.' },
        { num: '05', title: 'TVC / Viral', desc: 'Broadcast commercials and viral videos.' },
        { num: '06', title: 'Podcast / TikTok Reel', desc: 'Short, engaging content for digital platforms.' },
      ],
      servicesLabel: 'Production Service',
      services: [
        { title: 'Music Video Production', desc: 'Professional MV production, pre to post.' },
        { title: 'Post Production', desc: 'Editing, grading and sound at studio quality.' },
        { title: 'VFX', desc: 'Immersive visual effects.' },
        { title: 'Key Visual Animation', desc: 'Animation and key visuals for your campaigns.' },
      ],
      fieldsLabel: 'Photography & Film Fields',
      fields: [
        {
          title: 'Food',
          desc: 'Food film + photo package with concept & food stylist.',
          tag: 'Film + Photo',
        },
        {
          title: 'Beauty & Fashion',
          desc: 'Fashion, cosmetics and model film + photo packages.',
          tag: 'Film + Photo',
        },
        {
          title: 'Event & Lifestyle',
          desc: 'Events & award ceremonies — 1 highlight + 1 full video + all photos.',
          tag: 'Film + Photo',
        },
        {
          title: 'Architecture & Interior',
          desc: 'Professional architecture & interior film and photo (WeWork).',
          tag: 'Film + Photo',
        },
        {
          title: 'Portrait',
          desc: 'Personal / corporate profile film + photo package.',
          tag: 'Portrait',
        },
      ],
    },
    partnership: {
      kicker: 'Partnership',
      title: 'Partnership & Sponsorship Marketing.',
      desc: 'Connecting with agencies, brands, entertainment companies and media groups.',
      cta: 'Partner with us',
    },
    gallery: {
      kicker: 'Work',
      title: 'The work we produce.',
      cta: 'Want something similar?',
    },
    contact: {
      kicker: 'Contact',
      title: 'Start your project.',
      subtitle: 'Reach out to produce your next piece of content.',
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        placeholderName: 'Your name',
        placeholderEmail: 'you@example.com',
        placeholderMessage: 'Tell us about your project...',
        submit: 'Send request',
        success: 'Thank you! We will get back to you soon.',
      },
      phone: '0908 050 527',
      email: 'huynhmin43@gmail.com',
    },
    footer: {
      tagline: 'THANK YOU!',
      rights: 'All rights reserved',
      backToTop: 'Back to top',
      contactLabel: 'Contact',
      socialLabel: 'Follow us',
      quickLinks: 'Quick links',
      nav: [
        { href: '#home', label: 'Home' },
        { href: '#services', label: 'Services' },
        { href: '#gallery', label: 'Work' },
        { href: '#clients', label: 'Clients' },
        { href: '#contact', label: 'Contact' },
      ],
    },
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('vi')

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = translations[lang]
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function useMergedT() {
  const { t } = useLanguage()
  const config = useSiteConfig()
  return mergeConfig(t, config)
}

export function useSiteConfig() {
  const [config, setConfig] = useState(getConfig)

  useEffect(() => {
    const unsub = subscribe(() => setConfig(getConfig()))
    return unsub
  }, [])

  return config
}

export function mergeConfig(t, config) {
  const merged = { ...t }
  if (!config) return merged

  if (config.contact?.phone || config.contact?.email) {
    merged.contact = { ...merged.contact, ...config.contact }
  }
  merged.services = {
    ...merged.services,
    ...(config.services?.packages?.length
      ? { packages: config.services.packages }
      : {}),
    ...(config.services?.services?.length
      ? { services: config.services.services }
      : {}),
    ...(config.services?.fields?.length ? { fields: config.services.fields } : {}),
  }
  merged.clients = config.clients?.length ? config.clients : merged.clients
  return merged
}
