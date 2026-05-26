# Cargas Eléctricas — Clase Interactiva

App web didáctica para estudiar **cargas eléctricas y seguridad eléctrica** (1°–2° medio).

Contiene la materia completa con widgets visuales animados, 5 juegos y un quiz con explicación tras cada respuesta. Todo el progreso se guarda en localStorage del navegador.

## Cómo usarlo

Necesitas un servidor estático local (los `.jsx` se cargan vía Babel en el browser; `file://` los bloquea).

```bash
# desde la carpeta del repo
python3 -m http.server 5555
# luego abre http://localhost:5555
```

Cualquier servidor estático sirve (live-server, `npx serve .`, etc.).

## Contenido

- **15 secciones** de materia con widget visual por cada una (átomo orbitando, inducción con redistribución de cargas, circuito con interruptor, etc.)
- **5 juegos** no deterministas con feedback explicativo:
  - Tarjetas concepto–definición (3/5/10 rondas)
  - Memorice (3 niveles)
  - Verdadero/Falso contra reloj
  - Clasificar (drag & drop o tap)
  - Simulador interactivo (atracción/repulsión, frotamiento, circuito)
- **Quiz** de 15 preguntas con explicación tras cada respuesta
- **Progreso** persistente en localStorage

## Stack

Sin build step — todo se carga vía CDN para que se pueda ejecutar abriendo un archivo.

- React 18 (UMD)
- Babel standalone (transforma JSX en el browser)
- Tailwind CSS (CDN)
- Framer Motion

## Estructura

```
index.html              Entry point + estilos + carga de scripts
src/
  data.jsx              Bancos: 25 conceptos, 30+ V/F, 15 preguntas quiz, 15 secciones
  ui.jsx                Componentes compartidos (Nav, Btn, Feedback, Particle, etc.)
  widgets.jsx           Los 15 widgets visuales por sección
  materia.jsx           Página /materia
  quiz.jsx              Quiz final
  progreso.jsx          Dashboard
  app.jsx               Hash router + landing
  games/
    tarjetas.jsx
    memorice.jsx
    vf.jsx
    clasificar.jsx
    simulador.jsx
```
