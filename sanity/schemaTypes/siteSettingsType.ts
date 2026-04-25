import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      initialValue: "Cervantes Boutique Property Advisory",
    }),
    defineField({
      name: "defaultSeoDescription",
      title: "Default SEO description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact phone",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "siteTitle",
      subtitle: "contactEmail",
    },
  },
});
