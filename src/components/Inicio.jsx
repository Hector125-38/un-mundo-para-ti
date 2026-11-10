import { motion } from 'framer-motion'
import { ArrowDown, Heart, Sparkles } from 'lucide-react'

export default function Inicio({ onStart }) {
  return <section className="relative flex min-h-screen flex-col items-center justify-center px-5 text-center">
    <motion.div initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }} className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-rose-500 shadow-xl shadow-rose-200/50"><Heart size={34} fill="currentColor" /></motion.div>
    <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-rose-500">Una sorpresa hecha con cariño</p>
    <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .2 }} className="font-display text-6xl font-semibold leading-[.9] sm:text-8xl">Tengo algo<br /><span className="text-rose-600">especial</span> para ti</motion.h1>
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }} className="mt-7 max-w-md text-rose-900/60">Un pequeño rincón del universo que preparé pensando en tu sonrisa.</motion.p>
    <motion.button onClick={onStart} whileHover={{ scale: 1.05, boxShadow: '0 15px 35px rgba(225,29,72,.25)' }} whileTap={{ scale: .96 }} className="button-primary mt-9"><Sparkles size={18} /> Abrir mi sorpresa</motion.button>
    <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 text-rose-400"><ArrowDown size={20} /></motion.div>
  </section>
}
