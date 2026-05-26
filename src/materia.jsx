// /materia page — 15 sections

function MateriaSeccion({ s, leida, onMark }) {
  const bg = COLORS[s.color] || s.color;
  return (
    <section id={`s${s.id}`} className="popcard p-6 sm:p-8 relative overflow-hidden">
      <span className="tape"></span>
      <TitleBar tag={`§${String(s.id).padStart(2,'0')}`} color={s.color}>{s.titulo}</TitleBar>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        <p className="text-[17px] leading-relaxed text-ink/85"><MdBold>{s.cuerpo}</MdBold></p>
        <div className="lg:pl-2"><SectionWidget id={s.id}/></div>
      </div>

      {s.bullets && (
        <ul className="mt-5 grid sm:grid-cols-2 gap-2">
          {s.bullets.map(([k,v,c],i) => (
            <li key={i} className="popcard-sm bg-white px-4 py-2.5 flex items-center gap-3">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background:c }}/>
              <span className="font-display font-semibold">{k}</span>
              <span className="ml-auto text-sm text-ink/70">{v}</span>
            </li>
          ))}
        </ul>
      )}

      {s.reglas && (
        <div className="mt-5 grid sm:grid-cols-2 gap-3">
          {s.reglas.map(([k,v,c],i) => (
            <div key={i} className="popcard-sm p-4" style={{ background: i===0 ? '#FFE5E8' : '#D9F4E8' }}>
              <div className="font-display text-lg font-semibold">{k}</div>
              <div className="font-display font-bold text-2xl mt-1" style={{ color:c }}>{v}</div>
            </div>
          ))}
        </div>
      )}

      {s.pasos && (
        <ol className="mt-5 space-y-3">
          {s.pasos.map(([k,v,c],i) => (
            <li key={i} className="flex gap-3 popcard-sm bg-white p-3.5">
              <div className="font-display font-bold w-9 h-9 rounded-full text-white flex items-center justify-center border-2 border-ink shrink-0" style={{ background:c }}>{i+1}</div>
              <div>
                <div className="font-display font-semibold">{k}</div>
                <div className="text-sm text-ink/75">{v}</div>
              </div>
            </li>
          ))}
        </ol>
      )}

      {s.columnas && (
        <div className="mt-5 grid sm:grid-cols-2 gap-3">
          {s.columnas.map((col,i) => (
            <div key={i} className="popcard-sm bg-white p-4">
              <div className="font-display font-bold text-lg" style={{ color: col.color }}>{col.titulo}</div>
              <div className="text-xs text-ink/60 uppercase tracking-wide mt-0.5">{col.descr}</div>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {col.items.map((it,j) => (
                  <li key={j} className="px-2.5 py-1 rounded-full border-2 border-ink text-sm bg-cream font-medium">{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {s.checks && (
        <ul className="mt-5 space-y-2">
          {s.checks.map(([t,good],i) => (
            <li key={i} className="popcard-sm bg-white px-4 py-2.5 flex items-center gap-3">
              <span className={cx('inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-ink font-bold',
                good ? 'bg-menta text-white' : 'bg-coral text-white')}>{good?'✓':'✗'}</span>
              <span className="text-[15px]">{t}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 note p-4 pr-5">
        <div className="font-display font-bold text-sm uppercase tracking-wide text-ink/70">Caso real</div>
        <div className="text-[15px] mt-1 leading-snug">{s.caso}</div>
      </div>

      <div className="mt-5 flex items-center gap-3 flex-wrap">
        <button onClick={() => onMark(s.id)}
          className={cx('popbtn font-display font-semibold px-4 py-2 text-sm',
            leida ? 'bg-menta text-white' : 'bg-white')}>
          {leida ? '✓ Sección marcada como leída' : 'Marcar como leída'}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById(`s${s.id+1}`);
            if (!el) return;
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }}
          className={cx('text-sm font-display font-semibold underline decoration-2 underline-offset-2 bg-transparent border-0 p-0 cursor-pointer', s.id===15 && 'hidden')}
          style={{ textDecorationColor: bg, color: bg }}>
          Siguiente sección →
        </button>
      </div>
    </section>
  );
}

function PageMateria() {
  const store = useStore();
  const leidas = store.leidas || {};
  const [openIdx, setOpenIdx] = React.useState(false);

  function mark(id) {
    updateStore(s => {
      s.leidas = { ...(s.leidas||{}), [id]: !s.leidas?.[id] };
      return s;
    });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[260px_1fr] gap-8">
      {/* sidebar */}
      <aside className="lg:sticky lg:top-24 self-start">
        <div className="popcard p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg">Índice</h3>
            <button className="lg:hidden text-sm font-semibold underline" onClick={()=>setOpenIdx(o=>!o)}>
              {openIdx ? 'cerrar' : 'abrir'}
            </button>
          </div>
          <ol className={cx('mt-3 space-y-1 text-sm', !openIdx && 'hidden lg:block')}>
            {SECCIONES.map(s => (
              <li key={s.id}>
                <a href="#/materia"
                   onClick={(e) => {
                     e.preventDefault();
                     const el = document.getElementById(`s${s.id}`);
                     if (!el) return;
                     const y = el.getBoundingClientRect().top + window.scrollY - 80;
                     window.scrollTo({ top: y, behavior: 'smooth' });
                   }}
                   className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-amari/40">
                  <span className="w-5 h-5 rounded-full border-2 border-ink flex items-center justify-center text-[10px] font-bold"
                        style={{ background: leidas[s.id] ? COLORS[s.color] : 'transparent',
                                 color: leidas[s.id] ? '#fff' : '#1F1B16' }}>
                    {leidas[s.id] ? '✓' : s.id}
                  </span>
                  <span className="truncate">{s.titulo}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="mt-3 pt-3 border-t-2 border-dashed border-ink/30 text-xs text-ink/70">
            {Object.values(leidas).filter(Boolean).length}/15 secciones leídas
          </div>
        </div>
      </aside>

      <main className="space-y-6">
        <div className="popcard bg-amari p-6 sm:p-8 relative">
          <span className="tape right"></span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl">La materia, ordenada y didáctica</h1>
          <p className="mt-2 text-ink/85 max-w-2xl">15 secciones que cubren TODO el apunte. Marca cada una como leída a medida que avances — tu progreso se guarda automáticamente.</p>
        </div>

        {SECCIONES.map(s => (
          <MateriaSeccion key={s.id} s={s} leida={!!leidas[s.id]} onMark={mark} />
        ))}

        {/* Ideas clave */}
        <section className="popcard bg-cielo p-6 sm:p-8">
          <TitleBar tag="ideas" color="azul">Ideas clave</TitleBar>
          <ul className="space-y-2">
            {IDEAS_CLAVE.map((t,i) => (
              <li key={i} className="popcard-sm bg-white px-4 py-2.5 flex gap-3">
                <span className="font-display font-bold text-azul">★</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="popcard bg-[#FFE5E8] p-6 sm:p-8">
          <TitleBar tag="¡ojo!" color="coral">Errores comunes</TitleBar>
          <ul className="space-y-2">
            {ERRORES_COMUNES.map((t,i) => (
              <li key={i} className="popcard-sm bg-white px-4 py-2.5 flex gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-coral text-white border-2 border-ink font-bold shrink-0">✗</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="popcard p-6 flex flex-wrap items-center gap-4 justify-between">
          <div className="font-display font-bold text-xl">¿Lista para practicar?</div>
          <div className="flex gap-2 flex-wrap">
            <Btn as="a" href="#/juegos" tone="mora">🎮 Ir a los juegos</Btn>
            <Btn as="a" href="#/quiz" tone="amari">✍️ Hacer el quiz</Btn>
          </div>
        </div>
      </main>
    </div>
  );
}

Object.assign(window, { PageMateria });
