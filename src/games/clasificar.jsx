// Juego 4: Clasificar — Drag & Drop (con fallback de click para móviles/teclado)
function GameClasificar({ onExit }) {
  const [modo, setModo] = React.useState(null); // null | 'conductor' | 'carga' | ...
  const [items, setItems] = React.useState([]);  // items pending
  const [placed, setPlaced] = React.useState({}); // itemText -> box
  const [errors, setErrors] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [fb, setFb] = React.useState(null);
  const [dragging, setDragging] = React.useState(null);
  const [activeBox, setActiveBox] = React.useState(null);
  const [picked, setPicked] = React.useState(null); // tap-to-place
  const conf = useConfetti();

  const cfg = modo ? CLASIFICAR[modo] : null;

  function start(modeKey) {
    setModo(modeKey);
    const all = CLASIFICAR[modeKey].items;
    setItems(shuffle(all)); setPlaced({}); setErrors(0); setCorrect(0); setFb(null); setPicked(null);
  }

  function attemptPlace(item, box) {
    const [text, correctBox, explain] = item;
    if (box === correctBox) {
      setPlaced(p => ({ ...p, [text]: box }));
      setCorrect(c => c+1);
      setFb({ ok: true, title:'¡Bien clasificado!', text: explain });
    } else {
      setErrors(e => e+1);
      setFb({ ok: false, title:'Esa no va ahí', text: `"${text}" pertenece a "${correctBox}". ${explain}` });
    }
    setPicked(null); setDragging(null); setActiveBox(null);
  }

  const done = cfg && Object.keys(placed).length === items.length && items.length > 0;
  React.useEffect(() => {
    if (done) {
      conf.fire();
      updateStore(s => {
        s.juegos = s.juegos || {};
        s.juegos.clasificar = s.juegos.clasificar || { jugadas: 0, mejorErrores: {} };
        s.juegos.clasificar.jugadas++;
        const me = s.juegos.clasificar.mejorErrores[modo];
        s.juegos.clasificar.mejorErrores[modo] = me !== undefined ? Math.min(me, errors) : errors;
        return s;
      });
    }
  }, [done]);

  if (!modo) {
    return (
      <GameShell title="Clasificar" color="naranja" onExit={onExit}>
        <p className="text-ink/80 max-w-xl">Arrastra (o toca) cada tarjeta hacia la <strong>caja correcta</strong>. Feedback al instante con explicación.</p>
        <div className="mt-5 grid sm:grid-cols-2 gap-3">
          {Object.entries(CLASIFICAR).map(([k, v]) => (
            <button key={k} onClick={() => start(k)}
              className="popbtn bg-white p-4 text-left">
              <div className="font-display font-bold text-lg">{v.titulo}</div>
              <div className="text-sm text-ink/70 mt-1">{v.cajas.join(' · ')}</div>
              <div className="text-xs text-ink/50 mt-2">{v.items.length} tarjetas</div>
            </button>
          ))}
        </div>
      </GameShell>
    );
  }

  if (done) {
    const total = items.length;
    return (
      <GameShell title={`Clasificar — ${cfg.titulo}`} color="naranja" onExit={onExit}>
        <FinalBoard pct={Math.round((correct/(correct+errors))*100)} correct={correct} total={correct+errors}
          errors={errors} onReplay={() => start(modo)}
          extra={`Completaste con ${errors} error${errors===1?'':'es'}. ${errors===0?'¡Sin equivocarte!':''}`}
        />
        <div className="text-center mt-2"><a href="#" onClick={(e)=>{e.preventDefault();setModo(null);}} className="text-sm underline">Probar otra categoría</a></div>
      </GameShell>
    );
  }

  return (
    <GameShell title={`Clasificar — ${cfg.titulo}`} color="naranja" onExit={onExit}
      meta={<>{Object.keys(placed).length}/{items.length} · ✓ {correct} · ✗ {errors}</>}>

      {picked && (
        <div className="popcard-sm bg-amari px-4 py-2 mb-3 text-sm font-display font-semibold">
          Seleccionado: <strong>{picked[0]}</strong> — ahora toca una caja abajo.
          <button className="ml-2 underline" onClick={()=>setPicked(null)}>cancelar</button>
        </div>
      )}

      {/* Tarjetas pendientes */}
      <div className="popcard-sm bg-white p-3 sm:p-4 mb-5">
        <div className="text-xs uppercase tracking-wide text-ink/60 mb-2">Tarjetas por clasificar</div>
        <div className="flex flex-wrap gap-2">
          {items.filter(it => !placed[it[0]]).map((it, i) => {
            const isPicked = picked && picked[0] === it[0];
            return (
              <div key={i}
                draggable
                onDragStart={() => setDragging(it)}
                onDragEnd={() => setDragging(null)}
                onClick={() => setPicked(isPicked ? null : it)}
                className={cx('popbtn px-3 py-2 bg-cream cursor-grab active:cursor-grabbing text-[14px] sm:text-[15px] font-medium',
                  dragging === it && 'dragging',
                  isPicked && 'bg-amari ring-2 ring-ink')}>
                {it[0]}
              </div>
            );
          })}
          {items.filter(it => !placed[it[0]]).length === 0 && <div className="text-sm text-ink/60">¡Todas clasificadas!</div>}
        </div>
      </div>

      {/* Cajas */}
      <div className={cx('grid gap-3 sm:gap-4',
        cfg.cajas.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3')}>
        {cfg.cajas.map((box, i) => {
          const inBox = items.filter(it => placed[it[0]] === box);
          const color = cfg.cajas.length === 2
            ? (box.match(/Conductor|Seguro|Positiva/) ? '#06A77D' : '#E63946')
            : ['#E63946','#0077B6','#7209B7'][i];
          return (
            <div key={box}
              onDragOver={(e) => { e.preventDefault(); setActiveBox(box); }}
              onDragLeave={() => setActiveBox(null)}
              onDrop={(e) => { e.preventDefault(); if (dragging) attemptPlace(dragging, box); }}
              onClick={() => { if (picked) attemptPlace(picked, box); }}
              className={cx('popcard-sm p-4 min-h-[150px] border-2 transition-colors',
                activeBox === box && 'dropzone-active',
                picked ? 'cursor-pointer hover:bg-amari/30' : '')}
              style={{ background: '#fff' }}>
              <div className="font-display font-bold text-lg flex items-center gap-2" style={{ color }}>
                <span className="w-3 h-3 rounded-full" style={{ background: color }}/>
                {box}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {inBox.map((it, j) => (
                  <span key={j} className="px-2.5 py-1 rounded-full border-2 border-ink text-sm font-medium bg-menta text-white">
                    ✓ {it[0]}
                  </span>
                ))}
                {inBox.length === 0 && <span className="text-xs text-ink/50">Suelta tarjetas aquí</span>}
              </div>
            </div>
          );
        })}
      </div>

      {fb && <Feedback ok={fb.ok} title={fb.title} text={fb.text} onClose={()=>setFb(null)} autoClose={fb.ok? 1600 : 3000}/>}
    </GameShell>
  );
}

Object.assign(window, { GameClasificar });
