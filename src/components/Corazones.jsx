import { motion } from 'framer-motion'

export default function Corazones() {
  const hearts = ['♡', '♥', '♡', '♥', '♡', '♥', '♡', '♥']
  return <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">{hearts.map((heart, index) => <motion.span key={index} initial={{ y: '110vh', opacity: 0 }} animate={{ y: '-15vh', opacity: [0, .35, .35, 0], x: [0, index % 2 ? 18 : -16, 0] }} transition={{ duration: 14 + index * 1.2, repeat: Infinity, delay: index * 1.5, ease: 'linear' }} className="absolute text-rose-300/60" style={{ left: `${8 + index * 12}%`, fontSize: `${18 + (index % 3) * 11}px` }}>{heart}</motion.span>)}</div>
}
