# Structure Lab AU

Acer Lab’s Australia-only explainer for family, land and purpose structures — also branded Ever Earth Acre / Earth Acer. Workshop voice: Doug’s Lab AU.

**Product name:** Structure Lab AU  
**Subtitle:** Family, land & purpose structures — Australia only  
**Brand domain:** earthacer.in (parked at Hostinger — do not point it at this project)  
**Canonical live site:** https://acerlab.link

General information only. Not tax, legal or financial advice. Confirm with a registered tax agent and solicitor. Rules include 2026–28 announced reforms that may change.

A charity or community land trust with an asset lock cannot be a substitute for a family discretionary trust.

## What this is

A static nine-room notebook. Not a store, not a blog, not a booking site, and not a US nature-credits company. No accounts. No lead-capture. No invented duty tables or dollar savings.

1. Home — decision screen  
2. Household profile (answers stored in `localStorage` only)  
3. Succession planner  
4. Structure explorer — nineteen Australian structures, each with succession & continuity  
5. Scenario workshop — including a live CGT / duty flag sketch  
6. CLT / charity / co-op studio  
7. Compare — including succession columns  
8. Action checklist  
9. Glossary & timeline  

Australia only. No LLCs, S-corps, FEIE, 1031, Augusta rule, or Delaware vehicles.

## Repos

| Role | URL |
| --- | --- |
| Canonical | https://acerlab.link |
| Cloudflare source (preferred) | https://github.com/v2-prog/structure-lab |
| AmarWak copy (not CF source) | https://github.com/AmarWak/v2-prog-structure-lab |

`github.com/amarwakara` is unclaimed. Until that handle exists, ship from **v2-prog**. Cloudflare account: **Amarwakara@gmail.com**.

## Cloudflare Pages

1. Workers & Pages → Create → Connect to Git → **v2-prog/structure-lab**, branch `main`.
2. Framework: None. Build command: empty. Output directory: `/`.
3. Custom domains: `acerlab.link` and `www.acerlab.link`.

Do not attach `earthacer.in`.

## Local edit

```
python3 build_pages.py
```

Then open `index.html`. Push the generated HTML plus `app.css` and `app.js`.
