import { defineField, defineType } from "sanity";

export const advisorType = defineType({
  name: "advisor",
  title: "Advisor",
  type: "document",
  initialValue: {
    isDefault: false,
    languages: ["English"],
  },
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      type: "string",
      description: "Optional. Include country code, e.g. 46701234567.",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "languages",
      title: "Languages",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Swedish", value: "Swedish" },
          { title: "English", value: "English" },
          { title: "Spanish", value: "Spanish" },
          { title: "Norwegian", value: "Norwegian" },
          { title: "Danish", value: "Danish" },
          { title: "German", value: "German" },
          { title: "French", value: "French" },
        ],
      },
    }),
    defineField({
      name: "shortBio",
      title: "Short bio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "isDefault",
      title: "Default advisor",
      type: "boolean",
      initialValue: false,
      description: "Mark one advisor as the default for new properties.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      media: "photo",
    },
  },
});
