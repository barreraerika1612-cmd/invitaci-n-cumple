import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WHATSAPP_NUMBER = '543816772676'
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


/* ---------- Efecto mágico de apertura ---------- */
// Canvas: dos estelas doradas en espiral que se entrelazan + chispas
function SparkleCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d'), dpr = Math.min(2, devicePixelRatio || 1)
    const W = innerWidth, H = innerHeight
    c.width = W * dpr; c.height = H * dpr; ctx.scale(dpr, dpr)
    const cx = W / 2, cy = H * 0.55, parts = [], t0 = performance.now()
    let raf
    const head = (t, dir) => {
      const a = t * Math.PI * 2.6, r = 15 + t * Math.min(W, H) * 0.38
      return [cx + dir * Math.sin(a) * r, cy - t * H * 0.5 + (1 - Math.cos(a)) * r * 0.35]
    }
    const loop = (now) => {
      const t = (now - t0) / 1600
      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'source-over'
      if (t < 1) for (const dir of [1, -1]) {
        const [x, y] = head(t, dir)
        for (let k = 0; k < 2; k++) parts.push({ x, y, vx: (Math.random() - .5) * 1.2, vy: (Math.random() - .5) * 1.2 + .3, life: 1, s: Math.random() * 1.8 + .4, tw: Math.random() * 6 })
      }
      for (let i = parts.length - 1; i >= 0; i--) {
        const q = parts[i]
        q.x += q.vx; q.y += q.vy; q.vy += 0.01; q.life -= 0.016
        if (q.life <= 0) { parts.splice(i, 1); continue }
        const a = q.life * (0.6 + 0.4 * Math.sin(now / 60 + q.tw))
        const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, q.s * 4)
        g.addColorStop(0, `rgba(255,248,220,${a})`); g.addColorStop(0.3, `rgba(222,168,58,${a * 0.9})`); g.addColorStop(1, 'rgba(200,140,40,0)')
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(q.x, q.y, q.s * 4, 0, 7); ctx.fill()
        if (q.s > 2.3 && a > .5) { // destello en cruz
          ctx.strokeStyle = `rgba(214,160,50,${a * .8})`; ctx.lineWidth = .8; ctx.beginPath()
          ctx.moveTo(q.x - q.s * 4, q.y); ctx.lineTo(q.x + q.s * 4, q.y); ctx.moveTo(q.x, q.y - q.s * 4); ctx.lineTo(q.x, q.y + q.s * 4); ctx.stroke()
        }
      }
      if (t < 1 || parts.length) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-50 h-full w-full" />
}

// Trayectorias curvas de las mariposas [x, y] en px desde el centro del sobre
const FLIGHTS = [
  [[0, 0], [-60, -80], [-30, -180], [-140, -260], [-190, -420]],
  [[0, 0], [70, -60], [40, -170], [150, -240], [200, -400]],
  [[0, 0], [-30, -90], [-110, -140], [-170, -110], [-230, -200]],
  [[0, 0], [40, -100], [120, -130], [180, -90], [240, -180]],
  [[0, 0], [-10, -120], [40, -220], [-20, -320], [30, -460]],
  [[0, 0], [20, -70], [-60, -170], [60, -280], [-40, -440]],
]
function Butterfly({ path, i }) {
  return (
    <motion.div className="absolute -ml-7 -mt-7 w-14" style={{ perspective: 300 }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ x: path.map((p) => p[0]), y: path.map((p) => p[1]), opacity: [0, 1, 1, 0.9, 0], scale: [0.3, 0.9, 1, 1, 0.8], rotate: path.map((p, k) => (k ? Math.sign(p[0] - path[k - 1][0]) * 14 : 0)) }}
      transition={{ duration: 2 + (i % 3) * 0.25, delay: 1.0 + i * 0.12, ease: 'easeInOut' }}>
      <motion.img src={`${B}${i % 2 ? 'mariposa-lila' : 'mariposa-rosa'}.png`} alt="" className="w-full drop-shadow-[0_0_6px_rgba(240,200,120,.6)]"
        animate={{ rotateY: [0, 65, 0] }} transition={{ repeat: Infinity, duration: 0.32 + (i % 3) * 0.05, ease: 'easeInOut' }} />
    </motion.div>
  )
}

function Magic() {
  return (
    <>
      <div className="pointer-events-none absolute left-1/2 top-[45%] z-[60]">
        {/* resplandor interno */}
        <motion.div className="absolute -ml-40 -mt-40 h-80 w-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,236,180,.95) 0%, rgba(244,190,180,.55) 35%, rgba(255,220,200,0) 70%)', filter: 'blur(6px)' }}
          initial={{ scale: 0.1, opacity: 0 }} animate={{ scale: [0.1, 1.4, 2.2], opacity: [0, 1, 0] }} transition={{ duration: 1.8, ease: 'easeOut' }} />
        {/* niebla */}
        {[[-90, -60], [80, -80], [-40, -140], [60, -20], [0, -100], [-120, 10], [120, 0]].map(([x, y], k) => (
          <motion.div key={k} className="absolute -ml-16 -mt-16 h-32 w-32 rounded-full"
            style={{ background: k % 2 ? 'rgba(255,255,255,.7)' : 'rgba(248,214,206,.7)', filter: 'blur(22px)' }}
            initial={{ x: 0, y: 0, scale: 0.3, opacity: 0 }}
            animate={{ x: x * 1.6, y: y * 1.6, scale: [0.3, 1.6, 2.4], opacity: [0, 0.85, 0] }}
            transition={{ duration: 2.2, delay: 0.15 + k * 0.05, ease: 'easeOut' }} />
        ))}
        {FLIGHTS.map((p, i) => <Butterfly key={i} path={p} i={i} />)}
      </div>
    </>
  )
}

/* Fondo ambiental: polvo dorado + mariposas casi imperceptibles */
function Ambient() {
  const dust = useRef(Array.from({ length: 18 }, () => ({ x: Math.random() * 100, d: 10 + Math.random() * 14, s: 2 + Math.random() * 3, dl: Math.random() * 10 }))).current
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {dust.map((p, i) => (
        <motion.span key={i} className="absolute rounded-full" style={{ left: `${p.x}%`, bottom: -10, width: p.s, height: p.s, background: '#F6DFA0', boxShadow: '0 0 6px 2px rgba(233,185,73,.5)' }}
          animate={{ y: [0, -innerHeight - 40], x: [0, 20, -15, 10], opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: p.d, delay: p.dl, repeat: Infinity, ease: 'linear' }} />
      ))}
      {[0, 1].map((i) => (
        <motion.img key={i} src={`${B}${i ? 'mariposa-lila' : 'mariposa-rosa'}.png`} alt="" className="absolute w-7 opacity-40"
          style={{ left: i ? '75%' : '10%', top: i ? '65%' : '30%' }}
          animate={{ x: [0, 40, -20, 0], y: [0, -30, -60, 0], rotateY: [0, 50, 0, 50, 0] }}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  )
}

function Envelope({ onOpen }) {
  const [open, setOpen] = useState(false)
  const click = () => { if (!open) { setOpen(true); onOpen() } }
  return (
    <motion.div className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-cream" style={paper}
      exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }}>
      {open && <SparkleCanvas />}
      <div className="relative aspect-[10/7] w-[84vw] max-w-sm" style={{ perspective: 1200 }}>
        {/* tarjeta: sale y hace zoom */}
        <motion.div className="absolute inset-x-4 bottom-4 top-4 rounded-xl bg-cream shadow-lg" style={{ zIndex: 2 }}
          animate={open ? { y: ['0%', '-85%', '-85%'], scale: [1, 1, 1.06], zIndex: [2, 2, 6] } : {}}
          transition={{ duration: 1.2, times: [0, 0.65, 1], ease: EASE, delay: 1.8 }}>
          <img src={`${B}interior.png`} alt="" className="h-full w-full rounded-xl object-cover" />
        </motion.div>
        {/* cuerpo */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl" style={{ zIndex: 3, background: '#F4E2DE', boxShadow: 'inset 0 0 0 1px rgba(160,90,70,.15), inset 0 -10px 24px rgba(160,90,70,.12)' }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top right,#EDD2CB 50%,transparent 50%) left/50% 100% no-repeat, linear-gradient(to top left,#E9CBC3 50%,transparent 50%) right/50% 100% no-repeat' }} />
          <div className="absolute inset-x-0 bottom-0 h-px bg-[#A05A46]/10" />
          <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,.35),transparent 40%,rgba(120,60,45,.08))' }} />
        </div>
        {/* solapa */}
        <motion.div className="absolute inset-x-0 top-0 h-[58%] origin-top overflow-hidden rounded-t-2xl"
          style={{ zIndex: open ? 0 : 4, clipPath: 'polygon(0 0,100% 0,50% 100%)', background: 'linear-gradient(170deg,#F7E7E3 0%,#EBC9C0 100%)', filter: 'drop-shadow(0 6px 8px rgba(120,60,45,.3))' }}
          animate={open ? { rotateX: 180 } : {}} transition={{ duration: 1.3, ease: 'easeInOut' }} />
        {open && <Magic />}
        {/* texto en la solapa */}
        <AnimatePresence>
          {!open && <motion.p exit={{ opacity: 0 }} className="absolute inset-x-0 top-[12%] z-10 text-center font-serif text-base italic tracking-wider text-[#8A5A4C]/80">Tenés una invitación</motion.p>}
        </AnimatePresence>
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
    className={`relative mx-auto my-10 w-[90%] max-w-md rounded-3xl border border-sage/25 bg-white/50 px-6 py-10 text-center shadow-[0_10px_30px_-12px_rgba(88,129,87,.25)] backdrop-blur-sm ${className}`}>
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
      <h3 className="font-script text-5xl text-sage2">Reservá la fecha</h3>
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
      const step = (t) => { const v = Math.min(1, (t - start) / 1500); a.volume = Math.max(0, v); if (v < 1) requestAnimationFrame(step) }
      requestAnimationFrame(step)
    }).catch(() => {})
  }
  const toggle = () => {
    const a = audio.current
    if (a.paused) { a.play(); setPlaying(true) } else { a.pause(); setPlaying(false) }
  }
  const open = () => { fadeIn(); setTimeout(() => { setStage('horizontal'); setTimeout(() => setStage('tarjeta'), 3200) }, 2900) }
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MSG)}`

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream" style={paper}>
      {stage === 'tarjeta' && <Ambient />}
      <audio ref={audio} src={`${B}musica.mp3`} loop preload="auto" />
      <AnimatePresence>{stage === 'sobre' && <Envelope onOpen={open} />}</AnimatePresence>
      <AnimatePresence>
        {stage === 'horizontal' && (
          <motion.div key="h" className="fixed inset-0 z-30 flex items-center justify-center p-3" style={paper}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }} transition={{ duration: 0.6, ease: EASE }}>
            <motion.img src={`${B}interior.png`} alt="Invitación de Olivia" className="max-h-full max-w-full rounded-xl object-contain"
              initial={{ scale: 0.82, y: 40 }} animate={{ scale: 1, y: 0, boxShadow: ['0 0 0px rgba(240,200,120,0)', '0 0 60px 10px rgba(240,200,120,.55)', '0 0 30px 4px rgba(240,200,120,.35)'] }}
              transition={{ duration: 1.4, ease: EASE }} />
          </motion.div>
        )}
      </AnimatePresence>
      {stage === 'tarjeta' && <Music playing={playing} toggle={toggle} />}

      {stage === 'tarjeta' && (
        <motion.main initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: 'easeInOut' }} className="relative z-10 pb-20 pt-16">
          <header className="relative mx-auto w-[90%] max-w-md rounded-3xl border border-sage/30 bg-white/30 px-4 pb-10 pt-16 text-center shadow-[0_10px_30px_-14px_rgba(88,129,87,.3)] backdrop-blur-sm">
            <img src={`${B}mariposa-rosa.png`} alt="" className="absolute left-2 top-2 w-11 -rotate-12 opacity-90" />
            <img src={`${B}mariposa-lila.png`} alt="" className="absolute right-2 top-2 w-11 rotate-12 opacity-90" />
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
            map="https://www.google.com/maps/search/?api=1&query=-38.71641915651206,-62.26613550429844" label="Ver ubicación de la Misa" />
          <EventCard icon={I.party} title="FESTEJO" place="Quincho de Eventos" name="La Soñada" addr="Necochea 3986 · B. Bca." time="13:00 hs."
            map="https://www.google.com/maps/search/?api=1&query=-38.70716244995816,-62.20269887360896" label="Ver ubicación del Festejo" />

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
