// Quiz final con feedback explicativo

function PageQuiz() {
  const [qs, setQs] = React.useState([]);
  const [idx, setIdx] = React.useState(0);
  const [picked, setPicked] = React.useState(null);
  const [answered, setAnswered] = React.useState(false);
  const [aciertos, setAciertos] = React.useState([]); // boolean[]
  const [done, setDone] = React.useState(false);
  const [started, setStarted] = React.useState(false);
  const conf = useConfetti();

  function start() {
    const shuffled = shuffle(QUIZ).map(q => {
      const opciones = q.opts.map((t,i) => ({ t, i }));
      const mixed = shuffle(opciones);
      return { ...q, mixedOpts: mixed, okMixedIdx: mixed.findIndex(o => o.i === q.ok) };
    });
    setQs(shuffled); setIdx(0); setPicked(null); setAnswered(false);
    setAciertos([]); setDone(false); setStarted(true);
  }

  function pick(i) {
    if (answered) return;
    setPicked(i); setAnswered(true);
    setAciertos(a => [...a, i === qs[idx].okMixedIdx]);
  }
  function next() {
    if (idx + 1 >= qs.length) { setDone(true); }
    else { setIdx(i => i+1); setPicked(null); setAnswered(false); }
  }

  React.useEffect(() => {
    if (!done) return;
    const score = aciertos.filter(Boolean).length;
    if (score >= 12) conf.fire();
    updateStore(s => {
      s.quiz = s.quiz || { intentos: 0, mejor: 0 };
      s.quiz.intentos++;
      s.quiz.mejor = Math.max(s.quiz.mejor, score);
      s.quiz.ult = score;
      s.quiz.ultPct = Math.round((score/qs.length)*100);
      return s;
    });
  }, [done]);

  if (!started) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="popcard p-6 sm:p-10 text-center bg-amari relative">
          <span className="tape"></span>
          <div className="font-display font-bold text-4xl">Quiz Final</div>
          <p className="mt-3 text-ink/85 max-w-lg mx-auto">15 preguntas de opción múltiple, una por cada sección. Te explicamos cada respuesta para que aprendas, no solo aciertes.</p>
          <ul className="mt-5 grid sm:grid-cols-3 gap-2 text-sm">
            <li className="popcard-sm bg-white p-3">📚 15 preguntas</li>
            <li className="popcard-sm bg-white p-3">💡 Explicación tras cada una</li>
            <li className="popcard-sm bg-white p-3">📊 Reporte por sección</li>
          </ul>
          <div className="mt-6"><Btn tone="ink" onClick={start}>Comenzar quiz</Btn></div>
        </div>
      </div>
    );
  }

  if (done) {
    const score = aciertos.filter(Boolean).length;
    const total = qs.length;
    const pct = Math.round((score/total)*100);

    // por sección - here we know which sec each q has, useaciertos to find failed
    const failedSecs = qs.map((q,i) => ({ ...q, ok: aciertos[i] })).filter(x => !x.ok);

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {conf.node}
        <div className="popcard p-6 sm:p-8 text-center">
          <div className="font-display font-bold text-2xl">Resultado del quiz</div>
          <div className="mx-auto mt-4 w-36 h-36 rounded-full border-[6px] border-ink flex items-center justify-center font-display font-bold text-4xl shadow-pop"
            style={{ background: pct>=80?'#06A77D':pct>=60?'#FFD60A':'#E63946', color: pct>=60 && pct<80?'#1F1B16':'#fff' }}>
            {score}<span className="text-xl">/{total}</span>
          </div>
          <div className="mt-3 text-ink/75">Puntaje: <strong>{pct}%</strong></div>

          {/* sec chart */}
          <div className="mt-6 text-left">
            <div className="font-display font-bold mb-2">Por sección</div>
            <div className="grid grid-cols-5 gap-1.5">
              {qs.map((q,i) => (
                <a key={i} href={`#/materia#s${q.sec}`}
                   className={cx('popcard-sm p-2 text-center text-xs font-display font-bold',
                     aciertos[i] ? 'bg-menta text-white' : 'bg-coral text-white')}
                   title={`Sección ${q.sec}`}>
                  §{q.sec}
                </a>
              ))}
            </div>
          </div>

          {failedSecs.length > 0 && (
            <div className="mt-6 text-left">
              <div className="font-display font-bold mb-2">Secciones para reforzar</div>
              <div className="flex flex-wrap gap-1.5">
                {[...new Set(failedSecs.map(f=>f.sec))].map(sec => {
                  const s = SECCIONES.find(x => x.id === sec);
                  return (
                    <a key={sec} href={`#/materia`} onClick={(e)=>{ setTimeout(()=>{ const el = document.getElementById('s'+sec); el?.scrollIntoView({behavior:'instant'}); }, 100); }}
                       className="popbtn bg-white px-3 py-1.5 text-sm">
                      §{sec} · {s.titulo}
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-2 justify-center flex-wrap">
            <Btn tone="ink" onClick={start}>↻ Repetir quiz</Btn>
            <Btn as="a" href="#/materia" tone="white">Volver a estudiar</Btn>
            <Btn as="a" href="#/progreso" tone="amari">Ver progreso</Btn>
          </div>
        </div>
      </div>
    );
  }

  const q = qs[idx];
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <div className="popcard p-5 sm:p-7">
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <span className="popcard-sm bg-amari px-3 py-1 text-sm font-display font-semibold">Pregunta {idx+1} / {qs.length}</span>
          <span className="text-xs text-ink/60 font-mono">§{q.sec} · {SECCIONES.find(s=>s.id===q.sec).tag}</span>
          <div className="ml-auto h-2 w-32 sm:w-48 rounded-full border-2 border-ink overflow-hidden bg-white">
            <div className="h-full bg-mora" style={{ width: `${((idx+1)/qs.length)*100}%` }}/>
          </div>
        </div>

        <h3 className="font-display font-bold text-xl sm:text-2xl leading-snug">{q.q}</h3>

        <div className="mt-5 space-y-2">
          {q.mixedOpts.map((opt, i) => {
            const isCorrect = i === q.okMixedIdx;
            const isPicked = picked === i;
            let cls = 'bg-white hover:bg-amari/40';
            if (answered) {
              if (isCorrect) cls = 'bg-menta text-white';
              else if (isPicked) cls = 'bg-coral text-white';
              else cls = 'bg-white/60 opacity-60';
            }
            return (
              <button key={i} disabled={answered} onClick={() => pick(i)}
                className={cx('w-full text-left popbtn px-4 py-3 text-[15px] flex items-center gap-3', cls)}>
                <span className={cx('inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-ink font-display font-bold shrink-0',
                  answered && isCorrect ? 'bg-white text-menta' :
                  answered && isPicked ? 'bg-white text-coral' : 'bg-cream')}>
                  {String.fromCharCode(65+i)}
                </span>
                <span>{opt.t}</span>
                {answered && isCorrect && <span className="ml-auto">✓</span>}
                {answered && isPicked && !isCorrect && <span className="ml-auto">✗</span>}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={cx('popcard-sm mt-5 p-4', aciertos[idx] ? 'bg-menta/15 border-menta' : 'bg-coral/10 border-coral')}>
            <div className="font-display font-bold flex items-center gap-2">
              <span className={cx('inline-flex w-7 h-7 rounded-full border-2 border-ink items-center justify-center text-white', aciertos[idx]?'bg-menta':'bg-coral')}>
                {aciertos[idx]?'✓':'✗'}
              </span>
              {aciertos[idx] ? '¡Correcto!' : 'No era esa'}
            </div>
            <p className="mt-2 text-[15px] leading-snug">{q.ex}</p>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <Btn tone="ink" onClick={next} disabled={!answered}
            className={cx(!answered && 'opacity-50 cursor-not-allowed')}>
            {idx+1 >= qs.length ? 'Ver resultado →' : 'Siguiente →'}
          </Btn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PageQuiz });
