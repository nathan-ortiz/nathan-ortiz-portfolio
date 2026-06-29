# Disney's Boat Rentals pitch page

A single static page at `nathanortiz.com/disneys`. No build step.

## What's in here

```
build/
├── index.html         the page (HTML + inline CSS + vanilla JS)
├── og.html            the source for the OG/Twitter card image
├── assets/
│   ├── logo.webp                          Disney's circular badge
│   ├── brandon_connor.jpg                 mid-page anchor photo
│   ├── og-image.jpg                       1200x630 social card
│   ├── pricing_table_falls_apart_in-app_browser.jpg
│   ├── boat_selection_formatting_unreadable.jpg
│   ├── google_reviews_element_clipped.jpg
│   ├── header_crowds_image_not_enough_spacing.jpg
│   └── ... (other annotated screenshots)
└── README.md          this file
```

## Local preview

```
cd build
python3 -m http.server 4181
# Open http://localhost:4181/
```

Verify on a real phone too. iOS Safari, Chrome, and the in-app browsers in
Instagram and ChatGPT. The whole pitch is about mobile credibility.

## Deploy to nathanortiz.com/disneys

The portfolio at `~/Desktop/Portfolio Website/nate-portfolio/` deploys to
Vercel. Easiest path is to drop this whole folder under
`public/disneys/` and let Vercel serve it as a static asset path. The
existing SPA's catch-all rewrite shouldn't intercept it because
`public/` is served verbatim by Vercel before the SPA fallback runs.

```sh
cp -R build/ "/Users/nathanortiz/Desktop/Portfolio Website/nate-portfolio/public/disneys"
cd "/Users/nathanortiz/Desktop/Portfolio Website/nate-portfolio"
git add public/disneys
git commit -m "Add /disneys pitch page"
git push  # Vercel auto-deploys
```

After deploy, verify these URLs:
- `https://nathanortiz.com/disneys`              → page loads
- `https://nathanortiz.com/disneys/assets/og-image.jpg` → social card loads
- Paste the link in iMessage/Slack to confirm the preview card renders

If the SPA fallback eats the route (you see the portfolio instead), add a
rewrite to `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/disneys", "destination": "/disneys/index.html" },
    { "source": "/disneys/(.*)", "destination": "/disneys/$1" }
  ]
}
```

## The conditions widget

Client-side fetch to `api.weather.gov`. NOAA NWS is free for commercial
use (US-government public-domain data) and supports CORS. The widget:

1. Hits `/points/{lat,lon}` to get the Lakeport gridpoint.
2. Hits the returned `forecastHourly` URL.
3. Renders air temp, wind speed/direction, sky, rain chance, and a
   plain-English "best window today" call based on wind speed.
4. Caches the result in `localStorage` for 10 minutes.
5. If the call fails, falls back to the last good reading (with a
   "(cached)" note). If there's no cached reading either, shows a clean
   "live data briefly unavailable" message with the shop's phone number.

If we later move this to the real Disney's site, the right move is to
add a tiny server-side proxy (Vercel function or Hetzner endpoint)
with a 10-min cache so we're not hitting NWS from every visitor's
browser. The client code already expects a JSON payload; swap the
fetch URL and we're done.

## Notes for follow-up edits

- All copy lives in `index.html`. No CMS, no template engine.
- Brand tokens are CSS custom properties at the top of the `<style>`
  block. Navy is `#0c3c78`, lake blue is `#54c0e4`, paper is `#FBF7EE`.
- The page is `noindex, nofollow` so Google won't surface it.
- The AI search test screenshot still has a placeholder slot. Drop the
  PNG in `assets/` and replace the `<div class="ai-test">[ AI search
  test screenshot to add ]</div>` block with an `<img>` tag.
- No em dashes anywhere by request. Don't introduce them.
- If you change the pricing numbers, update both the mobile cards
  (one per boat) and the desktop table (one row per boat).

## Why a single static file

Loads instantly. No JS framework. No bundle. Mobile in-app browsers
render it identically. Survives forwarding. Easy to read for anyone
who later opens DevTools. The whole pitch is "your website should be
fast and readable," so the pitch page is fast and readable.
