# VäderKollen - Design & Dokumentation
## Slutprojekt Webbutveckling

---

## 1. Projektbeskrivning

Jag har valt att göra en **webbapp** – en väderapplikation som heter "VäderKollen".
Användaren kan söka på valfri stad och få aktuellt väder samt en 5-dagars prognos.
Data hämtas från ett externt API (OpenWeatherMap).

---

## 2. Funktionsdesign

### Vilka funktioner ska användaren kunna använda?

1. **Söka väder för en stad** – Användaren skriver in ett stadsnamn i ett sökfält och trycker "Sök" eller Enter.
2. **Se aktuellt väder** – Temperatur, väderbeskrivning, "känns som"-temperatur, luftfuktighet och vindhastighet visas.
3. **Se 5-dagars prognos** – En prognos med temperatur och väderikon för kommande dagar.
4. **Felhantering** – Om staden inte hittas visas ett tydligt felmeddelande.

### Vad händer i appen steg-för-steg:

1. **Appen startar** → Sökformuläret visas, redo för att ta emot input.
2. **Användaren skriver en stad och trycker Sök** → En laddningsindikator visas medan data hämtas från API:t.
3. **API:t svarar med väderdata** → Väderkortet visas med temperatur, ikon, och detaljer. Prognosen visas under.
4. **Om staden inte hittas** → Ett rött felmeddelande visas: "Staden kunde inte hittas."
5. **Användaren söker igen** → Gammalt resultat ersätts med nytt.

---

## 3. UX-Design (Upplevelse-design)

### Sidtyper

Det är en **en-sidas-app** (Single Page Application). Allt sker på samma sida utan sidnavigation.

### Skiss över sidans struktur:

```
┌─────────────────────────────────────────┐
│         NAVBAR                          │
│   [Logga] VäderKollen                   │
├─────────────────────────────────────────┤
│                                         │
│         ┌─────────────────────┐         │
│         │    SÖK VÄDER        │         │
│         │                     │         │
│         │  [Stockholm...] [Sök]         │
│         └─────────────────────┘         │
│                                         │
│         ┌─────────────────────┐         │
│         │    VÄDERKORT        │         │
│         │                     │         │
│         │    Stockholm        │         │
│         │    Sverige          │         │
│         │                     │         │
│         │    (väderikon)      │         │
│         │      15°C           │         │
│         │    "Molnigt"        │         │
│         │                     │         │
│         │─────────────────────│         │
│         │ Känns som │ Fukt  │ Vind     │
│         │   13°C    │  72%  │ 5 m/s   │
│         └─────────────────────┘         │
│                                         │
│         5-DAGARS PROGNOS                │
│   ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐   │
│   │Mån│  │Tis│  │Ons│  │Tor│  │Fre│   │
│   │ ☀ │  │ ☁ │  │ 🌧│  │ ☀ │  │ ☁ │   │
│   │12°│  │14°│  │11°│  │15°│  │13°│   │
│   └───┘  └───┘  └───┘  └───┘  └───┘   │
│                                         │
├─────────────────────────────────────────┤
│         FOOTER                          │
│   VäderKollen © 2025                    │
│   Väderdata från OpenWeatherMap         │
└─────────────────────────────────────────┘
```

### Hur sidorna förändras vid interaktion:

- **Innan sökning:** Bara sökkortet syns. Resten är gömt.
- **Under sökning:** Laddningsindikator (snurrande cirkel) visas.
- **Efter sökning:** Väderkort + prognos glider in med animation (fade-in).
- **Vid fel:** Röd felruta visas istället för väderkort.

### Designval:

- **Färger:** Lila/blå gradient som bakgrund – associerar till himmel/väder.
- **Layout:** Centrerat innehåll, tydlig hierarki med sökfält högst upp.
- **Responsivt:** Bootstrap-grid gör att korten anpassas till mobilskärmar.
- **Feedback:** Laddningsindikator och animationer ger användaren tydlig respons.

---

## 4. Tekniker och verktyg

| Teknik | Varför jag valde den |
|--------|---------------------|
| **HTML5** | Semantiska element (nav, main, section, footer) för tydlig struktur |
| **CSS3** | Egna animationer, gradient-bakgrund, hover-effekter |
| **JavaScript (ES6+)** | API-anrop med fetch/async/await, DOM-manipulation |
| **Bootstrap 5** | Responsivt grid-system, färdiga komponenter (kort, knappar) |
| **OpenWeatherMap API** | Gratis väderdata i JSON-format |

---

## 5. Hur jag arbetade

1. Planerade funktioner och skissade UX-design.
2. Skapade HTML-strukturen med Bootstrap-komponenter.
3. Skrev egen CSS för att anpassa utseendet (gradient, animeringar, rundade kort).
4. Utvecklade JavaScript-logiken: formulärhantering → API-anrop → visa resultat.
5. Testade felhantering (ogiltig stad, API-fel).
6. Testade responsivitet på olika skärmstorlekar.

---

## 6. Källor

- Bootstrap 5 – https://getbootstrap.com/docs/5.3/
- OpenWeatherMap API – https://openweathermap.org/api
- Bootstrap Icons – https://icons.getbootstrap.com/
- MDN Web Docs (Fetch API) – https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
