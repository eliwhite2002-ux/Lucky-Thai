# Redirect Plan

These redirects should be applied only after the new Lucky Thai site is live and the final domain is known.

Replace `newdomain.com` with the final Lucky Thai domain.

## Recommended 301 Redirects

```text
krobkrua.com/          -> https://newdomain.com/krob-krua/
krobkrua.com/menu/     -> https://newdomain.com/order/
krobkrua.com/contact/  -> https://newdomain.com/location/
krobkrua.com/about/    -> https://newdomain.com/story/
krobkrua.com/reviews/  -> https://newdomain.com/krob-krua/
```

## WordPress Redirection Plugin

Create one redirect for each old path:

```text
Source URL: /
Target URL: https://newdomain.com/krob-krua/
HTTP code: 301
```

Repeat for `/menu/`, `/contact/`, `/about/`, and `/reviews/`.

## Apache .htaccess

```apache
Redirect 301 / https://newdomain.com/krob-krua/
Redirect 301 /menu/ https://newdomain.com/order/
Redirect 301 /contact/ https://newdomain.com/location/
Redirect 301 /about/ https://newdomain.com/story/
Redirect 301 /reviews/ https://newdomain.com/krob-krua/
```

If the old site has many WordPress paths, test carefully so the homepage rule does not swallow more specific paths.

## Netlify _redirects

```text
/          https://newdomain.com/krob-krua/  301
/menu/     https://newdomain.com/order/      301
/contact/  https://newdomain.com/location/   301
/about/    https://newdomain.com/story/      301
/reviews/  https://newdomain.com/krob-krua/  301
```

## Cloudflare Redirect Rules

Create static redirect rules:

```text
If hostname equals krobkrua.com and path equals /
Then static redirect to https://newdomain.com/krob-krua/ with status code 301
```

Repeat for:

- `/menu/` to `/order/`
- `/contact/` to `/location/`
- `/about/` to `/story/`
- `/reviews/` to `/krob-krua/`

## Notes

- Keep redirects as 301 permanent redirects once confirmed.
- Test every source URL before announcing the relaunch.
- Do not redirect directly to Square from old Krob Krua pages; send customers through the Lucky Thai bridge or order page so the transition is clear.
