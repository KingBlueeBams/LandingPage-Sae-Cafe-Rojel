'use client'
import { useEffect, useRef, useState } from 'react'

const INFO = [
  {
    icon: '📍',
    title: 'Lokasi',
    content: 'Jl. Letkol Slamet Wardoyo No.12, Citrodiwangsan, Kec. Lumajang, Kabupaten Lumajang, Jawa Timur 67316',
  },
  {
    icon: '🕐',
    title: 'Jam Buka',
    content: 'Senin – Jumat: 08:00 – 22:00 WIB\nSabtu – Minggu: 07:00 – 23:00 WIB',
  },
  {
    icon: '📱',
    title: 'Kontak',
    content: '+62 812-4977-7345\n@saecaferojel',
  },
  {
    icon: '✨',
    title: 'Fasilitas',
    content: 'Wi-Fi 100Mbps · Parkir Luas · Private Room\nSmoking Area · Pet Friendly · Hi-Fi Sound',
  },
]

export default function Reservation() {
  const sectionRef = useRef(null)
  const toastRef = useRef(null)

  const [form, setForm] = useState({
    name: '', phone: '', date: '', time: '08:00', guests: '2', note: '',
  })

  useEffect(() => {
    if (typeof gsap === 'undefined') return
    const ctx = gsap.context(() => {
      if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('#res-left', { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.fromTo('#res-right', { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const showToast = () => {
    const toast = toastRef.current
    if (!toast || typeof gsap === 'undefined') return
    gsap.fromTo(toast,
      { x: '120%' },
      {
        x: 0, duration: 0.45, ease: 'power3.out',
        onComplete: () => setTimeout(() =>
          gsap.to(toast, { x: '120%', duration: 0.4, ease: 'power2.in' }), 3000
        ),
      }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.date) return

    const msg = encodeURIComponent(
      `Halo SaeCafeRojel! Saya ingin reservasi meja.\n\n` +
      `Nama     : ${form.name}\n` +
      `WhatsApp : ${form.phone}\n` +
      `Tanggal  : ${form.date}\n` +
      `Jam      : ${form.time}\n` +
      `Tamu     : ${form.guests} orang\n` +
      (form.note ? `Catatan  : ${form.note}\n` : '') +
      `\nMohon konfirmasinya, terima kasih! 🙏`
    )

    showToast()
    setTimeout(() => {
      window.open(`https://wa.me/6281249777345?text=${msg}`, '_blank', 'noopener,noreferrer')
    }, 400)
  }

  const inputStyle = {
    width: '100%',
    background: '#1A1A1A',
    border: '1px solid rgba(201,168,76,0.15)',
    color: 'var(--white)',
    padding: '0.75rem 1rem',
    fontSize: '0.85rem',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.3s',
    cursor: 'none',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.6rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    fontWeight: 600,
    marginBottom: '0.4rem',
  }

  return (
    <section
      id="reservasi"
      ref={sectionRef}
      aria-label="Reservasi Meja SaeCafeRojel"
      style={{ background: 'var(--black)', padding: '6rem 3rem' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem' }} className="res-grid">

        {/* Left — Form */}
        <div id="res-left">
          <div className="section-tag">Reservasi</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '0.5rem' }}>
            Pesan <em style={{ color: 'var(--gold)' }}>Meja Anda</em>
          </h2>
          <div className="gold-rule" />
          <p style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '0.85rem', marginBottom: '2rem' }}>
            Isi form di bawah — kami akan konfirmasi via WhatsApp dalam waktu singkat.
          </p>

          <form onSubmit={handleSubmit} noValidate aria-label="Form reservasi meja">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label htmlFor="res-name" style={labelStyle}>Nama Lengkap *</label>
                <input
                  id="res-name" type="text" required placeholder="Nama kamu"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.15)')}
                />
              </div>
              <div>
                <label htmlFor="res-phone" style={labelStyle}>No. WhatsApp *</label>
                <input
                  id="res-phone" type="tel" required placeholder="08xxxxxxxxxx"
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.15)')}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label htmlFor="res-date" style={labelStyle}>Tanggal *</label>
                <input
                  id="res-date" type="date" required
                  value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.15)')}
                />
              </div>
              <div>
                <label htmlFor="res-time" style={labelStyle}>Jam</label>
                <select
                  id="res-time"
                  value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                  style={{ ...inputStyle, cursor: 'none' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.15)')}
                >
                  {['08:00', '10:00', '13:00', '15:00', '18:00', '20:00'].map((t) => (
                    <option key={t} value={t}>{t} WIB</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="res-guests" style={labelStyle}>Jumlah Tamu</label>
              <select
                id="res-guests"
                value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.15)')}
              >
                <option value="1">1 Orang</option>
                <option value="2">2 Orang</option>
                <option value="3-4">3–4 Orang</option>
                <option value="5-8">5–8 Orang (Grup)</option>
                <option value="9+">9+ Orang (Private Event)</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="res-note" style={labelStyle}>Catatan Khusus</label>
              <textarea
                id="res-note"
                rows={3}
                placeholder="Ulang tahun, anniversary, meeting..."
                value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })}
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.15)')}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', fontSize: '0.7rem', padding: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              aria-label="Konfirmasi reservasi via WhatsApp"
            >
              <span>Konfirmasi via WhatsApp</span>
              <span>→</span>
            </button>
          </form>
        </div>

        {/* Right — Info + Maps */}
        <div id="res-right" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div className="section-tag" style={{ marginBottom: '1.25rem' }}>Informasi Cafe</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {INFO.map((item) => (
                <div key={item.title} style={{
                  display: 'flex', gap: '1rem', alignItems: 'flex-start',
                  paddingLeft: '1.25rem',
                  borderLeft: '2px solid var(--gold)',
                }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '0.3rem' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.83rem', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Google Maps */}
          <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.1)' }}>
            <iframe
              title="Lokasi SaeCafeRojel di Google Maps"
              src="https://maps.google.com/maps?q=Jl.+Letkol+Slamet+Wardoyo+No.12+Lumajang&output=embed&z=16"
              width="100%"
              height="220"
              style={{ border: 'none', display: 'block', filter: 'grayscale(0.5) invert(0.9) contrast(0.8)' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <a
            href="https://share.google/bXCk26oEnQpRvtEZp"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            aria-label="Buka di Google Maps"
            style={{ textAlign: 'center' }}
          >
            Buka di Google Maps →
          </a>
        </div>
      </div>

      {/* Toast */}
      <div
        ref={toastRef}
        role="status"
        aria-live="polite"
        style={{
          position: 'fixed',
          bottom: '2rem', right: '2rem',
          background: 'var(--gold)',
          color: 'var(--black)',
          padding: '0.85rem 1.5rem',
          fontWeight: 600,
          fontSize: '0.8rem',
          zIndex: 5000,
          transform: 'translateX(120%)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        ✓ Mengarahkan ke WhatsApp…
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .res-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          section { padding: 4rem 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}
