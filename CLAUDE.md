# CLAUDE.md — SK Vrbová Lhota z.s. · Web projektu

> Tento soubor je určen pro Claude Code a AI asistenty pracující na projektu.
> Přečti ho vždy jako první před jakoukoliv změnou v kódu.

---

## 📋 Přehled projektu

**Název:** Sportovní klub Vrbová Lhota 98 z.s. — Fotbalový klub
**Typ:** Multi-page statický web (HTML + externí CSS + externí JS)
**Účel:** Prezentační web místního fotbalového klubu z Nymburska
**Provozovatel:** SK Vrbová Lhota z.s. (9. liga sk. B, Středočeský kraj)
**Hosting:** Wedos (PHP hosting, PHP 7.4+), auto-deploy z GitHub main větve
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
├── kontakt.html            # Kontakt — kontaktní osoby, formulář Formspree (xrejpnyg)
├── gdpr.html               # Ochrana osobních údajů (GDPR)
├── fanshop.html            # Fanshop — dočasně skryt z navigace
├── robots.txt              # SEO — Disallow: /admin/, Disallow: /*.bak
├── sitemap.xml             # SEO sitemap — 7 URL
├── facr.svg                # Logo FAČR
├── CLAUDE.md               # Tento soubor
├── .gitattributes
├── .claude/
│   └── settings.local.json
├── css/
│   ├── main.css            # Hlavní stylesheet — sdílený všemi stránkami
│   └── main_v1.css         # Záloha předchozí verze (lze smazat)
├── js/
│   ├── base.js             # Sdílený JS — scroll progress, nav dropdown, hamburger, reveal, counter, js-year
│   └── cookies.js          # Cookie consent bar (localStorage persistence)
├── data/
│   ├── galerie.json        # Data pro galerii — src, alt, tag, caption, wide, sekce
│   ├── nastaveni.json      # Centrální konfigurace — hero, zápas, stats, hymna, kontakt
│   ├── atym.json           # Data A-týmu (soupiska) — načítáno dynamicky
│   └── pripravka.json      # Data přípravky (soupiska) — načítáno dynamicky
├── admin/
│   ├── index.html          # Admin panel — SPA, dark sidebar, 7 sekcí
│   ├── save.php            # PHP — ukládá JSON soubory do ../data/ (whitelist)
│   ├── upload.php          # PHP — nahrávání obrázků (jpg/png/webp, max 8 MB)
│   └── .htaccess           # HTTP Basic Auth + Options -Indexes
├── img/
│   ├── logo/
│   │   ├── logo-sk-vrbova-lhota.png   # Hlavní logo klubu
│   │   ├── logo-facebook.svg          # Facebook ikona (lokálně)
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
| JavaScript | Vanilla JS | `js/base.js` sdílený; `js/cookies.js` sdílený; galerie má inline JS |
| Data | JSON v `data/` | Načítáno přes `fetch()` s cache-busting `?t=Date.now()` |
| Admin | Vanilla JS SPA + PHP | `admin/index.html` + `save.php` + `upload.php` |
| Formulář | Formspree AJAX | Endpoint `xrejpnyg` — **aktivní** |
| Fonty | Google Fonts | Noto Serif + Plus Jakarta Sans |
| Ikony | Material Symbols Outlined | Google Fonts CDN |
| Hosting | Wedos PHP hosting | Statický web + PHP admin, auto-deploy z GitHub main |

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

### Eyebrow labely

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
- Fanshop: dočasně skryt z navigace
- Kontakt: zobrazován jako zelený pill `.nav-link-pill`

---

## 📊 Stránky a sekce

### index.html
| Sekce | ID / třída | Stav |
|-------|-----------|------|
| Hero | `#hero` | ✅ Ken Burns, plovoucí logo, mobilní split layout |
| Stats strip | (inline) | ✅ Dynamická data z `nastaveni.json` (counter animace) |
| Zápasy | `#zapasy` | ⚠️ Data z `nastaveni.json` — aktualizovat ručně |
| Oddíly | `#oddiely` | ✅ Muži + Přípravka |
| O klubu | `#o-klubu` | ✅ |
| Galerie | `#galerie` | ✅ |
| Komunita | `#komunita` | ✅ (fiktivní jména — ověřit) |
| Partneři | `#partneri` | ✅ Louda Auto |
| Footer | — | ✅ footer-legal, js-year, cookies.js |

### atym.html / pripravka.html
- Subpage header (modrý gradient) + breadcrumb
- Data načítána z `data/atym.json` / `data/pripravka.json`
- Soupiska hráčů — zatím placeholder

### aktuality.html
- YouTube embed hymny: ID načítáno z `data/nastaveni.json` (`hymna.youtube_id`)
- Fallback hardcoded ID: `fl9_3GqrY80` (dospělí)
- Embed používá `youtube-nocookie.com` (GDPR)
- Novinky načítány z `data/aktuality.json` (pokud existuje)

### galerie.html
- Data z `data/galerie.json` — pole s `src, alt, tag, caption, wide, sekce`
- Sekce: `atym`, `pripravka`, `ostatni`
- Lightbox inline JS

### kontakt.html
- Formulář Formspree AJAX — endpoint `xrejpnyg` (**aktivní**)
- GDPR checkbox (required) před odesláním
- Kategorie: "Muži (dospělí)", "Přípravka", "Jiný dotaz"

### gdpr.html
- Ochrana osobních údajů — správce, účel zpracování, cookies, práva subjektů
- Právní základ: oprávněný zájem (čl. 6 odst. 1 písm. f GDPR)
- Formspree jako zpracovatel (čl. 28)

### admin/index.html
- HTTP Basic Auth (`.htpasswd` na serveru je nastaveno)
- 7 sekcí: Nastavení, A-tým, Přípravka, Aktuality, Galerie, Partneři, Hymna
- State management: `renderSection(id)` = re-fetch ze serveru; `renderCurrentSection()` = re-render z `currentData`
- Live binding přes `data-key` (dot-notation) + `setDeep()` + event delegation

---

## 📦 data/nastaveni.json — struktura

```json
{
  "meta": { "nazev_klubu", "rok_zalozeni" },
  "kontakt_global": { "telefon", "email", "adresa", ... },
  "hero": { "nadpis_modry", "nadpis_zeleny", "perex" },
  "nejblizsi_zapas": { "datum_den", "datum_mesic", "den_v_tydnu", "cas", "domaci", "soutez", "misto", "souper_nazev", "match_line_text" },
  "stats": { "tradice_let", "pocet_oddilu", "pocet_clenu" },
  "soutez_odkazy": { "vysledky_url", "tabulka_url" },
  "hymna": { "youtube_id" },
  "footer": { "copyright_rok", "copyright_text" }
}
```

---

## ⚠️ Stav placeholderů

| Placeholder | Umístění | Priorita |
|-------------|----------|----------|
| E-mail `info@vrbovka98.cz` | `gdpr.html`, `kontakt.html` | 🔴 Ověřit, zda adresa existuje |
| Datová schránka `xcbah9a` | `gdpr.html` | 🟡 Ověřit správnost |
| Zápas (datum, soupeř, čas) | `data/nastaveni.json` | 🟡 Aktualizovat před každým zápasem |
| Výsledky zápasů | `#zapasy` v `index.html` | 🟡 Hardcoded, aktualizovat ručně |
| Soupiska A-týmu | `data/atym.json` | 🟡 Dodat jména + pozice |
| Kontaktní osoby | `kontakt.html` | 🟡 Dodat jména, telefony, e-maily |
| Testimonials (Markéta N. atd.) | `#komunita` | 🟢 Potvrdit nebo nahradit reálnými |

---

## ✅ TODO seznam

### Vysoká priorita
- [ ] **E-mail** — ověřit, zda `info@vrbovka98.cz` skutečně funguje
- [ ] **Datová schránka** — ověřit `xcbah9a` v `gdpr.html`
- [ ] **Soupiska A-týmu** — doplnit jméno, příjmení, pozice do `data/atym.json`
- [ ] **Kontaktní osoby** — jméno, pozice, telefon, e-mail pro vedení klubu

### Střední priorita
- [ ] **Aktualizace zápasů** — před každým zápasem aktualizovat v `data/nastaveni.json` (nebo přes admin panel)
- [ ] **Favicon** — z loga klubu
- [ ] **Google Analytics / Plausible** — měření návštěvnosti
- [ ] **Google Search Console** — zaregistrovat `sitemap.xml` po nasazení

### Nízká priorita
- [ ] **Smazat `css/main_v1.css`** — záložní soubor, již nepotřebný
- [ ] **PWA manifest** — `manifest.json` pro mobilní uložení na plochu
- [ ] **Mapa Google Maps** — iframe embed na kontakt stránce
- [ ] **Automatická aktualizace zápasů** — napojení na fotbal.cz API nebo KFIS
- [ ] **YouTube lazy-load** — přidat potvrzení před načtením embedu (plná GDPR shoda)

### Hotovo ✅
- [x] Formspree endpoint `xrejpnyg` — aktivní
- [x] SEO meta tagy (description, robots, canonical, OG) — všechny stránky
- [x] JSON-LD SportsOrganization — `index.html`
- [x] `robots.txt` — Disallow admin + bak, sitemap odkaz
- [x] `sitemap.xml` — 7 URL včetně `gdpr.html`
- [x] Automatický copyright rok — `js-year` třída + `base.js`
- [x] Admin panel — `admin/index.html` + PHP backend
- [x] `.htpasswd` na serveru nastaveno
- [x] GDPR stránka `gdpr.html`
- [x] Cookie consent bar `js/cookies.js`
- [x] GDPR checkbox v kontaktním formuláři
- [x] `footer-legal` blok na všech stránkách
- [x] YouTube → `youtube-nocookie.com`

---

## 🤖 Instrukce pro Claude Code

### Základní pravidla

1. **NIKDY nemeň `#1a65a8`** — primární modrá, identita klubu
2. **CSS sdíleno přes `css/main.css`** — změny se projeví na všech stránkách
3. **JS sdíleno přes `js/base.js`** a `js/cookies.js` — přidávat `<script>` tagy na konec každé nové stránky
4. **Hero zelené pozadí `#eef6f0`** — pouze v `index.html` inline, neměnit na `--surface`
5. **Neměň texty ani kontaktní údaje** bez explicitního souhlasu
6. **Zachovej Google Fonts** — Noto Serif + Plus Jakarta Sans
7. **Tailwind config** je inline v `<script>` v každém HTML souboru — při přidávání nové stránky zkopírovat
8. **YouTube embedy** vždy přes `youtube-nocookie.com`, nikdy `youtube.com`
9. **Data z JSON** načítej s cache-busting: `fetch('data/soubor.json?t=' + Date.now())`

### Workflow pro změny

```
1. Přečti CLAUDE.md (tento soubor)
2. Identifikuj kde je třída/komponenta (css/main.css nebo inline styl)
3. Proveď změnu v main.css (platí pro všechny stránky) nebo inline (pouze jedna stránka)
4. Zkontroluj, že JS funkce stále fungují
5. git add <soubory> && git commit -m "feat: popis změny" && git push
```

### Jak najít části kódu

- HTML sekce: komentáře `<!-- ══ NÁZEV ══ -->`
- CSS: bloky odděleny komentáři `/* ─── název ─── */`
- JS sdílený: `js/base.js`, `js/cookies.js`
- JS specifický pro stránku: inline `<script>` na konci `<body>`
- Data pro stránky: `data/*.json`

### Šablona nové stránky

Každá nová stránka musí mít:
- Tailwind config `<script>` (zkopírovat z existující stránky)
- `<link rel="stylesheet" href="css/main.css" />`
- Identickou navigaci (header + mobile nav)
- `<script src="js/base.js"></script>`
- `<script src="js/cookies.js"></script>`
- `footer-legal` blok ve footeru
- `<span class="js-year">` v copyright textu

---

## 📝 Changelog

| Datum | Verze | Změna |
|-------|-------|-------|
| 2025-04 | 1.0.0 | Prvotní verze — single-page HTML |
| 2025-04 | 1.1.0 | Vizuální modernizace — hero stripe, stat čísla 2.5rem, team karty, footer |
| 2026-04-27 | 2.0.0 | Refaktor na multi-page; CSS → `css/main.css`; JS → `js/base.js`; nové stránky: atym, pripravka, aktuality, galerie, kontakt, fanshop |
| 2026-04-27 | 2.1.0 | Galerie — 3 sekce + lightbox + `data/galerie.json`; hymna klubu na aktuality |
| 2026-04-27 | 2.2.0 | Hlavička: logo Facebook SVG, název "SK Vrbová Lhota 98 z.s.", FOTBALOVÝ KLUB |
| 2026-04-28 | 2.3.0 | Hero: split layout na mobilu; "Hrajeme za Vrbovku" modrá; perex zkrácen |
| 2026-04-28 | 2.4.0 | Pozadí sekcí sjednoceno — `--surface` + bílé střídání; eyebrow modrá; nav-link tmavá |
| 2026-05-06 | 2.5.0 | Admin panel (`admin/`); `data/nastaveni.json`; dynamická data v `index.html` |
| 2026-05-06 | 2.6.0 | SEO — meta tagy, JSON-LD, `robots.txt`, `sitemap.xml`; automatický copyright rok |
| 2026-05-06 | 2.7.0 | GDPR — `gdpr.html`, cookie bar, footer-legal, GDPR checkbox, youtube-nocookie.com |

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
| Formspree dashboard | https://formspree.io |
| Tailwind CDN docs | https://tailwindcss.com/docs |
| Material Symbols | https://fonts.google.com/icons |
| Google Search Console | https://search.google.com/search-console |

---

*Poslední aktualizace CLAUDE.md: 6. května 2026*
