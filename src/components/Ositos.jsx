import { motion } from 'framer-motion'

export default function Ositos() {
  return <div className="relative mx-auto my-9 flex h-48 max-w-xs items-center justify-center">
    <motion.div animate={{ x: [-4, 3, -4] }} transition={{ repeat: Infinity, duration: 2 }} className="bear bear-left">🐻</motion.div>
    <motion.div animate={{ x: [4, -3, 4] }} transition={{ repeat: Infinity, duration: 2 }} className="bear bear-right">🐻</motion.div>
    <motion.div animate={{ scale: [1, 1.15, 1], y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="absolute z-10 text-5xl drop-shadow-md">💗</motion.div>
    <span className="absolute -left-2 top-7 text-xl text-amber-300">✦</span><span className="absolute -right-2 bottom-7 text-sm text-rose-400">✦</span>
  </div>
}
