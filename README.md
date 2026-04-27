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
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_public_browser_maps_key
GOOGLE_MAPS_SERVER_API_KEY=your_server_only_maps_key
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
4. Add the property title and address.
5. Click **Find coordinates and nearby essentials** in the Address field.
6. Review and adjust the suggested map points (name, type, minutes, distance, note).
7. Choose an **Advisor profile** in the Advisor tab.
8. Fill in the rest of the listing content (media, facts, descriptions, publishing).
9. Click **Publish**.
10. Visit `/properties` and the property detail page to confirm listing and map rendering.

## How to create the default advisor (Jennifer)

1. Open `/studio`.
2. Go to **Advisors** and click **Create new**.
3. Add:
   - Name: Jennifer
   - Slug: auto-generated from name
   - Phone + Email
   - Languages: **Swedish**, **English**, **Spanish**
   - Optional photo, WhatsApp number, and short bio
   - Enable **Default advisor**
4. Publish the advisor.
5. Optional (recommended): in the document actions menu, copy document ID and set it to `advisor-jennifer` so new properties auto-select this advisor.

