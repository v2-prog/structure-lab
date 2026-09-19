# Structure Lab AU

Australian family, land and purpose structures — trusts, companies, SMSF, community land trusts, charities, co-ops, CGT and duty flags.

General information only. Not tax, legal or financial advice.

## Public URLs

- Canonical hub: https://acerlab.link/
- Structure Lab app: https://acerlab.link/lab/
- Cloudflare Pages preview: (set after first deploy)
- GitHub Pages backup: https://v2-prog.github.io/structure-lab/
- Source: https://github.com/v2-prog/structure-lab

`earthacer.in` stays parked at Hostinger. Do not point it at this project.

## Layout

- `/` — static no-JS hub (works the moment DNS and Pages are live)
- `/lab/` — Structure Lab AU app (existing static build)
- `/404.html` — static not-found page

## Cloudflare Pages

Connect this repo (branch `main`). Framework: None. Build command: empty. Output directory: `/`.

Then Custom domains → add `acerlab.link` and `www.acerlab.link`.
The zone is already on Cloudflare Registrar, so SSL is automatic.

`_redirects` sends `www` to apex and rewrites `/lab/*` to the app.
