# /build

`nathanortiz.com/build` — the link handed out for the "Columbia founders &
startups" signup.

## How it works today

A **temporary (307) redirect** straight to the Google Form, defined in
`vercel.json` under `redirects`. There is no page — the browser never renders
anything of ours, so there's no flash or intermediate click.

Both `/build` and `/build/` are listed, since Vercel matches the source path
literally. Query strings are forwarded automatically.

The redirect is deliberately **`"permanent": false`**. A permanent (308)
redirect gets cached hard by browsers, and anyone who hit the link once would
keep landing on the form long after the real page shipped. Do not change this
to `true`.

## Swapping in a real landing page later

Redirects are evaluated *before* the filesystem on Vercel, so the redirect wins
over any file while it exists. Two steps, in this order:

1. Delete the two `/build` entries from the `redirects` array in `vercel.json`.
2. Add the page:
   - **Static page** — create `public/build/index.html`. Vite copies `public/`
     straight to `dist/`, so it ships as-is. Assets go in the same folder and
     are referenced as `/build/whatever.png`.
   - **React route** — add it in `src/` as usual, and make sure no
     `public/build/` folder exists, since a real file beats an SPA rewrite.

Keep the form reachable from the new page — that form is where the signups
currently land.

## Changing just the form link

Update the two `destination` values in `vercel.json`.
