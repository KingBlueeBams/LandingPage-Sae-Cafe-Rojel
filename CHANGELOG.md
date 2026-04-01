# SaeCafeRojel — Changelog & Update Log

> Dokumen ini merangkum seluruh perubahan yang dilakukan pada landing page SaeCafeRojel.
> Terakhir diperbarui: **1 April 2026, 21:52 WIB**

---

## Session 1 — Foundation & Initial Build
**Tanggal:** 1 April 2026 (pagi)

### Komponen yang Dibuat
| File | Deskripsi |
|---|---|
| `app/layout.jsx` | Root layout dengan metadata SEO, Google Fonts (Playfair Display + Poppins), dan GSAP CDN via `next/script` |
| `app/page.jsx` | Halaman utama yang merender semua section secara berurutan |
| `app/globals.css` | Design system awal dengan variabel warna dan utility classes |
| `components/Navbar.jsx` | Navigation bar dengan link anchor dan tombol "Pesan Meja" |
| `components/Hero.jsx` | Hero section dengan background image, headline, sub-copy, CTA buttons, dan statistik |
| `components/About.jsx` | Section "Tentang Kami" dengan USP list, foto interior, dan review card (Rating Google 4.7) |
| `components/Menu.jsx` | Menu section dengan 12 kategori tab dan 118+ item menu dari PDF |
| `components/Gallery.jsx` | Galeri foto dengan asymmetric grid dan hover label animation |
| `components/LiveMusic.jsx` | Jadwal live music 4x seminggu dengan dynamic "Malam Ini" highlight |
| `components/Reservation.jsx` | Form reservasi yang mengirim ke WhatsApp + Google Maps embed |
| `components/Footer.jsx` | Footer dengan copyright dan social links |
| `components/CustomCursor.jsx` | Custom cursor dot + ring dengan GSAP tracking |
| `components/WhatsAppFloat.jsx` | Floating WhatsApp button (fixed bottom-right) |

### Data & Asset
- Semua 118+ item menu dimasukkan sesuai PDF asli dengan nama, harga, dan badge
- Foto menu dari folder `ASSET/Menu/` di-copy ke `public/images/menu/`
- Foto cafe dari folder `ASSET/` di-copy ke `public/images/cafe/`
- Logo dari `ASSET/Logo Horizontal putih.png`

### Informasi Bisnis yang Terintegrasi
- WhatsApp: +62 812-4977-7345
- Instagram: @saecaferojel
- Google Maps: https://share.google/bXCk26oEnQpRvtEZp
- Tagline: "Rasa Premium, Suara Premium. Ruang untuk Momen Terbaikmu."
- Berdiri: 2024, Rating Google: 4.7

---

## Session 2 — Premium UI Upgrade (GSAP + Motion Design)
**Tanggal:** 1 April 2026 (malam)

### 1. `app/globals.css` — Re-Implementasi Design System
**Status:** ✅ Selesai

Perubahan:
- **CSS Variables:** Re-implement premium dark-gold palette (`--gold: #C9A84C`, `--black: #0A0A0A`, `--white: #F8F6F1`)
- **`.section-padding`:** Utility class baru untuk whitespace masif (`padding: 8rem 3rem`, responsive ke `5rem 1.5rem`)
- **`.menu-card`:** Hover effect dengan `scale(1.03)`, border glow gold, dan box-shadow
- **`.btn-primary`:** Pill-style button dengan hover translate + shadow
- **`.btn-ghost`:** Underline-style ghost button
- **`.section-tag`:** Label uppercase dengan gold line prefix
- **`.tabs-scroll`:** Horizontal scrollable tabs tanpa scrollbar
- **Custom scrollbar:** Slim 4px dengan gold thumb
- **Selection color:** Gold background, black text
- **Focus ring:** Gold outline untuk aksesibilitas
- **Reduced motion:** Respect `prefers-reduced-motion`

### 2. `components/Hero.jsx` — macOS Dock Effect + GSAP Timeline
**Status:** ✅ Selesai

Perubahan:
- **`HeadlineLine` component:** Split teks headline menjadi individual `<span>` per karakter
- **macOS Dock Effect:** Proximity-based scaling — karakter membesar (scale 1.35) dan berubah warna ke `--gold-light` saat cursor mendekat (radius 120px). Desktop only (`window.innerWidth >= 1024`)
- **GSAP Entrance Timeline:**
  1. `#hero-tag` fade-in
  2. `.headline-char` stagger reveal (0.018s per karakter, `back.out(1.7)` ease)
  3. `#hero-sub` fade-in
  4. `#hero-btns` fade-in
  5. `#hero-stats` fade-in
  6. `#hero-bg-img` scale-down dari 1.08 → 1 (2.5s, concurrent)
- **Gold glow parallax:** Elemen dekoratif radial-gradient yang bergerak saat scroll (ScrollTrigger scrub)
- **Scroll indicator:** Animasi "scroll" text + gradient line di bottom center
- **Layout:** "Suara Premium." dalam satu baris (whiteSpace: nowrap)
- **Stats grid:** 4.7 Rating | 118+ Menu | 2024 Berdiri

### 3. `components/Menu.jsx` — Bento Grid + Strict Category Tabs
**Status:** ✅ Selesai

Perubahan:
- **12 Kategori Tab:** Main Course, Kopi, Latte, Choco, Tea, Soda, Non Kopi, Tradisional, Burger, Dimsum, Snack, Side Dish
- **118+ item menu:** Data lengkap dengan nama, harga, badge, dan path gambar
- **Bento Grid:** CSS Grid dengan `repeat(auto-fill, minmax(200px, 1fr))`
- **Uniform card sizing:** Fixed image height `180px` dengan `objectFit: cover` + `objectPosition: center`
- **Badge system:** Semi-transparent gold badge (Best Seller, Pedas, Baru, Favorit, dll.)
- **Tab switching animation:** GSAP stagger fade-in (0.04s per card)
- **Header scroll animation:** Fade-up on scroll (ScrollTrigger)
- **Global WhatsApp CTA:** Single "Tanya Menu via WhatsApp →" link (clutter-free, tanpa tombol per card)

### 4. Section-wide Whitespace Upgrade
**Status:** ✅ Selesai

File yang diupdate:
| File | Perubahan |
|---|---|
| `components/About.jsx` | Inline `padding: '6rem 3rem'` → `className="section-padding"` |
| `components/Gallery.jsx` | Inline `padding: '6rem 3rem'` → `className="section-padding"` |
| `components/LiveMusic.jsx` | Inline `padding: '6rem 3rem'` → `className="section-padding"` |
| `components/Reservation.jsx` | Inline `padding: '6rem 3rem'` → `className="section-padding"` |

Efek: Semua section sekarang memiliki padding vertikal `8rem` (128px) untuk estetika minimalis premium, dengan responsive fallback `5rem` pada mobile.

### 5. Menu Card Uniformity Fix
**Status:** ✅ Selesai

Masalah: Beberapa gambar menu terlalu besar karena menggunakan `aspectRatio: 1/1` dan `isSignature` items menggunakan `col-span-2` + `16/9`.

Solusi:
- Semua card menggunakan **fixed height `180px`** untuk image container
- `objectFit: cover` + `objectPosition: center` memastikan crop yang proporsional
- Hapus logika `col-span-2` untuk signature items — semua card ukuran sama
- Tambah `sizes` attribute untuk optimasi loading image
- Tambah `overflow: hidden` pada image container

---

## Tech Stack
| Teknologi | Versi | Penggunaan |
|---|---|---|
| Next.js | 16.2.2 | Framework (App Router) |
| React | 19.x | UI Library |
| GSAP | 3.12.5 | Animation Engine (CDN) |
| ScrollTrigger | 3.12.5 | Scroll-based animations (CDN) |
| Playfair Display | Google Fonts | Heading typography |
| Poppins | Google Fonts | Body typography |
| next/image | Built-in | Optimized image loading |

## Design Decisions
1. **Palet warna:** Dark (#0A0A0A) + Gold (#C9A84C) — TIDAK menggunakan Light Mode
2. **Arsitektur:** JavaScript (.jsx) — TIDAK menggunakan TypeScript
3. **Styling:** Vanilla CSS + inline styles — TIDAK menggunakan Tailwind (kecuali import)
4. **Menu CTA:** Link WhatsApp general (bukan tombol per card) untuk desain clutter-free
5. **macOS Dock Effect:** Hanya pada headline Hero untuk menjaga kebersihan visual
6. **Font:** Playfair Display (heading) + Poppins (body)

---

*File ini dibuat sebagai dokumentasi internal proyek SaeCafeRojel.*
