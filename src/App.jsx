import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import Inicio from './components/Inicio'
import Ositos from './components/Ositos'
import Corazones from './components/Corazones'
import Carta from './components/Carta'
import Galeria from './components/Galeria'
import Musica from './components/Musica'
import Sorpresa from './components/Sorpresa'

function App() {
  const [started, setStarted] = useState(false)
  const [hearts, setHearts] = useState([])
  const [letterOpen, setLetterOpen] = useState(false)

  const releaseHearts = (event) => {
    const bounds = event?.currentTarget?.getBoundingClientRect()
    const left = bounds ? bounds.left + bounds.width / 2 : window.innerWidth / 2
    const top = bounds ? bounds.top + bounds.height / 2 : window.innerHeight / 2
    const burst = Array.from({ length: 14 }, (_, index) => ({
      id: `${Date.now()}-${index}`, left, top, x: (Math.random() - 0.5) * 260,
      y: -(Math.random() * 230 + 80), rotate: Math.random() * 80 - 40, size: Math.random() * 13 + 13,
    }))
    setHearts((current) => [...current, ...burst])
    window.setTimeout(() => setHearts((current) => current.filter((heart) => !burst.some((item) => item.id === heart.id))), 1800)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-rose-50 text-rose-950">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,#fff_0%,transparent_32%),radial-gradient(circle_at_85%_70%,#ffe4e6_0%,transparent_35%)]" />
      <Corazones />
      <div className="fixed inset-0 pointer-events-none -z-0 bg-[linear-gradient(120deg,transparent_45%,rgba(255,255,255,.3)_50%,transparent_55%)] bg-[length:260%_100%] animate-shimmer" />
      {!started ? <Inicio onStart={(event) => { releaseHearts(event); setStarted(true) }} /> : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
            <a href="#inicio" className="font-display text-2xl font-semibold italic text-rose-700">Un mundo para ti</a>
            <div className="hidden items-center gap-6 text-sm font-medium text-rose-800/70 sm:flex"><a href="#carta" className="transition hover:text-rose-600">Mi carta</a><a href="#recuerdos" className="transition hover:text-rose-600">Recuerdos</a><a href="#final" className="transition hover:text-rose-600">Sorpresa</a></div>
            <Sparkles className="text-amber-500" size={20} />
          </nav>
          <section id="inicio" className="mx-auto max-w-6xl px-5 pb-10 pt-5 text-center sm:pt-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rose-500">Para la persona que hace brillar mis días</p>
            <h1 className="font-display text-6xl font-semibold leading-none text-rose-950 sm:text-8xl">Un mundo <span className="text-rose-600">para ti</span></h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-rose-900/65">Cada rincón de este pequeño universo guarda un pedacito de todo lo que siento por ti.</p>
            <Ositos />
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={releaseHearts} className="button-primary mx-auto"><Heart size={18} fill="currentColor" /> Llenar de amor</motion.button>
          </section>
          <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-20 lg:grid-cols-[1.05fr_.95fr]"><Carta open={letterOpen} onToggle={() => setLetterOpen((value) => !value)} /><Musica /></section>
          <Galeria /><Sorpresa />
          <footer className="px-5 py-10 text-center font-display text-xl italic text-rose-700">Hecho con amor, para ti <Heart className="inline text-rose-500" size={17} fill="currentColor" /></footer>
        </motion.div>
      )}
      {hearts.map((heart) => <motion.span key={heart.id} initial={{ opacity: 1, x: heart.left, y: heart.top, scale: 0 }} animate={{ opacity: 0, x: heart.left + heart.x, y: heart.top + heart.y, rotate: heart.rotate, scale: 1 }} transition={{ duration: 1.7, ease: 'easeOut' }} className="pointer-events-none fixed z-50 text-rose-500" style={{ fontSize: heart.size }}>♥</motion.span>)}
    </main>
  )
}

export default App
