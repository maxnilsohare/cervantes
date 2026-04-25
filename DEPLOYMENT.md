# Cervantes Deployment Guide (Vercel)

This project is ready for production deployment on Vercel.

## 1) Deploy to Vercel

1. Push your latest code to GitHub.
2. In Vercel, click **Add New... > Project**.
3. Import `maxnilsohare/cervantes`.
4. Framework should auto-detect as **Next.js**.
5. Build settings can remain default:
   - Build Command: `npm run build`
   - Output: `.next`
6. Add environment variables (see next section) before first deploy.
7. Click **Deploy**.

## 2) Required Environment Variables

Add these in **Vercel > Project > Settings > Environment Variables** for Production (and Preview if needed):

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

Recommended values:

- `NEXT_PUBLIC_SANITY_DATASET=production`
- `NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01`

Notes:

- Do not hardcode API keys in source files.
- Keep private tokens/server secrets out of client code.
- This app only uses public `NEXT_PUBLIC_*` values client-side where needed.

## 3) Google Maps Production Restrictions

Use the same API key in `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, and in Google Cloud:

1. Go to **Google Cloud Console > APIs & Services > Credentials**.
2. Open your Maps JavaScript key.
3. Under **Application restrictions**, choose **HTTP referrers (web sites)**.
4. Add allowed referrers for your domains, for example:
   - `https://your-domain.com/*`
   - `https://www.your-domain.com/*`
   - `https://*.vercel.app/*` (optional for previews)
5. Under **API restrictions**, allow at least:
   - Maps JavaScript API
   - Places API (if used by your map/search flows)
6. Save changes.

The property map already includes a graceful fallback card when Maps fails or key/config is missing.

## 4) Sanity Production Setup

This app embeds Studio at `/studio` and is guarded for missing env vars.

If Sanity vars are missing, `/studio` shows a setup screen instead of crashing.

To enable Studio and content APIs in production:

1. In [Sanity Manage](https://www.sanity.io/manage), open your project.
2. Go to **API > CORS Origins**.
3. Add your production and preview origins, for example:
   - `https://your-domain.com`
   - `https://www.your-domain.com`
   - `https://your-project.vercel.app`
4. Save CORS settings.
5. Ensure Vercel env vars are set:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`

## 5) Redeploy After Env Changes

After changing env vars in Vercel:

1. Go to **Vercel > Deployments**.
2. Open latest deployment.
3. Click **Redeploy** (or push a new commit).

You can also trigger a fresh deploy by running:

```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

## 6) Verification Checklist

- `npm run lint` passes
- `npm run build` passes
- `/studio` loads in production when Sanity env vars are present
- Property detail map works with production Google Maps key
- Map fallback UI appears gracefully if Maps is unavailable
