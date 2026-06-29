// Vercel Edge Function. Relays an opens-the-page ping to ntfy.sh.
// Topic name lives in the NTFY_TOPIC env var so it stays out of client source.

export const config = { runtime: 'edge' };

const BOT_PATTERNS = [
  'facebookexternalhit',
  'facebot',
  'twitterbot',
  'slackbot',
  'telegrambot',
  'whatsapp',
  'linkedinbot',
  'bingbot',
  'googlebot',
  'applebot',
  'discordbot',
  'pinterest',
  'embedly',
  'preview',
  'spider',
  'crawler',
  'headlesschrome',
  'phantomjs',
  'curl/',
  'wget/',
];

function isBot(ua: string): boolean {
  const lower = ua.toLowerCase();
  return BOT_PATTERNS.some((p) => lower.includes(p));
}

export default async function handler(req: Request): Promise<Response> {
  // Always return 204 — never block the page on this
  const ok = () =>
    new Response(null, {
      status: 204,
      headers: { 'cache-control': 'no-store' },
    });

  try {
    const ua = req.headers.get('user-agent') || '';

    // Skip bots and link scrapers
    if (isBot(ua)) return ok();

    // Skip if the page was opened with ?preview=1 (so Nathan can self-check)
    const url = new URL(req.url);
    if (url.searchParams.get('preview') === '1') return ok();

    const topic = process.env.NTFY_TOPIC;
    if (!topic) return ok();

    // Build a useful notification body from Vercel geo headers
    const country = req.headers.get('x-vercel-ip-country') || '';
    const region = req.headers.get('x-vercel-ip-country-region') || '';
    const city = req.headers.get('x-vercel-ip-city') || '';
    const referer = req.headers.get('referer') || 'direct';
    const where = [city, region, country].filter(Boolean).join(', ') || 'unknown';

    // Trim referer for readability
    let refDisplay = referer;
    try {
      const r = new URL(referer);
      refDisplay = r.host + r.pathname;
    } catch {}

    const body =
      `Location: ${where}\n` +
      `Referrer: ${refDisplay}\n` +
      `Device:   ${ua.slice(0, 90)}`;

    // Fire to ntfy.sh. Don't await long; race a 1.5s timeout.
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 1500);
    await fetch(`https://ntfy.sh/${topic}`, {
      method: 'POST',
      body,
      headers: {
        Title: "Disney's pitch opened",
        Priority: 'default',
        Tags: 'sailboat',
        Click: 'https://nathanortiz.com/disneys',
      },
      signal: ctrl.signal,
    }).catch(() => {});
    clearTimeout(t);

    return ok();
  } catch {
    return ok();
  }
}
