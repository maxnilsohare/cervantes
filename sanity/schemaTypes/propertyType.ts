import { defineArrayMember, defineField, defineType } from "sanity";

export const propertyType = defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "For sale", value: "forSale" },
          { title: "Reserved", value: "reserved" },
          { title: "Sold", value: "sold" },
          { title: "Off market", value: "offMarket" },
        ],
      },
      initialValue: "forSale",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "reference", title: "Reference", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "price", title: "Price", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "location", title: "Location", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "area", title: "Area", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "propertyType", title: "Property Type", type: "string", validation: (rule) => rule.required() }),

    defineField({ name: "bedrooms", title: "Bedrooms", type: "number", validation: (rule) => rule.required().min(0) }),
    defineField({ name: "bathrooms", title: "Bathrooms", type: "number", validation: (rule) => rule.required().min(0) }),
    defineField({ name: "builtSize", title: "Built Size", type: "string" }),
    defineField({ name: "terraceSize", title: "Terrace Size", type: "string" }),
    defineField({ name: "plotSize", title: "Plot Size", type: "string" }),

    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({ name: "floorPlanImage", title: "Floor Plan Image (Optional)", type: "image", options: { hotspot: true } }),

    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 3 }),
    defineField({ name: "fullDescription", title: "Full Description", type: "text", rows: 8 }),
    defineField({ name: "cervantesView", title: "Cervantes View", type: "text", rows: 4 }),

    defineField({
      name: "whatsSpecial",
      title: "What's Special",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "features", title: "Features", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "lifestyleHighlights",
      title: "Lifestyle Highlights",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),

    defineField({ name: "latitude", title: "Latitude", type: "number" }),
    defineField({ name: "longitude", title: "Longitude", type: "number" }),
    defineField({
      name: "nearbyLifestyle",
      title: "Nearby Lifestyle",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "time", title: "Time", type: "string" }),
            defineField({ name: "mode", title: "Mode", type: "string" }),
            defineField({ name: "description", title: "Description (Optional)", type: "string" }),
          ],
        }),
      ],
    }),

    defineField({ name: "communityFees", title: "Community Fees", type: "number" }),
    defineField({ name: "ibiEstimate", title: "IBI Estimate", type: "string" }),
    defineField({ name: "garbageTax", title: "Garbage Tax", type: "string" }),
    defineField({ name: "purchaseCostsPct", title: "Purchase Costs %", type: "number" }),

    defineField({ name: "enableMap", title: "Enable Map", type: "boolean", initialValue: true }),
    defineField({ name: "defaultDestination", title: "Default Destination (Optional)", type: "string" }),

    defineField({ name: "advisorName", title: "Advisor Name", type: "string" }),
    defineField({ name: "advisorPhone", title: "Advisor Phone", type: "string" }),
    defineField({ name: "advisorEmail", title: "Advisor Email", type: "string" }),
    defineField({ name: "advisorImage", title: "Advisor Image (Optional)", type: "image", options: { hotspot: true } }),

    defineField({ name: "metaTitle", title: "Meta Title", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 3 }),

    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({
      name: "showOnHomepage",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: false,
      description:
        "Reserved for homepage CMS integration in a future phase. Keep this for upcoming homepage blocks.",
    }),
    defineField({ name: "orderRank", title: "Order Rank (Optional)", type: "number" }),
  ],
});
