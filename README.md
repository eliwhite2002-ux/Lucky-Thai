# Lucky Thai Relaunch Site

Production-ready static website for Lucky Thai, a Eugene, Oregon Thai food truck connected to the former Krob Krua restaurant.

The site is intentionally simple: no custom ordering system, no payment gateway, and no delivery app. All order buttons read from the shared business config and point to Square when a Square URL is provided.

## Run Locally

No install step is required.

```powershell
python -m http.server 4175
```

Then open:

```text
http://127.0.0.1:4175/
```

## Build

This is a plain static site, so there is no build command. Deploy the folder contents to Netlify, Vercel, Cloudflare Pages, or another static host.

## Update Business Info

Edit:

```text
assets/business-config.js
```

Use this file for:

- Square order link: `squareOrderUrl`
- Phone and email: `phone`, `email`
- Location details: `businessAddress`, `truckLocationDescription`, `googleMapsUrl`
- Hours: `hours`
- Social links: `instagramUrl`, `facebookUrl`
- Krob Krua language toggle: `showKrobKruaLanguage`
- Announcement banner: `announcementBannerEnabled`, `announcementBannerText`

If `squareOrderUrl` is empty, order buttons show "Order Link Coming Soon" and route to `/order/`.

## Update Menu

Edit:

```text
data/menu.js
```

Add real menu items only after they are confirmed. The public order page currently uses a "Menu coming soon" fallback and directs customers to Square for current availability.

Supported fields:

- `category`
- `name`
- `description`
- `price`
- `spicyLevel`
- `isPopular`
- `isVegetarian`
- `image`

## Pages

- `/` Home
- `/krob-krua/` Formerly Krob Krua bridge page
- `/order/` Menu and Square order path
- `/location/` Location and hours
- `/story/` Story
- `/catering/` Catering and group orders
- `/media-kit/` Relaunch media kit

## Images

Asset folders are prepared here:

```text
public/images/food
public/images/team
public/images/logo
public/images/media-kit
```

The current SVG placeholders are neutral and should be replaced with real owned or licensed assets when available.

## Deployment Notes

1. Add the final Square order URL in `assets/business-config.js`.
2. Add confirmed location, hours, phone, email, and social links.
3. Replace placeholder image assets with real photos and logo files.
4. Deploy as a static site.
5. After launch, apply the redirect plan in `redirects.md` from old Krob Krua URLs to the new Lucky Thai pages.

## Redirects

Do not apply redirects until the new domain is final and the old Krob Krua domain can be managed. See `redirects.md`.
