# CLAUDE.md — SK Vrbová Lhota z.s. · Web projektu

> Tento soubor je určen pro Claude Code a AI asistenty pracující na projektu.
> Přečti ho vždy jako první před jakoukoliv změnou v kódu.

---

## 📋 Přehled projektu

**Název:** SK Vrbová Lhota z.s. — Fotbalový klub  
**Typ:** Single-page website (SPA v jednom HTML souboru)  
**Účel:** Prezentační web místního fotbalového klubu z Nymburska  
**Provozovatel:** SK Vrbová Lhota z.s. (III. třída sk. B, Středočeský kraj)  
**Stav:** V aktivním vývoji — design vyladěn, obsah částečně placeholder  

---

## 📁 Struktura souborů

```
/
├── index.html                  # Hlavní (a jediný) HTML soubor — vše je zde
├── facr.svg                    # Logo FAČR — Fotbalová asociace ČR
├── CLAUDE.md                   # Tento soubor
├── .gitattributes              # LF normalizace
├── .claude/
│   └── settings.local.json     # Povolené domény pro WebFetch
├── img/
│   ├── logo/
│   │   ├── logo-sk-vrbova-lhota.png   # Hlavní logo klubu (používá se na více místech)
│   │   └── logo-facr.png              # ⚠️ BROKEN — Wikimedia 429, nahrazeno facr.svg
│   ├── hero/
│   │   └── tym-01.jpg                 # Hero fotka týmu
│   └── galerie/
│       ├── tym-02.jpg                 # Tým — sekce O klubu + galerie
│       ├── tym-03.jpg                 # Tým — galerie
│       ├── hriste-01.jpg              # Hřiště
│       ├── hospudka-01.jpg            # Hospůdka u hřiště
│       ├── deti-01.jpg                # Mládež
│       └── deti-02.jpg                # Mládež
└── upravy.txt                  # Changelog změn (aktuálně prázdný — doplnit)
```

---

## 🛠 Tech Stack

| Vrstva | Technologie | Poznámka |
|--------|-------------|----------|
| HTML | HTML5, single-file | Vše v `index.html` |
| CSS | Vlastní CSS + Tailwind CDN | Tailwind 3 přes CDN s pluginy `forms`, `container-queries` |
| JavaScript | Vanilla JS (ES2020+) | Žádný framework, žádný build step |
| Formulář | Formspree AJAX | Endpoint `https://formspree.io/f/XXXXXXXX` — **PLACEHOLDER** |
| Fonty | Google Fonts | Noto Serif + Plus Jakarta Sans |
| Ikony | Material Symbols Outlined | Google Fonts CDN |
| Hosting | Neuvedeno | Statický soubor — kompatibilní s GitHub Pages, Netlify, atd. |

### Tailwind konfigurace (inline v `<script>`)
```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary:  { DEFAULT: '#1a65a8', dark: '#134e87', light: '#2278c5' },
        accent:   { DEFAULT: '#2f8f4e', light: '#3aa76d' },
        surface:  { DEFAULT: '#f5f8fc', 2: '#e8f0f8' },
        ink:      '#0a1628',
        muted:    '#3d5a7a',
      },
      fontFamily: {
        headline: ['"Noto Serif"', 'serif'],
        body:     ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
};
```

---

## 🎨 Design systém

### Barvy (CSS Custom Properties)

```css
--primary:    #1a65a8   /* Hlavní modrá — NEMĚNIT, identita klubu */
--primary-dk: #134e87   /* Tmavší varianta primary */
--primary-lt: #2278c5   /* Světlejší varianta primary */
--accent:     #2f8f4e   /* Zelená — akcentová barva */
--accent-lt:  #3aa76d   /* Světlejší zelená */
--surface:    #f5f8fc   /* Světlé pozadí sekcí */
--surface-2:  #e8f0f8   /* O stupeň tmavší surface */
--ink:        #0a1628   /* Téměř černá — footer, texty */
--text:       #111827   /* Základní barva textu */
--muted:      #3d5a7a   /* Tlumená modrošedá pro subtexty */
```

### Fonty

| Rodina | Použití | Váhy |
|--------|---------|------|
| `Noto Serif` | `font-headline` — nadpisy h1–h3, čísla v stats | 400, 700, 900 |
| `Plus Jakarta Sans` | `font-body` — vše ostatní | 300, 400, 500, 600, 700, 800 |

### Tlačítka (CSS třídy)

| Třída | Styl | Hover |
|-------|------|-------|
| `.btn-primary` | Modrá výplň, bílý text, `border-radius: 6px` | Tmavší + shadow accent |
| `.btn-green` | Zelená výplň, bílý text, `border-radius: 6px` | Tmavší + shadow primary |
| `.btn-outline` | Modrý border, `border-radius: 6px` | Výplň primary |
| `.btn-ghost-white` | Bílý border (pro tmavá pozadí) | Jemná bílá výplň |

### Komponenty

- **`.team-card`** — Bílá karta s border-radius 12px, hover translateY(-6px) + shadow
- **`.testi-card`** — Testimonial karta, border-top accent
- **`.gallery-item`** — Fotka s overlay efektem
- **`.match-banner`** — Tmavě modrý banner zápasu
- **`.stat-div`** — Svislý separator v stats stripu (1px, rgba opacity)
- **`.reveal`** — Animace při scrollu (IntersectionObserver)
- **`.eyebrow`** / **`.eyebrow-green`** — Popisek sekce (uppercase, malé, s linkou vlevo)
- **`.hero-stripe`** — Diagonální stripe pattern v hero (CSS gradient, opacity .045)

### Animace a interaktivita

- **Scroll progress bar** — `#scroll-progress` (zelená linka nahoře)
- **Nav scrolled** — třída `.scrolled` přidána při scroll > 60px → blur backdrop
- **Hamburger menu** — mobilní drawer `#mobile-nav`, overlay `#mobile-overlay`
- **Reveal on scroll** — `.reveal` + `.d1`–`.d4` (transition-delay)
- **Counter animace** — `.counter[data-target="N"]` spustí se při zobrazení
- **Formspree AJAX** — asynchronní odeslání formuláře bez reload

---

## 📊 Struktura dat / Sekce

| ID sekce | Obsah | Stav |
|----------|-------|------|
| `#hero` | Fotka týmu, H1, CTA tlačítko, info o nejbližším zápase | ✅ Hotovo |
| Stats strip | 25+ let, 4 kategorie, 100+ členů, FAČR logo | ✅ Hotovo |
| `#zapasy` | Nejbližší zápas + poslední výsledky | ⚠️ Hardcoded data |
| `#oddiely` | Muži + Přípravka (karty), CTA banner | ✅ Hotovo |
| `#o-klubu` | Text o klubu, fotka, trust bullets | ✅ Hotovo |
| `#galerie` | 6 fotek v CSS gridu | ✅ Hotovo |
| `#komunita` | 3 testimonials | ✅ Hotovo (fiktivní jména) |
| `#kontakt` | Kontaktní info + formulář Formspree | ⚠️ Placeholder endpoint |
| Footer | Logo, navigace, copyright 2025, adresa, Google Maps link | ✅ Hotovo |

---

## ⚠️ Stav placeholderů

| Placeholder | Umístění | Co udělat |
|-------------|----------|-----------|
| `https://formspree.io/f/XXXXXXXX` | `<form action=...>` v kontaktu | Nahradit reálným Formspree endpoint ID |
| Zápas 19. 4. · SK VL vs TJ Sokol Písty | Hero + `#zapasy` sekce | Aktualizovat ručně před každým zápasem |
| Výsledky (2:1, 3:0, 1:1, 0:2, 4:1) | `#zapasy` poslední výsledky | Aktualizovat ručně nebo napojit na API |
| `info@fkvrbovalhotacz` | Kontakt | Chybí tečka — opravit na `info@fkvrbovalhotacz` nebo správnou adresu |
| `logo-facr.png` | `img/logo/` | Soubor nefunguje — používá se `facr.svg` místo toho |
| Testimonials (Markéta N., Tomáš K., Jan P.) | `#komunita` | Potvrdit nebo nahradit reálnými |

---

## ✅ TODO seznam

### Vysoká priorita
- [ ] **Formspree endpoint** — zaregistrovat na formspree.io a vložit reálné ID formuláře
- [ ] **E-mail oprava** — `info@fkvrbovalhotacz` vypadá jako překlep, zkontrolovat správnou adresu
- [ ] **Aktualizace zápasů** — data zápasů jsou hardcoded, před každou sezonou aktualizovat

### Střední priorita
- [ ] **Dorost a Žáci** — v kontaktním formuláři jsou kategorie "Dorost" a "Žáci", ale v sekci Oddíly chybí jejich karty
- [ ] **Google Analytics / Plausible** — přidat měření návštěvnosti
- [ ] **OG meta tagy** — přidat `og:image`, `og:title`, `og:description` pro sdílení na FB
- [ ] **Favicon** — přidat favicon (ideálně z loga klubu)
- [ ] **Aktualizovat `upravy.txt`** — zapsat provedené změny

### Nízká priorita
- [ ] **Lightbox pro galerii** — fotky se zatím neotevírají v plné velikosti
- [ ] **Mapa Google Maps** — zvážit embed mapy přímo na stránce (iframe)
- [ ] **Automatická aktualizace zápasů** — zvážit napojení na fotbal.cz API nebo KFIS
- [ ] **PWA manifest** — přidat `manifest.json` pro mobilní uložení na plochu
- [ ] **Print stylesheet** — pro případ tisku kontaktů

---

## 🤖 Instrukce pro Claude Code

### Základní pravidla

1. **NIKDY nemeň barvu `#1a65a8`** — je to identita klubu
2. **Zachovej single-file strukturu** — vše musí zůstat v `index.html`
3. **Zachovej Google Fonts** — Noto Serif + Plus Jakarta Sans
4. **Zachovej všechny JS funkce** — scroll progress, hamburger, reveal, counter, Formspree
5. **Neměň texty ani kontaktní údaje** bez explicitního souhlasu
6. **Testuj mobilní zobrazení** — web musí fungovat na 320px+

### Workflow pro změny

```
1. Přečti CLAUDE.md (tento soubor)
2. Identifikuj sekci k úpravě (hledej ID nebo CSS třídu)
3. Proveď změnu
4. Zkontroluj, že JS funkce stále fungují
5. Aktualizuj CHANGELOG níže
6. ⚠️  NEZAPOMEŇ: git add . && git commit -m "popis" && git push
```

### Jak najít části kódu

- Sekce jsou označeny komentáři `<!-- ══ NÁZEV ══ -->`
- CSS custom properties jsou na začátku v `:root {}`
- Vlastní CSS je v bloku `<style>` v `<head>`
- JavaScript je na konci `<body>` v `<script>`
- Tailwind config je inline v `<script>` v `<head>`

### Připomínka pro git push

> **⚡ Po každé úpravě nezapomeň:**
> ```bash
> git add .
> git commit -m "feat: popis změny"
> git push origin main
> ```
> Web se nasadí automaticky (pokud je napojený GitHub Pages / Netlify).

---

## 📝 Changelog

| Datum | Verze | Změna | Autor |
|-------|-------|-------|-------|
| 2025-04 | 1.0.0 | Prvotní verze webu | — |
| 2025-04 | 1.1.0 | Vizuální modernizace — hero stripe, stat čísla 2.5rem, team karty radius 12px, "→ Více informací" linky, footer border-top, Google Maps link, CTA border-radius 6px, nav gradient border, backdrop-filter scrolled, section h2 text-shadow | Claude |

---

## 🔗 Užitečné odkazy

| Zdroj | URL |
|-------|-----|
| Web fotbalu (výsledky) | https://www.fotbal.cz/souteze/turnaje/hlavni/26809f2b-5859-4129-a4e8-891d1dc7cdf3 |
| Tabulka pořadí | https://www.fotbal.cz/souteze/turnaje/table/26809f2b-5859-4129-a4e8-891d1dc7cdf3 |
| Facebook skupina | https://www.facebook.com/groups/3040897976040534/ |
| Hřiště na mapě | https://maps.google.com/?q=Vrbová+Lhota+U+Lindovy+191 |
| Formspree | https://formspree.io |
| Tailwind CDN docs | https://tailwindcss.com/docs |
| Material Symbols | https://fonts.google.com/icons |

---

*Poslední aktualizace CLAUDE.md: duben 2025*
