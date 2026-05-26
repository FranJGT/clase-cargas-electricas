// Juego 5: Simulador interactivo
// 3 mini-simuladores en tabs: atracción/repulsión, frotamiento (peineta), circuito

function GameSimulador({ onExit }) {
  const [tab, setTab] = React.useState('cargas');
  const tabs = [
    ['cargas',   'Atracción / Repulsión', '🧲'],
    ['frotamiento',    'Peineta y papelitos',   '🪮'],
    ['circuito', 'Circuito eléctrico',    '💡'],
  ];
  React.useEffect(() => {
    updateStore(s => {
      s.juegos = s.juegos || {};
      s.juegos.simulador = s.juegos.simulador || { jugadas: 0, exploradas: {} };
      s.juegos.simulador.exploradas[tab] = true;
      return s;
    });
  }, [tab]);

  return (
    <GameShell title="Simulador" color="azul" onExit={onExit}>
      <div className="flex flex-wrap gap-2 mb-5">
        {tabs.map(([k,n,em]) => (
          <button key={k} onClick={()=>setTab(k)}
            className={cx('popbtn px-3 py-2 text-sm font-display font-semibold',
              tab===k ? 'bg-azul text-white' : 'bg-white')}>
            <span className="mr-1">{em}</span>{n}
          </button>
        ))}
      </div>
      {tab==='cargas' && <SimCargas/>}
      {tab==='frotamiento' && <SimFrote/>}
      {tab==='circuito' && <SimCircuito/>}
    </GameShell>
  );
}

// ---- 5a. Atracción y repulsión ----
function SimCargas() {
  const [a, setA] = React.useState('+');
  const [b, setB] = React.useState('-');
  const [t, setT] = React.useState(0);

  // animate position based on charges
  React.useEffect(() => {
    setT(0);
    const id = setInterval(() => setT(x => Math.min(x + 0.04, 1)), 40);
    return () => clearInterval(id);
  }, [a, b]);

  const same = a === b;
  // base x: 30% and 70%, then displace
  const disp = (same ? 1 : -1) * t * 14; // percent of container width
  const xa = 30 - disp;
  const xb = 70 + disp;
  const force = same ? 'Repulsión' : 'Atracción';

  return (
    <div>
      <div className="popcard-sm bg-cream p-4 mb-4 relative h-64">
        <div className="absolute left-3 top-3 popcard-sm bg-white px-3 py-1 text-sm font-display font-semibold">
          {a} y {b} → <span className={same ? 'text-coral' : 'text-menta'}>{force}</span>
        </div>
        {/* arrows */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#1F1B16"/>
            </marker>
          </defs>
          {/* arrows from each ball indicating direction of force */}
          <line x1={`${xa+4}%`} y1="50%" x2={`${xa+(same?-12:12)}%`} y2="50%" stroke="#1F1B16" strokeWidth="2" markerEnd="url(#arrow)"/>
          <line x1={`${xb-4}%`} y1="50%" x2={`${xb+(same?12:-12)}%`} y2="50%" stroke="#1F1B16" strokeWidth="2" markerEnd="url(#arrow)"/>
        </svg>
        {/* spheres */}
        <div className="absolute top-1/2 -translate-y-1/2 transition-[left] duration-300" style={{ left: `${xa}%`, transform:'translate(-50%,-50%)' }}>
          <Particle kind={a==='+'?'proton':'electron'} size={64}/>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 transition-[left] duration-300" style={{ left: `${xb}%`, transform:'translate(-50%,-50%)' }}>
          <Particle kind={b==='+'?'proton':'electron'} size={64}/>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="popcard-sm bg-white p-4">
          <div className="font-display font-semibold mb-2">Esfera A</div>
          <div className="flex gap-2">
            <Btn tone={a==='+'?'coral':'white'} onClick={()=>setA('+')}>+ Positiva</Btn>
            <Btn tone={a==='-'?'azul':'white'} onClick={()=>setA('-')}>− Negativa</Btn>
          </div>
        </div>
        <div className="popcard-sm bg-white p-4">
          <div className="font-display font-semibold mb-2">Esfera B</div>
          <div className="flex gap-2">
            <Btn tone={b==='+'?'coral':'white'} onClick={()=>setB('+')}>+ Positiva</Btn>
            <Btn tone={b==='-'?'azul':'white'} onClick={()=>setB('-')}>− Negativa</Btn>
          </div>
        </div>
      </div>

      <p className="mt-4 popcard-sm bg-amari p-3 text-sm">
        <strong>Regla:</strong> cargas del <strong>mismo signo se repelen</strong>; cargas de <strong>distinto signo se atraen</strong>.
      </p>
    </div>
  );
}

// ---- 5b. Frotamiento: peineta ----
function SimFrote() {
  const [frotada, setFrotada] = React.useState(false);
  const [frotando, setFrotando] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 50, y: 40 }); // % within stage
  const stageRef = React.useRef(null);

  // 6 papelitos position
  const [papers, setPapers] = React.useState(() => Array.from({length:6}).map((_,i) => ({
    id:i, x: 15 + i*12 + (Math.random()*4-2), y: 78 + (Math.random()*4),
  })));

  function frotar() {
    setFrotando(true);
    setTimeout(() => { setFrotando(false); setFrotada(true); }, 1200);
  }
  function reset() { setFrotada(false); setFrotando(false); }

  function onMove(e) {
    if (!stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    const px = ((e.clientX || (e.touches?.[0]?.clientX ?? 0)) - r.left) / r.width * 100;
    const py = ((e.clientY || (e.touches?.[0]?.clientY ?? 0)) - r.top) / r.height * 100;
    setPos({ x: Math.max(0, Math.min(100, px)), y: Math.max(0, Math.min(100, py)) });
  }

  // distance from peineta to each paper
  function attractionFor(p) {
    if (!frotada) return { ax:0, ay:0, dist: 100 };
    const dx = pos.x - p.x;
    const dy = pos.y - p.y;
    const d = Math.sqrt(dx*dx + dy*dy);
    const pull = Math.max(0, 1 - d/22); // within 22% radius
    return { ax: dx * pull * 0.6, ay: dy * pull * 0.6, dist: d };
  }

  return (
    <div>
      <div ref={stageRef}
        onPointerMove={onMove}
        className="popcard-sm bg-cream p-4 relative h-80 overflow-hidden cursor-crosshair"
        style={{ touchAction: 'none' }}>
        {/* peineta */}
        <div className="absolute" style={{ left:`${pos.x}%`, top:`${pos.y}%`, transform:'translate(-50%,-50%)' }}>
          <div className={cx('relative', frotando && 'animate-pulse')}>
            <svg width="92" height="56" viewBox="0 0 92 56">
              <rect x="6" y="6" width="80" height="18" rx="6" fill={frotada?'#7209B7':'#1F1B16'} stroke="#1F1B16" strokeWidth="2"/>
              {Array.from({length:10}).map((_,i)=>(
                <rect key={i} x={10+i*8} y="22" width="5" height="28" rx="2" fill={frotada?'#7209B7':'#1F1B16'} stroke="#1F1B16" strokeWidth="2"/>
              ))}
            </svg>
            {frotada && (
              <>
                <span className="absolute -top-2 -right-1 text-azul font-display font-bold text-lg">−</span>
                <span className="absolute -top-2 left-2 text-azul font-display font-bold text-lg">−</span>
                <span className="absolute -top-2 left-1/2 text-azul font-display font-bold text-lg">−</span>
              </>
            )}
            {frotando && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-2xl" style={{ animation:'spark 0.4s linear infinite' }}>✨</div>
            )}
          </div>
          <div className="text-xs text-ink/60 mt-1 text-center font-mono">{frotada?'cargada':'mueve el cursor'}</div>
        </div>

        {/* tela de frotamiento */}
        <div className="absolute left-3 top-3 popcard-sm bg-white px-3 py-2 text-sm">
          <Btn tone={frotada?'menta':'mora'} className="text-xs px-3 py-1.5" onClick={frotada?reset:frotar}>
            {frotada ? '↻ Descargar' : (frotando ? 'Frotando…' : '🧣 Frotar peineta')}
          </Btn>
        </div>

        {/* papelitos */}
        {papers.map(p => {
          const a = attractionFor(p);
          return (
            <div key={p.id}
              className="absolute transition-transform duration-200"
              style={{ left:`${p.x}%`, top:`${p.y}%`, transform:`translate(-50%,-50%) translate(${a.ax}vw, ${a.ay}vh)` }}>
              <div className="w-6 h-6 bg-white border-2 border-ink rounded-sm shadow-pop-sm rotate-3"></div>
            </div>
          );
        })}

        {/* mesa */}
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-ink"></div>
      </div>

      <p className="mt-4 popcard-sm bg-amari p-3 text-sm leading-snug">
        <strong>{frotada ? '¡Frotada!' : 'Aún sin frotar.'}</strong>{' '}
        {frotada
          ? 'Al frotar, la peineta ganó electrones y ahora tiene carga negativa (−). Mueve el cursor cerca de los papelitos: los atrae porque los polariza, aunque sean neutros.'
          : 'Haz clic en "Frotar peineta" para electrizarla por frotamiento. Luego acércala a los papelitos.'}
      </p>
    </div>
  );
}

// ---- 5c. Circuito ----
function SimCircuito() {
  const [cerrado, setCerrado] = React.useState(false);
  const [pilas, setPilas] = React.useState(1);

  const brillo = cerrado ? Math.min(1, 0.4 + pilas*0.25) : 0;
  // electrons positions along the wire path (we will use offset-path)
  const path = 'M 90 200 L 90 50 L 410 50 L 410 200 L 250 200 Z';

  return (
    <div>
      <div className="popcard-sm bg-cream p-4 relative">
        <svg viewBox="0 0 500 280" className="w-full">
          <defs>
            <path id="wire" d={path} fill="none"/>
            <radialGradient id="bulb-on" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#FFD60A"/>
              <stop offset="60%" stopColor="#F77F00"/>
              <stop offset="100%" stopColor="#F77F00" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* wire */}
          <path d={path} fill="none" stroke="#1F1B16" strokeWidth="6" strokeLinejoin="round"/>

          {/* gap (switch) - we put switch at the bottom, between 250 and 310 */}
          <line x1="200" y1="200" x2="300" y2="200" stroke="#FFF9F0" strokeWidth="10"/>
          {/* switch arm */}
          <line x1="200" y1="200" x2={cerrado ? 300 : 285} y2={cerrado ? 200 : 170}
            stroke="#1F1B16" strokeWidth="6" strokeLinecap="round"
            style={{ transition: 'all .3s' }}/>
          <circle cx="200" cy="200" r="6" fill="#1F1B16"/>
          <circle cx="300" cy="200" r="6" fill="#1F1B16"/>
          <text x="220" y="232" fontFamily="Fredoka" fontSize="14" fill="#1F1B16">interruptor</text>

          {/* battery on top */}
          <g transform="translate(180, 24)">
            {Array.from({length:pilas}).map((_,i) => (
              <g key={i} transform={`translate(${i*48}, 0)`}>
                <rect x="0" y="0" width="40" height="52" rx="6" fill="#FFD60A" stroke="#1F1B16" strokeWidth="3"/>
                <rect x="12" y="-6" width="16" height="8" rx="2" fill="#1F1B16"/>
                <text x="20" y="32" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="20" fill="#1F1B16">+</text>
              </g>
            ))}
          </g>

          {/* bulb on the left vertical */}
          <g transform="translate(90, 120)">
            <circle r="32" fill="url(#bulb-on)" style={{ opacity: brillo }}/>
            <circle r="22" fill={cerrado ? '#FFE680' : '#fff'} stroke="#1F1B16" strokeWidth="3"/>
            <path d="M -8 -4 Q 0 8 8 -4" fill="none" stroke="#1F1B16" strokeWidth="2"/>
            <rect x="-10" y="14" width="20" height="8" fill="#1F1B16"/>
            <text x="0" y="44" textAnchor="middle" fontFamily="Fredoka" fontSize="14" fill="#1F1B16">ampolleta</text>
          </g>

          {/* electrons */}
          {cerrado && Array.from({length:8}).map((_,i) => (
            <circle key={i} r="5" fill="#0077B6" stroke="#1F1B16" strokeWidth="1.5">
              <animateMotion dur={`${Math.max(0.8, 3 - pilas*0.6)}s`} repeatCount="indefinite"
                begin={`${-i * 0.4}s`}
                path={path} rotate="auto"/>
            </circle>
          ))}
        </svg>

        <div className="absolute right-3 top-3 popcard-sm bg-white px-3 py-2 text-xs font-display font-semibold">
          Circuito: {cerrado ? <span className="text-menta">CERRADO</span> : <span className="text-coral">ABIERTO</span>}
        </div>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        <div className="popcard-sm bg-white p-4">
          <div className="font-display font-semibold mb-2">Interruptor</div>
          <Btn tone={cerrado?'coral':'menta'} onClick={()=>setCerrado(c=>!c)}>
            {cerrado ? 'Abrir interruptor' : 'Cerrar interruptor'}
          </Btn>
        </div>
        <div className="popcard-sm bg-white p-4">
          <div className="font-display font-semibold mb-1">Pilas: {pilas}</div>
          <input type="range" min="1" max="3" step="1" value={pilas} onChange={e=>setPilas(+e.target.value)} className="w-full"/>
          <div className="text-xs text-ink/60">Más pilas → más brillo y electrones más rápidos.</div>
        </div>
      </div>
      <p className="mt-4 popcard-sm bg-amari p-3 text-sm leading-snug">
        {cerrado
          ? 'Con el circuito cerrado, los electrones (azul) circulan por el cable y la ampolleta se enciende.'
          : 'El circuito está abierto: el interruptor interrumpe el paso de los electrones, por eso la ampolleta no se enciende.'}
      </p>
    </div>
  );
}

Object.assign(window, { GameSimulador });
