// Shared UI primitives + helpers

const { motion, AnimatePresence } = window.Motion || window['framer-motion'] || {};
const m = motion || { div: 'div', button: 'button', span: 'span', section: 'section' };

const COLORS = {
  coral:'#E63946', azul:'#0077B6', menta:'#06A77D',
  naranja:'#F77F00', amari:'#FFD60A', mora:'#7209B7',
};

function cx(...xs){ return xs.filter(Boolean).join(' '); }

// Inline-style markdown bold replacement: **txt** → bold span
function MdBold({ children }) {
  if (typeof children !== 'string') return children;
  const parts = children.split(/\*\*(.+?)\*\*/g);
  return parts.map((p,i) =>
    i % 2 === 1
      ? <strong key={i} className="font-bold text-ink">{p}</strong>
      : <React.Fragment key={i}>{p}</React.Fragment>
  );
}

// Progress storage
const STORE_KEY = 'maite_cargas_v1';
function loadStore() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); } catch { return {}; }
}
function saveStore(s) { localStorage.setItem(STORE_KEY, JSON.stringify(s)); }
function updateStore(updater) {
  const s = loadStore();
  const next = updater(s) || s;
  saveStore(next);
  window.dispatchEvent(new CustomEvent('store-update'));
  return next;
}
function useStore() {
  const [s, setS] = React.useState(loadStore());
  React.useEffect(() => {
    const h = () => setS(loadStore());
    window.addEventListener('store-update', h);
    window.addEventListener('storage', h);
    return () => { window.removeEventListener('store-update', h); window.removeEventListener('storage', h); };
  }, []);
  return s;
}

// ---- Header / Nav ----
function Nav({ route }) {
  const links = [
    ['#/',          'Inicio',   '🏠'],
    ['#/materia',   'Materia',  '📖'],
    ['#/juegos',    'Juegos',   '🎮'],
    ['#/quiz',      'Quiz',     '✍️'],
    ['#/progreso',  'Progreso', '📊'],
  ];
  return (
    <header className="sticky top-0 z-30 bg-cream/90 backdrop-blur border-b-2 border-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
        <a href="#/" className="flex items-center gap-2 font-display font-bold text-xl">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-amari border-2 border-ink shadow-pop-sm">⚡</span>
          <span>Cargas <span className="scribble">Eléctricas</span></span>
        </a>
        <nav className="ml-auto flex flex-wrap gap-1.5">
          {links.map(([href, label, icon]) => {
            const active = route === href || (href !== '#/' && route.startsWith(href));
            return (
              <a key={href} href={href}
                 className={cx('px-3 py-1.5 rounded-full text-sm font-medium border-2 border-ink transition-all',
                   active ? 'bg-ink text-cream' : 'bg-white hover:bg-amari')}>
                <span className="mr-1">{icon}</span>{label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

// ---- Atomic particles (decorative SVG) ----
function Particle({ kind='proton', size=44 }) {
  const map = {
    proton:   { bg:'#E63946', label:'+', stroke:'#fff' },
    electron: { bg:'#0077B6', label:'−', stroke:'#fff' },
    neutron:  { bg:'#FFF', label:'n', stroke:'#1F1B16' },
  };
  const c = map[kind];
  return (
    <div className="inline-flex items-center justify-center rounded-full font-display font-bold border-2 border-ink shadow-pop-sm"
         style={{ width:size, height:size, background:c.bg, color: kind==='neutron' ? '#1F1B16':'#fff', fontSize: size*0.5 }}>
      {c.label}
    </div>
  );
}

// Mini atom illustration
function MiniAtom({ size = 110 }) {
  return (
    <div className="relative" style={{ width:size, height:size }}>
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-ink/40"></div>
      <div className="absolute inset-3 rounded-full border-2 border-dashed border-ink/30 rotate-45"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-coral border-2 border-ink flex items-center justify-center text-white font-display font-bold">+</div>
      <span className="orbit-dot" style={{ '--r': `${size*0.45}px`, '--d':'4s' }}></span>
      <span className="orbit-dot" style={{ '--r': `${size*0.45}px`, '--d':'4s', animationDelay:'-1.5s', background:'#06A77D' }}></span>
    </div>
  );
}

// Sign chip
function Sign({ value }) {
  const map = {
    '+':{bg:'#E63946',c:'#fff'}, '-':{bg:'#0077B6',c:'#fff'}, '0':{bg:'#fff',c:'#1F1B16'}
  };
  const v = value === '−' ? '-' : value;
  const s = map[v] || map['0'];
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-ink font-display font-bold text-sm"
          style={{ background:s.bg, color:s.c }}>
      {value}
    </span>
  );
}

// Button
function Btn({ as='button', tone='ink', className='', children, ...rest }) {
  const tones = {
    ink: 'bg-ink text-cream',
    coral: 'bg-coral text-white',
    azul: 'bg-azul text-white',
    menta: 'bg-menta text-white',
    naranja: 'bg-naranja text-white',
    mora: 'bg-mora text-white',
    amari: 'bg-amari text-ink',
    white: 'bg-white text-ink',
  };
  const Cmp = as;
  return (
    <Cmp className={cx('popbtn font-display font-semibold px-4 py-2', tones[tone], className)} {...rest}>
      {children}
    </Cmp>
  );
}

// Section title bar
function TitleBar({ tag, color='coral', children, right }) {
  const bg = COLORS[color] || color;
  return (
    <div className="flex items-end gap-4 flex-wrap mb-6">
      <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight">
        <span className="inline-block px-2 py-0.5 mr-2 text-base align-middle rounded-md border-2 border-ink text-white font-mono font-semibold"
              style={{ background:bg }}>{tag}</span>
        <span className="scribble">{children}</span>
      </h2>
      {right && <div className="ml-auto">{right}</div>}
    </div>
  );
}

// Confetti-ish on win
function useConfetti() {
  const [bits, setBits] = React.useState([]);
  function fire() {
    const arr = Array.from({length:24}).map((_,i) => ({
      id: Math.random(),
      l: Math.random()*100,
      x: (Math.random()-0.5)*200,
      r: Math.random()*360,
      c: shuffle(['#E63946','#0077B6','#06A77D','#F77F00','#FFD60A','#7209B7'])[0],
    }));
    setBits(arr);
    setTimeout(() => setBits([]), 1400);
  }
  const node = (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {bits.map(b => (
        <span key={b.id} style={{
          position:'absolute', left:`${b.l}%`, top:'-20px', width:10, height:14, background:b.c,
          borderRadius:2, transform:`rotate(${b.r}deg)`,
          animation:'fall 1.2s ease-in forwards',
          ['--x']: `${b.x}px`,
        }}/>
      ))}
      <style>{`@keyframes fall { to { transform: translateY(110vh) translateX(var(--x)) rotate(720deg); opacity: 0; } }`}</style>
    </div>
  );
  return { fire, node };
}

// Feedback modal/toast (centered)
function Feedback({ ok, title, text, onClose, autoClose=2200 }) {
  React.useEffect(() => {
    if (!autoClose) return;
    const t = setTimeout(onClose, autoClose);
    return () => clearTimeout(t);
  }, [autoClose, onClose]);
  if (ok === null || ok === undefined) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none">
      <div className={cx('popcard px-5 py-4 max-w-md pointer-events-auto',
        ok ? 'bg-menta text-white' : 'bg-coral text-white')}>
        <div className="font-display font-bold text-2xl flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-ink">{ok?'✓':'✗'}</span>
          {title || (ok ? '¡Correcto!' : 'Mmm…')}
        </div>
        {text && <p className="mt-1 text-sm leading-snug">{text}</p>}
      </div>
    </div>
  );
}

Object.assign(window, { Nav, MdBold, Btn, TitleBar, Particle, MiniAtom, Sign, Feedback, useConfetti, loadStore, saveStore, updateStore, useStore, COLORS, cx, m, AnimatePresence, motion });
