import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WHATSAPP_NUMBER = '549XXXXXXXXXX'
const WA_MSG = '¡Hola! Quiero confirmar mi asistencia para el Bautismo y Primer Añito de Olivia 🌸'
const EVENT_DATE = new Date('2026-11-14T11:00:00-03:00')
const B = import.meta.env.BASE_URL
const paper = { backgroundImage: `url(${B}papel.jpg)`, backgroundSize: '600px' }
const EASE = [0.33, 0, 0.2, 1]

/* Iconos (trazos Lucide) */
const Icon = ({ d, className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    {d.map((p, i) => <path key={i} d={p} />)}
  </svg>
)
const I = {
  pin: ['M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0', 'M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6'],
  chat: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  church: ['M10 9h4', 'M12 7v5', 'M14 22v-4a2 2 0 0 0-4 0v4', 'M18 22V5.6a1 1 0 0 0-.4-.8l-5-3.6a1 1 0 0 0-1.2 0l-5 3.6a1 1 0 0 0-.4.8V22', 'M18 11l3.6 2a1 1 0 0 1 .4.8V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.2a1 1 0 0 1 .4-.8L6 11'],
  party: ['M5.8 11.3 2 22l10.7-3.79', 'M4 3h.01', 'M22 8h.01', 'M15 2h.01', 'M22 20h.01', 'M22 2l-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10', 'M22 13l-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17', 'M11 2l.33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7', 'M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z'],
  music: ['M9 18V5l12-2v13', 'M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6', 'M18 13a3 3 0 1 0 0 6 3 3 0 0 0 0-6'],
  pause: ['M6 4h4v16H6z', 'M14 4h4v16h-4z'],
}

const Leaf = ({ className = '' }) => (
  <svg viewBox="0 0 60 120" className={className} aria-hidden>
    <path d="M30 118 C30 80 30 40 30 4" stroke="#588157" strokeWidth="1.5" fill="none" opacity=".7" />
    {[20, 40, 60, 80].map((y, i) => (
      <g key={y}>
        <path d={`M30 ${y + 10} C10 ${y} 6 ${y - 12} 12 ${y - 16} C22 ${y - 10} 28 ${y} 30 ${y + 10}`} fill="#A3B18A" opacity={0.7 - i * 0.1} />
        <path d={`M30 ${y + 20} C50 ${y + 10} 54 ${y - 2} 48 ${y - 6} C38 ${y} 32 ${y + 10} 30 ${y + 20}`} fill="#A3B18A" opacity={0.6 - i * 0.1} />
      </g>
    ))}
  </svg>
)

function Envelope({ onOpen }) {
  const [open, setOpen] = useState(false)
  const click = () => { if (!open) { setOpen(true); onOpen() } }
  return (
    <motion.div className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-cream" style={paper}
      exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }}>
      <p className="mb-10 font-serif text-lg italic tracking-wide text-ink/70">Tenés una invitación</p>
      <div className="relative aspect-[10/7] w-[84vw] max-w-sm" style={{ perspective: 1200 }}>
        {/* tarjeta: sale y hace zoom */}
        <motion.div className="absolute inset-x-5 bottom-5 top-5 flex items-center justify-center rounded-xl bg-cream shadow-lg" style={{ ...paper, zIndex: open ? 5 : 1 }}
          animate={open ? { y: ['0%', '-80%', '-10%'], scale: [1, 1, 3], opacity: [1, 1, 0] } : {}}
          transition={{ duration: 2.4, times: [0, 0.55, 1], ease: EASE, delay: 0.6 }}>
          <span className="font-script text-4xl text-terra">Olivia</span>
        </motion.div>
        {/* cuerpo */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl" style={{ zIndex: 3, background: '#F6EFE3' }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top right,#EFE5D4 50%,transparent 50%) left/50% 100% no-repeat, linear-gradient(to top left,#EBE0CC 50%,transparent 50%) right/50% 100% no-repeat' }} />
          <Leaf className="absolute -left-2 bottom-0 h-24 -rotate-12" />
          <Leaf className="absolute -right-2 bottom-0 h-24 rotate-12" />
        </div>
        {/* solapa */}
        <motion.div className="absolute inset-x-0 top-0 h-[58%] origin-top overflow-hidden rounded-t-2xl"
          style={{ zIndex: open ? 0 : 4, clipPath: 'polygon(0 0,100% 0,50% 100%)', background: 'linear-gradient(#EADFCB,#E2D4BC)', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,.15))' }}
          animate={open ? { rotateX: 180 } : {}} transition={{ duration: 1.3, ease: 'easeInOut' }} />
        {/* sello */}
        <AnimatePresence>
          {!open && (
            <motion.button onClick={click} aria-label="Abrir invitación"
              className="absolute left-[calc(50%-2.75rem)] top-[calc(58%-2.75rem)] z-10 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full"
              style={{ background: 'radial-gradient(circle at 32% 28%,#FBEBB5 0%,#E2B55E 22%,#B9862F 55%,#7A4E17 100%)', boxShadow: '0 6px 14px rgba(70,40,10,.45), inset 0 -4px 8px rgba(60,30,0,.45), inset 0 4px 8px rgba(255,240,200,.6)' }}
              animate={{ scale: [1, 1.05, 1] }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}>
              <span className="flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-full font-script text-5xl text-[#FFF4D6]"
                style={{ boxShadow: 'inset 0 2px 4px rgba(60,30,0,.5), 0 1px 1px rgba(255,240,200,.5)', textShadow: '0 -1px 0 rgba(60,30,0,.6), 0 1px 0 rgba(255,240,200,.7)' }}>O</span>
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                <motion.span className="absolute -inset-y-2 w-6 -skew-x-12 bg-white/40 blur-sm" animate={{ x: ['-150%', '450%'] }}
                  transition={{ repeat: Infinity, duration: 2.8, repeatDelay: 1.2, ease: 'easeInOut' }} />
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {!open && <motion.p exit={{ opacity: 0 }} className="mt-10 font-serif text-sm italic tracking-widest text-ink/50">Toca el sello para abrir</motion.p>}
      </AnimatePresence>
    </motion.div>
  )
}

const Section = ({ children, className = '' }) => (
  <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.8, ease: EASE }}
    className={`relative mx-auto my-10 w-[90%] max-w-md rounded-3xl border border-sage/20 bg-white/60 px-6 py-10 text-center shadow-[0_10px_30px_-12px_rgba(88,129,87,.25)] backdrop-blur-md ${className}`}>
    {children}
  </motion.section>
)

const Btn = ({ href, icon, children, className = '' }) => (
  <motion.a href={href} target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.95 }}
    className={`mt-7 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-sans text-sm font-semibold tracking-wide text-white shadow-md ${className}`}>
    <Icon d={icon} />{children}
  </motion.a>
)

function EventCard({ icon, title, place, name, addr, time, map, label }) {
  return (
    <Section>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#B08A55]/40 text-[#B08A55]"><Icon d={icon} className="h-8 w-8" /></div>
      <h3 className="mt-4 font-sans text-lg font-semibold tracking-[.35em] text-rose2">{title}</h3>
      <p className="mt-4 font-sans text-xs font-medium uppercase tracking-widest text-ink/80">{place}</p>
      <p className="mt-1 font-serif text-lg italic text-ink">“{name}”</p>
      <p className="mt-1 font-sans text-xs uppercase tracking-widest text-ink/70">{addr}</p>
      <p className="mt-4 font-script text-5xl text-terra">{time}</p>
      <Btn href={map} icon={I.pin} className="bg-sage2">{label}</Btn>
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
      <h3 className="font-script text-5xl text-sage2">Faltan</h3>
      <div className="mt-6 grid grid-cols-4 gap-2">
        {parts.map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-sage/20 bg-cream/80 py-4">
            <div className="font-serif text-3xl text-ink">{String(Math.floor(v)).padStart(2, '0')}</div>
            <div className="mt-1 font-sans text-[10px] uppercase tracking-widest text-ink/50">{l}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Calendar() {
  const first = (new Date(2026, 10, 1).getDay() + 6) % 7
  const cells = [...Array(first).fill(null), ...Array.from({ length: 30 }, (_, i) => i + 1)]
  return (
    <Section>
      <h3 className="font-script text-5xl text-sage2">Save the Date</h3>
      <p className="mt-2 font-sans text-xs font-semibold tracking-[.35em] text-ink/60">NOVIEMBRE 2026</p>
      <div className="mt-6 grid grid-cols-7 gap-1 font-sans text-sm">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => <div key={i} className="pb-2 text-xs font-semibold tracking-widest text-rose2">{d}</div>)}
        {cells.map((n, i) => (
          <div key={i} className="relative flex aspect-square items-center justify-center">
            {n === 14 && <span className="absolute h-9 w-9 rounded-full bg-terra shadow ring-2 ring-sage/60 ring-offset-2 ring-offset-white/60" />}
            <span className={`relative ${n === 14 ? 'font-bold text-white' : 'text-ink/70'}`}>{n}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Music({ playing, toggle }) {
  return (
    <motion.button onClick={toggle} aria-label={playing ? 'Pausar música' : 'Reproducir música'} initial={{ scale: 0 }} animate={{ scale: 1 }} whileTap={{ scale: 0.9 }}
      className="fixed right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/50 text-sage2 shadow-md ring-1 ring-sage/30 backdrop-blur-md">
      {playing && <motion.span className="absolute inset-0 rounded-full ring-2 ring-sage/50" animate={{ scale: [1, 1.5], opacity: [0.6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut' }} />}
      <Icon d={playing ? I.pause : I.music} className="h-5 w-5" />
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
      const start = performance.now()
      const step = (t) => { const v = Math.min(1, (t - start) / 1500); a.volume = v; if (v < 1) requestAnimationFrame(step) }
      requestAnimationFrame(step)
    }).catch(() => {})
  }
  const toggle = () => {
    const a = audio.current
    if (a.paused) { a.play(); setPlaying(true) } else { a.pause(); setPlaying(false) }
  }
  const open = () => { fadeIn(); setTimeout(() => setStage('tarjeta'), 2700) }
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MSG)}`

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream" style={paper}>
      <audio ref={audio} src={`${B}musica.mp3`} loop preload="auto" />
      <AnimatePresence>{stage === 'sobre' && <Envelope onOpen={open} />}</AnimatePresence>
      {stage === 'tarjeta' && <Music playing={playing} toggle={toggle} />}

      {stage === 'tarjeta' && (
        <motion.main initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: EASE }} className="pb-20 pt-16">
          <header className="relative mx-auto w-[90%] max-w-md px-2 py-8 text-center">
            <Leaf className="absolute -left-6 -top-6 h-32 -rotate-[30deg]" />
            <Leaf className="absolute -right-6 -top-6 h-32 rotate-[30deg]" />
            <p className="font-serif text-sm uppercase tracking-[.25em] text-ink/80">Acompáñanos a ser parte del</p>
            <h1 className="mt-5 font-script text-5xl leading-[1.1] text-[#B08A55]">Bautismo <span className="text-3xl">y</span><br />Primer Añito</h1>
            <p className="mt-5 font-serif italic tracking-wide text-ink/80">de nuestra pequeña hija</p>
            <h2 className="mt-4 font-script text-[4.5rem] leading-none text-terra drop-shadow-[0_2px_2px_rgba(226,149,120,.25)]">Olivia</h2>
            <h2 className="font-script text-[3.5rem] leading-tight text-terra drop-shadow-[0_2px_2px_rgba(226,149,120,.25)]">Vizcarra</h2>
            <div className="mt-8 flex items-center justify-center gap-3 font-sans text-xs font-semibold tracking-[.25em] text-ink/70">
              <span className="border-y border-terra/40 py-1.5">SÁBADO</span>
              <span className="font-script text-5xl font-normal tracking-normal text-[#B08A55]">14</span>
              <span className="border-y border-terra/40 py-1.5">NOVIEMBRE 2026</span>
            </div>
          </header>

          <Section className="!p-3">
            <div className="rounded-2xl border-4 border-double border-sage/60 p-1">
              <img src={`${B}olivia.jpg`} alt="Ilustración de Olivia en su canastita con su perrito" className="w-full rounded-xl" />
            </div>
            <Leaf className="absolute -bottom-6 -left-4 h-24 -rotate-45" />
            <Leaf className="absolute -bottom-6 -right-4 h-24 rotate-45" />
          </Section>

          <EventCard icon={I.church} title="MISA" place="Iglesia Catedral" name="Ntra. Sra. de la Merced" addr="Sarmiento 72 · B. Bca." time="11:00 hs."
            map="https://www.google.com/maps/search/?api=1&query=Iglesia+Catedral+Ntra.+Sra.+de+la+Merced+Sarmiento+72+Bahia+Blanca" label="Ver ubicación de la Misa" />
          <EventCard icon={I.party} title="FESTEJO" place="Quincho de Eventos" name="La Soñada" addr="Necochea 3986 · B. Bca." time="13:00 hs."
            map="https://www.google.com/maps/search/?api=1&query=Quincho+de+Eventos+La+So%C3%B1ada+Necochea+3986+Bahia+Blanca" label="Ver ubicación del Festejo" />

          <Countdown />
          <Calendar />

          <Section>
            <h3 className="font-script text-5xl text-sage2">¡Te esperamos!</h3>
            <p className="mt-3 font-sans text-xs uppercase tracking-widest text-ink/60">Por favor confirmá tu asistencia</p>
            <Btn href={wa} icon={I.chat} className="bg-[#25D366]">Confirmar asistencia por WhatsApp</Btn>
          </Section>
        </motion.main>
      )}
    </div>
  )
}
