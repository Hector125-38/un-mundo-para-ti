import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ImagePlus } from 'lucide-react'
import { convertirADataUrl, guardarArchivo, leerArchivo } from '../lib/persistencia'
import fotoAmor from './amor.jpg'
import fotoWebp from './1600w-3JcrduYP7fc.webp'
import fotoRecuerdo from './images (1).jpg'
import fotoWhatsApp1 from './WhatsApp Image 2026-11-08 at 12.01.00 AM.jpeg'
import fotoWhatsApp2 from './WhatsApp Image 2026-11-08 at 12.01.01 AM.jpeg'
import fotoWhatsApp3 from './WhatsApp Image 2026-11-08 at 12.01.01 AM (1).jpeg'

const defaultPhotos = [
  { src: fotoAmor, caption: 'Momentos que se quedan' },
  { src: fotoWebp, caption: 'Tú haces todo más bonito' },
  { src: fotoRecuerdo, caption: 'Nuestro pequeño universo' },
  { src: fotoWhatsApp1, caption: 'Un recuerdo para siempre' },
  { src: fotoWhatsApp2, caption: 'Juntos en cada momento' },
  { src: fotoWhatsApp3, caption: 'Nuestra historia' },
]

export default function Galeria() {
  const [photos, setPhotos] = useState(defaultPhotos)
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const next = () => setCurrent((value) => (value + 1) % photos.length)
  const previous = () => setCurrent((value) => (value - 1 + photos.length) % photos.length)
  useEffect(() => {
    leerArchivo('fotos').then((savedPhotos) => {
      if (savedPhotos?.length) setPhotos([...defaultPhotos, ...savedPhotos])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])
  const addPhoto = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const savedPhoto = { src: await convertirADataUrl(file), caption: 'Un recuerdo nuestro' }
    const personalPhotos = [...photos.filter((photo) => !defaultPhotos.some((defaultPhoto) => defaultPhoto.src === photo.src)), savedPhoto]
    await guardarArchivo('fotos', personalPhotos)
    setPhotos((items) => [...items, savedPhoto])
    setCurrent(photos.length)
    event.target.value = ''
  }
  return <section id="recuerdos" className="mx-auto max-w-6xl px-5 py-20">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Nuestra historia</p><h2 className="section-title">Pequeños <em>recuerdos</em></h2></div><label className="button-secondary cursor-pointer"><ImagePlus size={16} /> Añadir foto<input type="file" accept="image/*" onChange={addPhoto} className="hidden" /></label></div>
    <div className="relative overflow-hidden rounded-[2rem] bg-rose-200 shadow-xl shadow-rose-200/40"><AnimatePresence mode="wait"><motion.img key={photos[current].src} src={photos[current].src} alt={photos[current].caption} onError={(event) => { event.currentTarget.style.display = 'none' }} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5 }} className="h-[360px] w-full object-cover sm:h-[480px]" /></AnimatePresence><div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-6 pt-20 text-white"><div><p className="font-display text-3xl italic">{photos[current].caption}</p><p className="text-sm text-white/70">{loading ? 'Cargando...' : `${current + 1} / ${photos.length}`}</p></div><div className="flex gap-2"><button aria-label="Foto anterior" onClick={previous} className="gallery-control"><ChevronLeft size={20} /></button><button aria-label="Siguiente foto" onClick={next} className="gallery-control"><ChevronRight size={20} /></button></div></div></div>
    <p className="mt-3 text-center text-xs text-rose-900/45">Puedes añadir tus propias fotografías para hacer este mundo aún más nuestro.</p>
  </section>
}
