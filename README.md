# Structure Lab AU

Australian family, land and purpose structures — trusts, companies, SMSF, community land trusts, charities, co-ops, CGT and duty flags.

General information only. Not tax, legal or financial advice.

Live app source snapshot exported from the Grok-hosted build at `ever-earth-acre-xenon.grok.me`.

## Live URLs

- GitHub Pages (free): https://v2-prog.github.io/structure-lab/
- Custom domain (after DNS): https://earthacer.in/

## What this repo is

A static site. No server, no database, no monthly hosting fee beyond the domain you already own.

```
index.html
favicon.svg
site.webmanifest
404.html
assets/
  index-8eU5pCGS.js
  routes-CNbpnZBC.js
  styles-BwZ_0gTw.css
```

## Enable GitHub Pages (one minute)

1. Open https://github.com/v2-prog/structure-lab/settings/pages
2. Under **Build and deployment → Source**, choose **Deploy from a branch**
3. Branch: `main`, folder: `/ (root)`
4. Save

The site is then at **https://v2-prog.github.io/structure-lab/**

## Point earthacer.in at this site (Hostinger)

In Hostinger hPanel → Domains → earthacer.in → DNS / Nameservers:

**Option A — keep Hostinger hosting, upload these files**

If the domain already uses Hostinger web hosting, skip GitHub Pages for the custom domain and upload this folder into `public_html` (File Manager). That is the simplest way to get `https://earthacer.in`.

**Option B — GitHub Pages + custom domain (still free)**

1. In this repo, Settings → Pages → Custom domain → `earthacer.in` → Save
2. At Hostinger DNS, add:

| Type | Name | Points to |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `v2-prog.github.io` |

3. Wait for DNS (often 5–30 minutes). Tick “Enforce HTTPS” on the Pages settings page once the domain is verified.

Do not leave Hostinger’s parked “default page” A records pointing at Hostinger if you choose Option B — replace them.

## Local preview

Any static server from this folder:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080
