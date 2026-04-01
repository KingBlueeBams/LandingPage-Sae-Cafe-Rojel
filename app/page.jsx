'use client'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Menu from '@/components/Menu'
import Gallery from '@/components/Gallery'
import LiveMusic from '@/components/LiveMusic'
import Reservation from '@/components/Reservation'
import Footer from '@/components/Footer'

// Client-only components (no SSR)
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })
const WhatsAppFloat = dynamic(() => import('@/components/WhatsAppFloat'), { ssr: false })

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <LiveMusic />
        <Reservation />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
