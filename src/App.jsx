import React, { useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Home, Users, User, CreditCard, Monitor, LogOut, ShoppingCart, Coffee, BadgeCheck } from 'lucide-react'
import Spline from '@splinetool/react-spline'
import './index.css'

// Color theme tokens
const theme = {
  bg: 'bg-[#0b0a13]',
  card: 'bg-[#111120]/80 backdrop-blur',
  text: 'text-[#EAE6FF]',
  subtext: 'text-[#A8A2C7]',
  accent: 'from-[#7C3AED] to-[#06B6D4]',
  cream: 'text-[#F5E6D3]',
}

// Shared UI primitives
function GlowCard({ children, className = '' }) {
  return (
    <div className={`relative rounded-2xl p-5 md:p-6 ${theme.card} shadow-xl ring-1 ring-white/5 ${className}`}>
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-400/10" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

function Chip({ active, children, onClick }) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-full text-sm transition-all ${active ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25' : 'bg-white/5 hover:bg-white/10 text-white/80'} border border-white/10`}>{children}</button>
  )
}

function Badge({ tone = 'purple', children }) {
  const tones = {
    purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    green: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    red: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    yellow: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  }
  return <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border ${tones[tone]} whitespace-nowrap`}>{children}</span>
}

function Topbar({ role, onLogout }) {
  const nav = useNavigate()
  const roleColor = role === 'Admin' ? 'from-purple-600 to-cyan-500' : role === 'Staff' ? 'from-cyan-600 to-emerald-500' : 'from-fuchsia-600 to-amber-500'
  return (
    <div className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${roleColor} shadow-lg shadow-purple-500/30`} />
          <div>
            <p className={`text-sm ${theme.subtext}`}>Aradabiya</p>
            <h1 className={`text-xl font-semibold ${theme.text}`}>Cafenet Management</h1>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white"><Home size={18}/> Home</Link>
          <button onClick={() => { onLogout && onLogout(); nav('/'); }} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white"><LogOut size={18}/> Logout</button>
        </div>
      </div>
    </div>
  )
}

function Sidebar({ role }) {
  const items = role === 'Admin'
    ? [
        { icon: Home, label: 'Overview', to: '/admin' },
        { icon: Monitor, label: 'Kelola Ruangan', to: '/admin/rooms' },
        { icon: Users, label: 'Kelola Staff', to: '/admin/staff' },
        { icon: User, label: 'Kelola Customer', to: '/admin/customers' },
        { icon: CreditCard, label: 'Transaksi', to: '/admin/transactions' },
      ]
    : role === 'Staff'
    ? [
        { icon: Users, label: 'Customer', to: '/staff' },
        { icon: CreditCard, label: 'Isi Billing', to: '/staff/billing' },
      ]
    : [
        { icon: Home, label: 'Dashboard', to: '/customer' },
        { icon: Coffee, label: 'Menu Café', to: '/customer/menu' },
      ]

  return (
    <aside className="hidden md:block w-64 shrink-0 p-4">
      <div className={`h-full rounded-2xl ${theme.card} border border-white/10 p-4 space-y-2`}>
        {items.map((it) => (
          <Link key={it.label} to={it.to} className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/90 hover:bg-white/5 border border-transparent hover:border-white/10">
            <it.icon size={18} />
            <span className="text-sm">{it.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}

function Layout({ role, children, onLogout }) {
  return (
    <div className={`${theme.bg} min-h-screen text-white`}>      
      <Topbar role={role} onLogout={onLogout} />
      <div className="mx-auto max-w-7xl px-4 py-6 flex gap-6">
        <Sidebar role={role} />
        <main className="flex-1 space-y-6">{children}</main>
      </div>
    </div>
  )
}

// Landing with Spline hero and quick role cards
function Landing() {
  const cards = [
    { title: 'Admin', to: '/admin/login', desc: 'Kelola ruangan, staff, customer, dan transaksi.', glow: 'from-purple-600 to-cyan-500' },
    { title: 'Staff', to: '/staff/login', desc: 'Fokus pada pelanggan & isi billing.', glow: 'from-cyan-600 to-emerald-500' },
    { title: 'Customer', to: '/customer/login', desc: 'Lihat paket, waktu tersisa & pesan menu.', glow: 'from-fuchsia-600 to-amber-500' },
  ]
  return (
    <div className={`${theme.bg} min-h-screen`}> 
      <div className="relative h-[56vh] md:h-[64vh] overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/sHDPSbszZja1qap3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-24">
          <Badge tone="purple"><BadgeCheck size={14}/> Premium Cyber UI</Badge>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">Aradabiya Cafenet Management</h1>
          <p className="mt-4 max-w-2xl text-white/80">Black–purple cyber vibes, neon accents, and sleek cards. Kelola café net modern untuk admin, staff, dan customer.</p>
          <div className="mt-8 flex gap-3">
            <Link to="/admin/login" className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-500/25">Masuk Admin</Link>
            <Link to="/customer/menu" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10">Lihat Menu</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 md:-mt-16 pb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <GlowCard key={c.title} className="p-6">
            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${c.glow} mb-4`} />
            <h3 className="text-xl font-semibold">{c.title}</h3>
            <p className="mt-1 text-white/70 text-sm">{c.desc}</p>
            <Link to={c.to} className="mt-4 inline-block px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10">Masuk</Link>
          </GlowCard>
        ))}
      </div>
    </div>
  )
}

// Login mock screens
function LoginScreen({ role }) {
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => nav(role === 'Admin' ? '/admin' : role === 'Staff' ? '/staff' : '/customer'), 600)
  }
  return (
    <div className={`${theme.bg} min-h-screen flex items-center justify-center px-6`}> 
      <GlowCard className="w-full max-w-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${role==='Admin'?'from-purple-600 to-cyan-500': role==='Staff'?'from-cyan-600 to-emerald-500':'from-fuchsia-600 to-amber-500'}`} />
          <div>
            <p className="text-xs text-white/70">Login</p>
            <h3 className="text-lg font-semibold">{role} Portal</h3>
          </div>
        </div>
        <form onSubmit={handleLogin} className="space-y-3">
          <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none text-white placeholder-white/40" placeholder="Username" />
          <input type="password" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none text-white placeholder-white/40" placeholder="Password" />
          <button disabled={loading} className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold">
            {loading? 'Masuk...' : 'Masuk'}
          </button>
        </form>
      </GlowCard>
    </div>
  )
}

// Admin Overview
function AdminOverview() {
  const customers = useMemo(() => Array.from({length:6}).map((_,i)=>({id:i+1,name:`Customer ${i+1}`,username:`cust${i+1}`,status:i%2?'Aktif':'Nonaktif'})),[])
  const staff = useMemo(() => Array.from({length:4}).map((_,i)=>({id:i+1,name:`Staff ${i+1}`,role:'Kasir'})),[])
  const transactions = useMemo(() => Array.from({length:10}).map((_,i)=>({id:1000+i, name:`Customer ${i+1}`, amount:(i+1)*15000, time:`${9+i}:30`})),[])
  const rooms = [
    ...Array.from({length:3}).map((_,i)=>({name:`Reguler ${i+1}`, tier:'Regular', status: i%2? 'Dipakai':'Kosong'})),
    ...Array.from({length:3}).map((_,i)=>({name:`Premium ${i+1}`, tier:'Premium', status: i%2? 'Kosong':'Dipakai'})),
  ]
  return (
    <Layout role="Admin">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlowCard><p className="text-sm text-white/70">Total Customer</p><p className="mt-2 text-2xl font-bold">{customers.length}</p></GlowCard>
        <GlowCard><p className="text-sm text-white/70">Total Staff</p><p className="mt-2 text-2xl font-bold">{staff.length}</p></GlowCard>
        <GlowCard><p className="text-sm text-white/70">Transaksi Hari Ini</p><p className="mt-2 text-2xl font-bold">{transactions.length}</p></GlowCard>
        <GlowCard><p className="text-sm text-white/70">Ruangan Tersedia</p><p className="mt-2 text-2xl font-bold">{rooms.filter(r=>r.status==='Kosong').length}</p></GlowCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlowCard>
          <div className="flex items-center justify-between mb-3"><h3 className="font-semibold">List Akun Customer</h3><Badge tone="cyan">{customers.length} akun</Badge></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-white/60">
                <tr><th className="text-left py-2">Nama</th><th className="text-left">Username</th><th className="text-left">Status</th></tr>
              </thead>
              <tbody>
                {customers.map(c=> (
                  <tr key={c.id} className="border-t border-white/5">
                    <td className="py-2">{c.name}</td>
                    <td>{c.username}</td>
                    <td>{c.status==='Aktif'? <Badge tone="green">Aktif</Badge> : <Badge tone="red">Nonaktif</Badge>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlowCard>

        <GlowCard>
          <div className="flex items-center justify-between mb-3"><h3 className="font-semibold">List Akun Staff</h3><Badge tone="purple">{staff.length} staff</Badge></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-white/60">
                <tr><th className="text-left py-2">Nama</th><th className="text-left">Role</th></tr>
              </thead>
              <tbody>
                {staff.map(s=> (
                  <tr key={s.id} className="border-t border-white/5">
                    <td className="py-2">{s.name}</td>
                    <td>{s.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlowCard>

        <GlowCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3"><h3 className="font-semibold">Transaksi Terkini</h3><Badge tone="yellow">10 terakhir</Badge></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-white/60">
                <tr><th className="text-left py-2">ID</th><th className="text-left">Customer</th><th className="text-left">Jumlah</th><th className="text-left">Waktu</th></tr>
              </thead>
              <tbody>
                {transactions.map(t=> (
                  <tr key={t.id} className="border-t border-white/5">
                    <td className="py-2">#{t.id}</td>
                    <td>{t.name}</td>
                    <td>Rp {t.amount.toLocaleString('id-ID')}</td>
                    <td>{t.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlowCard>

        <GlowCard>
          <div className="flex items-center justify-between mb-3"><h3 className="font-semibold">Ruangan Tersedia</h3><Badge tone="green">Regular/Premium</Badge></div>
          <div className="grid grid-cols-2 gap-3">
            {rooms.map((r,i)=> (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{r.name}</p>
                  {r.tier==='Premium' ? <Badge tone="yellow">Premium</Badge> : <Badge tone="cyan">Regular</Badge>}
                </div>
                <div className="mt-2">{r.status==='Kosong'? <Badge tone="green">Kosong</Badge> : <Badge tone="red">Dipakai</Badge>}</div>
              </div>
            ))}
          </div>
        </GlowCard>

        <GlowCard>
          <h3 className="font-semibold mb-3">Aksi Cepat</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              {label:'Kelola Ruangan'},
              {label:'Kelola Staff'},
              {label:'Kelola Customer'},
              {label:'Lihat Semua Transaksi'},
              {label:'Isi Billing'},
            ].map((b)=> (
              <button key={b.label} className="px-3 py-3 rounded-xl bg-gradient-to-br from-purple-600/30 to-cyan-500/30 hover:from-purple-600/40 hover:to-cyan-500/40 border border-white/10 text-left">
                {b.label}
              </button>
            ))}
          </div>
        </GlowCard>
      </div>
    </Layout>
  )
}

// Staff Screens (simpler)
function StaffDashboard() {
  const customers = Array.from({length:8}).map((_,i)=>({id:i+1,name:`Customer ${i+1}`,paket:i%2?'Premium':'Regular'}))
  const nav = useNavigate()
  return (
    <Layout role="Staff">
      <GlowCard>
        <div className="flex items-center justify-between mb-3"><h3 className="font-semibold">List Akun Customer</h3><Badge tone="cyan">{customers.length} akun</Badge></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-white/60"><tr><th className="text-left py-2">Nama</th><th className="text-left">Paket</th><th className="text-left">Aksi</th></tr></thead>
            <tbody>
              {customers.map(c=> (
                <tr key={c.id} className="border-t border-white/5">
                  <td className="py-2">{c.name}</td>
                  <td>{c.paket==='Premium'? <Badge tone="yellow">Premium</Badge> : <Badge tone="cyan">Regular</Badge>}</td>
                  <td>
                    <button onClick={()=>nav('/staff/billing')} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10">Isi Billing</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlowCard>
    </Layout>
  )
}

function StaffBilling() {
  const [items, setItems] = useState([{id:1,customer:'Customer 1',jam:2,catatan:'Reguler 2 jam'}])
  const [form, setForm] = useState({customer:'',jam:1,catatan:''})
  const addItem = () => {
    if(!form.customer) return
    setItems(prev=>[...prev,{id:Date.now(), ...form}])
    setForm({customer:'',jam:1,catatan:''})
  }
  const remove = (id)=> setItems(prev=>prev.filter(i=>i.id!==id))
  return (
    <Layout role="Staff">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlowCard>
          <h3 className="font-semibold mb-3">Isi Billing Customer</h3>
          <div className="space-y-3">
            <input value={form.customer} onChange={e=>setForm({...form,customer:e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10" placeholder="Nama Customer" />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" min={1} value={form.jam} onChange={e=>setForm({...form,jam:Number(e.target.value)})} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10" placeholder="Jam" />
              <input value={form.catatan} onChange={e=>setForm({...form,catatan:e.target.value})} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10" placeholder="Catatan" />
            </div>
            <button onClick={addItem} className="px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-500">Tambah</button>
          </div>
        </GlowCard>
        <GlowCard>
          <h3 className="font-semibold mb-3">Kelola Billing Customer</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-white/60"><tr><th className="text-left py-2">Customer</th><th className="text-left">Jam</th><th className="text-left">Catatan</th><th></th></tr></thead>
              <tbody>
                {items.map(i=> (
                  <tr key={i.id} className="border-t border-white/5">
                    <td className="py-2">{i.customer}</td>
                    <td>{i.jam} jam</td>
                    <td>{i.catatan}</td>
                    <td><button onClick={()=>remove(i.id)} className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">Hapus</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlowCard>
      </div>
    </Layout>
  )
}

// Customer Screens
function CustomerDashboard() {
  const [paket] = useState({tier:'Premium', lokasi:'Ruang Premium 2', sisa: '1 jam 45 menit'})
  return (
    <Layout role="Customer">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlowCard>
          <p className="text-sm text-white/70">Paket</p>
          <h3 className="mt-1 text-2xl font-bold">{paket.tier}</h3>
          <div className="mt-2">{paket.tier==='Premium'? <Badge tone="yellow">Premium</Badge> : <Badge tone="cyan">Regular</Badge>}</div>
        </GlowCard>
        <GlowCard>
          <p className="text-sm text-white/70">Sisa Waktu</p>
          <h3 className="mt-1 text-2xl font-bold">{paket.sisa}</h3>
        </GlowCard>
        <GlowCard>
          <p className="text-sm text-white/70">Lokasi Ruangan</p>
          <h3 className="mt-1 text-2xl font-bold">{paket.lokasi}</h3>
        </GlowCard>
      </div>
    </Layout>
  )
}

function CustomerMenu() {
  const [category, setCategory] = useState('Makanan')
  const all = [
    {id:1, name:'Nasi Goreng', price:20000, cat:'Makanan'},
    {id:2, name:'Mie Ayam', price:18000, cat:'Makanan'},
    {id:3, name:'Kopi Latte', price:22000, cat:'Minuman'},
    {id:4, name:'Es Teh', price:8000, cat:'Minuman'},
    {id:5, name:'Roti Bakar', price:15000, cat:'Cemilan'},
    {id:6, name:'Kentang Goreng', price:17000, cat:'Cemilan'},
  ]
  const products = all.filter(p=>p.cat===category)
  const [cart, setCart] = useState([])
  const add = (p)=>{
    setCart(prev=>{
      const found = prev.find(i=>i.id===p.id)
      if(found) return prev.map(i=> i.id===p.id ? {...i, qty:i.qty+1} : i)
      return [...prev,{...p, qty:1}]
    })
  }
  const inc = (id)=> setCart(prev=>prev.map(i=> i.id===id? {...i, qty:i.qty+1}:i))
  const dec = (id)=> setCart(prev=>prev.map(i=> i.id===id? {...i, qty:Math.max(1,i.qty-1)}:i))
  const total = cart.reduce((s,i)=> s + i.price*i.qty, 0)

  return (
    <Layout role="Customer">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <GlowCard>
            <div className="flex flex-wrap gap-2">
              {['Makanan','Minuman','Cemilan'].map(cat=> (
                <Chip key={cat} active={category===cat} onClick={()=>setCategory(cat)}>{cat}</Chip>
              ))}
            </div>
          </GlowCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {products.map(p=> (
              <GlowCard key={p.id} className="p-5">
                <div className="h-28 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 mb-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-white/70 text-sm">Rp {p.price.toLocaleString('id-ID')}</p>
                  </div>
                  <button onClick={()=>add(p)} className="px-3 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-amber-500 text-sm">Tambah</button>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-80">
          <GlowCard>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2"><ShoppingCart size={18}/> Keranjang</h3>
              <Badge tone="purple">{cart.length} item</Badge>
            </div>
            <div className="space-y-3">
              {cart.length===0 && <p className="text-white/60">Belum ada item.</p>}
              {cart.map(i=> (
                <div key={i.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <p className="font-medium">{i.name}</p>
                    <p className="text-xs text-white/60">Rp {i.price.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={()=>dec(i.id)} className="px-2 py-1 rounded-lg bg-white/5">-</button>
                    <span>{i.qty}</span>
                    <button onClick={()=>inc(i.id)} className="px-2 py-1 rounded-lg bg-white/5">+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <p className="text-white/70 text-sm">Total</p>
              <p className="font-bold">Rp {total.toLocaleString('id-ID')}</p>
            </div>
            <button className="mt-3 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500">Checkout</button>
          </GlowCard>
        </div>
      </div>
    </Layout>
  )
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />

        <Route path="/admin/login" element={<LoginScreen role="Admin"/>} />
        <Route path="/admin" element={<AdminOverview/>} />

        <Route path="/staff/login" element={<LoginScreen role="Staff"/>} />
        <Route path="/staff" element={<StaffDashboard/>} />
        <Route path="/staff/billing" element={<StaffBilling/>} />

        <Route path="/customer/login" element={<LoginScreen role="Customer"/>} />
        <Route path="/customer" element={<CustomerDashboard/>} />
        <Route path="/customer/menu" element={<CustomerMenu/>} />
      </Routes>
    </BrowserRouter>
  )
}
