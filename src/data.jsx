// All content lives here — sections, banks, quiz.
// Original educational content in Spanish for 1°-2° medio.

const SECCIONES = [
  {
    id: 1, color: 'coral', tag: 'Átomo',
    titulo: 'Estructura del átomo',
    cuerpo: `El átomo está formado por tres partículas principales: el **protón (+)** con carga positiva, el **electrón (−)** con carga negativa y el **neutrón (0)** sin carga eléctrica. Un átomo se considera **neutro** cuando tiene la misma cantidad de protones y de electrones — por ejemplo, 10 protones y 10 electrones.`,
    bullets: [
      ['Protón','carga positiva (+)','#E63946'],
      ['Electrón','carga negativa (−)','#0077B6'],
      ['Neutrón','sin carga (0)','#1F1B16'],
    ],
    caso: 'En el átomo de oxígeno hay 8 protones y 8 electrones — está balanceado y por eso es neutro.',
  },
  {
    id: 2, color: 'azul', tag: 'Carga',
    titulo: 'Carga eléctrica',
    cuerpo: `La **carga eléctrica** es una propiedad de algunas partículas subatómicas — específicamente protones y electrones. Las cargas pueden producir **atracción o repulsión** entre objetos.`,
    reglas: [
      ['Igual signo','SE REPELEN','#E63946'],
      ['Distinto signo','SE ATRAEN','#06A77D'],
    ],
    caso: 'Dos globos frotados con tu pelo se repelen entre sí: ambos quedaron cargados con electrones del mismo signo.',
  },
  {
    id: 3, color: 'menta', tag: 'Interacción',
    titulo: 'Interacción entre cargas',
    cuerpo: `La interacción entre cargas depende del tipo de carga presente. Es una regla simple pero poderosa: **el signo manda**.`,
    bullets: [
      ['(+) con (+)','repelen','#E63946'],
      ['(−) con (−)','repelen','#E63946'],
      ['(+) con (−)','atraen','#06A77D'],
    ],
    caso: 'Si acercas un peineta cargado a otro objeto cargado igual, los verás separarse — no por magia, por física.',
  },
  {
    id: 4, color: 'naranja', tag: 'Frotamiento',
    titulo: 'Electrización por frotamiento',
    cuerpo: `Al frotar dos materiales (por ejemplo, una peineta plástica contra ropa de lana), ocurre **transferencia de electrones** entre ambos. El objeto frotado adquiere carga eléctrica y puede atraer objetos neutros porque los **polariza**, es decir, redistribuye sus cargas internas.`,
    caso: 'Cuando bajas por un tobogán plástico y al tocar a alguien sientes un chispazo: tu cuerpo se cargó por frotamiento contra el plástico.',
  },
  {
    id: 5, color: 'mora', tag: 'Tipos',
    titulo: 'Las tres formas de electrización',
    cuerpo: `Existen tres maneras en que un objeto puede cargarse:`,
    pasos: [
      ['Por frotamiento','Dos materiales se frotan y transfieren electrones.','#F77F00'],
      ['Por contacto','Un objeto cargado toca a uno neutro y le pasa carga.','#0077B6'],
      ['Por inducción','Un objeto cargado se acerca a uno neutro sin tocarlo y reordena sus cargas.','#7209B7'],
    ],
    caso: 'Misma regla en común: nunca se "crean" cargas nuevas — solo se mueven electrones de un lugar a otro.',
  },
  {
    id: 6, color: 'azul', tag: 'Inducción',
    titulo: 'Inducción eléctrica',
    cuerpo: `Cuando un objeto cargado se acerca a uno neutro **sin tocarlo**, puede provocar una **polarización**: las cargas del objeto neutro se redistribuyen — los electrones se acomodan más cerca o más lejos del objeto cargado. Esto puede producir atracción sin contacto.`,
    caso: 'Acerca un globo frotado a un chorro fino de agua del grifo — el chorro se curva sin que el globo lo toque.',
  },
  {
    id: 7, color: 'coral', tag: 'Circuitos',
    titulo: 'Circuitos eléctricos',
    cuerpo: `Para que un aparato eléctrico funcione, debe haber **circulación de electrones**. Los cables conductores permiten el paso de la corriente, pero solo si el circuito está **cerrado**. En un **circuito abierto** la corriente no circula y el aparato no funciona.`,
    bullets: [
      ['Cerrado','la corriente circula','#06A77D'],
      ['Abierto','la corriente NO circula','#E63946'],
    ],
    caso: 'Cuando aprietas un interruptor, cierras el circuito y la ampolleta se enciende.',
  },
  {
    id: 8, color: 'menta', tag: 'Materiales',
    titulo: 'Conductores y aislantes',
    cuerpo: `Los materiales se clasifican según qué tan fácil dejan pasar la corriente eléctrica.`,
    columnas: [
      { titulo: 'Conductores', color: '#06A77D', items: ['cobre (excelente)','aluminio','hierro','plata','oro'], descr: 'los electrones se mueven libremente' },
      { titulo: 'Aislantes',   color: '#7209B7', items: ['goma','plástico','vidrio','madera seca','cerámica'], descr: 'los electrones NO se mueven libremente' },
    ],
    caso: 'Los cables eléctricos tienen cobre por dentro (conductor) y goma por fuera (aislante) — cada material en su lugar.',
  },
  {
    id: 9, color: 'mora', tag: 'Polarización',
    titulo: 'Polarización en objetos neutros',
    cuerpo: `Un objeto cargado puede atraer a un objeto neutro porque sus cargas internas **se redistribuyen** (polarización). Esto explica la **atracción sin contacto** entre un objeto cargado y uno neutro.`,
    caso: 'Por eso un globo cargado pega contra la pared: polariza las cargas de la pared y queda "pegado" un rato.',
  },
  {
    id: 10, color: 'amari', tag: 'Importante',
    titulo: 'Los objetos neutros sí participan',
    cuerpo: `Aunque un objeto sea neutro, **contiene cargas**: tiene la misma cantidad de protones y electrones. Por eso puede polarizarse y ser atraído. **Todos** los cuerpos contienen partículas cargadas — solo cambia la proporción.`,
    bullets: [
      ['Neutro ≠ vacío','tiene + y − en equilibrio','#0077B6'],
      ['Puede polarizarse','sí participa en fenómenos eléctricos','#06A77D'],
    ],
    caso: 'Los papelitos sobre la mesa son neutros, pero igual saltan hacia el peineta cargado.',
  },
  {
    id: 11, color: 'coral', tag: 'Energía',
    titulo: 'Fuentes de energía: pilas',
    cuerpo: `Las **pilas** transforman **energía química** en **energía eléctrica**. En su interior ocurren reacciones químicas que generan una diferencia de potencial entre el polo positivo (+) y el polo negativo (−). Los electrones circulan por el circuito externo.`,
    bullets: [
      ['Polo (+)','terminal positivo','#E63946'],
      ['Polo (−)','terminal negativo','#0077B6'],
      ['Energía','química → eléctrica','#06A77D'],
    ],
    caso: 'Las pilas NO producen energía infinita: cuando los reactivos químicos se agotan, dejan de funcionar.',
  },
  {
    id: 12, color: 'azul', tag: 'Energía',
    titulo: 'Baterías recargables',
    cuerpo: `Las baterías recargables están formadas por una o más **celdas electroquímicas**. Almacenan energía química y permiten alimentar dispositivos electrónicos. Funcionan gracias al movimiento de cargas eléctricas, y al recargarse la reacción química se invierte.`,
    caso: 'Tu celular usa una batería de litio: al cargarse, los iones se mueven en una dirección; al usarse, en la opuesta.',
  },
  {
    id: 13, color: 'menta', tag: 'Hogar',
    titulo: 'Uso eficiente y seguro en el hogar',
    cuerpo: `Pequeños hábitos hacen una gran diferencia en consumo y seguridad:`,
    checks: [
      ['Apagar aparatos que no se utilizan', true],
      ['Evitar enchufes sobrecargados con muchos aparatos', true],
      ['Utilizar electrodomésticos eficientes', true],
      ['Saber que muchas zapatillas en cadena son peligrosas', true],
    ],
    caso: 'Conectar la estufa, la juguera y el microondas a la misma zapatilla puede hacer saltar el disyuntor.',
  },
  {
    id: 14, color: 'naranja', tag: 'Seguridad',
    titulo: 'Medidas de seguridad eléctrica',
    cuerpo: `La seguridad eléctrica empieza por el conocimiento. Reglas básicas que pueden salvar vidas:`,
    checks: [
      ['No manipular enchufes con manos mojadas', true],
      ['Revisar el estado de cables y conexiones', true],
      ['Utilizar correctamente los materiales eléctricos', true],
      ['Ignorar cables dañados es muy peligroso', false],
    ],
    caso: 'El agua hace que tu piel conduzca electricidad mucho mejor — un toque que normalmente no haría nada puede electrocutarte.',
  },
  {
    id: 15, color: 'mora', tag: 'Protecciones',
    titulo: 'Protecciones eléctricas en el hogar',
    cuerpo: `Los hogares modernos cuentan con dispositivos de protección:`,
    bullets: [
      ['Disyuntor','interrumpe la corriente ante una falla','#E63946'],
      ['Fusible','se funde si la corriente es excesiva','#F77F00'],
      ['Toma a tierra','desvía corrientes peligrosas al suelo','#06A77D'],
    ],
    caso: 'Manipular cables pelados NUNCA es seguro, aunque el voltaje sea bajo.',
  },
];

const IDEAS_CLAVE = [
  'La carga eléctrica puede ser POSITIVA (+) o NEGATIVA (−).',
  'Cargas iguales se REPELEN; cargas opuestas se ATRAEN.',
  'Los objetos neutros pueden polarizarse y ser atraídos.',
  'La corriente eléctrica es el movimiento de electrones.',
  'La seguridad eléctrica comienza con conocimiento y prevención.',
];

const ERRORES_COMUNES = [
  'Pensar que solo los protones tienen carga.',
  'Creer que un objeto neutro no puede participar en fenómenos eléctricos.',
  'Olvidar que se necesita un circuito CERRADO para que haya corriente.',
  'Usar muchos adaptadores en un mismo enchufe.',
  'Manipular cables dañados o enchufes con las manos mojadas.',
];

// ---------- Banco de conceptos (Juego 1 y 2) ----------
const PARES = [
  ['Protón','Partícula subatómica con carga positiva (+).'],
  ['Electrón','Partícula subatómica con carga negativa (−).'],
  ['Neutrón','Partícula sin carga eléctrica.'],
  ['Átomo neutro','Tiene igual cantidad de protones y electrones.'],
  ['Carga eléctrica','Propiedad que produce atracción o repulsión.'],
  ['Electrización por frotamiento','Transferencia de electrones al rozar dos materiales.'],
  ['Electrización por contacto','Un objeto cargado toca a uno neutro y le transfiere carga.'],
  ['Electrización por inducción','Un objeto cargado redistribuye cargas sin tocar al otro.'],
  ['Polarización','Redistribución de cargas en un objeto neutro.'],
  ['Conductor','Material que permite el paso libre de electrones.'],
  ['Aislante','Material que dificulta el paso de electrones.'],
  ['Cobre','Ejemplo de excelente conductor eléctrico.'],
  ['Goma','Ejemplo de buen aislante eléctrico.'],
  ['Circuito cerrado','Camino completo por donde circulan los electrones.'],
  ['Circuito abierto','Camino interrumpido donde no circula corriente.'],
  ['Pila','Fuente que transforma energía química en eléctrica.'],
  ['Batería recargable','Celda electroquímica que se puede volver a cargar.'],
  ['Disyuntor','Dispositivo que corta la corriente ante una falla.'],
  ['Fusible','Elemento que se funde si la corriente es excesiva.'],
  ['Toma a tierra','Protección que desvía corrientes peligrosas al suelo.'],
  ['Sobrecarga','Conectar demasiados aparatos a un mismo enchufe.'],
  ['Cortocircuito','Contacto directo entre dos polos del circuito.'],
  ['Atracción','Fuerza entre cargas de distinto signo.'],
  ['Repulsión','Fuerza entre cargas del mismo signo.'],
  ['Corriente eléctrica','Movimiento de electrones por un conductor.'],
];

// ---------- V/F (Juego 3) ----------
const VF = [
  ['Los protones tienen carga negativa.', false, 'Los protones tienen carga POSITIVA (+). Los que tienen carga negativa son los electrones.'],
  ['Cargas iguales se atraen.', false, 'Cargas iguales se REPELEN. Solo las cargas de signo opuesto se atraen.'],
  ['La goma es un buen aislante eléctrico.', true, 'Correcto. La goma dificulta el paso de electrones, por eso se usa para recubrir cables.'],
  ['Para que un circuito funcione debe estar abierto.', false, 'Debe estar CERRADO. Un circuito abierto interrumpe el paso de la corriente.'],
  ['Un objeto cargado puede atraer a uno neutro sin tocarlo.', true, 'Sí: lo polariza. Las cargas del objeto neutro se redistribuyen y aparece atracción.'],
  ['Una pila produce energía infinita.', false, 'No. La pila transforma energía química en eléctrica; cuando los reactivos se agotan deja de funcionar.'],
  ['El cobre es un buen conductor.', true, 'Sí, por eso se usa en cables eléctricos. Los electrones se mueven libremente por él.'],
  ['Tocar enchufes con manos mojadas es seguro si el voltaje es bajo.', false, 'NUNCA. El agua hace que tu piel conduzca mucho mejor — incluso bajos voltajes pueden ser peligrosos.'],
  ['Los fusibles se funden cuando hay demasiada corriente.', true, 'Correcto. Esa es su función: cortar el circuito para proteger los equipos.'],
  ['Los neutrones tienen carga positiva.', false, 'Los neutrones NO tienen carga, son neutros (de ahí su nombre).'],
  ['La electrización por frotamiento transfiere electrones.', true, 'Sí. Al frotar dos materiales, los electrones pasan de uno a otro.'],
  ['Los objetos neutros no contienen cargas.', false, 'Sí contienen: tienen igual cantidad de + y −. Por eso son neutros, no porque estén vacíos.'],
  ['El plástico es un buen conductor.', false, 'El plástico es AISLANTE. No deja pasar libremente la corriente.'],
  ['Un disyuntor interrumpe la corriente ante una falla.', true, 'Exacto. Salta automáticamente ante un cortocircuito o sobrecarga.'],
  ['En la electrización por contacto se requiere tocar el objeto.', true, 'Sí, por definición. En la inducción NO hay contacto.'],
  ['Un átomo con 5 protones y 5 electrones es neutro.', true, 'Sí. Misma cantidad de + que de − = carga total cero.'],
  ['La corriente eléctrica es el movimiento de protones por el cable.', false, 'No. La corriente es el movimiento de ELECTRONES; los protones no viajan por los cables.'],
  ['Se pueden crear cargas eléctricas nuevas al frotar.', false, 'No se "crean": solo se TRANSFIEREN electrones entre los materiales.'],
  ['La madera seca es un buen aislante.', true, 'Sí. Por eso a veces se usan herramientas con mango de madera para trabajos eléctricos.'],
  ['Conectar muchos aparatos grandes a una zapatilla es seguro.', false, 'Es peligroso: provoca SOBRECARGA y puede causar incendios o hacer saltar el disyuntor.'],
  ['Las baterías de los celulares almacenan energía química.', true, 'Sí. Al usarse transforman energía química en eléctrica; al cargarse, el proceso se invierte.'],
  ['La toma a tierra desvía corrientes peligrosas al suelo.', true, 'Exacto. Es una protección clave en instalaciones eléctricas.'],
  ['Un ion que perdió electrones queda con carga negativa.', false, 'Al revés: si pierde electrones queda con carga POSITIVA (menos − = más +).'],
  ['Los electrones tienen carga negativa.', true, 'Sí, esa es una de las propiedades fundamentales del electrón.'],
  ['El vidrio es buen conductor.', false, 'El vidrio es AISLANTE. Los electrones no se mueven libremente por él.'],
  ['La inducción requiere contacto físico.', false, 'NO. La inducción ocurre SIN tocar al otro objeto, solo acercándose.'],
  ['Apagar luces al salir de una pieza ahorra energía.', true, 'Sí. Un hábito simple con impacto real en el consumo eléctrico.'],
  ['Un cortocircuito ocurre cuando los polos hacen contacto directo.', true, 'Correcto. Genera una corriente muy alta y puede ser muy peligroso.'],
  ['Los aislantes son útiles para proteger a las personas de la corriente.', true, 'Sí, por eso se usan en mangos de herramientas y recubrimientos de cables.'],
  ['Al cargar una batería los electrones se "consumen" definitivamente.', false, 'No. La reacción química se invierte y la batería puede volver a entregar energía.'],
];

// ---------- Clasificar (Juego 4) ----------
const CLASIFICAR = {
  conductor: {
    titulo: 'Conductor vs Aislante',
    cajas: ['Conductor','Aislante'],
    items: [
      ['Cobre','Conductor','Excelente conductor — base de los cables eléctricos.'],
      ['Aluminio','Conductor','Metal que conduce bien la electricidad.'],
      ['Hierro','Conductor','Metal conductor, aunque peor que el cobre.'],
      ['Oro','Conductor','Conductor muy puro — se usa en contactos finos.'],
      ['Plata','Conductor','El mejor conductor de todos, pero caro.'],
      ['Plástico','Aislante','Recubrimiento típico de cables.'],
      ['Vidrio','Aislante','No deja pasar libremente la corriente.'],
      ['Goma','Aislante','Aislante clásico — mangos de herramientas eléctricas.'],
      ['Madera seca','Aislante','Aislante si está seca; mojada cambia bastante.'],
      ['Papel seco','Aislante','Sin humedad, dificulta el paso de electrones.'],
      ['Cerámica','Aislante','Aislante usado en torres de alta tensión.'],
      ['Agua pura','Aislante','¡Truco! El agua PURA aísla. Con sales disueltas pasa a conducir.'],
    ],
  },
  carga: {
    titulo: 'Tipo de carga',
    cajas: ['Positiva (+)','Negativa (−)','Neutra (0)'],
    items: [
      ['Protón','Positiva (+)','El protón tiene carga positiva.'],
      ['Electrón','Negativa (−)','El electrón tiene carga negativa.'],
      ['Neutrón','Neutra (0)','El neutrón no tiene carga.'],
      ['Átomo con igual p⁺ y e⁻','Neutra (0)','Si hay misma cantidad de + y −, la carga total es 0.'],
      ['Ion que perdió electrones','Positiva (+)','Le sobran protones → carga positiva.'],
      ['Ion que ganó electrones','Negativa (−)','Le sobran electrones → carga negativa.'],
    ],
  },
  electrizacion: {
    titulo: 'Tipo de electrización',
    cajas: ['Frotamiento','Contacto','Inducción'],
    items: [
      ['Frotas un globo en tu pelo','Frotamiento','Dos materiales se rozan: electrones transferidos.'],
      ['Frotas un peineta con un paño','Frotamiento','Frotamiento clásico de aula.'],
      ['Bajas por un tobogán plástico','Frotamiento','Tu ropa contra el plástico te electriza.'],
      ['Tocas una esfera cargada con un metal','Contacto','Hay contacto físico, hay transferencia.'],
      ['Una varilla cargada toca otra neutra','Contacto','El neutro queda cargado por contacto.'],
      ['Le pasas la carga a un electroscopio tocándolo','Contacto','Contacto directo = electrización por contacto.'],
      ['Acercas el peineta a papelitos sin tocarlos','Inducción','Sin tocar, polarizas los papelitos.'],
      ['Globo cargado cerca de un chorro de agua','Inducción','El agua se polariza y se curva sin contacto.'],
      ['Acercas una varilla cargada a un objeto neutro','Inducción','Provoca redistribución de cargas sin tocar.'],
    ],
  },
  seguridad: {
    titulo: 'Seguro vs Peligroso',
    cajas: ['Seguro','Peligroso'],
    items: [
      ['Apagar luces al salir','Seguro','Hábito básico y sin riesgo.'],
      ['Manos secas al enchufar','Seguro','La piel seca conduce mucho menos.'],
      ['Disyuntor instalado','Seguro','Protege ante fallas eléctricas.'],
      ['Usar electrodomésticos eficientes','Seguro','Menos consumo, menos riesgo de sobrecarga.'],
      ['Revisar cables antes de usar','Seguro','Prevenir es la mejor protección.'],
      ['Desenchufar tirando del cable','Peligroso','El cable se daña internamente — riesgo a futuro.'],
      ['Cable pelado expuesto','Peligroso','Contacto directo con el conductor: muy peligroso.'],
      ['Zapatilla con muchos aparatos grandes','Peligroso','Provoca sobrecarga, puede incendiarse.'],
      ['Tocar enchufes con manos mojadas','Peligroso','El agua aumenta enormemente la conducción.'],
      ['Ignorar cables dañados','Peligroso','Pequeño descuido → gran riesgo.'],
    ],
  },
};

// ---------- Quiz Final ----------
const QUIZ = [
  { sec:1, q:'¿Cuál de estas partículas NO tiene carga eléctrica?',
    opts:['Protón','Electrón','Neutrón','Ion positivo'], ok:2,
    ex:'El neutrón no tiene carga (de ahí su nombre). Protones son +, electrones son −, y los iones son átomos con desbalance.' },
  { sec:2, q:'Dos objetos con carga negativa se acercan. ¿Qué pasa?',
    opts:['Se atraen','Se repelen','No interactúan','Se vuelven neutros'], ok:1,
    ex:'Cargas del mismo signo se repelen. La atracción solo ocurre entre cargas opuestas.' },
  { sec:3, q:'Una esfera (+) se acerca a otra (−). La fuerza que aparece es de…',
    opts:['Repulsión','Atracción','Inducción','Conducción'], ok:1,
    ex:'Signos opuestos producen atracción. La inducción es otro proceso (cargas redistribuyéndose) y la conducción es paso de corriente.' },
  { sec:4, q:'Al frotar una peineta plástica con un paño, ¿qué se transfiere?',
    opts:['Protones del paño a la peineta','Electrones entre los dos','Neutrones','Se crean cargas nuevas'], ok:1,
    ex:'En la electrización por frotamiento nunca se crean cargas: solo se transfieren electrones entre los materiales.' },
  { sec:5, q:'¿Cuál de estas NO es una forma de electrización?',
    opts:['Por frotamiento','Por contacto','Por inducción','Por conducción'], ok:3,
    ex:'Las tres formas de electrización son frotamiento, contacto e inducción. La conducción es paso de corriente, no electrización.' },
  { sec:6, q:'En la inducción eléctrica…',
    opts:['Los objetos deben tocarse','No hay contacto, solo cercanía','Se transfieren electrones permanentemente','Solo ocurre en metales'], ok:1,
    ex:'La inducción ocurre sin contacto: el objeto cargado provoca redistribución de cargas en el otro al acercarse.' },
  { sec:7, q:'Para que una ampolleta encienda, el circuito debe estar…',
    opts:['Abierto','Cerrado','Sin pila','Sin cables'], ok:1,
    ex:'Un circuito cerrado permite el paso de electrones. Si está abierto, la corriente no circula y la ampolleta queda apagada.' },
  { sec:8, q:'¿Cuál material es un buen aislante?',
    opts:['Cobre','Aluminio','Goma','Hierro'], ok:2,
    ex:'La goma es aislante (dificulta el paso de electrones). El cobre, aluminio y hierro son metales conductores.' },
  { sec:9, q:'Un globo cargado se queda pegado a la pared porque…',
    opts:['La pared estaba cargada','Polariza las cargas de la pared','Hay imanes en la pared','El aire conduce'], ok:1,
    ex:'El globo cargado polariza las cargas de la pared (las redistribuye), generando atracción aunque la pared sea neutra.' },
  { sec:10, q:'Los objetos neutros…',
    opts:['No tienen cargas','Tienen igual cantidad de + y −','Solo tienen protones','No participan en fenómenos eléctricos'], ok:1,
    ex:'Neutro NO significa vacío: el objeto tiene cargas + y − en igual cantidad. Por eso puede polarizarse y ser atraído.' },
  { sec:11, q:'Una pila transforma…',
    opts:['Energía eléctrica en química','Energía química en eléctrica','Energía mecánica en eléctrica','Calor en electricidad'], ok:1,
    ex:'Las pilas convierten energía química (de sus reactivos internos) en energía eléctrica para alimentar el circuito.' },
  { sec:12, q:'Las baterías recargables se basan en…',
    opts:['Una reacción química reversible','Captura de luz solar','Movimiento mecánico','Combustión'], ok:0,
    ex:'En una batería recargable la reacción química puede invertirse al cargarse, permitiendo reutilizarla.' },
  { sec:13, q:'¿Cuál de estos hábitos es MÁS riesgoso?',
    opts:['Apagar luces al salir','Conectar 4 electrodomésticos grandes a una zapatilla','Usar enchufes con manos secas','Desconectar aparatos en desuso'], ok:1,
    ex:'Conectar muchos aparatos grandes a una zapatilla provoca SOBRECARGA, lo que puede incendiar la instalación.' },
  { sec:14, q:'¿Por qué es peligroso tocar enchufes con manos mojadas?',
    opts:['El agua se evapora con la electricidad','El agua aumenta la conductividad de la piel','La piel se rompe','Cambia el voltaje'], ok:1,
    ex:'El agua aumenta enormemente la conductividad de la piel: corrientes que serían inofensivas en seco pueden electrocutarte.' },
  { sec:15, q:'¿Cuál protección se FUNDE cuando hay corriente excesiva?',
    opts:['Disyuntor','Fusible','Toma a tierra','Interruptor'], ok:1,
    ex:'El fusible se funde (se rompe) cuando pasa demasiada corriente, cortando el circuito y protegiendo el equipo.' },
];

// ---------- helpers ----------
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickN(arr, n) { return shuffle(arr).slice(0, n); }

Object.assign(window, {
  SECCIONES, IDEAS_CLAVE, ERRORES_COMUNES, PARES, VF, CLASIFICAR, QUIZ,
  shuffle, pickN,
});
