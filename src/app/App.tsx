import { useState, useEffect } from "react"
import { motion } from "motion/react"
import {
  Heart, Menu, X, Smartphone, Globe, Music, Users, MapPin,
  QrCode, Edit3, Layout, Type, Image, Palette, Settings,
  LogOut, Eye, Share2, MessageCircle, Clock, Gift, Camera, Home,
  FileText, Bell, Headphones, Check, ArrowRight, Layers,
  Zap, User, TrendingUp, ChevronRight, Monitor, Plus, Sparkles,
  Play, Instagram, Facebook, Twitter,
  CreditCard, Wallet, Building2, Store, Download, RefreshCw,
  CheckCircle2, XCircle, AlertCircle, Copy, Phone, Mail,
  Shield, Search, Receipt, Star, Package,
  HelpCircle, Newspaper, Award, FileDown, ExternalLink
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Toaster, toast } from "sonner"

type Page =
  | "landing"
  | "login"
  | "dashboard"
  | "editor"
  | "checkout"
  | "payment-method"
  | "payment-waiting"
  | "payment-success"
  | "payment-failed"
  | "fitur"
  | "tema"
  | "harga"
  | "blog"
  | "tentang"
  | "karir"
  | "kontak"
  | "panduan"
  | "privasi"
  | "syarat"
  | "cookie"
  | "faq"
  | "press-kit"
  | "whatsapp-support"

type AuthTab = "login" | "register"

// ─── DATA ───────────────────────────────────────────────────────────────────
const WHY_US = [
  { icon: Smartphone, title: "Mudah Digunakan", desc: "Buat undangan dalam hitungan menit, tanpa keahlian desain apapun" },
  { icon: Edit3, title: "Edit Lewat HP", desc: "Akses dan edit undangan kapan saja dari perangkat apapun" },
  { icon: Zap, title: "Proses Cepat", desc: "Undangan siap dibagikan hanya dalam waktu singkat" },
  { icon: Sparkles, title: "Tampilan Elegan", desc: "Desain premium yang memukau setiap tamu undangan Anda" },
  { icon: Gift, title: "Harga Terjangkau", desc: "Paket lengkap dengan harga yang ramah di kantong" },
  { icon: Layers, title: "Banyak Pilihan Tema", desc: "Ratusan tema siap pakai untuk setiap selera dan konsep" },
  { icon: Headphones, title: "Support 24/7", desc: "Tim kami selalu siap membantu kapanpun Anda butuhkan" },
]

const FEATURES = [
  { icon: Globe, label: "Custom Domain" },
  { icon: Users, label: "Custom Nama Tamu" },
  { icon: Music, label: "Custom Musik Latar" },
  { icon: Palette, label: "Tema & Custom Penuh" },
  { icon: MessageCircle, label: "Form RSVP & Ucapan" },
  { icon: Gift, label: "Amplop Digital" },
  { icon: Clock, label: "Hitung Mundur Acara" },
  { icon: MapPin, label: "Google Maps" },
  { icon: Camera, label: "Galeri Foto & Video" },
  { icon: Monitor, label: "Live Streaming" },
  { icon: QrCode, label: "QR Code Check-In" },
  { icon: Users, label: "Layar Sapa & Counter" },
  { icon: Smartphone, label: "Edit via HP" },
  { icon: Plus, label: "Tambah/Kurangi Halaman" },
  { icon: Layers, label: "Atur Urutan Halaman" },
  { icon: Layout, label: "Beragam Layout" },
  { icon: Image, label: "Custom Background" },
  { icon: Palette, label: "Custom Warna" },
  { icon: Type, label: "Custom Font" },
  { icon: Edit3, label: "Custom Ukuran Font" },
]

const THEMES = [
  { name: "Elegant", img: "1519225421980-715cb0215aed", badge: "Populer" },
  { name: "Floral", img: "1550005809-91ad75fb315f", badge: "" },
  { name: "Minimalist", img: "1464366400600-7168b8af9bc3", badge: "Baru" },
  { name: "Modern", img: "1469371670807-013ccf25f16a", badge: "" },
  { name: "Traditional", img: "1583939003579-730e3918a45a", badge: "" },
  { name: "Luxury", img: "1519741497674-611481863552", badge: "Premium" },
]

const TESTIMONIALS = [
  {
    name: "Anisa & Raka Pratama",
    avatar: "1438761681033-6461ffad8d80",
    rating: 5,
    text: "Undangan digital kami begitu cantik dan mudah dibagikan ke seluruh keluarga. Tamu sangat terkesan dengan tampilannya!",
    date: "Menikah 12 Januari 2025",
  },
  {
    name: "Putri & Dimas Santoso",
    avatar: "1494790108755-2616b612b977",
    rating: 5,
    text: "Proses pembuatannya sangat cepat, hanya 30 menit sudah jadi. Fitur RSVP-nya membantu kami mengelola daftar tamu dengan efisien.",
    date: "Menikah 8 Maret 2025",
  },
  {
    name: "Sari & Budi Hartono",
    avatar: "1507003211169-0a1dd7228f2d",
    rating: 5,
    text: "Harga sangat terjangkau untuk kualitas yang luar biasa. Amplop digital-nya memudahkan tamu memberikan hadiah secara online.",
    date: "Menikah 22 Februari 2025",
  },
]

const STEPS = [
  { num: "01", title: "Daftar atau Login", desc: "Buat akun gratis dan mulai perjalanan undangan impian Anda", icon: User },
  { num: "02", title: "Pilih Template", desc: "Pilih dari ratusan tema elegan yang sesuai selera Anda", icon: Layout },
  { num: "03", title: "Edit Undangan", desc: "Kustomisasi setiap detail dengan editor yang mudah digunakan", icon: Edit3 },
  { num: "04", title: "Bagikan ke Tamu", desc: "Kirim link undangan via WhatsApp, Instagram, atau media sosial", icon: Share2 },
]

const CHART_DATA = [
  { day: "Sen", views: 120 },
  { day: "Sel", views: 185 },
  { day: "Rab", views: 148 },
  { day: "Kam", views: 220 },
  { day: "Jum", views: 390 },
  { day: "Sab", views: 530 },
  { day: "Min", views: 447 },
]

const SIDEBAR_NAV = [
  { icon: Home, label: "Dashboard" },
  { icon: Layout, label: "Template" },
  { icon: FileText, label: "Undangan Saya" },
  { icon: Edit3, label: "Edit Undangan" },
  { icon: Users, label: "Data Tamu" },
  { icon: MessageCircle, label: "RSVP" },
  { icon: Gift, label: "Amplop Digital" },
  { icon: QrCode, label: "QR Check-In" },
  { icon: Globe, label: "Domain" },
  { icon: Receipt, label: "Transaksi" },
  { icon: Settings, label: "Pengaturan" },
]

const EDITOR_TABS = [
  { icon: Layout, label: "Halaman" },
  { icon: Palette, label: "Tema" },
  { icon: Image, label: "Background" },
  { icon: Type, label: "Font" },
  { icon: Music, label: "Musik" },
  { icon: Camera, label: "Foto" },
]

const PAGES_LIST = ["Opening", "Mempelai", "Akad", "Resepsi", "Galeri", "RSVP", "Ucapan", "Penutup"]

const PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    subtitle: "Untuk pasangan yang ingin memulai",
    price: 99000,
    originalPrice: null as number | null,
    features: ["1 tema pilihan", "Link undangan digital", "RSVP & ucapan tamu", "Galeri foto 10 item", "Tanpa custom domain", "Berlaku 6 bulan"],
    popular: false,
    color: "border-border",
  },
  {
    id: "standard",
    name: "Standard",
    subtitle: "Paling populer untuk pasangan",
    price: 199000,
    originalPrice: 299000 as number | null,
    features: ["Semua tema + custom", "Custom domain .id", "RSVP & amplop digital", "Galeri foto & video tak terbatas", "Musik latar", "Hitung mundur & Google Maps", "Berlaku 1 tahun"],
    popular: true,
    color: "border-primary",
  },
  {
    id: "premium",
    name: "Premium",
    subtitle: "Pengalaman undangan paling lengkap",
    price: 349000,
    originalPrice: 499000 as number | null,
    features: ["Semua fitur Standard", "Live streaming", "QR Code Check-In", "Layar sapa & counter", "Custom nama tamu", "Support prioritas 24/7", "Berlaku selamanya"],
    popular: false,
    color: "border-border",
  },
]

type MethodItem = { code: string; name: string; fee: string; badge?: string; bg: string; fg: string }
type MethodGroup = { id: string; label: string; icon: React.ElementType; items: MethodItem[] }

const PAYMENT_GROUPS: MethodGroup[] = [
  {
    id: "va",
    label: "Virtual Account",
    icon: Building2,
    items: [
      { code: "BCA", name: "BCA Virtual Account", fee: "Gratis", bg: "#003D6E", fg: "#FFFFFF" },
      { code: "BNI", name: "BNI Virtual Account", fee: "Gratis", bg: "#E65C00", fg: "#FFFFFF" },
      { code: "BRI", name: "BRI Virtual Account", fee: "Gratis", bg: "#003F87", fg: "#FFFFFF" },
      { code: "MANDIRI", name: "Mandiri Virtual Account", fee: "Gratis", bg: "#1A3A6B", fg: "#F5C842" },
      { code: "PERMATA", name: "Permata Virtual Account", fee: "Gratis", bg: "#6B1740", fg: "#FFFFFF" },
      { code: "BSI", name: "BSI Virtual Account", fee: "Gratis", bg: "#00703C", fg: "#FFFFFF" },
    ],
  },
  {
    id: "ewallet",
    label: "E-Wallet",
    icon: Wallet,
    items: [
      { code: "GOPAY", name: "GoPay", fee: "Gratis", badge: "Populer", bg: "#00AED6", fg: "#FFFFFF" },
      { code: "OVO", name: "OVO", fee: "Gratis", bg: "#4C3494", fg: "#FFFFFF" },
      { code: "DANA", name: "DANA", fee: "Gratis", bg: "#118EEA", fg: "#FFFFFF" },
      { code: "SHOPEEPAY", name: "ShopeePay", fee: "Gratis", bg: "#EE4D2D", fg: "#FFFFFF" },
      { code: "LINKAJA", name: "LinkAja", fee: "Gratis", bg: "#E2173F", fg: "#FFFFFF" },
    ],
  },
  {
    id: "qris",
    label: "QRIS",
    icon: QrCode,
    items: [{ code: "QRIS", name: "QRIS", fee: "Gratis", badge: "Semua E-Wallet", bg: "#CC0000", fg: "#FFFFFF" }],
  },
  {
    id: "card",
    label: "Kartu Kredit",
    icon: CreditCard,
    items: [
      { code: "VISA", name: "Visa", fee: "2,9%", bg: "#1A1F71", fg: "#FFFFFF" },
      { code: "MASTERCARD", name: "Mastercard", fee: "2,9%", bg: "#EB001B", fg: "#FFFFFF" },
      { code: "JCB", name: "JCB", fee: "2,9%", bg: "#003087", fg: "#FFFFFF" },
    ],
  },
  {
    id: "retail",
    label: "Gerai",
    icon: Store,
    items: [
      { code: "ALFAMART", name: "Alfamart", fee: "Rp 2.500", bg: "#E31E24", fg: "#FFFFFF" },
      { code: "INDOMARET", name: "Indomaret", fee: "Rp 2.500", bg: "#003087", fg: "#FFFFFF" },
    ],
  },
  {
    id: "paylater",
    label: "PayLater",
    icon: Receipt,
    items: [
      { code: "KREDIVO", name: "Kredivo", fee: "0% s/d 3 bln", bg: "#E31E24", fg: "#FFFFFF" },
      { code: "AKULAKU", name: "Akulaku", fee: "0% s/d 3 bln", bg: "#0091EA", fg: "#FFFFFF" },
    ],
  },
]

const MOCK_TRANSACTIONS = [
  { id: "INV-20250112-001", date: "12 Jan 2025", package: "Premium", customer: "Anisa & Raka", method: "BCA Virtual Account", amount: 349000, status: "Paid" },
  { id: "INV-20250110-002", date: "10 Jan 2025", package: "Standard", customer: "Dewi & Fandi", method: "GoPay", amount: 199000, status: "Paid" },
  { id: "INV-20250108-003", date: "8 Jan 2025", package: "Basic", customer: "Rina & Ahmad", method: "QRIS", amount: 99000, status: "Expired" },
  { id: "INV-20250105-004", date: "5 Jan 2025", package: "Premium", customer: "Maya & Bimo", method: "OVO", amount: 349000, status: "Pending" },
  { id: "INV-20250103-005", date: "3 Jan 2025", package: "Standard", customer: "Sari & Deni", method: "BNI Virtual Account", amount: 199000, status: "Failed" },
  { id: "INV-20241228-006", date: "28 Des 2024", package: "Premium", customer: "Hani & Rizki", method: "Mandiri Virtual Account", amount: 349000, status: "Paid" },
  { id: "INV-20241225-007", date: "25 Des 2024", package: "Basic", customer: "Lia & Yusuf", method: "ShopeePay", amount: 99000, status: "Paid" },
]

const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID")

// ─── UTILITY COMPONENTS ───────────────────────────────────────────────────────
function QRCodeDisplay() {
  const size = 23
  const pattern = Array.from({ length: size * size }, (_, i) => {
    const r = Math.floor(i / size)
    const c = i % size
    const inTopLeft = r < 7 && c < 7
    const inTopRight = r < 7 && c >= size - 7
    const inBotLeft = r >= size - 7 && c < 7
    if (inTopLeft || inTopRight || inBotLeft) {
      const lr = inTopLeft ? r : inBotLeft ? r - (size - 7) : r
      const lc = inTopRight ? c - (size - 7) : c
      return lr === 0 || lr === 6 || lc === 0 || lc === 6 || (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4)
    }
    if (r === 6 || c === 6) return (r + c) % 2 === 0
    return ((r * 3 + c * 7 + r * c * 2) % 4) < 2
  })
  return (
    <div className="p-4 bg-white rounded-2xl border border-border shadow-sm inline-block">
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${size}, 1fr)`, width: 184, height: 184, gap: 0 }}>
        {pattern.map((on, i) => (
          <div key={i} style={{ backgroundColor: on ? "#2A1F1A" : "white" }} />
        ))}
      </div>
      <p className="text-center text-[9px] text-muted-foreground mt-2.5 font-mono tracking-widest uppercase">
        Scan untuk membayar
      </p>
    </div>
  )
}

function CountdownTimer({ initialSeconds }: { initialSeconds: number }) {
  const [left, setLeft] = useState(initialSeconds)
  useEffect(() => {
    const t = setInterval(() => setLeft((p) => Math.max(0, p - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  const h = Math.floor(left / 3600)
  const m = Math.floor((left % 3600) / 60)
  const s = left % 60
  const blocks = [
    { v: h, l: "Jam" },
    { v: m, l: "Menit" },
    { v: s, l: "Detik" },
  ]
  return (
    <div className="flex items-center gap-2">
      {blocks.map(({ v, l }, i) => (
        <div key={l} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-xl font-mono font-bold text-primary">
              {String(v).padStart(2, "0")}
            </div>
            <span className="text-[10px] text-muted-foreground mt-1">{l}</span>
          </div>
          {i < 2 && <span className="text-primary font-bold text-xl mb-4">:</span>}
        </div>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, string> = {
    Paid: "bg-green-50 text-green-600 border-green-200",
    Pending: "bg-yellow-50 text-yellow-600 border-yellow-200",
    Expired: "bg-gray-100 text-gray-500 border-gray-200",
    Failed: "bg-red-50 text-red-500 border-red-200",
  }
  return (
    <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${cfg[status] ?? cfg.Expired}`}>
      {status}
    </span>
  )
}

function BankChip({ code, bg, fg }: { code: string; bg: string; fg: string }) {
  return (
    <div
      className="px-2 py-1 rounded-md text-[10px] font-bold tracking-wide flex-shrink-0"
      style={{ backgroundColor: bg, color: fg, minWidth: 40, textAlign: "center" }}
    >
      {code}
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="py-4">
      <button className="w-full text-left flex justify-between items-center text-sm font-semibold" onClick={() => setOpen(!open)}>
        {q}
        <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ml-2 ${open ? "rotate-90" : ""}`} />
      </button>
      {open && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{a}</p>}
    </div>
  )
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────
function Navbar({ setPage, setAuthTab }: { setPage: (p: Page) => void; setAuthTab: (t: AuthTab) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => setPage("landing")} className="flex items-center gap-2 group">
          <Heart className="w-5 h-5 text-primary fill-primary/20 group-hover:fill-primary/50 transition-all" />
          <span className="font-serif text-xl font-semibold italic">Invito</span>
        </button>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Fitur", page: "fitur" },
            { label: "Tema", page: "tema" },
            { label: "Harga", page: "harga" },
            { label: "Blog", page: "blog" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setPage(item.page as Page)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => { setAuthTab("login"); setPage("login") }} className="px-4 py-2 text-sm text-foreground hover:text-primary transition-colors">
              Masuk
            </button>
            <button onClick={() => setPage("checkout")} className="px-5 py-2.5 text-sm bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all hover:shadow-[0_4px_16px_rgba(196,149,74,0.4)]">
              Mulai Gratis
            </button>
          </div>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4">
          {["Fitur", "Tema", "Harga", "Blog"].map((item) => (
            <div key={item} className="py-3 text-sm border-b border-border/40">{item}</div>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            <button onClick={() => { setAuthTab("login"); setPage("login"); setOpen(false) }} className="w-full py-3 text-sm border border-border rounded-full">Masuk</button>
            <button onClick={() => { setPage("checkout"); setOpen(false) }} className="w-full py-3 text-sm bg-primary text-primary-foreground rounded-full">Mulai Gratis</button>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ setPage, setAuthTab }: { setPage: (p: Page) => void; setAuthTab: (t: AuthTab) => void }) {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar setPage={setPage} setAuthTab={setAuthTab} />
      {/* HERO */}
      <section className="pt-28 pb-24 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs tracking-wide mb-7">
              <Sparkles className="w-3 h-3" />
              Platform Undangan Digital #1 Indonesia
            </div>
            <h1 className="font-serif text-5xl lg:text-[3.5rem] font-semibold leading-[1.15] mb-6">
              Buat Undangan<br />Pernikahan{" "}
              <span className="text-primary italic">Impianmu</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-sm">
              Undangan digital elegan yang bisa dibagikan via WhatsApp. Tanpa keahlian desain, siap dalam hitungan menit.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => setPage("checkout")} className="px-7 py-3.5 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all hover:shadow-[0_8px_28px_rgba(196,149,74,0.38)] flex items-center gap-2 text-sm">
                Mulai Buat Undangan <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-7 py-3.5 border border-border rounded-full font-medium hover:border-primary/60 hover:text-primary transition-all flex items-center gap-2 text-sm">
                <Play className="w-3.5 h-3.5 fill-current" /> Lihat Template
              </button>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex -space-x-2.5">
                {["1438761681033-6461ffad8d80", "1494790108755-2616b612b977", "1507003211169-0a1dd7228f2d", "1534528741775-53994a69daeb"].map((id, i) => (
                  <img key={i} src={`https://images.unsplash.com/photo-${id}?w=48&h=48&fit=crop&auto=format`} className="w-9 h-9 rounded-full border-2 border-background object-cover" alt="pengguna" />
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400 text-sm mb-0.5">{"★★★★★"}</div>
                <p className="text-xs text-muted-foreground">10.000+ pasangan telah memilih kami</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/15 blur-3xl rounded-full scale-75 translate-y-10" />
              <div className="relative w-64 h-[530px] bg-foreground rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-background rounded-[2.4rem] overflow-hidden">
                  <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                    <span className="text-[10px] text-foreground/50">9:41</span>
                    <div className="w-20 h-4 bg-foreground rounded-full opacity-80" />
                    <div className="flex gap-1">{[0, 1, 2].map(i => <div key={i} className="w-1 h-1 bg-foreground/30 rounded-full" />)}</div>
                  </div>
                  <div className="mx-3 rounded-2xl overflow-hidden shadow-md">
                    <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=320&h=200&fit=crop&auto=format" alt="invitation preview" className="w-full h-44 object-cover" />
                    <div className="bg-white px-5 py-4">
                      <p className="text-center text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-1">The Wedding of</p>
                      <h3 className="font-serif text-center text-lg font-semibold">Anisa & Raka</h3>
                      <div className="my-2.5 h-px bg-primary/25 mx-4" />
                      <p className="text-center text-[10px] text-muted-foreground">Sabtu, 12 Januari 2025</p>
                      <p className="text-center text-[10px] text-muted-foreground mb-3.5">Ballroom Hotel Mulia, Jakarta</p>
                      <button className="w-full py-2 bg-primary text-white text-[10px] rounded-full">Buka Undangan</button>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-14 top-24 bg-card rounded-2xl px-3.5 py-2.5 shadow-lg border border-border flex items-center gap-2.5">
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0"><Check className="w-4 h-4 text-green-500" /></div>
                <div><p className="text-xs font-semibold leading-tight">RSVP Diterima</p><p className="text-[10px] text-muted-foreground">+48 tamu baru</p></div>
              </motion.div>
              <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} className="absolute -right-14 bottom-32 bg-card rounded-2xl px-3.5 py-2.5 shadow-lg border border-border flex items-center gap-2.5">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><Gift className="w-4 h-4 text-primary" /></div>
                <div><p className="text-xs font-semibold leading-tight">Amplop Digital</p><p className="text-[10px] text-muted-foreground">Rp 12.450.000</p></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* WHY US */}
      <section className="py-24 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-3">Keunggulan Kami</p>
            <h2 className="font-serif text-4xl font-semibold">Mengapa Memilih Invito?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_US.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="bg-card rounded-2xl p-6 border border-border hover:shadow-[0_8px_32px_rgba(196,149,74,0.1)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-primary" /></div>
                <h3 className="font-semibold text-sm mb-1.5">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* PRODUCTS */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-3">Produk Kami</p>
            <h2 className="font-serif text-4xl font-semibold">Pilihan Produk Undangan</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative bg-card rounded-3xl p-8 border-2 border-primary/50 hover:border-primary transition-all hover:shadow-[0_12px_48px_rgba(196,149,74,0.15)]">
              <div className="absolute top-7 right-7 px-3 py-1 bg-primary text-primary-foreground rounded-full text-[10px] font-medium tracking-wide">TERLARIS</div>
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-5"><Smartphone className="w-6 h-6 text-primary" /></div>
              <h3 className="font-serif text-2xl font-semibold mb-2">Undangan Digital</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Undangan interaktif modern yang mudah dibagikan ke semua tamu</p>
              <ul className="space-y-3 mb-8">
                {["Bisa dibagikan via WhatsApp & sosmed", "Fitur RSVP & amplop digital", "100+ tema pilihan tersedia", "Edit kapan saja dari HP", "Animasi & musik latar"].map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
              <button onClick={() => setPage("checkout")} className="w-full py-3.5 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary/90 transition-all">Lihat Detail</button>
            </div>
            <div className="bg-card rounded-3xl p-8 border border-border hover:border-muted-foreground/30 transition-all hover:shadow-[0_12px_48px_rgba(0,0,0,0.07)]">
              <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center mb-5"><FileText className="w-6 h-6 text-muted-foreground" /></div>
              <h3 className="font-serif text-2xl font-semibold mb-2">Undangan Cetak</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Undangan fisik premium dengan desain yang menawan dan elegan</p>
              <ul className="space-y-3 mb-8">
                {["Desain premium profesional", "Beragam pilihan kertas", "Cetak sesuai jumlah tamu", "Amplop & pita hias eksklusif", "Bisa digabung dengan digital"].map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm"><Check className="w-4 h-4 text-muted-foreground/60 flex-shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
              <button className="w-full py-3.5 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-all">Lihat Detail</button>
            </div>
          </div>
        </div>
      </section>
      {/* THEMES */}
      <section className="py-24 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-3">Koleksi Tema</p>
            <h2 className="font-serif text-4xl font-semibold">Pilihan Tema yang Memukau</h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-sm mx-auto">Ratusan tema tersedia untuk setiap selera dan konsep pernikahan Anda</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {THEMES.map(({ name, img, badge }, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }} className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-${img}?w=600&h=400&fit=crop&auto=format`} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                  {badge && <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-primary-foreground rounded-full text-[10px] font-medium">{badge}</div>}
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div><h3 className="font-semibold text-sm">{name}</h3><p className="text-[11px] text-muted-foreground mt-0.5">24 variasi tersedia</p></div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-[11px] border border-border rounded-full hover:border-primary hover:text-primary transition-colors">Preview</button>
                    <button onClick={() => setPage("checkout")} className="px-3 py-1.5 text-[11px] bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">Gunakan</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* FEATURES */}
      <section className="py-24 px-6 bg-gradient-to-b from-background to-muted">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-serif text-5xl font-bold text-primary mb-4">Fitur Profesional</h1>
          <p className="text-lg text-muted-foreground mb-6">Semua alat yang Anda butuhkan untuk membuat undangan digital yang menakjubkan.</p>
          <button onClick={() => setPage('checkout')} className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all">Mulai Sekarang</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.slice(0, 8).map(({ icon: Icon, label }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center text-center p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-primary" /></div>
              <span className="text-sm font-medium">{label}</span>
            </motion.div>
          ))}
        </div>
      </section>
      {/* PRICING */}
      <section className="py-24 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-3">Harga</p>
            <h2 className="font-serif text-4xl font-semibold">Pilihan Paket yang Tepat</h2>
            <p className="text-muted-foreground mt-3 text-sm">Mulai dari Rp 99.000 untuk undangan digital impian Anda</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PACKAGES.map((pkg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative bg-card rounded-3xl p-7 border-2 transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(196,149,74,0.12)] ${pkg.popular ? "border-primary" : "border-border"}`}>
                {pkg.popular && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-[10px] font-medium whitespace-nowrap">PALING POPULER</div>}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${pkg.popular ? "bg-primary/15" : "bg-muted"}`}>
                  <Package className={`w-5 h-5 ${pkg.popular ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-1">{pkg.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{pkg.subtitle}</p>
                <div className="mb-5">
                  {pkg.originalPrice && <p className="text-xs text-muted-foreground line-through mb-0.5">{fmt(pkg.originalPrice)}</p>}
                  <p className="text-2xl font-bold text-foreground">{fmt(pkg.price)}</p>
                </div>
                <ul className="space-y-2 mb-7">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs">
                      <Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${pkg.popular ? "text-primary" : "text-muted-foreground"}`} />{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setPage("checkout")} className={`w-full py-3 rounded-full text-sm transition-all ${pkg.popular ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_4px_16px_rgba(196,149,74,0.35)]" : "border border-border hover:border-primary hover:text-primary"}`}>
                  Pilih Paket {pkg.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* HOW TO USE */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-3">Cara Kerja</p>
            <h2 className="font-serif text-4xl font-semibold">Mudah dalam 4 Langkah</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map(({ title, desc, icon: Icon }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(196,149,74,0.4)]"><Icon className="w-6 h-6" /></div>
                  <span className="absolute -top-2 -right-2 text-[10px] font-mono text-primary/50 bg-card border border-primary/20 rounded-full w-5 h-5 flex items-center justify-center">{i + 1}</span>
                </div>
                <h3 className="font-serif font-semibold mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-3">Testimoni</p>
            <h2 className="font-serif text-4xl font-semibold">Kata Mereka tentang Invito</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, avatar, rating, text, date }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-3xl p-7 border border-border hover:shadow-[0_8px_32px_rgba(196,149,74,0.1)] transition-all">
                <div className="flex text-yellow-400 text-sm mb-4">{"★".repeat(rating)}</div>
                <p className="text-sm leading-relaxed text-foreground/80 mb-6 italic">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={`https://images.unsplash.com/photo-${avatar}?w=80&h=80&fit=crop&auto=format`} alt={name} className="w-10 h-10 rounded-full object-cover" />
                  <div><p className="text-sm font-semibold">{name}</p><p className="text-[11px] text-muted-foreground">{date}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary/8 via-secondary to-accent/20 rounded-3xl p-14 border border-primary/20 overflow-hidden text-center">
            <div className="absolute -top-10 -right-10 w-56 h-56 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <Heart className="w-10 h-10 text-primary fill-primary/15 mx-auto mb-5" />
              <h2 className="font-serif text-4xl font-semibold mb-4 leading-tight">Buat Undangan Pernikahan<br />Impianmu Sekarang</h2>
              <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto leading-relaxed">Bergabung dengan 10.000+ pasangan yang telah mempercayai Invito untuk hari spesial mereka.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={() => setPage("checkout")} className="px-8 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-[0_8px_28px_rgba(196,149,74,0.4)] flex items-center gap-2">
                  Mulai Gratis <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-8 py-3.5 border border-border rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-all">Lihat Semua Template</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <SiteFooter setPage={setPage} />
    </div>
  )
}

// ─── AUTH PAGE ────────────────────────────────────────────────────────────────
function AuthPage({ setPage, initialTab }: { setPage: (p: Page) => void; initialTab: AuthTab }) {
  const [tab, setTab] = useState<AuthTab>(initialTab)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  return (
    <div className="min-h-screen bg-secondary flex font-sans">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&h=1200&fit=crop&auto=format" alt="wedding" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/35 to-foreground/70" />
        <div className="relative z-10 flex flex-col p-12 text-white">
          <button onClick={() => setPage("landing")} className="flex items-center gap-2 mb-auto">
            <Heart className="w-5 h-5 text-primary fill-primary/30" />
            <span className="font-serif text-xl font-semibold italic">Invito</span>
          </button>
          <blockquote className="font-serif text-2xl italic leading-relaxed mb-5">&ldquo;Hari spesial Anda layak mendapat undangan yang sama spesialnya.&rdquo;</blockquote>
          <div className="flex -space-x-2 mb-2">
            {["1438761681033-6461ffad8d80", "1494790108755-2616b612b977", "1507003211169-0a1dd7228f2d"].map((id, i) => (
              <img key={i} src={`https://images.unsplash.com/photo-${id}?w=40&h=40&fit=crop&auto=format`} className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="user" />
            ))}
          </div>
          <p className="text-sm text-white/65">10.000+ pasangan telah mempercayai kami</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <button onClick={() => setPage("landing")} className="flex items-center gap-2 mb-8 lg:hidden">
            <Heart className="w-5 h-5 text-primary fill-primary/30" />
            <span className="font-serif text-xl font-semibold italic">Invito</span>
          </button>
          <div className="mb-8">
            <h2 className="font-serif text-3xl font-semibold mb-1.5">{tab === "login" ? "Selamat Datang Kembali" : "Mulai Perjalananmu"}</h2>
            <p className="text-muted-foreground text-sm">{tab === "login" ? "Masuk ke akun Invito Anda" : "Buat akun gratis dan buat undangan impian"}</p>
          </div>
          <div className="flex bg-muted rounded-xl p-1 mb-6">
            <button onClick={() => setTab("login")} className={`flex-1 py-2.5 text-sm rounded-lg transition-all ${tab === "login" ? "bg-card shadow-sm font-semibold" : "text-muted-foreground"}`}>Masuk</button>
            <button onClick={() => setTab("register")} className={`flex-1 py-2.5 text-sm rounded-lg transition-all ${tab === "register" ? "bg-card shadow-sm font-semibold" : "text-muted-foreground"}`}>Daftar</button>
          </div>
          <button className="w-full flex items-center justify-center gap-3 py-3.5 border border-border rounded-xl mb-5 hover:bg-muted transition-colors text-sm font-medium">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
            Lanjutkan dengan Google
          </button>
          <div className="flex items-center gap-3 mb-5"><div className="flex-1 h-px bg-border" /><span className="text-xs text-muted-foreground">atau</span><div className="flex-1 h-px bg-border" /></div>
          <div className="space-y-4">
            {tab === "register" && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Nama Lengkap</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Masukkan nama lengkap Anda" className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nama@email.com" className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium">Password</label>
                {tab === "login" && <button className="text-xs text-primary hover:underline">Lupa password?</button>}
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <button onClick={() => setPage("dashboard")} className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-[0_4px_16px_rgba(196,149,74,0.4)] mt-2">
              {tab === "login" ? "Masuk" : "Buat Akun Gratis"}
            </button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            {tab === "login" ? "Belum punya akun? " : "Sudah punya akun? "}
            <button onClick={() => setTab(tab === "login" ? "register" : "login")} className="text-primary hover:underline font-semibold">
              {tab === "login" ? "Daftar sekarang" : "Masuk di sini"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardPage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeMenu, setActiveMenu] = useState("Dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [txFilter, setTxFilter] = useState("Semua")
  const handleMenu = (label: string) => {
    setActiveMenu(label)
    if (label === "Edit Undangan") setPage("editor")
    setSidebarOpen(false)
  }
  const filtered = txFilter === "Semua" ? MOCK_TRANSACTIONS : MOCK_TRANSACTIONS.filter(t => t.status === txFilter)
  return (
    <div className="flex h-screen bg-muted overflow-hidden font-sans">
      <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:relative z-40 w-60 h-full bg-sidebar flex flex-col transition-transform duration-300 flex-shrink-0`}>
        <div className="px-5 py-5 border-b border-sidebar-border">
          <button onClick={() => setPage("landing")} className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary fill-primary/25" />
            <span className="font-serif text-lg font-semibold italic text-sidebar-foreground">Invito</span>
          </button>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {SIDEBAR_NAV.map(({ icon: Icon, label }) => (
            <button key={label} onClick={() => handleMenu(label)} className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-all ${activeMenu === label ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground"}`}>
              <Icon className="w-4 h-4 flex-shrink-0" />{label}
            </button>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0"><User className="w-4 h-4 text-primary" /></div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-sidebar-foreground truncate">Anisa Rahmawati</p>
              <p className="text-[10px] text-sidebar-foreground/45 truncate">anisa@email.com</p>
            </div>
          </div>
          <button onClick={() => setPage("landing")} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sidebar-foreground/55 hover:bg-sidebar-accent hover:text-sidebar-foreground text-xs transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Keluar
          </button>
        </div>
      </aside>
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-foreground/40 z-30 lg:hidden" />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-card border-b border-border px-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"><Menu className="w-5 h-5" /></button>
            <div>
              <p className="text-sm font-semibold">{activeMenu}</p>
              <p className="text-[11px] text-muted-foreground hidden sm:block">Selamat datang, Anisa!</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors"><Bell className="w-4 h-4" /><span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" /></button>
            <button onClick={() => setPage("checkout")} className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-xs font-medium flex items-center gap-1.5 hover:bg-primary/90 transition-all hover:shadow-[0_2px_12px_rgba(196,149,74,0.35)]">
              <Plus className="w-3.5 h-3.5" /> Buat Undangan
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-5">
          {activeMenu === "Transaksi" ? (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h2 className="font-semibold">Riwayat Transaksi</h2>
                  <p className="text-xs text-muted-foreground">{MOCK_TRANSACTIONS.length} transaksi total</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input placeholder="Cari transaksi..." className="pl-8 pr-3 py-2 text-xs border border-border rounded-lg bg-card outline-none focus:border-primary w-40" />
                  </div>
                  <div className="flex bg-card border border-border rounded-lg overflow-hidden">
                    {["Semua", "Paid", "Pending", "Expired", "Failed"].map(f => (
                      <button key={f} onClick={() => setTxFilter(f)} className={`px-2.5 py-2 text-[11px] transition-colors ${txFilter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>{f}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        {["No. Invoice", "Tanggal", "Pelanggan", "Paket", "Metode Bayar", "Total", "Status", ""].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((tx, i) => (
                        <tr key={tx.id} className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                          <td className="px-4 py-3 text-xs font-mono text-primary">{tx.id}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{tx.date}</td>
                          <td className="px-4 py-3 text-xs font-medium whitespace-nowrap">{tx.customer}</td>
                          <td className="px-4 py-3"><span className="text-xs bg-secondary px-2 py-1 rounded-full">{tx.package}</span></td>
                          <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{tx.method}</td>
                          <td className="px-4 py-3 text-xs font-semibold whitespace-nowrap">{fmt(tx.amount)}</td>
                          <td className="px-4 py-3"><StatusBadge status={tx.status} /></td>
                          <td className="px-4 py-3">
                            <button className="text-[10px] text-primary hover:underline whitespace-nowrap">Detail</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filtered.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground text-sm">Tidak ada transaksi ditemukan</div>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                {[
                  { label: "Total Pendapatan", value: "Rp 1.343.000", icon: TrendingUp, color: "text-green-500 bg-green-50" },
                  { label: "Transaksi Berhasil", value: "4", icon: CheckCircle2, color: "text-primary bg-primary/10" },
                  { label: "Menunggu Bayar", value: "1", icon: Clock, color: "text-yellow-500 bg-yellow-50" },
                  { label: "Transaksi Gagal", value: "2", icon: XCircle, color: "text-red-500 bg-red-50" },
                ].map(({ label, value, icon: Icon, color }, i) => (
                  <div key={i} className="bg-card rounded-xl p-4 border border-border">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${color}`}><Icon className="w-4 h-4" /></div>
                    <p className="text-lg font-bold">{value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                {[
                  { label: "Total Kunjungan", value: "2.847", change: "+12%", icon: TrendingUp, colorCls: "text-blue-500 bg-blue-50" },
                  { label: "Jumlah Tamu", value: "248", change: "+8 baru", icon: Users, colorCls: "text-primary bg-primary/10" },
                  { label: "RSVP Masuk", value: "186", change: "75%", icon: Check, colorCls: "text-green-500 bg-green-50" },
                  { label: "Amplop Digital", value: "Rp 12,4jt", change: "+450rb", icon: Gift, colorCls: "text-purple-500 bg-purple-50" },
                ].map(({ label, value, change, icon: Icon, colorCls }, i) => (
                  <div key={i} className="bg-card rounded-2xl p-4 border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colorCls}`}><Icon className="w-4 h-4" /></div>
                      <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">{change}</span>
                    </div>
                    <p className="text-xl font-semibold mb-0.5">{value}</p>
                    <p className="text-[11px] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
              <div className="grid lg:grid-cols-3 gap-4 mb-5">
                <div className="lg:col-span-2 bg-card rounded-2xl p-5 border border-border">
                  <div className="flex items-center justify-between mb-5">
                    <div><h3 className="text-sm font-semibold">Statistik Kunjungan</h3><p className="text-[11px] text-muted-foreground">7 hari terakhir</p></div>
                    <select className="text-xs border border-border rounded-lg px-2 py-1.5 bg-muted outline-none cursor-pointer"><option>7 hari</option><option>30 hari</option></select>
                  </div>
                  <ResponsiveContainer width="100%" height={190}>
                    <AreaChart data={CHART_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                      <defs>
                        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C4954A" stopOpacity={0.18} />
                          <stop offset="95%" stopColor="#C4954A" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#8C7456" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#8C7456" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(196,149,74,0.2)", borderRadius: "0.75rem", fontSize: 12 }} cursor={{ stroke: "rgba(196,149,74,0.2)" }} />
                      <Area type="monotone" dataKey="views" stroke="#C4954A" strokeWidth={2} fill="url(#goldGrad)" dot={false} activeDot={{ r: 4, fill: "#C4954A" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-card rounded-2xl p-5 border border-border">
                  <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-semibold">RSVP Terbaru</h3><button className="text-xs text-primary hover:underline">Lihat semua</button></div>
                  <div className="space-y-3">
                    {[
                      { name: "Dewi Sartika", status: "Hadir", time: "5 mnt lalu" },
                      { name: "Ahmad Fauzi", status: "Hadir", time: "12 mnt lalu" },
                      { name: "Rina Kusuma", status: "Tidak Hadir", time: "1 jam lalu" },
                      { name: "Budi Santoso", status: "Hadir", time: "2 jam lalu" },
                      { name: "Maya Putri", status: "Hadir", time: "3 jam lalu" },
                    ].map(({ name, status, time }, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center text-[11px] font-semibold text-primary flex-shrink-0">{name[0]}</div>
                          <div><p className="text-xs font-medium">{name}</p><p className="text-[10px] text-muted-foreground">{time}</p></div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${status === "Hadir" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>{status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl p-5 border border-border">
                <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-semibold">Undangan Saya</h3><button onClick={() => setPage("checkout")} className="text-xs text-primary flex items-center gap-1 hover:underline"><Plus className="w-3 h-3" /> Buat baru</button></div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: "Anisa & Raka", theme: "Elegant", status: "Published", visits: "2.847" },
                    { title: "Draft Undangan 2", theme: "Floral", status: "Draft", visits: "—" },
                  ].map(({ title, theme, status, visits }, i) => (
                    <div key={i} className="border border-border rounded-xl overflow-hidden group hover:shadow-md transition-all">
                      <div className="h-28 bg-gradient-to-br from-secondary to-accent/40 flex items-center justify-center relative">
                        <p className="font-serif text-base">{title}</p>
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button onClick={() => setPage("editor")} className="px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs shadow-md">Edit</button>
                        </div>
                      </div>
                      <div className="px-3.5 py-2.5 flex items-center justify-between">
                        <div><p className="text-xs font-medium">{theme}</p><p className="text-[10px] text-muted-foreground">{visits} kunjungan</p></div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${status === "Published" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>{status}</span>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setPage("checkout")} className="border-2 border-dashed border-border rounded-xl min-h-[120px] flex flex-col items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors text-muted-foreground">
                    <Plus className="w-6 h-6" /><span className="text-xs">Buat Undangan Baru</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

// ─── EDITOR PAGE ──────────────────────────────────────────────────────────────
function EditorPage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState("Tema")
  const [activeSection, setActiveSection] = useState("Opening")
  const [selectedTheme, setSelectedTheme] = useState(0)
  return (
    <div className="flex h-screen bg-muted overflow-hidden font-sans">
      <div className="w-64 bg-card border-r border-border flex flex-col flex-shrink-0">
        <div className="flex border-b border-border overflow-x-auto">
          {EDITOR_TABS.map(({ icon: Icon, label }) => (
            <button key={label} onClick={() => setActiveTab(label)} className={`flex flex-col items-center gap-1 px-3.5 py-3 flex-shrink-0 text-[10px] transition-colors ${activeTab === label ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"}`}>
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "Halaman" && (
            <div>
              <p className="text-[10px] text-muted-foreground mb-3 font-semibold uppercase tracking-widest">Urutan Halaman</p>
              <div className="space-y-1.5">
                {PAGES_LIST.map((pg, i) => (
                  <div key={pg} onClick={() => setActiveSection(pg)} className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${activeSection === pg ? "bg-primary/10 border border-primary/25" : "border border-transparent hover:bg-muted"}`}>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-semibold flex-shrink-0 ${activeSection === pg ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i + 1}</div>
                    <span className="text-xs font-medium">{pg}</span>
                    {activeSection === pg && <Check className="w-3 h-3 text-primary ml-auto flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "Tema" && (
            <div>
              <p className="text-[10px] text-muted-foreground mb-3 font-semibold uppercase tracking-widest">Pilih Tema</p>
              <div className="grid grid-cols-2 gap-2">
                {THEMES.map(({ name, img }, i) => (
                  <button key={i} onClick={() => setSelectedTheme(i)} className={`relative rounded-xl overflow-hidden aspect-[3/4] border-2 transition-all ${selectedTheme === i ? "border-primary" : "border-transparent hover:border-primary/30"}`}>
                    <img src={`https://images.unsplash.com/photo-${img}?w=200&h=280&fit=crop&auto=format`} alt={name} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/60 to-transparent p-2"><p className="text-white text-[10px] font-medium">{name}</p></div>
                    {selectedTheme === i && <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                  </button>
                ))}
              </div>
            </div>
          )}
          {activeTab !== "Halaman" && activeTab !== "Tema" && (
            <div className="flex flex-col items-center justify-center h-36 text-muted-foreground text-center gap-2">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                {activeTab === "Background" && <Image className="w-5 h-5" />}
                {activeTab === "Font" && <Type className="w-5 h-5" />}
                {activeTab === "Musik" && <Music className="w-5 h-5" />}
                {activeTab === "Foto" && <Camera className="w-5 h-5" />}
              </div>
              <p className="text-xs">Panel {activeTab}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-12 bg-card border-b border-border px-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setPage("dashboard")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"><ChevronRight className="w-3.5 h-3.5 rotate-180" />Dashboard</button>
            <span className="text-muted-foreground/30 select-none">|</span>
            <div className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-primary fill-primary/20" /><span className="text-xs font-semibold">Anisa & Raka</span></div>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="px-2.5 py-1.5 text-[11px] border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-1"><Eye className="w-3 h-3" /> Preview</button>
            <button className="px-2.5 py-1.5 text-[11px] border border-border rounded-lg hover:bg-muted transition-colors">Simpan</button>
            <button className="px-2.5 py-1.5 text-[11px] bg-muted rounded-lg hover:bg-muted/80 transition-colors flex items-center gap-1"><Share2 className="w-3 h-3" /> Bagikan</button>
            <button className="px-3.5 py-1.5 text-[11px] bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">Publish</button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6 flex items-start justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-[280px] bg-foreground rounded-[2.5rem] p-3 shadow-2xl">
              <div className="w-full bg-background rounded-[2rem] overflow-hidden min-h-[560px]">
                <div className="relative">
                  <img src={`https://images.unsplash.com/photo-${THEMES[selectedTheme].img}?w=400&h=280&fit=crop&auto=format`} alt="wedding" className="w-full h-44 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
                </div>
                <div className="px-6 pb-6 -mt-3 text-center">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-1">The Wedding of</p>
                  <h2 className="font-serif text-2xl font-semibold mb-1">Anisa &amp; Raka</h2>
                  <div className="w-14 h-px bg-primary/35 mx-auto my-3" />
                  <p className="text-[10px] text-muted-foreground">Sabtu, 12 Januari 2025</p>
                  <p className="text-[10px] text-muted-foreground mb-4">Ballroom Hotel Mulia, Jakarta</p>
                  <div className="flex items-center justify-center gap-1.5 mb-5 bg-primary/8 rounded-full py-2 px-4">
                    <Clock className="w-3 h-3 text-primary" /><span className="text-[10px] text-primary font-medium">30 hari lagi</span>
                  </div>
                  <button className="w-full py-2.5 bg-primary text-white text-[11px] rounded-full font-medium">Buka Undangan</button>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {PAGES_LIST.slice(0, 5).map(s => (
                <button key={s} onClick={() => setActiveSection(s)} className={`px-3 py-1 text-[11px] rounded-full transition-all ${activeSection === s ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:border-primary"}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-60 bg-card border-l border-border flex-shrink-0 overflow-y-auto">
        <div className="px-4 py-3.5 border-b border-border"><h3 className="text-xs font-semibold">Pengaturan Elemen</h3></div>
        <div className="p-4 space-y-5">
          {[{ label: "Warna Background", value: "#FAF8F4" }, { label: "Warna Teks", value: "#2A1F1A" }, { label: "Warna Aksen", value: "#C4954A" }].map(({ label, value }, i) => (
            <div key={i}>
              <label className="text-[10px] text-muted-foreground mb-2 block font-semibold uppercase tracking-wide">{label}</label>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg border border-border shadow-sm" style={{ backgroundColor: value }} />
                <span className="text-[11px] font-mono bg-muted px-2 py-1 rounded-lg">{value}</span>
              </div>
            </div>
          ))}
          <div>
            <label className="text-[10px] text-muted-foreground mb-2 block font-semibold uppercase tracking-wide">Font Judul</label>
            <select className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-muted outline-none focus:border-primary cursor-pointer">
              <option>Playfair Display</option><option>Cormorant Garamond</option><option>Great Vibes</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground mb-2 block font-semibold uppercase tracking-wide">Ukuran Font <span className="font-normal normal-case text-foreground">28px</span></label>
            <input type="range" min="16" max="48" defaultValue="28" className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground mb-2 block font-semibold uppercase tracking-wide">Padding</label>
            <div className="grid grid-cols-2 gap-2">
              {["Top", "Right", "Bottom", "Left"].map(dir => (
                <div key={dir}><p className="text-[9px] text-muted-foreground/70 mb-0.5">{dir}</p><input defaultValue="16" className="w-full text-xs border border-border rounded-lg px-2 py-1.5 bg-muted outline-none focus:border-primary text-center" /></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── CHECKOUT PAGE ────────────────────────────────────────────────────────────
function CheckoutPage({ setPage }: { setPage: (p: Page) => void }) {
  const [selectedPkg, setSelectedPkg] = useState("standard")
  const [form, setForm] = useState({ name: "", email: "", wa: "", bride: "", groom: "", date: "" })
  const pkg = PACKAGES.find(p => p.id === selectedPkg)!
  return (
    <div className="min-h-screen bg-secondary font-sans">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => setPage("landing")} className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary fill-primary/20" />
            <span className="font-serif text-lg font-semibold italic">Invito</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 text-primary font-medium"><div className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[10px]">1</div>Pilih Paket</div>
            <div className="w-8 h-px bg-border" />
            <div className="flex items-center gap-1.5"><div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center text-[10px]">2</div>Metode Bayar</div>
            <div className="w-8 h-px bg-border" />
            <div className="flex items-center gap-1.5"><div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center text-[10px]">3</div>Konfirmasi</div>
          </div>
          <button onClick={() => setPage("landing")} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"><ChevronRight className="w-3.5 h-3.5 rotate-180" />Kembali</button>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-semibold mb-1">Pilih Paket & Checkout</h1>
          <p className="text-muted-foreground text-sm">Pilih paket yang sesuai dengan kebutuhan Anda</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="font-semibold mb-4 flex items-center gap-2"><Package className="w-4 h-4 text-primary" />Pilih Paket</h2>
              <div className="space-y-3">
                {PACKAGES.map((p) => (
                  <label key={p.id} onClick={() => setSelectedPkg(p.id)} className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPkg === p.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${selectedPkg === p.id ? "border-primary bg-primary" : "border-muted-foreground/30"}`}>
                      {selectedPkg === p.id && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-sm">{p.name}</span>
                        {p.popular && <span className="px-1.5 py-0.5 bg-primary text-primary-foreground rounded text-[9px] font-medium">POPULER</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{p.subtitle}</p>
                      <div className="flex flex-wrap gap-1">
                        {p.features.slice(0, 3).map((f, i) => <span key={i} className="text-[10px] bg-muted px-2 py-0.5 rounded-full">{f}</span>)}
                        {p.features.length > 3 && <span className="text-[10px] text-muted-foreground">+{p.features.length - 3} lainnya</span>}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {p.originalPrice && <p className="text-[10px] text-muted-foreground line-through">{fmt(p.originalPrice)}</p>}
                      <p className="font-bold text-foreground">{fmt(p.price)}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="font-semibold mb-4 flex items-center gap-2"><Heart className="w-4 h-4 text-primary" />Detail Undangan</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Nama Mempelai Wanita", key: "bride", placeholder: "Nama mempelai wanita" },
                  { label: "Nama Mempelai Pria", key: "groom", placeholder: "Nama mempelai pria" },
                  { label: "Tanggal Pernikahan", key: "date", placeholder: "", type: "date" },
                ].map(({ label, key, placeholder, type }) => (
                  <div key={key} className={key === "date" ? "sm:col-span-2" : ""}>
                    <label className="text-xs font-medium mb-1.5 block">{label}</label>
                    <input type={type ?? "text"} placeholder={placeholder} value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="w-full px-3.5 py-2.5 bg-input-background border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="font-semibold mb-4 flex items-center gap-2"><User className="w-4 h-4 text-primary" />Data Pemesan</h2>
              <div className="space-y-4">
                {[
                  { label: "Nama Lengkap", key: "name", placeholder: "Masukkan nama lengkap", type: "text" },
                  { label: "Alamat Email", key: "email", placeholder: "nama@email.com", type: "email" },
                  { label: "Nomor WhatsApp", key: "wa", placeholder: "08xxxxxxxxxx", type: "tel" },
                ].map(({ label, key, placeholder, type }) => (
                  <div key={key}>
                    <label className="text-xs font-medium mb-1.5 block">{label}</label>
                    <input type={type} placeholder={placeholder} value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="w-full px-3.5 py-2.5 bg-input-background border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="font-semibold mb-5">Ringkasan Pesanan</h2>
              <div className="bg-gradient-to-br from-secondary to-accent/20 rounded-xl p-4 mb-5 border border-primary/15">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Paket dipilih</p>
                    <p className="font-serif font-semibold">{pkg.name}</p>
                  </div>
                  <span className="text-xs bg-primary/15 text-primary rounded-full px-2 py-0.5">Aktif</span>
                </div>
                <p className="text-xs text-muted-foreground">{pkg.subtitle}</p>
              </div>
              <div className="space-y-2.5 mb-5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Harga paket</span><span>{fmt(pkg.price)}</span></div>
                {pkg.originalPrice && <div className="flex justify-between text-xs"><span className="text-muted-foreground">Hemat</span><span className="text-green-600">-{fmt(pkg.originalPrice - pkg.price)}</span></div>}
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Biaya layanan</span><span>Gratis</span></div>
                <div className="h-px bg-border" />
                <div className="flex justify-between font-bold"><span>Total Pembayaran</span><span className="text-primary">{fmt(pkg.price)}</span></div>
              </div>
              <button onClick={() => setPage("payment-method")} className="w-full py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-[0_4px_16px_rgba(196,149,74,0.4)] flex items-center justify-center gap-2">
                Lanjut ke Pembayaran <ArrowRight className="w-4 h-4" />
              </button>
              <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1"><Shield className="w-3 h-3" />Pembayaran aman</div>
                <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Xendit secured</div>
              </div>
            </div>
            <div className="mt-4 bg-card rounded-xl p-4 border border-border">
              <p className="text-xs font-semibold mb-2">Fitur Paket {pkg.name}</p>
              <ul className="space-y-1.5">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── PAYMENT METHOD PAGE ──────────────────────────────────────────────────────
function PaymentMethodPage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeGroup, setActiveGroup] = useState("va")
  const [selected, setSelected] = useState<string | null>(null)
  const group = PAYMENT_GROUPS.find(g => g.id === activeGroup)!
  const pkg = PACKAGES[1]
  return (
    <div className="min-h-screen bg-secondary font-sans">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => setPage("landing")} className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary fill-primary/20" />
            <span className="font-serif text-lg font-semibold italic">Invito</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 text-muted-foreground"><div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center"><Check className="w-3 h-3" /></div>Pilih Paket</div>
            <div className="w-8 h-px bg-border" />
            <div className="flex items-center gap-1.5 text-primary font-medium"><div className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[10px]">2</div>Metode Bayar</div>
            <div className="w-8 h-px bg-border" />
            <div className="flex items-center gap-1.5"><div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center text-[10px]">3</div>Konfirmasi</div>
          </div>
          <button onClick={() => setPage("checkout")} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"><ChevronRight className="w-3.5 h-3.5 rotate-180" />Kembali</button>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-semibold mb-1">Pilih Metode Pembayaran</h1>
          <p className="text-muted-foreground text-sm">Powered by <span className="font-semibold text-foreground">Xendit</span> — Pembayaran aman & terpercaya</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="flex overflow-x-auto border-b border-border">
                {PAYMENT_GROUPS.map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => { setActiveGroup(id); setSelected(null) }} className={`flex items-center gap-2 px-4 py-3.5 text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${activeGroup === id ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
                    <Icon className="w-3.5 h-3.5" />{label}
                  </button>
                ))}
              </div>
              <div className="p-5">
                <p className="text-xs text-muted-foreground mb-4">Pilih {group.label} yang ingin Anda gunakan:</p>
                <div className="space-y-2.5">
                  {group.items.map((item) => (
                    <label key={item.code} onClick={() => setSelected(item.code)} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selected === item.code ? "border-primary bg-primary/5" : "border-border hover:border-primary/30 hover:bg-muted/30"}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${selected === item.code ? "border-primary bg-primary" : "border-muted-foreground/30"}`}>
                        {selected === item.code && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <BankChip code={item.code} bg={item.bg} fg={item.fg} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        {item.badge && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-muted-foreground">Biaya admin</p>
                        <p className="text-xs font-medium">{item.fee}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-5 p-4 bg-secondary rounded-xl border border-border">
                  <p className="text-xs font-semibold mb-2">Cara Pembayaran {group.label}:</p>
                  <ol className="space-y-1.5">
                    {activeGroup === "va" && ["Salin nomor Virtual Account yang diberikan", "Buka aplikasi mobile banking atau ATM", "Pilih menu Transfer ke Virtual Account", "Masukkan nomor VA dan konfirmasi pembayaran"].map((s, i) => <li key={i} className="text-xs text-muted-foreground flex gap-2"><span className="text-primary font-medium flex-shrink-0">{i + 1}.</span>{s}</li>)}
                    {activeGroup === "ewallet" && ["Tap tombol 'Bayar Sekarang'", "Anda akan diarahkan ke aplikasi e-wallet", "Konfirmasi pembayaran di aplikasi e-wallet", "Kembali ke halaman ini setelah selesai"].map((s, i) => <li key={i} className="text-xs text-muted-foreground flex gap-2"><span className="text-primary font-medium flex-shrink-0">{i + 1}.</span>{s}</li>)}
                    {activeGroup === "qris" && ["Tap tombol 'Bayar Sekarang'", "QR Code akan ditampilkan di layar", "Buka aplikasi e-wallet atau bank Anda", "Scan QR Code dan konfirmasi pembayaran"].map((s, i) => <li key={i} className="text-xs text-muted-foreground flex gap-2"><span className="text-primary font-medium flex-shrink-0">{i + 1}.</span>{s}</li>)}
                    {activeGroup === "card" && ["Masukkan nomor kartu kredit/debit Anda", "Masukkan tanggal kadaluarsa dan CVV", "Verifikasi dengan OTP yang dikirim ke HP", "Pembayaran akan diproses secara otomatis"].map((s, i) => <li key={i} className="text-xs text-muted-foreground flex gap-2"><span className="text-primary font-medium flex-shrink-0">{i + 1}.</span>{s}</li>)}
                    {activeGroup === "retail" && ["Kunjungi gerai Alfamart atau Indomaret terdekat", "Tunjukkan kode pembayaran ke kasir", "Bayar sesuai jumlah yang tertera", "Simpan struk sebagai bukti pembayaran"].map((s, i) => <li key={i} className="text-xs text-muted-foreground flex gap-2"><span className="text-primary font-medium flex-shrink-0">{i + 1}.</span>{s}</li>)}
                    {activeGroup === "paylater" && ["Pilih metode cicilan yang diinginkan", "Daftarkan akun PayLater jika belum punya", "Verifikasi identitas dan limit kredit", "Konfirmasi cicilan dan proses pembayaran"].map((s, i) => <li key={i} className="text-xs text-muted-foreground flex gap-2"><span className="text-primary font-medium flex-shrink-0">{i + 1}.</span>{s}</li>)}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="font-semibold mb-5">Ringkasan Pembayaran</h2>
              <div className="bg-gradient-to-br from-secondary to-accent/20 rounded-xl p-4 mb-5 border border-primary/15">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center"><Package className="w-4 h-4 text-primary" /></div>
                  <div><p className="text-xs text-muted-foreground">Paket</p><p className="font-semibold text-sm">{pkg.name}</p></div>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between"><span>Harga paket</span><span>{fmt(pkg.price)}</span></div>
                  <div className="flex justify-between text-green-600"><span>Diskon</span><span>-{fmt(pkg.originalPrice! - pkg.price)}</span></div>
                </div>
                <div className="mt-3 pt-3 border-t border-primary/15 flex justify-between font-bold text-sm">
                  <span>Total</span><span className="text-primary">{fmt(pkg.price)}</span>
                </div>
              </div>
              {selected && (
                <div className="mb-4 p-3 bg-primary/8 rounded-xl border border-primary/20 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium">Metode dipilih</p>
                    <p className="text-xs text-muted-foreground">{group.items.find(i => i.code === selected)?.name}</p>
                  </div>
                </div>
              )}
              <button
                onClick={() => { if (selected) setPage("payment-waiting"); else toast.error("Pilih metode pembayaran terlebih dahulu") }}
                className={`w-full py-3.5 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${selected ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_4px_16px_rgba(196,149,74,0.4)]" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
              >
                {selected ? <><CreditCard className="w-4 h-4" />Bayar Sekarang</> : "Pilih Metode Dulu"}
              </button>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[9px] text-muted-foreground">
                <div className="flex items-center gap-1"><Shield className="w-3 h-3" />SSL Encrypted</div>
                <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Xendit Secured</div>
                <div className="flex items-center gap-1"><Shield className="w-3 h-3" />PCI DSS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── PAYMENT WAITING PAGE ─────────────────────────────────────────────────────
function PaymentWaitingPage({ setPage }: { setPage: (p: Page) => void }) {
  const [copied, setCopied] = useState(false)
  const vaNumber = "8808 8088 5050 1234"
  const pkg = PACKAGES[1]
  const handleCopy = () => {
    setCopied(true)
    toast.success("Nomor VA berhasil disalin!")
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="min-h-screen bg-secondary font-sans">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => setPage("landing")} className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary fill-primary/20" />
            <span className="font-serif text-lg font-semibold italic">Invito</span>
          </button>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-600 border border-yellow-200 px-3 py-1 rounded-full">
              <Clock className="w-3 h-3" /> Menunggu Pembayaran
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-50 border-2 border-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
          <h1 className="font-serif text-3xl font-semibold mb-2">Selesaikan Pembayaran</h1>
          <p className="text-muted-foreground text-sm">Selesaikan pembayaran sebelum waktu habis</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border mb-5 flex flex-col items-center">
          <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">Batas Waktu Pembayaran</p>
          <CountdownTimer initialSeconds={24 * 60 * 60} />
          <p className="text-xs text-muted-foreground mt-3">Pembayaran akan otomatis dibatalkan jika melewati batas waktu</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm">BCA Virtual Account</h2>
              <BankChip code="BCA" bg="#003D6E" fg="#FFFFFF" />
            </div>
            <p className="text-xs text-muted-foreground mb-3">Nomor Virtual Account:</p>
            <div className="flex items-center gap-3 p-3.5 bg-secondary rounded-xl border border-border mb-4">
              <span className="font-mono font-bold text-lg tracking-wider flex-1">{vaNumber}</span>
              <button onClick={handleCopy} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${copied ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary hover:bg-primary/20"}`}>
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Tersalin!" : "Salin"}
              </button>
            </div>
            <div className="text-xs space-y-1.5 text-muted-foreground">
              <p className="font-medium text-foreground mb-2">Cara Bayar:</p>
              {["Buka aplikasi BCA Mobile atau m-BCA", "Pilih m-Transfer → BCA Virtual Account", "Masukkan nomor VA di atas", "Konfirmasi pembayaran"].map((s, i) => (
                <div key={i} className="flex gap-2"><span className="text-primary font-medium w-4 flex-shrink-0">{i + 1}.</span>{s}</div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-semibold text-sm mb-4">Detail Pesanan</h2>
            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between"><span className="text-muted-foreground">No. Invoice</span><span className="font-mono text-xs text-primary">INV-20250112-001</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Nama</span><span className="font-medium">Anisa Rahmawati</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Mempelai</span><span className="font-medium">Anisa & Raka</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Paket</span><span>{pkg.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Metode</span><span>BCA Virtual Account</span></div>
              <div className="h-px bg-border" />
              <div className="flex justify-between font-bold"><span>Total Bayar</span><span className="text-primary">{fmt(pkg.price)}</span></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPage("payment-success")} className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-full text-xs font-medium hover:bg-primary/90 transition-all">
                Cek Status
              </button>
              <button className="flex-1 py-2.5 border border-border rounded-full text-xs hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-1">
                <Download className="w-3 h-3" />Instruksi
              </button>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-sm">Atau Bayar dengan QRIS</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Scan dengan GoPay, OVO, DANA, ShopeePay, dll</p>
            </div>
            <BankChip code="QRIS" bg="#CC0000" fg="#FFFFFF" />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <QRCodeDisplay />
            <div className="text-sm space-y-2 text-muted-foreground">
              <p className="font-medium text-foreground text-xs mb-3">Cara Bayar QRIS:</p>
              {["Buka aplikasi e-wallet pilihan Anda", "Pilih fitur Scan QR / QRIS", "Arahkan kamera ke QR Code", "Konfirmasi jumlah dan selesaikan pembayaran"].map((s, i) => (
                <div key={i} className="flex gap-2 text-xs"><span className="text-primary font-medium w-4 flex-shrink-0">{i + 1}.</span>{s}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 p-4 bg-yellow-50 rounded-xl border border-yellow-200 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-700">Jangan tutup halaman ini. Undangan Anda akan aktif otomatis setelah pembayaran berhasil dikonfirmasi. Proses verifikasi maksimal 1×24 jam.</p>
        </div>
      </div>
    </div>
  )
}

// ─── PAYMENT SUCCESS PAGE ─────────────────────────────────────────────────────
function PaymentSuccessPage({ setPage }: { setPage: (p: Page) => void }) {
  const pkg = PACKAGES[1]
  return (
    <div className="min-h-screen bg-secondary font-sans flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="text-center mb-8">
            <div className="relative inline-block mb-5">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-green-100 rounded-full opacity-40" />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">Pembayaran Berhasil!</h1>
            <p className="text-muted-foreground text-sm">Terima kasih, undangan Anda sedang diproses</p>
          </div>
          <div className="bg-card rounded-2xl border border-border overflow-hidden mb-5">
            <div className="bg-gradient-to-r from-green-50 to-primary/5 px-6 py-4 border-b border-border">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">No. Invoice</p>
                <p className="text-xs font-mono font-bold text-primary">INV-20250112-001</p>
              </div>
            </div>
            <div className="p-6 space-y-3 text-sm">
              {[
                { label: "Status", value: <StatusBadge status="Paid" /> },
                { label: "Tanggal Bayar", value: "12 Januari 2025, 14:32 WIB" },
                { label: "Mempelai", value: "Anisa & Raka" },
                { label: "Paket", value: pkg.name },
                { label: "Metode Bayar", value: "BCA Virtual Account" },
                { label: "Total Bayar", value: <span className="font-bold text-primary">{fmt(pkg.price)}</span> },
              ].map(({ label, value }, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-primary/8 rounded-xl border border-primary/20 flex items-start gap-3 mb-6">
            <Heart className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 fill-primary/20" />
            <div>
              <p className="text-xs font-medium text-primary mb-0.5">Undangan sedang diproses</p>
              <p className="text-xs text-muted-foreground">Kami akan mengirimkan notifikasi ke email <strong>anisa@email.com</strong> dan WhatsApp setelah undangan Anda siap dalam 1×24 jam.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => setPage("dashboard")} className="flex-1 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-[0_4px_16px_rgba(196,149,74,0.4)] flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />Lihat Undangan Saya
            </button>
            <button className="flex-1 py-3.5 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />Unduh Bukti Bayar
            </button>
          </div>
          <button onClick={() => setPage("landing")} className="w-full mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors text-center py-2">
            Kembali ke Beranda
          </button>
        </motion.div>
      </div>
    </div>
  )
}

// ─── PAYMENT FAILED PAGE ──────────────────────────────────────────────────────
function PaymentFailedPage({ setPage }: { setPage: (p: Page) => void }) {
  const [reason, setReason] = useState<"failed" | "expired">("expired")
  return (
    <div className="min-h-screen bg-secondary font-sans flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-center mb-6">
            <div className="flex bg-card rounded-lg border border-border p-1">
              <button onClick={() => setReason("expired")} className={`px-3 py-1.5 text-xs rounded-md transition-all ${reason === "expired" ? "bg-yellow-50 text-yellow-600 border border-yellow-200" : "text-muted-foreground"}`}>Kadaluarsa</button>
              <button onClick={() => setReason("failed")} className={`px-3 py-1.5 text-xs rounded-md transition-all ${reason === "failed" ? "bg-red-50 text-red-500 border border-red-200" : "text-muted-foreground"}`}>Gagal</button>
            </div>
          </div>
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
              {reason === "expired" ? <Clock className="w-12 h-12 text-yellow-500" /> : <XCircle className="w-12 h-12 text-red-500" />}
            </div>
            <h1 className="font-serif text-3xl font-semibold mb-2">
              {reason === "expired" ? "Pembayaran Kadaluarsa" : "Pembayaran Gagal"}
            </h1>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              {reason === "expired"
                ? "Batas waktu pembayaran telah habis. Pesanan Anda dibatalkan secara otomatis."
                : "Terjadi kesalahan saat memproses pembayaran Anda. Silakan coba lagi."}
            </p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 mb-5">
            <h3 className="font-semibold text-sm mb-3">Detail Transaksi</h3>
            <div className="space-y-2.5 text-sm">
              {[
                { label: "No. Invoice", value: <span className="font-mono text-xs text-muted-foreground">INV-20250112-001</span> },
                { label: "Status", value: <StatusBadge status={reason === "expired" ? "Expired" : "Failed"} /> },
                { label: "Paket", value: "Standard" },
                { label: "Jumlah", value: fmt(199000) },
                { label: "Alasan", value: <span className="text-xs text-red-500">{reason === "expired" ? "Waktu pembayaran habis (24 jam)" : "Transaksi ditolak oleh bank"}</span> },
              ].map(({ label, value }, i) => (
                <div key={i} className="flex justify-between items-center"><span className="text-muted-foreground">{label}</span>{value}</div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <button onClick={() => setPage("payment-method")} className="w-full py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-[0_4px_16px_rgba(196,149,74,0.4)] flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" />Coba Lagi dengan Metode Lain
            </button>
            <button onClick={() => setPage("payment-waiting")} className="w-full py-3.5 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" />Gunakan Metode Sama
            </button>
          </div>
          <div className="p-5 bg-card rounded-2xl border border-border">
            <p className="text-xs font-semibold mb-3 flex items-center gap-2"><Headphones className="w-4 h-4 text-primary" />Butuh Bantuan?</p>
            <p className="text-xs text-muted-foreground mb-3">Hubungi tim customer service kami jika Anda mengalami masalah pembayaran.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-border rounded-full text-xs hover:border-primary hover:text-primary transition-all">
                <MessageCircle className="w-3.5 h-3.5" />WhatsApp CS
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-border rounded-full text-xs hover:border-primary hover:text-primary transition-all">
                <Mail className="w-3.5 h-3.5" />Email Support
              </button>
            </div>
            <p className="text-center text-[10px] text-muted-foreground mt-3">Tersedia Senin–Sabtu, 08.00–21.00 WIB</p>
          </div>
          <button onClick={() => setPage("landing")} className="w-full mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors text-center py-2">
            ← Kembali ke Beranda
          </button>
        </motion.div>
      </div>
    </div>
  )
}

// ─── SHARED FOOTER ───────────────────────────────────────────────────────────
function SiteFooter({ setPage }: { setPage?: (p: Page) => void }) {
  const nav = setPage ?? (() => { })
  return (
    <footer className="py-16 px-6 bg-foreground text-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <Heart className="w-5 h-5 text-primary fill-primary/30" />
              <span className="font-serif text-xl font-semibold italic">Invito</span>
            </div>
            <p className="text-sm text-background/55 leading-relaxed max-w-xs">Platform undangan digital pernikahan terbaik di Indonesia. Jadikan momen spesial Anda semakin berkesan.</p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button key={i} className="w-9 h-9 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
          {[
            {
              title: "Perusahaan",
              links: [
                { label: "Tentang Kami", page: "tentang" },
                { label: "Karir", page: "karir" },
                { label: "Blog", page: "blog" },
                { label: "Paket Pers", page: "press-kit" },
              ],
            },
            {
              title: "Bantuan",
              links: [
                { label: "Pertanyaan yang Sering Diajukan (FAQ)", page: "faq" },
                { label: "Panduan", page: "panduan" },
                { label: "Kontak", page: "kontak" },
                { label: "Dukungan WhatsApp", page: "whatsapp-support" },
              ],
            },
            {
              title: "Legal",
              links: [
                { label: "Kebijakan Privasi", page: "privasi" },
                { label: "Syarat & Ketentuan", page: "syarat" },
                { label: "Kebijakan Cookie", page: "cookie" },
              ],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, page }) => (
                  <li key={label}>
                    <button onClick={() => nav(page as Page)} className="text-sm text-background/55 hover:text-background transition-colors text-left">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-background/40">© 2025 Invito. Hak cipta dilindungi undang-undang.</p>
          <p className="text-xs text-background/40">Dibuat dengan ❤️ di Indonesia</p>
        </div>
      </div>
    </footer>
  )
}

// ─── FAQ PAGE (BARU) ─────────────────────────────────────────────────────────
// ─── FAQ PAGE (BARU) ─────────────────────────────────────────────────────────
function FaqPage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeCategory, setActiveCategory] = useState("Umum")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["Umum", "Pembayaran", "Fitur", "Teknis", "Akun"]

  const faqs: Record<string, { q: string; a: string }[]> = {
    Umum: [
      {
        q: "Apa itu Invito?",
        a: "Invito adalah platform undangan digital pernikahan #1 di Indonesia yang membantu Anda membuat undangan pernikahan elegan dalam hitungan menit, tanpa keahlian desain."
      },
      {
        q: "Berapa lama waktu pembuatan undangan?",
        a: "Rata-rata pengguna kami menyelesaikan undangan dalam 15-30 menit. Namun, Anda bisa mengedit kapan saja tanpa batas waktu."
      },
      {
        q: "Apakah undangan bisa diakses di semua perangkat?",
        a: "Ya, undangan kami responsif dan dapat dibuka dengan sempurna di desktop, tablet, maupun smartphone."
      },
      {
        q: "Bagaimana cara membagikan undangan?",
        a: "Setelah undangan dipublish, Anda akan mendapat link unik yang bisa dibagikan via WhatsApp, Instagram, Facebook, email, atau media sosial lainnya."
      },
      {
        q: "Apakah ada batasan jumlah tamu?",
        a: "Tidak ada batasan. Anda bisa mengundang sebanyak mungkin tamu sesuai kebutuhan."
      },
    ],
    Pembayaran: [
      {
        q: "Metode pembayaran apa saja yang diterima?",
        a: "Kami menerima Virtual Account (BCA, BNI, BRI, Mandiri, dll), E-Wallet (GoPay, OVO, DANA, ShopeePay), QRIS, Kartu Kredit (Visa, Mastercard, JCB), Gerai (Alfamart, Indomaret), dan PayLater (Kredivo, Akulaku)."
      },
      {
        q: "Apakah ada biaya admin?",
        a: "Untuk Virtual Account, E-Wallet, dan QRIS tidak ada biaya admin. Untuk Kartu Kredit dikenakan biaya 2,9% dan untuk Gerai Rp 2.500."
      },
      {
        q: "Apakah ada garansi uang kembali?",
        a: "Ya, kami menawarkan garansi 7 hari uang kembali jika Anda tidak puas dengan layanan kami."
      },
      {
        q: "Bagaimana jika pembayaran gagal?",
        a: "Anda bisa mencoba lagi dengan metode pembayaran yang sama atau metode lain. Jika masalah berlanjut, hubungi tim support kami."
      },
      {
        q: "Apakah harga sudah termasuk pajak?",
        a: "Ya, semua harga yang tercantum sudah final dan tidak ada biaya tersembunyi."
      },
    ],
    Fitur: [
      {
        q: "Apa perbedaan paket Basic, Standard, dan Premium?",
        a: "Basic cocok untuk pemula dengan fitur dasar. Standard adalah paket paling populer dengan fitur lengkap. Premium menawarkan semua fitur termasuk live streaming dan QR check-in."
      },
      {
        q: "Bisakah saya mengubah tema setelah memilih?",
        a: "Ya, Anda bisa mengubah tema kapan saja melalui editor tanpa kehilangan data yang sudah diisi."
      },
      {
        q: "Bagaimana cara menggunakan fitur RSVP?",
        a: "Fitur RSVP tersedia di semua paket. Tamu bisa konfirmasi kehadiran langsung dari undangan, dan Anda bisa melihat hasilnya di dashboard."
      },
      {
        q: "Apakah bisa menambahkan musik latar?",
        a: "Ya, tersedia di paket Standard dan Premium. Anda bisa memilih dari koleksi musik kami atau upload lagu sendiri."
      },
      {
        q: "Bagaimana cara menggunakan amplop digital?",
        a: "Aktifkan fitur amplop digital di editor, tamu bisa mengirim hadiah langsung melalui berbagai metode pembayaran yang terintegrasi."
      },
    ],
    Teknis: [
      {
        q: "Browser apa yang didukung?",
        a: "Invito mendukung semua browser modern: Chrome, Firefox, Safari, dan Edge. Kami merekomendasikan Chrome untuk performa terbaik."
      },
      {
        q: "Berapa ukuran maksimal foto yang bisa diupload?",
        a: "Setiap foto maksimal 10MB dengan format JPG, PNG, atau WebP. Video maksimal 100MB."
      },
      {
        q: "Apakah data saya aman?",
        a: "Sangat aman. Kami menggunakan enkripsi SSL/TLS, hashing bcrypt untuk password, dan server bersertifikasi ISO 27001."
      },
      {
        q: "Bagaimana jika saya lupa password?",
        a: "Klik 'Lupa password' di halaman login, masukkan email Anda, dan kami akan mengirimkan link reset password."
      },
      {
        q: "Apakah ada aplikasi mobile?",
        a: "Saat ini Invito berbasis web dan responsif di semua perangkat. Aplikasi mobile sedang dalam pengembangan."
      },
    ],
    Akun: [
      {
        q: "Apakah bisa membuat lebih dari 1 undangan?",
        a: "Ya, Anda bisa membuat unlimited undangan dengan 1 akun. Setiap undangan memiliki link dan dashboard terpisah."
      },
      {
        q: "Bagaimana cara upgrade paket?",
        a: "Buka dashboard, pilih undangan yang ingin diupgrade, dan klik tombol upgrade. Biaya dihitung secara prorata."
      },
      {
        q: "Apakah bisa menghapus akun?",
        a: "Ya, melalui pengaturan akun. Data Anda akan dihapus permanen dalam 30 hari."
      },
      {
        q: "Bagaimana cara mengubah email akun?",
        a: "Masuk ke Pengaturan > Profil > Edit Email. Anda perlu verifikasi email baru sebelum perubahan berlaku."
      },
      {
        q: "Apakah ada notifikasi untuk RSVP baru?",
        a: "Ya, Anda akan mendapat notifikasi email dan bisa mengaktifkan notifikasi WhatsApp untuk setiap RSVP baru."
      },
    ],
  }

  // Filter FAQ berdasarkan search dan kategori
  const filteredFaqs = faqs[activeCategory].filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar setPage={setPage} setAuthTab={() => { }} />

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs tracking-wide mb-6">
          <HelpCircle className="w-3 h-3" />Pusat Bantuan
        </div>
        <h1 className="text-5xl font-serif font-bold text-primary mb-4">
          Pertanyaan yang Sering Diajukan
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Temukan jawaban untuk pertanyaan umum seputar Invito
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari pertanyaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-card border border-border rounded-full text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-lg"
          />
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 px-6 sticky top-16 bg-background/95 backdrop-blur-md z-10 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-12 px-6 flex-1">
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              {filteredFaqs.map((faq, index) => (
                <FaqItem key={index} q={faq.q} a={faq.a} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
              <p className="text-muted-foreground">
                Tidak ada pertanyaan yang cocok dengan "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-primary text-sm hover:underline"
              >
                Reset pencarian
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <Headphones className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-semibold mb-3">Masih Ada Pertanyaan?</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Tim support kami siap membantu Anda 6 hari seminggu
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setPage("kontak")}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />Hubungi Kami
            </button>
            <button
              onClick={() => setPage("whatsapp-support")}
              className="px-6 py-3 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />WhatsApp Support
            </button>
          </div>
        </div>
      </section>

      <SiteFooter setPage={setPage} />
    </div>
  )
}

// ── PRESS KIT PAGE (BARU) ──────────────────────────────────────────────────
function PressKitPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar setPage={setPage} setAuthTab={() => { }} />
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs tracking-wide mb-6">
          <Newspaper className="w-3 h-3" />Untuk Media & Pers
        </div>
        <h1 className="text-5xl font-serif font-bold text-primary mb-4">Paket Pers (Press Kit)</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Sumber daya resmi untuk jurnalis, blogger, dan mitra media yang ingin meliput Invito</p>
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto">
          <FileDown className="w-4 h-4" />Download Press Kit (PDF)
        </button>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card rounded-2xl p-7 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4"><Newspaper className="w-6 h-6 text-primary" /></div>
              <h2 className="font-serif text-2xl font-semibold mb-3">Tentang Invito</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Invito adalah platform undangan digital pernikahan #1 di Indonesia yang telah melayani lebih dari 10.000 pasangan di 50+ kota. Didirikan pada tahun 2020, kami berkomitmen membantu setiap pasangan merayakan momen spesial mereka dengan undangan yang elegan, personal, dan mudah dibagikan.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dengan lebih dari 200 tema premium, fitur RSVP otomatis, amplop digital, dan integrasi Google Maps, Invito telah merevolusi cara pasangan Indonesia membuat dan membagikan undangan pernikahan.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-7 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4"><Award className="w-6 h-6 text-primary" /></div>
              <h2 className="font-serif text-2xl font-semibold mb-3">Pencapaian & Penghargaan</h2>
              <ul className="space-y-2.5 text-sm">
                {[
                  "10.000+ pasangan telah menggunakan Invito",
                  "Rating 4.9/5 dari pengguna kami",
                  "Hadir di 50+ kota di Indonesia",
                  "200+ tema premium tersedia",
                  "Featured di Tech in Asia & DailySocial",
                  "Partner resmi Xendit untuk pembayaran",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h2 className="font-serif text-3xl font-semibold mb-8 text-center">Aset Brand</h2>
          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            {[
              { title: "Logo Invito", desc: "Format SVG, PNG (light & dark)", size: "2.4 MB" },
              { title: "Brand Guidelines", desc: "Panduan penggunaan brand lengkap", size: "8.1 MB" },
              { title: "Foto Produk", desc: "Screenshot & mockup undangan", size: "15.3 MB" },
            ].map(({ title, desc, size }, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <FileDown className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">{size}</span>
                  <button className="text-xs text-primary hover:underline flex items-center gap-1">
                    <Download className="w-3 h-3" />Download
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h2 className="font-serif text-3xl font-semibold mb-8 text-center">Tim Manajemen</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { name: "Andi Pratama", role: "CEO & Co-Founder", img: "1560250097-0b93528c311a" },
              { name: "Siti Nurhaliza", role: "Chief Product Officer", img: "1573496359142-b8d87734a5a2" },
              { name: "Budi Santoso", role: "Chief Technology Officer", img: "1519085360753-af0119f7cbe7" },
            ].map(({ name, role, img }, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border text-center">
                <img src={`https://images.unsplash.com/photo-${img}?w=200&h=200&fit=crop&auto=format`} alt={name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
                <h3 className="font-semibold text-sm">{name}</h3>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-semibold mb-4">Hubungi Tim Pers</h2>
          <p className="text-muted-foreground text-sm mb-6">Untuk wawancara, permintaan informasi, atau kolaborasi media</p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-6">
            <div className="bg-card rounded-xl p-4 border border-border">
              <Mail className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground mb-1">Email Pers</p>
              <p className="text-sm font-medium">press@invito.id</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <Phone className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground mb-1">Telepon</p>
              <p className="text-sm font-medium">+62 21 1234 5678</p>
            </div>
          </div>
          <button onClick={() => setPage("kontak")} className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto">
            <MessageCircle className="w-4 h-4" />Kirim Pesan
          </button>
        </div>
      </section>
      <SiteFooter setPage={setPage} />
    </div>
  )
}

// ─── WHATSAPP SUPPORT PAGE (BARU) ────────────────────────────────────────────
function WhatsappSupportPage({ setPage }: { setPage: (p: Page) => void }) {
  const [selectedTopic, setSelectedTopic] = useState("")
  const topics = [
    { icon: CreditCard, label: "Masalah Pembayaran", number: "+62 812-3456-7890" },
    { icon: Settings, label: "Masalah Teknis", number: "+62 812-3456-7891" },
    { icon: Package, label: "Pertanyaan Paket", number: "+62 812-3456-7892" },
    { icon: User, label: "Akun & Login", number: "+62 812-3456-7893" },
  ]
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar setPage={setPage} setAuthTab={() => { }} />
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-xs tracking-wide mb-6 border border-green-200">
          <MessageCircle className="w-3 h-3" />Support via WhatsApp
        </div>
        <h1 className="text-5xl font-serif font-bold text-primary mb-4">Dukungan WhatsApp</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Butuh bantuan cepat? Chat langsung dengan tim support kami via WhatsApp
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-all flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />Chat WhatsApp Sekarang
          </a>
          <button onClick={() => setPage("kontak")} className="px-8 py-3.5 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-all flex items-center gap-2">
            <Mail className="w-4 h-4" />Email Support
          </button>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-center mb-3">Pilih Topik Bantuan</h2>
          <p className="text-muted-foreground text-sm text-center mb-10">Kami akan mengarahkan Anda ke tim yang tepat</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {topics.map(({ icon: Icon, label, number }, i) => (
              <button
                key={i}
                onClick={() => setSelectedTopic(label)}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${selectedTopic === label ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${selectedTopic === label ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-0.5">{label}</h3>
                    <p className="text-xs text-muted-foreground font-mono">{number}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
          {selectedTopic && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 border border-primary/30 mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Topik dipilih</p>
                  <p className="font-semibold">{selectedTopic}</p>
                </div>
              </div>
              <a
                href={`https://wa.me/6281234567890?text=Halo%20Invito,%20saya%20butuh%20bantuan%20terkait%20${encodeURIComponent(selectedTopic)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />Chat WhatsApp Sekarang
              </a>
            </motion.div>
          )}
          <div className="bg-card rounded-2xl p-7 border border-border">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />Jam Operasional Support
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { day: "Senin - Jumat", hours: "08.00 - 21.00 WIB", status: "active" },
                { day: "Sabtu", hours: "09.00 - 17.00 WIB", status: "active" },
                { day: "Minggu", hours: "Tutup", status: "closed" },
                { day: "Hari Libur Nasional", hours: "Tutup", status: "closed" },
              ].map(({ day, hours, status }, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">{day}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${status === "active" ? "text-green-600" : "text-red-500"}`}>{hours}</span>
                    <span className={`w-2 h-2 rounded-full ${status === "active" ? "bg-green-500" : "bg-red-500"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-semibold mb-4">Alternatif Bantuan</h2>
          <p className="text-muted-foreground text-sm mb-8">Jika WhatsApp tidak tersedia, Anda bisa menghubungi kami melalui</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Mail, label: "Email", value: "support@invito.id", page: "kontak" },
              { icon: HelpCircle, label: "FAQ", value: "Lihat pertanyaan umum", page: "faq" },
              { icon: FileText, label: "Panduan", value: "Dokumentasi lengkap", page: "panduan" },
            ].map(({ icon: Icon, label, value, page }, i) => (
              <button
                key={i}
                onClick={() => setPage(page as Page)}
                className="bg-card rounded-xl p-5 border border-border hover:border-primary/40 transition-all text-center"
              >
                <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-semibold text-sm mb-1">{label}</p>
                <p className="text-xs text-muted-foreground">{value}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter setPage={setPage} />
    </div>
  )
}

// ─── FITUR PAGE ──────────────────────────────────────────────────────────────
function FiturPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar setPage={setPage} setAuthTab={() => { }} />
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs tracking-wide mb-6"><Sparkles className="w-3 h-3" />Semua yang Anda Butuhkan</div>
        <h1 className="text-5xl font-serif font-bold text-primary mb-4">Fitur Invito</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">Semua alat untuk membuat undangan digital premium yang modern dan mudah digunakan.</p>
        <button onClick={() => setPage("checkout")} className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto">Mulai Gratis <ArrowRight className="w-4 h-4" /></button>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-3 text-center">Fitur Unggulan</p>
          <h2 className="font-serif text-4xl font-semibold text-center mb-12">8 Fitur Terbaik Invito</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MessageCircle, title: "RSVP Otomatis", desc: "Kelola konfirmasi kehadiran secara otomatis via WhatsApp dan email." },
              { icon: Users, title: "Buku Tamu Digital", desc: "Catat dan kelola tamu dengan mudah, lengkap dengan catatan khusus." },
              { icon: Clock, title: "Countdown", desc: "Hitung mundur acara dengan tampilan elegan di undangan." },
              { icon: Camera, title: "Galeri Foto", desc: "Unggah foto pre-wedding, galeri acara, dan video highlight." },
              { icon: Music, title: "Musik Latar", desc: "Tambahkan soundtrack khusus untuk menambah suasana romantis." },
              { icon: MapPin, title: "Google Maps", desc: "Tampilkan lokasi venue secara interaktif dengan peta terintegrasi." },
              { icon: Heart, title: "Love Story", desc: "Ceritakan kisah cinta Anda dalam bentuk timeline yang indah." },
              { icon: QrCode, title: "QR Check-in", desc: "Masuk ke acara hanya dengan scan QR, memudahkan seluruh tamu." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex flex-col items-center text-center p-6 bg-card rounded-2xl border border-border hover:shadow-[0_8px_32px_rgba(196,149,74,0.1)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-primary" /></div>
                <h3 className="font-semibold text-sm mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-3 text-center">Cara Kerja</p>
          <h2 className="font-serif text-4xl font-semibold text-center mb-12">Mudah dalam 3 Langkah</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Layout, num: "01", title: "Pilih Template", desc: "Pilih desain yang cocok dengan tema pernikahan Anda dari ratusan pilihan." },
              { icon: Edit3, num: "02", title: "Isi Data", desc: "Masukkan detail acara, foto, dan informasi tamu dengan mudah." },
              { icon: Share2, num: "03", title: "Bagikan Undangan", desc: "Bagikan tautan melalui WhatsApp, email, atau media sosial." },
            ].map(({ icon: Icon, num, title, desc }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(196,149,74,0.4)]"><Icon className="w-7 h-7" /></div>
                  <span className="absolute -top-2 -right-2 text-[10px] font-mono text-primary/60 bg-card border border-primary/20 rounded-full w-5 h-5 flex items-center justify-center">{num}</span>
                </div>
                <h3 className="font-serif font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-3 text-center">FAQ</p>
          <h2 className="font-serif text-4xl font-semibold text-center mb-10">Pertanyaan Umum</h2>
          <div className="divide-y divide-border">
            {[
              { q: "Bagaimana cara membuat undangan?", a: "Pilih template, isi data acara dan tamu, lalu bagikan tautan undangan kepada tamu Anda." },
              { q: "Apakah ada biaya untuk fitur dasar?", a: "Tidak, semua fitur dasar tersedia secara gratis. Paket premium menawarkan fitur tambahan eksklusif." },
              { q: "Bisakah saya mengubah desain setelah dipublikasikan?", a: "Ya, Anda dapat mengedit konten kapan saja melalui dashboard tanpa batas." },
              { q: "Apakah undangan dapat diakses di semua perangkat?", a: "Undangan responsif dan dapat dibuka di desktop, tablet, maupun ponsel dengan tampilan optimal." },
              { q: "Bagaimana keamanan data tamu saya?", a: "Data disimpan dengan enkripsi SSL dan hanya dapat diakses oleh Anda sebagai pemilik akun." },
            ].map(({ q, a }, i) => <FaqItem key={i} q={q} a={a} />)}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-10 h-10 text-primary fill-primary/15 mx-auto mb-5" />
          <h2 className="font-serif text-4xl font-semibold mb-4">Siap Membuat Undangan Impian?</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">Bergabung dengan 10.000+ pasangan yang telah mempercayai Invito.</p>
          <button onClick={() => setPage("checkout")} className="px-8 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto">Mulai Gratis <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>
      <SiteFooter setPage={setPage} />
    </div>
  )
}

// ─── TEMA PAGE ───────────────────────────────────────────────────────────────
function TemaPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar setPage={setPage} setAuthTab={() => { }} />
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs tracking-wide mb-6"><Palette className="w-3 h-3" />Koleksi Eksklusif</div>
        <h1 className="text-5xl font-serif font-bold text-primary mb-4">Pilihan Tema Invito</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">Ratusan tema elegan dirancang khusus untuk membuat momen pernikahan Anda semakin berkesan.</p>
        <button onClick={() => setPage("checkout")} className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto">Mulai Pakai Tema <ArrowRight className="w-4 h-4" /></button>
      </section>
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-semibold mb-8">Jelajahi Kategori Tema</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Semua", "Elegan", "Floral", "Minimalist", "Modern", "Traditional", "Luxury", "Rustic"].map((cat) => (
              <button key={cat} className="px-5 py-2 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-colors">{cat}</button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {THEMES.map(({ name, img, badge }, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }} className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-52 overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-${img}?w=600&h=400&fit=crop&auto=format`} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                  {badge && <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-primary-foreground rounded-full text-[10px] font-medium">{badge}</div>}
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div><h3 className="font-semibold text-sm">{name}</h3><p className="text-[11px] text-muted-foreground mt-0.5">24 variasi tersedia</p></div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-[11px] border border-border rounded-full hover:border-primary hover:text-primary transition-colors">Preview</button>
                    <button onClick={() => setPage("checkout")} className="px-3 py-1.5 text-[11px] bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">Gunakan</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ value: "200+", label: "Tema Tersedia" }, { value: "10K+", label: "Pasangan Puas" }, { value: "50+", label: "Desainer Profesional" }, { value: "4.9★", label: "Rating Rata-rata" }].map(({ value, label }) => (
            <div key={label} className="bg-card border border-border rounded-2xl p-6"><p className="text-2xl font-bold text-primary mb-1">{value}</p><p className="text-xs text-muted-foreground">{label}</p></div>
          ))}
        </div>
      </section>
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-10 h-10 text-primary fill-primary/15 mx-auto mb-5" />
          <h2 className="font-serif text-4xl font-semibold mb-4">Temukan Tema Sempurna Anda</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">Setiap tema dapat dikustomisasi sesuai selera Anda.</p>
          <button onClick={() => setPage("checkout")} className="px-8 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto">Mulai Gratis <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>
      <SiteFooter setPage={setPage} />
    </div>
  )
}

// ─── HARGA PAGE ──────────────────────────────────────────────────────────────
function HargaPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar setPage={setPage} setAuthTab={() => { }} />
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs tracking-wide mb-6"><Package className="w-3 h-3" />Harga Transparan</div>
        <h1 className="text-5xl font-serif font-bold text-primary mb-4">Harga Invito</h1>
        <p className="text-lg text-muted-foreground mb-4 max-w-xl mx-auto">Pilih paket yang sesuai kebutuhan Anda. Mulai gratis, upgrade kapan saja.</p>
        <p className="text-sm text-primary font-medium">Tanpa biaya tersembunyi</p>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative bg-card rounded-3xl p-7 border-2 transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(196,149,74,0.12)] ${pkg.popular ? "border-primary" : "border-border"}`}>
                {pkg.popular && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-[10px] font-medium whitespace-nowrap">PALING POPULER</div>}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${pkg.popular ? "bg-primary/15" : "bg-muted"}`}><Package className={`w-5 h-5 ${pkg.popular ? "text-primary" : "text-muted-foreground"}`} /></div>
                <h3 className="font-serif text-xl font-semibold mb-1">{pkg.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{pkg.subtitle}</p>
                <div className="mb-5">
                  {pkg.originalPrice && <p className="text-xs text-muted-foreground line-through mb-0.5">{fmt(pkg.originalPrice)}</p>}
                  <p className="text-3xl font-bold text-foreground">{fmt(pkg.price)}</p>
                </div>
                <ul className="space-y-2.5 mb-7">{pkg.features.map((f, j) => (<li key={j} className="flex items-start gap-2 text-xs"><Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${pkg.popular ? "text-primary" : "text-muted-foreground"}`} />{f}</li>))}</ul>
                <button onClick={() => setPage("checkout")} className={`w-full py-3 rounded-full text-sm transition-all ${pkg.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border hover:border-primary hover:text-primary"}`}>Pilih Paket {pkg.name}</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-center mb-10">Perbandingan Fitur</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border"><th className="text-left p-4 font-semibold">Fitur</th>{PACKAGES.map(p => <th key={p.id} className={`p-4 font-semibold text-center ${p.popular ? "text-primary" : ""}`}>{p.name}</th>)}</tr></thead>
              <tbody className="divide-y divide-border">
                {[
                  { label: "Link undangan digital", values: [true, true, true] },
                  { label: "RSVP & ucapan tamu", values: [true, true, true] },
                  { label: "Galeri foto", values: ["10 item", "Tak terbatas", "Tak terbatas"] },
                  { label: "Custom domain", values: [false, true, true] },
                  { label: "Musik latar", values: [false, true, true] },
                  { label: "Amplop digital", values: [false, true, true] },
                  { label: "QR Code Check-In", values: [false, false, true] },
                  { label: "Live streaming", values: [false, false, true] },
                  { label: "Support prioritas", values: [false, false, true] },
                ].map(({ label, values }) => (
                  <tr key={label} className="hover:bg-muted/50">
                    <td className="p-4 text-muted-foreground">{label}</td>
                    {values.map((v, i) => (<td key={i} className="p-4 text-center">{v === true ? <Check className="w-4 h-4 text-primary mx-auto" /> : v === false ? <span className="text-muted-foreground/40">—</span> : <span className="text-xs font-medium">{v}</span>}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-center mb-10">FAQ Seputar Harga</h2>
          <div className="divide-y divide-border">
            {[
              { q: "Apakah ada uji coba gratis?", a: "Ya, paket Basic tersedia gratis tanpa batas waktu." },
              { q: "Apa metode pembayaran yang diterima?", a: "Kami menerima transfer bank, e-wallet (GoPay, OVO, DANA), QRIS, kartu kredit, dan gerai Alfamart/Indomaret." },
              { q: "Apakah harga sudah termasuk pajak?", a: "Harga yang ditampilkan sudah final dan tidak ada biaya tersembunyi." },
              { q: "Bisakah saya upgrade paket di tengah jalan?", a: "Ya, Anda bisa upgrade kapan saja dengan biaya dihitung secara prorata." },
              { q: "Apakah ada refund jika tidak puas?", a: "Kami menawarkan garansi 7 hari uang kembali jika Anda tidak puas." },
            ].map(({ q, a }, i) => <FaqItem key={i} q={q} a={a} />)}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-10 h-10 text-primary fill-primary/15 mx-auto mb-5" />
          <h2 className="font-serif text-4xl font-semibold mb-4">Mulai Perjalanan Anda Hari Ini</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">Bergabung gratis, tanpa kartu kredit diperlukan.</p>
          <button onClick={() => setPage("checkout")} className="px-8 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto">Mulai Gratis <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>
      <SiteFooter setPage={setPage} />
    </div>
  )
}

// ─── BLOG PAGE ───────────────────────────────────────────────────────────────
function BlogPage({ setPage }: { setPage: (p: Page) => void }) {
  const POSTS = [
    { title: "10 Inspirasi Undangan Digital Pernikahan 2025", cat: "Inspirasi", date: "10 Jul 2025", read: "5 mnt", img: "1519225421980-715cb0215aed" },
    { title: "Cara Membuat RSVP Digital yang Efektif", cat: "Tips & Trik", date: "5 Jul 2025", read: "4 mnt", img: "1550005809-91ad75fb315f" },
    { title: "Tren Undangan Pernikahan Minimalis", cat: "Tren", date: "1 Jul 2025", read: "6 mnt", img: "1464366400600-7168b8af9bc3" },
    { title: "Panduan Lengkap Amplop Digital untuk Tamu", cat: "Panduan", date: "25 Jun 2025", read: "7 mnt", img: "1469371670807-013ccf25f16a" },
    { title: "Memilih Musik Latar yang Tepat untuk Undangan", cat: "Tips & Trik", date: "20 Jun 2025", read: "3 mnt", img: "1583939003579-730e3918a45a" },
  ]
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar setPage={setPage} setAuthTab={() => { }} />
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs tracking-wide mb-6"><FileText className="w-3 h-3" />Blog & Inspirasi</div>
        <h1 className="text-5xl font-serif font-bold text-primary mb-4">Blog Invito</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">Tips, inspirasi, dan panduan untuk membuat undangan pernikahan yang sempurna.</p>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-6">Artikel Pilihan</p>
          <div className="grid md:grid-cols-2 gap-0 bg-card border border-border rounded-3xl overflow-hidden">
            <div className="relative h-64 md:h-auto overflow-hidden"><img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop&auto=format" alt="Featured" className="w-full h-full object-cover" /></div>
            <div className="p-8 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full mb-4 w-fit">Inspirasi</span>
              <h2 className="font-serif text-2xl font-semibold mb-4">10 Inspirasi Undangan Digital Pernikahan 2025</h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Temukan inspirasi terbaik untuk membuat undangan pernikahan digital yang memukau tamu Anda.</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6"><span>10 Jul 2025</span><span>•</span><span>5 menit baca</span></div>
              <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary/90 transition-all flex items-center gap-2 w-fit">Baca Selengkapnya <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-4 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2">
          {["Semua", "Inspirasi", "Tips & Trik", "Panduan", "Tren"].map((cat) => (
            <button key={cat} className="px-4 py-1.5 border border-border rounded-full text-xs hover:border-primary hover:text-primary transition-colors">{cat}</button>
          ))}
        </div>
      </section>
      <section className="py-10 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.slice(1).map(({ title, cat, date, read, img }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-[0_8px_32px_rgba(196,149,74,0.1)] hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-44 overflow-hidden"><img src={`https://images.unsplash.com/photo-${img}?w=600&h=400&fit=crop&auto=format`} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                <div className="p-5">
                  <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full mb-3">{cat}</span>
                  <h3 className="font-semibold text-sm mb-3 leading-snug">{title}</h3>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground"><span>{date}</span><span>•</span><span>{read} baca</span></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Bell className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-semibold mb-3">Langganan Newsletter</h2>
          <p className="text-muted-foreground text-sm mb-8">Dapatkan artikel terbaru, tips pernikahan, dan promo eksklusif langsung di inbox Anda.</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Masukkan email Anda..." className="flex-1 px-4 py-3 bg-card border border-border rounded-full text-sm focus:outline-none focus:border-primary transition-colors" />
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary/90 transition-all whitespace-nowrap">Langganan</button>
          </div>
        </div>
      </section>
      <SiteFooter setPage={setPage} />
    </div>
  )
}

// ── TENTANG PAGE ────────────────────────────────────────────────────────────
function TentangPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar setPage={setPage} setAuthTab={() => { }} />
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs tracking-wide mb-6"><Sparkles className="w-3 h-3" />Kisah Kami</div>
        <h1 className="text-5xl font-serif font-bold text-primary mb-4">Tentang Invito</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Kami percaya setiap kisah cinta layak dirayakan dengan cara yang istimewa. Invito hadir untuk mewujudkan undangan pernikahan digital impian Anda.</p>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Users, value: "10.000+", label: "Pasangan Bahagia" },
            { icon: Palette, value: "200+", label: "Tema Tersedia" },
            { icon: Star, value: "4.9/5", label: "Rating Pengguna" },
            { icon: Globe, value: "50+", label: "Kota di Indonesia" },
          ].map(({ icon: Icon, value, label }) => (
            <motion.div key={label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card border border-border rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(196,149,74,0.08)] transition-all">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3"><Icon className="w-5 h-5 text-primary" /></div>
              <p className="text-2xl font-bold text-primary mb-1">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-3 text-center">Misi & Visi</p>
          <h2 className="font-serif text-4xl font-semibold text-center mb-12">Mengapa Kami Ada</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-3xl p-8 border border-border hover:shadow-[0_8px_32px_rgba(196,149,74,0.1)] transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-5"><Heart className="w-6 h-6 text-primary" /></div>
              <h3 className="font-serif text-2xl font-semibold mb-3">Misi Kami</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Mempermudah setiap pasangan di Indonesia untuk menciptakan undangan pernikahan digital yang indah, personal, dan berkesan — dengan teknologi yang sederhana dan harga yang terjangkau.</p>
            </div>
            <div className="bg-card rounded-3xl p-8 border border-border hover:shadow-[0_8px_32px_rgba(196,149,74,0.1)] transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-5"><Zap className="w-6 h-6 text-primary" /></div>
              <h3 className="font-serif text-2xl font-semibold mb-3">Visi Kami</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Menjadi platform undangan digital #1 di Asia Tenggara yang menghubungkan jutaan pasangan dengan teknologi modern, desain premium, dan pengalaman yang tak terlupakan.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-3 text-center">Perjalanan Kami</p>
          <h2 className="font-serif text-4xl font-semibold text-center mb-14">Milestone Invito</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            {[
              { year: "2020", title: "Invito Didirikan", desc: "Berawal dari ide sederhana — membuat undangan pernikahan lebih mudah dan berkesan. Tim pertama kami terdiri dari 3 orang di Bandung.", icon: Sparkles },
              { year: "2021", title: "100 Pengguna Pertama", desc: "Milestone pertama kami! 100 pasangan mempercayai Invito untuk hari spesial mereka.", icon: Users },
              { year: "2022", title: "Peluncuran Versi Premium", desc: "Meluncurkan paket Standard dan Premium dengan fitur RSVP otomatis, amplop digital, dan Google Maps terintegrasi.", icon: Package },
              { year: "2023", title: "5.000+ Pasangan", desc: "Komunitas Invito berkembang pesat. Ratusan tema baru ditambahkan setiap bulan.", icon: TrendingUp },
              { year: "2024", title: "10.000+ Pasangan", desc: "Mencapai milestone 10.000 pasangan dan hadir di 50+ kota di seluruh Indonesia.", icon: Heart },
              { year: "2025", title: "Ekspansi Asia Tenggara", desc: "Mempersiapkan ekspansi ke Malaysia, Singapura, dan Thailand.", icon: Globe },
            ].map(({ year, title, desc, icon: Icon }, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative pl-12 pb-10 last:pb-0">
                <div className="absolute left-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-[0_0_0_4px_hsl(var(--background))]">
                  <Icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-xs text-primary font-medium tracking-wider">{year}</span>
                <h3 className="font-semibold text-base mt-1 mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-3 text-center">Nilai Kami</p>
          <h2 className="font-serif text-4xl font-semibold text-center mb-12">Yang Kami Percaya</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Inovasi", desc: "Kami terus berinovasi untuk menghadirkan fitur terbaik yang memudahkan hidup pengguna kami." },
              { icon: Shield, title: "Kepercayaan", desc: "Data dan privasi pengguna adalah prioritas utama kami. Keamanan tidak pernah kami kompromikan." },
              { icon: Heart, title: "Kepedulian", desc: "Setiap pasangan istimewa. Kami hadir untuk memastikan momen mereka dirayakan dengan sempurna." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-7 border border-border text-center hover:shadow-[0_8px_32px_rgba(196,149,74,0.08)] transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4"><Icon className="w-6 h-6 text-primary" /></div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-10 h-10 text-primary fill-primary/15 mx-auto mb-5" />
          <h2 className="font-serif text-4xl font-semibold mb-4">Bergabunglah Bersama Kami</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">Jadilah bagian dari keluarga besar Invito dan ciptakan momen yang tak terlupakan.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => setPage("checkout")} className="px-8 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-2">Mulai Gratis <ArrowRight className="w-4 h-4" /></button>
            <button onClick={() => setPage("kontak")} className="px-8 py-3.5 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-all">Hubungi Kami</button>
          </div>
        </div>
      </section>
      <SiteFooter setPage={setPage} />
    </div>
  )
}

// ─── KARIR PAGE ──────────────────────────────────────────────────────────────
function KarirPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar setPage={setPage} setAuthTab={() => { }} />
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs tracking-wide mb-6"><Users className="w-3 h-3" />Kami Sedang Berkembang</div>
        <h1 className="text-5xl font-serif font-bold text-primary mb-4">Karir di Invito</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Bergabunglah dengan tim kami yang bersemangat untuk mengubah cara orang merayakan momen spesial mereka.</p>
        <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto">Lihat Posisi Terbuka <ArrowRight className="w-4 h-4" /></button>
      </section>
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-3 text-center">Kenapa Invito?</p>
          <h2 className="font-serif text-4xl font-semibold text-center mb-12">Manfaat Bergabung</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Pertumbuhan Cepat", desc: "Kembangkan karir Anda di perusahaan yang tumbuh 300% per tahun." },
              { icon: Heart, title: "Tim yang Solid", desc: "Bekerja bersama orang-orang berbakat, suportif, dan penuh semangat." },
              { icon: Gift, title: "Kompensasi Kompetitif", desc: "Gaji kompetitif, bonus kinerja, dan equity untuk karyawan senior." },
              { icon: Monitor, title: "Remote Friendly", desc: "Fleksibilitas bekerja dari mana saja di seluruh Indonesia." },
              { icon: TrendingUp, title: "Pengembangan Diri", desc: "Budget khusus untuk pelatihan, kursus, dan konferensi profesional." },
              { icon: Headphones, title: "Kesehatan & Wellbeing", desc: "Asuransi kesehatan lengkap, akses gym, dan mental health support." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="bg-card rounded-2xl p-6 border border-border hover:shadow-[0_8px_32px_rgba(196,149,74,0.1)] hover:-translate-y-1 transition-all">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-primary" /></div>
                <h3 className="font-semibold text-sm mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-3 text-center">Posisi Terbuka</p>
          <h2 className="font-serif text-4xl font-semibold text-center mb-12">Bergabung Sekarang</h2>
          <div className="space-y-4">
            {[
              { title: "Senior Frontend Engineer", dept: "Engineering", type: "Full-time", loc: "Remote / Bandung" },
              { title: "UI/UX Designer", dept: "Design", type: "Full-time", loc: "Remote / Jakarta" },
              { title: "Product Manager", dept: "Product", type: "Full-time", loc: "Jakarta" },
              { title: "Digital Marketing Specialist", dept: "Marketing", type: "Full-time", loc: "Remote" },
              { title: "Customer Success Manager", dept: "Operations", type: "Full-time", loc: "Jakarta / Surabaya" },
            ].map(({ title, dept, type, loc }, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-card rounded-2xl border border-border hover:border-primary hover:shadow-[0_4px_20px_rgba(196,149,74,0.1)] transition-all group">
                <div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-[10px] px-2.5 py-0.5 bg-primary/10 text-primary rounded-full">{dept}</span>
                    <span className="text-[10px] px-2.5 py-0.5 bg-muted text-muted-foreground rounded-full">{type}</span>
                    <span className="text-[10px] px-2.5 py-0.5 bg-muted text-muted-foreground rounded-full flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{loc}</span>
                  </div>
                </div>
                <button className="mt-4 sm:mt-0 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-xs font-medium hover:bg-primary/90 transition-all whitespace-nowrap">Lamar Sekarang</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-center mb-10">Budaya Kerja Kami</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Heart, title: "Passion First", desc: "Kami bekerja dengan penuh semangat karena kami peduli pada produk dan pengguna kami." },
              { icon: Users, title: "Team Work", desc: "Kolaborasi adalah kunci. Kami percaya hasil terbaik lahir dari kerja sama tim yang solid." },
              { icon: TrendingUp, title: "Grow Together", desc: "Pertumbuhan individu adalah pertumbuhan perusahaan. Kami tumbuh bersama." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-card rounded-2xl p-7 border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4"><Icon className="w-6 h-6 text-primary" /></div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Sparkles className="w-10 h-10 text-primary mx-auto mb-5" />
          <h2 className="font-serif text-4xl font-semibold mb-4">Tidak Menemukan Posisi yang Tepat?</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">Kirimkan CV Anda dan ceritakan bagaimana Anda bisa berkontribusi untuk Invito.</p>
          <button onClick={() => setPage("kontak")} className="px-8 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto">Kirim Lamaran <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>
      <SiteFooter setPage={setPage} />
    </div>
  )
}

// ─── KONTAK PAGE ─────────────────────────────────────────────────────────────
function KontakPage({ setPage }: { setPage: (p: Page) => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Pesan berhasil dikirim! Kami akan menghubungi Anda segera.") }
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar setPage={setPage} setAuthTab={() => { }} />
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs tracking-wide mb-6"><MessageCircle className="w-3 h-3" />Kami Siap Membantu</div>
        <h1 className="text-5xl font-serif font-bold text-primary mb-4">Hubungi Kami</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">Ada pertanyaan atau butuh bantuan? Tim kami siap membantu Anda kapan saja.</p>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              { icon: Mail, title: "Email", value: "halo@invito.id", sub: "Balas dalam 1x24 jam" },
              { icon: Phone, title: "WhatsApp", value: "+62 812-3456-7890", sub: "Senin–Sabtu 08.00–21.00" },
              { icon: MapPin, title: "Kantor", value: "Jl. Sudirman No. 1, Bandung", sub: "Jawa Barat 40114" },
              { icon: Clock, title: "Jam Operasional", value: "08.00 – 21.00 WIB", sub: "Senin – Sabtu" },
            ].map(({ icon: Icon, title, value, sub }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-[0_8px_32px_rgba(196,149,74,0.08)] transition-all">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3"><Icon className="w-5 h-5 text-primary" /></div>
                <p className="font-semibold text-sm mb-1">{title}</p>
                <p className="text-sm text-foreground mb-1">{value}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="font-serif text-3xl font-semibold mb-8">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium mb-1.5 block">Nama Lengkap</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nama Anda" className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" required />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@Anda.com" className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium mb-1.5 block">Nomor WhatsApp</label>
                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+62 8xx-xxxx-xxxx" className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block">Subjek</label>
                    <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors">
                      <option value="">Pilih subjek...</option>
                      <option>Pertanyaan Umum</option>
                      <option>Masalah Teknis</option>
                      <option>Pembayaran</option>
                      <option>Kemitraan</option>
                      <option>Lainnya</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block">Pesan</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Ceritakan kebutuhan Anda..." rows={5} className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors resize-none" required />
                </div>
                <button type="submit" className="w-full py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-[0_4px_16px_rgba(196,149,74,0.4)] flex items-center justify-center gap-2">
                  Kirim Pesan <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
            <div>
              <h3 className="font-semibold mb-5">Ikuti Kami</h3>
              <div className="space-y-3 mb-8">
                {[
                  { Icon: Instagram, label: "@invito.id", color: "hover:text-pink-500" },
                  { Icon: Facebook, label: "Invito Indonesia", color: "hover:text-blue-500" },
                  { Icon: Twitter, label: "@invitoid", color: "hover:text-sky-500" },
                ].map(({ Icon, label, color }) => (
                  <button key={label} className={`flex items-center gap-3 text-sm text-muted-foreground ${color} transition-colors w-full`}>
                    <div className="w-9 h-9 bg-card border border-border rounded-full flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4" /></div>
                    {label}
                  </button>
                ))}
              </div>
              <h3 className="font-semibold mb-4">Bantuan Cepat</h3>
              <div className="space-y-2.5">
                {[
                  { label: "Panduan Penggunaan", page: "panduan" },
                  { label: "Pertanyaan Umum (FAQ)", page: "faq" },
                  { label: "Kebijakan Privasi", page: "privasi" },
                  { label: "Syarat & Ketentuan", page: "syarat" },
                ].map(({ label, page }) => (
                  <button key={label} onClick={() => setPage(page as Page)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-full">
                    <ChevronRight className="w-4 h-4" />{label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-center mb-10">Pertanyaan yang Sering Diajukan</h2>
          <div className="divide-y divide-border">
            {[
              { q: "Berapa lama waktu respons tim Invito?", a: "Tim kami membalas pesan dalam 1x24 jam pada hari kerja. Untuk pertanyaan mendesak, hubungi kami via WhatsApp." },
              { q: "Apakah ada dukungan telepon?", a: "Saat ini kami melayani via WhatsApp, email, dan live chat di website. Dukungan via telepon tersedia untuk pengguna Premium." },
              { q: "Bagaimana cara melaporkan bug atau masalah teknis?", a: "Kirimkan detail masalah beserta screenshot melalui formulir di atas atau email ke support@invito.id." },
              { q: "Apakah ada biaya untuk menghubungi support?", a: "Tidak ada biaya untuk menghubungi tim support kami. Layanan bantuan tersedia untuk semua pengguna." },
            ].map(({ q, a }, i) => <FaqItem key={i} q={q} a={a} />)}
          </div>
        </div>
      </section>
      <SiteFooter setPage={setPage} />
    </div>
  )
}

// ─── PANDUAN PAGE ────────────────────────────────────────────────────────────
function PanduanPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar setPage={setPage} setAuthTab={() => { }} />
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs tracking-wide mb-6"><FileText className="w-3 h-3" />Dokumentasi Lengkap</div>
        <h1 className="text-5xl font-serif font-bold text-primary mb-4">Panduan Invito</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">Pelajari cara membuat, mengkustomisasi, dan membagikan undangan pernikahan digital Anda.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => setPage("checkout")} className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-2">Mulai Sekarang <ArrowRight className="w-4 h-4" /></button>
          <button onClick={() => setPage("kontak")} className="px-6 py-3 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-all">Hubungi Support</button>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-3 text-center">Mulai Cepat</p>
          <h2 className="font-serif text-4xl font-semibold text-center mb-12">Cara Membuat Undangan</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "1", icon: User, title: "Daftar Akun", desc: "Buat akun gratis dengan email atau Google. Tidak perlu kartu kredit." },
              { num: "2", icon: Layout, title: "Pilih Template", desc: "Pilih dari 200+ tema elegan. Filter berdasarkan gaya, warna, atau konsep." },
              { num: "3", icon: Edit3, title: "Edit Konten", desc: "Isi data pernikahan, foto, RSVP, dan informasi venue dengan mudah." },
              { num: "4", icon: Share2, title: "Bagikan", desc: "Salin link dan bagikan via WhatsApp, email, atau sosial media." },
            ].map(({ num, icon: Icon, title, desc }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative bg-card rounded-2xl p-6 border border-border hover:shadow-[0_8px_32px_rgba(196,149,74,0.08)] transition-all">
                <span className="absolute top-4 right-4 text-4xl font-bold text-primary/10">{num}</span>
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-primary" /></div>
                <h3 className="font-semibold text-sm mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-center mb-10">Panduan Fitur</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: MessageCircle, title: "Menggunakan RSVP", desc: "Aktifkan fitur RSVP dan konfirmasi otomatis via WhatsApp untuk mengelola daftar tamu Anda." },
              { icon: Camera, title: "Galeri Foto & Video", desc: "Unggah hingga 100 foto dan video pre-wedding langsung dari perangkat Anda." },
              { icon: Music, title: "Musik Latar", desc: "Pilih dari koleksi musik pernikahan atau unggah lagu favorit Anda sendiri." },
              { icon: MapPin, title: "Integrasi Google Maps", desc: "Tambahkan lokasi venue dengan peta interaktif agar tamu mudah menemukan venue." },
              { icon: Globe, title: "Custom Domain", desc: "Gunakan domain pribadi seperti pernikahan-namaanda.id untuk kesan lebih profesional." },
              { icon: QrCode, title: "QR Code Check-in", desc: "Sederhanakan proses registrasi tamu dengan sistem QR code check-in di venue." },
              { icon: Gift, title: "Amplop Digital", desc: "Terima hadiah digital dari tamu dengan berbagai metode pembayaran yang terintegrasi." },
              { icon: Settings, title: "Pengaturan Akun", desc: "Kelola profil, notifikasi, dan preferensi akun Anda kapan saja." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/40 hover:shadow-[0_4px_16px_rgba(196,149,74,0.08)] transition-all cursor-pointer group">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"><Icon className="w-5 h-5 text-primary" /></div>
                <div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-center mb-10">FAQ Teknis</h2>
          <div className="divide-y divide-border">
            {[
              { q: "Browser apa yang didukung Invito?", a: "Invito mendukung semua browser modern termasuk Chrome, Firefox, Safari, dan Edge. Kami merekomendasikan Chrome untuk performa terbaik." },
              { q: "Apakah undangan bisa diedit setelah dipublikasikan?", a: "Ya, Anda bisa mengedit kapan saja. Perubahan akan langsung terlihat di link undangan tanpa perlu membagikan ulang." },
              { q: "Berapa ukuran foto yang bisa diunggah?", a: "Setiap foto maksimal 10MB dengan format JPG, PNG, atau WebP. Video maksimal 100MB." },
              { q: "Apakah ada batas jumlah tamu?", a: "Tidak ada batas jumlah tamu. Anda bisa mengelola ribuan tamu dalam satu undangan." },
              { q: "Bisakah saya mengunduh undangan sebagai PDF?", a: "Fitur unduh PDF tersedia di paket Premium. Anda bisa mengunduh versi cetak undangan Anda." },
            ].map(({ q, a }, i) => <FaqItem key={i} q={q} a={a} />)}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <Headphones className="w-10 h-10 text-primary mx-auto mb-5" />
          <h2 className="font-serif text-3xl font-semibold mb-4">Masih Butuh Bantuan?</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">Tim support kami siap membantu Anda 6 hari seminggu.</p>
          <button onClick={() => setPage("kontak")} className="px-8 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto">Hubungi Support <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>
      <SiteFooter setPage={setPage} />
    </div>
  )
}

// ─── PRIVASI PAGE ────────────────────────────────────────────────────────────
function PrivasiPage({ setPage }: { setPage: (p: Page) => void }) {
  const sections = [
    { icon: Shield, title: "Informasi yang Kami Kumpulkan", content: "Kami mengumpulkan informasi yang Anda berikan langsung kepada kami, termasuk nama, alamat email, nomor telepon, dan informasi pembayaran saat Anda mendaftar atau melakukan transaksi. Kami juga mengumpulkan data penggunaan seperti halaman yang dikunjungi, waktu akses, dan preferensi fitur untuk meningkatkan layanan kami." },
    { icon: Eye, title: "Bagaimana Kami Menggunakan Data", content: "Data Anda digunakan untuk menyediakan dan meningkatkan layanan Invito, memproses pembayaran, mengirimkan notifikasi penting, dan memberikan dukungan pelanggan. Kami tidak menjual data pribadi Anda kepada pihak ketiga untuk tujuan pemasaran." },
    { icon: Users, title: "Berbagi Informasi", content: "Kami dapat berbagi informasi dengan mitra bisnis terpercaya yang membantu kami menyediakan layanan (seperti pemroses pembayaran), otoritas hukum jika diwajibkan oleh hukum, atau dengan persetujuan eksplisit Anda. Semua mitra terikat oleh perjanjian kerahasiaan yang ketat." },
    { icon: Shield, title: "Keamanan Data", content: "Kami menggunakan enkripsi SSL/TLS untuk semua transmisi data, menyimpan kata sandi dengan hashing bcrypt, dan melakukan audit keamanan berkala. Server kami berlokasi di pusat data bersertifikasi ISO 27001 di Indonesia." },
    { icon: Settings, title: "Hak Anda", content: "Anda memiliki hak untuk mengakses, memperbarui, atau menghapus data pribadi Anda kapan saja melalui pengaturan akun. Anda juga dapat mengajukan permintaan penghapusan data lengkap dengan menghubungi tim kami di privasi@invito.id." },
    { icon: Bell, title: "Perubahan Kebijakan", content: "Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan signifikan akan diberitahukan melalui email atau notifikasi di aplikasi minimal 14 hari sebelum berlaku. Penggunaan layanan setelah perubahan berlaku menandakan persetujuan Anda." },
  ]
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar setPage={setPage} setAuthTab={() => { }} />
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs tracking-wide mb-6"><Shield className="w-3 h-3" />Privasi & Keamanan</div>
        <h1 className="text-5xl font-serif font-bold text-primary mb-4">Kebijakan Privasi</h1>
        <p className="text-lg text-muted-foreground mb-4 max-w-xl mx-auto">Privasi Anda adalah prioritas utama kami. Pelajari bagaimana kami melindungi data Anda.</p>
        <p className="text-xs text-muted-foreground">Terakhir diperbarui: 1 Januari 2025</p>
      </section>
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[{ icon: Shield, label: "Enkripsi SSL" }, { icon: Shield, label: "Data Terenkripsi" }, { icon: CheckCircle2, label: "GDPR Compliant" }, { icon: Star, label: "ISO 27001" }].map(({ icon: Icon, label }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-4 text-center">
              <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs font-medium">{label}</p>
            </div>
          ))}
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map(({ icon: Icon, title, content }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl p-7 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4 text-primary" /></div>
                <h2 className="font-semibold">{title}</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl font-semibold mb-4">Pertanyaan tentang Privasi?</h2>
          <p className="text-muted-foreground text-sm mb-6">Hubungi tim privasi kami di privasi@invito.id atau melalui formulir kontak.</p>
          <button onClick={() => setPage("kontak")} className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto">Hubungi Kami <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>
      <SiteFooter setPage={setPage} />
    </div>
  )
}

// ─── SYARAT PAGE ─────────────────────────────────────────────────────────────
function SyaratPage({ setPage }: { setPage: (p: Page) => void }) {
  const terms = [
    { title: "Penerimaan Syarat", content: "Dengan menggunakan layanan Invito, Anda menyetujui syarat dan ketentuan ini. Jika Anda tidak setuju, harap tidak menggunakan layanan kami. Kami berhak memperbarui syarat ini sewaktu-waktu dengan pemberitahuan yang wajar." },
    { title: "Penggunaan Layanan", content: "Layanan Invito hanya boleh digunakan untuk tujuan yang sah dan sesuai dengan hukum yang berlaku di Indonesia. Anda bertanggung jawab atas semua aktivitas yang terjadi di bawah akun Anda. Dilarang menggunakan layanan untuk kegiatan ilegal, penipuan, atau yang merugikan pihak lain." },
    { title: "Konten Pengguna", content: "Anda mempertahankan kepemilikan atas konten yang Anda unggah ke Invito. Dengan mengunggah konten, Anda memberikan kami lisensi non-eksklusif untuk menampilkan konten tersebut sebagai bagian dari layanan. Anda bertanggung jawab memastikan Anda memiliki hak atas semua konten yang diunggah." },
    { title: "Pembayaran dan Pengembalian Dana", content: "Semua harga yang tercantum adalah harga final dalam Rupiah. Pembayaran diproses melalui gateway pembayaran yang aman. Kami menawarkan garansi pengembalian dana 7 hari untuk paket berbayar jika Anda tidak puas dengan layanan kami." },
    { title: "Batasan Tanggung Jawab", content: "Invito tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan layanan kami. Tanggung jawab kami dibatasi pada jumlah yang Anda bayarkan dalam 3 bulan terakhir sebelum klaim." },
    { title: "Pemutusan Layanan", content: "Kami berhak menangguhkan atau menghentikan akun Anda jika terbukti melanggar syarat ini. Anda juga dapat menghapus akun kapan saja. Data Anda akan dihapus secara permanen dalam 30 hari setelah pemutusan layanan." },
  ]
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar setPage={setPage} setAuthTab={() => { }} />
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs tracking-wide mb-6"><FileText className="w-3 h-3" />Dokumen Legal</div>
        <h1 className="text-5xl font-serif font-bold text-primary mb-4">Syarat & Ketentuan</h1>
        <p className="text-lg text-muted-foreground mb-4 max-w-xl mx-auto">Harap baca syarat dan ketentuan ini dengan seksama sebelum menggunakan layanan Invito.</p>
        <p className="text-xs text-muted-foreground">Berlaku sejak: 1 Januari 2025</p>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-5">
          {terms.map(({ title, content }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl p-7 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                <h2 className="font-semibold">{title}</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-10">{content}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl font-semibold mb-4">Ada Pertanyaan Hukum?</h2>
          <p className="text-muted-foreground text-sm mb-6">Tim hukum kami siap membantu menjawab pertanyaan Anda tentang syarat dan ketentuan ini.</p>
          <button onClick={() => setPage("kontak")} className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto">Hubungi Kami <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>
      <SiteFooter setPage={setPage} />
    </div>
  )
}

// ── COOKIE PAGE ─────────────────────────────────────────────────────────────
function CookiePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar setPage={setPage} setAuthTab={() => { }} />
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs tracking-wide mb-6"><Monitor className="w-3 h-3" />Transparansi Data</div>
        <h1 className="text-5xl font-serif font-bold text-primary mb-4">Kebijakan Cookie</h1>
        <p className="text-lg text-muted-foreground mb-4 max-w-xl mx-auto">Pelajari bagaimana kami menggunakan cookie untuk meningkatkan pengalaman Anda di Invito.</p>
        <p className="text-xs text-muted-foreground">Terakhir diperbarui: 1 Januari 2025</p>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-7 border border-border mb-8">
            <h2 className="font-semibold text-lg mb-3">Apa itu Cookie?</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">Cookie adalah file teks kecil yang disimpan di perangkat Anda saat mengunjungi website. Cookie membantu website mengingat preferensi Anda, memastikan keamanan sesi, dan memberikan pengalaman yang lebih personal. Cookie tidak dapat menjalankan program atau mengirimkan virus ke komputer Anda.</p>
          </div>
          <h2 className="font-serif text-3xl font-semibold mb-8">Jenis Cookie yang Kami Gunakan</h2>
          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            {[
              { icon: Shield, title: "Cookie Esensial", badge: "Selalu Aktif", desc: "Diperlukan untuk fungsi dasar website seperti autentikasi, keamanan sesi, dan navigasi. Cookie ini tidak dapat dinonaktifkan.", examples: ["Session token", "CSRF protection", "Login state"] },
              { icon: TrendingUp, title: "Cookie Analitik", badge: "Opsional", desc: "Membantu kami memahami bagaimana pengunjung berinteraksi dengan website untuk meningkatkan performa dan konten.", examples: ["Halaman yang dikunjungi", "Durasi sesi", "Sumber traffic"] },
              { icon: Palette, title: "Cookie Preferensi", badge: "Opsional", desc: "Mengingat pilihan Anda seperti bahasa, tema tampilan, dan pengaturan lainnya untuk pengalaman yang lebih personal.", examples: ["Pengaturan bahasa", "Preferensi tema", "Layout pilihan"] },
              { icon: MessageCircle, title: "Cookie Pemasaran", badge: "Opsional", desc: "Digunakan untuk menampilkan iklan yang relevan dengan minat Anda di platform lain. Anda dapat menonaktifkan cookie ini.", examples: ["Retargeting ads", "Konversi iklan", "Audience insights"] },
            ].map(({ icon: Icon, title, badge, desc, examples }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"><Icon className="w-5 h-5 text-primary" /></div>
                    <h3 className="font-semibold text-sm">{title}</h3>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${badge === "Selalu Aktif" ? "bg-green-50 text-green-600 border border-green-200" : "bg-muted text-muted-foreground border border-border"}`}>{badge}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{desc}</p>
                <div className="space-y-1">
                  {examples.map(ex => (<div key={ex} className="flex items-center gap-2 text-xs text-muted-foreground"><Check className="w-3 h-3 text-primary flex-shrink-0" />{ex}</div>))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-card rounded-2xl p-7 border border-border">
            <h2 className="font-semibold text-lg mb-3">Cara Mengelola Cookie</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">Anda dapat mengontrol dan menghapus cookie melalui pengaturan browser. Perlu diketahui bahwa menonaktifkan cookie tertentu dapat memengaruhi fungsionalitas website.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { browser: "Google Chrome", path: "Pengaturan > Privasi & Keamanan > Cookie" },
                { browser: "Mozilla Firefox", path: "Preferensi > Privasi & Keamanan" },
                { browser: "Safari", path: "Preferensi > Privasi" },
                { browser: "Microsoft Edge", path: "Pengaturan > Cookie & Izin Situs" },
              ].map(({ browser, path }) => (
                <div key={browser} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <Monitor className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div><p className="text-xs font-medium">{browser}</p><p className="text-[11px] text-muted-foreground">{path}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl font-semibold mb-4">Pertanyaan tentang Cookie?</h2>
          <p className="text-muted-foreground text-sm mb-6">Hubungi kami jika Anda ingin informasi lebih lanjut tentang penggunaan cookie di Invito.</p>
          <button onClick={() => setPage("kontak")} className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto">Hubungi Kami <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>
      <SiteFooter setPage={setPage} />
    </div>
  )
}

// ── ROOT APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("landing")
  const [authTab, setAuthTab] = useState<AuthTab>("login")
  const render = () => {
    switch (page) {
      case "login": return <AuthPage setPage={setPage} initialTab={authTab} />
      case "dashboard": return <DashboardPage setPage={setPage} />
      case "editor": return <EditorPage setPage={setPage} />
      case "checkout": return <CheckoutPage setPage={setPage} />
      case "payment-method": return <PaymentMethodPage setPage={setPage} />
      case "payment-waiting": return <PaymentWaitingPage setPage={setPage} />
      case "payment-success": return <PaymentSuccessPage setPage={setPage} />
      case "payment-failed": return <PaymentFailedPage setPage={setPage} />
      case "fitur": return <FiturPage setPage={setPage} />
      case "tema": return <TemaPage setPage={setPage} />
      case "harga": return <HargaPage setPage={setPage} />
      case "blog": return <BlogPage setPage={setPage} />
      case "tentang": return <TentangPage setPage={setPage} />
      case "karir": return <KarirPage setPage={setPage} />
      case "kontak": return <KontakPage setPage={setPage} />
      case "panduan": return <PanduanPage setPage={setPage} />
      case "privasi": return <PrivasiPage setPage={setPage} />
      case "syarat": return <SyaratPage setPage={setPage} />
      case "cookie": return <CookiePage setPage={setPage} />

      // ✨ TAMBAHKAN 3 BARIS INI ✨
      case "faq": return <FaqPage setPage={setPage} />
      case "press-kit": return <PressKitPage setPage={setPage} />
      case "whatsapp-support": return <WhatsappSupportPage setPage={setPage} />

      default: return <LandingPage setPage={setPage} setAuthTab={setAuthTab} />
    }
  }
  return (
    <>
      {render()}
      <Toaster position="top-center" richColors />
    </>
  )
}