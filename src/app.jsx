// Main app — hash router + landing + games hub

function useHashRoute() {
  const [route, setRoute] = React.useState(() => location.hash || '#/');
  React.useEffect(() => {
    const onHash = () => setRoute(location.hash || '#/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

function PageLanding() {
  const s = useStore();
  const leidas = Object.values(s.leidas || {}).filter(Boolean).length;
  const jugados = Object.keys(s.juegos || {}).length;
  const quizMejor = s.quiz?.mejor || 0;

  const bullets = [
    ['📖','Materia','15 secciones explicadas, con casos reales.','#/materia','coral'],
    ['🎮','Juegos','5 juegos interactivos, no deterministas.','#/juegos','mora'],
    ['✍️','Quiz','15 preguntas con explicación por cada respuesta.','#/quiz','azul'],
    ['📊','Progreso','Lo que llevas leído, jugado y respondido.','#/progreso','menta'],
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
        <div className="relative">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-ink/60 mb-3">Control próximo · 1°–2° medio</div>
          <h1 className="font-display font-bold text-5xl sm:text-6xl leading-[1.05]">
            Cargas eléctricas y<br/>
            <span className="hl hl-amari">seguridad</span>, <span className="scribble">jugando</span>.
          </h1>
          <p className="mt-5 text-lg text-ink/80 max-w-xl">
            Prepárate para el control con la materia completa, <strong>5 juegos</strong> que cambian cada ronda y un <strong>quiz</strong> que te explica cada respuesta. Sin perderse en apuntes.
          </p>
          <div className="mt-7 flex gap-2 flex-wrap">
            <Btn as="a" href="#/materia" tone="ink">📖 Empezar con la materia</Btn>
            <Btn as="a" href="#/juegos" tone="amari">🎮 Saltar a los juegos</Btn>
          </div>

          {/* mini progress */}
          <div className="mt-8 popcard p-4 max-w-md">
            <div className="text-xs uppercase tracking-wide text-ink/60 mb-2">Tu progreso</div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div><div className="font-display font-bold text-2xl text-coral">{leidas}/15</div>secciones</div>
              <div><div className="font-display font-bold text-2xl text-mora">{jugados}/5</div>juegos</div>
              <div><div className="font-display font-bold text-2xl text-azul">{quizMejor}/15</div>quiz</div>
            </div>
          </div>
        </div>

        {/* hero illustration */}
        <div className="relative h-80 sm:h-96 popcard bg-cielo p-4 dotted overflow-hidden">
          <span className="tape"></span>
          <span className="tape right" style={{ background:'rgba(6,167,125,.7)' }}></span>
          <div className="absolute inset-0 flex items-center justify-center">
            <MiniAtom size={200}/>
          </div>
          {/* corner particles */}
          <div className="absolute top-6 right-6"><Particle kind="proton" size={48}/></div>
          <div className="absolute bottom-8 left-6"><Particle kind="electron" size={48}/></div>
          <div className="absolute bottom-6 right-10"><Particle kind="neutron" size={40}/></div>
          {/* sticky note */}
          <div className="note absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-2 text-xs sm:text-sm font-display font-semibold rotate-[-2deg]">
            (+) ↔ (−) atraen<br/>(+) ↔ (+) se repelen
          </div>
        </div>
      </div>

      {/* features */}
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {bullets.map(([em,t,d,href,c],i) => (
          <a key={i} href={href} className="popcard p-5 hover:-translate-y-0.5 transition-transform bg-white block">
            <div className="w-12 h-12 rounded-xl border-2 border-ink flex items-center justify-center text-2xl mb-3" style={{ background: COLORS[c], color:'#fff' }}>{em}</div>
            <div className="font-display font-bold text-lg">{t}</div>
            <div className="text-sm text-ink/70 mt-1">{d}</div>
          </a>
        ))}
      </div>

      {/* TOC */}
      <div className="mt-12 popcard p-6">
        <h2 className="font-display font-bold text-2xl mb-1">Tabla de contenidos</h2>
        <p className="text-ink/65 text-sm mb-4">Las 15 secciones de la materia. Pincha cualquiera para empezar por ahí.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {SECCIONES.map(sec => (
            <a key={sec.id} href={`#/materia`} onClick={()=>setTimeout(()=>document.getElementById('s'+sec.id)?.scrollIntoView({behavior:'instant'}),100)}
               className="popcard-sm bg-white p-3 text-sm hover:bg-amari/30">
              <div className="font-mono text-xs text-ink/50">§{String(sec.id).padStart(2,'0')}</div>
              <div className="font-display font-semibold mt-0.5 leading-tight">{sec.titulo}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageJuegosHub() {
  const s = useStore();
  const j = s.juegos || {};
  const games = [
    ['tarjetas','Tarjetas concepto–definición','Une cada concepto con su definición correcta. 3, 5 o 10 rondas.','🃏','mora',
      j.tarjetas && `Mejor: ${j.tarjetas.mejorPct}%`],
    ['memorice','Memorice','Encuentra los pares concepto + definición. 3 niveles.','🧠','azul',
      j.memorice && `${j.memorice.jugadas} partidas`],
    ['vf','Verdadero o Falso','10 preguntas contra reloj. +10 si aciertas en menos de 3s.','⚡','coral',
      j.vf && `Mejor: ${j.vf.mejorScore} pts`],
    ['clasificar','Clasificar','Arrastra cada tarjeta a la caja correcta. 4 categorías.','📦','naranja',
      j.clasificar && `${j.clasificar.jugadas} partidas`],
    ['simulador','Simulador','3 mini-experimentos: cargas, frotamiento y circuito.','🔬','menta',
      j.simulador && `${Object.keys(j.simulador.exploradas||{}).length}/3 explorados`],
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-display font-bold text-4xl mb-2"><span className="scribble">5 juegos</span>, cero aburrimiento</h1>
      <p className="text-ink/75 mb-6">Cada ronda se baraja: no te las vas a saber de memoria. Feedback explicativo en cada error.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map(([k,n,d,em,c,sub]) => (
          <a key={k} href={`#/juegos/${k}`} className="popcard p-5 block hover:-translate-y-0.5 transition-transform" style={{ background: '#fff' }}>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl border-2 border-ink flex items-center justify-center text-2xl shrink-0" style={{ background: COLORS[c], color:'#fff' }}>{em}</div>
              <div>
                <div className="font-display font-bold text-lg leading-tight">{n}</div>
                <div className="text-sm text-ink/70 mt-1">{d}</div>
              </div>
            </div>
            {sub && <div className="mt-3 text-xs font-mono text-ink/60">{sub}</div>}
          </a>
        ))}
      </div>
    </div>
  );
}

function App() {
  const route = useHashRoute();

  let page = null;
  if (route === '#/' || route === '') page = <PageLanding/>;
  else if (route.startsWith('#/materia')) page = <PageMateria/>;
  else if (route === '#/juegos') page = <PageJuegosHub/>;
  else if (route === '#/juegos/tarjetas') page = <GameTarjetas/>;
  else if (route === '#/juegos/memorice') page = <GameMemorice/>;
  else if (route === '#/juegos/vf') page = <GameVF/>;
  else if (route === '#/juegos/clasificar') page = <GameClasificar/>;
  else if (route === '#/juegos/simulador') page = <GameSimulador/>;
  else if (route === '#/quiz') page = <PageQuiz/>;
  else if (route === '#/progreso') page = <PageProgreso/>;
  else page = (
    <div className="max-w-2xl mx-auto p-10 text-center">
      <div className="font-display font-bold text-3xl">Ups… página no encontrada</div>
      <p className="mt-2 text-ink/70">La ruta <code className="font-mono">{route}</code> no existe.</p>
      <div className="mt-4"><Btn as="a" href="#/" tone="ink">Volver al inicio</Btn></div>
    </div>
  );

  // scroll to top on route change
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [route]);

  return (
    <div className="min-h-screen flex flex-col" data-screen-label={`route ${route}`}>
      <Nav route={route} />
      <main className="flex-1">{page}</main>
      <footer className="border-t-2 border-ink bg-cream py-6 mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-sm text-ink/65 flex flex-wrap gap-3 items-center justify-between">
          <div>Cargas eléctricas · clase interactiva · hecho con ⚡ y ☕</div>
          <div className="font-mono text-xs">Tu progreso se guarda localmente en este navegador.</div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
