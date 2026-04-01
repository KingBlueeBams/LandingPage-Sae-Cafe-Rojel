'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '#about', label: 'Tentang' },
    { href: '#menu', label: 'Menu' },
    { href: '#galeri', label: 'Galeri' },
    { href: '#reservasi', label: 'Reservasi' },
  ]

  useEffect(() => {
    const nav = navRef.current
    if (!nav || typeof gsap === 'undefined') return

    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
    }

    let lastScroll = 0

    const handleScroll = () => {
      const currentScroll = window.scrollY
      if (currentScroll > 100) {
        if (currentScroll > lastScroll) {
          // Scroll down — hide
          gsap.to(nav, { yPercent: -100, duration: 0.4, ease: 'power2.in' })
        } else {
          // Scroll up — show
          gsap.to(nav, { yPercent: 0, duration: 0.4, ease: 'power2.out' })
        }
      } else {
        gsap.to(nav, { yPercent: 0, duration: 0.3 })
      }
      lastScroll = currentScroll
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      ref={navRef}
      aria-label="Navigasi utama"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        background: 'rgba(10,10,10,0.85)',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
        padding: '0 2rem',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <a href="#hero" aria-label="SaeCafeRojel — Halaman Utama" style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src="/images/cafe/Logo Horizontal putih.png"
          alt="SaeCafeRojel Logo"
          width={140}
          height={40}
          style={{ objectFit: 'contain', height: '36px', width: 'auto' }}
          priority
        />
      </a>

      {/* Desktop Nav Links */}
      <div
        style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center',
        }}
        className="desktop-nav"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.3s',
              fontFamily: 'Poppins, sans-serif',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href="https://wa.me/6281249777345?text=Halo%20SaeCafeRojel!%20Saya%20ingin%20informasi%20lebih%20lanjut."
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
        style={{ fontSize: '0.65rem', padding: '0.6rem 1.25rem' }}
        aria-label="Pesan Meja via WhatsApp"
      >
        Pesan Meja
      </a>

      {/* Hamburger (mobile) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          flexDirection: 'column',
          gap: '5px',
          padding: '4px',
        }}
        className="hamburger"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '22px', height: '1.5px',
              background: 'var(--gold)',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '68px', left: 0, right: 0,
            background: 'rgba(10,10,10,0.97)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid rgba(201,168,76,0.15)',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem 2rem',
            gap: '1.5rem',
            zIndex: 999,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              style={{
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--white)',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/6281249777345?text=Halo%20SaeCafeRojel!%20Saya%20ingin%20pesan%20meja."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            onClick={closeMenu}
            style={{ textAlign: 'center' }}
          >
            Pesan Meja
          </a>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
