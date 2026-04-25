This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sanity CMS Setup

1. Create a Sanity project at [sanity.io](https://www.sanity.io/).
2. Add these environment variables to `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

3. Start the app:

```bash
npm run dev
```

4. Open the CMS Studio at `http://localhost:3000/studio`.

If Sanity is not configured yet, the site safely falls back to local property data in `app/data/properties.ts`.

## How Jennifer adds a property

1. Open the website admin at `/studio`.
2. Log in with your Sanity account.
3. In the left menu, click **Property** and then **Create new**.
4. Fill in the property sections:
   - Core details (title, slug, status, reference, price, location)
   - Stats (beds, baths, sizes)
   - Images (hero and gallery)
   - Descriptions and Cervantes View
   - What&apos;s Special, Features and Lifestyle Highlights
   - Map and Nearby Lifestyle fields
   - Advisor details and SEO
5. Click **Publish**.
6. Visit `/properties` on the website to confirm the listing appears.
7. Open that property page to verify full detail layout, map and travel-time tools.
