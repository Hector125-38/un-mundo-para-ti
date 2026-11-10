import { useEffect, useRef, useState } from 'react'
import { Music2, Pause, Play, Upload } from 'lucide-react'
import { convertirADataUrl, guardarArchivo, leerArchivo } from '../lib/persistencia'
import cancionIncluida from './Calibre 50 - Tus Latidos (Visualizer).mp3'

export default function Musica() {
  const audio = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [title, setTitle] = useState('Tus Latidos - Calibre 50')
  const [hasAudio, setHasAudio] = useState(true)
  const [audioDescription, setAudioDescription] = useState('Canción incluida en el proyecto')
  useEffect(() => {
    audio.current.src = cancionIncluida
    leerArchivo('musica').then((savedAudio) => {
      if (!savedAudio) return
      audio.current.src = savedAudio.src
      setTitle(savedAudio.title)
      setHasAudio(true)
      setAudioDescription('Archivo guardado en este navegador')
    }).catch(() => {})
  }, [])
  const selectAudio = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const src = await convertirADataUrl(file)
    const nextTitle = file.name.replace(/\.[^/.]+$/, '')
    await guardarArchivo('musica', { src, title: nextTitle })
    audio.current.src = src
    setTitle(nextTitle)
    setHasAudio(true)
    setAudioDescription('Archivo guardado en este navegador')
    setPlaying(false)
    event.target.value = ''
  }
  const toggle = async () => { if (!audio.current.src) return; if (playing) { audio.current.pause(); setPlaying(false) } else { await audio.current.play(); setPlaying(true) } }
  return <div className="card flex min-h-[330px] flex-col justify-between bg-rose-900 text-rose-50"><audio ref={audio} onEnded={() => setPlaying(false)} /><div><p className="eyebrow text-rose-300">Banda sonora</p><h2 className="section-title text-rose-50">Ponle música<br /><em className="text-rose-300">a este momento</em></h2></div><div className="mt-8 flex items-center gap-4 rounded-2xl bg-white/10 p-4"><button onClick={toggle} disabled={!hasAudio} aria-label={playing ? 'Pausar música' : 'Reproducir música'} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-rose-300 text-rose-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50">{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button><div className="min-w-0"><p className="truncate font-medium">{title}</p><p className="text-xs text-rose-200/65">{audioDescription}</p></div></div><label className="button-secondary mt-5 w-fit border-rose-300/40 text-rose-100 hover:bg-white/10"><Upload size={16} /> Elegir archivo MP3<input type="file" accept="audio/mpeg,audio/mp3,audio/*" onChange={selectAudio} className="hidden" /></label><Music2 className="absolute right-8 top-8 text-rose-400/30" size={55} /></div>
}
