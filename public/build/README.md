# /build

Lives at https://nathanortiz.com/build

## What this is

A placeholder. One static page whose only job is to route people to the
"Columbia founders & startups" Google Form until the real landing page exists.

It is deliberately isolated: plain HTML/CSS in a single file, no React, no
build step, no imports, no routing entries. Vite copies `public/` straight to
`dist/`, so this file ships as-is.

## Swapping it out later

Replace `index.html` with the new page. That's the whole migration — nothing
else in the repo points at it.

- Extra assets (images, css, js) go in this folder and are referenced as
  `/build/whatever.png`.
- If the replacement is a React route instead of a static page, delete this
  folder first — a file in `public/build/` wins over any SPA rewrite.

## Changing just the form link

Search `index.html` for `FORM_URL` and update the `href` below it.
