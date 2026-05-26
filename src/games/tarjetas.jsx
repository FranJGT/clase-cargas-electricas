// Juego 1: Tarjetas concepto-definición
// Mecánica: 6 conceptos + 6 definiciones mezcladas. Click concepto → click definición.
// Aleatorio entre rondas. Feedback explicativo. Rondas configurables.

function GameTarjetas({ onExit }) {
  const [rondas, setRondas] = React.useState(0); // 0 = setup
  const [config, setConfig] = React.useState({ total: 3, n: 6 });
  const [ronda, setRonda] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const [defs, setDefs] = React.useState([]);
  const [matches, setMatches] = React.useState({}); // concept idx -> def idx
  const [wrongs, setWrongs] = React.useState({}); // concept idx -> def idx (transient red)
  const [selConcept, setSelConcept] = React.useState(null);
  const [score, setScore] = React.useState({ correct: 0, errors: 0 });
  const [fb, setFb] = React.useState(null);
  const [done, setDone] = React.useState(false);
  const conf = useConfetti();

  function nuevaRonda() {
    const picked = pickN(PARES, config.n).map((p,i) => ({ ...{ id:i, c:p[0], d:p[1] } }));
    setItems(picked);
    setDefs(shuffle(picked.map(p => p.id)));
    setMatches({}); setWrongs({}); setSelConcept(null);
  }

  function start(total) {
    setConfig(c => ({ ...c, total }));
    setRondas(total);
    setRonda(1);
    setScore({ correct: 0, errors: 0 });
    setDone(false);
    setTimeout(nuevaRonda, 0);
  }

  function pickDef(defConceptId) {
    if (selConcept === null) return;
    if (Object.values(matches).includes(defConceptId)) return; // already matched
    const conceptId = items[selConcept].id;
    if (conceptId === defConceptId) {
      setMatches(m => ({ ...m, [selConcept]: defConceptId }));
      setScore(s => ({ ...s, correct: s.correct + 1 }));
      setFb({ ok:true, title:'¡Correcto! ✓', text: items[selConcept].c + ' — ' + items[selConcept].d });
    } else {
      setWrongs(w => ({ ...w, [selConcept]: defConceptId }));
      setScore(s => ({ ...s, errors: s.errors + 1 }));
      const wrongItem = items.find(it => it.id === defConceptId);
      setFb({ ok:false, title:'No es esa', text:`Esa definición pertenece a "${wrongItem.c}". La correcta para "${items[selConcept].c}" es: ${items[selConcept].d}` });
      setTimeout(() => setWrongs(w => { const nw={...w}; delete nw[selConcept]; return nw; }), 800);
    }
    setSelConcept(null);
  }

  // round complete?
  React.useEffect(() => {
    if (rondas > 0 && Object.keys(matches).length === items.length && items.length > 0) {
      setTimeout(() => {
        if (ronda < rondas) { setRonda(r => r+1); nuevaRonda(); }
        else { setDone(true); conf.fire(); }
      }, 900);
    }
  }, [matches]);

  // save best on done
  React.useEffect(() => {
    if (!done) return;
    updateStore(s => {
      s.juegos = s.juegos || {};
      s.juegos.tarjetas = s.juegos.tarjetas || { jugadas: 0, mejorPct: 0 };
      const totalQ = rondas * config.n;
      const pct = Math.round((score.correct / totalQ) * 100);
      s.juegos.tarjetas.jugadas++;
      s.juegos.tarjetas.mejorPct = Math.max(s.juegos.tarjetas.mejorPct, pct);
      s.juegos.tarjetas.ultPct = pct;
      return s;
    });
  }, [done]);

  // ---------- Renders ----------
  if (rondas === 0) {
    return (
      <GameShell title="Tarjetas concepto–definición" color="mora" onExit={onExit}>
        <p className="text-ink/80 max-w-xl">Une cada <strong>concepto</strong> con su <strong>definición</strong>. Haz clic en un concepto y luego en la definición que crees correcta.</p>
        <div className="mt-5">
          <div className="font-display font-semibold mb-2">¿Cuántas rondas?</div>
          <div className="flex flex-wrap gap-2">
            {[3, 5, 10].map(n => (
              <Btn key={n} tone="mora" onClick={() => start(n)}>{n} rondas</Btn>
            ))}
          </div>
          <div className="mt-4 text-sm text-ink/60">Cada ronda son 6 pares aleatorios — nunca se repite la combinación.</div>
        </div>
      </GameShell>
    );
  }

  if (done) {
    const total = rondas * config.n;
    const pct = Math.round((score.correct / total)*100);
    return (
      <GameShell title="Tarjetas concepto–definición" color="mora" onExit={onExit}>
        {conf.node}
        <FinalBoard pct={pct} correct={score.correct} total={total} errors={score.errors}
          onReplay={() => { setRondas(0); setRonda(0); }}
          extra={pct >= 80 ? '🔥 ¡Dominas los conceptos!' : pct >= 60 ? '👍 Vas bien — repasa la materia para los que fallaste.' : '📖 Vuelve a /materia y repasa los conceptos básicos.'}
        />
      </GameShell>
    );
  }

  return (
    <GameShell title="Tarjetas concepto–definición" color="mora" onExit={onExit}
      meta={<>Ronda <strong>{ronda}</strong>/{rondas} · ✓ {score.correct} · ✗ {score.errors}</>}>
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h4 className="font-display font-bold text-azul mb-2">Conceptos</h4>
          <ul className="space-y-2">
            {items.map((it, idx) => {
              const matched = matches[idx] !== undefined;
              const wrong = wrongs[idx] !== undefined;
              const sel = selConcept === idx;
              return (
                <li key={idx}>
                  <button disabled={matched} onClick={() => setSelConcept(idx)}
                    className={cx('w-full text-left popbtn px-4 py-3 font-display font-semibold transition-all',
                      matched ? 'bg-menta text-white' :
                      wrong   ? 'bg-coral text-white animate-pulse' :
                      sel     ? 'bg-mora text-white' : 'bg-white')}>
                    {matched && '✓ '}{it.c}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-coral mb-2">Definiciones</h4>
          <ul className="space-y-2">
            {defs.map((defId) => {
              const item = items.find(x => x.id === defId);
              const matched = Object.values(matches).includes(defId);
              return (
                <li key={defId}>
                  <button disabled={matched || selConcept === null} onClick={() => pickDef(defId)}
                    className={cx('w-full text-left popbtn px-4 py-3 text-[15px] transition-all',
                      matched ? 'bg-menta text-white' :
                      selConcept !== null ? 'bg-white hover:bg-amari/40' : 'bg-white/60 text-ink/60')}>
                    {item.d}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {fb && <Feedback ok={fb.ok} title={fb.title} text={fb.text} onClose={()=>setFb(null)} autoClose={fb.ok ? 1300 : 3600}/>}
    </GameShell>
  );
}

// ---- Shared game shell + final board ----
function GameShell({ title, color='mora', meta, onExit, children }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <a href="#/juegos" onClick={onExit} className="popbtn bg-white px-3 py-1.5 text-sm font-display font-semibold">← Juegos</a>
        <h2 className="font-display font-bold text-2xl sm:text-3xl">
          <span className="inline-block px-2 py-0.5 mr-2 text-sm align-middle rounded-md border-2 border-ink text-white font-mono"
                style={{ background: COLORS[color] }}>juego</span>
          {title}
        </h2>
        {meta && <div className="ml-auto popcard-sm bg-white px-3 py-1.5 text-sm font-display">{meta}</div>}
      </div>
      <div className="popcard p-5 sm:p-7 bg-cream">{children}</div>
    </div>
  );
}

function FinalBoard({ pct, correct, total, errors, onReplay, extra, tiempo }) {
  return (
    <div className="text-center max-w-xl mx-auto py-6">
      <div className="mx-auto w-32 h-32 rounded-full border-[6px] border-ink flex items-center justify-center font-display font-bold text-4xl shadow-pop"
           style={{ background: pct>=80?'#06A77D':pct>=60?'#FFD60A':'#E63946', color: pct>=60 && pct<80?'#1F1B16':'#fff' }}>
        {pct}%
      </div>
      <div className="mt-4 font-display font-bold text-2xl">Ronda terminada</div>
      <div className="mt-1 text-ink/75">Aciertos: <strong className="text-menta">{correct}</strong> · Errores: <strong className="text-coral">{errors}</strong> {tiempo && <>· Tiempo: <strong>{tiempo}</strong></>}</div>
      {extra && <p className="mt-3 popcard-sm bg-white p-3 text-[15px]">{extra}</p>}
      <div className="mt-5 flex gap-2 justify-center flex-wrap">
        <Btn tone="mora" onClick={onReplay}>↻ Jugar otra vez</Btn>
        <Btn as="a" href="#/juegos" tone="white">Volver a juegos</Btn>
      </div>
    </div>
  );
}

Object.assign(window, { GameTarjetas, GameShell, FinalBoard });
