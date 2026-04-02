'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

const GALLERY_ITEMS = [
  { src: '/images/cafe/Outdoor View Malam.JPG', label: 'Outdoor View Malam', span: true },
  { src: '/images/cafe/Indoor.JPG', label: 'Interior Utama' },
  { src: '/images/cafe/Indoor 2.jpeg', label: 'Cozy Corner' },
  { src: '/images/cafe/suasana kasir indoor.JPG', label: 'Bar Station' },
  { src: '/images/cafe/Outdoor.JPG', label: 'Outdoor Garden' },
  { src: '/images/cafe/Indoor 3.jpeg', label: 'Pastry Corner' },
]

export default function Gallery() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof gsap === 'undefined') return

    const ctx = gsap.context(() => {
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger)
      }
      gsap.fromTo(
        '#gallery-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.5, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.gallery-item',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.5, stagger: 0.15, ease: 'expo.out',
          scrollTrigger: { trigger: '.gallery-grid', start: 'top 85%' },
        }
      )
    }, sectionRef)

    // Gallery hover
    const items = document.querySelectorAll('.gallery-item')
    const handlers = []

    items.forEach((item) => {
      const label = item.querySelector('.gallery-label')
      if (!label) return

      const enter = () => gsap.to(label, { y: 0, duration: 0.4, ease: 'power2.out' })
      const leave = () => gsap.to(label, { y: '100%', duration: 0.3, ease: 'power2.in' })

      item.addEventListener('mouseenter', enter)
      item.addEventListener('mouseleave', leave)
      handlers.push({ item, enter, leave })
    })

    return () => {
      ctx.revert()
      handlers.forEach(({ item, enter, leave }) => {
        item.removeEventListener('mouseenter', enter)
        item.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <section
      id="galeri"
      ref={sectionRef}
      className="section-padding"
      aria-label="Galeri SaeCafeRojel"
      style={{ background: '#141414' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div id="gallery-header" style={{ marginBottom: '2.5rem' }}>
          <div className="section-tag">Galeri</div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            Suasana <em style={{ color: 'var(--gold)' }}>Tempat Kami</em>
          </h2>
        </div>

        {/* Asymmetric Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gridTemplateRows: '220px 220px',
            gap: '0.75rem',
          }}
          className="gallery-grid"
        >
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className="gallery-item"
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: '#1E1E1E',
                gridRow: item.span ? '1 / 3' : 'auto',
                cursor: 'none',
              }}
            >
              <Image
                src={item.src}
                alt={`SaeCafeRojel — ${item.label}`}
                fill
                style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                quality={75}
                loading="lazy"
              />
              {/* Hover label */}
              <div
                className="gallery-label"
                style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  transform: 'translateY(100%)',
                  background: 'linear-gradient(to top, rgba(10,10,10,0.9), transparent)',
                  padding: '2rem 1rem 1rem',
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
                aria-hidden="true"
              >
                <span style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--gold-light)',
                  fontWeight: 500,
                }}>
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <a
            href="https://www.instagram.com/saecaferojel"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            aria-label="Lihat lebih banyak foto di Instagram @saecaferojel"
          >
            Lihat lebih banyak di @saecaferojel →
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section { padding: 4rem 1.5rem !important; }
          .gallery-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: 160px 160px 160px !important;
          }
          .gallery-grid > div:first-child { grid-row: auto !important; }
        }
        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: repeat(6, 180px) !important;
          }
        }
      `}</style>
    </section>
  )
}
