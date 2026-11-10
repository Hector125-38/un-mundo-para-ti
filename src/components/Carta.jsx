import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MailOpen } from 'lucide-react'

export default function Carta({ open, onToggle }) {
  return <div id="carta" className="card flex min-h-[330px] flex-col justify-between overflow-hidden">
    <div><p className="eyebrow">Una carta para ti</p><h2 className="section-title">Lo que guardo<br /><em>en el corazón</em></h2></div>
    <AnimatePresence mode="wait">{open ? <motion.div key="text" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 space-y-3 text-sm leading-relaxed text-rose-900/75"><p>Si pudiera regalarte algo, te regalaría la capacidad de verte con mis ojos: así entenderías lo increíble que eres.</p><p>Gracias por ser mi lugar favorito, por cada risa y por convertir los días normales en recuerdos preciosos.</p><p className="font-display text-xl italic text-rose-700">Te elegiría en todos los universos.</p></motion.div> : <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 flex items-center gap-3 text-sm text-rose-900/55"><MailOpen size={22} className="text-rose-500" /> Hay palabras que esperan ser descubiertas...</motion.div>}</AnimatePresence>
    <button onClick={onToggle} className="button-secondary mt-7 self-start">{open ? 'Cerrar carta' : 'Abrir carta'} <ChevronDown size={16} className={open ? 'rotate-180' : ''} /></button>
  </div>
}
