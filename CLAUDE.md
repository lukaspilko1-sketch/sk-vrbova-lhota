# CLAUDE.md — SK Vrbová Lhota z.s. · Web projektu

> Tento soubor je určen pro Claude Code a AI asistenty pracující na projektu.
> Přečti ho vždy jako první před jakoukoliv změnou v kódu.

---

## 📋 Přehled projektu

**Název:** Sportovní klub Vrbová Lhota 98 z.s. — Fotbalový klub
**Typ:** Multi-page statický web (HTML + externí CSS + externí JS)
**Účel:** Prezentační web místního fotbalového klubu z Nymburska
**Provozovatel:** SK Vrbová Lhota z.s. (9. liga sk. B, Středočeský kraj)
**Stav:** V aktivním vývoji — základní struktura hotová, obsah průběžně doplňován

---

## 📁 Struktura souborů

```
/
├── index.html              # Hlavní stránka — hero, zápasy, oddíly, o klubu, galerie, komunita
├── atym.html               # Stránka A-týmu (soupiska, info o týmu, výsledky CTA)
├── pripravka.html          # Stránka Mladší přípravky
├── aktuality.html          # Aktuality — hymna klubu (YouTube embed), novinky
├── galerie.html            # Fotogalerie — 3 sekce (A-tým, Přípravka, Ostatní), lightbox
├── kontakt.html            # Kontakt — kontaktní osoby, formulář Formspree
├── fanshop.html            # Fanshop — dočasně skryt z navigace
├── facr.svg                # Logo FAČR
├── CLAUDE.md               # Tento soubor
├── .gitattributes
├── .claude/
│   └── settings.local.json
├── css/
│   ├── main.css            # Hlavní stylesheet — sdílený všemi stránkami
│   └── main_v1.css         # Záloha předchozí verze (lze smazat)
├── js/
│   └── base.js             # Sdílený JS — scroll progress, nav dropdown, hamburger, reveal, counter
├── data/
│   └── galerie.json        # Data pro galerii — src, alt, tag, caption, wide, sekce
├── img/
│   ├── logo/
│   │   ├── logo-sk-vrbova-lhota.png   # Hlavní logo klubu
│   │   ├── logo-facebook.svg          # Facebook ikona (stažena lokálně)
│   │   └── logo-facr.png              # ⚠️ BROKEN — nahrazeno facr.svg
│   ├── hero/
│   │   └── tym-01.jpg                 # Hero fotka týmu
│   ├── galerie/
│   │   ├── tym-02.jpg, tym-03.jpg
│   │   ├── hriste-01.jpg, hospudka-01.jpg
│   │   └── deti-01.jpg, deti-02.jpg
│   └── partneri/
│       └── louda-auto.svg             # Logo partnera
└── upravy.txt              # Poznámky k úpravám (neformální changelog)
```

---

## 🛠 Tech Stack

| Vrstva | Technologie | Poznámka |
|--------|-------------|----------|
| HTML | HTML5, multi-page | Sdílená hlavička/nav na každé stránce inline |
| CSS | Vlastní CSS + Tailwind CDN | `css/main.css` sdílený, Tailwind 3 přes CDN |
| JavaScript | Vanilla JS | `js/base.js` sdílený; galerie má inline JS |
| Formulář | Formspree AJAX | Endpoint zatím placeholder |
| Fonty | Google Fonts | Noto Serif + Plus Jakarta Sans |
| Ikony | Material Symbols Outlined | Google Fonts CDN |
| Hosting | GitHub Pages / Netlify | Statický web, auto-deploy z main větve |

---

## 🎨 Design systém

### Barvy (CSS Custom Properties v `css/main.css`)

```css
--primary:    #1a65a8   /* Hlavní modrá — NIKDY NEMĚNIT, identita klubu */
--primary-dk: #134e87   /* Tmavší varianta */
--primary-lt: #2278c5   /* Světlejší varianta */
--accent:     #2f8f4e   /* Zelená — akcentová barva */
--accent-lt:  #3aa76d   /* Světlejší zelená */
--surface:    #f5f8fc   /* Světlé pozadí sekcí — střídá se s #fff */
--surface-2:  #e8f0f8   /* Tmavší surface — pro vnitřní prvky, info boxy */
--ink:        #0a1628   /* Téměř černá — footer, texty */
--text:       #111827   /* Základní barva textu */
--muted:      #3d5a7a   /* Tlumená modrošedá pro subtexty */
```

**Hero sekce** má vlastní zelené pozadí `#eef6f0` nastavené inline v `index.html` — záměrně odlišné od `--surface`.

### Sekce — pravidlo střídání pozadí

Aby stránka měla vizuální rytmus a oko mohlo odpočinout:

| Sekce | Pozadí | Poznámka |
|-------|--------|----------|
| Hero | `#eef6f0` | Zelené — unikátní, nepoužívat jinde |
| Zápasy | `#0a1c35` (tmavá) | Tmavý panel — záměrně |
| Oddíly | `var(--surface)` = `#f5f8fc` | Světlé |
| O klubu | `#fff` | Bílé |
| Galerie | `var(--surface)` | Světlé |
| Komunita | `#fff` | Bílé |
| Kontakt | Levý panel: `var(--primary)` | Modrý — split layout |
| Footer | `var(--ink)` | Tmavé |

### Fonty

| Rodina | Použití | Váhy |
|--------|---------|------|
| `Noto Serif` | `font-headline` — h1–h3, čísla v stats | 400, 700, 900 |
| `Plus Jakarta Sans` | `font-body` — vše ostatní | 300–800 |

### Eyebrow labely (malé nápisy nad nadpisy)

| Třída | Barva | Kdy použít |
|-------|-------|------------|
| `.eyebrow` | Modrá `--primary` | Výchozí — na bílém nebo surface pozadí |
| `.eyebrow-green` | Zelená `--accent` | Alternativa na bílém pozadí |
| `.eyebrow-gold` | Bílá/zelená | Pouze na tmavém pozadí (subpage-header, zápasy) |

**Pravidlo:** Na `var(--surface)` pozadí používej `.eyebrow` (modrá). Na `#fff` pozadí lze střídat. Na tmavém vždy `.eyebrow-gold`.

### Tlačítka

| Třída | Styl | Hover |
|-------|------|-------|
| `.btn-primary` | Modrá výplň, bílý text, radius 6px | `translateY(-2px)` + modrý shadow |
| `.btn-green` | Zelená výplň, bílý text, radius 6px | `translateY(-2px)` + zelený shadow |
| `.btn-outline` | Modrý border, radius 6px | Fill primary + shadow |
| `.btn-ghost-white` | Bílý border (tmavé pozadí) | Bílá výplň + `translateY(-2px)` |

### Navigace

- Nav-link výchozí barva: `#1f2937` (tmavá)
- Hover/active: `var(--primary)` modrá s podtržením
- Aktuální stránka: přidej `style="color:var(--accent)"` inline nebo třídu `.nav-link-accent`
- Fanshop: dočasně skryt z navigace (`hidden` třída nebo komentář)

---

## 📊 Stránky a sekce

### index.html
| Sekce | ID / třída | Stav |
|-------|-----------|------|
| Hero | `#hero` | ✅ Ken Burns, plovoucí logo, mobilní split layout |
| Stats strip | (inline) | ✅ 25+ let, 4 kategorie, 100+ členů, FAČR |
| Zápasy | `#zapasy` | ⚠️ Hardcoded data |
| Oddíly | `#oddiely` | ✅ Muži + Přípravka |
| O klubu | `#o-klubu` | ✅ |
| Galerie | `#galerie` | ✅ |
| Komunita | `#komunita` | ✅ (fiktivní jména) |
| Partneři | `#partneri` | ✅ Louda Auto |
| Footer | — | ✅ |

### atym.html / pripravka.html
- Subpage header (modrý gradient) + breadcrumb
- Data načítána z `data/atym.json` / `data/pripravka.json` (pokud existují) nebo inline
- Soupiska hráčů — zatím placeholder

### aktuality.html
- YouTube embed hymny klubu: `fl9_3GqrY80` (dospělí), `UatWiE2YNu0` (děti)
- Odkaz "číst více" byl odstraněn

### galerie.html
- Data z `data/galerie.json` — pole s `src, alt, tag, caption, wide, sekce`
- Sekce: `atym`, `pripravka`, `ostatni`
- Lightbox inline JS

### kontakt.html
- Formulář Formspree — endpoint placeholder
- Kategorie: "Muži (dospělí)", "Přípravka", "Jiný dotaz"

---

## ⚠️ Stav placeholderů

| Placeholder | Umístění | Priorita |
|-------------|----------|----------|
| `https://formspree.io/f/XXXXXXXX` | `kontakt.html` | 🔴 Vysoká |
| E-mail kontaktu | `kontakt.html` | 🔴 Vysoká — ověřit správnou adresu |
| Zápas 19. 4. · SK VL vs TJ Sokol Písty | `index.html` hero + zapasy | 🟡 Aktualizovat ručně |
| Výsledky zápasů | `#zapasy` | 🟡 Hardcoded, aktualizovat ručně |
| Soupiska A-týmu | `atym.html` | 🟡 Dodat jména + pozice |
| Kontaktní osoby | `kontakt.html` | 🟡 Dodat jména, telefony, e-maily |
| Testimonials (Markéta N. atd.) | `#komunita` | 🟢 Potvrdit nebo nahradit reálnými |

---

## ✅ TODO seznam

### Vysoká priorita
- [ ] **Formspree endpoint** — zaregistrovat a vložit reálné ID
- [ ] **E-mail** — ověřit správnou adresu klubu
- [ ] **Soupiska A-týmu** — doplnit jméno, příjmení, pozice
- [ ] **Kontaktní osoby** — jméno, pozice, telefon, e-mail pro vedení klubu

### Střední priorita
- [ ] **Aktualizace zápasů** — před každým zápasem aktualizovat v `index.html`
- [ ] **OG meta tagy** — `og:image`, `og:title`, `og:description` pro sdílení na FB
- [ ] **Favicon** — z loga klubu
- [ ] **Google Analytics / Plausible** — měření návštěvnosti

### Nízká priorita
- [ ] **Smazat `css/main_v1.css`** — záložní soubor, již nepotřebný
- [ ] **PWA manifest** — `manifest.json` pro mobilní uložení na plochu
- [ ] **Mapa Google Maps** — iframe embed na kontakt stránce
- [ ] **Automatická aktualizace zápasů** — napojení na fotbal.cz API nebo KFIS

---

## 🤖 Instrukce pro Claude Code

### Základní pravidla

1. **NIKDY nemeň `#1a65a8`** — primární modrá, identita klubu
2. **CSS sdíleno přes `css/main.css`** — změny se projeví na všech stránkách
3. **JS sdíleno přes `js/base.js`** — scroll, nav, hamburger, reveal, counter
4. **Hero zelené pozadí `#eef6f0`** — pouze v `index.html` inline, neměnit na `--surface`
5. **Neměň texty ani kontaktní údaje** bez explicitního souhlasu
6. **Zachovej Google Fonts** — Noto Serif + Plus Jakarta Sans
7. **Tailwind Tailwind config** je inline v `<script>` v každém HTML souboru — při přidávání nové stránky zkopírovat

### Workflow pro změny

```
1. Přečti CLAUDE.md (tento soubor)
2. Identifikuj kde je třída/komponenta (css/main.css nebo inline styl)
3. Proveď změnu v main.css (platí pro všechny stránky) nebo inline (pouze jedna stránka)
4. Zkontroluj, že JS funkce stále fungují
5. git add . && git commit -m "feat: popis změny" && git push
```

### Jak najít části kódu

- HTML sekce: komentáře `<!-- ══ NÁZEV ══ -->`
- CSS: bloky odděleny komentáři `/* ─── název ─── */`
- JS sdílený: `js/base.js`
- JS specifický pro stránku: inline `<script>` na konci `<body>`

### Připomínka git push

> **⚡ Po každé úpravě:**
> ```bash
> git add .
> git commit -m "feat: popis změny"
> git push origin main
> ```

---

## 📝 Changelog

| Datum | Verze | Změna |
|-------|-------|-------|
| 2025-04 | 1.0.0 | Prvotní verze — single-page HTML |
| 2025-04 | 1.1.0 | Vizuální modernizace — hero stripe, stat čísla 2.5rem, team karty, footer |
| 2026-04-27 | 2.0.0 | Refaktor na multi-page; CSS → `css/main.css`; JS → `js/base.js`; nové stránky: atym, pripravka, aktuality, galerie, kontakt, fanshop |
| 2026-04-27 | 2.1.0 | Galerie — 3 sekce + lightbox + `data/galerie.json`; hymna klubu na aktuality |
| 2026-04-27 | 2.2.0 | Hlavička: logo Facebook SVG, název "SK Vrbová Lhota 98 z.s.", FOTBALOVÝ KLUB |
| 2026-04-28 | 2.3.0 | Hero: split layout na mobilu (text nahoře, foto dole); "Hrajeme za Vrbovku" modrá; perex zkrácen |
| 2026-04-28 | 2.4.0 | Pozadí sekcí sjednoceno — `--surface` #f5f8fc + bílé střídání; eyebrow zpět na modrou; nav-link tmavá; tlačítka elevační hover |

---

## 🔗 Užitečné odkazy

| Zdroj | URL |
|-------|-----|
| Výsledky fotbal.cz | https://www.fotbal.cz/souteze/turnaje/hlavni/26809f2b-5859-4129-a4e8-891d1dc7cdf3 |
| Tabulka pořadí | https://www.fotbal.cz/souteze/turnaje/table/26809f2b-5859-4129-a4e8-891d1dc7cdf3 |
| Facebook skupina | https://www.facebook.com/groups/3040897976040534/ |
| Hřiště na mapě | https://maps.google.com/?q=Vrbová+Lhota+U+Lindovy+191 |
| Hymna dospělí (YT) | https://www.youtube.com/watch?v=fl9_3GqrY80 |
| Hymna děti (YT) | https://youtu.be/UatWiE2YNu0 |
| Formspree | https://formspree.io |
| Tailwind CDN docs | https://tailwindcss.com/docs |
| Material Symbols | https://fonts.google.com/icons |

---

*Poslední aktualizace CLAUDE.md: 28. dubna 2026*
