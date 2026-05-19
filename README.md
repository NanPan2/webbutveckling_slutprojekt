# VäderKollen - Slutprojekt Webbutveckling

## Projektbeskrivning

VäderKollen är en webbapp som låter användaren söka efter väderinformation för valfri stad i världen. Appen visar aktuellt väder samt en 5-dagars prognos.

**Typ av projekt:** Webbapp  
**Inriktning:** Väderapp med externt API

---

## Funktionsdesign

### Funktioner som användaren kan använda:

1. **Söka väder för en stad** - Användaren skriver in en stad i sökfältet och trycker på "Sök" eller Enter.
2. **Se aktuellt väder** - Temperatur, väderbeskrivning, "känns som"-temperatur, luftfuktighet och vindhastighet visas.
3. **Se 5-dagars prognos** - En prognos visas med temperatur och väderikon för de kommande 5 dagarna.
4. **Felhantering** - Om staden inte hittas visas ett tydligt felmeddelande.

### Vad händer i appen:

| Händelse | Resultat |
|----------|----------|
| Appen startar | Sökformuläret visas tomt, redo för input |
| Användaren skriver stad och trycker Sök | Laddningsindikator visas, API-anrop görs |
| API svarar med data | Väderkortet och prognosen visas med animering |
| Staden hittas inte | Felmeddelande visas i en röd ruta |
| API-nyckel saknas/ogiltig | Specifikt felmeddelande visas |

---

## UX-Design (Upplevelse-design)

### Sidstruktur (en-sidas-app):

```
┌─────────────────────────────────────┐
│           NAVBAR (VäderKollen)       │
├─────────────────────────────────────┤
│                                     │
│         ┌───────────────┐           │
│         │  SÖKFÄLT      │           │
│         │  [Stad...] [Sök]          │
│         └───────────────┘           │
│                                     │
│         ┌───────────────┐           │
│         │  VÄDERKORT    │           │
│         │  Stad, Land   │           │
│         │  [Ikon]       │           │
│         │  15°C         │           │
│         │  "Molnigt"    │           │
│         │───────────────│           │
│         │ Känns │ Fukt │ Vind │     │
│         │  13°  │ 72% │ 5m/s │     │
│         └───────────────┘           │
│                                     │
│    ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐   │
│    │Mån│  │Tis│  │Ons│  │Tor│  │Fre│ │
│    │12°│  │14°│  │11°│  │15°│  │13°│ │
│    └──┘  └──┘  └──┘  └──┘  └──┘   │
│         5-DAGARS PROGNOS            │
│                                     │
├─────────────────────────────────────┤
│           FOOTER                    │
└─────────────────────────────────────┘
```

### Designprinciper:

- **Responsiv design** - Fungerar på mobil, tablet och desktop (Bootstrap grid)
- **Tydlig hierarki** - Sökfältet är huvudfokus, resultatet visas tydligt under
- **Visuell feedback** - Laddningsindikator, animeringar vid visning av resultat
- **Felhantering** - Tydliga felmeddelanden i färgkodade rutor
- **Tillgänglighet** - Semantisk HTML, aria-labels, kontrast

---

## Tekniker som används

| Teknik | Användning |
|--------|-----------|
| **HTML5** | Semantisk struktur med section, nav, main, footer |
| **CSS3** | Egen styling, animeringar, gradient-bakgrund, responsiv design |
| **JavaScript (ES6+)** | Async/await, fetch API, DOM-manipulation, event listeners |
| **Bootstrap 5** | Grid-system, kort, knappar, formulär, utility-klasser |
| **Bootstrap Icons** | Ikoner för väderdetaljer |
| **OpenWeatherMap API** | Extern datakälla för väderinformation |

---

## Installation och användning

### 1. Skaffa API-nyckel (gratis)

1. Gå till [OpenWeatherMap](https://openweathermap.org/api)
2. Skapa ett gratis konto
3. Kopiera din API-nyckel

### 2. Konfigurera appen

Öppna `js/app.js` och byt ut API-nyckeln på rad 7:

```javascript
const API_KEY = "din_api_nyckel_här";  // Byt ut mot din nyckel
```

### 3. Öppna appen

Öppna `index.html` i en webbläsare. Ingen server behövs!

---

## Filstruktur

```
webbutveckling_slutprojekt/
├── index.html          # Huvudsida med HTML-struktur
├── css/
│   └── style.css       # Anpassad styling och animeringar
├── js/
│   └── app.js          # JavaScript-logik och API-anrop
├── img/                # Mapp för eventuella bilder
└── README.md           # Dokumentation (denna fil)
```

---

## Vad jag har lärt mig

- Hur man arbetar med externa API:er (fetch, async/await)
- Responsiv webbdesign med Bootstrap
- CSS-animeringar och moderna layouttekniker
- DOM-manipulation med JavaScript
- Felhantering i asynkron kod
- UX-design och användarupplevelse

---

## Källor

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
