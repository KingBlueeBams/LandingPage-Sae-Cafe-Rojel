# LAPORAN EKSKLUSIF: Di Balik Layar Pembuatan Landing Page SaeCafeRojel

*Ditulis oleh Jurnalis Teknologi*  
*Sebuah Panduan SOP Definitif dari Nol hingga Rilis*

Di jantung Kota Lumajang, tersimpan sebuah revolusi digital dari kafe lokal yang memposisikan dirinya bukan sekadar tempat mengopi, melainkan **Mini-Concert & Lifestyle Hub**. Kami membongkar dokumen rahasia di balik pengembangan antarmuka (UI) dan pengalaman pengguna (UX) web premium SaeCafeRojel. 

Dokumen ini merupakan **Standard Operating Procedure (SOP)** definitif yang menggabungkan arahan *"Next Prompt"* dan cetak biru fungsionalitas *"SKILL.md"*. Jika Anda diinstruksikan untuk membangun ulang atau menjaga kode ini, ikuti pedoman mutlak di bawah ini.

---

## 1. Fondasi Arsitektur & Teknologi

*“Jangan kompromi pada performa. Ini adalah kanvas digital kelas atas.”*

Proyek ini wajib dibangun dengan perpaduan teknologi yang modern, presisi, dan menghindari beban berat animasi tradisional:
- **Framework Utama:** Next.js 14+ (App Router). Ini bukan proyek SPA biasa; arsitekturnya harus modular, bukan satu file raksasa.
- **Styling Engine:** Tailwind CSS. Eksekusi desain dengan kelas-kelas utilitas yang bersih.
- **Dinamika & Koreografi (Krusial):** GSAP (GreenSock) versi 3.12+ bersama ScrollTrigger. **Dilarang keras menggunakan CSS transition murni untuk motion utama**. Bahkan efek sederhana pun harus dilalui lewat `gsap.to()`. Hindari `framer-motion` demi efisiensi jika GSAP sudah aktif.
- **Manajemen Aset:** `<Image>` dari Next.js wajib digunakan pada seluruh aset foto, dilengkapi properti `priority` pada elemen LCP (seperti Logo dan Hero Cover).

---

## 2. Visi Desain: Dualitas Target & Estetika Premium

Awalnya, panduan (*Next Prompt*) mengamanatkan "Strict Light Mode" layaknya Apple/Stripe. Namun dalam perkembangannya, menyesuaikan dengan nuansa kafe malam hari yang eksklusif, **SOP ini telah berevolusi menjadi skema warna Dark-Gold Premium**.

### Palet Warna Sensori
Hanya gunakan entitas CSS variables berikut agar konsisten:
- **Hitam Elegan:** `--black: #0A0A0A`
- **Putih Kertas:** `--white: #F8F6F1`
- **Emas Premium:** `--gold: #C9A84C` (Gunakan Emas untuk aksen, interaksi *hover*, dan fokus *ring* aksesibilitas).

### Tipografi & Ruang Kosong (Whitespace)
- **Whitespace Masif:** Bebaskan ruang! Gunakan `.section-padding` (`py-32`) untuk memberikan jeda pernapasan di antara 8 segmen beranda.
- **Font:** Teks bodi meluncur dengan keluwesan **Poppins**. Judul (Heading) harus menyuarakan eksklusivitas melalui **Made Mirage** (atau Playfair Display sebagai *fallback*).

### Persona Pengguna
Sistem desain harus memoderasi dua segmen audiens secara harmoni:
1. **Persona A (Gen Z/Mahasiswa):** Gaya *bold*, instagrammable, menonjolkan spot *Me-Time* dan racikan kopi ala "Cendol Latte".
2. **Persona B (Keluarga/Orang Tua):** Kenyamanan hangat *We-Time* dan opsi makanan nostalgia (Nasi Goreng & Pecel).

---

## 3. Koreografi Animasi Global (Mencegah FOUC)

Seorang *Front-End Developer* senior tidak akan membiarkan layarnya berkedip tanpa gaya saat dimuat pertama kali. 

### A. Tarian Pembuka (Hero Section)
Gunakan `useGSAP()` untuk membungkus `gsap.timeline({ defaults: { ease: "power3.out" } })`. 
Instruksi Koreografi:
1. Kemunculan elemen teks (fade-in + slide up).
2. Efek pembesaran modular: saat kursor mendekat ke karakter judul, karakter akan membesar meniru **macOS Dock Effect**.
3. **Continuous Subtle Zoom:** Latar belakang Hero harus terus membesar (*zoom in*) sangat lambat (durasi 35 detik, *yoyo loop*) tanpa pernah berhenti.

### B. Transisi Gulir (ScrollTrigger)
Setiap elemen utama (Galeri, Tentang Kami, Jadwal Live Music) dilarang muncul mendadak. 
- Harus dipicu saat jarak gulir mencapai `top 85%` dari *viewport*.
- Semua konten melayang pelan dari `translateY: 60` menuju proporsi nol, berdurasi lamban `1.5s` dengan fungsi perlambatan ekstrem `expo.out`.

---

## 4. Arsitektur "The Menu" (Manajemen Visual 100+ Item)

Menyajikan menu lebih dari 118 varian tidak boleh mendegradasi *frame rate* atau membebani DOM.
- **State Logic Kategorikal:** Terapkan *"Strict Category Tabs"* via React `useState`. Render ke DOM *hanya* item yang diklik per kategori (Contoh: "Main Course", "Latte", "Dimsum").
- **Grid Bento Terkendali:** Setiap menu dirender dalam *card* dengan batas *fixed height* elegan (180px) menggunakan rasio `object-fit: cover`. 
- **Micro-interactions:** Setiap kartu wajib dipasangi `group-hover:scale-110` dalam parameter `duration-700 ease-out` guna mengguncang selera pengunjung begitu *pointer* didekatkan.

---

## 5. Implementasi AI Chatbot (Eksklusif)

Sebagai fitur *Lifestyle Hub* mutakhir, intervensi Anthropic API disisipkan ke dalam sistem.
- Bangun komponen `Chatbot.jsx`.
- Posisikan secara *floating* di layar sudut pengguna.
- Sistem *prompt* memandu Model untuk menjawab pertanyaan krusial seputar *Hi-Fi Sound System*, Jam Buka, Harga Menu (misal: *Noir Espresso Rp28rb*), dan peruntukan wilayah (*Smoking* atau *Me-Time/We-Time*).

---

## Ringkasan Eksekusi Siar Jurnalis
Dalam mengeksekusi kerangka di atas, Anda tidak hanya diizinkan tetapi **diwajibkan** untuk menjalankan pedoman React & Tailwind dari standar Vercel terbaik (mirip penerapan skill eksternal `web-design-guidelines` dan `ui-ux-pro-max`).

Anda bukan anak magang hari ini; baca SOP ini kembali jika ragu. Hasilkan komponen modular (`Reservation.jsx`, `Menu.jsx`, `Hero.jsx`) dan pastikan *cleanup event listeners* GSAP via `ctx.revert()` dieksekusi dengan murni guna mencegah kebocoran memori. 

Selamat menyeduh kode!
*(Dokumen SOP Resmi - Dilarang keras mengganti stack kecuali ada izin khusus)*
