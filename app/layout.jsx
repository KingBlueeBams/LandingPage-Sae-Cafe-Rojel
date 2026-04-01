import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'SaeCafeRojel — Rasa Premium, Suara Premium | Lumajang',
  description: 'SaeCafeRojel adalah Mini-Concert & Lifestyle Hub di Lumajang, Jawa Timur. Nikmati kopi premium, makanan lezat, dan live music Hi-Fi berkualitas konser. Buka Senin–Jumat 08:00–22:00, Sabtu–Minggu 07:00–23:00.',
  keywords: 'cafe lumajang, kopi lumajang, tempat nongkrong lumajang, live music cafe, saecaferojel',
  openGraph: {
    title: 'SaeCafeRojel — Rasa Premium, Suara Premium',
    description: 'Mini-Concert & Lifestyle Hub di Lumajang, Jawa Timur.',
    type: 'website',
    locale: 'id_ID',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}

        {/* GSAP - load before page renders */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
