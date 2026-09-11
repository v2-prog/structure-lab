# Structure Lab AU

Australian family, land and purpose structures — trusts, companies, SMSF, community land trusts, charities, co-ops, CGT and duty flags.

General information only. Not tax, legal or financial advice.

## Public URLs

- Shareable GitHub Pages: https://v2-prog.github.io/structure-lab/
- Custom domain: https://earthacer.in/
- Source repo: https://github.com/v2-prog/structure-lab

The custom domain goes live after Hostinger DNS points at GitHub Pages (see below).

## Hostinger DNS for earthacer.in

In hPanel → Domains → earthacer.in → DNS Editor, replace parked Hostinger A records with:

| Type | Name | Points to |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `v2-prog.github.io` |

Then wait for DNS. GitHub Pages → Enforce HTTPS once the domain is verified.
