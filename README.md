# House Show Invite

A static invitation + RSVP page. RSVPs are stored in Supabase.

## Files

- `index.html` – event info and RSVP form
- `styles.css` – placeholder styles
- `app.js` – form handling; posts RSVPs to Supabase
- `config.js` – your Supabase URL and anon key
- `supabase/schema.sql` – creates the `rsvps` table and its security rules

## Setup

1. **Create a Supabase project** at https://supabase.com (free tier is fine).
2. **Create the table:** in the dashboard, open *SQL Editor*, paste in `supabase/schema.sql`, and run it.
3. **Add your keys:** in *Project Settings → API*, copy the Project URL and the `anon` public key into `config.js`.
4. **Fill in the event details** in `index.html` (everything in `[brackets]`).

## Run locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Viewing RSVPs

Supabase dashboard → *Table Editor* → `rsvps`. You can export to CSV from there.

## Deploying to a subdomain

Any static host works. For example, with Netlify, Vercel, or Cloudflare Pages:

1. Deploy this folder (no build step; the publish directory is the repo root).
2. Add a custom domain such as `show.yourdomain.com` in the host's settings.
3. At your DNS provider, add the `CNAME` record the host gives you (e.g. `show` → `your-site.netlify.app`).

## Security notes

The anon key is meant to be public. Row-level security only allows visitors to
**insert** RSVPs, so they can't read anyone else's name or phone number.
