# Cervantes Deployment Notes

## Required Environment Variables

Set these in Vercel for Production and any Preview environments you want to test fully.

Public browser-safe variables:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_ENABLE_STUDIO=false`

Server-only variables:

- `ENABLE_STUDIO=false`
- `ENQUIRY_MAIL_PROVIDER=resend` or `sendgrid`
- `ENQUIRY_RECIPIENT_EMAIL=hello@cervantesadvisory.com`
- `ENQUIRY_FROM_EMAIL=Cervantes Website <noreply@your-domain.com>`
- `RESEND_API_KEY` or `SENDGRID_API_KEY`

Never prefix provider API keys with `NEXT_PUBLIC_`.

## Vercel Deployment

1. Push the latest branch to GitHub.
2. Import the project into Vercel as a Next.js app.
3. Keep default build settings:
   - Build command: `npm run build`
   - Output: `.next`
4. Add the environment variables above.
5. Deploy.
6. After changing env vars, redeploy the latest deployment.

## Google Maps

Restrict `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in Google Cloud before production:

- Application restriction: HTTP referrers.
- Add production domains such as `https://your-domain.com/*` and `https://www.your-domain.com/*`.
- Add Vercel preview domains only if previews need maps.
- API restriction: Maps JavaScript API. Add Places API only if a future feature needs it.

The property map uses standard `google.maps.Map` and `google.maps.Marker`, and falls back gracefully when the key is missing or authorization fails.

## Sanity Studio

`/studio` is disabled by default and returns a clean 404 unless Studio is explicitly enabled.

To enable it:

1. Set `ENABLE_STUDIO=true` in the target environment.
2. Optionally set `NEXT_PUBLIC_ENABLE_STUDIO=true` for local/browser-visible feature checks.
3. Ensure Sanity project ID, dataset, and API version are set.
4. Add the production and preview origins in Sanity CORS settings.

Leave both Studio flags false for a public launch unless the client intentionally wants Studio available.

## Enquiries

Contact and property enquiry forms submit through Next.js Server Actions.

Email delivery is server-only and supports:

- Resend with `RESEND_API_KEY`
- SendGrid with `SENDGRID_API_KEY`

Submitted emails include source page, sender name, email, phone, message, and property title/reference/slug when applicable. If no provider is configured, the form shows an error instead of pretending the enquiry was sent.

## Pre-Launch Checks

- `npm run lint`
- `npm run build`
- Confirm the contact form sends to `ENQUIRY_RECIPIENT_EMAIL`.
- Confirm property enquiry emails include property metadata.
- Confirm `/studio` returns 404 when disabled.
- Confirm maps work on the production domain after key restrictions are applied.
