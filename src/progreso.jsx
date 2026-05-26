// /progreso

function PageProgreso() {
  const s = useStore();
  const leidas = Object.values(s.leidas || {}).filter(Boolean).length;
  const juegos = s.juegos || {};
  const jugados = Object.keys(juegos).length;

  const stats = [
    ['Secciones leídas', `${leidas}/15`, '#06A77D'],
    ['Juegos jugados', `${jugados}/5`, '#7209B7'],
    ['Quiz · mejor puntaje', s.quiz ? `${s.quiz.mejor}/15` : '—', '#0077B6'],
    ['Quiz · último', s.quiz ? `${s.quiz.ult}/15` : '—', '#E63946'],
  ];

  function reset() {
    if (confirm('¿Borrar todo tu progreso? No se puede deshacer.')) {
      localStorage.removeItem('maite_cargas_v1');
      window.dispatchEvent(new CustomEvent('store-update'));
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-display font-bold text-3xl sm:text-4xl mb-1">Tu <span className="scribble">progreso</span></h1>
      <p className="text-ink/70 mb-6">Todo se guarda automáticamente en este navegador.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map(([k,v,c]) => (
          <div key={k} className="popcard p-4">
            <div className="text-xs uppercase tracking-wide text-ink/60">{k}</div>
            <div className="font-display font-bold text-3xl mt-1" style={{ color:c }}>{v}</div>
          </div>
        ))}
      </div>

      {/* materia map */}
      <div className="popcard p-5 mb-6">
        <h3 className="font-display font-bold text-xl mb-3">Materia</h3>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-15 gap-1.5">
          {SECCIONES.map(sec => {
            const ok = s.leidas?.[sec.id];
            return (
              <a key={sec.id} href={`#/materia`} onClick={()=>setTimeout(()=>document.getElementById('s'+sec.id)?.scrollIntoView({behavior:'instant'}),100)}
                 className={cx('popcard-sm aspect-square flex items-center justify-center font-display font-bold text-sm',
                   ok ? 'text-white' : 'bg-white')}
                 style={{ background: ok ? COLORS[sec.color] : '' }}
                 title={sec.titulo}>
                {sec.id}
              </a>
            );
          })}
        </div>
      </div>

      {/* juegos detalle */}
      <div className="popcard p-5 mb-6">
        <h3 className="font-display font-bold text-xl mb-3">Juegos</h3>
        <ul className="grid sm:grid-cols-2 gap-3">
          {[
            ['tarjetas','Tarjetas concepto–definición','🃏','#7209B7'],
            ['memorice','Memorice','🧠','#0077B6'],
            ['vf','Verdadero o Falso','⚡','#E63946'],
            ['clasificar','Clasificar','📦','#F77F00'],
            ['simulador','Simulador','🔬','#06A77D'],
          ].map(([k,n,em,c]) => {
            const g = juegos[k];
            return (
              <li key={k} className="popcard-sm bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl border-2 border-ink flex items-center justify-center text-xl" style={{ background:c, color:'#fff' }}>{em}</div>
                  <div>
                    <div className="font-display font-bold">{n}</div>
                    <div className="text-xs text-ink/60">{g ? `${g.jugadas||0} partidas` : 'Aún no jugado'}</div>
                  </div>
                  <a href={`#/juegos/${k}`} className="ml-auto text-sm font-display font-semibold underline">jugar →</a>
                </div>
                {g && k === 'tarjetas' && <div className="mt-2 text-xs">Mejor: <strong>{g.mejorPct}%</strong></div>}
                {g && k === 'vf' && <div className="mt-2 text-xs">Mejor puntaje: <strong>{g.mejorScore}</strong></div>}
                {g && k === 'memorice' && Object.keys(g.mejorIntentos||{}).length>0 && (
                  <div className="mt-2 text-xs flex gap-3 flex-wrap">
                    {Object.entries(g.mejorIntentos).map(([lvl,v]) => <span key={lvl}>{lvl}: <strong>{v} int · {g.mejorTiempo[lvl]}s</strong></span>)}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <button onClick={reset} className="text-sm text-ink/60 underline">Borrar todo mi progreso</button>
    </div>
  );
}

Object.assign(window, { PageProgreso });
