'use client'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer
      aria-label="Footer SaeCafeRojel"
      style={{
        background: '#111111',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        padding: '2.5rem 3rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        {/* Logo */}
        <a href="#hero" aria-label="SaeCafeRojel — Halaman Utama">
          <Image
            src="/images/cafe/Logo Horizontal putih.png"
            alt="SaeCafeRojel Logo"
            width={120}
            height={34}
            style={{ objectFit: 'contain', height: '30px', width: 'auto' }}
          />
        </a>

        {/* Copyright */}
        <p style={{
          fontSize: '0.7rem',
          color: 'var(--muted)',
          fontWeight: 300,
          textAlign: 'center',
          letterSpacing: '0.05em',
        }}>
          © 2025 SaeCafeRojel · Lumajang, Jawa Timur
        </p>

        {/* Social Links */}
        <nav aria-label="Social media SaeCafeRojel">
          <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
            {[
              { href: 'https://www.instagram.com/saecaferojel', label: 'Instagram' },
              { href: 'https://wa.me/6281249777345', label: 'WhatsApp' },
              { href: 'https://share.google/bXCk26oEnQpRvtEZp', label: 'Maps' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} SaeCafeRojel`}
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  )
}
