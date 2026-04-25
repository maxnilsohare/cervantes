import { defineArrayMember, defineField, defineType } from "sanity";

export const propertyType = defineType({
  name: "property",
  title: "Property",
  type: "document",
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "images", title: "Images" },
    { name: "details", title: "Details" },
    { name: "description", title: "Description" },
    { name: "location", title: "Location" },
    { name: "costs", title: "Costs" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Property title",
      type: "string",
      group: "overview",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "overview",
      description: "Auto-generated from title. Used in the property URL.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "overview",
      description: "Current listing status shown in cards and property pages.",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Reserved", value: "reserved" },
          { title: "Sold", value: "sold" },
          { title: "Private", value: "private" },
        ],
      },
      initialValue: "available",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reference",
      title: "Reference number",
      type: "string",
      group: "overview",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      group: "overview",
      description: "Example: €2,650,000",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "propertyType",
      title: "Property type",
      type: "string",
      group: "overview",
      options: {
        list: [
          "Apartment",
          "Penthouse",
          "House",
          "Villa",
          "Townhouse",
          "Plot",
          "Commercial",
          "New Development",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Area/location name",
      type: "string",
      group: "location",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address (optional public detail)",
      type: "string",
      group: "location",
    }),
    defineField({
      name: "latitude",
      title: "Latitude",
      type: "number",
      group: "location",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "longitude",
      title: "Longitude",
      type: "number",
      group: "location",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "images",
      description: "Main image shown on cards and property pages.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery images",
      type: "array",
      group: "images",
      description: "Add multiple photos. Jennifer can drag to reorder.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "floorPlanImage",
      title: "Floor plan image",
      type: "image",
      group: "images",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (optional)",
      type: "url",
      group: "images",
    }),

    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
      group: "details",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      group: "details",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({ name: "builtSize", title: "Built size", type: "string", group: "details" }),
    defineField({ name: "terraceSize", title: "Terrace size", type: "string", group: "details" }),
    defineField({ name: "plotSize", title: "Plot size", type: "string", group: "details" }),
    defineField({ name: "orientation", title: "Orientation", type: "string", group: "details" }),
    defineField({ name: "pool", title: "Pool", type: "boolean", group: "details", initialValue: false }),
    defineField({
      name: "parking",
      title: "Parking",
      type: "string",
      group: "details",
      description: "Example: Private garage for 2 cars",
    }),

    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "description",
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "text",
      rows: 8,
      group: "description",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "keyFeatures",
      title: "Key features",
      type: "array",
      group: "description",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "lifestyleHighlights",
      title: "Lifestyle highlights",
      type: "array",
      group: "description",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "nearbyEssentials",
      title: "Nearby essentials",
      type: "array",
      group: "location",
      description: "Simple local highlights shown on the property page.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: {
                list: [
                  "airport",
                  "beach",
                  "school",
                  "healthcare",
                  "golf",
                  "dining",
                  "daily",
                  "marina",
                  "town",
                  "transport",
                ],
              },
            }),
            defineField({ name: "minutesByCar", title: "Minutes by car", type: "number" }),
            defineField({
              name: "iconType",
              title: "Icon type",
              type: "string",
              description: "Optional icon key for frontend display.",
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "estimatedIBI",
      title: "Estimated IBI",
      type: "string",
      group: "costs",
      description: "Example: €1,250/year",
    }),
    defineField({
      name: "communityFees",
      title: "Community fees",
      type: "number",
      group: "costs",
      description: "Monthly community fees in EUR (number only).",
    }),
    defineField({
      name: "buyingCostNotes",
      title: "Buying cost notes",
      type: "text",
      rows: 3,
      group: "costs",
    }),

    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3, group: "seo" }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "similarProperties",
      title: "Similar properties",
      type: "array",
      group: "overview",
      of: [defineArrayMember({ type: "reference", to: [{ type: "property" }] })],
    }),

    defineField({
      name: "advisor",
      title: "Advisor",
      type: "reference",
      to: [{ type: "advisor" }],
      group: "overview",
    }),

    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "orderRank", title: "Order rank (optional)", type: "number", group: "overview" }),
  ],
  preview: {
    select: {
      title: "title",
      price: "price",
      location: "location",
      status: "status",
      media: "heroImage",
    },
    prepare(selection) {
      const { title, price, location, status, media } = selection;
      const statusLabel =
        status === "available"
          ? "Available"
          : status === "reserved"
            ? "Reserved"
            : status === "sold"
              ? "Sold"
              : "Private";
      return {
        title,
        media,
        subtitle: [price, location, statusLabel].filter(Boolean).join(" · "),
      };
    },
  },
});
