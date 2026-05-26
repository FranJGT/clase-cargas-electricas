// Juego 3: Verdadero / Falso contra reloj
function GameVF({ onExit }) {
  const ROUND_N = 10;
  const TIME = 10;
  const [started, setStarted] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [qs, setQs] = React.useState([]);
  const [idx, setIdx] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [correctos, setCorrectos] = React.useState(0);
  const [t, setT] = React.useState(TIME);
  const [start_, setStart_] = React.useState(0);
  const [fb, setFb] = React.useState(null);
  const [fallos, setFallos] = React.useState([]);
  const conf = useConfetti();

  function start() {
    const picked = pickN(VF, ROUND_N).map(([q,v,e]) => ({ q, v, e }));
    setQs(picked);
    setIdx(0); setScore(0); setCorrectos(0); setT(TIME);
    setStart_(Date.now()); setFallos([]); setFb(null);
    setStarted(true); setDone(false);
  }

  // ticker
  React.useEffect(() => {
    if (!started || done || fb) return;
    if (t <= 0) { answer(null); return; }
    const id = setTimeout(() => setT(x => x - 0.1), 100);
    return () => clearTimeout(id);
  }, [t, started, done, fb]);

  function answer(val) {
    const q = qs[idx];
    const elapsed = (Date.now() - start_) / 1000;
    const correct = val === q.v;
    let add = 0;
    if (correct) { add = elapsed < 3 ? 10 : 5; setCorrectos(c => c+1); }
    else { setFallos(f => [...f, q]); }
    setScore(s => s + add);
    setFb({ ok: correct, title: correct ? `¡Bien! +${add}` : (val === null ? 'Se acabó el tiempo' : 'Incorrecto'), text: q.e });
    setTimeout(() => {
      if (idx + 1 >= qs.length) { setDone(true); setFb(null); if (correctos+1 >= 8 && correct) conf.fire(); }
      else { setIdx(i => i+1); setT(TIME); setStart_(Date.now()); setFb(null); }
    }, 2000);
  }

  React.useEffect(() => {
    if (!done) return;
    updateStore(s => {
      s.juegos = s.juegos || {};
      s.juegos.vf = s.juegos.vf || { jugadas: 0, mejorScore: 0 };
      s.juegos.vf.jugadas++;
      s.juegos.vf.mejorScore = Math.max(s.juegos.vf.mejorScore, score);
      s.juegos.vf.ultScore = score;
      return s;
    });
  }, [done]);

  if (!started) {
    return (
      <GameShell title="Verdadero o Falso" color="coral" onExit={onExit}>
        <p className="text-ink/80 max-w-xl">Aparece una afirmación y tienes <strong>10 segundos</strong> para decir si es <strong>verdadera (V)</strong> o <strong>falsa (F)</strong>.</p>
        <ul className="mt-3 text-sm text-ink/70 space-y-1">
          <li>+10 puntos si aciertas en menos de 3 segundos</li>
          <li>+5 puntos si aciertas después</li>
          <li>0 puntos si fallas o se acaba el tiempo</li>
        </ul>
        <div className="mt-5"><Btn tone="coral" onClick={start}>Comenzar ronda</Btn></div>
      </GameShell>
    );
  }

  if (done) {
    return (
      <GameShell title="Verdadero o Falso" color="coral" onExit={onExit}>
        <FinalBoard pct={Math.round((correctos/ROUND_N)*100)} correct={correctos} total={ROUND_N}
          errors={ROUND_N - correctos}
          onReplay={start}
          extra={<>Puntaje: <strong>{score}</strong> puntos {fallos.length>0 && '· Revisa las preguntas que fallaste abajo.'}</>}
        />
        {fallos.length > 0 && (
          <div className="mt-6">
            <h4 className="font-display font-bold mb-2">Lo que fallaste</h4>
            <ul className="space-y-2">
              {fallos.map((f, i) => (
                <li key={i} className="popcard-sm bg-white p-3">
                  <div className="font-display font-semibold">{f.q}</div>
                  <div className="text-xs uppercase tracking-wide text-coral font-bold mt-1">Respuesta correcta: {f.v ? 'VERDADERO' : 'FALSO'}</div>
                  <div className="text-sm text-ink/75 mt-1">{f.e}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </GameShell>
    );
  }

  const q = qs[idx];
  const pct = Math.max(0, t / TIME);
  return (
    <GameShell title="Verdadero o Falso" color="coral" onExit={onExit}
      meta={<>Pregunta <strong>{idx+1}</strong>/{ROUND_N} · {score} pts</>}>
      <div className="h-3 rounded-full border-2 border-ink overflow-hidden bg-white mb-6">
        <div className="h-full transition-[width] duration-100" style={{ width: `${pct*100}%`,
          background: pct > 0.5 ? '#06A77D' : pct > 0.25 ? '#F77F00' : '#E63946' }}/>
      </div>
      <div className="popcard-sm bg-white p-6 sm:p-8 min-h-[140px] flex items-center justify-center text-center">
        <div className="font-display font-semibold text-xl sm:text-2xl leading-snug max-w-2xl"><MdBold>{q.q}</MdBold></div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
        <button onClick={() => answer(true)} disabled={!!fb}
          className="popbtn bg-menta text-white py-5 sm:py-7 font-display font-bold text-2xl sm:text-3xl">V · Verdadero</button>
        <button onClick={() => answer(false)} disabled={!!fb}
          className="popbtn bg-coral text-white py-5 sm:py-7 font-display font-bold text-2xl sm:text-3xl">F · Falso</button>
      </div>
      {fb && <Feedback ok={fb.ok} title={fb.title} text={fb.text} onClose={()=>{}} autoClose={null}/>}
    </GameShell>
  );
}

Object.assign(window, { GameVF });
