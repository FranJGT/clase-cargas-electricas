// Visual widgets per section. SVG-based, animated where it helps.
// Mounts via <SectionWidget id={s.id}/> inside each materia card.

// ---------- helpers ----------
function Stage({ children, h='220px', bg='#FFF', className='' }) {
  return (
    <div className={cx("popcard-sm relative overflow-hidden", className)}
         style={{ background:bg, height:h }}>
      {children}
    </div>
  );
}
function Legend({ items }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs mt-2">
      {items.map(([sw, label], i) => (
        <span key={i} className="inline-flex items-center gap-1.5 popcard-sm bg-white px-2 py-1">
          <span className="w-3 h-3 rounded-full inline-block" style={{ background: sw }}/>
          {label}
        </span>
      ))}
    </div>
  );
}

// ---------- 1. Átomo ----------
function W_Atomo() {
  return (
    <>
      <Stage h="240px" bg="#FFF6E0">
        {/* núcleo */}
        <svg viewBox="0 0 320 220" className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="nucl" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#FFD8DC"/>
              <stop offset="100%" stopColor="#FFB4BC"/>
            </radialGradient>
          </defs>
          {/* órbitas */}
          <ellipse cx="160" cy="110" rx="120" ry="60" fill="none" stroke="#1F1B16" strokeWidth="2" strokeDasharray="5 4" opacity=".5"/>
          <ellipse cx="160" cy="110" rx="120" ry="60" fill="none" stroke="#1F1B16" strokeWidth="2" strokeDasharray="5 4" opacity=".5" transform="rotate(60 160 110)"/>
          <ellipse cx="160" cy="110" rx="120" ry="60" fill="none" stroke="#1F1B16" strokeWidth="2" strokeDasharray="5 4" opacity=".5" transform="rotate(-60 160 110)"/>
          {/* núcleo: protones + neutrones */}
          <g transform="translate(160 110)">
            <circle r="36" fill="url(#nucl)" stroke="#1F1B16" strokeWidth="2"/>
            <circle cx="-10" cy="-8" r="11" fill="#E63946" stroke="#1F1B16" strokeWidth="2"/>
            <text x="-10" y="-4" textAnchor="middle" fontFamily="Fredoka" fontSize="14" fontWeight="700" fill="#fff">+</text>
            <circle cx="12" cy="-6" r="11" fill="#E63946" stroke="#1F1B16" strokeWidth="2"/>
            <text x="12" y="-2" textAnchor="middle" fontFamily="Fredoka" fontSize="14" fontWeight="700" fill="#fff">+</text>
            <circle cx="0" cy="12" r="11" fill="#FFF" stroke="#1F1B16" strokeWidth="2"/>
            <text x="0" y="16" textAnchor="middle" fontFamily="Fredoka" fontSize="12" fontWeight="700" fill="#1F1B16">n</text>
            <circle cx="14" cy="14" r="11" fill="#FFF" stroke="#1F1B16" strokeWidth="2"/>
            <text x="14" y="18" textAnchor="middle" fontFamily="Fredoka" fontSize="12" fontWeight="700" fill="#1F1B16">n</text>
          </g>
          {/* electrones en órbita */}
          <g>
            <circle r="9" fill="#0077B6" stroke="#1F1B16" strokeWidth="2">
              <animateMotion dur="4s" repeatCount="indefinite">
                <mpath href="#orb1"/>
              </animateMotion>
            </circle>
            <circle r="9" fill="#0077B6" stroke="#1F1B16" strokeWidth="2">
              <animateMotion dur="5s" repeatCount="indefinite" begin="-1s">
                <mpath href="#orb2"/>
              </animateMotion>
            </circle>
            <circle r="9" fill="#0077B6" stroke="#1F1B16" strokeWidth="2">
              <animateMotion dur="6s" repeatCount="indefinite" begin="-2s">
                <mpath href="#orb3"/>
              </animateMotion>
            </circle>
          </g>
          <defs>
            <path id="orb1" d="M 280 110 A 120 60 0 1 1 40 110 A 120 60 0 1 1 280 110"/>
            <path id="orb2" d="M 220 16 A 120 60 60 1 1 100 204 A 120 60 60 1 1 220 16"/>
            <path id="orb3" d="M 100 16 A 120 60 -60 1 1 220 204 A 120 60 -60 1 1 100 16"/>
          </defs>
        </svg>
      </Stage>
      <Legend items={[['#E63946','protón (+)'],['#0077B6','electrón (−)'],['#FFF','neutrón (0)']]}/>
    </>
  );
}

// ---------- 2. Carga eléctrica: chips ----------
function W_Carga() {
  const [a, setA] = React.useState('+');
  const [b, setB] = React.useState('-');
  const [t, setT] = React.useState(0);
  const same = a === b;

  React.useEffect(() => {
    setT(0);
    const id = setInterval(() => setT(x => Math.min(x + 0.05, 1)), 40);
    return () => clearInterval(id);
  }, [a, b]);

  const disp = (same ? 1 : -1) * t * 14;
  const xa = 30 - disp;
  const xb = 70 + disp;

  return (
    <>
      <Stage h="220px" bg="#E8F4FB">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#1F1B16"/>
            </marker>
          </defs>
          <line x1={`${xa+4}%`} y1="55%" x2={`${xa+(same?-12:12)}%`} y2="55%" stroke="#1F1B16" strokeWidth="3" markerEnd="url(#ar2)"/>
          <line x1={`${xb-4}%`} y1="55%" x2={`${xb+(same?12:-12)}%`} y2="55%" stroke="#1F1B16" strokeWidth="3" markerEnd="url(#ar2)"/>
        </svg>
        <div className="absolute left-1/2 -translate-x-1/2 top-3 font-display font-bold text-xl" style={{ color: same ? '#E63946' : '#06A77D' }}>
          {same ? 'REPULSIÓN' : 'ATRACCIÓN'}
        </div>
        <div className="absolute top-[55%] transition-[left] duration-300" style={{ left: `${xa}%`, transform: 'translate(-50%,-50%)' }}>
          <Particle kind={a==='+'?'proton':'electron'} size={64}/>
        </div>
        <div className="absolute top-[55%] transition-[left] duration-300" style={{ left: `${xb}%`, transform: 'translate(-50%,-50%)' }}>
          <Particle kind={b==='+'?'proton':'electron'} size={64}/>
        </div>
      </Stage>
      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        <span className="popcard-sm bg-white px-2 py-1 flex gap-1">A:
          <button onClick={()=>setA('+')} className={cx('px-1.5 rounded', a==='+'?'bg-coral text-white':'')}>+</button>
          <button onClick={()=>setA('-')} className={cx('px-1.5 rounded', a==='-'?'bg-azul text-white':'')}>−</button>
        </span>
        <span className="popcard-sm bg-white px-2 py-1 flex gap-1">B:
          <button onClick={()=>setB('+')} className={cx('px-1.5 rounded', b==='+'?'bg-coral text-white':'')}>+</button>
          <button onClick={()=>setB('-')} className={cx('px-1.5 rounded', b==='-'?'bg-azul text-white':'')}>−</button>
        </span>
        <span className="text-ink/60 self-center">prueba combinaciones →</span>
      </div>
    </>
  );
}

// ---------- 3. Interacción: tabla animada ----------
function W_Interaccion() {
  const rows = [['+','+','REPELE','#E63946'],['−','−','REPELE','#E63946'],['+','−','ATRAE','#06A77D']];
  return (
    <Stage h="220px" bg="#FFF6E0">
      <div className="absolute inset-0 p-5 flex flex-col justify-center gap-2">
        {rows.map(([a,b,res,c],i) => (
          <div key={i} className="popcard-sm bg-white px-3 py-2 flex items-center gap-3">
            <Sign value={a}/>
            <span className="font-display text-lg">{res === 'ATRAE' ? '←→' : '⇄'}</span>
            <Sign value={b}/>
            <span className="ml-auto font-display font-bold" style={{ color:c }}>→ {res}</span>
          </div>
        ))}
      </div>
    </Stage>
  );
}

// ---------- 4. Frotamiento: globo + pelo ----------
function W_Frotamiento() {
  const [frot, setFrot] = React.useState(false);
  return (
    <>
      <Stage h="240px" bg="#FFE5E8">
        <svg viewBox="0 0 320 220" className="absolute inset-0 w-full h-full">
          {/* cabeza */}
          <circle cx="230" cy="130" r="52" fill="#FFD8B4" stroke="#1F1B16" strokeWidth="3"/>
          {/* pelo */}
          {Array.from({length:11}).map((_,i)=>{
            const angle = -120 + i*9;
            const rad = angle*Math.PI/180;
            const x1 = 230 + Math.cos(rad)*48;
            const y1 = 130 + Math.sin(rad)*48;
            const lift = frot ? (40 + Math.random()*15) : 0;
            const x2 = 230 + Math.cos(rad)*(48 + lift);
            const y2 = 130 + Math.sin(rad)*(48 + lift) - (frot ? 10 : 0);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3a2014" strokeWidth="4" strokeLinecap="round"
              style={{ transition:'all .4s' }}/>;
          })}
          {/* boquita */}
          <circle cx="200" cy="138" r="3" fill="#1F1B16"/>
          <path d="M 195 148 Q 200 152 205 148" fill="none" stroke="#1F1B16" strokeWidth="2" strokeLinecap="round"/>
          {/* globo */}
          <g transform={`translate(${frot ? 150 : 90}, 90) ${frot ? 'rotate(-12 0 0)' : ''}`} style={{ transition:'transform .5s' }}>
            <ellipse cx="0" cy="0" rx="44" ry="52" fill="#E63946" stroke="#1F1B16" strokeWidth="3"/>
            <ellipse cx="-14" cy="-18" rx="10" ry="14" fill="#fff" opacity=".4"/>
            <path d="M 0 52 L -6 64 L 6 64 Z" fill="#E63946" stroke="#1F1B16" strokeWidth="3"/>
            <path d="M 0 64 Q 14 90 -4 130 Q -20 160 0 200" fill="none" stroke="#1F1B16" strokeWidth="2"/>
            {frot && <>
              <text x="0" y="-10" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="18" fill="#fff">−−</text>
              <text x="0" y="14" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="18" fill="#fff">−−</text>
            </>}
          </g>
          {frot && <text x="160" y="40" textAnchor="middle" fontFamily="Fredoka" fontWeight="600" fontSize="14" fill="#1F1B16">¡los electrones pasaron al globo!</text>}
        </svg>
      </Stage>
      <div className="mt-2"><Btn tone={frot?'menta':'coral'} className="text-xs px-3 py-1.5" onClick={()=>setFrot(f=>!f)}>{frot?'↻ Reiniciar':'🪮 Frotar globo en el pelo'}</Btn></div>
    </>
  );
}

// ---------- 5. Tres formas ----------
function W_TresFormas() {
  return (
    <Stage h="200px" bg="#F3ECFB">
      <div className="absolute inset-0 grid grid-cols-3 gap-2 p-3">
        {[
          ['Frotamiento','#F77F00', (
            <svg viewBox="0 0 80 80" className="w-full h-20"><rect x="14" y="34" width="22" height="14" rx="4" fill="#F77F00" stroke="#1F1B16" strokeWidth="2"/>
              <rect x="44" y="34" width="22" height="14" rx="4" fill="#fff" stroke="#1F1B16" strokeWidth="2"/>
              <path d="M 30 25 Q 40 15 50 25" fill="none" stroke="#1F1B16" strokeWidth="2"/>
              <path d="M 30 57 Q 40 67 50 57" fill="none" stroke="#1F1B16" strokeWidth="2"/></svg>
          )],
          ['Contacto','#0077B6', (
            <svg viewBox="0 0 80 80" className="w-full h-20">
              <circle cx="28" cy="40" r="14" fill="#0077B6" stroke="#1F1B16" strokeWidth="2"/>
              <text x="28" y="45" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="14" fill="#fff">−</text>
              <circle cx="56" cy="40" r="14" fill="#fff" stroke="#1F1B16" strokeWidth="2"/>
              <text x="56" y="45" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="11" fill="#1F1B16">0</text>
              <line x1="42" y1="40" x2="42" y2="40" stroke="#1F1B16" strokeWidth="2"/>
            </svg>
          )],
          ['Inducción','#7209B7', (
            <svg viewBox="0 0 80 80" className="w-full h-20">
              <circle cx="22" cy="40" r="14" fill="#7209B7" stroke="#1F1B16" strokeWidth="2"/>
              <text x="22" y="45" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="14" fill="#fff">−</text>
              <rect x="44" y="26" width="28" height="28" rx="4" fill="#fff" stroke="#1F1B16" strokeWidth="2"/>
              <text x="50" y="44" fontFamily="Fredoka" fontWeight="700" fontSize="11" fill="#E63946">+</text>
              <text x="62" y="44" fontFamily="Fredoka" fontWeight="700" fontSize="11" fill="#0077B6">−</text>
              <path d="M 38 40 L 42 40" stroke="#1F1B16" strokeDasharray="2 2" strokeWidth="2"/>
            </svg>
          )],
        ].map(([n,c,svg],i)=>(
          <div key={i} className="popcard-sm bg-white p-2 flex flex-col items-center text-center">
            <div className="text-xs font-display font-bold mb-1" style={{ color:c }}>{n}</div>
            {svg}
          </div>
        ))}
      </div>
    </Stage>
  );
}

// ---------- 6. Inducción (el complejo!) ----------
function W_Induccion() {
  const [acercado, setAcercado] = React.useState(false);
  // when neutro: 3 pairs randomly distributed
  // when induccion: − pushed to opposite side, + concentrated near the charged
  return (
    <>
      <Stage h="260px" bg="#F3ECFB">
        <svg viewBox="0 0 360 240" className="absolute inset-0 w-full h-full">
          {/* mano sosteniendo varilla cargada negativa */}
          <g transform={`translate(${acercado ? 90 : 30}, 90)`} style={{ transition:'transform .8s ease' }}>
            <rect x="-10" y="0" width="80" height="14" rx="6" fill="#7209B7" stroke="#1F1B16" strokeWidth="2"/>
            <text x="0" y="11" fontFamily="Fredoka" fontWeight="700" fontSize="13" fill="#fff">−</text>
            <text x="18" y="11" fontFamily="Fredoka" fontWeight="700" fontSize="13" fill="#fff">−</text>
            <text x="36" y="11" fontFamily="Fredoka" fontWeight="700" fontSize="13" fill="#fff">−</text>
            <text x="54" y="11" fontFamily="Fredoka" fontWeight="700" fontSize="13" fill="#fff">−</text>
            <text x="-2" y="-8" fontFamily="Fredoka" fontSize="11" fill="#7209B7" fontWeight="600">varilla cargada (−)</text>
          </g>

          {/* objeto neutro (esfera) */}
          <g transform="translate(250 100)">
            <circle r="60" fill="#FFF" stroke="#1F1B16" strokeWidth="3"/>
            {/* 8 cargas FIJAS (mismo array, misma key) que cambian posición según acercado.
                neutro: mezcladas · inducido: + cerca de la varilla (izq), − empujadas (der) */}
            {[
              { t:'+', c:'#E63946', neu:{x:-20,y:-22}, ind:{x:-32,y:-10} },
              { t:'+', c:'#E63946', neu:{x:-8, y: 18}, ind:{x:-30,y: 14} },
              { t:'+', c:'#E63946', neu:{x: 6, y:-28}, ind:{x:-18,y:-26} },
              { t:'+', c:'#E63946', neu:{x: 32,y:-22}, ind:{x:-18,y: 30} },
              { t:'−', c:'#0077B6', neu:{x: 14,y: -8}, ind:{x: 32,y:-10} },
              { t:'−', c:'#0077B6', neu:{x: 24,y: 24}, ind:{x: 30,y: 14} },
              { t:'−', c:'#0077B6', neu:{x:-30,y:  8}, ind:{x: 18,y:-26} },
              { t:'−', c:'#0077B6', neu:{x:-12,y: 34}, ind:{x: 18,y: 30} },
            ].map((p,i)=>{
              const pos = acercado ? p.ind : p.neu;
              return (
                <g key={i} transform={`translate(${pos.x} ${pos.y})`} style={{ transition:'transform .8s ease' }}>
                  <circle r="10" fill={p.c} stroke="#1F1B16" strokeWidth="2"/>
                  <text textAnchor="middle" y="4" fontFamily="Fredoka" fontWeight="700" fontSize="13" fill="#fff">{p.t}</text>
                </g>
              );
            })}
            <text x="0" y="80" textAnchor="middle" fontFamily="Fredoka" fontWeight="600" fontSize="12" fill="#1F1B16">objeto neutro</text>
          </g>

          {acercado && (
            <text x="180" y="32" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="15" fill="#7209B7">
              ↓ las cargas se REDISTRIBUYEN ↓
            </text>
          )}
        </svg>
      </Stage>
      <div className="mt-2">
        <Btn tone={acercado?'mora':'amari'} className="text-xs px-3 py-1.5" onClick={()=>setAcercado(a=>!a)}>
          {acercado ? '↻ Alejar varilla' : '→ Acercar varilla (sin tocar)'}
        </Btn>
        <span className="ml-2 text-xs text-ink/65">Mira cómo los (+) son atraídos hacia la varilla (−) y los (−) son empujados al lado opuesto.</span>
      </div>
    </>
  );
}

// ---------- 7. Circuito ----------
function W_Circuito() {
  const [closed, setClosed] = React.useState(true);
  const path = 'M 50 150 L 50 50 L 270 50 L 270 150 L 160 150';
  return (
    <>
      <Stage h="220px" bg="#E8F4FB">
        <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full">
          <path d={path} fill="none" stroke="#1F1B16" strokeWidth="5"/>
          <line x1="160" y1="150" x2="270" y2="150" stroke="#1F1B16" strokeWidth="5"/>
          {/* switch */}
          <line x1="120" y1="150" x2={closed?160:150} y2={closed?150:128}
            stroke={closed?'#06A77D':'#E63946'} strokeWidth="5" strokeLinecap="round" style={{ transition:'all .3s' }}/>
          <circle cx="120" cy="150" r="5" fill="#1F1B16"/>
          <circle cx="160" cy="150" r="5" fill="#1F1B16"/>
          {/* pila */}
          <g transform="translate(140 24)">
            <rect x="0" y="0" width="40" height="50" rx="6" fill="#FFD60A" stroke="#1F1B16" strokeWidth="3"/>
            <rect x="12" y="-6" width="16" height="8" rx="2" fill="#1F1B16"/>
            <text x="20" y="32" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="18" fill="#1F1B16">+</text>
          </g>
          {/* bulb */}
          <g transform="translate(50 100)">
            {closed && <circle r="26" fill="#FFD60A" opacity=".6"/>}
            <circle r="18" fill={closed?'#FFE680':'#fff'} stroke="#1F1B16" strokeWidth="3"/>
            <rect x="-8" y="14" width="16" height="7" fill="#1F1B16"/>
          </g>
          {closed && Array.from({length:5}).map((_,i)=>(
            <circle key={i} r="4" fill="#0077B6" stroke="#1F1B16" strokeWidth="1.5">
              <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${-i*0.48}s`} path={path}/>
            </circle>
          ))}
          <text x="160" y="190" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="14" fill={closed?'#06A77D':'#E63946'}>
            {closed ? 'CERRADO — pasa corriente' : 'ABIERTO — no pasa corriente'}
          </text>
        </svg>
      </Stage>
      <div className="mt-2"><Btn tone={closed?'coral':'menta'} className="text-xs px-3 py-1.5" onClick={()=>setClosed(c=>!c)}>
        {closed ? 'Abrir interruptor' : 'Cerrar interruptor'}
      </Btn></div>
    </>
  );
}

// ---------- 8. Conductor vs aislante: cable cortado ----------
function W_ConductorAislante() {
  return (
    <Stage h="220px" bg="#FFF6E0">
      <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full">
        {/* cable cortado mostrando capas */}
        <g transform="translate(20 80)">
          <rect x="0" y="0" width="280" height="44" rx="22" fill="#06A77D" stroke="#1F1B16" strokeWidth="3"/>
          <rect x="0" y="8" width="180" height="28" rx="14" fill="#B87333" stroke="#1F1B16" strokeWidth="2"/>
          {/* electrones moving on inner copper */}
          {Array.from({length:5}).map((_,i)=>(
            <circle key={i} r="4" fill="#FFD60A" stroke="#1F1B16" strokeWidth="1.5">
              <animate attributeName="cx" from="10" to="170" dur="2.5s" repeatCount="indefinite" begin={`${-i*0.5}s`}/>
              <animate attributeName="cy" values="22" dur="2.5s" repeatCount="indefinite"/>
            </circle>
          ))}
          <text x="90" y="68" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="13" fill="#B87333">cobre (conductor)</text>
          <text x="230" y="68" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="13" fill="#06A77D">goma (aislante)</text>
          <line x1="180" y1="-2" x2="180" y2="46" stroke="#1F1B16" strokeWidth="2" strokeDasharray="3 3"/>
        </g>
        <text x="160" y="40" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="16" fill="#1F1B16">cable eléctrico por dentro</text>
      </svg>
    </Stage>
  );
}

// ---------- 9. Polarización ----------
function W_Polarizacion() {
  return (
    <Stage h="220px" bg="#FFE5E8">
      <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full">
        {/* globo cargado pegado a la pared */}
        <rect x="0" y="0" width="60" height="200" fill="#E8E0CE" stroke="#1F1B16" strokeWidth="2"/>
        <text x="30" y="20" textAnchor="middle" fontFamily="Fredoka" fontSize="11" fill="#1F1B16">pared</text>
        {/* (+) en la pared cerca del globo, (−) lejos */}
        <text x="48" y="80" fontFamily="Fredoka" fontWeight="700" fontSize="14" fill="#E63946">+</text>
        <text x="48" y="110" fontFamily="Fredoka" fontWeight="700" fontSize="14" fill="#E63946">+</text>
        <text x="48" y="140" fontFamily="Fredoka" fontWeight="700" fontSize="14" fill="#E63946">+</text>
        <text x="14" y="80" fontFamily="Fredoka" fontWeight="700" fontSize="14" fill="#0077B6">−</text>
        <text x="14" y="110" fontFamily="Fredoka" fontWeight="700" fontSize="14" fill="#0077B6">−</text>
        <text x="14" y="140" fontFamily="Fredoka" fontWeight="700" fontSize="14" fill="#0077B6">−</text>
        {/* globo */}
        <g transform="translate(120 100)">
          <ellipse cx="0" cy="0" rx="36" ry="44" fill="#E63946" stroke="#1F1B16" strokeWidth="3"/>
          <ellipse cx="-12" cy="-15" rx="8" ry="11" fill="#fff" opacity=".4"/>
          <text x="0" y="-4" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="14" fill="#fff">− − −</text>
          <text x="0" y="14" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="14" fill="#fff">− −</text>
        </g>
        <text x="200" y="60" fontFamily="Fredoka" fontWeight="600" fontSize="12" fill="#1F1B16">El globo (−) atrae los (+)</text>
        <text x="200" y="78" fontFamily="Fredoka" fontWeight="600" fontSize="12" fill="#1F1B16">cercanos de la pared</text>
        <text x="200" y="96" fontFamily="Fredoka" fontWeight="600" fontSize="12" fill="#1F1B16">y empuja los (−).</text>
        <text x="200" y="124" fontFamily="Fredoka" fontWeight="700" fontSize="13" fill="#06A77D">→ se queda pegado</text>
        <line x1="170" y1="100" x2="200" y2="100" stroke="#06A77D" strokeWidth="2" markerEnd="url(#ar2)"/>
      </svg>
    </Stage>
  );
}

// ---------- 10. Neutros sí participan ----------
function W_Neutros() {
  return (
    <Stage h="200px" bg="#FFF8C9">
      <svg viewBox="0 0 320 180" className="absolute inset-0 w-full h-full">
        <rect x="40" y="30" width="240" height="120" rx="12" fill="#fff" stroke="#1F1B16" strokeWidth="3"/>
        <text x="160" y="22" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="14" fill="#1F1B16">objeto NEUTRO (pero con cargas dentro)</text>
        {[
          [70,55,'+'],[110,75,'−'],[150,55,'+'],[190,80,'−'],[230,55,'+'],[260,80,'−'],
          [70,110,'−'],[110,130,'+'],[150,110,'−'],[190,130,'+'],[230,110,'−'],[260,130,'+'],
        ].map(([x,y,s],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="11" fill={s==='+'?'#E63946':'#0077B6'} stroke="#1F1B16" strokeWidth="2"/>
            <text x={x} y={y+4} textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="14" fill="#fff">{s}</text>
          </g>
        ))}
        <text x="160" y="170" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="13" fill="#06A77D">6 protones (+) = 6 electrones (−) → carga total = 0</text>
      </svg>
    </Stage>
  );
}

// ---------- 11. Pila ----------
function W_Pila() {
  return (
    <Stage h="220px" bg="#FFF6E0">
      <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full">
        {/* pila grande */}
        <g transform="translate(60 30)">
          <rect x="0" y="0" width="80" height="140" rx="10" fill="#FFD60A" stroke="#1F1B16" strokeWidth="3"/>
          <rect x="26" y="-10" width="28" height="12" rx="3" fill="#1F1B16"/>
          <text x="40" y="30" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="22" fill="#1F1B16">+</text>
          <text x="40" y="130" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="22" fill="#1F1B16">−</text>
          <line x1="10" y1="70" x2="70" y2="70" stroke="#1F1B16" strokeWidth="1.5" strokeDasharray="2 3"/>
          <text x="40" y="84" textAnchor="middle" fontFamily="Fredoka" fontWeight="600" fontSize="10" fill="#1F1B16">reacción química</text>
        </g>
        {/* flecha transformación */}
        <text x="190" y="55" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="13" fill="#7209B7">energía</text>
        <text x="190" y="72" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="13" fill="#7209B7">QUÍMICA</text>
        <path d="M 160 100 L 220 100" stroke="#7209B7" strokeWidth="3" markerEnd="url(#ar2)"/>
        <text x="190" y="130" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="13" fill="#E63946">energía</text>
        <text x="190" y="147" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="13" fill="#E63946">ELÉCTRICA</text>
        {/* ampolleta */}
        <g transform="translate(270 100)">
          <circle r="26" fill="#FFD60A" opacity=".6"/>
          <circle r="18" fill="#FFE680" stroke="#1F1B16" strokeWidth="3"/>
          <rect x="-8" y="14" width="16" height="7" fill="#1F1B16"/>
        </g>
      </svg>
    </Stage>
  );
}

// ---------- 12. Batería recargable ----------
function W_Bateria() {
  const [carga, setCarga] = React.useState(60);
  React.useEffect(() => {
    const id = setInterval(() => setCarga(c => (c >= 100 ? 30 : c + 4)), 240);
    return () => clearInterval(id);
  }, []);
  return (
    <Stage h="200px" bg="#E8F4FB">
      <svg viewBox="0 0 320 180" className="absolute inset-0 w-full h-full">
        {/* batería horizontal */}
        <g transform="translate(50 60)">
          <rect x="0" y="0" width="200" height="60" rx="8" fill="#fff" stroke="#1F1B16" strokeWidth="3"/>
          <rect x="200" y="18" width="14" height="24" rx="3" fill="#1F1B16"/>
          <rect x="6" y="6" width={(196*carga/100)} height="48" rx="4"
            fill={carga > 60 ? '#06A77D' : carga > 30 ? '#FFD60A' : '#E63946'}
            style={{ transition:'all .25s' }}/>
          <text x="100" y="36" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="20" fill="#1F1B16">{Math.round(carga)}%</text>
        </g>
        {/* enchufe */}
        <g transform="translate(280 75)">
          <rect x="-8" y="0" width="20" height="30" rx="4" fill="#fff" stroke="#1F1B16" strokeWidth="2"/>
          <circle cx="-2" cy="10" r="2" fill="#1F1B16"/>
          <circle cx="6" cy="10" r="2" fill="#1F1B16"/>
        </g>
        <text x="160" y="40" textAnchor="middle" fontFamily="Fredoka" fontWeight="600" fontSize="12" fill="#1F1B16">la reacción química se invierte al cargar</text>
        <text x="160" y="160" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="13" fill="#0077B6">⇄ carga / descarga</text>
      </svg>
    </Stage>
  );
}

// ---------- 13. Sobrecarga ----------
function W_Sobrecarga() {
  return (
    <Stage h="200px" bg="#FFE5E8">
      <svg viewBox="0 0 320 180" className="absolute inset-0 w-full h-full">
        {/* enchufe pared */}
        <rect x="20" y="60" width="60" height="60" rx="8" fill="#fff" stroke="#1F1B16" strokeWidth="3"/>
        <circle cx="42" cy="90" r="4" fill="#1F1B16"/>
        <circle cx="58" cy="90" r="4" fill="#1F1B16"/>
        {/* zapatilla */}
        <rect x="100" y="70" width="140" height="40" rx="6" fill="#FFD60A" stroke="#1F1B16" strokeWidth="3"/>
        {/* cable enchufe a zapatilla */}
        <path d="M 80 90 Q 90 90 100 90" fill="none" stroke="#1F1B16" strokeWidth="3"/>
        {/* multiples enchufes en zapatilla */}
        {[0,1,2,3].map(i=>(
          <g key={i} transform={`translate(${112+i*32} 80)`}>
            <rect x="0" y="0" width="20" height="20" rx="3" fill="#fff" stroke="#1F1B16" strokeWidth="2"/>
            <circle cx="6" cy="10" r="2" fill="#1F1B16"/>
            <circle cx="14" cy="10" r="2" fill="#1F1B16"/>
          </g>
        ))}
        {/* aparatos con cables */}
        <text x="120" y="50" fontFamily="Fredoka" fontSize="16">🍳</text>
        <text x="152" y="50" fontFamily="Fredoka" fontSize="16">📺</text>
        <text x="184" y="50" fontFamily="Fredoka" fontSize="16">💻</text>
        <text x="216" y="50" fontFamily="Fredoka" fontSize="16">🍞</text>
        {/* humo / chispa */}
        <text x="170" y="150" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="14" fill="#E63946">⚠ SOBRECARGA</text>
        <text x="260" y="80" fontFamily="Fredoka" fontWeight="700" fontSize="22" fill="#F77F00">🔥</text>
      </svg>
    </Stage>
  );
}

// ---------- 14. Manos mojadas peligrosas ----------
function W_Seguridad() {
  return (
    <Stage h="220px" bg="#E8F4FB">
      <svg viewBox="0 0 320 220" className="absolute inset-0 w-full h-full">
        {/* enchufe en la pared */}
        <rect x="220" y="80" width="70" height="80" rx="10" fill="#fff" stroke="#1F1B16" strokeWidth="3"/>
        <circle cx="240" cy="115" r="5" fill="#1F1B16"/>
        <circle cx="270" cy="115" r="5" fill="#1F1B16"/>
        <rect x="248" y="140" width="14" height="6" rx="1" fill="#1F1B16"/>
        <text x="255" y="172" textAnchor="middle" fontFamily="Fredoka" fontWeight="600" fontSize="10" fill="#1F1B16">enchufe</text>

        {/* gotas cayendo encima de la mano */}
        <g fill="#0077B6">
          <path d="M 60 30 Q 56 38 60 42 Q 64 38 60 30 Z" opacity=".8"/>
          <path d="M 95 18 Q 91 26 95 30 Q 99 26 95 18 Z" opacity=".8"/>
          <path d="M 130 32 Q 126 40 130 44 Q 134 40 130 32 Z" opacity=".8"/>
        </g>
        <text x="95" y="14" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="11" fill="#0077B6">💧 agua</text>

        {/* mano mojada con gotitas encima */}
        <g transform="translate(50 95)">
          {/* brazo + mano simple */}
          <path d="M 0 30 L 0 10 Q 0 0 12 0 L 110 0 Q 118 0 122 8 L 138 28 Q 142 36 134 38 L 12 38 Q 0 38 0 30 Z"
                fill="#FFD8B4" stroke="#1F1B16" strokeWidth="2.5"/>
          {/* gotitas brillando en la piel */}
          <circle cx="30" cy="12" r="3" fill="#7CC4E8"/>
          <circle cx="60" cy="20" r="2.5" fill="#7CC4E8"/>
          <circle cx="90" cy="14" r="3" fill="#7CC4E8"/>
          <circle cx="115" cy="22" r="2.5" fill="#7CC4E8"/>
          {/* dedo apuntando al enchufe */}
          <text x="70" y="60" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="11" fill="#0077B6">mano MOJADA</text>
        </g>

        {/* chispa entre mano y enchufe */}
        <text x="200" y="135" fontFamily="Fredoka" fontWeight="700" fontSize="38" fill="#FFD60A">⚡</text>

        {/* gran símbolo de PROHIBIDO encima de toda la escena */}
        <g transform="translate(200 100)">
          <circle r="58" fill="none" stroke="#E63946" strokeWidth="6" opacity=".55"/>
          <line x1="-41" y1="-41" x2="41" y2="41" stroke="#E63946" strokeWidth="6" opacity=".55" strokeLinecap="round"/>
        </g>

        {/* texto explicativo abajo */}
        <text x="160" y="205" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="13" fill="#E63946">⚠ NO toques enchufes con las manos mojadas</text>
      </svg>
    </Stage>
  );
}

// ---------- 15. Protecciones ----------
function W_Protecciones() {
  return (
    <Stage h="220px" bg="#F3ECFB">
      <div className="absolute inset-0 grid grid-cols-3 gap-2 p-3">
        {[
          ['Disyuntor','#E63946', (
            <svg viewBox="0 0 80 60" className="w-full h-16">
              <rect x="6" y="8" width="68" height="46" rx="6" fill="#fff" stroke="#1F1B16" strokeWidth="2"/>
              <rect x="34" y="14" width="12" height="22" rx="2" fill="#E63946" stroke="#1F1B16" strokeWidth="1.5"/>
              <text x="40" y="50" textAnchor="middle" fontFamily="Fredoka" fontSize="9" fill="#1F1B16">ON/OFF</text>
            </svg>
          ), 'salta ante falla'],
          ['Fusible','#F77F00', (
            <svg viewBox="0 0 80 60" className="w-full h-16">
              <rect x="14" y="22" width="52" height="18" rx="3" fill="#fff" stroke="#1F1B16" strokeWidth="2"/>
              <rect x="4" y="26" width="10" height="10" fill="#1F1B16"/>
              <rect x="66" y="26" width="10" height="10" fill="#1F1B16"/>
              <line x1="22" y1="31" x2="58" y2="31" stroke="#F77F00" strokeWidth="2"/>
            </svg>
          ), 'se funde'],
          ['Toma a tierra','#06A77D', (
            <svg viewBox="0 0 80 60" className="w-full h-16">
              <line x1="40" y1="6" x2="40" y2="32" stroke="#1F1B16" strokeWidth="3"/>
              <line x1="22" y1="32" x2="58" y2="32" stroke="#06A77D" strokeWidth="4"/>
              <line x1="28" y1="40" x2="52" y2="40" stroke="#06A77D" strokeWidth="3"/>
              <line x1="34" y1="48" x2="46" y2="48" stroke="#06A77D" strokeWidth="3"/>
            </svg>
          ), 'desvía al suelo'],
        ].map(([n,c,svg,d],i)=>(
          <div key={i} className="popcard-sm bg-white p-2 flex flex-col items-center text-center">
            <div className="text-xs font-display font-bold" style={{ color:c }}>{n}</div>
            {svg}
            <div className="text-[10px] text-ink/65 mt-1">{d}</div>
          </div>
        ))}
      </div>
    </Stage>
  );
}

// ---------- dispatcher ----------
function SectionWidget({ id }) {
  switch (id) {
    case 1:  return <W_Atomo/>;
    case 2:  return <W_Carga/>;
    case 3:  return <W_Interaccion/>;
    case 4:  return <W_Frotamiento/>;
    case 5:  return <W_TresFormas/>;
    case 6:  return <W_Induccion/>;
    case 7:  return <W_Circuito/>;
    case 8:  return <W_ConductorAislante/>;
    case 9:  return <W_Polarizacion/>;
    case 10: return <W_Neutros/>;
    case 11: return <W_Pila/>;
    case 12: return <W_Bateria/>;
    case 13: return <W_Sobrecarga/>;
    case 14: return <W_Seguridad/>;
    case 15: return <W_Protecciones/>;
    default: return null;
  }
}

Object.assign(window, { SectionWidget });
