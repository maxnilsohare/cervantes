import { defineArrayMember, defineField, defineType } from "sanity";

const PROPERTY_TYPE_OPTIONS = [
  { title: "Apartment", value: "Apartment" },
  { title: "Penthouse", value: "Penthouse" },
  { title: "House", value: "House" },
  { title: "Villa", value: "Villa" },
  { title: "Townhouse", value: "Townhouse" },
  { title: "Plot", value: "Plot" },
  { title: "Commercial", value: "Commercial" },
  { title: "New Development", value: "New Development" },
];

const STATUS_OPTIONS = [
  { title: "Available", value: "available" },
  { title: "Reserved", value: "reserved" },
  { title: "Sold", value: "sold" },
  { title: "Private", value: "private" },
];

const NEARBY_CATEGORY_OPTIONS = [
  { title: "Airport", value: "airport" },
  { title: "Beach", value: "beach" },
  { title: "School", value: "school" },
  { title: "Healthcare", value: "healthcare" },
  { title: "Golf", value: "golf" },
  { title: "Dining", value: "dining" },
  { title: "Daily essentials", value: "daily" },
  { title: "Marina", value: "marina" },
  { title: "Town", value: "town" },
  { title: "Transport", value: "transport" },
];

export const propertyType = defineType({
  name: "property",
  title: "Property",
  type: "document",
  groups: [
    { name: "basic", title: "Basic info", default: true },
    { name: "facts", title: "Key facts" },
    { name: "media", title: "Media" },
    { name: "description", title: "Description" },
    { name: "features", title: "Features" },
    { name: "map", title: "Location & map" },
    { name: "advisor", title: "Advisor" },
    { name: "publishing", title: "Publishing & SEO" },
  ],
  initialValue: {
    status: "available",
    featured: false,
  },
  fields: [
    defineField({
      name: "title",
      title: "Property title",
      type: "string",
      group: "basic",
      description: "Required. This is the main name shown on the website and in Studio lists.",
      validation: (rule) => rule.required().min(8).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      description: "Required. Used in the property page URL and generated from the title.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reference",
      title: "Reference",
      type: "string",
      group: "basic",
      description: "Required. Internal listing reference shown on the property page.",
      validation: (rule) => rule.required().min(3).max(40),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      group: "basic",
      description: "Required. Example: EUR2,650,000 or Price on application.",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return "Add a price or a clear status such as Price on application.";
          return /\d/.test(value) || /price on application/i.test(value)
            ? true
            : "Include digits in the price or use 'Price on application'.";
        }),
    }),
    defineField({
      name: "propertyType",
      title: "Property type",
      type: "string",
      group: "basic",
      description: "Required. Used for search filters and property cards.",
      options: { list: PROPERTY_TYPE_OPTIONS },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "basic",
      description: "Required. Example: Sierra Blanca, Marbella or Reserva del Higueron, Fuengirola.",
      validation: (rule) => rule.required().min(2).max(120),
    }),

    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
      group: "facts",
      description: "Required. Whole number only.",
      validation: (rule) => rule.required().min(0).precision(0),
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      group: "facts",
      description: "Required. Use whole or half counts if needed.",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "builtSize",
      title: "Built size",
      type: "string",
      group: "facts",
      description: "Example: 354m2",
    }),
    defineField({
      name: "terraceSize",
      title: "Terrace size",
      type: "string",
      group: "facts",
      description: "Example: 68m2",
    }),
    defineField({
      name: "plotSize",
      title: "Plot size",
      type: "string",
      group: "facts",
      description: "Example: 1,250m2 or N/A.",
    }),
    defineField({
      name: "orientation",
      title: "Orientation",
      type: "string",
      group: "facts",
      description: "Optional. Example: South-facing.",
    }),
    defineField({
      name: "pool",
      title: "Pool",
      type: "boolean",
      group: "facts",
      initialValue: false,
      description: "Tick if the property has a private or shared pool.",
    }),
    defineField({
      name: "parking",
      title: "Parking",
      type: "string",
      group: "facts",
      description: "Optional. Example: Private garage for 2 cars.",
    }),
    defineField({
      name: "communityFees",
      title: "Community fee per month (EUR)",
      type: "number",
      group: "facts",
      description: "Optional. Number only, without the currency symbol.",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "estimatedIBI",
      title: "IBI estimate",
      type: "string",
      group: "facts",
      description: "Optional. Example: EUR1,250/year.",
    }),
    defineField({
      name: "buyingCostNotes",
      title: "Buying cost notes",
      type: "text",
      rows: 3,
      group: "facts",
      description: "Optional internal note shown on the property page cost section.",
    }),

    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "media",
      description: "Required. Main image shown on property cards and the property page hero.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery images",
      type: "array",
      group: "media",
      description: "Required. Add the full photo gallery and drag images into the preferred order.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "floorPlanImage",
      title: "Floor plan image",
      type: "image",
      group: "media",
      description: "Optional. Upload a plan if one is available.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      group: "media",
      description: "Optional. Paste a full video link if you have a tour.",
    }),

    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "description",
      description: "Short card summary. Aim for 1 to 2 sentences.",
      validation: (rule) => rule.required().min(40).max(220),
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "text",
      rows: 8,
      group: "description",
      description: "Main property write-up shown on the detail page.",
      validation: (rule) => rule.required().min(80),
    }),

    defineField({
      name: "keyFeatures",
      title: "Key features",
      type: "array",
      group: "features",
      description: "Add one feature per item. These appear as the main highlights on the detail page.",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "lifestyleHighlights",
      title: "Lifestyle highlights",
      type: "array",
      group: "features",
      description: "Use these for neighbourhood or lifestyle talking points.",
      of: [defineArrayMember({ type: "string" })],
    }),

    defineField({
      name: "address",
      title: "Address",
      type: "string",
      group: "map",
      description: "Optional. Use a broad address if you do not want to show the exact home location publicly.",
    }),
    defineField({
      name: "latitude",
      title: "Latitude",
      type: "number",
      group: "map",
      description: "Required for the map. Example: 36.512345",
      validation: (rule) => rule.required().min(-90).max(90),
    }),
    defineField({
      name: "longitude",
      title: "Longitude",
      type: "number",
      group: "map",
      description: "Required for the map. Example: -4.923456",
      validation: (rule) => rule.required().min(-180).max(180),
    }),
    defineField({
      name: "nearbyEssentials",
      title: "Nearby essentials",
      type: "array",
      group: "map",
      description: "Optional. Add a few useful nearby points such as beach, school, golf or airport.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Place name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: { list: NEARBY_CATEGORY_OPTIONS },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "minutesByCar",
              title: "Minutes by car",
              type: "number",
              validation: (rule) => rule.min(0).precision(0),
            }),
            defineField({
              name: "iconType",
              title: "Optional icon label",
              type: "string",
              description: "Optional helper label for the frontend map and nearby guide.",
            }),
          ],
          preview: {
            select: {
              title: "label",
              category: "category",
              minutesByCar: "minutesByCar",
            },
            prepare(selection) {
              const { title, category, minutesByCar } = selection;
              return {
                title,
                subtitle: [category, minutesByCar ? `${minutesByCar} min by car` : null]
                  .filter(Boolean)
                  .join(" · "),
              };
            },
          },
        }),
      ],
    }),

    defineField({
      name: "advisorDetails",
      title: "Advisor details",
      type: "object",
      group: "advisor",
      description: "The estate agent will use these contact details on this property page.",
      fields: [
        defineField({
          name: "name",
          title: "Advisor name",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "phone",
          title: "Advisor phone",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "email",
          title: "Advisor email",
          type: "string",
          validation: (rule) => rule.required().email(),
        }),
        defineField({
          name: "photo",
          title: "Advisor photo",
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "advisor",
      title: "Legacy advisor reference",
      type: "reference",
      to: [{ type: "advisor" }],
      hidden: true,
    }),

    defineField({
      name: "status",
      title: "Publishing status",
      type: "string",
      group: "publishing",
      description: "Shown on the website and used to signal whether a property is available.",
      options: { list: STATUS_OPTIONS },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured property",
      type: "boolean",
      group: "publishing",
      initialValue: false,
      description: "Tick to prioritise this listing in featured sections.",
    }),
    defineField({
      name: "orderRank",
      title: "Display order",
      type: "number",
      group: "publishing",
      description: "Optional. Lower numbers appear first in property lists.",
      validation: (rule) => rule.min(0).precision(0),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "publishing",
      description: "Optional. Leave blank to use the property title automatically.",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      group: "publishing",
      description: "Optional. Leave blank to use the short description automatically.",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Social sharing image",
      type: "image",
      group: "publishing",
      description: "Optional. Leave blank to use the hero image when the page is shared.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),

    defineField({
      name: "similarProperties",
      title: "Similar properties",
      type: "array",
      group: "publishing",
      hidden: true,
      of: [defineArrayMember({ type: "reference", to: [{ type: "property" }] })],
    }),
  ],
  preview: {
    select: {
      title: "title",
      price: "price",
      location: "location",
      media: "heroImage",
    },
    prepare(selection) {
      const { title, price, location, media } = selection;
      return {
        title,
        media,
        subtitle: [price, location].filter(Boolean).join(" · "),
      };
    },
  },
});
