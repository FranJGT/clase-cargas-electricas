// Juego 2: Memorice de pares
function GameMemorice({ onExit }) {
  const [nivel, setNivel] = React.useState(null); // null | 'facil'|'medio'|'dificil'
  const [cards, setCards] = React.useState([]);
  const [flipped, setFlipped] = React.useState([]); // [idx, idx]
  const [matched, setMatched] = React.useState({});
  const [intentos, setIntentos] = React.useState(0);
  const [tiempo, setTiempo] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const conf = useConfetti();

  const niveles = {
    facil:   { n:6,  cols:'grid-cols-3 sm:grid-cols-4' },
    medio:   { n:8,  cols:'grid-cols-4' },
    dificil: { n:10, cols:'grid-cols-4 sm:grid-cols-5' },
  };

  function start(n) {
    setNivel(n);
    const pares = pickN(PARES, niveles[n].n);
    let arr = [];
    pares.forEach((p,i) => {
      arr.push({ id:`${i}-c`, group:i, text:p[0], kind:'c' });
      arr.push({ id:`${i}-d`, group:i, text:p[1], kind:'d' });
    });
    arr = shuffle(arr);
    setCards(arr); setFlipped([]); setMatched({}); setIntentos(0); setTiempo(0); setRunning(true);
  }

  React.useEffect(() => {
    if (!running) return;
    const t = setInterval(()=> setTiempo(x => x+1), 1000);
    return () => clearInterval(t);
  }, [running]);

  function flip(i) {
    if (flipped.length === 2) return;
    if (flipped.includes(i)) return;
    if (matched[i]) return;
    const nxt = [...flipped, i];
    setFlipped(nxt);
    if (nxt.length === 2) {
      setIntentos(x => x+1);
      const [a,b] = nxt;
      if (cards[a].group === cards[b].group && cards[a].kind !== cards[b].kind) {
        setTimeout(() => { setMatched(m => ({ ...m, [a]:true, [b]:true })); setFlipped([]); }, 500);
      } else {
        setTimeout(() => setFlipped([]), 1100);
      }
    }
  }

  const won = nivel && Object.keys(matched).length === cards.length && cards.length > 0;
  React.useEffect(() => {
    if (won) {
      setRunning(false); conf.fire();
      updateStore(s => {
        s.juegos = s.juegos || {};
        s.juegos.memorice = s.juegos.memorice || { jugadas: 0, mejorIntentos: {}, mejorTiempo: {} };
        s.juegos.memorice.jugadas++;
        const mi = s.juegos.memorice.mejorIntentos[nivel];
        const mt = s.juegos.memorice.mejorTiempo[nivel];
        s.juegos.memorice.mejorIntentos[nivel] = mi ? Math.min(mi, intentos) : intentos;
        s.juegos.memorice.mejorTiempo[nivel] = mt ? Math.min(mt, tiempo) : tiempo;
        return s;
      });
    }
  }, [won]);

  if (!nivel) {
    return (
      <GameShell title="Memorice" color="azul" onExit={onExit}>
        <p className="text-ink/80 max-w-xl">Encuentra los pares <strong>concepto + definición</strong>. Voltea dos cartas a la vez. Si forman pareja, quedan visibles.</p>
        <div className="mt-5">
          <div className="font-display font-semibold mb-2">Nivel</div>
          <div className="flex flex-wrap gap-2">
            <Btn tone="menta" onClick={()=>start('facil')}>Fácil · 6 pares</Btn>
            <Btn tone="azul"  onClick={()=>start('medio')}>Medio · 8 pares</Btn>
            <Btn tone="coral" onClick={()=>start('dificil')}>Difícil · 10 pares</Btn>
          </div>
        </div>
      </GameShell>
    );
  }

  if (won) {
    const store = loadStore();
    const mi = store.juegos?.memorice?.mejorIntentos?.[nivel];
    const mt = store.juegos?.memorice?.mejorTiempo?.[nivel];
    return (
      <GameShell title="Memorice" color="azul" onExit={onExit}>
        {conf.node}
        <FinalBoard pct={100} correct={cards.length/2} total={cards.length/2} errors={Math.max(0,intentos - cards.length/2)}
          tiempo={`${tiempo}s`}
          onReplay={()=> setNivel(null)}
          extra={<>Récord del nivel <strong>{nivel}</strong>: {mi} intentos · {mt}s</>}
        />
      </GameShell>
    );
  }

  return (
    <GameShell title="Memorice" color="azul" onExit={onExit}
      meta={<>Intentos <strong>{intentos}</strong> · ⏱ {tiempo}s</>}>
      <div className={cx('grid gap-2 sm:gap-3', niveles[nivel].cols)}>
        {cards.map((c, i) => {
          const isOpen = flipped.includes(i) || matched[i];
          return (
            <button key={c.id} onClick={()=>flip(i)} disabled={isOpen}
              className={cx('relative aspect-[3/4] popbtn p-2 transition-all duration-300',
                matched[i] ? 'bg-menta text-white' : isOpen ? 'bg-white' : 'bg-mora text-white')}>
              {isOpen ? (
                <div className="h-full flex items-center justify-center text-center text-[12px] sm:text-sm leading-snug font-medium">
                  {c.kind === 'c'
                    ? <span className="font-display font-bold text-[14px] sm:text-base">{c.text}</span>
                    : <span>{c.text}</span>}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center font-display font-bold text-3xl">⚡</div>
              )}
            </button>
          );
        })}
      </div>
    </GameShell>
  );
}

Object.assign(window, { GameMemorice });
