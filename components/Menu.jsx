'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const TABS = [
  { id: 'main-course', label: '🍽️ Main Course' },
  { id: 'based-coffee', label: '☕ Kopi' },
  { id: 'based-latte', label: '🥛 Latte' },
  { id: 'based-choco', label: '🍫 Choco' },
  { id: 'based-tea', label: '🍵 Tea' },
  { id: 'based-soda', label: '🫧 Soda' },
  { id: 'non-coffee', label: '🌿 Non Kopi' },
  { id: 'traditional', label: '🏺 Tradisional' },
  { id: 'burger', label: '🍔 Burger' },
  { id: 'dimsum', label: '🥟 Dimsum' },
  { id: 'snack', label: '🍟 Snack' },
  { id: 'side-dish', label: '🥬 Side Dish' },
]

const MENU_DATA = {
  'main-course': [
    { name: 'Nasi Goreng Sae', price: '25K', badge: 'Best Seller', img: '/images/menu/Main Course/Nasi Goreng Sae.png' },
    { name: 'Nasi Ayam Laos', price: '28K', badge: 'Pedas', img: '/images/menu/Main Course/Nasi Ayam Laos.png' },
    { name: 'Nasi Rawon', price: '30K', badge: 'Rekomendasi', img: '/images/menu/Main Course/Nasi Rawon.png' },
    { name: 'Nasi Mujaer Bakar', price: '30K', badge: 'Favorit', img: '/images/menu/Main Course/Nasi Mujaer Bakar.png' },
    { name: 'Nasi Ayam Bumbu Sae', price: '28K', badge: 'Pedas', img: '/images/menu/Main Course/Nasi Ayam bumbu sae.png' },
    { name: 'Nasi Ayam Katsu', price: '25K', badge: 'Rekomendasi', img: '/images/menu/Main Course/Nasi Ayam Katsu.png' },
    { name: 'Nasi Goreng Katsu', price: '30K', badge: 'Baru', img: '/images/menu/Main Course/Nasi Goreng Katsu.png' },
    { name: 'Nasi Goreng Seafood', price: '25K', badge: 'Pedas', img: '/images/menu/Main Course/Nasi Goreng Seafood.png' },
    { name: 'Nasi Empal', price: '30K', badge: 'Pedas', img: '/images/menu/Main Course/Nasi Empal.png' },
    { name: 'Nasi Pecel Ayam', price: '18K', badge: 'Favorit', img: '/images/menu/Main Course/Nasi pecel ayam.png' },
    { name: 'Nasi Pecel Empal', price: '20K', badge: 'Pedas', img: '/images/menu/Main Course/Nasi Pecel empal.png' },
    { name: 'Nasi Pecel Telur', price: '15K', badge: '', img: '/images/menu/Main Course/Nasi Pecel telur.png' },
    { name: 'Nasi Krengsengan Daging', price: '30K', badge: 'Pedas', img: '/images/menu/Main Course/Nasi Krengsengan Daging.png' },
    { name: 'Nasi Ayam Teriyaki', price: '20K', badge: '', img: '/images/menu/Main Course/Nasi Ayam Teriyaki.png' },
    { name: 'Nasi Ayam Kampung Laos Sae', price: '35K', badge: 'Premium', img: '/images/menu/Main Course/Nasi Ayam kampung laos Sae.png' },
    { name: 'Nasi Daun Jeruk + Chicken Karage', price: '', badge: '', img: '/images/menu/Main Course/Nasi Daun jeruk with chicken karage.png' },
    { name: 'Nasi Telur', price: '', badge: '', img: '/images/menu/Main Course/Nasi Telur.png' },
    { name: 'Mie Goreng Kampung', price: '18K', badge: 'Pedas', img: '/images/menu/Main Course/Mie Goreng Kampung.png' },
    { name: 'Mie Kuah Kampung', price: '18K', badge: 'Pedas', img: '/images/menu/Main Course/Mie Kuah kampung.png' },
    { name: 'Spaghetti Bolognesse', price: '23K', badge: 'Rekomendasi', img: '/images/menu/Main Course/Spaghetti Bolognesse.png' },
    { name: 'Spaghetti Aglio e Olio', price: '23K', badge: 'Pedas', img: '/images/menu/Main Course/Spaghetti Aglio e Olio.png' },
    { name: 'Beef Teriyaki', price: '25K', badge: 'Baru', img: '/images/menu/Main Course/Beef Teriyaki.png' },
    { name: 'Sup Iga', price: '30K', badge: 'Baru', img: '/images/menu/Main Course/Sup Iga.png' },
    { name: 'Mujaer Goreng', price: '28K', badge: 'Baru', img: '/images/menu/Main Course/Mujaer Goreng.png' },
    { name: 'Capcay Sayur', price: '20K', badge: 'Rekomendasi', img: '/images/menu/Main Course/Capcay Sayur.png' },
  ],
  'based-coffee': [
    { name: 'Americano', price: '17K / 18K', badge: '', img: '/images/menu/Based Coffee/Americano.png' },
    { name: 'Original Milk Coffee', price: '18K', badge: 'Rekomendasi', img: '/images/menu/Based Coffee/Original milk coffee.png' },
    { name: 'Cendol Latte', price: '20K', badge: 'Favorit Gen Z', img: '/images/menu/Based Coffee/Cendol latte.png' },
    { name: 'Aren Milk Coffee', price: '18K', badge: '', img: '/images/menu/Based Coffee/Aren Milk Coffee.png' },
    { name: 'Tiramisu Milk Coffee', price: '18K', badge: '', img: '/images/menu/Based Coffee/Tiramisu Milk Coffee.png' },
    { name: 'Caramel Milk Coffee', price: '18K', badge: '', img: '/images/menu/Based Coffee/Caramel Milk Coffee.png' },
    { name: 'Banana Milk Coffee', price: '18K', badge: '', img: '/images/menu/Based Coffee/Banana Milk Coffee.png' },
    { name: 'Butterscoth Milk Coffee', price: '18K', badge: '', img: '/images/menu/Based Coffee/Butterscoth Milk Coffee.png' },
    { name: 'Hazelnut Milk Coffee', price: '18K', badge: '', img: '/images/menu/Based Coffee/Huzelnut Milk Coffee.png' },
    { name: 'Kopi Susu', price: '14K', badge: '', img: '/images/menu/Based Coffee/Kopi susu.png' },
  ],
  'based-latte': [
    { name: 'Cappucino', price: '16K', badge: '', img: '/images/menu/Based Latte/Cappucino.png' },
    { name: 'Matcha Latte', price: '16K', badge: '', img: '/images/menu/Based Latte/Matcha Latte.png' },
    { name: 'Latte', price: '16K', badge: '', img: '/images/menu/Based Latte/Latte.png' },
    { name: 'Choco Latte', price: '18K', badge: '', img: '/images/menu/Based Latte/Choco Latte.png' },
    { name: 'Mochaccino Latte', price: '18K', badge: '', img: '/images/menu/Based Latte/Mochaccino Latte.png' },
  ],
  'based-choco': [
    { name: 'Chocoffee', price: '18K', badge: '', img: '/images/menu/Based Choco/Chocoffee.png' },
    { name: 'Original Choco', price: '20K', badge: '', img: '/images/menu/Based Choco/Original Choco.png' },
    { name: 'Banana Choco', price: '20K', badge: '', img: '/images/menu/Based Choco/Banana Choco.png' },
    { name: 'Caramel Choco', price: '20K', badge: '', img: '/images/menu/Based Choco/Caramel choco.png' },
    { name: 'Hazelnut Choco', price: '20K', badge: '', img: '/images/menu/Based Choco/Hazelnut Choco.png' },
    { name: 'Berry Choco', price: '20K', badge: '', img: '/images/menu/Based Choco/Berry Choco.png' },
    { name: 'Butterscoth Choco', price: '20K', badge: '', img: '/images/menu/Based Choco/Butterscoth choco.png' },
  ],
  'based-tea': [
    { name: 'Ice Tea', price: '6K', badge: '', img: '/images/menu/Based Tea/Ice Tea.png' },
    { name: 'Milk Tea Ice', price: '16K', badge: '', img: '/images/menu/Based Tea/Milk tea ice.png' },
    { name: 'Chamomile Tea', price: '15K / 16K', badge: '', img: '/images/menu/Based Tea/Chamomile tea.png' },
    { name: 'Lychee Tea', price: '16K', badge: '', img: '/images/menu/Based Tea/Lychee tea.png' },
    { name: 'Lemon Tea', price: '15K / 16K', badge: '', img: '/images/menu/Based Tea/Lemon tea.png' },
    { name: 'Floral Tea', price: '', badge: '', img: '/images/menu/Based Tea/FLoral Tea.png' },
  ],
  'based-soda': [
    { name: 'Berry Bliss', price: '16K', badge: 'Foto-Friendly', img: '/images/menu/Based Soda/Berry Bliss.png' },
    { name: 'Lychee Limind', price: '16K', badge: '', img: '/images/menu/Based Soda/Lychee limind.png' },
    { name: 'Markis Squash', price: '16K', badge: '', img: '/images/menu/Based Soda/Markis Squash.png' },
  ],
  'non-coffee': [
    { name: 'Matcha', price: '18K', badge: '', img: '/images/menu/Non Coffee/Matcha.png' },
    { name: 'Taro', price: '18K', badge: '', img: '/images/menu/Non Coffee/Taro.png' },
    { name: 'Red Velvet', price: '18K', badge: '', img: '/images/menu/Non Coffee/red velvet.png' },
    { name: 'Mango', price: '18K', badge: '', img: '/images/menu/Non Coffee/mango.png' },
  ],
  'traditional': [
    { name: 'Robusta', price: '10K', badge: '', img: '/images/menu/Traditional Drink/Robusta.png' },
    { name: 'Arabika', price: '15K', badge: '', img: '/images/menu/Traditional Drink/Arabica.png' },
    { name: 'Espresso', price: '15K', badge: '', img: '/images/menu/Traditional Drink/Espresso.png' },
    { name: 'Teh Panas', price: '6K', badge: '', img: '/images/menu/Traditional Drink/Teh panas.png' },
    { name: 'Teh Jahe Panas', price: '10K', badge: '', img: '/images/menu/Traditional Drink/Teh jahe panas.png' },
    { name: 'Teh Serai Panas', price: '10K', badge: '', img: '/images/menu/Traditional Drink/Teh Serai panas.png' },
    { name: 'Teh Serai Jahe Panas', price: '12K', badge: '', img: '/images/menu/Traditional Drink/Teh serai jahe panas.png' },
    { name: 'Jahe Panas', price: '8K', badge: '', img: '/images/menu/Traditional Drink/Jahe panas.png' },
    { name: 'Jahe Serai Panas', price: '10K', badge: '', img: '/images/menu/Traditional Drink/Jahe Serai Panas.png' },
    { name: 'Lemon Serai Mint', price: '10K', badge: '', img: '/images/menu/Traditional Drink/Lemon serai mint.png' },
    { name: 'Jeruk Panas', price: '6K', badge: '', img: '/images/menu/Traditional Drink/Jeruk Panas.png' },
  ],
  'burger': [
    { name: 'Burger Chicken Classic', price: '20K', badge: '', img: '/images/menu/Burger/Burger chicken classic.png' },
    { name: 'Burger Beef SAE', price: '23K', badge: '', img: '/images/menu/Burger/Burger beef cae.png' },
    { name: 'Burger Crispy Chicken SAE', price: '23K', badge: '', img: '/images/menu/Burger/Burger crispy chicken sae.png' },
    { name: 'Burger Chicken SAE', price: '23K', badge: '', img: '/images/menu/Burger/Burger chicken sae.png' },
  ],
  'dimsum': [
    { name: 'Siomay Ayam', price: '12K', badge: '', img: '/images/menu/Dimsum/Siomay Ayam.png' },
    { name: 'Kocoi Ayam', price: '12K', badge: '', img: '/images/menu/Dimsum/Kocoi Ayam.png' },
    { name: 'Wotiek Kuotie', price: '12K', badge: '', img: '/images/menu/Dimsum/Wotiek Kuotie.png' },
    { name: 'Tim Tahu', price: '12K', badge: '', img: '/images/menu/Dimsum/Tim Tahu.png' },
    { name: 'Siomay Kepiting', price: '12K', badge: '', img: '/images/menu/Dimsum/Siomay Kepiting.png' },
    { name: 'Dimsum Mozzarella', price: '12K', badge: '', img: '/images/menu/Dimsum/Dimsum mozzarella.png' },
    { name: 'Dimsum Mentai', price: '15K', badge: 'Baru', img: '/images/menu/Dimsum/Dimsum Mentai.png' },
  ],
  'snack': [
    { name: 'Seblak Komplit', price: '15K', badge: 'Pedas', img: '/images/menu/Snack/Seblak Komplit.png' },
    { name: 'Seblak Cireng', price: '15K', badge: 'Pedas', img: '/images/menu/Snack/Seblak Cireng.png' },
    { name: 'Pisang Goreng Original', price: '12K', badge: '', img: '/images/menu/Snack/Pisang goreng original.png' },
    { name: 'Pisang Goreng Keju', price: '12K', badge: '', img: '/images/menu/Snack/Pisang Goreng Keju.png' },
    { name: 'Pisang Goreng Coklat', price: '12K', badge: '', img: '/images/menu/Snack/Pisang goreng coklat.png' },
    { name: 'Pisang Goreng Coklat Keju', price: '15K', badge: '', img: '/images/menu/Snack/pisang goreng coklat keju.png' },
    { name: 'Churros', price: '13K', badge: '', img: '/images/menu/Snack/Churros.png' },
    { name: 'French Fries', price: '13K', badge: '', img: '/images/menu/Snack/French fries.png' },
    { name: 'Potato Wedges', price: '15K', badge: '', img: '/images/menu/Snack/Potato Wedges.png' },
    { name: 'Donut Matcha', price: '12K', badge: '', img: '/images/menu/Snack/Donut Matcha.png' },
    { name: 'Donut Coklat', price: '12K', badge: '', img: '/images/menu/Snack/Donut coklat.png' },
    { name: 'Donut Gula', price: '12K', badge: '', img: '/images/menu/Snack/Donut Gula.png' },
    { name: 'Roti Maryam Coklat', price: '12K', badge: '', img: '/images/menu/Snack/Roti maryam coklat.png' },
    { name: 'Roti Maryam Keju', price: '12K', badge: '', img: '/images/menu/Snack/Roti maryam keju.png' },
    { name: 'Roti Maryam Coklat Keju', price: '15K', badge: '', img: '/images/menu/Snack/Roti maryam coklat keju.png' },
    { name: 'Roti Panggang Strawberry', price: '13K', badge: '', img: '/images/menu/Snack/Roti panggang Strawberry.png' },
    { name: 'Roti Panggang Keju', price: '13K', badge: '', img: '/images/menu/Snack/Roti panggang keju.png' },
    { name: 'Roti Panggang Coklat', price: '13K', badge: '', img: '/images/menu/Snack/Roti panggang coklat.png' },
    { name: 'Roti Panggang Coklat Keju', price: '15K', badge: '', img: '/images/menu/Snack/Roti Panggang Coklat Keju.png' },
    { name: 'Pudding', price: '10K', badge: '', img: '/images/menu/Snack/Pudding.png' },
    { name: 'Pudding Fantasi', price: '10K', badge: '', img: '/images/menu/Snack/Pudding Fantasi.png' },
    { name: 'Banana Ice Cream', price: '15K', badge: 'Baru', img: '/images/menu/Snack/Banana Ice Cream.png' },
    { name: 'Mile Crepe', price: '18K', badge: 'Baru', img: '/images/menu/Snack/Mile Crepe.png' },
    { name: 'Risoles Sayur', price: '17K', badge: 'Baru', img: '/images/menu/Snack/Risoles Sayur.png' },
    { name: 'Kebab', price: '14K', badge: '', img: '/images/menu/Snack/Kebab.png' },
    { name: 'Tahu Walik', price: '15K', badge: '', img: '/images/menu/Snack/Tahu Walik.png' },
    { name: 'Tempe Mendoan', price: '12K', badge: '', img: '/images/menu/Snack/Tempe mendoan.png' },
    { name: 'Bakwan Sae', price: '12K', badge: '', img: '/images/menu/Snack/Bakwan Sae.png' },
    { name: 'Rujak Cireng', price: '13K', badge: '', img: '/images/menu/Snack/Rujak Cireng.png' },
    { name: 'Sempol Goreng', price: '15K', badge: '', img: '/images/menu/Snack/Sempol Goreng.png' },
    { name: 'Spring Roll', price: '12K', badge: '', img: '/images/menu/Snack/Spring roll.png' },
    { name: 'Nutasos', price: '15K', badge: '', img: '/images/menu/Snack/Nutasos.png' },
    { name: 'Singkong Ori & Singkong Keju', price: '12K / 15K', badge: '', img: '/images/menu/Snack/Singkong Ori & SIngkong Keju.png' },
  ],
  'side-dish': [
    { name: 'Cah Pokcoy', price: '12K', badge: '', img: '/images/menu/Side Dish/Cah Pokcoy.png' },
    { name: 'Cah Kangkung', price: '10K', badge: '', img: '/images/menu/Side Dish/Cah Kangkung.png' },
    { name: 'Cah Toge', price: '10K', badge: '', img: '/images/menu/Side Dish/Cah Toge.png' },
  ],
}

function MenuCard({ item }) {
  return (
    <div
      className="menu-card"
      style={{ borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '180px', background: '#1E1E1E', flexShrink: 0 }}>
        <Image
          src={item.img}
          alt={item.name}
          fill
          style={{ objectFit: 'cover' }}
          quality={75}
          loading="lazy"
        />
        {item.badge && (
          <div style={{
            position: 'absolute', top: '0.75rem', left: '0.75rem',
            background: 'rgba(201,168,76,0.15)',
            border: '1px solid rgba(201,168,76,0.3)',
            color: 'var(--gold)',
            fontSize: '0.55rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '0.2rem 0.5rem',
            fontWeight: 500,
          }}>
            {item.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1rem 1.1rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <h3
          className="font-display"
          style={{ fontSize: '0.95rem', color: 'var(--white)', lineHeight: 1.3, fontWeight: 400 }}
        >
          {item.name}
        </h3>
        {item.price && (
          <div
            className="font-display"
            style={{ color: 'var(--gold)', fontSize: '1rem', fontWeight: 700, marginTop: 'auto' }}
          >
            Rp {item.price}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('based-coffee')
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  const switchTab = (id) => {
    setActiveTab(id)
    requestAnimationFrame(() => {
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(
          '.menu-card',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' }
        )
      }
    })
  }

  useEffect(() => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo(
        '#menu-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Animate cards on initial render
  useEffect(() => {
    if (typeof gsap !== 'undefined') {
      requestAnimationFrame(() => {
        gsap.fromTo(
          '.menu-card',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' }
        )
      })
    }
  }, [activeTab])

  const items = MENU_DATA[activeTab] || []

  return (
    <section
      id="menu"
      ref={sectionRef}
      aria-label="Menu SaeCafeRojel"
      style={{ background: 'var(--black)', padding: '6rem 3rem' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div id="menu-header" style={{ marginBottom: '2.5rem' }}>
          <div className="section-tag">Menu Kami</div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '0.5rem' }}
          >
            Pilihan <em style={{ color: 'var(--gold)' }}>Favorit</em>
          </h2>
          <p style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '0.85rem', maxWidth: '480px' }}>
            118+ menu pilihan — dari kopi signature hingga comfort food khas Jawa Timur,
            semuanya dibuat dengan bahan terpilih.
          </p>
        </div>

        {/* Tabs */}
        <div className="tabs-scroll" role="tablist" aria-label="Kategori menu" style={{ marginBottom: '2rem' }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`menu-panel-${tab.id}`}
              onClick={() => switchTab(tab.id)}
              className="tab-btn"
              style={{
                flexShrink: 0,
                padding: '0.55rem 1rem',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 500,
                border: `1px solid ${activeTab === tab.id ? 'var(--gold)' : 'rgba(201,168,76,0.2)'}`,
                background: activeTab === tab.id ? 'var(--gold)' : 'transparent',
                color: activeTab === tab.id ? 'var(--black)' : 'var(--muted)',
                cursor: 'pointer',
                transition: 'all 0.25s',
                whiteSpace: 'nowrap',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          id={`menu-panel-${activeTab}`}
          ref={gridRef}
          role="tabpanel"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.2rem',
          }}
        >
          {items.map((item) => (
            <MenuCard key={item.name} item={item} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <a
            href="https://wa.me/6281249777345?text=Halo%20SaeCafeRojel!%20Saya%20mau%20tanya%20tentang%20menu."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            aria-label="Tanya menu via WhatsApp"
          >
            Tanya Menu via WhatsApp →
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section { padding: 4rem 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}
