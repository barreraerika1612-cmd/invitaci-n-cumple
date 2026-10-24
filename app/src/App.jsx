import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WHATSAPP_NUMBER = '549XXXXXXXXXX'
const WA_MSG = '¡Hola! Quiero confirmar mi asistencia para el Bautismo y Primer Añito de Olivia 🌸'
const EVENT_DATE = new Date('2026-11-14T11:00:00-03:00')
const B = import.meta.env.BASE_URL
const paper = { backgroundImage: `url(${B}papel.jpg)`, backgroundSize: '600px' }

const Leaf = ({ className = '', style }) => (
  <svg viewBox="0 0 60 120" className={className} style={style} aria-hidden>
    <path d="M30 118 C30 80 30 40 30 4" stroke="#588157" strokeWidth="2" fill="none" />
    {[20, 40, 60, 80].map((y, i) => (
      <g key={y}>
        <path d={`M30 ${y + 10} C10 ${y} 6 ${y - 12} 12 ${y - 16} C22 ${y - 10} 28 ${y} 30 ${y + 10}`} fill="#A3B18A" opacity={0.8 - i * 0.1} />
        <path d={`M30 ${y + 20} C50 ${y + 10} 54 ${y - 2} 48 ${y - 6} C38 ${y} 32 ${y + 10} 30 ${y + 20}`} fill="#A3B18A" opacity={0.7 - i * 0.1} />
      </g>
    ))}
  </svg>
)

function Envelope({ onOpen }) {
  const [open, setOpen] = useState(false)
  const click = () => {
    if (open) return
    setOpen(true)
    onOpen()
  }
  return (
    <motion.div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-cream" style={paper}
      exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <p className="mb-8 font-serif italic text-ink/70">Tenés una invitación 💌</p>
      <div className="relative w-[86vw] max-w-sm aspect-[4/3]" style={{ perspective: 1000 }}>
        {/* tarjeta que sale */}
        <motion.div className="absolute inset-x-4 top-4 bottom-4 rounded-md bg-cream shadow flex items-center justify-center"
          initial={{ y: 0 }} animate={open ? { y: '-75%' } : {}} transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }} style={{ zIndex: open ? 2 : 1 }}>
          <span className="font-script text-4xl text-rose2">Olivia</span>
        </motion.div>
        {/* cuerpo */}
        <div className="absolute inset-0 rounded-md shadow-xl overflow-hidden" style={{ zIndex: 3, background: '#F6EFE3' }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top right,#EFE5D4 50%,transparent 50%) left/50% 100% no-repeat, linear-gradient(to top left,#EFE5D4 50%,transparent 50%) right/50% 100% no-repeat' }} />
          <Leaf className="absolute -left-2 bottom-0 h-24 -rotate-12" />
          <Leaf className="absolute -right-2 bottom-0 h-24 rotate-12" />
        </div>
        {/* solapa */}
        <motion.div className="absolute inset-x-0 top-0 h-[60%] origin-top"
          style={{ zIndex: open ? 0 : 4, transformStyle: 'preserve-3d', clipPath: 'polygon(0 0,100% 0,50% 100%)', background: '#EADFCB' }}
          animate={open ? { rotateX: 180 } : {}} transition={{ duration: 0.7 }} />
        {/* sello */}
        <AnimatePresence>
          {!open && (
            <motion.button onClick={click} aria-label="Abrir invitación"
              className="absolute left-[calc(50%-2.5rem)] top-[calc(60%-2.5rem)] z-10 h-20 w-20 rounded-full font-script text-4xl text-amber-50"
              style={{ background: 'radial-gradient(circle at 35% 30%,#F3D98B,#C8963E 45%,#8A5A1F)', boxShadow: '0 4px 10px rgba(0,0,0,.35), inset 0 -3px 6px rgba(0,0,0,.3), inset 0 3px 6px rgba(255,255,255,.4)', textShadow: '0 1px 1px rgba(0,0,0,.4)' }}
              animate={{ scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}>
              O
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-10 font-sans text-xs tracking-widest text-ink/60">TOCÁ EL SELLO PARA ABRIR</p>
    </motion.div>
  )
}

const Section = ({ children, className = '' }) => (
  <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.7 }} className={`relative mx-auto my-6 w-[90%] max-w-md rounded-2xl border border-sage/40 bg-cream/90 p-6 text-center shadow-sm ${className}`}>
    {children}
  </motion.section>
)

const Btn = ({ href, children, className = '' }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className={`mt-5 inline-block rounded-full px-6 py-3 font-sans text-sm font-semibold text-white shadow-md transition active:scale-95 ${className}`}>
    {children}
  </a>
)

function EventCard({ icon, title, place, name, addr, time, map, label }) {
  return (
    <Section>
      <div className="text-5xl">{icon}</div>
      <h3 className="mt-2 font-sans text-xl font-semibold tracking-[.2em] text-rose2">{title}</h3>
      <p className="mt-3 font-sans text-sm font-medium uppercase text-ink/80">{place}</p>
      <p className="font-sans text-sm text-ink/80">“{name}”</p>
      <p className="font-sans text-sm uppercase text-ink/80">{addr}</p>
      <p className="mt-2 font-script text-4xl text-terra">{time}</p>
      <Btn href={map} className="bg-sage2">{label}</Btn>
    </Section>
  )
}

function Countdown() {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  const d = Math.max(0, EVENT_DATE - now) / 1000
  const parts = [['Días', d / 86400], ['Horas', (d % 86400) / 3600], ['Min', (d % 3600) / 60], ['Seg', d % 60]]
  return (
    <Section>
      <h3 className="font-script text-4xl text-sage2">Faltan</h3>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {parts.map(([l, v]) => (
          <div key={l} className="rounded-xl bg-sage/20 py-3">
            <div className="font-serif text-3xl text-ink">{String(Math.floor(v)).padStart(2, '0')}</div>
            <div className="font-sans text-[10px] uppercase tracking-widest text-ink/60">{l}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Calendar() {
  const first = (new Date(2026, 10, 1).getDay() + 6) % 7 // lunes primero
  const cells = [...Array(first).fill(null), ...Array.from({ length: 30 }, (_, i) => i + 1)]
  return (
    <Section>
      <h3 className="font-script text-4xl text-sage2">Save the Date</h3>
      <p className="mt-1 font-sans text-sm font-semibold tracking-[.3em] text-ink/70">NOVIEMBRE 2026</p>
      <div className="mt-4 grid grid-cols-7 gap-1 font-sans text-sm">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => <div key={i} className="font-semibold text-rose2">{d}</div>)}
        {cells.map((n, i) => (
          <div key={i} className="relative flex aspect-square items-center justify-center">
            {n === 14 && <span className="absolute h-9 w-9 rounded-full bg-terra shadow ring-2 ring-sage" />}
            <span className={`relative ${n === 14 ? 'font-bold text-white' : 'text-ink/80'}`}>{n}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Music({ audio, playing, toggle }) {
  return (
    <motion.button onClick={toggle} aria-label="Música" initial={{ scale: 0 }} animate={{ scale: 1 }}
      className="fixed right-4 top-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-xl shadow-lg ring-1 ring-sage/50">
      <motion.span animate={playing ? { rotate: [0, 15, -15, 0] } : { rotate: 0 }} transition={{ repeat: Infinity, duration: 1.5 }}
        className={playing ? '' : 'opacity-40'}>🎵</motion.span>
    </motion.button>
  )
}

export default function App() {
  const [stage, setStage] = useState('sobre')
  const [playing, setPlaying] = useState(false)
  const audio = useRef(null)

  const fadeIn = () => {
    const a = audio.current
    a.volume = 0
    a.play().then(() => {
      setPlaying(true)
      const t = setInterval(() => { a.volume = Math.min(1, a.volume + 0.05); if (a.volume >= 1) clearInterval(t) }, 120)
    }).catch(() => {})
  }
  const toggle = () => {
    const a = audio.current
    if (a.paused) { a.play(); setPlaying(true) } else { a.pause(); setPlaying(false) }
  }
  const open = () => { fadeIn(); setTimeout(() => setStage('tarjeta'), 2200) }

  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MSG)}`

  return (
    <div className="min-h-screen bg-cream" style={paper}>
      <audio ref={audio} src={`${B}musica.mp3`} loop preload="auto" />
      <AnimatePresence>{stage === 'sobre' && <Envelope onOpen={open} />}</AnimatePresence>
      {stage === 'tarjeta' && <Music playing={playing} toggle={toggle} />}

      {stage === 'tarjeta' && (
        <main className="overflow-x-hidden pb-16 pt-10">
          <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="relative mx-auto w-[90%] max-w-md px-2 text-center">
            <Leaf className="absolute -left-6 -top-4 h-32 -rotate-[30deg]" />
            <Leaf className="absolute -right-6 -top-4 h-32 rotate-[30deg]" />
            <p className="font-serif text-lg text-ink">Acompáñanos a ser parte del</p>
            <h1 className="mt-2 font-script text-5xl leading-tight text-[#B08A55]">Bautismo<br /><span className="text-3xl">y</span><br />Primer Añito</h1>
            <p className="mt-3 font-serif italic text-ink">de nuestra pequeña hija</p>
            <h2 className="mt-3 font-script text-6xl text-rose2">Olivia Vizcarra</h2>
            <div className="mt-6 flex items-center justify-center gap-3 font-sans text-sm font-semibold tracking-widest text-ink/70">
              <span className="border-y border-rose2/50 py-1">SÁBADO</span>
              <span className="font-script text-5xl font-normal text-[#B08A55]">14</span>
              <span className="border-y border-rose2/50 py-1">NOVIEMBRE 2026</span>
            </div>
          </motion.header>

          <Section className="p-3">
            <div className="rounded-xl border-4 border-double border-sage p-1">
              <img src={`${B}olivia.jpg`} alt="Ilustración de Olivia en su canastita con su perrito" className="w-full rounded-lg" />
            </div>
            <Leaf className="absolute -bottom-6 -left-4 h-24 -rotate-45" />
            <Leaf className="absolute -bottom-6 -right-4 h-24 rotate-45" />
          </Section>

          <EventCard icon="⛪" title="MISA" place="Iglesia Catedral" name="Ntra. Sra. de la Merced" addr="Sarmiento 72 B. Bca." time="11:00 hs."
            map="https://www.google.com/maps/search/?api=1&query=Iglesia+Catedral+Ntra.+Sra.+de+la+Merced+Sarmiento+72+Bahia+Blanca" label="📍 Ver ubicación de la Misa" />
          <EventCard icon="🎉" title="FESTEJO" place="Quincho de Eventos" name="La Soñada" addr="Necochea 3986 B. Bca." time="13:00 hs."
            map="https://www.google.com/maps/search/?api=1&query=Quincho+de+Eventos+La+So%C3%B1ada+Necochea+3986+Bahia+Blanca" label="🎉 Ver ubicación del Festejo" />

          <Countdown />
          <Calendar />

          <Section>
            <h3 className="font-script text-4xl text-sage2">¡Te esperamos!</h3>
            <p className="mt-2 font-sans text-sm text-ink/70">Por favor confirmá tu asistencia</p>
            <Btn href={wa} className="bg-[#25D366]">💬 Confirmar asistencia por WhatsApp</Btn>
          </Section>
        </main>
      )}
    </div>
  )
}
